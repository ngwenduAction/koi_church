import { site } from "./site";
import type { LessonVariant } from "../features/lessons/types";

const youtubeChannel = site.socials.find((social) => social.platform === "YouTube")?.url;

export const lessonVariants: LessonVariant[] = [
  {
    id: "law-testimony-en",
    lessonGroupId: "the-law-and-the-testimony",
    language: "en",
    title: "The Law and the Testimony",
    summary:
      "A foundational Sabbath lesson on testing doctrine according to the law of God and the testimony borne by the prophets, Christ, and the apostles.",
    readerIntro:
      "This lesson returns the hearer to Isaiah 8:20 and frames doctrine through the commandments, the prophets, Christ, and the apostolic witness.",
    readerSections: [
      {
        heading: "The law as measure",
        paragraphs: [
          "The commandments given by God are not treated as fragments of a vanished order. They remain the revealed measure by which conduct, judgment, worship, and doctrine are examined before the Most High.",
          "For KOI, to speak of truth without the law is to speak without the measure that names obedience, holiness, remembrance, and separation.",
        ],
      },
      {
        heading: "The testimony in light",
        paragraphs: [
          "The testimony of Christ does not cancel the law; it confirms and opens it. What the prophets spoke forward, Christ and the apostles bring into light so that the hearer understands both mercy and judgment together.",
          "This is why doctrine is returned to the law and to the testimony. The two witnesses stand together, and what refuses that agreement is counted without light.",
        ],
      },
      {
        heading: "Trying every word",
        paragraphs: [
          "The faithful teacher does not keep one witness and discard the other. Every doctrine, tradition, and spiritual claim must be tried by the word already given.",
          "This discipline preserves the house from confusion. It keeps the assembly under the rule of truth rather than under novelty, inheritance, or personal preference.",
        ],
      },
    ],
    pdfUrl: "/lessons/The%20Law%20%26%20the%20Testimony_English.pdf",
    videoUrl: youtubeChannel,
    date: "",
    category: "Foundation",
    scriptureReferences: ["Isaiah 8:20"],
    relatedTeachingSlug: "the-law-and-the-testimony",
    featured: true,
  },
  {
    id: "law-testimony-zu",
    lessonGroupId: "the-law-and-the-testimony",
    language: "zu",
    title: "Umthetho Nobufakazi",
    summary:
      "Isifundo esiyisisekelo seSabatha esihlola imfundiso ngokomthetho kaNkulunkulu nangobufakazi babaprofethi, bukaKristu, nabezithunywa.",
    readerIntro:
      "Lesi sifundo sibuyisela umfundi ku-Isaya 8:20 futhi sihlela imfundiso ngokomthetho, abaprofethi, uKristu, kanye nobufakazi bezithunywa.",
    readerSections: [
      {
        heading: "Umthetho uyisilinganiso",
        paragraphs: [
          "Imiyalo kaNkulunkulu ayithathwa njengezingcezu zomlando ezilahlekile. Ihlala iyisilinganiso esembuliwe sokuthi ukuhlanzeka, ukulalela, nokwahlulela kuhlolwe kanjani phambi kukaNkulunkulu.",
          "Uma iqiniso likhulunywa ngaphandle komthetho, khona-ke likhulunywa ngaphandle kwesilinganiso esiqamba ukulalela, ubungcwele, nokukhumbula.",
        ],
      },
      {
        heading: "Ubufakazi buletha ukukhanya",
        paragraphs: [
          "Ubufakazi bukaKristu abususi umthetho; buyawuqinisekisa futhi buwuvule. Lokho abaprofethi abakukhuluma ngaphambili, uKristu nezithunywa bakuletha ngokukhanya ukuze kuqondwe umusa nokwahlulela ndawonye.",
          "Yingakho imfundiso ibuyiselwa emthethweni nasebufakazini. Ofakazayo nabakhulumayo kumele bavumelane naleli zwi.",
        ],
      },
      {
        heading: "Ukuhlola lonke izwi",
        paragraphs: [
          "Ufundisi othembekile akagcini ngobufakazi obunye. Yonke imfundiso, isiko, noma isimangalo somoya kumele sihlolwe ngokwezwi elanikwa kakade.",
          "Lokhu kugcina indlu ingadideki futhi kugcina ibandla lingaphansi kweqiniso kunokuba libe ngaphansi kokusha noma isifiso somuntu.",
        ],
      },
    ],
    pdfUrl: "/lessons/Umthetho%20Nobufakazi_IsiZulu.pdf",
    videoUrl: youtubeChannel,
    date: "",
    category: "Foundation",
    scriptureReferences: ["Isaiah 8:20"],
    relatedTeachingSlug: "the-law-and-the-testimony",
    featured: true,
  },
  {
    id: "law-testimony-st",
    lessonGroupId: "the-law-and-the-testimony",
    language: "st",
    title: "Molao le Bopaki",
    summary:
      "Thuto ya motheo ya Sabatha e lekanyang thuto ka molao wa Modimo le bopaki ba baprofeta, Kreste, le baapostola.",
    readerIntro:
      "Thuto ena e busetsa mmadi ho Esaia 8:20 mme e hlophisa thuto ka molao, baprofeta, Kreste, le bopaki ba baapostola.",
    readerSections: [
      {
        heading: "Molao e le tekanyo",
        paragraphs: [
          "Litaelo tseo Modimo a faneng ka tsona ha di nkehe e le dikarolo tse lahlehileng tsa nalane. Di sala e le tekanyo e senotsweng ya boitelo, boitshepo, le kahlolo pela Modimo.",
          "Ha nnete e buuwa ntle le molao, e buuwa ntle le tekanyo e bitsang kutlo, boitshepo, le kgopotso.",
        ],
      },
      {
        heading: "Bopaki bo tlisa lesedi",
        paragraphs: [
          "Bopaki ba Kreste ha bo fedise molao; boa o tiisa mme boa o bula. Seo baprofeta ba se buileng pele, Kreste le baapostola ba se tlisa leseding e le hore mohau le kahlolo di utlwahale hammoho.",
          "Ke ka baka leo thuto e kgutlelang molaong le bopaking. Dipaki tsena tse pedi di tshwanetse ho bua lentsoe le le leng.",
        ],
      },
      {
        heading: "Ho leka lentswe le leng le le leng",
        paragraphs: [
          "Moruti ya tshepahalang ha a nke bopaki bo le bong feela. Thuto e nngwe le e nngwe, moetlo, kapa polelo ya moya e tshwanetse ho lekwa ka lentswe le seng le filwe.",
          "Taolo ena e sireletsa ntlo pherekanong mme e boloka phutheho e le tlasa nnete, eseng tlasa moetlo kapa thato ya motho.",
        ],
      },
    ],
    pdfUrl: "/lessons/Molao%20le%20Bopaki_Sesotho.pdf",
    videoUrl: youtubeChannel,
    date: "",
    category: "Foundation",
    scriptureReferences: ["Isaiah 8:20"],
    relatedTeachingSlug: "the-law-and-the-testimony",
    featured: true,
  },
  {
    id: "sabbath-ten-commandments-en",
    lessonGroupId: "the-sabbath-and-the-ten-commandments",
    language: "en",
    title: "The Sabbath and the Ten Commandments",
    summary:
      "A doctrinal study on the seventh-day Sabbath within the royal law and the moral witness of the commandments.",
    readerIntro:
      "This study places the Sabbath within the royal commandments, not as an isolated custom but as part of the moral order spoken by God.",
    readerSections: [
      {
        heading: "The Sabbath in the commandments",
        paragraphs: [
          "The Sabbath commandment stands among the ten as part of a complete moral witness. It is not ceremonial excess, but holy order within the words spoken by God.",
          "To remember the Sabbath day is to acknowledge time itself as subject to the Creator and not to human convenience.",
        ],
      },
      {
        heading: "Rest, remembrance, and obedience",
        paragraphs: [
          "The command joins rest with remembrance. It teaches the people of God to order labor, worship, and study under the word rather than under commercial appetite or private preference.",
        ],
      },
    ],
    pdfUrl: "/lessons/placeholder.pdf",
    date: "",
    category: "Sabbath Doctrine",
    scriptureReferences: ["Exodus 20:8-17", "Isaiah 58:13-14"],
    featured: true,
  },
  {
    id: "sabbath-ten-commandments-zu",
    lessonGroupId: "the-sabbath-and-the-ten-commandments",
    language: "zu",
    title: "ISabatha neMiyalo Eyishumi",
    summary:
      "Isifundo semfundiso esibeka usuku lwesikhombisa ngaphakathi komthetho wobukhosi nangobufakazi bokuziphatha bemiyalo.",
    readerIntro:
      "Lesi sifundo sibeka iSabatha phakathi kwemiyalo yobukhosi, hhayi njengesiko elimele lodwa kodwa njengengxenye yohlelo lokuziphatha olukhulunywe nguNkulunkulu.",
    readerSections: [
      {
        heading: "ISabatha emiyalweni",
        paragraphs: [
          "Umyalo weSabatha umi phakathi kwemiyalo eyishumi njengobufakazi obuphelele bokuziphatha. Awuyona into eyeqile yesiko, kodwa uyisiyalo esingcwele phakathi kwamazwi kaNkulunkulu.",
        ],
      },
      {
        heading: "Ukuphumula nokukhumbula",
        paragraphs: [
          "Lo myalo uhlanganisa ukuphumula nokukhumbula. Ufunda abantu bakaNkulunkulu ukuhlela umsebenzi, ukukhonza, nokufunda ngaphansi kwezwi.",
        ],
      },
    ],
    pdfUrl: "/lessons/placeholder.pdf",
    date: "",
    category: "Sabbath Doctrine",
    scriptureReferences: ["Exodus 20:8-17", "Isaiah 58:13-14"],
    featured: true,
  },
  {
    id: "feasts-of-the-lord-en",
    lessonGroupId: "the-feasts-of-the-lord",
    language: "en",
    title: "The Feasts of the Lord",
    summary:
      "An appointed-times lesson tracing the holy convocations of Leviticus 23 and their place in sacred time.",
    readerIntro:
      "This lesson follows the appointed seasons named in Leviticus 23 and treats them as sacred time rather than cultural ornament.",
    readerSections: [
      {
        heading: "Sacred time named by God",
        paragraphs: [
          "The feasts are not inventions of later memory. They are appointed times named by God, and they place the assembly inside a calendar of remembrance, worship, and obedience.",
        ],
      },
      {
        heading: "Convocation and rehearsal",
        paragraphs: [
          "Each feast gathers the house into ordered remembrance. The people do not merely recall history; they rehearse the covenant and its promises in sacred time.",
        ],
      },
    ],
    pdfUrl: "/lessons/placeholder.pdf",
    date: "",
    category: "Holy Days",
    scriptureReferences: ["Leviticus 23"],
    featured: true,
  },
  {
    id: "feasts-of-the-lord-st",
    lessonGroupId: "the-feasts-of-the-lord",
    language: "st",
    title: "Meketjana ya Morena",
    summary:
      "Thuto ya dinako tse behilweng e latelang dipitso tse halalelang tsa Levitike 23 le sebaka sa tsona nakong e halalelang.",
    readerIntro:
      "Thuto ena e latela dinako tse behilweng tse bitsitsweng ho Levitike 23 mme e di nka e le nako e halalelang, eseng mokgabiso wa setso.",
    readerSections: [
      {
        heading: "Nako e halalelang e rehilweng ke Modimo",
        paragraphs: [
          "Meketjana ha se mehopolo ya morao. Ke dinako tse behilweng ke Modimo, mme di kenya phutheho kahare ho khalendara ya kgopotso le kutlo.",
        ],
      },
      {
        heading: "Kopano le boitokisetso",
        paragraphs: [
          "Mokete o mong le o mong o bokella ntlo kgopolong e hlophisitsweng. Batho ha ba hopole nalane feela; ba boela ba phela tumellano nakong e halalelang.",
        ],
      },
    ],
    pdfUrl: "/lessons/placeholder.pdf",
    date: "",
    category: "Holy Days",
    scriptureReferences: ["Leviticus 23"],
    featured: true,
  },
  {
    id: "clean-unclean-leviticus-11-en",
    lessonGroupId: "clean-and-unclean-leviticus-11",
    language: "en",
    title: "Clean and Unclean: Leviticus 11",
    summary:
      "A study in dietary holiness, distinguishing what may be eaten from what must be refused before God.",
    readerIntro:
      "This lesson studies dietary holiness as part of covenant obedience and not as a merely cultural distinction.",
    readerSections: [
      {
        heading: "Distinction at the table",
        paragraphs: [
          "Leviticus 11 teaches distinction. What is received into the body is not treated as morally neutral when God has already named what is clean and what is unclean.",
        ],
      },
      {
        heading: "Holiness in ordinary practice",
        paragraphs: [
          "Dietary law brings holiness into ordinary practice. It trains the people of God to remember that obedience is not abstract, but embodied in daily life.",
        ],
      },
    ],
    pdfUrl: "/lessons/placeholder.pdf",
    date: "",
    category: "Dietary Law",
    scriptureReferences: ["Leviticus 11"],
    featured: false,
  },
];
