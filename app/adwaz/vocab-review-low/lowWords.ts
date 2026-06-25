export interface LowWordCandidate {
  word: string;
  count: number;
  confidence: string;
  confidenceScore: number;
  source: string;
  preferredVariant: string;
  contexts: string[];
}

export const LOW_WORD_CANDIDATES: LowWordCandidate[] = [
  {
    "word": "hergie",
    "count": 30,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "di a. Mwen gen avè m yon bèl ekip. Mwen gen Chevalier Hergie, mwen gen Gerson Moras. Nou gen Johane Josema e nou g",
      "ki kote y ap travay. Donk, m panse m ap kòmanse avèk Hergie. Hergie, èske ou ka di nou kiyès ou ye epi ki travay",
      "y ap travay. Donk, m panse m ap kòmanse avèk Hergie. Hergie, èske ou ka di nou kiyès ou ye epi ki travay w ap fè"
    ]
  },
  {
    "word": "johane",
    "count": 25,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "gen Chevalier Hergie, mwen gen Gerson Moras. Nou gen Johane Josema e nou gen Maximien Woodley ki ap gen pou l jwe",
      "pil, anpil ane gen tan pase. Kounye a, n ap pase avèk Johane. Johane, di nou kiyès ou ye epi ki travay ou fè nan s",
      "il ane gen tan pase. Kounye a, n ap pase avèk Johane. Johane, di nou kiyès ou ye epi ki travay ou fè nan sistèm sa"
    ]
  },
  {
    "word": "cindy",
    "count": 6,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "m bliye souri li, jantiyès li. Mwen panse m ap rele l Cindy pou ede nou konprann, men se pa t vrè non li. Cindy s",
      "l Cindy pou ede nou konprann, men se pa t vrè non li. Cindy se te yon ti pitit 5 an ke nou te wè sou plizyè mwa.",
      "è kijan yo kapab jwenn yon Air Ambulance pou retounen Cindy Okap. Omwen la vin mouri bò kote fanmi li. Li pa obli"
    ]
  },
  {
    "word": "charite",
    "count": 4,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "li vrèman bay imaj ke se yon pakèt moun ke ou t ap fè charite epi ou deside jis vire do w, ou ale. Ou t ap bay, ou",
      "trete nou tankou yon pakèt moun kòm si pòv ke y ap fè charite. Se te kou jan Gerson di a, yo wè nou tankou yon pakè",
      "eyi rich, epi nou menm pou nou rete ti peyi ke ap bay charite lè yo vle, lè yo sou sa, lè yo anvi sa. Pou mwen, se"
    ]
  },
  {
    "word": "equal",
    "count": 4,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "Se yon plezi pou m avèk nou jodi a. E m ap travay pou Equal Health Ayiti kòm kòdonatè pwogram aktyèlman la. Mèsi",
      "on. Mwen se direktris kou medsin sosyal an Ayiti avèk Equal Health depi 2022. Mwen se yon militan, yon aktivis na",
      "yo anpil, etandone ke ou fè kowòdinasyon pwogram pou Equal Health an Ayiti e sitou nan mouvman medsin sosyal la."
    ]
  },
  {
    "word": "health",
    "count": 4,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "plezi pou m avèk nou jodi a. E m ap travay pou Equal Health Ayiti kòm kòdonatè pwogram aktyèlman la. Mèsi tout mo",
      "en se direktris kou medsin sosyal an Ayiti avèk Equal Health depi 2022. Mwen se yon militan, yon aktivis nan medsi",
      "pil, etandone ke ou fè kowòdinasyon pwogram pou Equal Health an Ayiti e sitou nan mouvman medsin sosyal la. Epi se"
    ]
  },
  {
    "word": "houdelet",
    "count": 4,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "np? E m panse jis anvan nou reponn, nou genyen Maxime Houdelet, psikològ, ki rejwenn nou. Avèk nou? E èske ou ka jis",
      "on plezi pou mwen ansanm avèk nou. Non pa m se Maxime Houdelet [unsure] e mwen se psikològ. E sa ki enpòtan, nan sa",
      "panse. Wi, mwen panse ou ajoute yon pakèt gwo bagay, Houdelet. Mwen renmen konparezon ou fè avèk relasyon ant yon p"
    ]
  },
  {
    "word": "medicine",
    "count": 4,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "Pòdkas: Social Medicine on Air Bonjou, bonjou tout moun. Non pa m se Youri En",
      "plezi pou nou jwenn nou jodi a nan pòdkas sa Social Medicine on Air, ki se yon pòdkas ki gen kèk tan depi l ap fra",
      "n medsin sosyal la avèk Brendan avèk tout ekip Social Medicine on Air la k ap fè yon bèl travay. Donk jodi a, se yon"
    ]
  },
  {
    "word": "yeah",
    "count": 4,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "viv nan yon sitiyasyon konsa an tèm de sante. Youri:Yeah, bagay la vrèman difisil. E mèsi dèske w vini avèk ch",
      "n an oblije tann avan yo kòmanse sèvi l. Youri: Okay. Yeah, pwoblèm yo anpil. Johane, mwen pa konnen si ou gen y",
      "ka reponn, petèt ke wout la t ap fèt.... Youri: Mhm. Yeah, si m byen konprann, Gerson... Gerson: Gen moun ki m"
    ]
  },
  {
    "word": "casse",
    "count": 3,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "byen chè nan Okap avèk disponiblite tou ki se yon lòt casse-tête, fè ke skanè a pa t janm rive fèt. Enstitisyon k",
      "n, swivi pou pasyan tounen vin jwenn nou, se tout yon casse-tete. Air Ambulance, se yon casse-tete. lopital ki po",
      "nn nou, se tout yon casse-tete. Air Ambulance, se yon casse-tete. lopital ki pou resevwa pasyan se yon kase tèt,"
    ]
  },
  {
    "word": "chevalier",
    "count": 3,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "jounen jodi a. Mwen gen avè m yon bèl ekip. Mwen gen Chevalier Hergie, mwen gen Gerson Moras. Nou gen Johane Josema",
      "u ye epi ki travay w ap fè nan sistèm sante a? Hergie Chevalier: Bonjou ekip. Non pa m se Hergie Chevalier. Mwen se",
      "a? Hergie Chevalier: Bonjou ekip. Non pa m se Hergie Chevalier. Mwen se medsen. Mwen se famasyèn, m ap travay nan de"
    ]
  },
  {
    "word": "chirijyen",
    "count": 3,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "Pa egzanp, si se yon moun y ap opere, ou oblije peye chirijyen, peye anestezis la apa, ki prèskè menm bagay ak prive",
      ", dèske nou vin tande timè nan tèt, kesyon espesyalis chirijyen ki ka opere tèt se Pòtoprens sa chita. E m sonje a l'",
      "ans isit an Ayiti rete yon mit. Lè ou voye pasyan bay chirijyen an, swivi pou pasyan tounen vin jwenn nou, se tout yo"
    ]
  },
  {
    "word": "c’est",
    "count": 3,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "c qui sortit de l'extérieur pour aider un système. Et c'est là encore qu'on va comprendre réalité privée avec pub",
      "wenn anpil ka osi ki gen medam yo de twoub òmonal. Ça c'est la rage. Anpil kis ovaryen, fibwòm, kansè... Kansè ma",
      "nm se pa pale. Paske gen anpil ka Kansè matris. Donk, c'est alarmant pou medam yo. Mwen menm mwen anvi fè m yon e"
    ]
  },
  {
    "word": "l’hôpital",
    "count": 3,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "wen se famasyèn, m ap travay nan depo periferik Sid e l'Hôpital Sainte-Anne Camp-Perrin. Se yon plezi pou m avèk nou",
      "n gwo lopital nou konnen ki fèmen, se nan Mirebalais, l'Hôpital Universitaire de Mirebalais. E yon lòt lopital nou ko",
      "lopital nou konnen ki fèmen ankò ki nan Pòtoprens se l'Hôpital Général. Donk reyalite a de plis an plis difisil. Men"
    ]
  },
  {
    "word": "maxime",
    "count": 3,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "pa egzanp? E m panse jis anvan nou reponn, nou genyen Maxime Houdelet, psikològ, ki rejwenn nou. Avèk nou? E èske",
      "n. Se yon plezi pou mwen ansanm avèk nou. Non pa m se Maxime Houdelet [unsure] e mwen se psikològ. E sa ki enpòtan",
      "nou ap mete fen nan seyans lan. E nou te gen avèk nou Maxime Houdelet ki se psikològ, Johane Josema ki se medsen,"
    ]
  },
  {
    "word": "vih",
    "count": 3,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "kaman, e kisa m pral fè?An pasan, mwen se nan pwogram VIH sa a, e nou travay nan lopital de Saint-Damien [unsur",
      "Medikaman se yon sekrè. Nou konnen sitou an Ayiti ak VIH se yon bagay ki stigmatize. Lè w soti nan yon sitiyas",
      "koupe anpil èd, sitou sou koze finansman nan pwogram VIH yo, USAID avèk PEPFAR, yo koupe yon pil fon sou yon s"
    ]
  },
  {
    "word": "ambulance",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "u n fè ankò, se wè ap wè kijan yo kapab jwenn yon Air Ambulance pou retounen Cindy Okap. Omwen la vin mouri bò kote f",
      "yan tounen vin jwenn nou, se tout yon casse-tete. Air Ambulance, se yon casse-tete. lopital ki pou resevwa pasyan se"
    ]
  },
  {
    "word": "anfaz",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yon an.Mwen panse li enpòtan pou nou mete yon ti kras anfaz sou ki wòl listwa, ki wòl kolonyalis la genyen sou sa",
      "pou nou avanse. Mwen sèten ou di tout bagay, nou mete anfaz anpil sou volonte ak enplikasyon pèsonèl chak grenn m"
    ]
  },
  {
    "word": "antrave",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "m popilasyon, pwoblèm transpò, pwoblèm ekonomik ki ka antrave sante popilasyon an, pa gen twòp enpòtans pou yo. Nou",
      "popilasyon an, pwoblèm transpò, pwoblèm ekonomik. Li antrave sante popilasyon an, li pa gen twòp enpòtans pou yo."
    ]
  },
  {
    "word": "apwoche",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "nte nou an, apwòch yon pwofesyonèl sante, fason pou l apwoche yon pasyan, nenpòt tip de pasyan fòk li apwoche yo so",
      "pou l apwoche yon pasyan, nenpòt tip de pasyan fòk li apwoche yo sou yon bagay ki jis, sou yon bagay kote nou pa ga"
    ]
  },
  {
    "word": "avc",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "enn anpil ka kòm sa. Nan yon mwa ou ka jwenn 4 a 5 ka AVC kote moun nan pa t konnen l hypertendu, se pandan l a",
      "moun nan pa t konnen l hypertendu, se pandan l ap fè AVC a li vini lopital la li konnen ke se tansyon li te fè"
    ]
  },
  {
    "word": "bal",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ok, mwen pito mouri kote m ye a, m pa pral mouri anba bal bandi Pòtoprens.\" Sa tèlman sa tris kòm reyalite ke m",
      "opere pitit la pou l tounen avèk pitit li Okap, paske bal bandi ki ap chante nan Pòtoprens fè ke chak jou, menm"
    ]
  },
  {
    "word": "bandi",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "mwen pito mouri kote m ye a, m pa pral mouri anba bal bandi Pòtoprens.\" Sa tèlman sa tris kòm reyalite ke malerez",
      "e pitit la pou l tounen avèk pitit li Okap, paske bal bandi ki ap chante nan Pòtoprens fè ke chak jou, menm si li"
    ]
  },
  {
    "word": "brendan",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "tan depi l ap frape pou mouvman medsin sosyal la avèk Brendan avèk tout ekip Social Medicine on Air la k ap fè yon",
      "òdkas nan Social Medicine on Air, ki se yon pòdkas ke Brendan avèk tout ekip li mennen regilyèman. E jodi a, se te"
    ]
  },
  {
    "word": "bwate",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "repoze sou lòt moun, n ap toujou gen yon sistèm k ap bwate (brankal), e n ap toujou gen yon sistèm k ap vin pi m",
      "if. Pèsonèlman, lè w ap rantre nan yon sistèm ki deja bwate, ki gen plizyè ane d'ekzistans deja, ou sipoze gen yo"
    ]
  },
  {
    "word": "derniers",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yon etid sou sa paske gen anpil Pap Test k ap fèt ces derniers temps, se yon egzamen ki disponib, pou w ka jwenn li",
      "pi oubyen ki aksepte mouri kay medam yo comme ca, ces derniers temps. Lòt bagay mwen kapab di ki pi kouran se pwobl"
    ]
  },
  {
    "word": "dezenterese",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ilnerab, lòt kote yo tout ap rale [unsure]. Tèlman yo dezenterese a konstwi, tèlman yo dezenterese a amelyore kèk pwen.",
      "[unsure]. Tèlman yo dezenterese a konstwi, tèlman yo dezenterese a amelyore kèk pwen. Donk, se sa m vle di ke pou moun"
    ]
  },
  {
    "word": "disons",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "i diferan. Sa ka rive ou jwenn yon moun ki responsab, disons, yon laboratwa, se li menm tou ki nan famasi a, akoz",
      "pèsonèl yo kontinye ap amelyore li. Men pa rapò avèk, disons, frè pa peye, pèsonèl yo gen tandans neglije sèvis yo"
    ]
  },
  {
    "word": "disparité",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "dre réalité privée avec publique, kisa ki fè gen tout disparité sa en termes d'intervention, en termes de disponibili",
      "payrolls personnes anndan sistèm nan ki fè gen tout disparité sa antre piblik ak prive. Paske nòmalman, malgre sist"
    ]
  },
  {
    "word": "dyare",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "esann. Nou ka jwenn maladi enfektyez ak tout tip nèt: dyare, mikòz, gastroenterit. Men nou vin jwenn anpil ka osi",
      "wenn omwen 50% nan ka m ap trete yo.\" Paske se toujou dyare, se toujou vant fè mal, se toujou: \"Dok, ti pitit mwe"
    ]
  },
  {
    "word": "enfeksyon",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n w ta swete jwenn li, kòm si pou pa pè pou pa atrape enfeksyon. Se yon bagay n ap goumen depi lontan pou li amelyore",
      "te opere a pou fè swivi, paske li te vin devlope yon enfeksyon swit a operasyon li te fè a. Epi sitiyasyon an vin ag"
    ]
  },
  {
    "word": "enjekte",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "konomik pou l mete disponib nan sistèm sante a, pou l enjekte nan sistèm sante a. Kote ke l ap pran an chaj non sèl",
      "man yo, nan tout komin yo, e ke richès sa yo kapab re-enjekte, dispache sou plizyè pwogram, epi envesti plis kòb na"
    ]
  },
  {
    "word": "frajil",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "gay tou nan sans ke pou yon sistèm k ap degengole, ki frajil nan pwen sa a, e ke majorite nan fon pou sistèm nan f",
      "isyen fè sistèm sante an konfyans? (00:59) - 1:27, ki frajil nan pwen sa a, e ke majorite nan fon pou sistèm nan f"
    ]
  },
  {
    "word": "gastrit",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ntasyon an pran la raj, tout moun ou ka jwenn gen yon gastrit a H Pylori. Mmen w ap jwenn yon gastrit de stress ka",
      "jwenn gen yon gastrit a H Pylori. Mmen w ap jwenn yon gastrit de stress kanmenm pa rapò avèk lè moun yo manje, kal"
    ]
  },
  {
    "word": "gré",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "an plis. Nan lopital leta, responsab yo travay plein gré. Kòm si, enfimyè, pèsonèl, tout moun ki nan enstitisy",
      "sonèl, tout moun ki nan enstitisyon yo travay a plein gré, sitou lè Leta pran tan pou l voye chèk yo, pafwa de"
    ]
  },
  {
    "word": "imedyatman",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      ", nan lopital prive, sa ka rive yon medsen pa la, men imedyatman, si moun nan gen yon nesesite, espesyalis la, yo rele",
      "entènasyonal ki sou tèren an k ap fonksyone. Sa fè ke imedyatman lè USAID koupe kòb yo, lòt òganis entènasyonal ki dis"
    ]
  },
  {
    "word": "ipertansyon",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "si site non maladi dirèktman, plis ka dyabèt, plis ka ipertansyon, plis ka pwoblèm renal etsetera? Hergie, vas-y. Hergi",
      "antal. Hergie : wi, majorite. Epi answit, m ap jwenn ipertansyon ateryèl. Anpil fwa yo vin nan klinik ekstèn, yo pa ok"
    ]
  },
  {
    "word": "johanne",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "u kiyès ou ye epi ki travay ou fè nan sistèm sante a. Johanne: Mèsi Youri. Bonjou ekip, bonjou tout moun. Mwen kon",
      "onjou tout moun. Mwen kontan la avèk nou. Non pa m se Johanne Josema. Mwen se yon doktè. Mwen ap travay kòm respons"
    ]
  },
  {
    "word": "konkour",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "vèk redi pou jwenn san etidyan ki postule pou ale nan konkour pou rantre nan fakilte medsin lan. Wow! Kòmsi yo pran",
      "lis nou yo sou teren ap diminye osi. Paske nou pa gen konkour rezidans, men sa ki disponib yo, an ale o nivo popila"
    ]
  },
  {
    "word": "koudmen",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "kriz yo, epi yo la ankò ki vin pou di ke yo vin pote koudmen. Jan Johane di a, kolonyalis la li mete yon modèl de",
      ", pou èd entènasyonal yo, pou moun ki swadizan ap bay koudmen yo, si se sou fòm charite kote yon jou yo la, yo krey"
    ]
  },
  {
    "word": "labou",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Se yon wout ki chaje avèk pousyè oubyen ki chaje avèk labou lè lapli tonbe. Se yon lakou kay ki chaje pousyè ak l",
      "u lè lapli tonbe. Se yon lakou kay ki chaje pousyè ak labou ke ti moun yo ap jwe ladan l. Se yon vye kamyon ki to"
    ]
  },
  {
    "word": "malnutrisyon",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pou bay ti moun nan manje ki fè ti moun nan tonbe nan malnutrisyon. Paran yo konn genyen de ti moun nan pwogram malnutri",
      "utrisyon. Paran yo konn genyen de ti moun nan pwogram malnutrisyon, paran pou tèt pa l, ou wè se yon moun ki bezwen de s"
    ]
  },
  {
    "word": "menaj",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "on rapò UNESCO ak selon rapò OMS te pibliye, yo di ke menaj yo, yo menm yo responsab 33.6% nan finansman sante pa",
      "iblik ak prive. Paske nòmalman, malgre sistèm nan la, menaj la li menm ki pap travay oubyen k ap viv ak mwens ke"
    ]
  },
  {
    "word": "miks",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "an nan kad prive ak piblik, menm lè yon lopital li se miks. Anndan meen lopital ki se miks, ki swa ONG epi Leta",
      "lè yon lopital li se miks. Anndan meen lopital ki se miks, ki swa ONG epi Leta an menm tan, li fasil lè w rive"
    ]
  },
  {
    "word": "moras",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "bèl ekip. Mwen gen Chevalier Hergie, mwen gen Gerson Moras. Nou gen Johane Josema e nou gen Maximien Woodley ki",
      "panse nou pral pase yon bon moman ansanm. Non pa m se Moras Pierre Gerson, jan Youri di l la. Mwen menm mwen trav"
    ]
  },
  {
    "word": "nerochirijyen",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "asil pou transfere li nan lopital Bernard Mevs ki gen nerochirijyen ki ta ka wè timoun nan epi planifye operasyon an. Pap",
      "yon kase tèt, disponiblite yon espesyalis tankou yon nerochirijyen se yon kase tèt. E papa a pran tan li pou li rele m p"
    ]
  },
  {
    "word": "ok",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ut lòt sa ki pral mache dèyè l yo, tankou ensekirite, ok? An nou di ke nou konnen ke 60% nan moun k ap viv nan",
      "lòt kominote pou yo mennen yo nan yon sant de sante, ok? E san nou pa menm eseye pale de lòt difikulte ki ka"
    ]
  },
  {
    "word": "otan",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "o kapab jwenn li sou 1.5 a 2 mwa. Men poukisa nou gen otan ka de kansè k ap fè chimyoterapi oubyen ki aksepte mo",
      "nan lye pou o mwen sistèm nan kapab rete an vi. E tou otan nou dakò ke plis ke 56% de bidjè nasyonal nou an tèm"
    ]
  },
  {
    "word": "ouvri",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "menm lè li bezwen swen, l oblije chache ki lopital ki ouvri paske gen yon pakèt ki fèmen. Pou l jwenn li, men lè",
      "se l pou tout moun, e nenpòt moun ki vle reponn kapab ouvri mikwo l epi li kapab reponn. Part 9: Vizyon pou yon p"
    ]
  },
  {
    "word": "pipi",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pa ka mache, li pa ka chita pou kò l, li pa ka kenbe pipi avèk twalèt, epi se lè sa a nou te kòmanse swiv li. M",
      "blije ap itilize diapers paske li pa konnen lè li gen pipi avèk twalèt, li ap fè yo sou li. Epi, si pitit sa a,"
    ]
  },
  {
    "word": "potab",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yo pi konplèks ke sa. Nan zòn pwovens yo, sistèm dlo potab prèske pa ekziste. Lè ou mande pasyan an: \"Ki kote li",
      "e Leta? Kote enfrastrikti? Kote moun ki responsab dlo potab nan peyi a? Kote sa yo fè kòm travay? Paske zòn sa yo"
    ]
  },
  {
    "word": "prekarite",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "peye pou swen ke y ap resevwa a? Part 4: Finansman ak Prekarite Ekonomik Gerson:Mèsi, mèsi Youri. E se egzakteman sa",
      "bitan. Sa vle di, si m panse nou ka eseye konprann ki prekarite ki genyen an tèm de finansman pou ke pèp sa a peye. A"
    ]
  },
  {
    "word": "rapidman",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "èk twalèt, epi se lè sa a nou te kòmanse swiv li. Men rapidman, mwen te vin konprann se pa paske li tonbe ki fè li p",
      "an sa ye jounen jodi a? Okay, jis di nou ki lès ou ye rapidman epi petèt ban nou yon ti eta de lye nan lopital kote"
    ]
  },
  {
    "word": "redwi",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n k ap viv menm sitiyasyon sa a parpòta ak distans ki redwi ant yo menm avèk kote ki yo ta sipoze pran swen. Petè",
      "manje sa yo rive jwenn popilasyon an a tan, ki kapab redwi kòb acha popilasyon an pou manje a vin aksesib e disp"
    ]
  },
  {
    "word": "refere",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "disponib. Donk sa fè swen yo ase limite lè ou bezwen refere pasyan lè li gen yon ka ki yon jan pi espesifik ki be",
      "en te etidye Pòtoprens, mwen konnen Pòtoprens m ta ka refere w tèl, tèl kote ki ta ka ede w.\" Epi li tèlman tris l"
    ]
  },
  {
    "word": "remanye",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "M konnen ke li pa fasil, gen anpil bagay ki ta sipoze remanye, men m panse sa vrèman enpòtan pou nou wè. Se sa m pa",
      "ite striktiral ki genyen yo, fòk tout sa yo nou kapab remanye yo. Fòk nou kanpe sou jan de kolonizasyon sa a, anpli"
    ]
  },
  {
    "word": "rezidans",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "w! Kòmsi yo pran kòm rezidan pou pedyatri, nou pa gen rezidans ospitalyè an Ayiti pou moun ki fini yo. Donk, premye",
      "yo sou teren ap diminye osi. Paske nou pa gen konkour rezidans, men sa ki disponib yo, an ale o nivo popilasyon, nan"
    ]
  },
  {
    "word": "rezilyans",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "fòk nou konte tèt nou ladan l, paske gen diferans ant rezilyans avèk rezinyasyon, e anpil fwa nou plis rezinyen nou k",
      "konn panse rete pran kou a se sa k ap konstwi e bati rezilyans nou, men anpil fwa sa mande tou anpil rezistans, anpi"
    ]
  },
  {
    "word": "riske",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "itou, m pa prale avèk pitit mwen Pòtoprens, m pa pral riske lavi m Pòtoprens.\" Li di omwen si se te Mirebalais li",
      "s m t ap ale, men pou Pòtoprens lan, mwen pa anvi ale riske lavi m avèk lavi timoun mwen an Pòtoprens.\" Lè nou vi"
    ]
  },
  {
    "word": "senpleman",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nan pwovens yo, oubyen ki difisil pou jwenn oubyen ki senpleman pi chè. Kounye a la, pou n ajoute sou kesyon ou poze",
      "istèm kolonyal la ye, se sa èd ke yo ap bay yo ye tou senpleman. Youri: Yeah. Mwen wè Woodley vle ajoute. Wi, pou m"
    ]
  },
  {
    "word": "sindi",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "sistèm iben an? Part 3: Reyalite Riral vs Iben: Istwa Sindi Johane:Mèsi Youri pou kesyon sa a. Mwen panse gen yon",
      "ki te make w, ke ou ka pataje avèk nou? Part 5: Istwa Sindi ak Defayans Sistèm nan Mwen gen yon ti pitit sa a mwe"
    ]
  },
  {
    "word": "sinon",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ou menm ankò nou soti kòm moun k ap kolonize tèt nou. Sinon, genyen kòmsi de desizyon nou te kapab pran pa rapò a",
      "isa: nou menm ankò nou se moun k ap kolonize tèt nou. Sinon, genyen kòmsi kèk desizyon nou te kapab pran pa rapò"
    ]
  },
  {
    "word": "siviv",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "mete nou nan yon sitiyasyon kote ke nou pa viv, n ap siviv. Yon moun ki malad ou an tò, ou gen yon andikap ou an",
      "se vrèman yo menm k ap debouye yo pou yo viv, pou yo siviv? E pafwa, yon ti boutèy dlo ki tou kase tèt. Pa egzan"
    ]
  },
  {
    "word": "souri",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "èm nan Mwen gen yon ti pitit sa a mwen pap janm bliye souri li, jantiyès li. Mwen panse m ap rele l Cindy pou ede",
      "e l, yo t ap jwe, yo t ap chante. Mwen pap janm bliye souri ti pitit sa a. Kèk tan aprè, li vin gen fyèv, nou vin"
    ]
  },
  {
    "word": "stab",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ki pa fòseman gen nan prive a. Prive a yon ti kras pi stab, avèk yon woulman ki pi stab. Moun yo plis respekte a",
      ". Prive a yon ti kras pi stab, avèk yon woulman ki pi stab. Moun yo plis respekte a paske se la ki gen plis kòb,"
    ]
  },
  {
    "word": "staff",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ason pou oditwa lan kapab konprann byen. Nou pral nan staff administratif la. Nan staff administratif nan lopital",
      "nprann byen. Nou pral nan staff administratif la. Nan staff administratif nan lopital prive yo an Ayiti, yo trè b"
    ]
  },
  {
    "word": "strikti",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n tèm de pwofesyonèl jan w sot di a Johane, an tèm de strikti, enfrastrikti tout sa, èske majorite lopital yo toujo",
      "en tout ti zanmi li yo. Men pito li vin mouri nan yon strikti hospitalier nan Okap ke nou tout deja konnen ki pap k"
    ]
  },
  {
    "word": "test",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "èk yon kolèg jinekòg ki t ap di m ke lè pou yo fè Pap test pou yon pasyan ki Okap, menm si se Okap yo pran espes",
      "nm mwen anvi fè m yon etid sou sa paske gen anpil Pap Test k ap fèt ces derniers temps, se yon egzamen ki dispon"
    ]
  },
  {
    "word": "tououni",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "mete sistèm nan nan yon sitiyasyon de vilnerabilite, tououni a jenou nèt. Donk, sa se yon sitiyasyon ki vrèman dif",
      "mete sistèm nan nan yon sitiyasyon de vilnerabilite, tououni a jenou nèt. Donk, sa se yon sitiyasyon ki vrèman dif"
    ]
  },
  {
    "word": "vas",
    "count": 2,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      ". Mwen pa konnen, Gerson, si ou vle ajoute yon bagay, vas-y, epi n ap kontinye. Gerson: Mèsi anpil Hergie pou",
      "ipertansyon, plis ka pwoblèm renal etsetera? Hergie, vas-y. Hergie:Mèsi Youri. An fèt, pou bò kote pa m, paske"
    ]
  },
  {
    "word": "adere",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "moun vin fè l. Tèlman sa pa enterese yo, tèlman yo pa adere avèk anyen ki nan rapò avèk Leta isit oubyen sistèm l"
    ]
  },
  {
    "word": "agrave",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "on swit a operasyon li te fè a. Epi sitiyasyon an vin agrave, eta de sante ti pitit la deteryore. Mwen pap janm bl"
    ]
  },
  {
    "word": "aider",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "valye entre 56.7% donc qui sortit de l'extérieur pour aider un système. Et c'est là encore qu'on va comprendre ré"
    ]
  },
  {
    "word": "aktivis",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "avèk Equal Health depi 2022. Mwen se yon militan, yon aktivis nan medsin sosyal depi 2015 e mwen ap travay tou nan"
    ]
  },
  {
    "word": "aktyèl",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "jounen jodi a? Kijan kolonyalis la mennen nou nan eta aktyèl kote nou ye jodi a? Kijan, par egzanp, yon politik ta"
    ]
  },
  {
    "word": "alarmant",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pa pale. Paske gen anpil ka Kansè matris. Donk, c'est alarmant pou medam yo. Mwen menm mwen anvi fè m yon etid sou s"
    ]
  },
  {
    "word": "alimantasyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "se pwoblèm lestomak, tout moun gen pwoblèm lestomak, Alimantasyon an pran la raj, tout moun ou ka jwenn gen yon gastrit"
    ]
  },
  {
    "word": "alkolik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ndan moman. Donk, li vin fè yo gen 2 efè lakay yo. Yo alkolik, men y ap konsome dwòg di akote l ankò paske se nan a"
    ]
  },
  {
    "word": "alwe",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Pou koupe èd la, nou di anplis ke 56% de yon bidjè ki alwe a la sante pou ede yon popilasyon ke yo te estime ki"
    ]
  },
  {
    "word": "alè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "wen de vi ekonomik. Nan piblik lan, chèk leta pa vini alè. Donk, pa genyen anyen pou moun nan fonksyone. Lopita"
    ]
  },
  {
    "word": "amènaje",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ze non sèlman kantite e kalite sa nou pral pwodui yo. Amènaje moun yo, oubyen peyizan k ap plante yo, kreye yon sis"
    ]
  },
  {
    "word": "ancehene",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "i:Bon bagay. Bon bagay. Mèsi Hergie. Mwen panse m ap ancehene avèk Gerson. Gerson, èske ou ka di nou kiyès ou ye ep"
    ]
  },
  {
    "word": "andan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "lan, avèk gwoup ki ap travay sou pwoblèmatik Ayiti yo andan Kanpay kont Rasis lan te vrèman rasire yo ke yo ekri"
    ]
  },
  {
    "word": "anestezis",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "e yon moun y ap opere, ou oblije peye chirijyen, peye anestezis la apa, ki prèskè menm bagay ak prive, ou konprann? D"
    ]
  },
  {
    "word": "anmatyè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "e a pou l ka reponn ak egzijans byennèt popilasyon an anmatyè de sante. Bon bagay, bon bagay. Èske gen moun ki vle"
    ]
  },
  {
    "word": "antoure",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "te genyen, pansman li yo. Lòt frè avèk sè li yo t ap antoure l, yo t ap jwe, yo t ap chante. Mwen pap janm bliye s"
    ]
  },
  {
    "word": "aparans",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "y ki jis, sou yon bagay kote nou pa gade moun lan sou aparans li pou nou kapab ba li sèvis. Fòk tou nou gen yon fòm"
    ]
  },
  {
    "word": "arrive",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "e pale de lòt difikulte ki ka genye otou de sa. Sa ka arrive menm moun kap transporte li yo, menm yo menm, yo rive"
    ]
  },
  {
    "word": "ateryèl",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ie : wi, majorite. Epi answit, m ap jwenn ipertansyon ateryèl. Anpil fwa yo vin nan klinik ekstèn, yo pa okouran ke"
    ]
  },
  {
    "word": "atrape",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nitè jan w ta swete jwenn li, kòm si pou pa pè pou pa atrape enfeksyon. Se yon bagay n ap goumen depi lontan pou l"
    ]
  },
  {
    "word": "avèti",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yan yo. Paske yon èd ke ou t ap bay, koupe konsa, san avèti, san anyen, li vrèman bay imaj ke se yon pakèt moun k"
    ]
  },
  {
    "word": "bafwe",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nyen l an tant ke dwa, dwa a la sante pa egzanp ke ki bafwe e ki pa ka respekte souvan okenn kritè. Pou koupe èd"
    ]
  },
  {
    "word": "bakteri",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nvestigasyon pou wè èske sa an rapò avèk viris oubyen bakteri sou teren, ki tip de fyèv li ye etsetera. M panse an"
    ]
  },
  {
    "word": "balye",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "kapab pote plis amelyorasyon nan milye a, ki ta kapab balye avèk pwoblèm sa yo k ap pote de jou an jou sou teren"
    ]
  },
  {
    "word": "benen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "a te sove. Nou te dwe ka sove l paske se te yon timè benen, li te opere nou te retire l, e ti pitit la te sipoze"
    ]
  },
  {
    "word": "brancard",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "prèskè inkonsyan oblije pote l sou pòt. M pa pale de brancard, paske sa se yon bagay ki luxe. Yo oblije pote l sou"
    ]
  },
  {
    "word": "brankal",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "sou lòt moun, n ap toujou gen yon sistèm k ap bwate (brankal), e n ap toujou gen yon sistèm k ap vin pi mal chak f"
    ]
  },
  {
    "word": "brèf",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "kòmanse, m panse m pral envite chak moun bay yon ti brèf entwodiksyon de kiyès moun yo ye e ki kote y ap trava"
    ]
  },
  {
    "word": "camp",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "travay nan depo periferik Sid e l'Hôpital Sainte-Anne Camp-Perrin. Se yon plezi pou m avèk nou jodi a. Youri:Bo"
    ]
  },
  {
    "word": "cancereuse",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "vin konprann ke li te genyen yon timè nan tèt ki pa t cancereuse, men kote li ye nan tèt li a, li te mande opere pou k"
    ]
  },
  {
    "word": "cap",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "èk rès peyi a. Pou m di patikilyèman nan Okap [Okap = Cap-Haitien] ak zòn anviwon Okap, zòn andeyò Okap kote m"
    ]
  },
  {
    "word": "chapote",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "n sèvis ki disponib la pou li. Se konsa popilasyon an chapote. Men nan sant vil, nan vil ki pa twò lwen sant vil yo"
    ]
  },
  {
    "word": "chimioterapi",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "onib nan Sid kounye a pou moun ki ap devlope kansè fè chimioterapi, men li rete nan kad prive, kòm si li pa etatize nan"
    ]
  },
  {
    "word": "chimyoterapi",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "a 2 mwa. Men poukisa nou gen otan ka de kansè k ap fè chimyoterapi oubyen ki aksepte mouri kay medam yo comme ca, ces de"
    ]
  },
  {
    "word": "chodwè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "hon sa a, n ap ka pran kòm swen sa a pou nou mete nan chodwè a pou nou rann grès la, epi grès sa a ankò kapab pwof"
    ]
  },
  {
    "word": "cottoyer",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "pektiv Gerson kòm moun ki frekante sistèm sante a, ki cottoyer pwofesyonèl sante yo anpil, etandone ke ou fè kowòdin"
    ]
  },
  {
    "word": "damien",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n pwogram VIH sa a, e nou travay nan lopital de Saint-Damien [unsure]. E la, akote ke la majorite des patients, se"
    ]
  },
  {
    "word": "datant",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nan lopital, èske ou ka di nou kouman, kijan n wè sal datant yo. Èske yo plen, èske yo vid, èske gen toujou moun k"
    ]
  },
  {
    "word": "debouye",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nt yo konsa? Pouke ou santi ke se vrèman yo menm k ap debouye yo pou yo viv, pou yo siviv? E pafwa, yon ti boutèy d"
    ]
  },
  {
    "word": "defaillant",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "menm gen 6 zan. Se paske nou gen yon sistèm sante ki defaillant. Se paske referans avèk kontreferans isit an Ayiti re"
    ]
  },
  {
    "word": "defayans",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "e w, ke ou ka pataje avèk nou? Part 5: Istwa Sindi ak Defayans Sistèm nan Mwen gen yon ti pitit sa a mwen pap janm b"
    ]
  },
  {
    "word": "degengole",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n pakèt gwo bagay tou nan sans ke pou yon sistèm k ap degengole, ki frajil nan pwen sa a, e ke majorite nan fon pou s"
    ]
  },
  {
    "word": "degrenngole",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pakèt gwo bagay tou nan sans ke pou yon sistèm ki ap degrenngole, Men selon nou menm, èske ayisyen fè sistèm sante an"
    ]
  },
  {
    "word": "dekoksyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "inik sou teren, ou ap jwenn ti jèn yo lage yo nan yon dekoksyon e kòm si pwodwi natirèl ki se dròg vrèman. Bon dròg l"
    ]
  },
  {
    "word": "dekolonize",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "moun ta deside di kesyon kolonizasyon sa a fòk nou ta dekolonize l nan sante ak nan tout sistèm nan n n nèt pou nou ge"
    ]
  },
  {
    "word": "dekonpoze",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yon konfyans si pèp la gen nan sistèm sante a. Avan m dekonpoze l nan sa, mwen konnen yon pakèt Ayisyen pa ale lopita"
    ]
  },
  {
    "word": "depistaj",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "in pote yo, mennen yo vin kote y ap fè kanpay la, swa depistaj kansè di kòl oubyen kansè di sen — w ap jwenn moun vi"
    ]
  },
  {
    "word": "deplorab",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "erezman li pa fòseman sa, moun nan nan yon sitiyasyon deplorab e ke li ap viv ansanm avèk yon stres, e medikaman cha"
    ]
  },
  {
    "word": "depo",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "er. Mwen se medsen. Mwen se famasyèn, m ap travay nan depo periferik Sid e l'Hôpital Sainte-Anne Camp-Perrin. Se"
    ]
  },
  {
    "word": "deprime",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "epresyon, swa li minè oubyen li majè. Majorite pasyan deprime. Youri: Pwoblèm sante mantal. Hergie : wi, majorite."
    ]
  },
  {
    "word": "deregleman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ka vini menm pri. Youri: Sa vle di, Hergie, gen yon deregleman total si m byen konprann nan piblik la ki pa fòseman"
    ]
  },
  {
    "word": "desten",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Yo ap peze nou toujou, e si vrèman nou pa deside pran desten nou an men pou sa chanje, moun sa yo p ap janm sispan"
    ]
  },
  {
    "word": "deteryore",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pi sitiyasyon an vin agrave, eta de sante ti pitit la deteryore. Mwen pap janm bliye lè m rele kolèg mwen yo Pòtopren"
    ]
  },
  {
    "word": "detwi",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "le. E lè yo antre nan yon zòn, yo touye, yo vyole, yo detwi, yo boule kay, yo touye moun. Yo rekrite pi jèn gason"
    ]
  },
  {
    "word": "dezòganize",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yo pa gen lajan, enfrastrikti yo pa la, e sistèm nan dezòganize. Mwen panse gen anpil, gen anpil koze ou di la a ki e"
    ]
  },
  {
    "word": "diapers",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "era. Epi an menm tan tou, li toujou oblije ap itilize diapers paske li pa konnen lè li gen pipi avèk twalèt, li ap"
    ]
  },
  {
    "word": "difikulte",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ant de sante, ok? E san nou pa menm eseye pale de lòt difikulte ki ka genye otou de sa. Sa ka arrive menm moun kap tr"
    ]
  },
  {
    "word": "dispache",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "an tout komin yo, e ke richès sa yo kapab re-enjekte, dispache sou plizyè pwogram, epi envesti plis kòb nan sante a"
    ]
  },
  {
    "word": "disponibilite",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      ", se lè yo jwenn nan, yo oblije ba li ti rès lan. Pou disponibilite, nan lopital prive, sa ka rive yon medsen pa la, men"
    ]
  },
  {
    "word": "disponibilité",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "t disparité sa en termes d'intervention, en termes de disponibilité des soins, en termes du retard, sou kesyon payrolls p"
    ]
  },
  {
    "word": "doulè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nan tete paske a plizyè repriz li t ap pale m de yon doulè li gen nan tete. Mwen ba li fè sonografi sa a, li di"
    ]
  },
  {
    "word": "dènyèman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "è yon skanè.\" Men pou menm pwoblèm ki m t ap pale nou dènyèman an, skanè ki fèt byen chè nan Okap avèk disponiblite"
    ]
  },
  {
    "word": "d’abitan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "60% nan moun k ap viv nan peyi d Ayiti, nan 11 milyon d'abitan ap viv nan milye riral. E nou konnen deja ki sa sa vl"
    ]
  },
  {
    "word": "d’ekzistans",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "antre nan yon sistèm ki deja bwate, ki gen plizyè ane d'ekzistans deja, ou sipoze gen yon motivasyon, ou sipoze gen yon"
    ]
  },
  {
    "word": "d’ensekirite",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nan tande. Yon popilasyon ki nan sitiyasyon de kriz, d'ensekirite, kote pèp la li menm lè li bezwen swen, l oblije chac"
    ]
  },
  {
    "word": "d’intervention",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "publique, kisa ki fè gen tout disparité sa en termes d'intervention, en termes de disponibilité des soins, en termes du r"
    ]
  },
  {
    "word": "egzakteman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n ak Prekarite Ekonomik Gerson:Mèsi, mèsi Youri. E se egzakteman sa k t ap pase nan tèt mwen lè Hergie t ap pale de ke"
    ]
  },
  {
    "word": "egzatman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "o plis alèz nan prive a, si m byen konprann? Hergie: Egzatman, se pa leka nan Leta. Si nou ale nan yon lòt pwen, kò"
    ]
  },
  {
    "word": "ekate",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yo konsome l, yo di sa fè yo dòmi, sa fè yo manje, sa ekate estrès pandan moman. Donk, li vin fè yo gen 2 efè lak"
    ]
  },
  {
    "word": "ekipe",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pab sove si sistèm nan te pi byen òganize, te pi byen ekipe? M sèten ke chak pwofesyonèl sa yo te ap gen yon repo"
    ]
  },
  {
    "word": "eksplwate",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "tre lakay nou, yo vòlè resous nou, yo itilize nou, yo eksplwate nou pandan anpil ane. Epi kounye a la yo retounen sou"
    ]
  },
  {
    "word": "elikoptè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ou y ap toujou santi yo enpòtan, e y ap ka deplase pa elikoptè oubyen pa avyon pou al pran swen lòt kote paske yo ge"
    ]
  },
  {
    "word": "elve",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "di l lan. Pou pri pou sèvis yo, nan prive, li vrèman elve. Nan Leta, gen yon ti nuance kote yo di Leta a li pa"
    ]
  },
  {
    "word": "emoglobin",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "u fè glisemi avè l, ou jwenn li nòmal. Men lè w al fè emoglobin glike pou li, ou jwenn sik la te konn monte epi li de"
    ]
  },
  {
    "word": "emosyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "son:Mèsi Youri, mèsi anpil. Mèsi avèk tout bèl pataj, emosyon, ke Johane avèk Hergie pataje avèk nou. Se anpil kone"
    ]
  },
  {
    "word": "encelotti",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "ne on Air Bonjou, bonjou tout moun. Non pa m se Youri Encelotti Louis. Jodi a, mwen kontan avèk nou avèk yon bèl ekip"
    ]
  },
  {
    "word": "endividyèlman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "s pran yon desizyon epi sa fini, ke se sa yon moun fè endividyèlman, men kominote a mache ansanm avè l. Si pa gen yon bon"
    ]
  },
  {
    "word": "enjere",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "apab travay pou nou bay tèt nou manje. Yo jis sispann enjere yo nan politik peyi a, sispann fòse n rebouche nan za"
    ]
  },
  {
    "word": "enkyete",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ti pitit sa a. Kèk tan aprè, li vin gen fyèv, nou vin enkyete, epi nou te oblije tounen ti pitit la nan menm lopita"
    ]
  },
  {
    "word": "entite",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n ou di a, yon sistèm se yon mekanis ki genyen plizyè entite k ap travay e pou l fini ap bay menm rezilta, yon sèl"
    ]
  },
  {
    "word": "entèna",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "èvis sosyal, etidyan ayisyen ki fin etidye ki pral fè entèna. Donk, anvan sa te trè fò pou sistèm de sante a, pask"
    ]
  },
  {
    "word": "entènansyonal",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "kapab pran pa rapò avèk sa n nou resevwa, swa kòm èd entènansyonal kòm èd entènasyonal..... Donk nou espere ke vè lavni,"
    ]
  },
  {
    "word": "envestigasyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ka asosye ki nesesite ke laboratwa nasyonal ap fè yon envestigasyon pou wè èske sa an rapò avèk viris oubyen bakteri sou"
    ]
  },
  {
    "word": "estrès",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "some l, yo di sa fè yo dòmi, sa fè yo manje, sa ekate estrès pandan moman. Donk, li vin fè yo gen 2 efè lakay yo."
    ]
  },
  {
    "word": "etatize",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "chimioterapi, men li rete nan kad prive, kòm si li pa etatize nan Sid. Donk se yon trè bèl amelyorasyon, men li ret"
    ]
  },
  {
    "word": "etone",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "e m 10 mil goud pou fè sonografi nan tete a.\" Mwen te etone paske Pòtoprens se yon bagay m konnen ki ap petèt oto"
    ]
  },
  {
    "word": "evoke",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n li Pòtoprens pi fasil. E pou kesyon sekirite ou sot evoke a ki trè, trè enpòtan, mwen gen pasyan m yo Okap , pa"
    ]
  },
  {
    "word": "famasyèn",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Non pa m se Hergie Chevalier. Mwen se medsen. Mwen se famasyèn, m ap travay nan depo periferik Sid e l'Hôpital Saint"
    ]
  },
  {
    "word": "fibwòm",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "de twoub òmonal. Ça c'est la rage. Anpil kis ovaryen, fibwòm, kansè... Kansè matris la menm se pa pale. Paske gen"
    ]
  },
  {
    "word": "financé",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "Chif sa yo montre vrèman kòman sistèm piblik la sous-financé, pa paske petèt leta pa gen volonte oubyen paske yo p"
    ]
  },
  {
    "word": "fizikman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ap fè fas a yon pakèt sitiyasyon e mantalman, menm si fizikman ke yo ta rive jwenn yon medikaman. Aspè e fason sitiy"
    ]
  },
  {
    "word": "flagran",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "e bliye mansyone nan kad prive avèk piblik. Li tèlman flagran nan kad prive ak piblik, menm lè yon lopital li se mi"
    ]
  },
  {
    "word": "fortuite",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yo monte. Yo pa konnen byen avan, men se yon dekouvèt fortuite. M jwenn anpil ka kòm sa. Nan yon mwa ou ka jwenn 4 a"
    ]
  },
  {
    "word": "freres",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Woodley ki se yon psikològ k ap travay nan Nos Petits Freres Et Soeurs Haiti. M panse lè l vini n ap ba li chans p"
    ]
  },
  {
    "word": "fristran",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ki kite dè milye de pasyan ap soufri. Li revoltan, li fristran paske nou pa merite sa. Nou pa sanble ak sa, Ayisyen"
    ]
  },
  {
    "word": "galon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "è kamyon dlo ki konn ap pase a, kamyon dlo ki gen gwo galon sou tèt li ki ap pase vin vann nou dlo?\" Se yon wout"
    ]
  },
  {
    "word": "gastroenterit",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "jwenn maladi enfektyez ak tout tip nèt: dyare, mikòz, gastroenterit. Men nou vin jwenn anpil ka osi ki gen medam yo de tw"
    ]
  },
  {
    "word": "genye",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "? E san nou pa menm eseye pale de lòt difikulte ki ka genye otou de sa. Sa ka arrive menm moun kap transporte li"
    ]
  },
  {
    "word": "glike",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "mi avè l, ou jwenn li nòmal. Men lè w al fè emoglobin glike pou li, ou jwenn sik la te konn monte epi li desann."
    ]
  },
  {
    "word": "glisemi",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "un nan santi l pa byen, li vin fè konsultasyon. ou fè glisemi avè l, ou jwenn li nòmal. Men lè w al fè emoglobin gl"
    ]
  },
  {
    "word": "gradye",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ide ki vini nan tèt yon etidyan ki fenk fini, ki fenk gradye, se kite peyi a. Wow! Donk, ou pa ka mete espwa sou m"
    ]
  },
  {
    "word": "gòch",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "kirite a k ap monte, moun nan pa konn si pou l vire a gòch, si pou l vire a dwat, èske l ap ka rive kote l pral"
    ]
  },
  {
    "word": "helikoptè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "deplase pa kòmsi [unsure] moto oswa pa machin, se pa helikoptè oswa pa avyon pou y al pran swen lòt bò paske yo gen"
    ]
  },
  {
    "word": "hey",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "i luxe. Yo oblije pote l sou pòt pou yo mennen l ale. Hey, si omwen te gen yon sistèm ekonomik ki pi adapte e k"
    ]
  },
  {
    "word": "hmm",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "33.6% nan finansman sante pa yo nan yon peyi. Youri: Hmm, 33.6 %. Gerson:Yon pèp k ap viv ak mwens ke 2 dola"
    ]
  },
  {
    "word": "hospitalier",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "ti zanmi li yo. Men pito li vin mouri nan yon strikti hospitalier nan Okap ke nou tout deja konnen ki pap ka fè anyen p"
    ]
  },
  {
    "word": "hypertendu",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "ou ka jwenn 4 a 5 ka AVC kote moun nan pa t konnen l hypertendu, se pandan l ap fè AVC a li vini lopital la li konnen"
    ]
  },
  {
    "word": "imanis",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n tout moman. Donk, nou bezwen yon sistèm sante ki pi imanis, ki santre sou moun, ki santre sou dwa moun. Nou bezw"
    ]
  },
  {
    "word": "imigran",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ribisyon kategori sa a.Lòt peyi k ap vini pou rekrite imigran, donk o fil di tan, pwofesyonèl nou yo ap diminye e e"
    ]
  },
  {
    "word": "imilyan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yo jis koupe l. Mwen panse sa se yon bagay ki vrèman imilyan e sa fè ke l gen yon gwo enpak sou nou menm kòm pèp."
    ]
  },
  {
    "word": "iminitè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "de depresyon nou gen moun yo pa vrèman gen yon sistèm iminitè ki fèm, e nou jwenn grip toutan. Pa vrèman, ou pa bez"
    ]
  },
  {
    "word": "incontournable",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "ale. Donk antre Pòtoprens vin rete pafwa yon solisyon incontournable, alòske ensekirite a fè ke nou tout pè vini Pòtoprens"
    ]
  },
  {
    "word": "inekite",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "tèm nan epi ede ansanm pou nou avanse an politik kont inekite nan sante. Se yon plezi pou m avèk nou jodi a. E m ap"
    ]
  },
  {
    "word": "inkonsyan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "lan lwen, moun y ap pote a se yon moun ki deja prèskè inkonsyan oblije pote l sou pòt. M pa pale de brancard, paske s"
    ]
  },
  {
    "word": "inogiral",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Pou dyabèt la, wi, anpil ka de dyabèt, men se dyabèt inogiral yo ye, paske moun nan santi l pa byen, li vin fè kons"
    ]
  },
  {
    "word": "inosaman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "kenn dezyèm chans. Men ka ti pitit 5 an sa a ki mouri inosaman nan gwo soufrans avèk gwo lafyèv paske sistèm sante a"
    ]
  },
  {
    "word": "jantiyès",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n gen yon ti pitit sa a mwen pap janm bliye souri li, jantiyès li. Mwen panse m ap rele l Cindy pou ede nou konprann"
    ]
  },
  {
    "word": "jenetik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "i malad. Pasyan an gen anpil rezon ki fè l malad: gen jenetik etsetera. Rèv pa m se wè yon sistèm sante ayisyen kot"
    ]
  },
  {
    "word": "jewografik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "paske yo twò lwen. Èske zòn sa yo pa ekziste nan kat jewografik peyi a? Poukisa ou santi kominote sa yo lage pou kont"
    ]
  },
  {
    "word": "jimnastik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "an sa a ka soti. Donk sa se yon lòt deba e se yon lòt jimnastik pou n konprann ak detèmine chif sa a, ki li menm kapa"
    ]
  },
  {
    "word": "jinekòg",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n ekzamèn yo fasil. Tankou m t ap pale avèk yon kolèg jinekòg ki t ap di m ke lè pou yo fè Pap test pou yon pasyan"
    ]
  },
  {
    "word": "kanmenm",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "it a H Pylori. Mmen w ap jwenn yon gastrit de stress kanmenm pa rapò avèk lè moun yo manje, kalite manje y ap manj"
    ]
  },
  {
    "word": "kaptaj",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      ". Gen kèk zòn ki toujou gen sous, men se de sous kote kaptaj dlo yo pa byen fèt vrèman. Pafwa nan menm rivyè kote"
    ]
  },
  {
    "word": "katastwofik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "vin pi mal? Lè n ap gade, sa nou deja dekri la a trè katastwofik. Kisa n panse, èske sitiyasyon an ka pi mal ke sa n a"
    ]
  },
  {
    "word": "keksyonnen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "sistèm nan, gout dlo ke yo ye nan vè a, nou toujou ap keksyonnen tèt nou: kisa k posib? Paske nou menm nou pral de mal"
    ]
  },
  {
    "word": "kilomèt",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "onsantre sèlman Pòtoprens, e se si moun nan ap bat de kilomèt avan pou li resi jwenn yon lopital petèt ki kapab res"
    ]
  },
  {
    "word": "kis",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "gen medam yo de twoub òmonal. Ça c'est la rage. Anpil kis ovaryen, fibwòm, kansè... Kansè matris la menm se pa"
    ]
  },
  {
    "word": "km",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "epi yon kote sèvis yo disponib, menm si l ap mache 45 km pou li ale la, li prale paske li konnen gen yon sèvis"
    ]
  },
  {
    "word": "kolonyalizasyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "on moun sa yo kreye lakay nou yon depandans, deja nan kolonyalizasyon an, answit nan neyokolonyalizasyon an, fason se yon d"
    ]
  },
  {
    "word": "kolòn",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "adyograyfi, e yo te wè ke li pa gen okenn pwoblèm nan kolòn vètebral, jenou yo an fòm etsetera. E se lè sa a m vi"
    ]
  },
  {
    "word": "konfòtab",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "sa yo p ap janm sispann peze kou nou paske yo menm yo konfòtab nan sa y ap fè a. Se konsa yo fè richès yo pou yo kap"
    ]
  },
  {
    "word": "konpanse",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nèl yo pa vrèman disponib e ke sa ki genyen an oblije konpanse l pou kapab fè sèvis yo mache. An tèm de pwofesyonèl"
    ]
  },
  {
    "word": "konpanyen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nou pa kapab kontinye kite yo kolonize nou oswa pwòp konpanyen nou, nou ap toujou tonbe nan menm ka sa a. Paske aprè"
    ]
  },
  {
    "word": "konsultasyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "iral yo ye, paske moun nan santi l pa byen, li vin fè konsultasyon. ou fè glisemi avè l, ou jwenn li nòmal. Men lè w al"
    ]
  },
  {
    "word": "kontreferans",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "on sistèm sante ki defaillant. Se paske referans avèk kontreferans isit an Ayiti rete yon mit. Lè ou voye pasyan bay chi"
    ]
  },
  {
    "word": "korekteman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ki byen fonde pou moun sa yo, pou akonpaye moun sa yo korekteman.Ya, mwen panse ou di yon pakèt bagay, yon pakèt bagay"
    ]
  },
  {
    "word": "krache",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "hache pen de ledikasyon. Donk ou wè de moun ki ap jis krache konsa sou diyite pèp la, ki ap trete nou tankou yon p"
    ]
  },
  {
    "word": "kwaye",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "konfyans? Selon eksperyans pa nou sou teren, lè n ap kwaye moun yo oswa lè n ap wè moun yo nan klinik. Èske nou"
    ]
  },
  {
    "word": "kwi",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "jan an kreyòl nou di: se grès kochon an ki ta sipoze kwi de kochon an. Men kounye a la, pou kochon an gen grès"
    ]
  },
  {
    "word": "kòmande",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "zi.Mwen te vle jis ajoute ke fason entènasyonal la ap kòmande an Ayiti, si nou pa pran desizyon pou nou di nou menm"
    ]
  },
  {
    "word": "lafyèv",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "5 an sa a ki mouri inosaman nan gwo soufrans avèk gwo lafyèv paske sistèm sante a twò fèb, sistèm sante a pa t pra"
    ]
  },
  {
    "word": "lespwa",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "fèmen seyans lan, e m panse ki kapab pote yon ti kras lespwa tou, se: kisa ki vizyon nou pou yon pi bon sistèm san"
    ]
  },
  {
    "word": "liks",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "sante ayisyen kote ke sante se yon dwa, sante pa yon liks, sante pa yon chans ke: \"Oh, mwen t al lopital jodi a"
    ]
  },
  {
    "word": "luxe",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "pòt. M pa pale de brancard, paske sa se yon bagay ki luxe. Yo oblije pote l sou pòt pou yo mennen l ale. Hey, s"
    ]
  },
  {
    "word": "lès",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ay la kouman sa ye jounen jodi a? Okay, jis di nou ki lès ou ye rapidman epi petèt ban nou yon ti eta de lye na"
    ]
  },
  {
    "word": "l’epòk",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "en ki ka opere tèt se Pòtoprens sa chita. E m sonje a l'epòk, mwen te gen kolèg nan lopital Mirebalais ke m te kon"
    ]
  },
  {
    "word": "l’extérieur",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "i li menm kapab evalye entre 56.7% donc qui sortit de l'extérieur pour aider un système. Et c'est là encore qu'on va co"
    ]
  },
  {
    "word": "makro",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yen ki fèt vreman. M ap tounen ansanm avèk nou o nivo makro sistèm nan an antye, sou etidyan ayisyen. Lè w ap gad"
    ]
  },
  {
    "word": "maksimum",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "i ap petèt otou de 4 mil goud, 5 mil goud, 6 mil goud maksimum. Donk, an pwovens, non sèlman ou pa jwenn ekzamèn yo"
    ]
  },
  {
    "word": "maximen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "r! Epi kòm dènye moun ki pral gen pou l jwenn nou, se Maximen Woodley ki se yon psikològ k ap travay nan Nos Petits"
    ]
  },
  {
    "word": "maximien",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "wen gen Gerson Moras. Nou gen Johane Josema e nou gen Maximien Woodley ki ap gen pou l jwenn nou yon ti kras pi ta p"
    ]
  },
  {
    "word": "meen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ive ak piblik, menm lè yon lopital li se miks. Anndan meen lopital ki se miks, ki swa ONG epi Leta an menm tan,"
    ]
  },
  {
    "word": "mekanis",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      ". Mèsi Youri. M panse, jan ou di a, yon sistèm se yon mekanis ki genyen plizyè entite k ap travay e pou l fini ap b"
    ]
  },
  {
    "word": "mevs",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "i te ap pi fasil pou transfere li nan lopital Bernard Mevs ki gen nerochirijyen ki ta ka wè timoun nan epi plani"
    ]
  },
  {
    "word": "mhm",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "te e ka reponn, petèt ke wout la t ap fèt.... Youri: Mhm. Yeah, si m byen konprann, Gerson... Gerson: Gen mou"
    ]
  },
  {
    "word": "mikòz",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Nou ka jwenn maladi enfektyez ak tout tip nèt: dyare, mikòz, gastroenterit. Men nou vin jwenn anpil ka osi ki gen"
    ]
  },
  {
    "word": "milite",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "fòme nouvo pwofesyonèl nan syans sante an Ayiti. Mwen milite nan mouvman sa a nan domèn sante a depi 2006 e se kon"
    ]
  },
  {
    "word": "minim",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yiti pou yo pote kontribisyon pa yo. Men lè n ap gade minim ke yo reprezante nan sistèm nan, gout dlo ke yo ye na"
    ]
  },
  {
    "word": "mmen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "aj, tout moun ou ka jwenn gen yon gastrit a H Pylori. Mmen w ap jwenn yon gastrit de stress kanmenm pa rapò avè"
    ]
  },
  {
    "word": "motivasyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ki gen plizyè ane d'ekzistans deja, ou sipoze gen yon motivasyon, ou sipoze gen yon objektif ki pèsonèl. Donk lè li pè"
    ]
  },
  {
    "word": "mèm",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "sib e disponib. E sa pral fè ke anndan chak depatman, mèm sa yo pral jenere resous kominote sa yo pou devlopman"
    ]
  },
  {
    "word": "negosye",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pèsonèl, lè w antre anndan l ou ap gade kouman pou w negosye, pou w fè politik pou etabli yon sistèm ki fèm. E vol"
    ]
  },
  {
    "word": "neyokolonyalizasyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "on depandans, deja nan kolonyalizasyon an, answit nan neyokolonyalizasyon an, fason se yon depans ke yo kreye, fason yo rantre"
    ]
  },
  {
    "word": "nuance",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "s yo, nan prive, li vrèman elve. Nan Leta, gen yon ti nuance kote yo di Leta a li pa chè paske nou rele l Leta. Me"
    ]
  },
  {
    "word": "oditwa",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yo trè grand, men m ap eseye rezime li yon fason pou oditwa lan kapab konprann byen. Nou pral nan staff administr"
    ]
  },
  {
    "word": "oh",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "e yon dwa, sante pa yon liks, sante pa yon chans ke: \"Oh, mwen t al lopital jodi a mwen te gen chans mwen jwen"
    ]
  },
  {
    "word": "oms",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "konsa kote ke sante, selon rapò UNESCO ak selon rapò OMS te pibliye, yo di ke menaj yo, yo menm yo responsab 3"
    ]
  },
  {
    "word": "onkoloji",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pa aksesib avèk tout moun. Yon egzanp: patenarya Sant Onkoloji Saint-François de Sales ki vin disponib nan Sid kouny"
    ]
  },
  {
    "word": "ospitalyè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yo pran kòm rezidan pou pedyatri, nou pa gen rezidans ospitalyè an Ayiti pou moun ki fini yo. Donk, premye lide ki vi"
    ]
  },
  {
    "word": "ovaryen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "medam yo de twoub òmonal. Ça c'est la rage. Anpil kis ovaryen, fibwòm, kansè... Kansè matris la menm se pa pale. Pa"
    ]
  },
  {
    "word": "pano",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nt ki trè lan. Gen enstitisyon ki gen yon enstalasyon pano solè disponib sou yo, men yo pa ka fonksyone tout apa"
    ]
  },
  {
    "word": "pansman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "montre lòt timoun bò lakay li yo tib ke li te genyen, pansman li yo. Lòt frè avèk sè li yo t ap antoure l, yo t ap"
    ]
  },
  {
    "word": "parpò",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "a, w ap wè totalman apwòch yo menm pèsonèl yo diferan parpò nan kad entèvansyon yo. Wi, se jis ti pwen sa mwen te"
    ]
  },
  {
    "word": "parpòta",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "kantite moun ki genyen k ap viv menm sitiyasyon sa a parpòta ak distans ki redwi ant yo menm avèk kote ki yo ta si"
    ]
  },
  {
    "word": "pasan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "manje aprè m fin pran medikaman, e kisa m pral fè?An pasan, mwen se nan pwogram VIH sa a, e nou travay nan lopit"
    ]
  },
  {
    "word": "patients",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Saint-Damien [unsure]. E la, akote ke la majorite des patients, se de pasyan ki nan zòn deplase e majorite de pasyan"
    ]
  },
  {
    "word": "payrolls",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ponibilité des soins, en termes du retard, sou kesyon payrolls personnes anndan sistèm nan ki fè gen tout disparité"
    ]
  },
  {
    "word": "pedyatri",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "akilte medsin lan. Wow! Kòmsi yo pran kòm rezidan pou pedyatri, nou pa gen rezidans ospitalyè an Ayiti pou moun ki f"
    ]
  },
  {
    "word": "periferik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "wen se medsen. Mwen se famasyèn, m ap travay nan depo periferik Sid e l'Hôpital Sainte-Anne Camp-Perrin. Se yon plezi"
    ]
  },
  {
    "word": "perrin",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "y nan depo periferik Sid e l'Hôpital Sainte-Anne Camp-Perrin. Se yon plezi pou m avèk nou jodi a. Youri:Bon bagay"
    ]
  },
  {
    "word": "petits",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "aximen Woodley ki se yon psikològ k ap travay nan Nos Petits Freres Et Soeurs Haiti. M panse lè l vini n ap ba li"
    ]
  },
  {
    "word": "pire",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "u enstitisyon kote mwen ye a, sa ka toujou, sa ka vin pire ke moun yo ap vini jwenn mwen sitou nan espas kote mw"
    ]
  },
  {
    "word": "pis",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nou: kisa k posib? Paske nou menm nou pral de mal an pis, an depi de tout fòs sa yo jwenn sa yo ap fè. Prèske"
    ]
  },
  {
    "word": "postule",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ounye a w ap jwenn avèk redi pou jwenn san etidyan ki postule pou ale nan konkour pou rantre nan fakilte medsin lan"
    ]
  },
  {
    "word": "pouke",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ukisa ou santi kominote sa yo lage pou kont yo konsa? Pouke ou santi ke se vrèman yo menm k ap debouye yo pou yo"
    ]
  },
  {
    "word": "primordial",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Ayiti, nou konnen se byennèt moun yo, se yon bagay ki primordial. Sante pa mache san byennèt, ke se swa sante fizik, k"
    ]
  },
  {
    "word": "prism",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n rasire yo ke yo ekri yon atik sou sa ki pibliye nan PRISM. Nou panse n ap eseye mete lyen atik la nan resous an"
    ]
  },
  {
    "word": "privée",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "stème. Et c'est là encore qu'on va comprendre réalité privée avec publique, kisa ki fè gen tout disparité sa en te"
    ]
  },
  {
    "word": "prè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "nou chanje yon bagay, e m pa sèten gen ase de moun ki prè pou fè sa, paske petèt gen de moun tou nou pa bezwen"
    ]
  },
  {
    "word": "psikolojik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "moun ki te deja afekte, e sa konn pote yon pakèt pwa psikolojik pou moun sa yo.E malerezman, sitou nan sistèm sante a"
    ]
  },
  {
    "word": "pwisan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "============================ Paske yo menm, yo tèlman pwisan, yo tèlman enpòtan, yo pa deplase pa kòmsi [unsure] m"
    ]
  },
  {
    "word": "pwoblèmatik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "i, Kanpay Kont Rasis lan, avèk gwoup ki ap travay sou pwoblèmatik Ayiti yo andan Kanpay kont Rasis lan te vrèman rasire"
    ]
  },
  {
    "word": "pwochenn",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "plezi pou nou pote l avèk yo. Mèsi tout moun, e a la pwochenn!"
    ]
  },
  {
    "word": "pwodige",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n yo kouman sistèm nan fonksyone, gade kouman swen yo pwodige, swen yo bay an Ayiti. E kòm Hergie, ou menm w ap tra"
    ]
  },
  {
    "word": "pwodwi",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ap jwenn ti jèn yo lage yo nan yon dekoksyon e kòm si pwodwi natirèl ki se dròg vrèman. Bon dròg la yo mete li nan"
    ]
  },
  {
    "word": "pwofon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "npil refleksyon, anpil refleksyon e yon refleksyon ki pwofon. Paske an depi de tou sa nou sujere la a kòm pwoblèm,"
    ]
  },
  {
    "word": "pylori",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ran la raj, tout moun ou ka jwenn gen yon gastrit a H Pylori. Mmen w ap jwenn yon gastrit de stress kanmenm pa ra"
    ]
  },
  {
    "word": "pèsonèlman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "li mande yon volonte pèsonèl e yon volonte kolektif. Pèsonèlman, lè w ap rantre nan yon sistèm ki deja bwate, ki gen"
    ]
  },
  {
    "word": "qu’on",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "l'extérieur pour aider un système. Et c'est là encore qu'on va comprendre réalité privée avec publique, kisa ki f"
    ]
  },
  {
    "word": "radyograyfi",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "wivi yo te deja fè nan yon lòt lopital ki te ba yo fè radyograyfi, e yo te wè ke li pa gen okenn pwoblèm nan kolòn vète"
    ]
  },
  {
    "word": "rage",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "l ka osi ki gen medam yo de twoub òmonal. Ça c'est la rage. Anpil kis ovaryen, fibwòm, kansè... Kansè matris la"
    ]
  },
  {
    "word": "raj",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ut moun gen pwoblèm lestomak, Alimantasyon an pran la raj, tout moun ou ka jwenn gen yon gastrit a H Pylori. Mm"
    ]
  },
  {
    "word": "rasandleman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ki pi vilnerab yo. Nou gen diferans sit de pwen de de rasandleman kote ke nou rankontre pasyan yo. Reyalite a se ke gen"
    ]
  },
  {
    "word": "rasire",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "èmatik Ayiti yo andan Kanpay kont Rasis lan te vrèman rasire yo ke yo ekri yon atik sou sa ki pibliye nan PRISM. N"
    ]
  },
  {
    "word": "rebouche",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.32,
    "source": "contains_less_common_creole_letters",
    "preferredVariant": "",
    "contexts": [
      "sispann enjere yo nan politik peyi a, sispann fòse n rebouche nan zafè nou, sispann peze kou nou, epi n ap sezi wè"
    ]
  },
  {
    "word": "refè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "eyò pou kont nou jan nou te rive fè l deja, nou kapab refè l ankò. Mèsi anpil, Dok. Mèsi anpil, Johane. Mwen men"
    ]
  },
  {
    "word": "rekile",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yonèl k ap travay, kit li Pòtoprens, kit li nan milye rekile an Ayiti, ke w ta poze kesyon sa a: èske yo gen yon k"
    ]
  },
  {
    "word": "rekònèt",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      ", jan Gerson di a, fòk tout lòt sistèm yo manyen tou. Rekònèt enpak kolonyalis la ak dèt nou te genyen yo, pou ineg"
    ]
  },
  {
    "word": "relate",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ke an depi de tou sa nou sujere la a kòm pwoblèm, nou relate la a kòm pwoblèm.Militan, swa politik etranjè, yo vin"
    ]
  },
  {
    "word": "renal",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "plis ka dyabèt, plis ka ipertansyon, plis ka pwoblèm renal etsetera? Hergie, vas-y. Hergie:Mèsi Youri. An fèt, p"
    ]
  },
  {
    "word": "repriz",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ki te bezwen fè yon sonografi nan tete paske a plizyè repriz li t ap pale m de yon doulè li gen nan tete. Mwen ba"
    ]
  },
  {
    "word": "resamman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "tan pou nou pale de sa tou, e m panse n te okouran ke resamman peyi Etazini koupe anpil èd, sitou sou koze finansman"
    ]
  },
  {
    "word": "resèt",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pman yo, yon richès pou pèmèt ke yo kapab reponn avèk resèt fiskal Leta. Kote ke Leta li menm li pral kapab gen a"
    ]
  },
  {
    "word": "retard",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n, en termes de disponibilité des soins, en termes du retard, sou kesyon payrolls personnes anndan sistèm nan ki"
    ]
  },
  {
    "word": "retisans",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "un nan epi planifye operasyon an. Papa a te gen anpil retisans akoz de ensekirite Pòtoprens, men se avyon ke li te v"
    ]
  },
  {
    "word": "revoltan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pandans, epi ki kite dè milye de pasyan ap soufri. Li revoltan, li fristran paske nou pa merite sa. Nou pa sanble ak"
    ]
  },
  {
    "word": "rezidan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "rantre nan fakilte medsin lan. Wow! Kòmsi yo pran kòm rezidan pou pedyatri, nou pa gen rezidans ospitalyè an Ayiti"
    ]
  },
  {
    "word": "rezilyan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "merite sa. Nou pa sanble ak sa, Ayisyen se yon pèp ki rezilyan, se yon pèp ki kwè nan travay di, se yon pèp ki kwè n"
    ]
  },
  {
    "word": "rezilyen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "èd nou! Paske nou se yon pèp ki fò, nou se yon pèp ki rezilyen, nou kapab travay pou nou bay tèt nou manje. Yo jis s"
    ]
  },
  {
    "word": "rezinyasyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "èt nou ladan l, paske gen diferans ant rezilyans avèk rezinyasyon, e anpil fwa nou plis rezinyen nou ke nou batay pou n"
    ]
  },
  {
    "word": "rezinyen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ant rezilyans avèk rezinyasyon, e anpil fwa nou plis rezinyen nou ke nou batay pou n chanje sistèm nan oubyen amely"
    ]
  },
  {
    "word": "sainte",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "asyèn, m ap travay nan depo periferik Sid e l'Hôpital Sainte-Anne Camp-Perrin. Se yon plezi pou m avèk nou jodi a."
    ]
  },
  {
    "word": "sales",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "Yon egzanp: patenarya Sant Onkoloji Saint-François de Sales ki vin disponib nan Sid kounye a pou moun ki ap devlo"
    ]
  },
  {
    "word": "sekrè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n otomatikman yo pa vle moun konnen. Medikaman se yon sekrè. Nou konnen sitou an Ayiti ak VIH se yon bagay ki sti"
    ]
  },
  {
    "word": "sezon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "u jwenn grip toutan. Pa vrèman, ou pa bezwen tann yon sezon pou w jwenn yon epidemi grip, men tout pandan tout pe"
    ]
  },
  {
    "word": "sezonyen",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "m tonbe tou sou grip la, nou te toujou konn gen grip sezonyen yo, men dènye tan sa yo, mwen sispèk pa rapò avèk anp"
    ]
  },
  {
    "word": "sibveni",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "u wè kouman lè moun nan nan yon sitiyasyon kijan w ka sibveni a bezwen li. E malerezman li pa fòseman sa, moun nan"
    ]
  },
  {
    "word": "sispèk",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "konn gen grip sezonyen yo, men dènye tan sa yo, mwen sispèk pa rapò avèk anpil ka de depresyon nou gen moun yo pa"
    ]
  },
  {
    "word": "soeurs",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "se yon psikològ k ap travay nan Nos Petits Freres Et Soeurs Haiti. M panse lè l vini n ap ba li chans pou li entw"
    ]
  },
  {
    "word": "soins",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "termes d'intervention, en termes de disponibilité des soins, en termes du retard, sou kesyon payrolls personnes a"
    ]
  },
  {
    "word": "solè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "trè lan. Gen enstitisyon ki gen yon enstalasyon pano solè disponib sou yo, men yo pa ka fonksyone tout aparèy y"
    ]
  },
  {
    "word": "sortit",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "if sa a, ki li menm kapab evalye entre 56.7% donc qui sortit de l'extérieur pour aider un système. Et c'est là enc"
    ]
  },
  {
    "word": "soufrans",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      ". Men ka ti pitit 5 an sa a ki mouri inosaman nan gwo soufrans avèk gwo lafyèv paske sistèm sante a twò fèb, sistèm"
    ]
  },
  {
    "word": "sovgade",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "izan k ap plante yo, kreye yon sistèm ki kapab o mwen sovgade sa nou fè kòm danre yo, kreye yon sistèm ki kapab fas"
    ]
  },
  {
    "word": "sovè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "pandan anpil ane. Epi kounye a la yo retounen sou fòm sovè pou yo pote yon ti kras èd ban nou de tanzantan sou d"
    ]
  },
  {
    "word": "stigmatize",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "krè. Nou konnen sitou an Ayiti ak VIH se yon bagay ki stigmatize. Lè w soti nan yon sitiyasyon konsa pou l ap pran med"
    ]
  },
  {
    "word": "stress",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n gastrit a H Pylori. Mmen w ap jwenn yon gastrit de stress kanmenm pa rapò avèk lè moun yo manje, kalite manje y"
    ]
  },
  {
    "word": "striktiral",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "kolonyalis la ak dèt nou te genyen yo, pou inegalite striktiral ki genyen yo, fòk tout sa yo nou kapab remanye yo. Fò"
    ]
  },
  {
    "word": "stroke",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "la li konnen ke se tansyon li te fè l, epi li fè yon stroke mete l sou li. Pou dyabèt la, wi, anpil ka de dyabèt,"
    ]
  },
  {
    "word": "sujere",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yon refleksyon ki pwofon. Paske an depi de tou sa nou sujere la a kòm pwoblèm, nou relate la a kòm pwoblèm.Militan"
    ]
  },
  {
    "word": "super",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "u m kapab diskite, analize ansanm. Mèsi anpil. Youri: Super! Epi kòm dènye moun ki pral gen pou l jwenn nou, se M"
    ]
  },
  {
    "word": "suplimantasyon",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n, paran pou tèt pa l, ou wè se yon moun ki bezwen de suplimantasyon alimantè tou. Se yon rezon ki fè ke nou t vin gen yon"
    ]
  },
  {
    "word": "sòf",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "l. Donk, li vin peye menm kòb ak si l t al nan prive, sòf ke nan prive li pral peye chanm, parkont nan Leta li"
    ]
  },
  {
    "word": "tib",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ogrè li yo. Li te ap montre lòt timoun bò lakay li yo tib ke li te genyen, pansman li yo. Lòt frè avèk sè li yo"
    ]
  },
  {
    "word": "tifoyid",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "egzanp, tankou lè m gen yon ti moun ki fè yon maladi tifoyid e ke m di paran an tanpri fòk ou ba li dlo trete,\" ep"
    ]
  },
  {
    "word": "toksikomani",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "sa te frape nou, sa te frape nou. Lè l te pale nou de toksikomani tou, sa te frape nou nan tèt pa nou, nou pa t ap janm"
    ]
  },
  {
    "word": "toksikomanik",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "gwo se sa. Sa m te dwe mansyone tou se yon pil ka de toksikomanik kay jèn yo. Yo pa vrèman vini lopital, men lè w al fè"
    ]
  },
  {
    "word": "totalman",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "menm espas sa a. Paske jan Hergie esplike la, w ap wè totalman apwòch yo menm pèsonèl yo diferan parpò nan kad entèv"
    ]
  },
  {
    "word": "toutan",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "rèman gen yon sistèm iminitè ki fèm, e nou jwenn grip toutan. Pa vrèman, ou pa bezwen tann yon sezon pou w jwenn y"
    ]
  },
  {
    "word": "toutfwa",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "konomik, gen ladan yo ki te ka petèt peye yon moto si toutfwa li pa pi grav ke sa pou l mennen l pou l jwenn swen."
    ]
  },
  {
    "word": "transporte",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "te ki ka genye otou de sa. Sa ka arrive menm moun kap transporte li yo, menm yo menm, yo rive nan wout yo tonbe tou. P"
    ]
  },
  {
    "word": "twoub",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "it. Men nou vin jwenn anpil ka osi ki gen medam yo de twoub òmonal. Ça c'est la rage. Anpil kis ovaryen, fibwòm,"
    ]
  },
  {
    "word": "tête",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "hè nan Okap avèk disponiblite tou ki se yon lòt casse-tête, fè ke skanè a pa t janm rive fèt. Enstitisyon ki m a"
    ]
  },
  {
    "word": "vient",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "moun ki vrèman rete nan Nò, k ap travay, ki fè va et vient nan Nò ak nan Lwès, èske ou ka di nou ki diferans ou"
    ]
  },
  {
    "word": "viris",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "l ap fè yon envestigasyon pou wè èske sa an rapò avèk viris oubyen bakteri sou teren, ki tip de fyèv li ye etsete"
    ]
  },
  {
    "word": "vomi",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "jou vant fè mal, se toujou: \"Dok, ti pitit mwen an ap vomi depi 3 jou.\" Se toujou menm bagay yo. Men mwen oblij"
    ]
  },
  {
    "word": "vs",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "m riral ak yon sistèm iben an? Part 3: Reyalite Riral vs Iben: Istwa Sindi Johane:Mèsi Youri pou kesyon sa a."
    ]
  },
  {
    "word": "vyole",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "wout yo vle. E lè yo antre nan yon zòn, yo touye, yo vyole, yo detwi, yo boule kay, yo touye moun. Yo rekrite pi"
    ]
  },
  {
    "word": "vyòl",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n sitiyasyon kote yo nan kan deplase yo, yo viktim de vyòl, malerezman. Si se yon moun ki te deja afekte, e sa k"
    ]
  },
  {
    "word": "vètebral",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "ayfi, e yo te wè ke li pa gen okenn pwoblèm nan kolòn vètebral, jenou yo an fòm etsetera. E se lè sa a m vin plus ou"
    ]
  },
  {
    "word": "vòlè",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "yon depans ke yo kreye, fason yo rantre lakay nou, yo vòlè resous nou, yo itilize nou, yo eksplwate nou pandan a"
    ]
  },
  {
    "word": "ya",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "de pou moun sa yo, pou akonpaye moun sa yo korekteman.Ya, mwen panse ou di yon pakèt bagay, yon pakèt bagay ki"
    ]
  },
  {
    "word": "ça",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n jwenn anpil ka osi ki gen medam yo de twoub òmonal. Ça c'est la rage. Anpil kis ovaryen, fibwòm, kansè... Ka"
    ]
  },
  {
    "word": "òmonal",
    "count": 1,
    "confidence": "low",
    "confidenceScore": 0.4,
    "source": "single_or_low_evidence_unapproved",
    "preferredVariant": "",
    "contexts": [
      "n nou vin jwenn anpil ka osi ki gen medam yo de twoub òmonal. Ça c'est la rage. Anpil kis ovaryen, fibwòm, kansè.."
    ]
  }
];
