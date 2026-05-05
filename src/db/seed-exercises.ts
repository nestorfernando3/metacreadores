// ---------------------------------------------------------------------------
// Seed data: 40 practice exercises (2 per figure)
// Each figure gets 1 identification + 1 completion exercise
// ---------------------------------------------------------------------------

export interface SeedExercise {
  slug: string; // figure slug (matched programmatically during seeding)
  type: "identification" | "completion";
  prompt: string;
  promptEn: string;
  options: string[] | null; // null for completion exercises
  correctAnswer: string;
  difficultyLevel: number;
}

/**
 * 40 exercises across all 20 figures.
 * Identification: pick the figure from 4 options.
 * Completion: fill in a missing word/phrase.
 */
export const seedExercises: SeedExercise[] = [
  // =========================================================================
  // 1. METÁFORA (difficultyLevel: 1)
  // =========================================================================
  {
    slug: "metafora",
    type: "identification",
    prompt:
      '¿Qué figura retórica encontramos en el verso "la vida es sueño, y los sueños, sueños son"?',
    promptEn:
      'Which rhetorical figure do we find in the verse "life is a dream, and dreams themselves are but dreams"?',
    options: ["Metáfora", "Símil", "Hipérbole", "Personificación"],
    correctAnswer: "Metáfora",
    difficultyLevel: 1,
  },
  {
    slug: "metafora",
    type: "completion",
    prompt:
      'Completa la metáfora de Pablo Neruda: "Quiero hacer contigo lo que la ________ hace con los cerezos."',
    promptEn:
      'Complete Neruda\'s metaphor: "I want to do with you what ________ does with the cherry trees."',
    options: null,
    correctAnswer: "primavera",
    difficultyLevel: 1,
  },

  // =========================================================================
  // 2. SÍMIL (difficultyLevel: 1)
  // =========================================================================
  {
    slug: "simil",
    type: "identification",
    prompt:
      '¿Qué figura retórica usa José Martí cuando escribe "Mírame, madre, llorando / como un pájaro sin nido"?',
    promptEn:
      'Which rhetorical figure does José Martí use when he writes "Look at me, mother, crying / like a bird without a nest"?',
    options: ["Metáfora", "Símil", "Antítesis", "Anáfora"],
    correctAnswer: "Símil",
    difficultyLevel: 1,
  },
  {
    slug: "simil",
    type: "completion",
    prompt:
      'Completa el símil de Sor Juana Inés de la Cruz: "Como el ave sin ________ que vaga de rama en rama, así vaga mi cuidado sin hallar dicha ni calma."',
    promptEn:
      'Complete Sor Juana\'s simile: "Like the bird without ________ that wanders from branch to branch, so wanders my care without finding happiness or calm."',
    options: null,
    correctAnswer: "arrimo",
    difficultyLevel: 1,
  },

  // =========================================================================
  // 3. HIPÉRBOLE (difficultyLevel: 1)
  // =========================================================================
  {
    slug: "hiperbole",
    type: "identification",
    prompt:
      '¿Qué figura retórica utiliza Gabriel García Márquez al escribir que la lluvia en Macondo "no cesó en cuatro años, once meses y dos días"?',
    promptEn:
      'Which rhetorical figure does Gabriel García Márquez use when he writes that the rain in Macondo "did not cease for four years, eleven months, and two days"?',
    options: ["Hipérbole", "Metonimia", "Polisíndeton", "Eufemismo"],
    correctAnswer: "Hipérbole",
    difficultyLevel: 1,
  },
  {
    slug: "hiperbole",
    type: "completion",
    prompt:
      'Completa la hipérbole de Mario Benedetti: "Tardé en conocerme toda una ________."',
    promptEn:
      'Complete Mario Benedetti\'s hyperbole: "It took me a whole ________ to know myself."',
    options: null,
    correctAnswer: "vida",
    difficultyLevel: 1,
  },

  // =========================================================================
  // 4. PERSONIFICACIÓN (difficultyLevel: 1)
  // =========================================================================
  {
    slug: "personificacion",
    type: "identification",
    prompt:
      '¿Qué figura retórica emplea Juan Rulfo al escribir "el viento gemía en los alambrados con un lamento largo y triste"?',
    promptEn:
      'Which rhetorical figure does Juan Rulfo use when he writes "the wind moaned in the wire fences with a long, sad lament"?',
    options: ["Aliteración", "Personificación", "Onomatopeya", "Hipérbaton"],
    correctAnswer: "Personificación",
    difficultyLevel: 1,
  },
  {
    slug: "personificacion",
    type: "completion",
    prompt:
      'Completa la personificación de Antonio Machado: "El amor es una ________ que siempre está encendida."',
    promptEn:
      'Complete Antonio Machado\'s personification: "Love is a ________ that is always burning."',
    options: null,
    correctAnswer: "hoguera",
    difficultyLevel: 1,
  },

  // =========================================================================
  // 5. ALITERACIÓN (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "aliteracion",
    type: "identification",
    prompt:
      '¿Qué figura retórica utiliza Rubén Darío en "Con el ala aleve del leve abanico"?',
    promptEn:
      'Which rhetorical figure does Rubén Darío use in "With the light wing of the gentle fan"?',
    options: ["Anáfora", "Aliteración", "Paralelismo", "Asíndeton"],
    correctAnswer: "Aliteración",
    difficultyLevel: 2,
  },
  {
    slug: "aliteracion",
    type: "completion",
    prompt:
      'La aliteración de Garcilaso repite el sonido de la letra "____" para imitar el zumbido de las abejas.',
    promptEn:
      'Garcilaso\'s alliteration repeats the sound of the letter "____" to imitate the buzzing of bees.',
    options: null,
    correctAnswer: "s",
    difficultyLevel: 2,
  },

  // =========================================================================
  // 6. ONOMATOPEYA (difficultyLevel: 1)
  // =========================================================================
  {
    slug: "onomatopeya",
    type: "identification",
    prompt:
      '¿Qué figura retórica encontramos en la expresión "tic-tac del reloj" y "plic, plac" de la lluvia en el tejado?',
    promptEn:
      'Which rhetorical figure do we find in the expressions "tick-tock of the clock" and "plic, plac" of rain on the roof?',
    options: ["Aliteración", "Onomatopeya", "Paronomasia", "Hipérbaton"],
    correctAnswer: "Onomatopeya",
    difficultyLevel: 1,
  },
  {
    slug: "onomatopeya",
    type: "completion",
    prompt:
      'Completa la onomatopeya de García Lorca: "¡El brinco del ridículo saltamontes! / ¡________-________-________...!"',
    promptEn:
      'Complete García Lorca\'s onomatopoeia: "The leap of the ridiculous grasshopper! / ________-________-________...!"',
    options: null,
    correctAnswer: "cric-cric-cric",
    difficultyLevel: 1,
  },

  // =========================================================================
  // 7. HIPÉRBATON (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "hiperbaton",
    type: "identification",
    prompt:
      '¿Qué figura retórica consiste en alterar el orden lógico de las palabras en una oración, como hace Góngora en "suspirad, y cantad, y el agua que en las piedras suspira"?',
    promptEn:
      'Which rhetorical figure consists of altering the logical order of words in a sentence, as Góngora does in his poetry?',
    options: ["Anáfora", "Hipérbaton", "Paralelismo", "Polisíndeton"],
    correctAnswer: "Hipérbaton",
    difficultyLevel: 2,
  },
  {
    slug: "hiperbaton",
    type: "completion",
    prompt:
      'Completa: Lope de Vega antepone el complemento al verbo: "A mis ________ voy, de mis ________ vengo."',
    promptEn:
      'Complete: Lope de Vega places the complement before the verb: "To my ________ I go, from my ________ I come."',
    options: null,
    correctAnswer: "soledades",
    difficultyLevel: 2,
  },

  // =========================================================================
  // 8. ANÁFORA (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "anafora",
    type: "identification",
    prompt:
      '¿Qué figura retórica encontramos en la repetición de "para" al inicio de varios versos de Neruda?',
    promptEn:
      'Which rhetorical figure do we find in the repetition of "para" (so that) at the beginning of several verses by Neruda?',
    options: ["Anáfora", "Paralelismo", "Polisíndeton", "Aliteración"],
    correctAnswer: "Anáfora",
    difficultyLevel: 2,
  },
  {
    slug: "anafora",
    type: "completion",
    prompt:
      'Completa la anáfora de Jaime Sabines: "No cerrarás los ojos, / no ________, / no te irás, / no te dejaré sola ni en la muerte."',
    promptEn:
      'Complete Jaime Sabines\' anaphora: "You will not close your eyes, / you will not ________, / you will not leave, / I will not leave you alone not even in death."',
    options: null,
    correctAnswer: "morirás",
    difficultyLevel: 2,
  },

  // =========================================================================
  // 9. PARALELISMO (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "paralelismo",
    type: "identification",
    prompt:
      '¿Qué figura retórica emplea Lope de Vega al repetir la estructura "es [sustantivo] que [verbo]" en cuatro versos seguidos?',
    promptEn:
      'Which rhetorical figure does Lope de Vega use when repeating the structure "it is [noun] that [verb]" for four consecutive verses?',
    options: ["Anáfora", "Paralelismo", "Antítesis", "Polisíndeton"],
    correctAnswer: "Paralelismo",
    difficultyLevel: 2,
  },
  {
    slug: "paralelismo",
    type: "completion",
    prompt:
      'Completa el paralelismo de Pablo Neruda: "Es tan corto el amor, y tan ________ el olvido."',
    promptEn:
      'Complete Pablo Neruda\'s parallelism: "Love is so short, and ________ is so long."',
    options: null,
    correctAnswer: "largo",
    difficultyLevel: 2,
  },

  // =========================================================================
  // 10. OXÍMORON (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "oximoron",
    type: "identification",
    prompt:
      '¿Qué figura retórica une términos opuestos como "hielo abrasador" y "fuego helado"?',
    promptEn:
      'Which rhetorical figure unites opposite terms like "burning ice" and "frozen fire"?',
    options: ["Antítesis", "Oxímoron", "Paradoja", "Hipérbole"],
    correctAnswer: "Oxímoron",
    difficultyLevel: 2,
  },
  {
    slug: "oximoron",
    type: "completion",
    prompt:
      'Completa el oxímoron de San Juan de la Cruz: "La música ________, la soledad sonora."',
    promptEn:
      'Complete San Juan de la Cruz\'s oxymoron: "________ music, resounding solitude."',
    options: null,
    correctAnswer: "callada",
    difficultyLevel: 2,
  },

  // =========================================================================
  // 11. ANTÍTESIS (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "antitesis",
    type: "identification",
    prompt:
      '¿Qué figura retórica contrapone dos ideas opuestas, como en "Es tan corto el amor, y tan largo el olvido"?',
    promptEn:
      'Which rhetorical figure contrasts two opposite ideas, as in "Love is so short, and forgetting is so long"?',
    options: ["Oxímoron", "Antítesis", "Paralelismo", "Ironía"],
    correctAnswer: "Antítesis",
    difficultyLevel: 2,
  },
  {
    slug: "antitesis",
    type: "completion",
    prompt:
      'Completa la antítesis de Quevedo: "Ayer se fue; mañana no ha llegado; / hoy se está yendo sin parar un punto: / soy un fue, y un será, y un ________ cansado."',
    promptEn:
      'Complete Quevedo\'s antithesis: "Yesterday left; tomorrow has not arrived; / today is leaving without stopping: / I am a was, and a will-be, and a tired ________."',
    options: null,
    correctAnswer: "es",
    difficultyLevel: 2,
  },

  // =========================================================================
  // 12. EUFEMISMO (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "eufemismo",
    type: "identification",
    prompt:
      '¿Qué figura retórica evita nombrar directamente la muerte llamándola "la mar" donde desembocan los ríos?',
    promptEn:
      'Which rhetorical figure avoids naming death directly by calling it "the sea" where rivers flow?',
    options: ["Metonimia", "Eufemismo", "Símil", "Sinécdoque"],
    correctAnswer: "Eufemismo",
    difficultyLevel: 2,
  },
  {
    slug: "eufemismo",
    type: "completion",
    prompt:
      'Completa el eufemismo de Antonio Machado: "Se nos fue... como se van las tardes, / ________, casi sin sentir."',
    promptEn:
      'Complete Antonio Machado\'s euphemism: "He left us... as afternoons leave, / ________, almost without feeling it."',
    options: null,
    correctAnswer: "calladamente",
    difficultyLevel: 2,
  },

  // =========================================================================
  // 13. IRONÍA (difficultyLevel: 3)
  // =========================================================================
  {
    slug: "ironia",
    type: "identification",
    prompt:
      '¿Qué figura retórica consiste en dar a entender lo contrario de lo que se dice, como hace Cervantes al hacer que don Quijote se compare con los caballeros de la tabla redonda mientras usa un refrán vulgar?',
    promptEn:
      'Which rhetorical figure consists of implying the opposite of what is said, as Cervantes does when Don Quixote compares himself to knights of the Round Table while using a vulgar proverb?',
    options: ["Sarcasmo", "Ironía", "Paradoja", "Humor"],
    correctAnswer: "Ironía",
    difficultyLevel: 3,
  },
  {
    slug: "ironia",
    type: "completion",
    prompt:
      'Completa la irónica afirmación de Borges sobre la lectura en su país: "En este país no se lee porque no se ________."',
    promptEn:
      'Complete Borges\' ironic statement about reading in his country: "In this country they don\'t read because they don\'t ________."',
    options: null,
    correctAnswer: "escribe",
    difficultyLevel: 3,
  },

  // =========================================================================
  // 14. SINESTESIA (difficultyLevel: 3)
  // =========================================================================
  {
    slug: "sinestesia",
    type: "identification",
    prompt:
      '¿Qué figura retórica mezcla sensaciones de diferentes sentidos, como en "verdes sonidos" o "azul sonoro"?',
    promptEn:
      'Which rhetorical figure mixes sensations from different senses, as in "green sounds" or "sonorous blue"?',
    options: ["Metonimia", "Sinestesia", "Metáfora", "Paronomasia"],
    correctAnswer: "Sinestesia",
    difficultyLevel: 3,
  },
  {
    slug: "sinestesia",
    type: "completion",
    prompt:
      'Completa la sinestesia de Rubén Darío: "El ________ sonoro de tu mirada."',
    promptEn:
      'Complete Rubén Darío\'s synesthesia: "The sonorous ________ of your gaze."',
    options: null,
    correctAnswer: "azul",
    difficultyLevel: 3,
  },

  // =========================================================================
  // 15. METONIMIA (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "metonimia",
    type: "identification",
    prompt:
      '¿Qué figura retórica designa una cosa con el nombre de otra relacionada, como "leí a Borges" (significa leí su obra)?',
    promptEn:
      'Which rhetorical figure designates one thing with the name of another related thing, as in "I read Borges" (meaning I read his work)?',
    options: ["Sinécdoque", "Metonimia", "Metáfora", "Símil"],
    correctAnswer: "Metonimia",
    difficultyLevel: 2,
  },
  {
    slug: "metonimia",
    type: "completion",
    prompt:
      'Completa la metonimia de José Martí: "El ________ se levantó contra la tiranía." (El material representa las armas.)',
    promptEn:
      'Complete José Martí\'s metonymy: "The ________ rose up against tyranny." (The material represents the weapons.)',
    options: null,
    correctAnswer: "acero",
    difficultyLevel: 2,
  },

  // =========================================================================
  // 16. SÍNÉCDOQUE (difficultyLevel: 3)
  // =========================================================================
  {
    slug: "sinecdoque",
    type: "identification",
    prompt:
      '¿Qué figura retórica designa el todo por la parte, como cuando Neruda usa "sal" para representar el agua del mar?',
    promptEn:
      'Which rhetorical figure designates the whole by its part, as when Neruda uses "salt" to represent sea water?',
    options: ["Metonimia", "Sinécdoque", "Eufemismo", "Metáfora"],
    correctAnswer: "Sinécdoque",
    difficultyLevel: 3,
  },
  {
    slug: "sinecdoque",
    type: "completion",
    prompt:
      'Completa la sínécdoque de Benedetti: "Bajé las escaleras de tu casa / contando los ________ como si cada uno fuera un año de nuestra vida."',
    promptEn:
      'Complete Benedetti\'s synecdoche: "I went down the stairs of your house / counting the ________ as if each one were a year of our life."',
    options: null,
    correctAnswer: "peldaños",
    difficultyLevel: 3,
  },

  // =========================================================================
  // 17. POLISÍNDETON (difficultyLevel: 3)
  // =========================================================================
  {
    slug: "polisindeton",
    type: "identification",
    prompt:
      '¿Qué figura retórica repite conjunciones innecesariamente, como en "y el mundo andaba y andaba / y el viento andaba / y el mar andaba"?',
    promptEn:
      'Which rhetorical figure unnecessarily repeats conjunctions, as in "and the world walked and walked / and the wind walked / and the sea walked"?',
    options: ["Anáfora", "Polisíndeton", "Asíndeton", "Paralelismo"],
    correctAnswer: "Polisíndeton",
    difficultyLevel: 3,
  },
  {
    slug: "polisindeton",
    type: "completion",
    prompt:
      'Completa el polisíndeton de César Vallejo: "Sucede que me canso de ser hombre: / que entro en las sastrerías y en los cines / y en los hoteles y en los ________ / y en las iglesias y en los almacenes."',
    promptEn:
      'Complete César Vallejo\'s polysyndeton: "It happens that I tire of being a man: / that I enter tailor shops and cinemas / and hotels and ________ / and churches and department stores."',
    options: null,
    correctAnswer: "hospitales",
    difficultyLevel: 3,
  },

  // =========================================================================
  // 18. ASÍNDETON (difficultyLevel: 3)
  // =========================================================================
  {
    slug: "asindeton",
    type: "identification",
    prompt:
      '¿Qué figura retórica omite las conjunciones entre palabras, como en "Plaza, jabón, toalla, agua, peine, espejo"?',
    promptEn:
      'Which rhetorical figure omits conjunctions between words, as in "Plaza, soap, towel, water, comb, mirror"?',
    options: ["Polisíndeton", "Asíndeton", "Anáfora", "Enumeración"],
    correctAnswer: "Asíndeton",
    difficultyLevel: 3,
  },
  {
    slug: "asindeton",
    type: "completion",
    prompt:
      'Completa el asíndeton de Valle-Inclán: "Vino, mujer, tabaco, noche, / madrugada, sueño, ________."',
    promptEn:
      'Complete Valle-Inclán\'s asyndeton: "Wine, woman, tobacco, night, / dawn, sleep, ________."',
    options: null,
    correctAnswer: "olvido",
    difficultyLevel: 3,
  },

  // =========================================================================
  // 19. ANACOLUTO (difficultyLevel: 3)
  // =========================================================================
  {
    slug: "anacoluto",
    type: "identification",
    prompt:
      '¿Qué figura retórica rompe la estructura sintáctica de una oración, como cuando Rulfo escribe "Yo... bueno... que me voy"?',
    promptEn:
      'Which rhetorical figure breaks the syntactic structure of a sentence, as when Rulfo writes "I... well... that I\'m leaving"?',
    options: ["Hipérbaton", "Anacoluto", "Elipsis", "Asíndeton"],
    correctAnswer: "Anacoluto",
    difficultyLevel: 3,
  },
  {
    slug: "anacoluto",
    type: "completion",
    prompt:
      'Completa el anacoluto de Gabriela Mistral: "________, cuando me pongo a caminar, / me parece que el mundo se acaba."',
    promptEn:
      'Complete Gabriela Mistral\'s anacoluthon: "________, when I start walking, / it seems to me that the world ends."',
    options: null,
    correctAnswer: "Yo",
    difficultyLevel: 3,
  },

  // =========================================================================
  // 20. PARONOMASIA (difficultyLevel: 2)
  // =========================================================================
  {
    slug: "paronomasia",
    type: "identification",
    prompt:
      '¿Qué figura retórica juega con palabras de sonido similar pero significado diferente, como "pluma" y "espuma"?',
    promptEn:
      'Which rhetorical figure plays with words of similar sound but different meaning, like "pen" and "foam"?',
    options: ["Aliteración", "Paronomasia", "Onomatopeya", "Sinestesia"],
    correctAnswer: "Paronomasia",
    difficultyLevel: 2,
  },
  {
    slug: "paronomasia",
    type: "completion",
    prompt:
      'Completa la paronomasia de Quevedo: "Suerrero de la pluma, / no de la espada, / que la pluma es la ________ / de la alborada."',
    promptEn:
      'Complete Quevedo\'s paronomasia: "Warrior of the pen, / not of the sword, / for the pen is the ________ / of the dawn."',
    options: null,
    correctAnswer: "espuma",
    difficultyLevel: 2,
  },
];
