import type { LessonLanguage } from "../features/lessons/types";

export type MultilingualArticle = {
  slug: string;
  eyebrow: string;
  author: string;
  heroImage: string;
  heroLabel: string;
  translations: Record<
    LessonLanguage,
    {
      title: string;
      intro: string;
      sections: {
        heading: string;
        paragraphs: string[];
      }[];
    }
  >;
  rhythmMedia: {
    src: string;
    label: string;
    description: string;
    aspectRatio?: "16:9" | "3:2" | "4:5";
  }[];
};

export const blogArticles: MultilingualArticle[] = [
  {
    slug: "why-the-sabbath-remains",
    eyebrow: "Journal / May 2026",
    author: "By The Teaching Elder",
    heroImage: "/media/cinematic-manuscript.jpg",
    heroLabel: "Editorial manuscript still",
    translations: {
      en: {
        title: "Why the Sabbath remains a day of study, remembrance, and holy order.",
        intro:
          "The Sabbath is not treated at KOI as a decorative tradition. It is appointed time in which study, remembrance, obedience, and peace are held together before God.",
        sections: [
          {
            heading: "The Sabbath as appointed time",
            paragraphs: [
              "The Sabbath is not received as an empty pause at the end of a working week. It is appointed time, sanctified by God and ordered for remembrance, study, and obedience.",
              "KOI keeps the seventh day not as a private lifestyle marker, but as a holy convocation in which the word is opened carefully and heard in order.",
            ],
          },
          {
            heading: "Study instead of spectacle",
            paragraphs: [
              "In a noisy age, serious study is itself a witness. KOI treats the Sabbath as a day for disciplined hearing, scriptural examination, and mutual edification rather than religious performance.",
              "Pens, notebooks, questions, and careful listening belong here because worship is not severed from understanding.",
            ],
          },
          {
            heading: "Remembering the covenant in practice",
            paragraphs: [
              "To keep the Sabbath is to remember that sacred time must be ordered by the word of God. The gathering of the assembly, the teaching of the elder, and the fellowship after class all become part of a visible covenant life.",
              "This is why the Sabbath remains central to KOI: it is the weekly return to doctrine, correction, remembrance, and peace.",
            ],
          },
        ],
      },
      zu: {
        title: "Kungani iSabatha lisalokhu liyisikhathi sokufunda, ukukhumbula, nokuhleleka okungcwele.",
        intro:
          "ESabatheni, i-KOI ayibheki usuku njengomkhuba wokuhlobisa. Luyisikhathi esibekwe nguNkulunkulu lapho ukufunda, ukukhumbula, ukulalela, nokuthula kubanjwa ndawonye phambi kwakhe.",
        sections: [
          {
            heading: "ISabatha njengexesha elibekiwe",
            paragraphs: [
              "ISabatha asithathwa njengokuphumula okungenalutho ekupheleni kwesonto. Siyisikhathi esingcwele, esihlukaniselwe ukukhumbula, ukufunda, nokulalela.",
              "IKOI igcina usuku lwesikhombisa njengomhlangano ongcwele lapho izwi livulwa khona ngokucophelela nangohlelo.",
            ],
          },
          {
            heading: "Ukufunda esikhundleni sombukiso",
            paragraphs: [
              "Esikhathini esinomsindo, ukufunda ngokuzimisela kuwubufakazi uqobo. IKOI iphatha iSabatha njengosuku lokuzwa kahle, ukuhlola umbhalo, nokwakha ibandla ndawonye.",
              "Amapeni, izincwadi, imibuzo, nokulalela ngokucophelela kuyadingeka ngoba ukukhonza akuhlukaniswa nokuqonda.",
            ],
          },
          {
            heading: "Ukukhumbula isivumelwano ekwenzeni",
            paragraphs: [
              "Ukugcina iSabatha kusho ukukhumbula ukuthi isikhathi esingcwele kumele sihlelwe ngezwi likaNkulunkulu. Ukuhlangana kwebandla, ukufundisa komdala, nokuhlanganyela emva kweklasi kuba yingxenye yokuphila kwesivumelwano.",
              "Yingakho iSabatha lihlala lisemqoka eKOI: liyibuyisela njalo imfundiso, ukulungiswa, ukukhumbula, nokuthula.",
            ],
          },
        ],
      },
      st: {
        title: "Hobaneng Sabatha e ntse e le letsatsi la thuto, kgopotso, le taolo e halalelang.",
        intro:
          "Sabatha ha e nkoe ke KOI e le moetlo wa mokgabiso. Ke nako e beilweng eo ho yona thuto, kgopotso, kutlo, le kgotso di emang hammoho pela Modimo.",
        sections: [
          {
            heading: "Sabatha e le nako e beilweng",
            paragraphs: [
              "Sabatha ha se phomolo e se nang moelelo qetellong ya beke. Ke nako e halalelang e arotsoeng bakeng sa kgopotso, thuto, le kutlo.",
              "KOI e boloka letsatsi la bosupa e le kopano e halalelang moo lentswe le bulwang ka hloko le ka taolo.",
            ],
          },
          {
            heading: "Thuto ho ena le pontsho",
            paragraphs: [
              "Mehleng e lerata, thuto e tebileng ke bopaki ka boona. KOI e tshwara Sabatha e le letsatsi la kutlo e hlophisitsweng, ho sekaseka mangolo, le ho hahana ha phutheho.",
              "Dipene, dibuka, dipotso, le ho mamela ka hloko di tshwanetse ho ba teng hobane borapedi ha bo kgaolehe kutlwisisong.",
            ],
          },
          {
            heading: "Ho hopola selekane ka ketso",
            paragraphs: [
              "Ho boloka Sabatha ke ho hopola hore nako e halalelang e tshwanetse ho laolwa ke lentswe la Modimo. Ho bokana ha phutheho, thuto ya moholo, le kopano kamora tlelaseng di ba karolo ya bophelo ba selekane bo bonahalang.",
              "Ke ka baka leo Sabatha e salang e le bohareng ho KOI: ke ho kgutlela bekeng le beke thutong, khalemelong, kgopotsong, le kgotso.",
            ],
          },
        ],
      },
    },
    rhythmMedia: [
      {
        src: "/media/cinematic-first-fruits.jpg",
        label: "Covenant still",
        description: "A first-fruits still breaking the opening movement of the article.",
        aspectRatio: "16:9",
      },
      {
        src: "/media/linen-texture-bg.jpg",
        label: "Archive still",
        description: "A quiet linen archive still between the final sections.",
        aspectRatio: "3:2",
      },
    ],
  },
  {
    slug: "the-law-and-the-testimony",
    eyebrow: "Journal / May 2026",
    author: "By The Teaching Elder",
    heroImage: "/media/cinematic-manuscript.jpg",
    heroLabel: "Doctrinal manuscript still",
    translations: {
      en: {
        title: "The Law and the Testimony",
        intro:
          "Isaiah 8:20 gives the measure. This editorial article returns to the rule of doctrine and asks what it means to speak with light rather than against the word already given.",
        sections: [
          {
            heading: "The rule by which doctrine is weighed",
            paragraphs: [
              "The law is not treated as a discarded shadow. It is the revealed order by which truth is measured, error is exposed, and covenant life is named before God.",
              "To speak about righteousness while refusing the law is to remove the measure that identifies obedience and transgression in the first place.",
            ],
          },
          {
            heading: "The testimony that agrees with the law",
            paragraphs: [
              "The testimony of Christ does not rival the law. It confirms it, opens it, and brings the hearer into understanding through the prophets, the apostles, and the cornerstone himself.",
              "If a doctrine claims Christ while speaking against the word already given, it is not brighter for using his name. It is darker for using it falsely.",
            ],
          },
          {
            heading: "Why this remains central at KOI",
            paragraphs: [
              "The assembly is preserved by returning again and again to the law and to the testimony. That discipline prevents doctrine from drifting into sentiment, novelty, or the authority of men.",
              "What does not speak according to this word is not received, however polished, modern, or inherited it may appear.",
            ],
          },
        ],
      },
      zu: {
        title: "Umthetho Nobufakazi",
        intro:
          "U-Isaya 8:20 unikeza isilinganiso. Leli phephandaba lemfundiso libuyela emthethweni wokuhlola imfundiso futhi libuze ukuthi kusho ukuthini ukukhuluma ngokukhanya kunokuphikisana nezwi elalinikwe kakade.",
        sections: [
          {
            heading: "Umthetho wokulinganisa imfundiso",
            paragraphs: [
              "Umthetho awuthathwa njengesithunzi esilahliwe. Uyihlelo elambuliwe elilinganisa iqiniso, elidalula iphutha, futhi eliqamba impilo yesivumelwano phambi kukaNkulunkulu.",
              "Ukukhuluma ngobulungisa kodwa wenqaba umthetho kususa isilinganiso esichaza ukulalela nokweqa umthetho kuqala.",
            ],
          },
          {
            heading: "Ubufakazi obuvumelana nomthetho",
            paragraphs: [
              "Ubufakazi bukaKristu abuphikisani nomthetho. Buyawuqinisekisa, buwuvule, futhi bulethe ozwayo ekuqondeni ngabaprofethi, izithunywa, kanye netshe legumbi.",
              "Uma imfundiso ithi ikhuluma ngoKristu kodwa iphikisana nezwi elalinikwe kakade, ayinakho ukukhanya okukhulu; imnyama kakhulu ngenxa yokusebenzisa igama lakhe ngokungamanga.",
            ],
          },
          {
            heading: "Kungani lokhu kusalokhu kuyinhloko eKOI",
            paragraphs: [
              "Ibandla ligcinwa ngokubuyela njalo emthethweni nasebufakazini. Lolu hlelo lugwema ukuthi imfundiso iphaphazele ibe umuzwa nje noma ubusha babantu.",
              "Okungakhulumi ngokwaleli zwi akwamukelwa, noma kungabonakala kuhle, kusimanje, noma kungokwesiko.",
            ],
          },
        ],
      },
      st: {
        title: "Molao le Bopaki",
        intro:
          "Esaia 8:20 e fana ka tekanyo. Sengolwa sena sa boraditaba ba thuto se boela molaong wa ho lekanya thuto mme se botsa hore ho bolela eng ho bua ka lesedi ho ena le ho hanyetsa lentswe le seng le filwe.",
        sections: [
          {
            heading: "Molao oo thuto e lekwang ka wona",
            paragraphs: [
              "Molao ha o nkoe e le seriti se lahlilweng. Ke taolo e senotsweng e lekanyang nnete, e pepesang phoso, mme e bitsa bophelo ba selekane pela Modimo.",
              "Ho bua ka ho loka empa o hana molao ho tlosa tekanyo e hlalosang kutlo le tlolo ya molao pele.",
            ],
          },
          {
            heading: "Bopaki bo dumellanang le molao",
            paragraphs: [
              "Bopaki ba Kreste ha bo lwantshane le molao. Boa o tiisa, boa o bula, mme bo tlisa moamohedi kutlwisisong ka baprofeta, baapostola, le lejoe la sekhutlo.",
              "Ha thuto e ipolela Kreste empa e bua kgahlano le lentswe le seng le filwe, ha e be le lesedi le leholo; e fifala ka ho feta hobane e sebedisa lebitso la hae hampe.",
            ],
          },
          {
            heading: "Hobaneng sena se le bohareng ho KOI",
            paragraphs: [
              "Phutheho e sireletswa ke ho kgutlela kamehla molaong le bopaking. Taolo ena e thibela thuto ho thekesela maikutlong, bocha, kapa taolong ya batho.",
              "Se sa bueng ho ya ka lentswe lena ha se amohelwe, leha se ka bonahala se bentshitswe, se le sa mehleng ena, kapa se futsitswe.",
            ],
          },
        ],
      },
    },
    rhythmMedia: [
      {
        src: "/media/cinematic-first-fruits.jpg",
        label: "Doctrinal still",
        description: "A still placed between the rule-of-truth and witness sections.",
        aspectRatio: "16:9",
      },
      {
        src: "/media/linen-texture-bg.jpg",
        label: "Witness still",
        description: "A quiet still between the final doctrinal movements.",
        aspectRatio: "3:2",
      },
    ],
  },
];
