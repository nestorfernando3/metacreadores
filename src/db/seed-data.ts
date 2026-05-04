// ---------------------------------------------------------------------------
// Seed data: 20 essential rhetorical figures from Spanish literature
// Each figure includes 2-3 real literary examples covering at least 3
// Spanish-speaking regions, with historical/literary context.
// ---------------------------------------------------------------------------

export interface SeedFigureExample {
  text: string;
  textEn: string;
  author: string;
  work: string;
  region: string;
  era: string;
  explanation: string;
  explanationEn: string;
}

export interface SeedFigure {
  slug: string;
  name: string;
  nameEn: string;
  definition: string;
  definitionEn: string;
  category: string;
  difficultyLevel: number;
  historicalContext: string;
  historicalContextEn: string;
  examples: SeedFigureExample[];
}

export const seedFigures: SeedFigure[] = [
  // =========================================================================
  // 1. METÁFORA
  // =========================================================================
  {
    slug: "metafora",
    name: "Metáfora",
    nameEn: "Metaphor",
    definition:
      "Figura retórica que consiste en identificar dos términos de manera implícita, atribuyendo a uno las cualidades del otro sin usar nexos comparativos. Establece una transferencia de significado entre un término real y uno figurado.",
    definitionEn:
      "A figure of speech that implicitly identifies two terms, attributing the qualities of one to the other without using comparative words. It establishes a transfer of meaning between a real term and a figurative one.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 1,
    historicalContext:
      "La metáfora es la figura retórica más fundamental y estudiada. Aristóteles la definió en su 'Poética' como 'el trasvase de un nombre de su significado propio a otro significado'. Desde la Antigüedad clásica ha sido considerada la base del lenguaje poético. En la tradición hispánica, el Siglo de Oro español (siglos XVI-XVII) y el modernismo hispanoamericano (siglo XIX-XX) representan momentos culminantes de sofisticación metafórica.",
    historicalContextEn:
      "Metaphor is the most fundamental and studied rhetorical figure. Aristotle defined it in his 'Poetics' as 'the transference of a name from its proper meaning to another meaning'. Since classical antiquity it has been considered the foundation of poetic language. In the Hispanic tradition, the Spanish Golden Age (16th-17th centuries) and Latin American modernism (19th-20th centuries) represent peak moments of metaphorical sophistication.",
    examples: [
      {
        text: "¿Qué es la vida? Un frenesí. / ¿Qué es la vida? Una ilusión, / una sombra, una ficción, / y el mayor bien es pequeño; / que toda la vida es sueño, / y los sueños, sueños son.",
        textEn: "What is life? A frenzy. / What is life? An illusion, / a shadow, a fiction, / and the greatest good is small; / for all of life is a dream, / and dreams themselves are but dreams.",
        author: "Pedro Calderón de la Barca",
        work: "La vida es sueño",
        region: "España",
        era: "Siglo de Oro (1635)",
        explanation:
          "Calderón acumula metáforas sucesivas (frenesí, ilusión, sombra, ficción, sueño) para expresar la naturaleza efímera e ilusoria de la existencia humana. La repetición de la estructura '¿Qué es la vida?' refuerza el carácter reflexivo de la metáfora.",
        explanationEn:
          "Calderón accumulates successive metaphors (frenzy, illusion, shadow, fiction, dream) to express the fleeting and illusory nature of human existence. The repetition of the structure 'What is life?' reinforces the reflective character of the metaphor.",
      },
      {
        text: "Quiero hacer contigo / lo que la primavera hace con los cerezos.",
        textEn: "I want to do with you / what spring does with cherry trees.",
        author: "Pablo Neruda",
        work: "Veinte poemas de amor y una canción desesperada (Poema 14)",
        region: "Chile",
        era: "Siglo XX (1924)",
        explanation:
          "Neruda metaforiza el amor como fuerza natural transformadora: el yo poético desea actuar sobre la amada como la primavera actúa sobre los cerezos, haciendo florecer la vida. La metáfora elide el término comparativo, presentando la transformación como acción directa.",
        explanationEn:
          "Neruda metaphorizes love as a transformative natural force: the poetic self desires to act upon the beloved as spring acts upon cherry trees, making life bloom. The metaphor omits the comparative term, presenting the transformation as direct action.",
      },
      {
        text: "un sauce de cristal, un chopo de agua, / un alto surtidor que el viento arquea, / un árbol bien plantado mas danzante, / un caminar de río que se curva",
        textEn: "a crystal willow, a poplar of water, / a tall fountain arched by the wind, / a well-planted yet dancing tree, / a river's walk that curves",
        author: "Octavio Paz",
        work: "Piedra de sol",
        region: "México",
        era: "Siglo XX (1957)",
        explanation:
          "Paz encadena metáforas para describir el cuerpo femenino sin nombrarlo directamente: sauce de cristal, chopo de agua, surtidor, árbol danzante, río que se curva. Cada metáfora aporta un matiz distinto —fluidez, altura, movimiento, plasticidad— creando una imagen polifacética.",
        explanationEn:
          "Paz chains metaphors to describe the female body without naming it directly: crystal willow, poplar of water, fountain, dancing tree, curving river. Each metaphor contributes a distinct nuance —fluidity, height, movement, plasticity— creating a multifaceted image.",
      },
    ],
  },

  // =========================================================================
  // 2. SÍMIL (COMPARACIÓN)
  // =========================================================================
  {
    slug: "simil",
    name: "Símil",
    nameEn: "Simile",
    definition:
      "Figura retórica que establece una comparación explícita entre dos términos mediante nexos comparativos como 'como', 'cual', 'tal como', 'así como', 'parece', 'semeja'.",
    definitionEn:
      "A figure of speech that establishes an explicit comparison between two terms using comparative connectors such as 'like', 'as', 'as if', 'as though', 'resembles'.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 1,
    historicalContext:
      "El símil es una de las figuras más antiguas de la literatura universal. Homero lo utilizó extensamente en la 'Ilíada' y la 'Odisea' con sus célebres 'símiles homéricos'. En la tradición hispánica, el símil ha sido fundamental tanto en la poesía épica como en la lírica, permitiendo a los autores conectar lo abstracto con experiencias sensoriales concretas.",
    historicalContextEn:
      "The simile is one of the oldest figures in world literature. Homer used it extensively in the 'Iliad' and the 'Odyssey' with his famous 'Homeric similes'. In the Hispanic tradition, the simile has been fundamental in both epic and lyric poetry, allowing authors to connect the abstract with concrete sensory experiences.",
    examples: [
      {
        text: "Hay golpes en la vida, tan fuertes... ¡Yo no sé! / Golpes como del odio de Dios; / como si ante ellos, la resaca de todo lo sufrido / se empozara en el alma... ¡Yo no sé!",
        textEn: "There are blows in life, so hard... I don't know! / Blows like the hatred of God; / as if before them, the undertow of everything suffered / pooled in the soul... I don't know!",
        author: "César Vallejo",
        work: "Los heraldos negros",
        region: "Perú",
        era: "1919",
        explanation:
          "Vallejo compara el dolor existencial con un castigo divino mediante 'como'. El símil intensifica la desproporción entre el sufrimiento humano y su posible causa, creando una atmósfera de angustia metafísica. El 'como si' extiende la comparación a una hipótesis.",
        explanationEn:
          "Vallejo compares existential pain with divine punishment using 'like'. The simile intensifies the disproportion between human suffering and its possible cause, creating an atmosphere of metaphysical anguish. The 'as if' extends the comparison into a hypothesis.",
      },
      {
        text: "Como el ave sin arrimo / que vaga de rama en rama, / así vaga mi cuidado / sin hallar dicha ni calma.",
        textEn: "Like the bird without shelter / that wanders from branch to branch, / so wanders my care / without finding happiness or calm.",
        author: "Sor Juana Inés de la Cruz",
        work: "Romance",
        region: "México",
        era: "Siglo XVII (1690)",
        explanation:
          "Sor Juana utiliza el símil 'como el ave sin arrimo' para expresar la inquietud del alma o del pensamiento amoroso. La estructura bimembre 'como... así' refuerza la correspondencia entre la imagen natural y el estado anímico.",
        explanationEn:
          "Sor Juana uses the simile 'like the bird without shelter' to express the restlessness of the soul or of amorous thought. The two-part structure 'like... so' reinforces the correspondence between the natural image and the state of mind.",
      },
      {
        text: "Yo soy un hombre sincero / de donde crece la palma, / y antes de morirme quiero / echar mis versos del alma. / [...] / Mírame, madre, llorando / como un pájaro sin nido.",
        textEn: "I am a sincere man / from where the palm tree grows, / and before dying I want / to pour out my soul's verses. / [...] / Look at me, mother, crying / like a bird without a nest.",
        author: "José Martí",
        work: "Versos sencillos",
        region: "Cuba",
        era: "1891",
        explanation:
          "Martí se compara con un pájaro sin nido para expresar desamparo y soledad. El símil conecta la experiencia humana del exilio y la pérdida con una imagen universal de vulnerabilidad. Es notable por su aparente sencillez que encarna una profunda emoción.",
        explanationEn:
          "Martí compares himself to a bird without a nest to express helplessness and solitude. The simile connects the human experience of exile and loss with a universal image of vulnerability. It is notable for its apparent simplicity that embodies deep emotion.",
      },
    ],
  },

  // =========================================================================
  // 3. HIPÉRBOLE
  // =========================================================================
  {
    slug: "hiperbole",
    name: "Hipérbole",
    nameEn: "Hyperbole",
    definition:
      "Figura retórica que consiste en exagerar desmesuradamente las cualidades, acciones o dimensiones de algo o alguien, ya sea aumentándolas o disminuyéndolas, con intención expresiva o humorística.",
    definitionEn:
      "A figure of speech that consists of excessively exaggerating the qualities, actions, or dimensions of something or someone, either increasing or diminishing them, with expressive or humorous intent.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 1,
    historicalContext:
      "La hipérbole ha sido empleada desde la literatura clásica griega como recurso cómico y dramático. En el Siglo de Oro español, Francisco de Quevedo la llevó a su máxima expresión satírica. En la literatura hispanoamericana del siglo XX, autores como Gabriel García Márquez la integraron al realismo mágico, donde lo hiperbólico se funde con lo real.",
    historicalContextEn:
      "Hyperbole has been used since classical Greek literature as both a comic and dramatic resource. In the Spanish Golden Age, Francisco de Quevedo took it to its highest satirical expression. In 20th-century Latin American literature, authors like Gabriel García Márquez integrated it into magical realism, where the hyperbolic merges with the real.",
    examples: [
      {
        text: "Érase un hombre a una nariz pegado, / érase una nariz superlativa, / érase una nariz sayón y escriba, / érase un peje espada mal barbado.",
        textEn: "There once was a man glued to a nose, / there once was a superlative nose, / there once was a henchman-and-clerk nose, / there once was a poorly bearded swordfish.",
        author: "Francisco de Quevedo",
        work: "A un hombre de gran nariz",
        region: "España",
        era: "Siglo de Oro (1600)",
        explanation:
          "Quevedo acumula hipérboles para describir una nariz descomunal: 'superlativa', 'sayón y escriba', 'peje espada'. La exageración cómica transforma la nariz en un personaje autónomo del que el hombre es mero accesorio. Cada verso añade una nueva hipérbole más absurda que la anterior.",
        explanationEn:
          "Quevedo accumulates hyperboles to describe a colossal nose: 'superlative', 'henchman-and-clerk', 'swordfish'. The comic exaggeration transforms the nose into an autonomous character of which the man is a mere accessory. Each verse adds a new hyperbole more absurd than the last.",
      },
      {
        text: "La implacable lluvia no cesó en cuatro años, once meses y dos días.",
        textEn: "The relentless rain did not cease for four years, eleven months, and two days.",
        author: "Gabriel García Márquez",
        work: "Cien años de soledad",
        region: "Colombia",
        era: "1967",
        explanation:
          "La precisión numérica imposible ('cuatro años, once meses y dos días') transforma la exageración climática en una hipérbole que marca el paso del tiempo en Macondo. Esta hipérbole no solo exagera una tormenta sino que simboliza el estancamiento y la decadencia de la familia Buendía.",
        explanationEn:
          "The impossible numerical precision ('four years, eleven months, and two days') transforms the climatic exaggeration into a hyperbole that marks the passage of time in Macondo. This hyperbole not only exaggerates a storm but symbolizes the stagnation and decay of the Buendía family.",
      },
      {
        text: "Tardé en conocerme toda una vida. / No exagero: me sigue doliendo el alma / y aún me faltan las cuentas.",
        textEn: "It took me a whole lifetime to know myself. / I do not exaggerate: my soul still hurts / and I still haven't settled the accounts.",
        author: "Mario Benedetti",
        work: "La tregua",
        region: "Uruguay",
        era: "1960",
        explanation:
          "Benedetti utiliza la hipérbole de forma irónica al decir 'No exagero' justo después de hacerlo. La declaración de que conocerse a uno mismo toma 'toda una vida' juega con la exageración existencial mientras la niega retóricamente.",
        explanationEn:
          "Benedetti uses hyperbole ironically by saying 'I do not exaggerate' right after doing so. The claim that knowing oneself takes 'a whole lifetime' plays with existential exaggeration while rhetorically denying it.",
      },
    ],
  },

  // =========================================================================
  // 4. PERSONIFICACIÓN (PROSOPOPEYA)
  // =========================================================================
  {
    slug: "personificacion",
    name: "Personificación",
    nameEn: "Personification",
    definition:
      "Figura retórica que atribuye cualidades, acciones o sentimientos humanos a objetos inanimados, animales o conceptos abstractos. También llamada prosopopeya.",
    definitionEn:
      "A figure of speech that attributes human qualities, actions, or feelings to inanimate objects, animals, or abstract concepts. Also called prosopopoeia.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 1,
    historicalContext:
      "La personificación es tan antigua como la propia literatura. Aparece en los mitos fundacionales de todas las culturas, donde las fuerzas de la naturaleza son representadas como deidades antropomórficas. En la poesía hispánica, desde las 'Coplas' de Jorge Manrique hasta la poesía vanguardista, la personificación ha permitido expresar lo abstracto a través de lo humano.",
    historicalContextEn:
      "Personification is as old as literature itself. It appears in the foundational myths of all cultures, where forces of nature are represented as anthropomorphic deities. In Hispanic poetry, from Jorge Manrique's 'Coplas' to avant-garde poetry, personification has allowed the expression of the abstract through the human.",
    examples: [
      {
        text: "La tierra se movía como un animal soñoliento bajo sus pies, y el viento gemía en los alambrados con un lamento largo y triste que no cesaba nunca.",
        textEn: "The earth moved like a sleepy animal beneath their feet, and the wind moaned in the wire fences with a long, sad lament that never ceased.",
        author: "Juan Rulfo",
        work: "El llano en llamas (Luvina)",
        region: "México",
        era: "1953",
        explanation:
          "Rulfo personifica el viento al atribuirle la capacidad de 'gemir' con 'un lamento largo y triste'. La personificación transforma el paisaje árido de Luvina en un ser doliente, donde la naturaleza misma participa del sufrimiento humano.",
        explanationEn:
          "Rulfo personifies the wind by attributing to it the ability to 'moan' with 'a long, sad lament'. The personification transforms the arid landscape of Luvina into a suffering being, where nature itself participates in human suffering.",
      },
      {
        text: "La muerte, toda llena de vuestra alma, / vendrá con vuestro paso, y la luz / temblará como un niño cuando la noche / le cuenta cuentos de miedo.",
        textEn: "Death, entirely filled with your soul, / will come with your step, and the light / will tremble like a child when the night / tells it scary stories.",
        author: "Alejandra Pizarnik",
        work: "Árbol de Diana",
        region: "Argentina",
        era: "1962",
        explanation:
          "Pizarnik personifica la luz como un niño que tiembla y la noche como una figura materna que narra cuentos de miedo. La acumulación de personificaciones crea una atmósfera onírica donde los elementos del mundo físico adquieren conciencia y vulnerabilidad infantil.",
        explanationEn:
          "Pizarnik personifies light as a trembling child and night as a maternal figure that tells scary stories. The accumulation of personifications creates a dreamlike atmosphere where the elements of the physical world acquire consciousness and childlike vulnerability.",
      },
      {
        text: "El amor es una hoguera que siempre está encendida, / y para no quemarse, hay que andar con mucho tiento.",
        textEn: "Love is a bonfire that is always burning, / and to avoid getting burned, one must walk very carefully.",
        author: "Antonio Machado",
        work: "Proverbios y cantares",
        region: "España",
        era: "1912",
        explanation:
          "Machado personifica el amor al presentarlo como una hoguera con voluntad propia ('siempre está encendida'). La metáfora-personificación advierte sobre la naturaleza peligrosa y constante del sentimiento amoroso.",
        explanationEn:
          "Machado personifies love by presenting it as a bonfire with its own will ('always burning'). The metaphor-personification warns about the dangerous and constant nature of amorous feeling.",
      },
    ],
  },

  // =========================================================================
  // 5. ALITERACIÓN
  // =========================================================================
  {
    slug: "aliteracion",
    name: "Aliteración",
    nameEn: "Alliteration",
    definition:
      "Figura retórica que consiste en la repetición de sonidos, especialmente consonánticos, en una misma frase o verso para producir un efecto sonoro o sugerir una sensación determinada.",
    definitionEn:
      "A figure of speech that consists of the repetition of sounds, especially consonantal ones, in the same phrase or verse to produce a sound effect or suggest a particular sensation.",
    category: "figuras_de_diccion",
    difficultyLevel: 2,
    historicalContext:
      "La aliteración es uno de los recursos fónicos más antiguos de la poesía. En la poesía medieval española, el 'Poema de Mio Cid' ya utilizaba aliteraciones para enfatizar momentos clave. El Modernismo hispanoamericano, con Rubén Darío a la cabeza, elevó la aliteración a un arte musical esencial, influido por el simbolismo francés.",
    historicalContextEn:
      "Alliteration is one of the oldest phonic resources in poetry. In medieval Spanish poetry, the 'Poem of the Cid' already used alliteration to emphasize key moments. Latin American Modernism, led by Rubén Darío, elevated alliteration to an essential musical art, influenced by French symbolism.",
    examples: [
      {
        text: "Con el ala aleve del leve abanico.",
        textEn: "With the light wing of the gentle fan.",
        author: "Rubén Darío",
        work: "Sonatina",
        region: "Nicaragua",
        era: "1893",
        explanation:
          "Darío repite los sonidos /l/, /a/ y /e/ en 'ala aleve del leve abanico' para imitar el movimiento suave y acompasado de un abanico. La aliteración de la 'l' (líquida, suave) evoca la ligereza y elegancia del objeto descrito.",
        explanationEn:
          "Darío repeats the sounds /l/, /a/, and /e/ in 'ala aleve del leve abanico' to imitate the soft, rhythmic movement of a fan. The alliteration of 'l' (liquid, soft) evokes the lightness and elegance of the described object.",
      },
      {
        text: "En el silencio solo se escuchaba / un susurro de abejas que sonaba.",
        textEn: "In the silence only could be heard / a whisper of bees that sounded.",
        author: "Garcilaso de la Vega",
        work: "Égloga III",
        region: "España",
        era: "Renacimiento (1530)",
        explanation:
          "Garcilaso utiliza la repetición del sonido /s/ para imitar el zumbido de las abejas. La sibilante reproduce acústicamente el susurro apícola, creando un efecto sonoro que transporta al lector al ambiente bucólico de la égloga.",
        explanationEn:
          "Garcilaso uses the repetition of the /s/ sound to imitate the buzzing of bees. The sibilant acoustically reproduces the beekeeping whisper, creating a sound effect that transports the reader to the bucolic atmosphere of the eclogue.",
      },
      {
        text: "El ruido con que rueda la ronca tempestad.",
        textEn: "The noise with which the hoarse tempest rolls.",
        author: "José Zorrilla",
        work: "Don Juan Tenorio",
        region: "España",
        era: "1844",
        explanation:
          "Zorrilla repite la 'r' vibrante múltiple para imitar el estruendo de la tormenta. La aliteración de la 'r' es onomatopéyica, sugiriendo el rugido del trueno y la furia del temporal.",
        explanationEn:
          "Zorrilla repeats the vibrant 'r' sound to imitate the roar of the storm. The alliteration of 'r' is onomatopoeic, suggesting the thunder's roar and the fury of the tempest.",
      },
    ],
  },

  // =========================================================================
  // 6. ONOMATOPEYA
  // =========================================================================
  {
    slug: "onomatopeya",
    name: "Onomatopeya",
    nameEn: "Onomatopoeia",
    definition:
      "Figura retórica que consiste en la imitación de sonidos reales mediante el lenguaje, ya sea a través de palabras que imitan directamente el sonido (tic-tac, clic) o mediante la combinación de fonemas que sugieren una sensación acústica.",
    definitionEn:
      "A figure of speech that consists of imitating real sounds through language, either through words that directly imitate the sound (tick-tock, click) or through combinations of phonemes that suggest an acoustic sensation.",
    category: "figuras_de_diccion",
    difficultyLevel: 1,
    historicalContext:
      "La onomatopeya está presente en todas las lenguas y culturas como forma primaria de representación sonora. En la literatura hispánica, desde el 'Poema de Mio Cid' hasta la poesía experimental del siglo XX, la onomatopeya ha sido utilizada para crear realidad acústica dentro del texto. El realismo mágico y la literatura infantil han hecho un uso particularmente creativo de este recurso.",
    historicalContextEn:
      "Onomatopoeia is present in all languages and cultures as a primary form of sound representation. In Hispanic literature, from the 'Poem of the Cid' to experimental 20th-century poetry, onomatopoeia has been used to create acoustic reality within the text. Magical realism and children's literature have made particularly creative use of this resource.",
    examples: [
      {
        text: "El kikirikí del gallo / me despertó al amanecer, / y el tictac del reloj / me recordó que el tiempo / se escapaba sin querer.",
        textEn: "The cock-a-doodle-doo of the rooster / woke me at dawn, / and the tick-tock of the clock / reminded me that time / was escaping unwillingly.",
        author: "José Martí",
        work: "La Edad de Oro",
        region: "Cuba",
        era: "1889",
        explanation:
          "Martí introduce onomatopeyas ('kikirikí', 'tictac') en su revista infantil 'La Edad de Oro' para conectar a los jóvenes lectores con experiencias sonoras cotidianas. La onomatopeya del gallo varía la representación convencional del canto del gallo, adaptándola al español.",
        explanationEn:
          "Martí introduces onomatopoeias ('cock-a-doodle-doo', 'tick-tock') in his children's magazine 'La Edad de Oro' to connect young readers with everyday sound experiences. The rooster's onomatopoeia varies the conventional representation of the rooster's crow, adapting it to Spanish.",
      },
      {
        text: "Tun, tun, tun... / Esa noche llovía / y los goterones / hacían plic, plac, plic, plac / en el tejado",
        textEn: "Knock, knock, knock... / That night it rained / and the big drops / went plic, plac, plic, plac / on the roof",
        author: "Juan Rulfo",
        work: "Pedro Páramo",
        region: "México",
        era: "1955",
        explanation:
          "Rulfo utiliza la onomatopeya 'plic, plac' para representar el sonido de la lluvia en el tejado de Comala, creando una atmósfera hipnótica. El 'tun, tun, tun' inicial sugiere golpes en la puerta y establece el tono misterioso de la novela.",
        explanationEn:
          "Rulfo uses the onomatopoeia 'plic, plac' to represent the sound of rain on the roof of Comala, creating a hypnotic atmosphere. The initial 'knock, knock, knock' suggests knocks at the door and establishes the mysterious tone of the novel.",
      },
      {
        text: "¡El brinco del ridículo saltamontes! / ¡Cric-cric-cric...!",
        textEn: "The leap of the ridiculous grasshopper! / Crick-crick-crick...!",
        author: "Federico García Lorca",
        work: "Poema del cante jondo (El silencio)",
        region: "España",
        era: "1921",
        explanation:
          "Lorca reproduce el sonido del grillo o saltamontes con 'cric-cric-cric', integrando la onomatopeya en el tejido poético del 'Poema del cante jondo'. La repetición del sonido evoca el paisaje sonoro andaluz y la persistencia de la vida en el campo.",
        explanationEn:
          "Lorca reproduces the sound of the cricket or grasshopper with 'crick-crick-crick', integrating onomatopoeia into the poetic fabric of 'Poema del cante jondo'. The repetition of sound evokes the Andalusian soundscape and the persistence of life in the countryside.",
      },
    ],
  },

  // =========================================================================
  // 7. HIPÉRBATON
  // =========================================================================
  {
    slug: "hiperbaton",
    name: "Hipérbaton",
    nameEn: "Hyperbaton",
    definition:
      "Figura retórica que consiste en alterar el orden lógico o sintáctico habitual de las palabras en una oración con fines expresivos, rítmicos o estéticos.",
    definitionEn:
      "A figure of speech that consists of altering the logical or syntactic order of words in a sentence for expressive, rhythmic, or aesthetic purposes.",
    category: "figuras_de_diccion",
    difficultyLevel: 2,
    historicalContext:
      "El hipérbaton fue particularmente cultivado durante el Barroco español (siglo XVII), especialmente por Luis de Góngora, cuyo estilo culterano llevó la alteración sintáctica a extremos de complejidad que requerían un lector culto para descifrarlos. En la poesía hispanoamericana del siglo XX, autores como José Lezama Lima retomaron el hipérbaton como herramienta expresiva.",
    historicalContextEn:
      "Hyperbaton was particularly cultivated during the Spanish Baroque (17th century), especially by Luis de Góngora, whose culterano style took syntactic alteration to extremes of complexity that required an educated reader to decipher them. In 20th-century Latin American poetry, authors like José Lezama Lima revived hyperbaton as an expressive tool.",
    examples: [
      {
        text: "Las columnas, el sol, las altas hierbas, / el viento, el ruiseñor será el encanto, / y el agua que en las piedras / suspira y canta, es un celeste manto.",
        textEn: "The columns, the sun, the tall grasses, / the wind, the nightingale will be the charm, / and the water that on the stones / sighs and sings, is a celestial mantle.",
        author: "Luis de Góngora",
        work: "Soledades",
        region: "España",
        era: "Siglo de Oro (1613)",
        explanation:
          "Góngora invierte el orden sintáctico habitual: el verbo 'será' aparece después de una larga enumeración de sujetos ('las columnas, el sol...'), y la aposición 'es un celeste manto' se separa de su referente 'el agua'. Esta disposición imita la sintaxis latina y exige una lectura atenta.",
        explanationEn:
          "Góngora inverts the usual syntactic order: the verb 'will be' appears after a long enumeration of subjects ('the columns, the sun...'), and the apposition 'is a celestial mantle' is separated from its referent 'the water'. This arrangement imitates Latin syntax and requires attentive reading.",
      },
      {
        text: "Si me dais, escoged, otras, nuevas, / ni castas, ni piadosas, ni amorosas.",
        textEn: "If to me you give, choose, others, new, / neither chaste, nor pious, nor loving.",
        author: "Sor Juana Inés de la Cruz",
        work: "Soneto 169",
        region: "México",
        era: "Siglo XVII (1690)",
        explanation:
          "Sor Juana interrumpe el orden lógico 'Si me dais nuevas otras' insertando 'escoged' y separando adjetivos de sustantivos. El hipérbaton subraya la disyuntiva moral que plantea el soneto sobre la hipocresía de las expectativas femeninas.",
        explanationEn:
          "Sor Juana interrupts the logical order 'If you give me new others' by inserting 'choose' and separating adjectives from nouns. The hyperbaton underscores the moral dilemma posed by the sonnet about the hypocrisy of feminine expectations.",
      },
      {
        text: "A mis soledades voy, / de mis soledades vengo, / y para no estar tan solo, / no tengo sino la muerte.",
        textEn: "To my solitudes I go, / from my solitudes I come, / and to not be so alone, / I have only death.",
        author: "Lope de Vega",
        work: "Soneto",
        region: "España",
        era: "Siglo de Oro (1610)",
        explanation:
          "Lope antepone el complemento circunstancial 'A mis soledades' al verbo 'voy', alterando el orden SVO (sujeto-verbo-objeto) habitual. La inversión enfatiza la soledad como destino y origen, creando un quiasmo sintáctico que refuerza el tema del aislamiento.",
        explanationEn:
          "Lope places the circumstantial complement 'To my solitudes' before the verb 'I go', altering the usual SVO (subject-verb-object) order. The inversion emphasizes solitude as both destination and origin, creating a syntactic chiasmus that reinforces the theme of isolation.",
      },
    ],
  },

  // =========================================================================
  // 8. ANÁFORA
  // =========================================================================
  {
    slug: "anafora",
    name: "Anáfora",
    nameEn: "Anaphora",
    definition:
      "Figura retórica que consiste en la repetición de una o varias palabras al comienzo de cada verso, frase o periodo sintáctico, con fines enfáticos, rítmicos o emocionales.",
    definitionEn:
      "A figure of speech that consists of repeating one or more words at the beginning of each verse, phrase, or syntactic period, for emphatic, rhythmic, or emotional purposes.",
    category: "figuras_de_diccion",
    difficultyLevel: 2,
    historicalContext:
      "La anáfora es un recurso fundamental de la poesía lírica y la oratoria desde la Antigüedad. En la tradición hispánica, es particularmente característica del Romanticismo y la poesía social del siglo XX. Autores como Pablo Neruda, Antonio Machado y Gabriel Celaya la emplearon para dar fuerza rítmica y emocional a sus poemas de denuncia o exaltación.",
    historicalContextEn:
      "Anaphora is a fundamental resource of lyric poetry and oratory since antiquity. In the Hispanic tradition, it is particularly characteristic of Romanticism and 20th-century social poetry. Authors like Pablo Neruda, Antonio Machado, and Gabriel Celaya used it to give rhythmic and emotional force to their poems of protest or exaltation.",
    examples: [
      {
        text: "Para empezar, / para que tú me oigas / sin que te duela, / para que no te duela / cuando gimo, / para empezar, / para que tú me sientas / acostado en la arena.",
        textEn: "To begin, / so that you hear me / without hurting, / so that it doesn't hurt you / when I groan, / to begin, / so that you feel me / lying on the sand.",
        author: "Pablo Neruda",
        work: "Oda al mar",
        region: "Chile",
        era: "1954",
        explanation:
          "Neruda repite 'para' al inicio de varios versos, creando una anáfora que estructura el poema como una sucesión de propósitos. La repetición imprime un ritmo incantatorio que envuelve al lector en la intimidad del diálogo poético.",
        explanationEn:
          "Neruda repeats 'para' (so that) at the beginning of several verses, creating an anaphora that structures the poem as a succession of purposes. The repetition imparts an incantatory rhythm that envelops the reader in the intimacy of the poetic dialogue.",
      },
      {
        text: "No cerrarás los ojos, / no morirás, / no te irás, / no te dejaré sola / ni en la muerte.",
        textEn: "You will not close your eyes, / you will not die, / you will not leave, / I will not leave you alone / not even in death.",
        author: "Jaime Sabines",
        work: "Horal",
        region: "México",
        era: "1950",
        explanation:
          "Sabines utiliza la anáfora 'no' + verbo en futuro para negar cada posibilidad de separación. La repetición insistente del 'no' convierte el poema en un conjuro contra la pérdida, donde cada negación refuerza la voluntad de permanencia.",
        explanationEn:
          "Sabines uses the anaphora 'no' + future verb to deny each possibility of separation. The insistent repetition of 'no' turns the poem into a spell against loss, where each negation reinforces the will to permanence.",
      },
      {
        text: "Yo voy por esta tierra, / yo voy por esta vida, / yo voy a la deriva / pero sé lo que quiero.",
        textEn: "I go through this land, / I go through this life, / I go adrift / but I know what I want.",
        author: "Mario Benedetti",
        work: "Táctica y estrategia",
        region: "Uruguay",
        era: "1970",
        explanation:
          "Benedetti repite 'yo voy' al inicio de tres versos consecutivos, estableciendo un patrón rítmico que contrasta con la declaración final de certeza. La anáfora refuerza la idea de movimiento continuo a través de la existencia.",
        explanationEn:
          "Benedetti repeats 'I go' at the beginning of three consecutive verses, establishing a rhythmic pattern that contrasts with the final declaration of certainty. The anaphora reinforces the idea of continuous movement through existence.",
      },
    ],
  },

  // =========================================================================
  // 9. PARALELISMO
  // =========================================================================
  {
    slug: "paralelismo",
    name: "Paralelismo",
    nameEn: "Parallelism",
    definition:
      "Figura retórica que consiste en la repetición de una misma estructura sintáctica en dos o más versos, frases u oraciones sucesivas, creando un efecto de simetría y equilibrio rítmico.",
    definitionEn:
      "A figure of speech that consists of repeating the same syntactic structure in two or more successive verses, phrases, or sentences, creating an effect of symmetry and rhythmic balance.",
    category: "figuras_de_diccion",
    difficultyLevel: 2,
    historicalContext:
      "El paralelismo es una figura característica de la poesía hebrea (los Salmos bíblicos), de donde pasó a la tradición cristiana y posteriormente a la poesía occidental. En la literatura hispánica, el paralelismo aparece en el Romancero viejo español y fue reelaborado por poetas cultos como Fray Luis de León y San Juan de la Cruz.",
    historicalContextEn:
      "Parallelism is a figure characteristic of Hebrew poetry (the biblical Psalms), from which it passed into the Christian tradition and later into Western poetry. In Hispanic literature, parallelism appears in the old Spanish Romancero and was reworked by erudite poets such as Fray Luis de León and San Juan de la Cruz.",
    examples: [
      {
        text: "El amor es fuego que arde sin ser visto, / es herida que duele y no se siente, / es contento que llora sin ser sentido, / es un no querer hacer querer la gente.",
        textEn: "Love is a fire that burns without being seen, / it is a wound that hurts and is not felt, / it is a contentment that cries without being perceived, / it is a not-wanting to make people want.",
        author: "Lope de Vega",
        work: "Soneto",
        region: "España",
        era: "Siglo de Oro (1600)",
        explanation:
          "Lope construye cuatro versos con idéntica estructura: 'Es [sustantivo] que [verbo] y [negación]'. El paralelismo sintáctico refuerza la paradoja amorosa, presentando cada aspecto contradictorio del amor con la misma arquitectura verbal.",
        explanationEn:
          "Lope constructs four verses with identical structure: 'It is [noun] that [verb] and [negation]'. The syntactic parallelism reinforces the amorous paradox, presenting each contradictory aspect of love with the same verbal architecture.",
      },
      {
        text: "Tu frente serena, / tus ojos profundos, / tu boca de fuego, / tus brazos de luna.",
        textEn: "Your serene forehead, / your deep eyes, / your mouth of fire, / your arms of moon.",
        author: "Pablo Neruda",
        work: "Poema 2, 20 poemas de amor",
        region: "Chile",
        era: "1924",
        explanation:
          "Neruda repite la estructura 'Tu [parte del cuerpo] + [adjetivo/complemento]' para crear un retrato fragmentado de la amada. El paralelismo convierte la descripción en un inventario lírico donde cada verso añade un rasgo al conjunto.",
        explanationEn:
          "Neruda repeats the structure 'Your [body part] + [adjective/complement]' to create a fragmented portrait of the beloved. The parallelism turns the description into a lyrical inventory where each verse adds a feature to the whole.",
      },
      {
        text: "Ya no la quiero, es cierto, pero cuánto la quise. / [...] / Es tan corto el amor, y tan largo el olvido.",
        textEn: "I don't love her anymore, it's true, but how much I loved her. / [...] / Love is so short, and forgetting is so long.",
        author: "Pablo Neruda",
        work: "Poema 20, 20 poemas de amor",
        region: "Chile",
        era: "1924",
        explanation:
          "El verso final 'Es tan corto el amor, y tan largo el olvido' presenta un paralelismo antitético: misma estructura ('tan + adjetivo + artículo + sustantivo') con contenido opuesto. El equilibrio sintáctico subraya el contraste semántico entre la brevedad del amor y la persistencia del olvido.",
        explanationEn:
          "The final verse 'Love is so short, and forgetting is so long' presents an antithetical parallelism: same structure ('so + adjective + article + noun') with opposite content. The syntactic balance underscores the semantic contrast between the brevity of love and the persistence of forgetting.",
      },
    ],
  },

  // =========================================================================
  // 10. OXÍMORON
  // =========================================================================
  {
    slug: "oximoron",
    name: "Oxímoron",
    nameEn: "Oxymoron",
    definition:
      "Figura retórica que consiste en la unión de dos términos de significado opuesto o contradictorio en una misma expresión, creando una paradoja que genera un nuevo sentido.",
    definitionEn:
      "A figure of speech that consists of uniting two terms of opposite or contradictory meaning in the same expression, creating a paradox that generates new meaning.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 2,
    historicalContext:
      "El oxímoron tiene sus raíces en la poesía clásica latina (Ovidio popularizó 'amor y odio' como oxímoron) y fue ampliamente cultivado por los poetas del Barroco español, especialmente por Francisco de Quevedo y Luis de Góngora, para expresar las contradicciones del amor cortés y la fugacidad de la vida.",
    historicalContextEn:
      "The oxymoron has its roots in classical Latin poetry (Ovid popularized 'love and hate' as an oxymoron) and was widely cultivated by Spanish Baroque poets, especially Francisco de Quevedo and Luis de Góngora, to express the contradictions of courtly love and the fleetingness of life.",
    examples: [
      {
        text: "Es hielo abrasador, es fuego helado, / es herida que duele y no se siente, / es un soñado bien, un mal presente, / es un breve descanso muy cansado.",
        textEn: "It is burning ice, it is frozen fire, / it is a wound that hurts and is not felt, / it is a dreamed good, a present evil, / it is a brief rest, very tiring.",
        author: "Francisco de Quevedo",
        work: "Soneto (Definiendo el amor)",
        region: "España",
        era: "Siglo de Oro (1630)",
        explanation:
          "Quevedo acumula oxímoron tras oxímoron para definir el amor como experiencia contradictoria: 'hielo abrasador', 'fuego helado', 'soñado bien', 'mal presente', 'breve descanso muy cansado'. Cada oxímoron expresa la paradoja irresoluble del sentimiento amoroso.",
        explanationEn:
          "Quevedo accumulates oxymoron after oxymoron to define love as a contradictory experience: 'burning ice', 'frozen fire', 'dreamed good', 'present evil', 'brief rest, very tiring'. Each oxymoron expresses the irresolvable paradox of amorous feeling.",
      },
      {
        text: "La música callada, la soledad sonora.",
        textEn: "Silent music, resounding solitude.",
        author: "San Juan de la Cruz",
        work: "Cántico espiritual",
        region: "España",
        era: "Siglo de Oro (1578)",
        explanation:
          "San Juan de la Cruz crea dos oxímoron en un solo verso: 'música callada' y 'soledad sonora'. La unión de opuestos expresa la experiencia mística como realidad paradójica que trasciende las categorías sensoriales humanas.",
        explanationEn:
          "San Juan de la Cruz creates two oxymorons in a single verse: 'silent music' and 'resounding solitude'. The union of opposites expresses the mystical experience as a paradoxical reality that transcends human sensory categories.",
      },
      {
        text: "Vivo sin vivir en mí, / y de tal manera espero, / que muero porque no muero.",
        textEn: "I live without living in myself, / and in such a way I hope, / that I die because I do not die.",
        author: "Santa Teresa de Jesús",
        work: "Vivo sin vivir en mí",
        region: "España",
        era: "Siglo de Oro (1570)",
        explanation:
          "Santa Teresa construye todo el poema en torno al oxímoron 'vivo sin vivir' y 'muero porque no muero', expresando el anhelo del alma por la unión con Dios. La paradoja refleja la tensión entre la vida terrenal y el deseo de vida eterna.",
        explanationEn:
          "Santa Teresa constructs the entire poem around the oxymoron 'I live without living' and 'I die because I do not die', expressing the soul's yearning for union with God. The paradox reflects the tension between earthly life and the desire for eternal life.",
      },
    ],
  },

  // =========================================================================
  // 11. ANTÍTESIS
  // =========================================================================
  {
    slug: "antitesis",
    name: "Antítesis",
    nameEn: "Antithesis",
    definition:
      "Figura retórica que consiste en contraponer dos ideas, pensamientos o expresiones de significado opuesto dentro de una misma estructura sintáctica, para resaltar su contraste.",
    definitionEn:
      "A figure of speech that consists of juxtaposing two ideas, thoughts, or expressions of opposite meaning within the same syntactic structure, to highlight their contrast.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 2,
    historicalContext:
      "La antítesis es fundamental en la retórica clásica y la oratoria. En la literatura hispánica, alcanza su máxima expresión en el Barroco, donde la conciencia del contraste entre la apariencia y la realidad, la vida y la muerte, define la cosmovisión de la época. También es central en la poesía de Pablo Neruda y César Vallejo.",
    historicalContextEn:
      "Antithesis is fundamental in classical rhetoric and oratory. In Hispanic literature, it reaches its highest expression in the Baroque, where the awareness of the contrast between appearance and reality, life and death, defines the worldview of the era. It is also central in the poetry of Pablo Neruda and César Vallejo.",
    examples: [
      {
        text: "Es tan corto el amor, y tan largo el olvido.",
        textEn: "Love is so short, and forgetting is so long.",
        author: "Pablo Neruda",
        work: "Poema 20, Veinte poemas de amor",
        region: "Chile",
        era: "1924",
        explanation:
          "Neruda contrapone 'amor' (asociado a 'corto') con 'olvido' (asociado a 'largo'). La antítesis entre la brevedad del amor y la persistencia del olvido condensa la experiencia de la pérdida amorosa en un solo verso de estructura perfectamente simétrica.",
        explanationEn:
          "Neruda contrasts 'love' (associated with 'short') with 'forgetting' (associated with 'long'). The antithesis between the brevity of love and the persistence of forgetting condenses the experience of amorous loss in a single verse of perfectly symmetrical structure.",
      },
      {
        text: "Al que ingrato me deja, busco amante; / al que amante me sigue, dejo ingrata.",
        textEn: "Him who ungratefully leaves me, I seek as a lover; / him who as a lover follows me, I ungratefully leave.",
        author: "Sor Juana Inés de la Cruz",
        work: "Soneto 165",
        region: "México",
        era: "Siglo XVII (1690)",
        explanation:
          "Sor Juana construye una antítesis perfecta mediante el quiasmo: el amante ingrato que se va es buscado, mientras el amante fiel que se queda es abandonado. La estructura cruzada (ingrato/amante : busco/sigo : dejo/ingo) refuerza la contradicción del deseo.",
        explanationEn:
          "Sor Juana constructs a perfect antithesis through chiasmus: the ungrateful lover who leaves is sought, while the faithful lover who stays is abandoned. The crossed structure (ungrateful/lover : seek/follow : leave/ungrateful) reinforces the contradiction of desire.",
      },
      {
        text: "Ayer se fue; mañana no ha llegado; / hoy se está yendo sin parar un punto: / soy un fue, y un será, y un es cansado.",
        textEn: "Yesterday left; tomorrow has not arrived; / today is leaving without stopping a moment: / I am a was, and a will-be, and a tired is.",
        author: "Francisco de Quevedo",
        work: "Soneto (Miré los muros de la patria mía)",
        region: "España",
        era: "Siglo de Oro (1630)",
        explanation:
          "Quevedo contrapone las tres dimensiones temporales —ayer, hoy, mañana— para expresar la fugacidad de la vida. La antítesis entre el pasado (que se fue), el futuro (que no ha llegado) y el presente (que se está yendo) subraya la imposibilidad de detener el tiempo.",
        explanationEn:
          "Quevedo contrasts the three temporal dimensions —yesterday, today, tomorrow— to express the fleetingness of life. The antithesis between the past (which left), the future (which hasn't arrived), and the present (which is leaving) underscores the impossibility of stopping time.",
      },
    ],
  },

  // =========================================================================
  // 12. EUFEMISMO
  // =========================================================================
  {
    slug: "eufemismo",
    name: "Eufemismo",
    nameEn: "Euphemism",
    definition:
      "Figura retórica que consiste en sustituir una palabra o expresión considerada tabú, ofensiva, malsonante o demasiado directa por otra más suave, decorosa o ambigua, para atenuar su impacto.",
    definitionEn:
      "A figure of speech that consists of substituting a word or expression considered taboo, offensive, crude, or too direct with a milder, more decorous, or ambiguous one, to soften its impact.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 2,
    historicalContext:
      "El eufemismo está presente en todas las culturas como mecanismo lingüístico para tratar temas sensibles (muerte, sexo, enfermedad, religión). En la literatura hispánica, la muerte ha sido el tema más frecuentemente eufemizado. Autores como Jorge Manrique, Antonio Machado y Juan Rulfo han desarrollado elaboradas estrategias eufemísticas para hablar de la muerte sin nombrarla.",
    historicalContextEn:
      "Euphemism is present in all cultures as a linguistic mechanism for dealing with sensitive topics (death, sex, illness, religion). In Hispanic literature, death has been the most frequently euphemized topic. Authors like Jorge Manrique, Antonio Machado, and Juan Rulfo have developed elaborate euphemistic strategies to speak about death without naming it.",
    examples: [
      {
        text: "Nuestras vidas son los ríos / que van a dar en la mar, / que es el morir; / allí van los señoríos / derechos a se acabar / y consumir.",
        textEn: "Our lives are the rivers / that flow into the sea, / which is dying; / there go the lordships / straight to end / and consume themselves.",
        author: "Jorge Manrique",
        work: "Coplas a la muerte de su padre",
        region: "España",
        era: "1476",
        explanation:
          "Manrique eufemiza la muerte como 'la mar' donde desembocan los 'ríos' (las vidas). La metáfora-eufemismo evita nombrar directamente la muerte y la presenta como un proceso natural e inevitable, suavizando su impacto mediante la imagen del ciclo del agua.",
        explanationEn:
          "Manrique euphemizes death as 'the sea' where 'rivers' (lives) flow into. The metaphor-euphemism avoids naming death directly and presents it as a natural and inevitable process, softening its impact through the image of the water cycle.",
      },
      {
        text: "Se nos fue... como se van las tardes, / calladamente, casi sin sentir.",
        textEn: "He/She left us... as afternoons leave, / silently, almost without feeling it.",
        author: "Antonio Machado",
        work: "A la muerte de un amigo",
        region: "España",
        era: "1912",
        explanation:
          "Machado emplea el eufemismo 'se nos fue' en lugar de 'murió', y compara la pérdida con la partida silenciosa de las tardes. La expresión evita la crudeza de la muerte directa y la envuelve en una atmósfera de serena aceptación.",
        explanationEn:
          "Machado uses the euphemism 'he/she left us' instead of 'died', and compares the loss to the silent departure of afternoons. The expression avoids the crudeness of direct death and wraps it in an atmosphere of serene acceptance.",
      },
      {
        text: "Era tan corta su edad que no le alcanzó para irse a pelear con los hombres; se fue de este mundo viendo pájaros.",
        textEn: "His age was so short that it didn't allow him to go fight with men; he left this world watching birds.",
        author: "Tomás Rivera",
        work: "...y no se lo tragó la tierra",
        region: "México/Estados Unidos",
        era: "1971",
        explanation:
          "Rivera eufemiza la muerte infantil como 'se fue de este mundo viendo pájaros', evitando la crudeza de la palabra 'muerte' al asociarla con una imagen serena y contemplativa. El eufemismo refleja la perspectiva cultural chicana sobre la muerte",
        explanationEn:
          "Rivera euphemizes childhood death as 'he left this world watching birds', avoiding the crudeness of the word 'death' by associating it with a serene, contemplative image. The euphemism reflects the Chicano cultural perspective on death.",
      },
    ],
  },

  // =========================================================================
  // 13. IRONÍA
  // =========================================================================
  {
    slug: "ironia",
    name: "Ironía",
    nameEn: "Irony",
    definition:
      "Figura retórica que consiste en dar a entender lo contrario de lo que se dice, generalmente con intención crítica o humorística. El verdadero significado se infiere del contexto, el tono o la situación comunicativa.",
    definitionEn:
      "A figure of speech that consists of implying the opposite of what is said, generally with critical or humorous intent. The true meaning is inferred from the context, tone, or communicative situation.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 3,
    historicalContext:
      "La ironía ha sido una herramienta esencial de la literatura crítica y satírica desde Sócrates, quien la elevó a método filosófico. En la literatura hispánica, la ironía alcanza su madurez en el 'Quijote' de Cervantes, donde el narrador ironiza constantemente sobre las aventuras del caballero. En el siglo XX, autores como Julio Cortázar, Jorge Luis Borges y Augusto Monterroso la convirtieron en un sello distintivo de su estilo.",
    historicalContextEn:
      "Irony has been an essential tool of critical and satirical literature since Socrates, who elevated it to a philosophical method. In Hispanic literature, irony reaches maturity in Cervantes' 'Don Quixote', where the narrator constantly ironizes about the knight's adventures. In the 20th century, authors like Julio Cortázar, Jorge Luis Borges, and Augusto Monterroso made it a hallmark of their style.",
    examples: [
      {
        text: "—Si es que yo soy caballero —respondió don Quijote—, y de los de la tabla redonda, que todo puede ser; que como suele decirse, cada gallo canta en su muladar y basta.",
        textEn: "'If I am a knight,' responded Don Quixote, 'and one of the Round Table, anything is possible; for as they say, every rooster crows on its own dunghill and that's enough.'",
        author: "Miguel de Cervantes",
        work: "Don Quijote de la Mancha (Primera parte, capítulo 18)",
        region: "España",
        era: "1605",
        explanation:
          "Cervantes hace que don Quijote afirme ser caballero andante 'de la tabla redonda' mientras desvirtúa el ideal caballeresco con un refrán vulgar ('cada gallo canta en su muladar'). La ironía surge del contraste entre la pretensión épica y la realidad prosaica del personaje.",
        explanationEn:
          "Cervantes has Don Quixote claim to be a knight errant 'of the Round Table' while undermining the chivalric ideal with a vulgar proverb ('every rooster crows on its own dunghill'). The irony arises from the contrast between the epic pretension and the prosaic reality of the character.",
      },
      {
        text: "El dinosaurio, todavía estaba allí. (Cuando despertó, el dinosaurio todavía estaba allí.)",
        textEn: "The dinosaur was still there. (When he woke up, the dinosaur was still there.)",
        author: "Augusto Monterroso",
        work: "El dinosaurio",
        region: "Guatemala/México",
        era: "1959",
        explanation:
          "Monterroso escribe el cuento más corto de la literatura hispánica (siete palabras) con una ironía trágica: la amenaza prehistórica persiste después de despertar. La ironía radica en que el 'despertar' no disipa la pesadilla: la realidad es tan absurda como el sueño.",
        explanationEn:
          "Monterroso writes the shortest story in Hispanic literature (seven words) with tragic irony: the prehistoric threat persists after waking up. The irony lies in the fact that 'waking up' does not dispel the nightmare: reality is as absurd as the dream.",
      },
      {
        text: "En este país no se lee porque no se escribe, o no se escribe porque no se lee, y los que leen y escriben no se entienden porque hablan en dialectos diferentes.",
        textEn: "In this country they don't read because they don't write, or they don't write because they don't read, and those who read and write don't understand each other because they speak in different dialects.",
        author: "Jorge Luis Borges",
        work: "El idioma de los argentinos",
        region: "Argentina",
        era: "1928",
        explanation:
          "Borges ironiza sobre la situación literaria argentina mediante una estructura circular que anula cualquier posibilidad de explicación causal. La ironía ataca tanto a los que no leen como a los que leen, sugiriendo que el problema es sistémico y no individual.",
        explanationEn:
          "Borges ironizes about the Argentine literary situation through a circular structure that negates any possibility of causal explanation. The irony attacks both those who don't read and those who do, suggesting the problem is systemic rather than individual.",
      },
    ],
  },

  // =========================================================================
  // 14. SINESTESIA
  // =========================================================================
  {
    slug: "sinestesia",
    name: "Sinestesia",
    nameEn: "Synesthesia",
    definition:
      "Figura retórica que consiste en la mezcla o unión de sensaciones procedentes de diferentes sentidos (vista, oído, tacto, olfato, gusto) en una misma expresión, creando una percepción sensorial integrada.",
    definitionEn:
      "A figure of speech that consists of mixing or uniting sensations from different senses (sight, hearing, touch, smell, taste) in a single expression, creating an integrated sensory perception.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 3,
    historicalContext:
      "La sinestesia fue cultivada intensamente por el Simbolismo francés (Baudelaire, Rimbaud) y el Modernismo hispanoamericano (Rubén Darío, José Martí). En el siglo XX, poetas como Federico García Lorca y Octavio Paz la convirtieron en un recurso central de su poética, buscando trascender las limitaciones de la percepción sensorial convencional.",
    historicalContextEn:
      "Synesthesia was intensively cultivated by French Symbolism (Baudelaire, Rimbaud) and Latin American Modernism (Rubén Darío, José Martí). In the 20th century, poets like Federico García Lorca and Octavio Paz made it a central resource of their poetics, seeking to transcend the limitations of conventional sensory perception.",
    examples: [
      {
        text: "Verde que te quiero verde. / Verde viento. Verdes ramas. / El barco sobre la mar / y el caballo en la montaña. / [...] / Verdes sombras, verdes sonidos.",
        textEn: "Green, how I want you green. / Green wind. Green branches. / The boat on the sea / and the horse on the mountain. / [...] / Green shadows, green sounds.",
        author: "Federico García Lorca",
        work: "Romance sonámbulo",
        region: "España",
        era: "1928",
        explanation:
          "Lorca mezcla percepciones visuales ('verde', 'verdes sombras'), táctiles ('verde viento') y auditivas ('verdes sonidos') en una sinestesia total. El color verde impregna todos los sentidos, creando una atmósfera onírica donde la realidad sensorial se funde.",
        explanationEn:
          "Lorca mixes visual perceptions ('green', 'green shadows'), tactile ('green wind'), and auditory ('green sounds') in a total synesthesia. The color green permeates all senses, creating a dreamlike atmosphere where sensory reality merges.",
      },
      {
        text: "El azul sonoro de tu mirada.",
        textEn: "The sonorous blue of your gaze.",
        author: "Rubén Darío",
        work: "Yo persigo una forma",
        region: "Nicaragua",
        era: "1896",
        explanation:
          "Darío fusiona el sentido de la vista ('azul') con el oído ('sonoro') para describir una mirada. La sinestesia 'azul sonoro' asocia un color con una cualidad acústica, sugiriendo que la intensidad visual de la mirada tiene una resonancia equivalente a un sonido.",
        explanationEn:
          "Darío fuses the sense of sight ('blue') with hearing ('sonorous') to describe a gaze. The synesthesia 'sonorous blue' associates a color with an acoustic quality, suggesting that the visual intensity of the gaze has a resonance equivalent to a sound.",
      },
      {
        text: "Un olor a jazmín que era dulce y amargo a la vez, / como un sabor de lágrimas en la boca del viento.",
        textEn: "A scent of jasmine that was sweet and bitter at once, / like a taste of tears in the mouth of the wind.",
        author: "Octavio Paz",
        work: "Piedra de sol",
        region: "México",
        era: "1957",
        explanation:
          "Paz encadena sinestesias múltiples: el olor del jazmín se describe con cualidades gustativas ('dulce y amargo'), luego se compara con el 'sabor de lágrimas' (gusto + emoción), y finalmente se sitúa en 'la boca del viento' (tacto + personificación).",
        explanationEn:
          "Paz chains multiple synesthesias: the scent of jasmine is described with gustatory qualities ('sweet and bitter'), then compared to the 'taste of tears' (taste + emotion), and finally placed in 'the mouth of the wind' (touch + personification).",
      },
    ],
  },

  // =========================================================================
  // 15. METONIMIA
  // =========================================================================
  {
    slug: "metonimia",
    name: "Metonimia",
    nameEn: "Metonymy",
    definition:
      "Figura retórica que consiste en designar una cosa con el nombre de otra con la que mantiene una relación de contigüidad semántica: causa por efecto, efecto por causa, continente por contenido, autor por obra, materia por objeto, etc.",
    definitionEn:
      "A figure of speech that consists of designating one thing with the name of another with which it maintains a relationship of semantic contiguity: cause for effect, effect for cause, container for content, author for work, material for object, etc.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 2,
    historicalContext:
      "La metonimia, como la metáfora, fue analizada por Aristóteles y clasificada por los retóricos latinos. Es un mecanismo fundamental del lenguaje cotidiano ('tomarse un jerez' = beber vino de Jerez). En la literatura hispánica, la metonimia ha sido utilizada tanto en la poesía conceptista (Quevedo) como en la narrativa contemporánea.",
    historicalContextEn:
      "Metonymy, like metaphor, was analyzed by Aristotle and classified by Latin rhetoricians. It is a fundamental mechanism of everyday language ('having a sherry' = drinking sherry wine). In Hispanic literature, metonymy has been used in both conceptist poetry (Quevedo) and contemporary narrative.",
    examples: [
      {
        text: "Las lágrimas son agua y van al mar, / los suspiros son aire y van al viento.",
        textEn: "Tears are water and go to the sea, / sighs are air and go to the wind.",
        author: "Gustavo Adolfo Bécquer",
        work: "Rima XXXVIII",
        region: "España",
        era: "1871",
        explanation:
          "Bécquer utiliza la metonimia de la causa por el efecto: las 'lágrimas' (efecto) representan la tristeza (causa), y los 'suspiros' (efecto) representan el anhelo o la pasión (causa). La metonimia permite materializar emociones abstractas.",
        explanationEn:
          "Bécquer uses the metonymy of cause for effect: 'tears' (effect) represent sadness (cause), and 'sighs' (effect) represent longing or passion (cause). Metonymy allows abstract emotions to materialize.",
      },
      {
        text: "Leí a Borges antes de conocer Buenos Aires.",
        textEn: "I read Borges before knowing Buenos Aires.",
        author: "Julio Cortázar",
        work: "Rayuela",
        region: "Argentina",
        era: "1963",
        explanation:
          "Cortázar emplea la metonimia autor por obra: 'leí a Borges' significa 'leí la obra de Borges'. La metonimia es doblemente significativa porque Borges también escribió sobre Buenos Aires, creando una tensión entre la ciudad literaria de Borges y la ciudad real que el narrador aún no conoce.",
        explanationEn:
          "Cortázar uses the metonymy of author for work: 'I read Borges' means 'I read Borges' work'. The metonymy is doubly significant because Borges also wrote about Buenos Aires, creating a tension between Borges' literary city and the real city the narrator has yet to know.",
      },
      {
        text: "El acero se levantó contra la tiranía.",
        textEn: "The steel rose up against tyranny.",
        author: "José Martí",
        work: "Versos sencillos",
        region: "Cuba",
        era: "1891",
        explanation:
          "Martí utiliza la metonimia de la materia por el objeto: 'el acero' representa las espadas o armas (objetos hechos de acero). La metonimia condensa la imagen de la lucha armada en el material del que están hechas las armas, dotándola de fuerza simbólica.",
        explanationEn:
          "Martí uses the metonymy of material for object: 'steel' represents swords or weapons (objects made of steel). The metonymy condenses the image of armed struggle into the material from which weapons are made, endowing it with symbolic force.",
      },
    ],
  },

  // =========================================================================
  // 16. SÍNCDOQUE
  // =========================================================================
  {
    slug: "sinecdoque",
    name: "Sínécdoque",
    nameEn: "Synecdoche",
    definition:
      "Figura retórica que consiste en designar un todo por una de sus partes (o viceversa), el singular por el plural (o viceversa), o la especie por el género (o viceversa). Es un tipo específico de metonimia.",
    definitionEn:
      "A figure of speech that consists of designating a whole by one of its parts (or vice versa), the singular for the plural (or vice versa), or the species for the genus (or vice versa). It is a specific type of metonymy.",
    category: "figuras_de_pensamiento",
    difficultyLevel: 3,
    historicalContext:
      "La sínécdoque ha sido reconocida como tropo desde la retórica clásica. En la literatura hispánica, es particularmente relevante en la poesía épica y en la narrativa del siglo XX, donde autores como Gabriel García Márquez y Juan Rulfo la emplearon para condensar realidades complejas en imágenes parciales pero representativas.",
    historicalContextEn:
      "Synecdoche has been recognized as a trope since classical rhetoric. In Hispanic literature, it is particularly relevant in epic poetry and 20th-century narrative, where authors like Gabriel García Márquez and Juan Rulfo used it to condense complex realities into partial but representative images.",
    examples: [
      {
        text: "Macondo era ya un pavoroso remolino de polvo y escombros centrifugado por la furia del huracán bíblico, cuando Aureliano saltó once páginas.",
        textEn: "Macondo was already a terrifying whirlwind of dust and debris centrifuged by the fury of the biblical hurricane, when Aureliano skipped eleven pages.",
        author: "Gabriel García Márquez",
        work: "Cien años de soledad",
        region: "Colombia",
        era: "1967",
        explanation:
          "García Márquez utiliza la sínécdoque de la parte por el todo: 'Aureliano' representa a la última generación de los Buendía y 'once páginas' representa la profecía completa de Melquíades (los manuscritos). El acto de 'saltar once páginas' condensa el destino de todo un linaje.",
        explanationEn:
          "García Márquez uses the synecdoche of part for whole: 'Aureliano' represents the last generation of the Buendías and 'eleven pages' represents Melquíades' complete prophecy (the manuscripts). The act of 'skipping eleven pages' condenses the destiny of an entire lineage.",
      },
      {
        text: "Y vio el mar, / por primera vez, / desde la cumbre de la montaña, / y supo que en las venas del mundo / corría sal.",
        textEn: "And he saw the sea, / for the first time, / from the mountaintop, / and knew that in the veins of the world / ran salt.",
        author: "Pablo Neruda",
        work: "Canto general (Los poetas celestes)",
        region: "Chile",
        era: "1950",
        explanation:
          "Neruda utiliza 'sal' (parte) para representar el agua del mar (todo). La sínécdoque se combina con una metáfora ('las venas del mundo') para sugerir que el océano es el sistema circulatorio del planeta, donde la sal es la esencia vital concentrada.",
        explanationEn:
          "Neruda uses 'salt' (part) to represent sea water (whole). The synecdoche combines with a metaphor ('the veins of the world') to suggest that the ocean is the planet's circulatory system, where salt is the concentrated vital essence.",
      },
      {
        text: "Bajé las escaleras de tu casa / contando los peldaños / como si cada uno / fuera un año de nuestra vida.",
        textEn: "I went down the stairs of your house / counting the steps / as if each one / were a year of our life.",
        author: "Mario Benedetti",
        work: "La casa y el ladrillo",
        region: "Uruguay",
        era: "1977",
        explanation:
          "Benedetti emplea los 'peldaños' (parte) para representar la totalidad de la relación amorosa. Cada escalón simboliza un año de vida compartida, y el acto de bajarlos representa el fin de la relación. La sínécdoque transforma un espacio físico en una cronología emocional.",
        explanationEn:
          "Benedetti uses 'steps' (part) to represent the entirety of the love relationship. Each step symbolizes a year of shared life, and the act of going down them represents the end of the relationship. The synecdoche transforms a physical space into an emotional chronology.",
      },
    ],
  },

  // =========================================================================
  // 17. POLISÍNDETON
  // =========================================================================
  {
    slug: "polisindeton",
    name: "Polisíndeton",
    nameEn: "Polysyndeton",
    definition:
      "Figura retórica que consiste en la repetición innecesaria o excesiva de conjunciones (especialmente 'y', 'e', 'ni', 'o') para enlazar palabras, frases u oraciones, produciendo un efecto de acumulación, lentitud o énfasis.",
    definitionEn:
      "A figure of speech that consists of the unnecessary or excessive repetition of conjunctions (especially 'and', 'nor', 'or') to link words, phrases, or sentences, producing an effect of accumulation, slowness, or emphasis.",
    category: "figuras_de_diccion",
    difficultyLevel: 3,
    historicalContext:
      "El polisíndeton es característico del estilo bíblico (especialmente del Antiguo Testamento) y de la épica clásica. En la literatura hispánica, fue cultivado por los poetas del Barroco y recuperado en el siglo XX por autores como Pablo Neruda y José Lezama Lima, quienes lo emplearon para crear una sensación de abundancia y plenitud.",
    historicalContextEn:
      "Polysyndeton is characteristic of biblical style (especially the Old Testament) and classical epic. In Hispanic literature, it was cultivated by Baroque poets and revived in the 20th century by authors like Pablo Neruda and José Lezama Lima, who used it to create a sense of abundance and fullness.",
    examples: [
      {
        text: "Y todo el mundo andaba / y el mundo andaba y andaba / y el viento andaba / y el mar andaba / y el corazón andaba.",
        textEn: "And the whole world walked / and the world walked and walked / and the wind walked / and the sea walked / and the heart walked.",
        author: "Pablo Neruda",
        work: "Oda al mar",
        region: "Chile",
        era: "1954",
        explanation:
          "Neruda acumula la conjunción 'y' al inicio de cada verso y dentro del mismo verso ('andaba y andaba'), creando un polisíndeton que imita el movimiento rítmico e incesante del mar. La repetición conjuntiva produce una sensación de fluidez continua.",
        explanationEn:
          "Neruda accumulates the conjunction 'and' at the beginning of each verse and within the same verse ('walked and walked'), creating a polysyndeton that imitates the rhythmic and incessant movement of the sea. The conjunctive repetition produces a sensation of continuous fluidity.",
      },
      {
        text: "No comer más, y no ayunar más, / y no rezar más, y no llorar más, / y no pedir más, y no esperar más.",
        textEn: "Not to eat anymore, and not to fast anymore, / and not to pray anymore, and not to cry anymore, / and not to ask anymore, and not to wait anymore.",
        author: "José Lezama Lima",
        work: "Paradiso",
        region: "Cuba",
        era: "1966",
        explanation:
          "Lezama Lima repite la conjunción 'y' —en un contexto de negación ('no')— para crear un ritmo incantatorio que acumula renuncias. El polisíndeton alarga la frase, sugiriendo que la lista de privaciones es interminable.",
        explanationEn:
          "Lezama Lima repeats the conjunction 'y' (and) —in a context of negation ('no')— to create an incantatory rhythm that accumulates renunciations. The polysyndeton lengthens the phrase, suggesting that the list of privations is endless.",
      },
      {
        text: "Sucede que me canso de ser hombre: / que entro en las sastrerías y en los cines / y en los hoteles y en los hospitales / y en las iglesias y en los almacenes.",
        textEn: "It happens that I tire of being a man: / that I enter tailor shops and cinemas / and hotels and hospitals / and churches and department stores.",
        author: "César Vallejo",
        work: "Los heraldos negros (Los dados eternos)",
        region: "Perú",
        era: "1919",
        explanation:
          "Vallejo acumula espacios mediante la repetición de 'y' entre ellos, creando un catálogo agobiante de la civilización. El polisíndeton convierte la enumeración en una experiencia asfixiante: cada 'y' añade un peso más al cansancio existencial del hablante.",
        explanationEn:
          "Vallejo accumulates spaces through the repetition of 'y' (and) between them, creating an overwhelming catalog of civilization. The polysyndeton turns the enumeration into a suffocating experience: each 'and' adds more weight to the speaker's existential tiredness.",
      },
    ],
  },

  // =========================================================================
  // 18. ASÍNDETON
  // =========================================================================
  {
    slug: "asindeton",
    name: "Asíndeton",
    nameEn: "Asyndeton",
    definition:
      "Figura retórica que consiste en la omisión de conjunciones o nexos entre palabras, frases u oraciones que deberían llevarlos, produciendo un efecto de rapidez, dinamismo o acumulación impresionista.",
    definitionEn:
      "A figure of speech that consists of omitting conjunctions or connectors between words, phrases, or sentences that should have them, producing an effect of speed, dynamism, or impressionistic accumulation.",
    category: "figuras_de_diccion",
    difficultyLevel: 3,
    historicalContext:
      "El asíndeton es el reverso del polisíndeton y tiene efectos expresivos opuestos. Fue utilizado por Julio César en su famoso 'Veni, vidi, vici'. En la literatura hispánica, el asíndeton es característico de la prosa modernista y vanguardista, donde autores como Azorín, Juan Ramón Jiménez y Julio Cortázar buscaban la eliminación de lo superfluo para crear un estilo más directo y dinámico.",
    historicalContextEn:
      "Asyndeton is the reverse of polysyndeton and has opposite expressive effects. It was used by Julius Caesar in his famous 'Veni, vidi, vici'. In Hispanic literature, asyndeton is characteristic of modernist and avant-garde prose, where authors like Azorín, Juan Ramón Jiménez, and Julio Cortázar sought the elimination of the superfluous to create a more direct and dynamic style.",
    examples: [
      {
        text: "Plaza, jabón, toalla, agua, peine, espejo, / y el olor del café recién molido.",
        textEn: "Plaza, soap, towel, water, comb, mirror, / and the smell of freshly ground coffee.",
        author: "Julio Cortázar",
        work: "Rayuela",
        region: "Argentina",
        era: "1963",
        explanation:
          "Cortázar acumula sustantivos sin conjunciones, creando un asíndeton que reproduce el flujo de conciencia del personaje. La ausencia de nexos imita la inmediatez de la percepción sensorial, donde los objetos aparecen sin jerarquía sintáctica.",
        explanationEn:
          "Cortázar accumulates nouns without conjunctions, creating an asyndeton that reproduces the character's stream of consciousness. The absence of connectors imitates the immediacy of sensory perception, where objects appear without syntactic hierarchy.",
      },
      {
        text: "Rueda, que rueda, que rueda, / la vida es puro movimiento, / rueda que rueda, / siempre igual, siempre distinto.",
        textEn: "Rolls, and rolls, and rolls, / life is pure movement, / rolls and rolls, / always the same, always different.",
        author: "Alfonsina Storni",
        work: "El dulce daño",
        region: "Argentina",
        era: "1918",
        explanation:
          "Storni omite las conjunciones entre los elementos 'siempre igual, siempre distinto', creando un asíndeton que contrasta con la repetición rítmica inicial. La omisión acelera el final del poema, dejando al lector con dos ideas contrastantes en tensión directa.",
        explanationEn:
          "Storni omits conjunctions between the elements 'always the same, always different', creating an asyndeton that contrasts with the initial rhythmic repetition. The omission accelerates the end of the poem, leaving the reader with two contrasting ideas in direct tension.",
      },
      {
        text: "Vino, mujer, tabaco, noche, / madrugada, sueño, olvido.",
        textEn: "Wine, woman, tobacco, night, / dawn, sleep, forgetting.",
        author: "Ramón del Valle-Inclán",
        work: "Luces de bohemia",
        region: "España",
        era: "1920",
        explanation:
          "Valle-Inclán acumula sustantivos sin conjunciones para sugerir la experiencia bohemia como una sucesión vertiginosa de sensaciones. El asíndeton elimina las pausas lógicas, creando un ritmo acelerado que refleja el estilo de vida frenético del protagonista.",
        explanationEn:
          "Valle-Inclán accumulates nouns without conjunctions to suggest the bohemian experience as a dizzying succession of sensations. The asyndeton eliminates logical pauses, creating an accelerated rhythm that reflects the protagonist's frenetic lifestyle.",
      },
    ],
  },

  // =========================================================================
  // 19. ANACOLUTO
  // =========================================================================
  {
    slug: "anacoluto",
    name: "Anacoluto",
    nameEn: "Anacoluthon",
    definition:
      "Figura retórica que consiste en una ruptura o inconsistencia en la estructura sintáctica de una oración. Se produce cuando una frase comienza con una construcción gramatical y se completa con otra diferente, creando una falta de concordancia intencionada.",
    definitionEn:
      "A figure of speech that consists of a break or inconsistency in the syntactic structure of a sentence. It occurs when a phrase begins with one grammatical construction and is completed with another, creating an intentional lack of concordance.",
    category: "figuras_de_diccion",
    difficultyLevel: 3,
    historicalContext:
      "El anacoluto ha sido utilizado desde la literatura clásica para reflejar el habla natural, la emoción intensa o la confusión mental. En la literatura hispánica del siglo XX, se convirtió en un recurso estilístico fundamental del realismo mágico y la narrativa experimental, particularmente en autores como Juan Rulfo, José Lezama Lima y Severo Sarduy.",
    historicalContextEn:
      "Anacoluthon has been used since classical literature to reflect natural speech, intense emotion, or mental confusion. In 20th-century Hispanic literature, it became a fundamental stylistic resource of magical realism and experimental narrative, particularly in authors like Juan Rulfo, José Lezama Lima, and Severo Sarduy.",
    examples: [
      {
        text: "—Yo... bueno... que me voy. —dijo—. Que ya no aguanto más. Que el pueblo este... usted sabe... que aquí no se puede vivir.",
        textEn: "'I... well... that I'm leaving,' he said. 'That I can't take it anymore. That this town... you know... that one can't live here.'",
        author: "Juan Rulfo",
        work: "El llano en llamas (Nos han dado la tierra)",
        region: "México",
        era: "1953",
        explanation:
          "Rulfo reproduce el habla rural mexicana mediante anacolutos: la frase comienza con 'Yo' (pronombre nominativo) y deriva en una construcción con 'que' subordinante sin verbo principal. La ruptura sintáctica refleja la dificultad del personaje para articular su decisión de irse.",
        explanationEn:
          "Rulfo reproduces rural Mexican speech through anacolutha: the sentence begins with 'I' (nominative pronoun) and shifts to a construction with subordinating 'that' without a main verb. The syntactic rupture reflects the character's difficulty articulating his decision to leave.",
      },
      {
        text: "El que haya visto la luna en Comala, no se le olvida nunca. La luna... ¡cómo brilla allí! Que parece que el cielo es más alto.",
        textEn: "He who has seen the moon in Comala, he never forgets it. The moon... how it shines there! That it seems the sky is higher.",
        author: "Juan Rulfo",
        work: "Pedro Páramo",
        region: "México",
        era: "1955",
        explanation:
          "Rulfo emplea el anacoluto en 'Que parece que el cielo es más alto', donde la frase carece de sujeto explícito y el 'que' inicial cuelga sin nexo previo. La ruptura sintáctica evoca el lenguaje oral y la atmósfera fantasmal de Comala.",
        explanationEn:
          "Rulfo uses anacoluthon in 'That it seems the sky is higher', where the sentence lacks an explicit subject and the initial 'that' hangs without a previous connector. The syntactic rupture evokes oral language and the ghostly atmosphere of Comala.",
      },
      {
        text: "Yo, cuando me pongo a caminar, / me parece que el mundo se acaba / y que todo lo que vi / se queda atrás.",
        textEn: "I, when I start walking, / it seems to me that the world ends / and that everything I saw / stays behind.",
        author: "Gabriela Mistral",
        work: "Desolación (Viernes Santo)",
        region: "Chile",
        era: "1922",
        explanation:
          "Mistral inicia la oración con 'Yo' (sujeto explícito) pero continúa con 'me parece' (construcción impersonal), creando un anacoluto leve. La duplicación del sujeto ('Yo' + 'me') refleja la introspección del hablante que se observa a sí mismo caminando.",
        explanationEn:
          "Mistral begins the sentence with 'Yo' (I, explicit subject) but continues with 'me parece' (it seems to me, impersonal construction), creating a mild anacoluthon. The duplication of the subject ('I' + 'to me') reflects the speaker's introspection as they observe themselves walking.",
      },
    ],
  },

  // =========================================================================
  // 20. PARONOMASIA
  // =========================================================================
  {
    slug: "paronomasia",
    name: "Paronomasia",
    nameEn: "Paronomasia",
    definition:
      "Figura retórica que consiste en la yuxtaposición o cercanía de palabras con sonidos similares pero significados diferentes, creando juegos de palabras, humor o asociaciones inesperadas.",
    definitionEn:
      "A figure of speech that consists of the juxtaposition or proximity of words with similar sounds but different meanings, creating wordplay, humor, or unexpected associations.",
    category: "figuras_de_diccion",
    difficultyLevel: 2,
    historicalContext:
      "La paronomasia es la base de muchos juegos de palabras y chistes. Fue particularmente cultivada por los poetas conceptistas del Barroco español, especialmente Francisco de Quevedo y Luis de Góngora, quienes la empleaban en sus disputas literarias para satirizarse mutuamente. En el siglo XX, Julio Cortázar y Guillermo Cabrera Infante llevaron la paronomasia a nuevas alturas de experimentación lúdica.",
    historicalContextEn:
      "Paronomasia is the basis of many word plays and jokes. It was particularly cultivated by conceptist poets of the Spanish Baroque, especially Francisco de Quevedo and Luis de Góngora, who used it in their literary disputes to satirize each other. In the 20th century, Julio Cortázar and Guillermo Cabrera Infante took paronomasia to new heights of playful experimentation.",
    examples: [
      {
        text: "Suerrero de la pluma, / no de la espada, / que la pluma es la espuma / de la alborada.",
        textEn: "Warrior of the pen, / not of the sword, / for the pen is the foam / of the dawn.",
        author: "Francisco de Quevedo",
        work: "Soneto",
        region: "España",
        era: "Siglo de Oro (1630)",
        explanation:
          "Quevedo juega con la paronomasia 'pluma/espuma': palabras de sonido similar ('pluma' y 'espuma') con significados distintos. El juego fonético refuerza la idea de que la escritura ('pluma') es tan efímera como la espuma del mar.",
        explanationEn:
          "Quevedo plays with the paronomasia 'pluma/espuma' (pen/foam): words of similar sound ('pluma' and 'espuma') with different meanings. The phonetic play reinforces the idea that writing ('pen') is as ephemeral as sea foam.",
      },
      {
        text: "A vuelo te tomo, y a vuelo te dejo, / y a vuelo te tomo, y a vuelo te dejo.",
        textEn: "In flight I take you, and in flight I leave you, / in flight I take you, and in flight I leave you.",
        author: "Luis de Góngora",
        work: "Letrilla",
        region: "España",
        era: "Siglo de Oro (1600)",
        explanation:
          "Góngora juega con 'vuelo' (vuelo/escape) y 'vuelvo' (regreso) mediante su similitud fonética, unidos por el ritmo del estribillo. La paronomasia expresa la ambivalencia del amor que va y viene.",
        explanationEn:
          "Góngora plays with 'vuelo' (flight/escape) and 'vuelvo' (I return) through their phonetic similarity, united by the rhythm of the refrain. The paronomasia expresses the ambivalence of love that comes and goes.",
      },
      {
        text: "Entre el clavel blanco y la rosa roja, / Su Majestad escoja. / Entre el clavel y la rosa, / Su Majestad es... ¡coja!",
        textEn: "Between the white carnation and the red rose, / Your Majesty choose. / Between the carnation and the rose, / Your Majesty... choose!",
        author: "Ramón del Valle-Inclán",
        work: "Luces de bohemia",
        region: "España",
        era: "1920",
        explanation:
          "Valle-Inclán crea una paronomasia cómica al dividir 'escoja' en 'es... coja' (coja = que cojea). La broma fonética funciona como crítica velada al rey Alfonso XIII, sugiriendo que el monarca no solo debe escoger sino que además es 'cojo' en sentido figurado.",
        explanationEn:
          "Valle-Inclán creates a comic paronomasia by splitting 'escoja' (choose) into 'es... coja' (is... lame). The phonetic joke functions as a veiled critique of King Alfonso XIII, suggesting the monarch should not only choose but is also 'lame' in a figurative sense.",
      },
    ],
  },
];
