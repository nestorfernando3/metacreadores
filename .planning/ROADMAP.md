# Roadmap: Metacreadores

## Overview

Metacreadores se construye en cuatro fases que siguen el ciclo pedagógico aprender → practicar → analizar. Primero se establece el catálogo de figuras retóricas y la autenticación (Phase 1). Luego se entrega el diferenciador central: la IA que analiza textos del estudiante con tono tutor (Phase 2). Después se añaden ejercicios prácticos y seguimiento de progreso (Phase 3). Finalmente se habilita el modo docente para contexto de aula (Phase 4). Este orden asegura que el ciclo pedagógico esté completo antes de expandir a funcionalidades de terceros.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

- [ ] **Phase 1: Fundamentos y Catálogo** - Catálogo de 15-20 figuras retóricas, autenticación, internacionalización y diseño responsive
- [ ] **Phase 2: Análisis con IA** - Editor de escritura, motor de análisis de figuras y retroalimentación tipo tutor
- [ ] **Phase 3: Práctica y Progreso** - Ejercicios interactivos, seguimiento de progreso y dificultad adaptativa
- [ ] **Phase 4: Modo Docente** - Dashboard para docentes, asignación de ejercicios y vista de progreso de clase

## Phase Details

### Phase 1: Fundamentos y Catálogo
**Goal**: Estudiantes pueden explorar y aprender figuras retóricas, y acceder de forma segura a sus cuentas
**Depends on**: Nothing (first phase)
**Requirements**: CATALOG-01, CATALOG-02, CATALOG-03, CATALOG-04, CATALOG-05, AUTH-01, AUTH-02, AUTH-03
**Success Criteria** (what must be TRUE):
  1. Estudiante puede ver definiciones claras y ejemplos de literatura real para cada figura retórica
  2. Estudiante puede navegar y buscar entre 15-20 figuras esenciales por nombre o tipo
  3. Usuario puede registrarse e iniciar sesión con email y contraseña
  4. Sesión de usuario persiste entre navegaciones del navegador
  5. Interfaz funciona en español e inglés, y es usable tanto en móvil como en escritorio
**Plans**: TBD
**UI hint**: yes

### Phase 2: Análisis con IA
**Goal**: Estudiantes pueden escribir textos y recibir retroalimentación de IA con tono tutor que explica por qué una figura funciona o se siente forzada
**Depends on**: Phase 1
**Requirements**: WRITE-01, WRITE-02, WRITE-03, WRITE-04, WRITE-05, PROG-01
**Success Criteria** (what must be TRUE):
  1. Estudiante puede escribir texto en un editor con formato básico
  2. IA resalta figuras retóricas encontradas en el texto del estudiante de forma visual e inline
  3. IA explica por qué una figura funciona o se siente forzada, usando tono de tutor (nunca calificador)
  4. IA sugiere figuras específicas que podrían mejorar el texto
  5. Estudiante puede guardar textos escritos en su cuenta para revisarlos después
**Plans**: TBD
**UI hint**: yes

### Phase 3: Práctica y Progreso
**Goal**: Estudiantes pueden practicar identificación y completado de figuras, y visualizar su trayectoria de aprendizaje
**Depends on**: Phase 1, Phase 2
**Requirements**: EXER-01, EXER-02, EXER-03, EXER-04, EXER-05, PROG-02, PROG-03
**Success Criteria** (what must be TRUE):
  1. Estudiante puede practicar identificación de figuras retóricas en textos
  2. Estudiante puede practicar completar figuras retóricas incompletas
  3. Estudiante recibe retroalimentación inmediata en ejercicios
  4. Dificultad de ejercicios se adapta al nivel demostrado por el estudiante
  5. Estudiante puede ver su progreso: figuras practicadas, ejercicios completados y textos guardados
**Plans**: TBD
**UI hint**: yes

### Phase 4: Modo Docente
**Goal**: Docentes pueden monitorear el progreso de su clase y asignar práctica dirigida
**Depends on**: Phase 1, Phase 3
**Requirements**: TEACH-01, TEACH-02
**Success Criteria** (what must be TRUE):
  1. Docente puede ver panorama de progreso de todos los estudiantes en su clase
  2. Docente puede identificar estudiantes que necesitan apoyo adicional
  3. Docente puede asignar ejercicios o figuras específicas a estudiantes individuales o a toda la clase
**Plans**: TBD
**UI hint**: yes

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Fundamentos y Catálogo | 0/TBD | Not started | - |
| 2. Análisis con IA | 0/TBD | Not started | - |
| 3. Práctica y Progreso | 0/TBD | Not started | - |
| 4. Modo Docente | 0/TBD | Not started | - |
