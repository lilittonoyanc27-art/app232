import React from 'react';
import { Volume2, Wind, Zap, RotateCcw } from 'lucide-react';

export type ModuleType = 'audio_story' | 'negatives' | 'preterito_perfecto' | 'puzzle_3d';

export interface Challenge {
  id: number;
  es: string;
  am: string;
  options: string[];
  correct: string;
  explanation: string;
  image: string;
  audioText?: string;
}

export interface ModuleData {
  title: string;
  description: string;
  icon: React.ReactNode;
  challenges: Challenge[];
}

export const MODULES: Record<ModuleType, ModuleData> = {
  audio_story: {
    title: "Գնումների Ժամանակ (Audio)",
    description: "Լսի՛ր Գոռի և Գայանեի արկածները խանութում:",
    icon: <Volume2 className="text-lime-300" />,
    challenges: [
      {
        id: 1,
        audioText: "Hola, me llamo Gor. Estoy en el supermercado porque necesito comprar comida.",
        es: "¿Dónde está Gor?",
        am: "Որտե՞ղ է Գոռը:",
        options: ["En el parque", "En el supermercado", "En la luna"],
        correct: "En el supermercado",
        explanation: "Գոռն ասաց՝ «Estoy en el supermercado» (Ես սուպերմարկետում եմ):",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400"
      },
      {
        id: 2,
        audioText: "Gayane quiere comprar una manzana roja y dos plátanos amarillos.",
        es: "¿Qué fruta quiere comprar Gayane?",
        am: "Ի՞նչ միրգ է ուզում գնել Գայանեն:",
        options: ["Una manzana", "Una naranja", "Uvas"],
        correct: "Una manzana",
        explanation: "Գայանեն ուզում է գնել խնձոր (manzana):",
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?q=80&w=400"
      },
      {
        id: 3,
        audioText: "El pan cuesta dos euros. Es muy barato hoy.",
        es: "¿Cuánto cuesta el pan?",
        am: "Ինչքա՞ն արժե հացը:",
        options: ["Cinco euros", "Dos euros", "Diez euros"],
        correct: "Dos euros",
        explanation: "Հացն արժե երկու եվրո (dos euros):",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=400"
      },
      {
        id: 4,
        audioText: "Gor busca leche fresca y un poco de queso para el desayuno.",
        es: "¿Qué busca Gor para el desayuno?",
        am: "Ի՞նչ է փնտրում Գոռը նախաճաշի համար:",
        options: ["Leche y queso", "Pizza", "Café"],
        correct: "Leche y queso",
        explanation: "Նա փնտրում է կաթ և պանիր (leche y queso):",
        image: "https://images.unsplash.com/photo-1528498033973-3c0717620e70?q=80&w=400"
      },
      {
        id: 5,
        audioText: "En la tienda de ropa, Gayane mira una falda azul y una camiseta blanca.",
        es: "¿De qué color es la camiseta?",
        am: "Ի՞նչ գույնի է շապիկը:",
        options: ["Azul", "Blanca", "Negra"],
        correct: "Blanca",
        explanation: "Շապիկը սպիտակ է (camiseta blanca):",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400"
      },
      {
        id: 6,
        audioText: "Gor dice que los zapatos negros son muy caros. Cuestan cien euros.",
        es: "¿Cómo son los zapatos negros?",
        am: "Ինչպիսի՞ն են սև կոշիկները:",
        options: ["Caros", "Baratos", "Viejos"],
        correct: "Caros",
        explanation: "Կոշիկները թանկ են (caros):",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=400"
      },
      {
        id: 7,
        audioText: "La cajera se llama María. Ella es muy amable con los clientes.",
        es: "¿Cómo se llama la cajera?",
        am: "Ի՞նչ է գանձապահի անունը:",
        options: ["María", "Lucía", "Gayane"],
        correct: "María",
        explanation: "Գանձապահի անունը Մարիա է:",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400"
      },
      {
        id: 8,
        audioText: "Gayane paga con tarjeta de crédito. Gor prefiere pagar en efectivo.",
        es: "¿Cómo paga Gayane?",
        am: "Ինչպե՞ս է վճարում Գայանեն:",
        options: ["En efectivo", "Con tarjeta", "No paga"],
        correct: "Con tarjeta",
        explanation: "Գայանեն վճարում է քարտով (con tarjeta):",
        image: "https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=400"
      },
      {
        id: 9,
        audioText: "Hay mucha gente en la cola. Tenemos que esperar diez minutos.",
        es: "¿Cuántos minutos tienen que esperar?",
        am: "Քանի՞ րոպե պետք է սպասեն:",
        options: ["Dos minutos", "Diez minutos", "Una hora"],
        correct: "Diez minutos",
        explanation: "Նրանք պետք է սպասեն տասը րոպե (diez minutos):",
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=400"
      },
      {
        id: 10,
        audioText: "Gor y Gayane salen de la tienda felices con sus bolsas rojas.",
        es: "¿Cómo salen de la tienda?",
        am: "Ինչպես են նրանք դուրս գալիս խանութից:",
        options: ["Tristes", "Felices", "Cansados"],
        correct: "Felices",
        explanation: "Նրանք դուրս են գալիս երջանիկ (felices):",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=400"
      }
    ]
  },
  negatives: {
    title: "Ժխտական Ձևեր (Negatives)",
    description: "Սովորի՛ր ճիշտ ժխտել նախադասությունները:",
    icon: <Wind className="text-lime-300" />,
    challenges: [
      {
        id: 1,
        es: "Yo ____ tengo un perro.",
        am: "Ես շուն չունեմ:",
        options: ["no", "ni", "nada"],
        correct: "no",
        explanation: "Իսպաներենում ժխտումը կազմվում է բայից առաջ «no» ավելացնելով:",
        image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400"
      },
      {
        id: 2,
        es: "Ella ____ habla francés.",
        am: "Նա ֆրանսերեն չի խոսում:",
        options: ["no", "nunca", "si"],
        correct: "no",
        explanation: "Բայից առաջ «no»-ն ամենակիրառական ժխտումն է:",
        image: "https://images.unsplash.com/photo-1543165796-5426273eaab3?q=80&w=400"
      },
      {
        id: 3,
        es: "Hoy ____ hay clases.",
        am: "Այսօր դասեր չկան:",
        options: ["no", "lo", "ya"],
        correct: "no",
        explanation: "No hay = Չկա:",
        image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400"
      },
      { id: 4, es: "____ veo la televisión ahora.", am: "Ես հիմա հեռուստացույց չեմ դիտում:", options: ["No", "Yo", "Nada"], correct: "No", explanation: "No veo = Չեմ դիտում:", image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=400" },
      { id: 5, es: "Nosotros ____ comemos carne.", am: "Մենք միս չենք ուտում:", options: ["no", "ni", "no lo"], correct: "no", explanation: "No comemos = Չենք ուտում:", image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=400" },
      { id: 6, es: "Mi teléfono ____ funciona.", am: "Իմ հեռախոսը չի աշխատում:", options: ["no", "nada", "jamás"], correct: "no", explanation: "No funciona = Չի աշխատում:", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400" },
      { id: 7, es: "Ustedes ____ son de España.", am: "Դուք Իսպանիայից չեք:", options: ["no", "not", "ni"], correct: "no", explanation: "No son = Չեք (նրանք/դուք):", image: "https://images.unsplash.com/photo-1543783232-af9942f4a472?q=80&w=400" },
      { id: 8, es: "El libro ____ es interesante.", am: "Գիրքը հետաքրքիր չէ:", options: ["no", "nunca", "no lo"], correct: "no", explanation: "No es = Չէ:", image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400" },
      { id: 9, es: "Él ____ baila en la fiesta.", am: "Նա խնջույքին չի պարում:", options: ["no", "si", "ya"], correct: "no", explanation: "No baila = Չի պարում:", image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=400" },
      { id: 10, es: "Yo ____ quiero estudiar hoy.", am: "Ես չեմ ուզում սովորել այսօր:", options: ["no", "ni", "not"], correct: "no", explanation: "No quiero = Չեմ ուզում:", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=400" }
    ]
  },
  preterito_perfecto: {
    title: "Ի՞նչ ենք արել (Past)",
    description: "Pretérito Perfecto: Սովորիր պատմել անցյալի մասին:",
    icon: <Zap className="text-lime-300" />,
    challenges: [
      {
        id: 1,
        es: "Hoy ____ comido una hamburguesa.",
        am: "Այսօր ես համբուրգեր եմ կերել:",
        options: ["he", "has", "ha"],
        correct: "he",
        explanation: "Yo (ես) -> he: Pretérito Perfecto-ի խոնարհումը:",
        image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400"
      },
      {
        id: 2,
        es: "Nosotros ____ llegado tarde a clase.",
        am: "Մենք ուշացել ենք դասից:",
        options: ["hemos", "habéis", "han"],
        correct: "hemos",
        explanation: "Nosotros -> hemos: Մենք ենք հասել:",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400"
      },
      { id: 3, es: "Ella ____ visto una película.", am: "Նա ֆիլմ է դիտել:", options: ["ha", "he", "hemos"], correct: "ha", explanation: "Ella ha visto.", image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=400" },
      { id: 4, es: "Yo ____ comprado una mochila.", am: "Ես նոր պայուսակ (թիկնապայուսակ) եմ գնել:", options: ["he", "has", "ha"], correct: "he", explanation: "Yo he comprado.", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400" },
      { id: 5, es: "Tú ____ hablado por teléfono.", am: "Դու խոսել ես հեռախոսով:", options: ["has", "ha", "han"], correct: "has", explanation: "Tú has hablado.", image: "https://images.unsplash.com/photo-1520923179278-ee25e25e07e5?q=80&w=400" },
      { id: 6, es: "Mis amigos ____ jugado al fútbol.", am: "Ընկերներս ֆուտբոլ են խաղացել:", options: ["han", "hemos", "habéis"], correct: "han", explanation: "Ellos han jugado.", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=400" },
      { id: 7, es: "Ustedes ____ dormido mucho hoy.", am: "Դուք այսօր շատ եք քնել:", options: ["han", "habéis", "hemos"], correct: "han", explanation: "Ustedes han dormido.", image: "https://images.unsplash.com/photo-1543326162-4876b6d8a2cb?q=80&w=400" },
      { id: 8, es: "Nosotros ____ bebido zumo.", am: "Մենք հյութ ենք խմել:", options: ["hemos", "he", "has"], correct: "hemos", explanation: "Nosotros hemos bebido.", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=400" },
      { id: 9, es: "Hoy ____ salido el sol temprano.", am: "Այսօր արևը վաղ է դուրս եկել:", options: ["ha", "es", "está"], correct: "ha", explanation: "El sol ha salido.", image: "https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?q=80&w=400" },
      { id: 10, es: "Ellos ____ ganado el partido.", am: "Նրանք հաղթել են խաղը:", options: ["han", "hemos", "has"], correct: "han", explanation: "Ellos han ganado.", image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?q=80&w=400" }
    ]
  },
  puzzle_3d: {
    title: "Բառախաղ (Puzzle)",
    description: "Կառուցի՛ր նախադասությունները ճիշտ հերթականությամբ:",
    icon: <RotateCcw className="text-lime-300" />,
    challenges: [
      {
        id: 1,
        es: "El perro corre en el parque.",
        am: "Շունը վազում է զբոսայգում:",
        options: ["en", "parque", "el", "corre", "perro", "El"],
        correct: "El perro corre en el parque",
        explanation: "Ճիշտ հերթականությունը՝ Հոդ + Գոյական + Բայ + Նախդիր + Հոդ + Գոյական:",
        image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=400"
      },
      {
        id: 2,
        es: "Mi hermana estudia en casa.",
        am: "Քույրս սովորում է տանը:",
        options: ["casa", "estudia", "Mi", "hermana", "en"],
        correct: "Mi hermana estudia en casa",
        explanation: "Սուբյեկտ + Բայ + Լրացում:",
        image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=400"
      },
      {
        id: 3,
        es: "Nosotros comemos pizza los sábados.",
        am: "Մենք շաբաթ օրերը պիցցա ենք ուտում:",
        options: ["sábados", "pizza", "comemos", "los", "Nosotros"],
        correct: "Nosotros comemos pizza los sábados",
        explanation: "Մենք (Nosotros) + Բայ (comemos) + Օբյեկտ + Ժամանակ:",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400"
      },
      {
        id: 4,
        es: "Me gusta mucho hablar español.",
        am: "Ես շատ եմ սիրում իսպաներեն խոսել:",
        options: ["español", "Me", "hablar", "mucho", "gusta"],
        correct: "Me gusta mucho hablar español",
        explanation: "Me gusta (Ինձ դուր է գալիս) + Բայ (verb):",
        image: "https://images.unsplash.com/photo-1543783232-af9942f4a472?q=80&w=400"
      }
    ]
  }
};
