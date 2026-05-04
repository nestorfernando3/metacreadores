# Feature Landscape

**Domain:** Educational software for teaching rhetorical and literary figures to secondary school students (Spanish-language, AI-tutor approach)
**Researched:** 2025-05-04

## Table Stakes

Features users expect. Missing = product feels incomplete.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| Figure catalog with definitions & examples | Every competitor (Wordwall, Educaplay, "Figuras Literarias" app, TPT resources) starts here. Students need a reference to learn from. | Low | Start with 15-20 essential figures per PROJECT.md. Each entry: name, definition, Spanish example, English equivalent, tip for identification. |
| Interactive identification exercises | Quiz-style "which figure is this?" is the bare minimum. Wordwall has 10,000+ results for "figuras literarias". Educaplay, Kahoot, Quizlet all do this. | Low-Med | Must include multiple-choice, matching, and classification exercises. Adaptive difficulty (easier → harder sentences) is table stakes in 2025. |
| Clear explanations in student-friendly Spanish | Current resources (QuillBot Spanish, TPT, worksheets) tend toward academic/formal tone. Students expect accessible language. | Low | Avoid textbook stiffness. Use conversational Spanish that secondary students actually understand. |
| Writing practice with guided prompts | NoRedInk, Quill.org, and every writing tool offers practice prompts. Without writing practice, the tool is just a flashcard app. | Med | Prompts should be contextual ("Write a metaphor describing a sunset") not generic ("Write something"). |
| Progress tracking (student view) | IXL, Prodigy, Khan Academy, Duolingo all show progress. Students expect to see how they're doing. | Med | Mastery levels per figure (struggling → beginning → approaching → proficient, per NoRedInk's model). Visual progress dashboard. |
| Progress tracking (teacher view) | Every edtech platform from NoRedInk to Kahoot to Quizalize provides teacher dashboards. Teachers won't adopt without it. | Med-High | Class overview, individual student progress, identify struggling students. Must integrate with Google Classroom. |
| Mobile-responsive web | Students use phones. Parents expect mobile access. PROJECT.md explicitly requires responsive web. | Low | CSS media queries + responsive layout. No native app needed initially. |
| Bilingual interface (Spanish/English) | PROJECT.md requires it. Many secondary students in Latin America and US Hispanic communities are bilingual. | Med | Interface toggle only. Content (lessons, examples) remains in Spanish as primary language. |

## Differentiators

Features that set Metacreadores apart. Not expected, but valued.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **AI tutor analysis of student writing** | The CORE differentiator. No existing Spanish-language tool does this. AI reads student text, highlights rhetorical figures, and explains *why they work* or *why they feel forced* — like a human tutor, not a grader. | High | This is the product's reason to exist. Artie (Australian) does literary technique identification for HSC English, but it's narrow and English-only. CoGrader and AVID's Instructional AI provide rubric-based grading, not tutor-style explanation. Metacreadores is uniquely positioned: tutor feedback, not scores. |
| **Tutor-tone feedback (not scores)** | Removes the anxiety of "being graded" that frustrates secondary students. Feedback sounds like a supportive teacher: "This metaphor is vivid because X. Consider Y to make it even stronger." Not "6/10". | Med | Tone is a design choice, not a technical feature. LLM prompt engineering + custom system prompt. Requires careful UX so feedback feels personal, not generic. |
| **Real-world text analysis** | Analyze song lyrics, news headlines, sports journalism, social media posts, poems — not just textbook passages. Research shows using sports digital newspapers to teach rhetoric in ESO is effective (UEx study on 4,025 headlines). | Med | Student or teacher pastes text → AI identifies figures and explains them. Makes rhetoric feel alive, not academic. |
| **Personalized learning path** | Adaptive sequencing based on which figures the student has mastered vs. struggling with. NoRedInk and Prodigy do this in math/grammar. | Med-High | Track per-figure mastery. Recommend next figure to learn based on proximity (e.g., learn personification before learning prosopopeia). Suggest exercises on weaker figures. |
| **Bilingual figure explanations (Spanish-primary, English-available)** | Most resources are English-only (Figurative Language worksheets) or Spanish-only dry academic text. Having both languages with proper Spanish terminology (metáfora, hipérbole, etc.) as primary is rare and valuable. | Med | Definitions in Spanish. Toggle to see English equivalent. Critical for US bilingual programs and Latin American international schools. |
| **"Forzado vs. Efectivo" feedback** | When a student uses a figure awkwardly, the AI doesn't just say "wrong" — it explains *why* it feels forced ("Tu hipérbole exagera tanto que pierde credibilidad") and suggests how to strengthen it. | Med | This is the tutor magic. Requires nuanced LLM prompts that evaluate quality, not just presence. |
| **Contextual figure discovery** | When a student writes text, the AI doesn't just label "this is a metaphor" — it shows *where* in the text the figure is, *what effect* it creates, and *how* it connects to what the student is trying to express. | Med-High | Text annotation UI (highlight + tooltip). Needs a good text editor component. |

## Anti-Features

Features to explicitly NOT build.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Automatic scoring/grading** | Contradicts the core philosophy: AI as tutor, not judge. Taking a number score shifts motivation from learning to gaming the score. | Show mastery level (beginning → approaching → proficient) and qualitative feedback. No numbers, no percentages, no letter grades. |
| **Exhaustive 80+ figure catalog** | More figures ≠ better learning. Starting with 80+ figures means shallow content per figure. Quality over quantity. | Start with 15-20 essential figures (metáfora, símil, hipérbole, personificación, aliteración, etc.) with deep content. Expand later based on usage data. |
| **Native mobile apps (iOS/Android)** | Doubles development cost, delays launch, and responsive web reaches 95%+ of users. Mobile apps are a v2 consideration. | Build responsive web with PWA-ready features (offline cache for figure catalog, add-to-homescreen). |
| **AI-generated writing for students** | If the AI writes for the student, they learn nothing about crafting figures. This defeats the pedagogical purpose. | AI should only analyze, highlight, and suggest. Never generate student text. The student writes; the AI reads and responds. |
| **Plagiarism detection** | Not the product's purpose. Adds significant complexity (text comparison databases, legal considerations). Students here are learning, not publishing. | Focus on original writing analysis instead. If teachers need plagiarism checking, they can use existing tools (Turnitin, QuillBot). |
| **Social/competitive leaderboards** | Competition demotivates struggling writers. Seeing yourself at position 47/50 on a leaderboard doesn't help you learn metaphor. | Focus on personal progress (your own mastery journey). Optional classroom challenges that emphasize collaboration, not rank. |
| **Curriculum lock-in** |locking to a specific country's curriculum (e.g., only LOMLOE Spain) limits reach across Latin America, US bilingual programs, etc. | Align loosely with common curricular themes (appears in most secondary curricula) but allow teacher flexibility to assign and reorder. |
| **Video content production** | High cost, low update flexibility, hard to localize. Video is resource-intensive and quickly becomes stale. | Use text + interactive examples + AI explanations. If video is demanded later, start with short clips (1-2 min) that can be swapped easily. |

## Feature Dependencies

```
Figure Catalog → Interactive Exercises → Writing Practice → AI Tutor Analysis
                    ↓                        ↓                    ↓
              Progress Tracking ← ← ← ← ← ← ← ← ← ← ← ← ← ← 
                    ↓
              Teacher Dashboard
                    ↓
              Personalized Learning Path

Bilingual Interface (independent — can be built at any time)
Real-World Text Analysis (depends on AI Tutor Analysis being built first)
"Forzado vs. Efectivo" Feedback (depends on AI Tutor Analysis being built first)
```

**Critical path:** Figure Catalog → Interactive Exercises → Writing Practice → AI Tutor Analysis

This is the learn → practice → analyze cycle from PROJECT.md. Everything else layers on top.

## MVP Recommendation

Prioritize:
1. **Figure catalog with 15-20 essential figures** (definitions, examples, Spanish-primary content) — without this, nothing else matters
2. **AI tutor analysis of student writing** — the core differentiator; ship this as early as possible to validate the "tutor not grader" thesis
3. **Writing practice with guided prompts** — closes the learn → practice → analyze loop

Defer:
- **Personalized learning path**: Requires usage data from exercises. Build after tracking is in place.
- **Teacher dashboard**: Start with student-facing only. Teachers can see student work in v2.
- **Real-world text analysis**: Bonus feature. Add after core loop works.
- **Bilingual interface**: Start Spanish-only for MVP. Add English toggle in v1.1.

## Sources

| Source | Type | Confidence |
|--------|------|------------|
| NoRedInk (noredink.com) | Competitor analysis — writing/grammar platform with adaptive exercises, diagnostics, progress tracking | HIGH |
| Artie (artofsmart.com.au) | Competitor — AI English tutor with literary technique identification, thesis builder, quote finder | HIGH |
| CoGrader (cograder.com) | Competitor — AI rubric-based grader/feedback, AP Lang focus | MEDIUM |
| Quill.org | Competitor — free literacy activities, sentence combining, diagnostic, progress tracking | HIGH |
| Wordwall/Educaplay | Competitor — gamified exercises for Spanish rhetorical figures (10,000+ user-created activities) | HIGH |
| Grammarly/QuillBot | Reference — writing feedback tools (grammar, style, tone) but not education-focused | MEDIUM |
| AVID Instructional AI | Reference — AI feedback for student writing, consistency across large classes | MEDIUM |
| Prodigy/Khan Academy/IXL | Reference — adaptive learning, progress tracking, gamification models for edtech | HIGH |
| UEx Study on teaching rhetoric via sports headlines | Research — validated using real-world texts (sports journalism) for teaching rhetorical figures in ESO | MEDIUM |
| TPT (Teachers Pay Teachers) | Market signal — abundant paid resources for Spanish literary devices. Demand exists. | HIGH |
| Flint K12 (flintk12.com) | Reference — AI tutor platform with personalized tutoring, document upload, mistake learning | MEDIUM |