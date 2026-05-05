# Phase 4 Context: Modo Docente

## Domain

Phase 4 adds classroom support: teachers can monitor student progress, view class-wide analytics, and assign specific figures or exercises to individuals or groups. This enables structured classroom use of Metacreadores.

## Decisions

### Product Behavior
- **Teacher role:** stored in profiles.role, defaults to "student"
- **Class grouping:** simple join table (classes → class_students) for v1
- **Assignments:** teachers assign specific figures to specific students or entire classes
- **Student progress visibility:** teachers see the same progress data students see, aggregated per class
- **No curriculum builder:** v1 assignments are simple "practice this figure" directives

### Technical Constraints
- Role-gated routes: /teacher/* pages check role before rendering
- Reuse existing user_progress and writing_submissions data
- Reuse existing ExerciseProgress components
- No real-time updates needed for v1

### Deferred
- Teacher grading/review of student texts (v2)
- Class configuration (difficulty, locale, curriculum) (v2)

---

*Created: 2025-05-04*
*Phase: 4 — Modo Docente*
