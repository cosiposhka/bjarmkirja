const DB = {
  translations: {
    ru: {
      siteName: "Bjarmkirja",
      tagline: "Финно-угорская библиотека",
      home: "Главная",
      featured: "Избранное",
      articles: "Статьи",
      gallery: "Галерея",
      books: "Книги",
      search: "Поиск",
      categories: "Категории",
      download: "Скачать",
      read: "Читать",
      readOnline: "Читать онлайн",
      view: "Смотреть",
      back: "← Назад",
      all: "Все",
      folklore: "Фольклор",
      predanie: "Предания",
      fairy_tales: "Сказки",
      history: "История",
      culture: "Культура",
      art: "Искусство",
      noResults: "Ничего не найдено",
      selectCategory: "Выберите категорию",
      language: "Язык",
      contentLang: "Язык контента",
      author: "Автор",
      category: "Категория",
      description: "Описание",
      close: "Закрыть",
      openInBrowser: "Открыть в браузере",
      selectVersion: "Выберите версию",
      aiTranslated: "Переведено с помощью ИИ",
      catalogBooks: "Каталог книг",
      catalogArticles: "Каталог статей",
      komi: "Народ коми"
    },
    fi: {
      siteName: "Bjarmkirja",
      tagline: "Suomalais-ugrilainen kirjasto",
      home: "Etusivu",
      featured: "Suositellut",
      articles: "Artikkelit",
      gallery: "Galleria",
      books: "Kirjat",
      search: "Haku",
      categories: "Kategoriat",
      download: "Lataa",
      read: "Lue",
      readOnline: "Lue verkossa",
      view: "Katso",
      back: "← Takaisin",
      all: "Kaikki",
      folklore: "Kansanperinne",
      predanie: "Perinteet",
      fairy_tales: "Sadut",
      history: "Historia",
      culture: "Kulttuuri",
      art: "Taide",
      noResults: "Ei tuloksia",
      selectCategory: "Valitse kategoria",
      language: "Kieli",
      contentLang: "Sisällön kieli",
      author: "Tekijä",
      category: "Kategoria",
      description: "Kuvaus",
      close: "Sulje",
      openInBrowser: "Avaa selaimessa",
      selectVersion: "Valitse versio",
      aiTranslated: "Käännetty tekoälyn avulla",
      catalogBooks: "Kirjaluettelo",
      catalogArticles: "Artikkeliluettelo",
      komi: "Komin kansa"
    },
    en: {
      siteName: "Bjarmkirja",
      tagline: "Finno-Ugric Library",
      home: "Home",
      featured: "Featured",
      articles: "Articles",
      gallery: "Gallery",
      books: "Books",
      search: "Search",
      categories: "Categories",
      download: "Download",
      read: "Read",
      readOnline: "Read online",
      view: "View",
      back: "← Back",
      all: "All",
      folklore: "Folklore",
      predanie: "Legends",
      fairy_tales: "Fairy Tales",
      history: "History",
      culture: "Culture",
      art: "Art",
      noResults: "No results found",
      selectCategory: "Select category",
      language: "Language",
      contentLang: "Content language",
      author: "Author",
      category: "Category",
      description: "Description",
      close: "Close",
      openInBrowser: "Open in browser",
      selectVersion: "Select version",
      aiTranslated: "Translated with AI",
      catalogBooks: "Book Catalog",
      catalogArticles: "Article Catalog",
      komi: "Komi people"
    },
    et: {
      siteName: "Bjarmkirja",
      tagline: "Soome-ugri raamatukogu",
      home: "Avaleht",
      featured: "Esiletõstetud",
      articles: "Artiklid",
      gallery: "Galerii",
      books: "Raamatud",
      search: "Otsing",
      categories: "Kategooriad",
      download: "Lae alla",
      read: "Loe",
      readOnline: "Loe veebis",
      view: "Vaata",
      back: "← Tagasi",
      all: "Kõik",
      folklore: "Rahvaluule",
      predanie: "Legendid",
      fairy_tales: "Muinasjutud",
      history: "Ajalugu",
      culture: "Kultuur",
      art: "Kunst",
      noResults: "Tulemusi ei leitud",
      selectCategory: "Vali kategooria",
      language: "Keel",
      contentLang: "Sisu keel",
      author: "Autor",
      category: "Kategooria",
      description: "Kirjeldus",
      close: "Sulge",
      openInBrowser: "Ava brauseris",
      selectVersion: "Vali versioon",
      aiTranslated: "Tõlgitud tehisintellekti abil",
      catalogBooks: "Raamatukataloog",
      catalogArticles: "Artiklikataloog",
      komi: "Komi rahvas"
    }
  },

  categories: [
    { id: "all", icon: "◈" },
    { id: "folklore", icon: "✦" },
    { id: "predanie", icon: "✶" },
    { id: "fairy_tales", icon: "✴" },
    { id: "history", icon: "◉" },
    { id: "culture", icon: "❋" },
    { id: "art", icon: "✻" }
  ],

  books: [
    {
      id: "tsar-kor",
      type: "book",
      title: {
        ru: "Царь Коръ",
        fi: "Tsar Kor",
        en: "Tsar Kor",
        et: "Tsar Kor"
      },
      author: { ru: "К. Ф. Жаков", fi: "K. F. Zhakov", en: "K. F. Zhakov", et: "K. F. Zhakov" },
      category: "predanie",
      files: {
        ru: "books/tsar-kor.pdf",
        en: "books/tsar-korEN.pdf"
      },
      cover: "images/kor.jpg",
      description: {
        ru: "Древнее предание народа коми о могущественном царе Коре, правившем в северных землях.",
        fi: "Komin kansan muinainen perinne mahtavasta Tsar Korista.",
        en: "Ancient legend of the Komi people about the mighty Tsar Kor.",
        et: "Komi rahva muistne legend võimsast Tsar Korist."
      },
      featured: true,
      contentLang: ["ru", "en"],
      date: "2024-01-15",
      isAITranslated: true
    },
    {
      id: "biarmia",
      type: "book",
      title: {
        ru: "Биармия",
        fi: "Biarmia",
        en: "Biarmia",
        et: "Biarmia"
      },
      author: { ru: "К. Ф. Жаков", fi: "K. F. Zhakov", en: "K. F. Zhakov", et: "K. F. Zhakov" },
      category: "history",
      files: { ru: "books/Biarmiia - Kallistrat Falalieievich Zhakov.pdf" },
      cover: "images/biarmia.jpg",
      description: {
        ru: "Исследование древней Биармии — исторической области на севере Европы, населённой финно-угорскими племенами.",
        fi: "Tutkimus muinaisesta Biarmiasta.",
        en: "Study of ancient Biarmia — a historical region in Northern Europe inhabited by Finno-Ugric tribes.",
        et: "Uuring muistsest Biarmiast."
      },
      featured: true,
      contentLang: ["ru"],
      date: "2024-03-20"
    },
    {
      id: "nasever",
      type: "book",
      title: {
        ru: "На северъ въ поискахъ Памомъ Буръ-Мортомъ",
        fi: "Pohjoiseen etsimässä Pam Bur-Mortia",
        en: "To the North in Search of Pam Bur-Mort",
        et: "Põhja poole Pam Bur-Morti otsimas"
      },
      author: { ru: "К. Ф. Жаков", fi: "K. F. Zhakov", en: "K. F. Zhakov", et: "K. F. Zhakov" },
      category: "history",
      files: { ru: "books/nasever.pdf" },
      cover: "images/nasever.jpg",
      description: {
        ru: "Путешествие на север в поисках Памом Бур-Мортом.",
        fi: "Matka pohjoiseen Pam Bur-Mortin etsinnässä.",
        en: "Journey to the north in search of Pam Bur-Mort.",
        et: "Reis põhja poole Pam Bur-Morti otsimisel."
      },
      featured: true,
      contentLang: ["ru"],
      date: "2024-06-10"
    },
    {
      id: "uivemskih",
      type: "book",
      title: {
        ru: "У инвенских пермяков Бирюк Соликам уезда",
        fi: "Inven permjakkojen Birjuk Solikamin piiristä",
        en: "Biryuk of the Inva Permians of Solikamsk District",
        et: "Inva permjakkide Birjuk Solikamski rajoonist"
      },
      author: { ru: "К. Ф. Жаков", fi: "K. F. Zhakov", en: "K. F. Zhakov", et: "K. F. Zhakov" },
      category: "history",
      files: { ru: "books/uivemskih.pdf" },
      cover: "images/uivemskihpermjakov.jpg",
      description: {
        ru: "Исследование о Бирюке у инвенских пермяков Соликамского уезда.",
        fi: "Tutkimus Birjukista Inven permjakkojen keskuudessa Solikamin piirissä.",
        en: "Study of Biryuk among the Inva Permians of Solikamsk District.",
        et: "Uuring Birjukist Inva permjakkide seas Solikamski rajoonis."
      },
      featured: false,
      contentLang: ["ru"],
      date: "2024-07-01"
    },
    {
      id: "podshum",
      type: "book",
      title: {
        ru: "Под шум северного ветра",
        fi: "Pohjoisen tuulen huminan alla",
        en: "Under the Howl of the Northern Wind",
        et: "Põhjatuule kohina all"
      },
      author: { ru: "К. Ф. Жаков", fi: "K. F. Zhakov", en: "K. F. Zhakov", et: "K. F. Zhakov" },
      category: "folklore",
      files: { ru: "books/podshumsevernogovetra.pdf" },
      cover: "images/podshumsevernogovetra.jpg",
      description: {
        ru: "Сборник произведений под шум северного ветра.",
        fi: "Kokoelma teoksia pohjoisen tuulen huminan alla.",
        en: "Collection of works under the howl of the northern wind.",
        et: "Teoste kogumik põhjatuule kohina all."
      },
      featured: false,
      contentLang: ["ru"],
      date: "2024-07-15"
    },
    {
      id: "mudripam",
      type: "book",
      title: {
        ru: "Мудрый Пам",
        fi: "Viisas Pam",
        en: "Wise Pam",
        et: "Tark Pam"
      },
      author: { ru: "К. Ф. Жаков", fi: "K. F. Zhakov", en: "K. F. Zhakov", et: "K. F. Zhakov" },
      category: "fairy_tales",
      files: { ru: "books/mudrijpam.pdf" },
      cover: "images/mudripam.jpg",
      description: {
        ru: "Сказка о мудром Паме.",
        fi: "Satu viisaasta Pamista.",
        en: "Fairy tale about wise Pam.",
        et: "Muinasjutt tarkast Pamist."
      },
      featured: false,
      contentLang: ["ru"],
      date: "2024-08-01"
    },
    {
      id: "gramort",
      type: "book",
      title: {
        ru: "Грамортъ на крайнемъ севере",
        fi: "Gramort äärimmäisellä pohjoisella",
        en: "Gramort in the Far North",
        et: "Gramort äärmises põhjas"
      },
      author: { ru: "К. Ф. Жаков", fi: "K. F. Zhakov", en: "K. F. Zhakov", et: "K. F. Zhakov" },
      category: "history",
      files: { ru: "books/gramotnostnakrainemsevere.pdf" },
      cover: null,
      description: {
        ru: "О Граморте на крайнем севере.",
        fi: "Gramortista äärimmäisellä pohjoisella.",
        en: "About Gramort in the far north.",
        et: "Gramortist äärmises põhjas."
      },
      featured: false,
      contentLang: ["ru"],
      date: "2024-08-05"
    },
    {
      id: "zolotaja",
      type: "book",
      title: {
        ru: "I. Золотая сказка; II. Сказка серебрянная; III. Гулень на небе; IV. Бегство северных богов",
        fi: "I. Kultainen satu; II. Hopeinen satu; III. Gulen taivaalla; IV. Pohjoisten jumalten pakomatka",
        en: "I. The Golden Tale; II. The Silver Tale; III. Gullen in the Sky; IV. The Flight of the Northern Gods",
        et: "I. Kulds muinasjutt; II. Hõbedane muinasjutt; III. Gulen taevas; IV. Põhja jumalate põgenemine"
      },
      author: { ru: "К. Ф. Жаков", fi: "K. F. Zhakov", en: "K. F. Zhakov", et: "K. F. Zhakov" },
      category: "fairy_tales",
      files: { ru: "books/zolotajaskazka.pdf" },
      cover: "images/zolotaja.jpg",
      description: {
        ru: "Сборник сказок: Золотая сказка, Сказка серебрянная, Гулень на небе, Бегство северных богов.",
        fi: "Satukokoelma: Kultainen satu, Hopeinen satu, Gulen taivaalla, Pohjoisten jumalten pakomatka.",
        en: "Collection of fairy tales: The Golden Tale, The Silver Tale, Gullen in the Sky, The Flight of the Northern Gods.",
        et: "Muinasjuttude kogumik: Kulds muinasjutt, Hõbedane muinasjutt, Gulen taevas, Põhja jumalate põgenemine."
      },
      featured: false,
      contentLang: ["ru"],
      date: "2024-08-10"
    }
  ],

  articles: [
    {
      id: "komiles",
      type: "article",
      title: {
        ru: "Коми-пермяцкий уход в лес — пиратские базы, сектанты и лесные братья",
        fi: "Komi-permjakkien pakko metsään — merirosvotukikohdat, lahkolaiset ja metsäveljet",
        en: "Komi-Permian Retreat into the Forest — Pirate Bases, Sectarians and Forest Brothers",
        et: "Komi-permja taganemine metsa — piraadibaasid, sektandid ja metsavennad"
      },
      author: { ru: "—", fi: "—", en: "—", et: "—" },
      category: "history",
      file: "article/komiles.mk",
      cover: "images/Komiles.jpg",
      description: {
        ru: "Статья о коми-пермяцком уходе в лес, пиратских базах, сектантах и лесных братьях.",
        fi: "Artikkeli komi-permjakkien metsäpakosta, merirosvotukikohdista, lahkolaisista ja metsäveljistä.",
        en: "Article about the Komi-Permian retreat into the forest, pirate bases, sectarians and forest brothers.",
        et: "Artikkel komi-permja taganemisest metsa, piraadibaasidest, sektantidest ja metsavendadest."
      },
      featured: true,
      contentLang: ["ru"],
      date: "2024-08-01"
    }
  ],

  images: [
    {
      id: "komiles",
      type: "image",
      title: {
        ru: "Коми-лес",
        fi: "Komi-les",
        en: "Komi-les",
        et: "Komi-les"
      },
      author: { ru: "—", fi: "—", en: "—", et: "—" },
      category: "art",
      file: "images/Komiles.jpg",
      description: {
        ru: "Изображение коми-леса.",
        fi: "Komi-lesin kuva.",
        en: "Image of Komi-les.",
        et: "Komi-lesi pilt."
      },
      featured: false,
      contentLang: ["ru"]
    },
    {
      id: "eestisport",
      type: "image",
      title: {
        ru: "Eesti sport",
        fi: "Eesti sport",
        en: "Eesti sport",
        et: "Eesti sport"
      },
      author: { ru: "—", fi: "—", en: "—", et: "—" },
      category: "art",
      file: "images/eestisport.jpg",
      description: {
        ru: "Eesti sport.",
        fi: "Eesti sport.",
        en: "Eesti sport.",
        et: "Eesti sport."
      },
      featured: false,
      contentLang: ["et"]
    },
    {
      id: "varag",
      type: "image",
      title: {
        ru: "Варяг",
        fi: "Varjagi",
        en: "Varangian",
        et: "Varjaag"
      },
      author: { ru: "—", fi: "—", en: "—", et: "—" },
      category: "art",
      file: "images/varag.jpg",
      description: {
        ru: "Варяг.",
        fi: "Varjagi.",
        en: "Varangian.",
        et: "Varjaag."
      },
      featured: false,
      contentLang: ["ru"]
    },
    {
      id: "mannegeim",
      type: "image",
      title: {
        ru: "Маннергейм",
        fi: "Mannerheim",
        en: "Mannerheim",
        et: "Mannerheim"
      },
      author: { ru: "—", fi: "—", en: "—", et: "—" },
      category: "art",
      file: "images/mannegeim.jpg",
      description: {
        ru: "Маннергейм.",
        fi: "Mannerheim.",
        en: "Mannerheim.",
        et: "Mannerheim."
      },
      featured: false,
      contentLang: ["fi"]
    }
  ]
};
