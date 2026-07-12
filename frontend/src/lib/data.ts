export type Product = {
  id: string;
  name: string;
  yomi: string;
  category: "和菓子" | "洋菓子" | "ケーキ";
  description: string;
  longDescription: string;
  price?: string;
  note?: string;
  season: string;
  emoji: string;
  emojiBg: string; // tailwind gradient classes
  image?: {
    src: string;
    alt: string;
    sourceLabel: string;
    sourceUrl: string;
  };
};

export type SitePhoto = {
  src: string;
  alt: string;
  title: string;
  body: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type NewsItem = {
  id: string;
  date: string;
  title: string;
  category: "お知らせ" | "新商品" | "イベント" | "休業案内";
  body?: string;
  image?: {
    src: string;
    alt: string;
    sourceLabel: string;
    sourceUrl: string;
  };
};

export type ProductStory = {
  title: string;
  productId: string;
  tag: string;
  category: Product["category"];
  description: string;
  detail: string;
  price?: string;
  season: string;
  image: {
    src: string;
    alt: string;
  };
};

export const products: Product[] = [
  {
    id: "water-manju",
    name: "轟名水 水まんじゅう",
    yomi: "とどろきめいすい みずまんじゅう",
    category: "和菓子",
    description: "地下80mの天然水を使った職人手作りの水まんじゅう。なめらかなこし餡をプルンとした生地で包んでいます。",
    longDescription: "地下80メートルから汲み上げた天然水を使い、職人が手作りします。なめらかなこし餡をプルンとした生地で包んだ、夏の人気商品です。常温でも5〜6時間品質が保たれるため、手みやげにも喜ばれます。「轟名水」という名前には、この地・高来町への想いが込められています。数量限定のため、品切れの際はご容赦ください。",
    price: "6個入り 1,000円（税込）",
    note: "数量限定",
    season: "夏季を中心に販売",
    emoji: "💧",
    emojiBg: "from-stream-50 to-stream-100",
    image: {
      src: "/photos/water-manju.webp",
      alt: "お菓子のみよしやの轟名水 水まんじゅう",
      sourceLabel: "公式グーペ",
      sourceUrl: "https://r.goope.jp/sr-42-4234310006/info/3091025",
    },
  },
  {
    id: "marubolo",
    name: "蜂蜜 丸ぼうろ",
    yomi: "はちみつ まるぼうろ",
    category: "和菓子",
    description: "小麦粉・卵・蜂蜜を使った長崎の伝統菓子。30年改良を重ねた、柔らかくしっとりした味わいです。",
    longDescription: "長崎に伝わる伝統菓子・丸ぼうろ。当店では30年間にわたって改良を重ね、固くパサつきやすい印象を変える、柔らかくしっとりとした食感に仕上げています。小麦粉・卵・蜂蜜を使ったシンプルな製法ながら、素材の選び方と焼き加減にこだわり続けています。温かい牛乳と一緒にどうぞ。電子レンジで5〜10秒ほど温めると、焼きたてに近い柔らかさをお楽しみいただけます。",
    price: "70円（税込）1個",
    season: "通年",
    emoji: "🍪",
    emojiBg: "from-honey-100 to-milk-200",
    image: {
      src: "https://stat.ameba.jp/user_images/20260107/14/okashinomiyoshiya/16/b7/j/o0810108015738453133.jpg?caw=800",
      alt: "お菓子のみよしやの蜂蜜 丸ぼうろ",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12952636368.html",
    },
  },
  {
    id: "kuri-dora",
    name: "栗どら",
    yomi: "くりどら",
    category: "和菓子",
    description: "大きな栗が丸ごと入ったどら焼き。しっとり生地・ゆたかなあんこ・ごろりとした栗の三つの味わい。",
    longDescription: "当店の定番商品。しっとりとした生地の中に、ゆたかなあんこと大きな栗が丸ごと入っています。生地・あんこ・栗の三つの味わいが口の中で広がる、食べごたえのある一品です。通年を通じてお買い求めいただけます。",
    price: "200円（税込）1個",
    season: "通年",
    emoji: "🌰",
    emojiBg: "from-caramel-100 to-honey-100",
    image: {
      src: "https://stat.ameba.jp/user_images/20120116/13/okashinomiyoshiya/fb/01/j/o0800060011738047357.jpg?caw=800",
      alt: "お菓子のみよしやの栗どら",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12204065723.html",
    },
  },
  {
    id: "momo-castella",
    name: "桃カステラ",
    yomi: "もものカステラ",
    category: "洋菓子",
    description: "長崎に古くから伝わる縁起菓子。出産祝いやお宮参りなど、大切な節目の贈り物として親しまれています。",
    longDescription: "桃の形をした砂糖菓子（フォンダン）をカステラの上にのせた、長崎伝統の縁起菓子です。ひな祭りの時期（2〜3月頃）のみ販売しております。出産祝い・お宮参りなど、おめでたい節目の贈り物としても古くから親しまれています。ご注文はお電話にてお気軽にご相談ください。",
    price: "550円（税込）1個",
    note: "ひな祭り時期限定",
    season: "ひな祭り時期（2〜3月頃）のみ販売",
    emoji: "🍑",
    emojiBg: "from-sakura-50 to-milk-100",
    image: {
      src: "https://stat.ameba.jp/user_images/20240227/15/okashinomiyoshiya/53/18/j/o0810108015406650791.jpg?caw=800",
      alt: "お菓子のみよしやの桃カステラ",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12842281245.html",
    },
  },
  {
    id: "sake-manju",
    name: "酒まんじゅう",
    yomi: "さけまんじゅう",
    category: "和菓子",
    description: "田植えの時期に親しまれてきた季節のおまんじゅう。やわらかな生地と素朴な味わいです。",
    longDescription: "昔から田植えまんじゅうとして親しまれている、梅雨どきの季節商品です。赤ちゃんのほっぺのようにぷにゅっとしたやわらかさが特徴で、直径約8cm・高さ約3cmほどの食べごたえがあります。店頭販売状況はご来店前にお電話または公式LINEでご確認ください。",
    price: "120円（税込）1個",
    note: "季節限定",
    season: "梅雨・田植えの時期",
    emoji: "☁️",
    emojiBg: "from-milk-100 to-sakura-50",
    image: {
      src: "https://stat.ameba.jp/user_images/20260605/11/okashinomiyoshiya/fd/f3/j/o0810108015789692543.jpg?caw=800",
      alt: "お菓子のみよしやの酒まんじゅう",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12968470309.html",
    },
  },
  {
    id: "koi-gashi",
    name: "鯉菓子",
    yomi: "こいがし",
    category: "和菓子",
    description: "長崎のお祝いごとに選ばれる鯉の形のお菓子。1匹からでも相談できます。",
    longDescription: "端午の節句やお祝いごとに合わせて作る、鯉の形をした長崎らしいお菓子です。急なお祝い返しや、ご家庭で召し上がりたい場合にも1匹からご相談いただけます。電話でのお取り置きにも対応しています。",
    note: "予約相談",
    season: "端午の節句・お祝い時期",
    emoji: "🎏",
    emojiBg: "from-stream-50 to-milk-100",
    image: {
      src: "https://stat.ameba.jp/user_images/20250505/07/okashinomiyoshiya/43/b2/j/o0810108015586252208.jpg?caw=800",
      alt: "お菓子のみよしやの鯉菓子",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12900355246.html",
    },
  },
  {
    id: "buttercream-chocolate-cake",
    name: "バタークリームチョコケーキ",
    yomi: "ばたーくりーむちょこけーき",
    category: "ケーキ",
    description: "バタークリームをサンドし、チョコレートでコーティングした昔懐かしいケーキです。",
    longDescription: "バタークリームをサンドしてチョコレートでコーティングした、昔懐かしい味わいのケーキです。直径約15cm・高さ約6cmほどで、ご家族やご友人と分けて楽しめます。チョコレート菓子や季節限定ケーキの販売状況は、電話または公式LINEでお問い合わせください。",
    note: "数量限定",
    season: "バレンタイン・季節販売",
    emoji: "🍫",
    emojiBg: "from-caramel-100 to-honey-100",
    image: {
      src: "https://stat.ameba.jp/user_images/20250213/15/okashinomiyoshiya/df/e8/j/o0810108015543781192.jpg?caw=800",
      alt: "お菓子のみよしやのバタークリームチョコケーキ",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12886278779.html",
    },
  },
  {
    id: "mini-christmas-cake",
    name: "ミニクリスマスケーキ",
    yomi: "みにくりすますけーき",
    category: "ケーキ",
    description: "2人で食べるのにちょうどいい、いちご付きの小さなクリスマスケーキです。",
    longDescription: "2人で食べるのにちょうどいいサイズの、季節限定クリスマスケーキです。直径約11cm・高さ約8cmほどで、生クリーム仕上げにいちごをのせた華やかな一台。数量限定で店頭に並ぶことがあるため、販売時期はお早めにお問い合わせください。",
    note: "季節限定",
    season: "クリスマス時期",
    emoji: "🎂",
    emojiBg: "from-sakura-50 to-milk-100",
    image: {
      src: "https://stat.ameba.jp/user_images/20241224/15/okashinomiyoshiya/d6/0f/j/o0810108015525088498.jpg?caw=800",
      alt: "お菓子のみよしやのミニクリスマスケーキ",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12879816041.html",
    },
  },
];

export const productStories: ProductStory[] = [
  {
    title: "酒まんじゅう",
    productId: "sake-manju",
    tag: "梅雨どきだけの限定品",
    category: "和菓子",
    description: "田植えの時期に親しまれてきた季節のおまんじゅう。",
    detail: "やわらかな生地が特徴で、直径約8cm・高さ約3cmほど。梅雨どきの店頭商品として紹介されています。",
    price: "120円（税込）",
    season: "梅雨・田植えの時期",
    image: {
      src: "https://stat.ameba.jp/user_images/20260605/11/okashinomiyoshiya/fd/f3/j/o0810108015789692543.jpg?caw=800",
      alt: "酒まんじゅう",
    },
  },
  {
    title: "蜂蜜 丸ぼうろ",
    productId: "marubolo",
    tag: "30年がけの改良品",
    category: "和菓子",
    description: "30年間、改良を重ねてきたみよしやの定番焼き菓子。",
    detail: "東京・日本橋長崎館での限定販売記事でも紹介。長崎らしい手みやげとして選びやすい商品です。",
    season: "通年",
    image: {
      src: "https://stat.ameba.jp/user_images/20260107/14/okashinomiyoshiya/16/b7/j/o0810108015738453133.jpg?caw=800",
      alt: "蜂蜜 丸ぼうろ",
    },
  },
  {
    title: "鯉菓子",
    productId: "koi-gashi",
    tag: "1匹からご相談OK",
    category: "和菓子",
    description: "お祝いごとや端午の節句に相談できる、長崎らしい鯉の形のお菓子。",
    detail: "急なお祝いをいただいた時や、ご家庭用にも1匹から相談可能。電話でのお取り置きにも対応しています。",
    season: "端午の節句・お祝い時期",
    image: {
      src: "https://stat.ameba.jp/user_images/20250505/07/okashinomiyoshiya/43/b2/j/o0810108015586252208.jpg?caw=800",
      alt: "鯉菓子",
    },
  },
  {
    title: "バタークリームチョコケーキ",
    productId: "buttercream-chocolate-cake",
    tag: "バレンタインの数量限定",
    category: "ケーキ",
    description: "バタークリームをサンドしてチョコレートで仕上げた、昔懐かしいケーキ。",
    detail: "直径約15cm・高さ約6cmほど。季節限定・数量限定で紹介されているため、来店前の確認がおすすめです。",
    season: "バレンタイン・季節販売",
    image: {
      src: "https://stat.ameba.jp/user_images/20250213/15/okashinomiyoshiya/df/e8/j/o0810108015543781192.jpg?caw=800",
      alt: "バタークリームチョコケーキ",
    },
  },
  {
    title: "桃カステラ",
    productId: "momo-castella",
    tag: "ひな祭りだけの縁起菓子",
    category: "洋菓子",
    description: "ひな祭りの時期だけご用意する、長崎伝統の縁起菓子。",
    detail: "桃の形をした砂糖菓子（フォンダン）をカステラにのせた一品。出産祝いやお宮参りの贈り物としても親しまれています。",
    price: "550円（税込）",
    season: "ひな祭り時期（2〜3月頃）のみ販売",
    image: {
      src: "https://stat.ameba.jp/user_images/20240227/15/okashinomiyoshiya/53/18/j/o0810108015406650791.jpg?caw=800",
      alt: "桃カステラ",
    },
  },
  {
    title: "ミニクリスマスケーキ",
    productId: "mini-christmas-cake",
    tag: "2人で食べきれるサイズ",
    category: "ケーキ",
    description: "2人で食べきれる、いちご付きの小さなクリスマスケーキ。",
    detail: "直径約11cm・高さ約8cmほどの生クリーム仕上げ。数量限定で店頭に並ぶため、販売時期は早めの確認がおすすめです。",
    season: "クリスマス時期",
    image: {
      src: "https://stat.ameba.jp/user_images/20241224/15/okashinomiyoshiya/d6/0f/j/o0810108015525088498.jpg?caw=800",
      alt: "ミニクリスマスケーキ",
    },
  },
];

export const sitePhotos: SitePhoto[] = [
  {
    src: "/photos/tv-exterior.webp",
    alt: "国道207号線沿いのお菓子のみよしや外観",
    title: "店舗外観",
    body: "国道207号線沿い、エレナ高来店の斜め前。看板と店舗前の駐車スペースが目印です。",
    sourceLabel: "長崎国際テレビ",
    sourceUrl: "https://www.nib.jp/tv/hirujige/hirujige_backnumber/hirujige_1755856742344413",
  },
  {
    src: "/photos/shop.webp",
    alt: "お菓子のみよしやの店内と職人",
    title: "店内の様子",
    body: "ケーキケースと和洋菓子が並ぶ店内。バースデーケーキや季節のお菓子も相談できます。",
    sourceLabel: "公式グーペ",
    sourceUrl: "https://r.goope.jp/sr-42-4234310006/",
  },
  {
    src: "/photos/water-manju.webp",
    alt: "轟名水 水まんじゅう",
    title: "轟名水 水まんじゅう",
    body: "地下80mの天然水を使った、夏の人気商品。数量限定のため電話確認がおすすめです。",
    sourceLabel: "公式グーペ",
    sourceUrl: "https://r.goope.jp/sr-42-4234310006/info/3091025",
  },
  {
    src: "https://stat.ameba.jp/user_images/20260107/14/okashinomiyoshiya/16/b7/j/o0810108015738453133.jpg?caw=800",
    alt: "蜂蜜 丸ぼうろ",
    title: "蜂蜜 丸ぼうろ",
    body: "30年かけて柔らかくしっとりした食感に仕上げた、長崎らしい焼き菓子です。",
    sourceLabel: "公式ブログ（アメブロ）",
    sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12952636368.html",
  },
  {
    src: "/photos/cake.webp",
    alt: "お菓子のみよしやのクリスマスケーキ",
    title: "ケーキ予約",
    body: "クリスマスや誕生日など、大切な日のケーキもお電話で相談できます。",
    sourceLabel: "公式ブログ",
    sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12950687476.html",
  },
];

export const newsItems: NewsItem[] = [
  {
    id: "sake-manju-story",
    date: "2026.06.05",
    title: "酒まんじゅうできました。田植えの時期に親しまれてきた季節のお菓子です",
    category: "新商品",
    body: "指で触れると、ぷにゅっと沈むくらいやわらかい生地。酒まんじゅうは、田植えの時期になると「もうできましたか」とお声がかかる季節商品です。直径約8cm・高さ約3cmほどとボリュームがあり、価格は1個120円（税込）。\n\n梅雨どきだけの商品のため、なくなり次第終了です。気になる方はお早めにどうぞ。",
    image: {
      src: "https://stat.ameba.jp/user_images/20260605/11/okashinomiyoshiya/fd/f3/j/o0810108015789692543.jpg?caw=800",
      alt: "お菓子のみよしやの酒まんじゅう",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12968470309.html",
    },
  },
  {
    id: "marubolo-story",
    date: "2026.01.07",
    title: "蜂蜜 丸ぼうろ。30年かけて改良してきた、みよしやの定番焼き菓子",
    category: "お知らせ",
    body: "丸ぼうろは長崎に伝わる焼き菓子のひとつですが、一般的には少し固めでパサつきやすいお菓子でもあります。みよしやでは「もっとやわらかく、しっとり食べられたら」という思いから、30年かけて配合と焼き加減を少しずつ見直してきました。\n\n材料は小麦粉・卵・蜂蜜とシンプルですが、その分、素材選びと火加減の違いがそのまま味に出ます。お茶の時間のお供にも、ちょっとした手みやげにも選びやすい一品です。\n\n2026年1月には、東京・日本橋にある長崎県のアンテナショップ「日本橋長崎館」でも販売されました。まとめてご注文される場合は、お早めにご相談いただけると助かります。",
    image: {
      src: "https://stat.ameba.jp/user_images/20260107/14/okashinomiyoshiya/16/b7/j/o0810108015738453133.jpg?caw=800",
      alt: "お菓子のみよしやの蜂蜜丸ぼうろ",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12952636368.html",
    },
  },
  {
    id: "koi-gashi-story",
    date: "2025.05.05",
    title: "鯉菓子は1匹からでもご相談いただけます",
    category: "お知らせ",
    body: "端午の節句やお祝いごとに合わせて、鯉の形をしたお菓子「鯉菓子」を作っています。長崎では昔から、こうした節目に選ばれてきたお菓子です。\n\n「急にお祝いをいただいたので、お返しに」という方にも対応できるよう、1匹からご注文いただけます。ご家庭用の少量のご相談も歓迎です。\n\nただし製造のタイミングや店頭にある数は日によって変わります。受け取りたい日が決まっている場合は、早めに電話でご連絡いただけると確実です。",
    image: {
      src: "https://stat.ameba.jp/user_images/20250505/07/okashinomiyoshiya/43/b2/j/o0810108015586252208.jpg?caw=800",
      alt: "お菓子のみよしやの鯉菓子",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12900355246.html",
    },
  },
  {
    id: "buttercream-chocolate-cake-story",
    date: "2025.02.13",
    title: "バタークリームをサンドした、昔懐かしいチョコレートケーキ",
    category: "新商品",
    body: "バタークリームをサンドし、チョコレートでコーティングした、昔ながらのチョコレートケーキです。直径約15cm・高さ約6cmほどで、家族や友人と分けて食べるのにちょうどいい大きさです。チョコレートの価格はここ数年じわじわと上がっていますが、できるだけ手に取りやすい価格で季節のケーキを出せるよう工夫しています。\n\nただし販売できる数には限りがあり、バレンタインの時期は早めになくなることもあります。気になる方は、店頭に並ぶ前に一度お電話でご確認ください。",
    image: {
      src: "https://stat.ameba.jp/user_images/20250213/15/okashinomiyoshiya/df/e8/j/o0810108015543781192.jpg?caw=800",
      alt: "お菓子のみよしやのバタークリームチョコケーキ",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12886278779.html",
    },
  },
  {
    id: "momo-castella-story",
    date: "2024.02.27",
    title: "桃カステラ。ひな祭りの時期だけご用意する、長崎伝統の縁起菓子です",
    category: "新商品",
    body: "3月のひな祭りが近づくと、店頭に並ぶのが「桃カステラ」です。カステラの上に、桃の形をした砂糖菓子（フォンダン）をのせた、長崎に伝わる縁起菓子です。\n\n出産祝いやお宮参りなど、おめでたい節目の贈り物として選ばれることも多く、見た目の華やかさから手に取られる方もいらっしゃいます。価格は1個550円（税込）。\n\n販売は2〜3月頃のみで、年によって開始日が前後します。時期が近づいたら、一度お問い合わせいただくと確実です。",
    image: {
      src: "https://stat.ameba.jp/user_images/20240227/15/okashinomiyoshiya/53/18/j/o0810108015406650791.jpg?caw=800",
      alt: "お菓子のみよしやの桃カステラ",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12842281245.html",
    },
  },
  {
    id: "mini-christmas-cake-story",
    date: "2024.12.24",
    title: "2人で食べきれる、いちご付きミニクリスマスケーキをご用意しています",
    category: "新商品",
    body: "クリスマスケーキは大きいサイズが定番ですが、「2人だと食べきれない」という声から生まれたのが、このミニサイズです。直径約11cm・高さ約8cmほどの生クリームケーキに、いちごをのせています。\n\n数量限定での販売のため、クリスマス当日より前に売り切れることもあります。年末は予約が集中しやすいので、ご検討の方はお早めにご連絡ください。",
    image: {
      src: "https://stat.ameba.jp/user_images/20241224/15/okashinomiyoshiya/d6/0f/j/o0810108015525088498.jpg?caw=800",
      alt: "お菓子のみよしやのミニクリスマスケーキ",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12879816041.html",
    },
  },
  {
    id: "1",
    date: "2026.01.07",
    title: "日本橋長崎館（東京）にて蜂蜜丸ぼうろを販売いたしました",
    category: "お知らせ",
    body: "2026年1月より、東京・日本橋にある長崎県アンテナショップ「日本橋長崎館」にて蜂蜜丸ぼうろを販売いたしました。詳しくはお電話にてお問い合わせください。",
    image: {
      src: "/photos/marubolo.webp",
      alt: "蜂蜜丸ぼうろ",
      sourceLabel: "長崎県産品データベース",
      sourceUrl: "https://nagasakisanpin-database.jp/business/%E3%81%8A%E8%8F%93%E5%AD%90%E3%81%AE%E3%81%BF%E3%82%88%E3%81%97%E3%82%84/",
    },
  },
  {
    id: "2",
    date: "2025.11.01",
    title: "11月23日「ケーキ作りの会2025」を開催いたします（参加費1,500円）",
    category: "イベント",
    body: "毎年恒例の子ども向けケーキ教室を11月23日に開催いたします。参加費1,500円。定員になり次第締め切りとなりますので、お早めにお電話にてお申し込みください。",
    image: {
      src: "/photos/cake.webp",
      alt: "お菓子のみよしやのケーキ",
      sourceLabel: "公式ブログ",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12950687476.html",
    },
  },
  {
    id: "3",
    date: "2025.10.15",
    title: "クリスマスケーキのご予約を承っております。お電話にてお問い合わせください",
    category: "お知らせ",
    body: "クリスマスケーキのご予約を受け付けております。バタークリームを使った昔ながらのケーキです。お電話にてご注文ください。",
    image: {
      src: "/photos/cake.webp",
      alt: "お菓子のみよしやのクリスマスケーキ",
      sourceLabel: "公式ブログ",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12950687476.html",
    },
  },
  {
    id: "4",
    date: "2025.06.01",
    title: "水まんじゅうの販売を開始しました（数量限定）",
    category: "新商品",
    body: "今年も水まんじゅうの販売を開始しました。数量限定のため、品切れの際はご容赦ください。ご来店前にお電話でご確認いただくと確実です。",
    image: {
      src: "/photos/water-manju.webp",
      alt: "轟名水 水まんじゅう",
      sourceLabel: "公式グーペ",
      sourceUrl: "https://r.goope.jp/sr-42-4234310006/info/3091025",
    },
  },
  {
    id: "nib-hirujigedon-2025",
    date: "2025.08.23",
    title: "NIB「ひるじげドン」で当店をご紹介いただきました",
    category: "お知らせ",
    body: "長崎国際テレビ（NIB）の番組「ひるじげドン」の取材を受け、8月23日（土）13:30からの放送で当店をご紹介いただきました。創業からこの高来町で90年、カステラと蜂蜜丸ぼうろを作り続けてきたお店です。\n\n取材は2時間の予定が3時間に。カメラが止まっている間も気さくに話しかけてくださったレポーターさんのおかげで、当日はあっという間でした。放送をご覧になった方から「テレビで見たよ」とお声をかけていただき、職人一同とてもありがたく思っています。",
    image: {
      src: "https://stat.ameba.jp/user_images/20250728/21/okashinomiyoshiya/e4/58/j/o0810108015641931993.jpg?caw=800",
      alt: "NIBひるじげドンの取材を受けるお菓子のみよしや店内",
      sourceLabel: "公式ブログ（アメブロ）",
      sourceUrl: "https://ameblo.jp/okashinomiyoshiya/entry-12919280018.html",
    },
  },
];
