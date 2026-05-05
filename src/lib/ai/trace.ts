// ---------------------------------------------------------------------------
// Lightweight tracing adapter for AI analysis requests.
//
// Designed for production observability without an external dependency.
// Sampling rate is controlled via AI_TRACE_SAMPLE_RATE env var (0.0 – 1.0,
// default 0.1 = 10 %).
//
// In a future iteration this could be swapped for Arize Phoenix or OpenTelemetry
// without changing the call sites.
// ---------------------------------------------------------------------------

export interface TraceEvent {
  /** Unique identifier for this trace. */
  traceId: string;
  /** Event timestamp (ISO‑8601). */
  timestamp: string;
  /** Event category. */
  type: "analysis" | "cache_hit" | "cache_miss" | "save" | "error";
  /** Duration in milliseconds (when applicable). */
  durationMs?: number;
  /** Arbitrary structured payload. */
  payload?: Record<string, unknown>;
}

// ---------------------------------------------------------------------------
// Sampling
// ---------------------------------------------------------------------------

function getSampleRate(): number {
  if (typeof process === "undefined") return 0.1;
  const raw = process.env.AI_TRACE_SAMPLE_RATE;
  if (raw === undefined) return 0.1;
  const rate = Number.parseFloat(raw);
  return Number.isFinite(rate) ? Math.max(0, Math.min(1, rate)) : 0.1;
}

function shouldSample(): boolean {
  return Math.random() < getSampleRate();
}

// ---------------------------------------------------------------------------
// ID generation
// ---------------------------------------------------------------------------

let counter = 0;

function generateTraceId(): string {
  counter = (counter + 1) % 1_000_000;
  const ts = Date.now().toString(36);
  const c = counter.toString(36).padStart(5, "0");
  return `tr-${ts}-${c}`;
}

// ---------------------------------------------------------------------------
// Log transport (default: console.debug)
// ---------------------------------------------------------------------------

export type TraceTransport = (event: TraceEvent) => void;

let transport: TraceTransport = (event) => {
  // Avoid console noise in test environments
  if (typeof process !== "undefined" && process.env.NODE_ENV === "test") return;
  console.debug(`[trace] ${event.type}`, event);
};

/**
 * Override the default trace transport (useful for testing or when connecting
 * to an external observability backend).
 */
export function setTraceTransport(t: TraceTransport): void {
  transport = t;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Record a trace event.  Subject to sampling.
 */
export function trace(event: Omit<TraceEvent, "traceId" | "timestamp">): void {
  if (!shouldSample()) return;
  transport({
    traceId: generateTraceId(),
    timestamp: new Date().toISOString(),
    ...event,
  });
}

/**
 * Time an async operation and emit a trace event with the measured duration.
 */
export async function traced<T>(
  type: TraceEvent["type"],
  fn: () => Promise<T>,
  payload?: Record<string, unknown>,
): Promise<T> {
  const start = performance.now();
  try {
    const result = await fn();
    trace({ type, durationMs: performance.now() - start, payload });
    return result;
  } catch (err) {
    trace({
      type: "error",
      durationMs: performance.now() - start,
      payload: { ...payload, error: String(err) },
    });
    throw err;
  }
}
