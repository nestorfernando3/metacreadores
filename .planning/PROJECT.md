# Metacreadores

## What This Is

Software educativo que enseña figuras retóricas y literarias a estudiantes de secundaria en español, usando IA como tutor que analiza los textos del estudiante, resalta figuras retóricas y explica por qué funcionan o no. Desarrolla pensamiento crítico y escritura persuasiva, creativa y poética a través de un ciclo de aprender → practicar → analizar.

## Core Value

La IA como lector experto que analiza el texto del estudiante y le explica por qué una figura funciona o se siente forzada — retroalimentación tipo tutor, no calificación.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Estudiante puede aprender figuras retóricas con explicaciones claras y ejemplos en español
- [ ] Estudiante puede practicar escritura usando figuras específicas con ejercicios guiados
- [ ] Estudiante puede analizar textos literarios existentes identificando figuras retóricas
- [ ] IA analiza textos escritos por el estudiante y resalta figuras con explicaciones tipo tutor
- [ ] Catálogo inicial de 15-20 figuras retóricas esenciales (metáfora, símil, hipérbole, personificación, aliteración, etc.)
- [ ] Interfaz bilingüe español/inglés
- [ ] Funciona en contexto de aula con docente y de uso autónomo por el estudiante
- [ ] Experiencia web responsive que funcione bien en móvil y desktop

### Out of Scope

- Calificación automática con puntuación — la IA es tutor, no juez
- Catálogo exhaustivo de 80+ figuras — se empieza con las esenciales
- App móvil nativa — web responsive primero
- Contenido solo en español — se contempla opción bilingüe

## Context

- Las figuras retóricas son fundamentales para el pensamiento crítico y la escritura efectiva en secundaria
- Los recursos actuales (libros de texto, videos) no ofrecen retroalimentación personalizada sobre el uso de figuras
- El diferenciador clave es el análisis con IA que actúa como tutor: resalta y explica, no califica
- El ciclo pedagógico es aprender → practicar → analizar
- Funciona tanto en clase (con docente) como en casa (autónomo)
- Contenido en español con opción bilingüe español/inglés

## Constraints

- **Idioma**: Contenido principal en español, interfaz bilingüe — el español es el idioma primario del contenido educativo
- **Plataforma**: Web responsive — debe funcionar bien en móvil y desktop, sin app nativa inicialmente
- **Alcance inicial**: 15-20 figuras esenciales, no catálogo exhaustivo
- **Tono de IA**: Tutor que guía, no juez que califica

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| IA como tutor, no calificador | Desarrolla pensamiento crítico sin frustrar al estudiante | — Pending |
| 15-20 figuras esenciales primero | Permite calidad en contenido y ejercicios antes de ampliar | — Pending |
| Web responsive, no app nativa | Alcance máximo con menor inversión inicial | — Pending |
| Bilingüe español/inglés | Amplía audiencia sin duplicar esfuerzo de contenido | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2025-05-04 after initialization*