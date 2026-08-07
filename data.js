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
      author: { ru: "Народ коми", fi: "Komin kansa", en: "Komi people", et: "Komi rahvas" },
      category: "predanie",
      file: "books/tsar-kor.pdf",
      cover: null,
      description: {
        ru: "Древнее предание народа коми о могущественном царе Коре, правившем в северных землях.",
        fi: "Komin kansan muinainen perinne mahtavasta Tsar Korista.",
        en: "Ancient legend of the Komi people about the mighty Tsar Kor.",
        et: "Komi rahva muistne legend võimsast Tsar Korist."
      },
      featured: true,
      contentLang: ["ru"]
    },
    {
      id: "tsar-kor-en",
      type: "book",
      title: {
        ru: "Царь Коръ (English)",
        fi: "Tsar Kor (English)",
        en: "Tsar Kor",
        et: "Tsar Kor (English)"
      },
      author: { ru: "Народ коми", fi: "Komin kansa", en: "Komi people", et: "Komi rahvas" },
      category: "predanie",
      file: "books/tsar-korEN.pdf",
      cover: null,
      description: {
        ru: "Английский перевод предания о Царе Коре.",
        fi: "Tsar Korin perinteen englanninkielinen käännös.",
        en: "English translation of the legend of Tsar Kor.",
        et: "Tsar Kori legendi ingliskeelne tõlge."
      },
      featured: false,
      contentLang: ["en"]
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
      file: "books/Biarmiia - Kallistrat Falalieievich Zhakov.pdf",
      cover: null,
      description: {
        ru: "Исследование древней Биармии — исторической области на севере Европы, населённой финно-угорскими племенами.",
        fi: "Tutkimus muinaisesta Biarmiasta — Pohjois-Euroopan historiallisesta alueesta, jota asuttivat suomalais-ugrilaiset heimot.",
        en: "Study of ancient Biarmia — a historical region in Northern Europe inhabited by Finno-Ugric tribes.",
        et: "Uuring muistsest Biarmiast — Põhja-Euroopa ajaloolisest piirkonnast, mida asustasid soome-ugri hõimud."
      },
      featured: true,
      contentLang: ["ru"]
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
      author: { ru: "—", fi: "—", en: "—", et: "—" },
      category: "history",
      file: "books/nasever.pdf",
      cover: null,
      description: {
        ru: "Путешествие на север в поисках Памом Бур-Мортом.",
        fi: "Matka pohjoiseen Pam Bur-Mortin etsinnässä.",
        en: "Journey to the north in search of Pam Bur-Mort.",
        et: "Reis põhja poole Pam Bur-Morti otsimisel."
      },
      featured: true,
      contentLang: ["ru"]
    }
  ],

  articles: [
    {
      id: "komiles",
      type: "article",
      title: {
        ru: "Коми-лес",
        fi: "Komi-les",
        en: "Komi-les",
        et: "Komi-les"
      },
      author: { ru: "—", fi: "—", en: "—", et: "—" },
      category: "culture",
      file: "article/komiles.mk",
      cover: "images/Komiles.jpg",
      description: {
        ru: "Статья о коми-лесе.",
        fi: "Artikkeli Komi-lesistä.",
        en: "Article about Komi-les.",
        et: "Artikkel Komi-lesist."
      },
      featured: false,
      contentLang: ["ru"]
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
      featured: true,
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
