# Pitfalls Research

**Domain:** Educational software for teaching rhetorical/literary figures in Spanish to secondary school students, with AI-powered text analysis
**Researched:** 2026-05-04
**Confidence:** MEDIUM-HIGH (EdTech pitfalls well-documented; Spanish NLP gaps verified in academic literature; AI hallucination risks extensively documented)

## Critical Pitfalls

### Pitfall 1: AI Hallucination Presenting False Literary Analysis as Fact

**What goes wrong:**
The LLM confidently identifies a rhetorical figure that isn't there, misattributes a literary device, or offers an incorrect explanation of why a figure "works" — and the student accepts it without questioning because the AI sounds authoritative.

**Why it happens:**
LLMs generate statistically plausible text, not verified literary analysis. In Spanish literary context specifically, there's virtually no supervised training data for rhetorical figure detection (Sanchez-Bayona & Agerri, 2022; Uribe & Mejía, 2023). The MIPVU metaphor annotation method hasn't been adapted to Spanish, resulting in scarce labeled data. The AI will confabulate explanations that *sound* like valid literary criticism but are factually wrong — fabricating interpretations, misidentifying figures, or confusing related concepts (e.g., calling a synecdoche a metonymy, or labeling anastrophe as hyperbaton).

**How to avoid:**
- Design AI prompts with explicit constraints: "If you cannot confidently identify the figure, say so rather than guessing."
- Implement a grounding strategy: cross-reference AI's analysis against the curated figure catalog before presenting to students.
- Add a "confidence indicator" UI element that signals when the AI is uncertain.
- Build a validation layer that checks AI outputs against the known figure definitions before surfacing them.
- Include "spot the error" exercises where students critique AI analysis — turning hallucination risk into a critical thinking feature (Faculty Focus, 2025).

**Warning signs:**
- AI gives detailed explanations for ambiguous or borderline cases without hedging.
- Students parrot AI interpretations without developing their own analytical voice.
- Nobody on the team can consistently catch AI errors during QA — because they sound so convincing.

**Phase to address:**
Phase 1 (core AI feedback engine) — the entire tutoring interaction model depends on getting this right.

---

### Pitfall 2: Spanish NLP and Rhetorical Analysis Gap

**What goes wrong:**
The AI struggles with Spanish-specific literary analysis because NLP models are trained predominantly on English and news corpora, not Spanish literary texts. Spanish rhetorical figures have unique challenges: gendered nouns affecting metaphor mapping, regional vocabulary variations, and culturally-specific literary traditions (Latin American vs. Peninsular Spanish).

**Why it happens:**
As documented in the "Ten Challenges of Computational Detection of Rhetorical Figures" (Kühn & Mitrović, 2024), rhetorical figure detection is already hard in English — it requires semantic understanding, transferred meaning detection, and sometimes phonetic analysis. In Spanish, the problem is worse because:
- There are no large-scale annotated corpora for rhetorical figures in Spanish (MegaLite corpus exists but has noise and segmentation errors; Sanchez-Bayona, 2021).
- Morphosyntactic variation between Spanish-speaking regions (Spain, Mexico, Argentina, Colombia) means a figure that works one way in one dialect doesn't work the same in another (Bentivoglio & Sedano, 2011 cited in ACL 2022).
- Standard NLP pipelines (spaCy Spanish, Stanford CoreNLP) are trained on news text and perform significantly worse on literary text with long sentences, poetic structures, and archaic vocabulary (BookNLP/Multilingual BookNLP paper, NEH 2023).
- Pre-trained Spanish language models (e.g., BETO) don't distinguish between regional varieties, treating all Spanish speakers as a "homogeneous mass" (ACL 2022 cross-cultural NLP challenges paper).

**How to avoid:**
- Use LLMs (which have broader exposure to Spanish literary text) rather than fine-tuned NLP models for rhetorical analysis — but validate with human experts.
- Build the figure catalog with regional variation notes (e.g.,注明 when a term is more common in Mexican vs. Castilian Spanish).
- Include explicit "we're learning about [region] Spanish literary traditions" framing so students know context matters.
- Don't attempt automatic detection of figures the AI can't reliably identify — start with the 15-20 core figures and validate each one manually.

**Warning signs:**
- AI analysis works for simple, universal figures (metaphor, simile) but fails on Spanish-specific forms (anáfora, asíndeton, polisíndeton, paronomasia).
- Student texts from different Spanish-speaking regions get inconsistent analysis quality.
- Team discovers they need a "Spanish literature expert" reviewer mid-project.

**Phase to address:**
Phase 1 (figure catalog + AI prompt design) — this shapes the entire content architecture.

---

### Pitfall 3: Tutor-Turned-Judge Drift

**What goes wrong:**
Despite explicitly designing the AI as a "tutor that guides, not a judge that grades," the feedback gradually drifts toward evaluative language: "This metaphor is **weak**" → "You used personification **incorrectly**" → "Your score: 3/10 on hyperbole." Students stop experimenting and start optimizing for approval.

**Why it happens:**
LLMs default to corrective, evaluative language ("good," "bad," "correct," "incorrect") because that's how most training data discusses writing. Without aggressive prompt engineering, the AI will frame feedback as grading. This is especially dangerous because:
- Educators and parents may *want* grades because that's what they're used to.
- It's easier to build a rubric-scoring system than a Socratic tutoring system.
- The "tutor not judge" principle is core to the product's differentiation — abandoning it makes Metacreadores just another grading tool (AIR 2013 EdTech pitfalls report).

**How to avoid:**
- Write prompt instructions that explicitly ban evaluative language: never say "correct/incorrect," "good/bad," "strong/weak." Instead: "Notice how X creates Y effect. What happens if you try Z?"
- Build a language filter that scans AI outputs for grading-adjacent terms and flags them for review.
- Design feedback loops that ask questions rather than make statements: "What effect were you going for with this metaphor?" rather than "This metaphor doesn't work."
- Include reflection prompts: "How did using [figure] change the feeling of your paragraph?"
- Make the "tutor voice" a enforced system prompt constraint, tested with adversarial inputs during QA.

**Warning signs:**
- Student feedback contains words like "score," "grade," "correct/incorrect," "needs improvement."
- Teachers or parents request "objective scoring" features.
- The easiest implementation path leads to rubric-based scoring rather than dialogic tutoring.

**Phase to address:**
Phase 1 (AI interaction model) — this is the product's differentiation. Getting it wrong invalidates the entire value proposition.

---

### Pitfall 4: Student Data Privacy and Compliance

**What goes wrong:**
The app collects student writing (personally expressive, potentially revealing essays), processes it through an external LLM API, stores analysis results — and runs afoul of COPPA (under-13 students), FERPA (US educational records), or GDPR (EU/Spain data protection). Schools refuse to adopt; parents raise alarm; the product is blocked from educational distribution.

**Why it happens:**
Secondary school students include under-13 age group (1st year of secundaria in many Spanish-speaking countries is age 12). COPPA requires verifiable parental consent before collecting personal information from children under 13. FERPA governs educational records in US-funded institutions. GDPR applies to any EU resident including Spain. The "school official" exception under FERPA has strict requirements: data can only be used for the educational purpose specified, not for model training, analytics, or advertising (6b Education, 2024; Student Privacy Compass, 2014).

Additionally, student essays contain deeply personal information — thoughts, emotions, creative self-expression. This is not generic user-generated content. Sending it to external APIs creates data flow risks.

**How to avoid:**
- Design data architecture with privacy-by-default: minimize what's sent to external LLMs, anonymize text before processing, don't store raw student text beyond the session.
- For under-13 users: implement parent/guardian consent flows (COPPA), or design so that under-13 accounts are school-managed with school-as-consenter.
- Don't use student data for model training or improvement — make this contractual with LLM providers (OpenAI, Anthropic, etc. have educational data policies).
- Include a clear data processing addendum for school deployments.
- Build the system so it can operate with "minimal data" mode: no persistent user accounts required for basic functionality, session-based analysis only.
- International schools in Spain = GDPR + potential FERPA overlap. Design for the strictest standard.

**Warning signs:**
- Team discusses "using student data to improve the model" without privacy review.
- No parent consent flow in the design.
- School pilots require IT/legal approval delays of months.

**Phase to address:**
Phase 1 (data architecture and LLM integration) — privacy must be designed in, not bolted on.

---

### Pitfall 5: Overjustification Effect from Gamification

**What goes wrong:**
Points, badges, streaks, and leaderboards are added to "increase engagement" — but they erode intrinsic motivation. Students start writing to earn badges rather than to express themselves. The overjustification effect (Lepper, Greene & Nisbett, 1973; Self-Determination Theory) makes the activity feel like work-for-reward rather than creative play. When rewards plateau, motivation crashes below baseline.

**Why it happens:**
It's the most common EdTech mistake: gamification is the easy answer to "students aren't engaging." Hanus & Fox (2015) found that gamified college courses led to *decreased* intrinsic motivation, lower satisfaction, and poorer academic performance compared to non-gamified controls. The overjustification effect is well-documented: when external rewards are introduced for an inherently enjoyable activity (creative writing), the internal motivation is partially displaced. For a product teaching *persuasive, creative, and poetic writing*, this is catastrophic — the entire point is developing intrinsic love for language.

Secondary school students are particularly vulnerable because they're in an identity-formation stage where "I write because I like it" vs. "I write because the app makes me" profoundly shapes self-concept as writers.

**How to avoid:**
- If gamification is used, align it with mastery (completion → next challenge, not points/leaderboards).
- Use "progress tracking" rather than "rewards" — show students their growing repertoire of figures, not a points tally.
- Design for intrinsic motivation: autonomy (choose which figure to practice), competence (visible skill growth), relatedness (share writing with peers/teacher) — Self-Determination Theory's three pillars.
- Never tie extrinsic rewards to creative output quality — only to effort/completion.
- If streaks are used, make them about "days practiced" (building habit) not "days you wrote something the AI liked" (performance pressure).

**Warning signs:**
- Team excitement about "adding gamification" without articulating *why* beyond engagement metrics.
- UI mockups featuring points, scores, or rankings before the core learning loop is validated.
- Student testing shows engagement spikes then drops when novelty wears off.

**Phase to address:**
Phase 2 (practice/engagement features) — the phase most likely to add gamification elements.

---

## Moderate Pitfalls

### Pitfall 6: Regional Spanish Variation Not Handled

**What goes wrong:**
The app treats "Spanish" as monolithic, but literary traditions, common figures, and even figure names vary across Spanish-speaking countries. "Hipérbole" examples from Spanish literature don't resonate with Mexican students; Argentine slang in student texts confuses the AI.

**Prevention:**
- Add regional annotation to the figure catalog (e.g., mark examples as "literatura española," "literatura latinoamericana").
- Design AI prompts that acknowledge regional variation: "In some Spanish-speaking countries, this figure is called X."
- Avoid using only Peninsular Spanish examples (this is the most common bias in Spanish educational materials).

**Phase to address:** Phase 1 (content catalog)

---

### Pitfall 7: Content Quality Degradation at Scale

**What goes wrong:**
The initial 15-20 figures are well-written, with clear explanations and rich literary examples. When expanding to 30+, 50+, the quality drops — generic descriptions, thin examples, AI-generated practice exercises that feel robotic. Users notice the cliff.

**Prevention:**
- Plan for a content creation process, not just a database expansion. Each figure needs: definition, 3+ literary examples from diverse Spanish traditions, 2+ student-facing explanations at different levels, practice prompts.
- Define quality gates: every new figure must be reviewed by a Spanish literature expert before publication.
- Don't let the catalog grow faster than quality can be maintained.

**Phase to address:** Phase 3+ (catalog expansion)

---

### Pitfall 8: Teacher vs. Student Dual-Mode Design Conflict

**What goes wrong:**
The product must work "in class with teacher" and "at home autonomous." But these are fundamentally different UX flows: teacher-led means assigned activities, progress dashboards, class-wide views. Autonomous means self-paced exploration, zero setup friction. Attempting both in one interface creates a confused product for both audiences.

**Prevention:**
- Design distinct modes (Teacher Mode, Student Mode) that share the same content but present different navigation and controls.
- Student-first: the core experience must work perfectly for self-directed use. Teacher features are additive.
- Don't build teacher dashboards until student experience is validated — teachers' #1 requirement is that students actually use the tool.

**Phase to address:** Phase 1 (student core) → Phase 3+ (teacher mode)

---

### Pitfall 9: Launching Before Learn→Practice→Analyze Cycle is Complete

**What goes wrong:**
The "learn" phase ships first, but "practice" and "analyze" are stubbed out. Users try the app, learn about figures, but can't practice or get feedback. The AIR's 6 EdTech Pitfalls report specifically warns: "Rolling out technology before software is fully functional" is a top failure mode.

**Prevention:**
- Define the minimum complete cycle: at least one figure must have the full learn→practice→analyze→feedback loop working before any external launch.
- Don't ship a "figure encyclopedia" — ship one figure that works end-to-end, then expand.
- The analyze phase (AI feedback on student writing) is the differentiator — without it, the app is just another reference resource.

**Phase to address:** Phase 1 (MVP must include full cycle for at least one figure)

---

### Pitfall 10: Treating Mobile Responsive as "Good Enough"

**What goes wrong:**
The web app works on desktop but on mobile, text is too small, tap targets are wrong, the writing area is cramped, and the AI feedback panel covers the student's text. Secondary students primarily use phones. Nielsen Norman Group research shows teens have different UX patterns: they're impatient, less tolerant of complex navigation, and likely to close tabs rather than troubleshoot.

**Prevention:**
- Design mobile-first, not desktop-first with responsive shrinking.
- Thumb-friendly navigation, generous tap targets at least 44×44px.
- The writing/analysis flow must work entirely on a phone screen: text area + feedback panel + figure reference visible simultaneously or with minimal scrolling.
- Test on actual phones with actual teenagers, not just browser dev tools.

**Phase to address:** Phase 1 (responsive design) and every subsequent phase

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Hardcoded figure catalog (no database) | Faster initial development | Every new figure requires code change; can't expand without engineering | Phase 1 MVP with ≤20 figures; must migrate to database before Phase 3 |
| English-first prompt engineering for LLM | Faster iteration using English-language prompt best practices | Spanish responses lack literary sophistication; figures get identified through English framing | Never — start with Spanish prompts from day 1 |
| No offline capability | Simpler architecture; always-fresh content | Unusable in schools with poor connectivity; alienates Latin American users | Phase 1 (online-only acceptable); Phase 2 must cache figure definitions and examples locally |
| Storing student texts in plain database | Easy to build feedback history | GDPR/privacy risk; harder to implement proper data deletion; compliance burden | Never — encrypt at rest, design for deletion from the start |
| Single LLM provider (no fallback) | Simpler integration | Provider outage = total product failure; vendor lock-in; cost spikes | Phase 1 acceptable (validate with one provider); Phase 2 must add failover |
| AI feedback without human validation layer | Instant gratification, simpler QA | Hallucinated literary analysis erodes trust; students internalize wrong concepts | Never for educational claims — always disclaim AI analysis as "suggested interpretation" and flag uncertainty |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| LLM API (OpenAI/Anthropic) | Sending full student text with no PII stripping | Parse text to remove names, school identifiers before API call; use data processing agreements |
| LLM API output | Trusting raw LLM output as educational content | Run output through validation layer: check against figure definitions, flag uncertain claims, strip evaluative language |
| School LMS (Google Classroom, etc.) | Building full LMS integration before validating core experience | Design core experience first; LMS integration is Phase 3+ after student validation |
| Teacher dashboard | Building admin features before student features | Student experience is the product; teacher dashboard is a complement, not the core |
| Bilingual interface | Auto-translating UI strings without context | Translate UI and content separately; UI terms have different register than literary terms; involve native speakers for both Spanish and English |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| LLM API latency on text analysis | Student waits 5-10s for feedback after submitting writing; gives up | Stream responses; show "thinking" animation with progressive disclosure; pre-compute suggestions for common patterns | >3 seconds perceived latency |
| Large figure catalog in single page load | Initial page takes 10s+ on mobile; figure reference is sluggish | Lazy-load catalog; split into categories; cache definitions locally (service worker) | >50 figures in catalog |
| Unbounded AI context window | Cost explodes as students write longer texts; API calls hit token limits | Implement smart truncation: send only the paragraph being analyzed + relevant figure definitions, not the entire essay | >2,000 words per analysis |
| Real-time text analysis on every keystroke | API costs per student per session become unsustainable | Debounce analysis to paragraph submission, not keystroke; batch similar requests; cache figure definitions server-side | >100 active students |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Sending student PII (name, school, email) to LLM APIs | COPPA/FERPA violation; data breach risk | Strip all PII before API calls; use session tokens, not user IDs; never send student names |
| Storing unhashed passwords for student accounts | Credential theft; unauthorized access | Use school SSO (Google/Microsoft) or magic link auth; if passwords, hash with bcrypt/argon2 |
| No rate limiting on AI analysis endpoint | API cost abuse; denial of service | Rate limit per session; implement cost monitoring; set per-student daily limits |
| Using student writing as training data | GDPR right to deletion; COPPA consent; reputational destruction | Contractual prohibition with LLM provider; zero data retention policy (OpenAI API supports this) |
| No audit trail for teacher access to student data | FERPA requires access controls for education records | Log all teacher access; implement role-based access; annual access review |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Overwhelming 15-20 figures at once | Cognitive overload; student gives up before starting | Progressive disclosure: start with 3-5 core figures, unlock more as mastery builds |
| AI feedback that "takes over" the writing | Student stops writing their own voice; writes to please the AI | Feedback should ask questions and suggest possibilities, never rewrite or dictate |
| Academic/technical tone in AI responses | Secondary students feel talked down to; disengage | Warm, conversational tone at appropriate reading level; use "tú" not "usted" |
| No way to save/compare writing iterations | Student can't see their growth; loses motivation | Version history with before/after views; "your growth" timeline showing progress |
| Requiring account creation before trying | Drop-off before value proposition is experienced | Let students try one figure analysis anonymously; ask for account only when saving |
| Desktop-optimized writing area on mobile | Frustrating typing experience; students abandon writing tasks | Mobile-optimized writing area with appropriate font size, spacing, and auto-save |

## "Looks Done But Isn't" Checklist

- [ ] **AI Feedback Engine:** Often missing uncertainty indicators — verify that ambiguous analyses are flagged as "possible interpretation" not "correct answer"
- [ ] **Figure Catalog:** Often missing regional variation notes — verify each figure has examples from diverse Spanish-speaking traditions
- [ ] **Student Writing Area:** Often missing auto-save — verify text persists across page refreshes, browser crashes, and accidental navigation
- [ ] **Practice Exercises:** Often missing connection to student's own context — verify exercises ask students to create, not just identify, figures
- [ ] **Mobile Experience:** Often missing thumb-friendly navigation — verify all interactive elements are at least 44×44px tap targets
- [ ] **Privacy Compliance:** Often missing parent consent flow for under-13 users — verify COPPA compliance if targeting secondary students
- [ ] **Bilingual Interface:** Often missing context-aware translation — verify "personificación" doesn't become machine-translated "personification" in contexts where "figuración de persona" is standard
- [ ] **Offline Capability:** Often missing cached figure definitions — verify core content works without constant internet
- [ ] **Data Deletion:** Often missing proper GDPR right-to-erasure — verify student texts can be fully deleted on request

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| AI hallucination in educational content | HIGH | Re-audit all AI output patterns; add validation layer; communicate with affected users |
| Tutor-to-judge drift | MEDIUM | Rewrite system prompts; add output filter for evaluative terms; user testing for tone |
| Privacy non-compliance | HIGH | Engage legal/privacy counsel; implement data deletion; retroactive consent collection; may require breach notification |
| Gamification undermining motivation | MEDIUM | Redesign reward system around mastery; remove competitive elements; A/B test intrinsic vs extrinsic framing |
| Regional Spanish bias | LOW-MEDIUM | Add regional content tags; diversify example corpus; engage regional literature experts |
| Incomplete learn→practice→analyze cycle | MEDIUM | Prioritize closing the loop for 3-5 figures rather than expanding catalog; redesign MVP scope |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| AI hallucination presenting false analysis | Phase 1: AI feedback engine | Red-team testing: adversarial inputs that should trigger uncertainty/flagging; accuracy audit on 50+ Spanish literary passages |
| Spanish NLP gap for rhetorical figures | Phase 1: Figure catalog + prompt design | Each of 15-20 figures tested with ≥10 Spanish literary examples from diverse regions; AI accuracy ≥80% on validated test set |
| Tutor-turned-judge drift | Phase 1: AI interaction model | Output audit: zero evaluative language (score, grade, correct/incorrect) in 100+ sample outputs; tone review by educator |
| Student data privacy | Phase 1: Data architecture | Privacy impact assessment; PII stripping verified in API calls; data deletion test; COPPA/FERPA/GDPR compliance review |
| Overjustification from gamification | Phase 2: Practice features | A/B test: intrinsic-motivation framing vs. points/rewards; measure creative output quality, not just engagement |
| Regional Spanish variation | Phase 1: Content catalog | Regional review: each figure has examples from ≥3 Spanish-speaking regions; Mexican, Argentine, and Spanish reviewers approve |
| Content quality at scale | Phase 3+: Catalog expansion | Quality gate: each new figure reviewed by Spanish literature expert before publication; content audit quarterly |
| Teacher vs. student dual-mode | Phase 3+: Teacher mode | Usability test: teachers can set assignment; students can self-direct; modes don't interfere with each other |
| Incomplete cycle before launch | Phase 1: MVP | Full learn→practice→analyze loop works end-to-end for ≥1 figure before any external launch |
| Mobile responsive as afterthought | Phase 1: Core UI | Mobile usability test with actual teenagers; thumb-reach map verified; writing experience viable on phone |

## Sources

- AIR (2013). *Six Common Pitfalls of Ed-Tech Programs (and How to Avoid Them)*. American Institutes for Research.
- EdSurge (2017). *5 All-Too-Common Ways Edtech Implementations Fail*.
- Edutopia (2023). *Common Edtech Mistakes—and How Schools Can Avoid Them*.
- EdTech Magazine (2023). *Avoid These Four Pitfalls When Implementing Online Education Software in K–12*.
- Sanchez-Bayona, E. (2021). *MegaLite: A New Spanish Literature Corpus for NLP Tasks*. CS&IT.
- Kühn, R. & Mitrović, J. (2024). *The Elephant in the Room: Ten Challenges of Computational Detection of Rhetorical Figures*. ACL FigLang Workshop.
- Multilingual BookNLP (NEH Grant, UC Berkeley). *Building a Literary NLP Pipeline Across Languages*. Notes on Spanish NLP gaps for literary vs. news text.
- ACL (2022). *Challenges and Strategies in Cross-Cultural NLP*. On Spanish dialectal variation and PLM limitations.
- Faculty Focus (2025). *Mitigating Hallucinations in LLMs for Community College Classrooms*.
- Faculty Focus (2025). *When AI Gets It Wrong: A Pedagogical Approach*. On using AI errors as teaching moments.
- MIT Sloan EdTech (2025). *When AI Gets It Wrong: Addressing AI Hallucinations and Bias*.
- IJTLE (2025). *Hallucinations in Large Language Models for Education*. Comprehensive review of hallucination risks in educational contexts.
- 6b Education (2024). *Building Privacy-Compliant Systems: EdTech Development Under GDPR, COPPA, and FERPA*.
- US Dept. of Education (2014). *Protecting Student Privacy While Using Online Educational Services*.
- Hanus, M. & Fox, J. (2015). *Assessing the Effects of Gamification on Motivation, Effort, and Performance*. Found decreased intrinsic motivation and satisfaction in gamified courses.
- Dichev, C. & Dicheva, D. (2017). *Gamification in Education: A Systematic Mapping Study*. Review showing mixed/null results when game elements are misapplied.
- Self-Determination Theory (Deci & Ryan): Autonomy, competence, relatedness as intrinsic motivation pillars.
- NNGroup. *Children's Websites: Usability Issues in Designing for Young People*. On teen-specific UX patterns.
- University of Michigan (2026). *FeedbackWriter study*: AI-mediated feedback → higher-quality revisions, but only with human oversight (TAs agreed with 88% of AI rubric judgments, corrected 12%).

---
*Pitfalls research for: Educational software teaching rhetorical/literary figures in Spanish with AI-powered analysis*
*Researched: 2026-05-04*