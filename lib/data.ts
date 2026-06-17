export type PostCategory =
  | 'trek-report'
  | 'cultural-story'
  | 'food-travel'
  | 'travel-tip'
  | 'photography';

export interface Author {
  name: string;
  country: string;
  flag: string;
  badge: string;
  initials: string;
  color: string;
}

export interface CommunityPost {
  id: string;
  slug: string;
  author: Author;
  category: PostCategory;
  title: string;
  excerpt: string;
  image: string;
  likes: number;
  comments: number;
  views: number;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export interface TopContributor extends Author {
  posts: number;
  likes: number;
}

export const COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: '1',
    slug: 'everest-base-camp-solo-14-days',
    author: {
      name: 'Alex Chen', country: 'USA', flag: '🇺🇸',
      badge: 'Summit Seeker', initials: 'AC', color: '#1a4a7a',
    },
    category: 'trek-report',
    title: 'Solo to Everest Base Camp: 14 Days, Every Step Documented',
    excerpt: 'I left Lukla alone, not knowing if I could handle the altitude. What happened next changed how I see endurance, solitude, and the meaning of height.',
    image: '/everest-base-camp.jpg',
    likes: 847, comments: 134, views: 12400,
    date: 'Nov 18, 2025', readTime: '12 min',
    tags: ['EBC', 'Solo Trekking', 'Khumbu'],
    featured: true,
  },
  {
    id: '2',
    slug: 'kathmandu-hidden-tea-houses',
    author: {
      name: 'Priya Sharma', country: 'India', flag: '🇮🇳',
      badge: 'Culture Explorer', initials: 'PS', color: '#7b3f00',
    },
    category: 'cultural-story',
    title: "Kathmandu's Hidden Tea Houses: 12 Spots Only Locals Know",
    excerpt: 'Behind the tourist trail lies a Kathmandu that moves slower, tastes better, and tells its stories in hushed conversations over masala chai.',
    image: '/Kathmandu.jpg',
    likes: 623, comments: 89, views: 9800,
    date: 'Oct 30, 2025', readTime: '8 min',
    tags: ['Kathmandu', 'Local Life', 'Food'],
    featured: true,
  },
  {
    id: '3',
    slug: 'annapurna-circuit-budget-guide',
    author: {
      name: 'Marco Rossi', country: 'Italy', flag: '🇮🇹',
      badge: 'Budget Master', initials: 'MR', color: '#1a5276',
    },
    category: 'travel-tip',
    title: 'Annapurna Circuit on $30/Day: The Honest Budget Breakdown',
    excerpt: "Permits, teahouses, food, gear rental — here's every dollar I spent on the most spectacular loop trek in the Himalayas.",
    image: '/Annapurna Base Camp.jpg',
    likes: 1204, comments: 213, views: 24100,
    date: 'Oct 12, 2025', readTime: '15 min',
    tags: ['Budget', 'Annapurna', 'Planning'],
    featured: true,
  },
  {
    id: '4',
    slug: 'dashain-festival-village-home',
    author: {
      name: 'Sarah Johnson', country: 'UK', flag: '🇬🇧',
      badge: 'Festival Seeker', initials: 'SJ', color: '#4a235a',
    },
    category: 'cultural-story',
    title: 'Dashain in a Village Home: What Nobody Tells You',
    excerpt: "I was invited to celebrate Nepal's biggest festival with a family in a hilltop village. Five days of tika, feasts, and a family that changed me.",
    image: '/culture.jpg',
    likes: 492, comments: 67, views: 8200,
    date: 'Oct 5, 2025', readTime: '10 min',
    tags: ['Dashain', 'Festivals', 'Village Life'],
  },
  {
    id: '5',
    slug: 'chitwan-rhino-safari-photo-story',
    author: {
      name: 'Kenji Tanaka', country: 'Japan', flag: '🇯🇵',
      badge: 'Lens Master', initials: 'KT', color: '#7d6608',
    },
    category: 'photography',
    title: 'Chitwan Rhino Safari: The Full Photo Story',
    excerpt: 'Three days, two jeep safaris, one canoe ride, and the patience that comes with carrying a 500mm lens through tall grass at dusk.',
    image: '/Chitwan National Park.jpg',
    likes: 731, comments: 98, views: 15600,
    date: 'Sep 22, 2025', readTime: '7 min',
    tags: ['Chitwan', 'Wildlife', 'Photography'],
  },
  {
    id: '6',
    slug: 'nepal-food-journey-3-weeks',
    author: {
      name: 'Emma Wilson', country: 'Australia', flag: '🇦🇺',
      badge: 'Foodie Trekker', initials: 'EW', color: '#1e8449',
    },
    category: 'food-travel',
    title: 'Dal Bhat Power: My 3-Week Nepal Food Journey',
    excerpt: "I ate dal bhat for 21 days straight. It wasn't boring. Here's why Nepal's national dish is actually an education in regional flavour.",
    image: '/tradation.jpg',
    likes: 559, comments: 112, views: 11200,
    date: 'Sep 8, 2025', readTime: '9 min',
    tags: ['Dal Bhat', 'Nepali Food', 'Cuisine'],
  },
  {
    id: '7',
    slug: 'langtang-valley-rebuilding-resilience',
    author: {
      name: 'Diego Martinez', country: 'Spain', flag: '🇪🇸',
      badge: 'Trail Pioneer', initials: 'DM', color: '#922b21',
    },
    category: 'trek-report',
    title: 'Langtang Valley After the Earthquake: Rebuilding and Resilience',
    excerpt: 'The 2015 earthquake destroyed Langtang. Ten years later, I trekked through a valley that has rebuilt itself with extraordinary heart.',
    image: '/Langtang Valley.jpg',
    likes: 983, comments: 187, views: 18900,
    date: 'Aug 20, 2025', readTime: '14 min',
    tags: ['Langtang', 'Resilience', 'History'],
  },
  {
    id: '8',
    slug: 'poon-hill-sunrise-3-times',
    author: {
      name: 'Yuki Nakamura', country: 'Japan', flag: '🇯🇵',
      badge: 'Sunrise Chaser', initials: 'YN', color: '#d35400',
    },
    category: 'photography',
    title: 'Poon Hill at Sunrise: Why I Climbed It Three Times',
    excerpt: 'The first time was cloudy. The second time, rain. The third time — I stood in gold light with the entire Annapurna range on fire.',
    image: '/Poon Hill.jpg',
    likes: 867, comments: 145, views: 17300,
    date: 'Aug 1, 2025', readTime: '6 min',
    tags: ['Poon Hill', 'Sunrise', 'Annapurna'],
  },
  {
    id: '9',
    slug: 'living-with-sherpa-family-namche',
    author: {
      name: 'Fatima Al-Rashid', country: 'UAE', flag: '🇦🇪',
      badge: 'Culture Seeker', initials: 'FA', color: '#1a5276',
    },
    category: 'cultural-story',
    title: 'Living with a Sherpa Family in Namche: 10 Days of Culture Shift',
    excerpt: "No teahouse, no guesthouse. A family opened their home to me for 10 days. I came for the mountains. I stayed for the people.",
    image: '/Namche Bazaar.jpg',
    likes: 1124, comments: 203, views: 21800,
    date: 'Jul 14, 2025', readTime: '13 min',
    tags: ['Sherpa', 'Namche', 'Khumbu'],
  },
  {
    id: '10',
    slug: 'pokhara-paragliding-complete-guide',
    author: {
      name: 'Tom Baker', country: 'Canada', flag: '🇨🇦',
      badge: 'Adventure Pro', initials: 'TB', color: '#117a65',
    },
    category: 'travel-tip',
    title: "Pokhara Paragliding: Everything They Don't Tell You",
    excerpt: "Best operators, weather windows, what gear to wear, how not to get overcharged, and why the mountain view at altitude will wreck you.",
    image: '/Pokhara.jpg',
    likes: 678, comments: 124, views: 13600,
    date: 'Jun 28, 2025', readTime: '8 min',
    tags: ['Paragliding', 'Pokhara', 'Adventure'],
  },
  {
    id: '11',
    slug: 'manaslu-circuit-underrated-trek',
    author: {
      name: 'Lisa Schmidt', country: 'Germany', flag: '🇩🇪',
      badge: 'Wilderness Walker', initials: 'LS', color: '#4a235a',
    },
    category: 'trek-report',
    title: "Manaslu Circuit: Nepal's Most Underrated Trek",
    excerpt: "While everyone rushes to Everest and Annapurna, Manaslu stays quiet — permit-restricted, raw, and the most beautiful thing I've ever walked.",
    image: '/Manaslu Base Camp.jpg',
    likes: 934, comments: 156, views: 16400,
    date: 'Jun 10, 2025', readTime: '16 min',
    tags: ['Manaslu', 'Remote', 'Advanced Trek'],
  },
  {
    id: '12',
    slug: 'pashupatinath-dawn-spiritual-experience',
    author: {
      name: 'Ravi Patel', country: 'India', flag: '🇮🇳',
      badge: 'Spiritual Seeker', initials: 'RP', color: '#6e2f1a',
    },
    category: 'cultural-story',
    title: 'Pashupatinath at Dawn: The Most Powerful Morning of My Life',
    excerpt: "I am Hindu. I have visited temples across India. Nothing prepared me for standing at the Bagmati ghats as the sun rose over Pashupatinath.",
    image: '/Pashupatinath Temple.jpg',
    likes: 754, comments: 167, views: 14100,
    date: 'May 22, 2025', readTime: '11 min',
    tags: ['Pashupatinath', 'Spirituality', 'Kathmandu'],
  },
];

export const COMMUNITY_STATS = {
  members: '18,400+',
  stories: '3,200+',
  countries: '94',
  treks: '1,400+',
};

export const TOP_CONTRIBUTORS: TopContributor[] = [
  {
    name: 'Alex Chen', country: 'USA', flag: '🇺🇸',
    badge: 'Summit Seeker', initials: 'AC', color: '#1a4a7a',
    posts: 23, likes: 4820,
  },
  {
    name: 'Fatima Al-Rashid', country: 'UAE', flag: '🇦🇪',
    badge: 'Culture Seeker', initials: 'FA', color: '#1a5276',
    posts: 19, likes: 4103,
  },
  {
    name: 'Diego Martinez', country: 'Spain', flag: '🇪🇸',
    badge: 'Trail Pioneer', initials: 'DM', color: '#922b21',
    posts: 17, likes: 3840,
  },
  {
    name: 'Marco Rossi', country: 'Italy', flag: '🇮🇹',
    badge: 'Budget Master', initials: 'MR', color: '#1a5276',
    posts: 14, likes: 5120,
  },
  {
    name: 'Yuki Nakamura', country: 'Japan', flag: '🇯🇵',
    badge: 'Sunrise Chaser', initials: 'YN', color: '#d35400',
    posts: 12, likes: 3901,
  },
];

// ── Destinations ──────────────────────────────────────────────────────────────

export interface Destination {
  slug: string;
  name: string;
  devanagari: string;
  region: string;
  type: string;
  elevation: string;
  image: string;
  duration: string;
  difficulty: string;
  bestSeason: string;
  description: string;
  stories: number;
  // Rich content
  overview: string[];
  highlights: string[];
  gallery: string[];
  gettingThere: string;
  permits: string | null;
  bestTime: string;
  coordinates: [number, number];
  relatedSlugs: string[];
  bookingCategory: string | null;
  communityTags: string[];
}

export const DESTINATION_LIST: Destination[] = [
  {
    slug: 'everest-base-camp',
    name: 'Everest Base Camp',
    devanagari: 'सगरमाथा बेस क्याम्प',
    region: 'Khumbu',
    type: 'Trek',
    elevation: '5,364 m',
    image: '/everest-base-camp.jpg',
    duration: '14–18 days',
    difficulty: 'Challenging',
    bestSeason: 'Oct–Nov, Mar–Apr',
    description: "The iconic trek to the foot of the world's tallest peak through Sherpa villages and glacial valleys.",
    stories: 284,
    overview: [
      "The Everest Base Camp trek is the most celebrated Himalayan journey in the world — a 14–18 day odyssey through the Khumbu Valley that deposits you at the foot of the planet's highest mountain. It is not a technical climb; it is a walk through one of Earth's most dramatic landscapes, along ancient Sherpa trade routes that connect stone teahouses, prayer-flag-draped passes, and monasteries draped in wind.",
      "The route ascends from Lukla's famously short airstrip through Namche Bazaar — the Sherpa capital at 3,440 m — past Tengboche Monastery with Ama Dablam looming behind, and on through Dingboche, Lobuche, and Gorak Shep until the glacier moraine opens into the vast white amphitheatre of Base Camp itself.",
      "At 5,364 metres, the views across the Khumbu Icefall and the faces of Everest, Lhotse, and Nuptse are without equal. This is a trek that demands patience, acclimatisation, and a willingness to move slowly — and rewards every step with landscapes that no photograph fully captures.",
    ],
    highlights: [
      "Khumbu Icefall — the world's most dramatic glacier, visible from Base Camp",
      "Namche Bazaar — the Sherpa capital, with bakeries, gear shops and mountain panoramas",
      "Tengboche Monastery at 3,867 m — ancient gompa with Ama Dablam directly behind",
      "Kala Patthar at 5,644 m — the closest viewpoint most trekkers reach to Everest's summit",
      "Eight 8,000 m peaks visible from the trail on clear days",
      "Sherpa culture — immersive high-altitude mountain community life",
    ],
    gallery: ['/Namche Bazaar.jpg', '/Tengboche Monastery.jpg', '/Kala Patthar.jpg', '/Everest BC South.jpg'],
    gettingThere: "Fly Kathmandu → Lukla (Tenzing-Hillary Airport, 35 min). Book flights weeks in advance — seats fill fast. The airport is frequently closed by weather; carry contingency days in your schedule.",
    permits: "TIMS card (Trekkers' Information Management System) + Sagarmatha National Park entry permit. Obtainable through a registered trekking agency or at the TAAN office in Kathmandu.",
    bestTime: "October–November (post-monsoon) offers the clearest skies and most stable conditions. March–May (spring) brings warmer days and rhododendrons in bloom. December–February is cold but serene — far fewer trekkers and dramatic snowscapes.",
    coordinates: [27.9882, 86.9252],
    relatedSlugs: ['annapurna-base-camp', 'langtang-valley', 'poon-hill'],
    bookingCategory: 'trekking',
    communityTags: ['EBC', 'Khumbu', 'Sherpa', 'Namche'],
  },
  {
    slug: 'annapurna-base-camp',
    name: 'Annapurna Base Camp',
    devanagari: 'अन्नपूर्णा बेस क्याम्प',
    region: 'Gandaki',
    type: 'Trek',
    elevation: '4,130 m',
    image: '/Annapurna Base Camp.jpg',
    duration: '7–10 days',
    difficulty: 'Moderate',
    bestSeason: 'Oct–Nov, Mar–Apr',
    description: 'A natural amphitheatre of 360° Himalayan giants — one of the most dramatic landscapes on Earth.',
    stories: 218,
    overview: [
      "The Annapurna Sanctuary trek leads into a glacial amphitheatre enclosed by thirteen peaks above 7,000 m — including Annapurna I (8,091 m), the world's tenth highest mountain. Unlike the longer circuit, this trek is achievable in a week and accessible to most fit adults without prior Himalayan experience.",
      "The route passes through the subtropical forests and terraced farmland of the Modi Khola gorge before the vegetation thins dramatically and the mountains close in. The transition from rhododendron forest to alpine moraine happens in a single day — one of the most startling landscape shifts in trekking.",
      "At Base Camp, surrounded on all sides by towering Himalayan walls with Machhapuchhre's sacred fishtail summit above, you stand inside one of the most photographed mountain panoramas in the world.",
    ],
    highlights: [
      "360° ring of 13 peaks above 7,000 m at Base Camp",
      "Machhapuchhre — the sacred Fishtail peak, permanently forbidden to climb",
      "Modi Khola gorge — rhododendron forests and natural hot springs at Jhinu",
      "Ghandruk village — a living Gurung cultural centre with traditional homes",
      "Tadapani ridge — sunrise views across the full Annapurna Massif",
      "Short enough for most fit adults — no acclimatisation days needed",
    ],
    gallery: ['/Annapurna BC.jpg', '/Machhapuchhre BC.jpg', '/Thorong La Pass.jpg'],
    gettingThere: "Fly or take a tourist bus from Kathmandu to Pokhara (25 min flight / 6–7 hr bus). From Pokhara, take a local jeep to Nayapul or Kimche. The trek begins at Nayapul.",
    permits: "ACAP (Annapurna Conservation Area Project) permit + TIMS card. Purchased at the ACAP office in Pokhara or Kathmandu.",
    bestTime: "October–November for crystal-clear post-monsoon skies and the best photography. March–May for the rhododendron bloom — the forests below Base Camp erupt in crimson and pink. The sanctuary fills with deep snow in winter.",
    coordinates: [28.5320, 83.8773],
    relatedSlugs: ['poon-hill', 'pokhara', 'upper-mustang'],
    bookingCategory: 'trekking',
    communityTags: ['Annapurna', 'Budget', 'Planning'],
  },
  {
    slug: 'kathmandu',
    name: 'Kathmandu',
    devanagari: 'काठमाडौं',
    region: 'Bagmati',
    type: 'City',
    elevation: '1,400 m',
    image: '/Kathmandu.jpg',
    duration: '3–5 days',
    difficulty: 'Easy',
    bestSeason: 'Year-round',
    description: 'Ancient temples, living goddesses, and seven UNESCO World Heritage Sites in one extraordinary valley.',
    stories: 341,
    overview: [
      "Kathmandu is one of the last great living cities of ancient Asia — a medieval valley that has never stopped functioning as a sacred, commercial, and cultural centre. The old city contains seven UNESCO World Heritage Sites within 15 km of each other: Pashupatinath, Boudhanath, Swayambhunath, Changu Narayan, Bhaktapur, Patan, and Kathmandu Durbar Squares.",
      "The chaos of Thamel — Nepal's legendary traveller district — sits minutes from courtyards where Newari craftsmen still carve wood using techniques unchanged for six centuries. The living goddess Kumari watches from a gilded window. Monks and pilgrims circumambulate Boudhanath at dawn. Sadhus hold court at Pashupatinath beside the river.",
      "Kathmandu is most travellers' gateway to Nepal and most also find it their most surprising stop — a city that rewards walking, getting lost, and looking up.",
    ],
    highlights: [
      "Pashupatinath Temple — Nepal's holiest Hindu shrine and the sacred burning ghats",
      "Boudhanath Stupa — one of the world's great Buddhist monuments with all-seeing eyes",
      "Swayambhunath — the Monkey Temple, with sweeping valley views",
      "Durbar Square — a living medieval royal palace complex",
      "Kumari Ghar — home of the living goddess, a pre-pubescent girl venerated as divine",
      "Thamel — the world's most chaotic and charming traveller quarter",
    ],
    gallery: ['/Boudhanath Stupa.jpg', '/Swayambhunath.jpg', '/Pashupatinath Temple.jpg'],
    gettingThere: "Tribhuvan International Airport (KTM) receives direct flights from major Asian hubs including Delhi, Doha, Singapore, Dubai, and Bangkok. Overland from India via Sunauli (Bhairahawa) or Birgunj border crossings.",
    permits: null,
    bestTime: "Year-round, though October–April brings the clearest skies and most comfortable temperatures. June–September (monsoon) is lush and culturally rich but hazy. Dashain (October) and Indra Jatra (September) are spectacular festivals.",
    coordinates: [27.7172, 85.3240],
    relatedSlugs: ['bhaktapur', 'boudhanath-stupa', 'pashupatinath'],
    bookingCategory: 'hotels',
    communityTags: ['Kathmandu', 'Local Life', 'Pashupatinath', 'Spirituality'],
  },
  {
    slug: 'pokhara',
    name: 'Pokhara',
    devanagari: 'पोखरा',
    region: 'Gandaki',
    type: 'City',
    elevation: '822 m',
    image: '/Pokhara.jpg',
    duration: '2–4 days',
    difficulty: 'Easy',
    bestSeason: 'Oct–Apr',
    description: "Mirror lakes reflecting the Annapurna range at dawn — Nepal's adventure capital.",
    stories: 297,
    overview: [
      "Pokhara sits at 822 metres in the shadow of the Annapurna Massif — the greatest wall of mountains visible from any inhabited city on Earth. On a clear morning, Machhapuchhre, Annapurna South, and seven other peaks above 7,000 m are reflected in Phewa Lake, creating the photograph most people associate with Nepal.",
      "By day, Pokhara is Nepal's adventure capital: the world's second-most popular paragliding site (Sarangkot launches directly above the lake), white-water rafting on the Seti and Kali Gandaki rivers, zip-lines, kayaking, mountain biking, and ultralight flights over the Himalayas.",
      "By night, the lakeside Prithvi Narayan Marg strip is Nepal's most cosmopolitan gathering point — easy, international, and unhurried in a way that Kathmandu rarely is.",
    ],
    highlights: [
      "Phewa Lake at dawn — Machhapuchhre's fishtail reflection in still water",
      "Sarangkot paragliding — 30 minutes soaring above the Annapurna range",
      "Davis Falls — a powerful waterfall plunging into a subterranean gorge",
      "World Peace Pagoda — a Japanese-funded stupa with Himalayan panoramas",
      "Begnas Lake — quieter, more local, equally beautiful to Phewa",
      "Lakeside dining — some of Nepal's best international restaurants",
    ],
    gallery: ['/Phewa Lake.jpg', '/Poon Hill.jpg'],
    gettingThere: "Fly from Kathmandu to Pokhara Airport (25 min). Tourist buses take 6–7 hours but are scenic. Greenline and similar express coaches are comfortable and affordable.",
    permits: null,
    bestTime: "October–April for mountain views (clearest in October–November). June–September brings cloud cover that obscures the peaks, though the valley stays lush and green. Avoid monsoon if panoramas are your priority.",
    coordinates: [28.2096, 83.9856],
    relatedSlugs: ['annapurna-base-camp', 'poon-hill', 'upper-mustang'],
    bookingCategory: 'hotels',
    communityTags: ['Pokhara', 'Paragliding', 'Adventure'],
  },
  {
    slug: 'poon-hill',
    name: 'Poon Hill',
    devanagari: 'पुन हिल',
    region: 'Gandaki',
    type: 'Trek',
    elevation: '3,210 m',
    image: '/Poon Hill.jpg',
    duration: '4–5 days',
    difficulty: 'Easy',
    bestSeason: 'Oct–Nov, Mar–Apr',
    description: "Nepal's most famous sunrise viewpoint — golden light flooding across Annapurna and Dhaulagiri.",
    stories: 189,
    overview: [
      "Poon Hill offers what is arguably the finest accessible sunrise panorama in the world — a 270° arc of Himalayan peaks including Annapurna South, Hiunchuli, Dhaulagiri, and the Nilgiri range, viewed from 3,210 m as the sky turns gold behind the summits.",
      "The Ghorepani-Poon Hill circuit is Nepal's ideal first Himalayan trek: 4–5 days, achievable without altitude acclimatisation days, accessible to most fit adults. The approach through dense rhododendron forest is spectacular in March–April when the trees bloom in crimson and pink.",
      "This is also one of Nepal's most community-supported treks — every teahouse, porter, and guide along the route is from a local Magar or Gurung family.",
    ],
    highlights: [
      "Sunrise panorama from the summit — Annapurna South, Dhaulagiri, and Nilgiri visible",
      "Achievable at 3,210 m without altitude acclimatisation",
      "Rhododendron forests — spectacular crimson bloom in March–April",
      "Ghorepani village — authentic Gurung teahouse culture",
      "Dark skies above the clouds — some of Nepal's finest stargazing",
      "Fully supported by local teahouses — community trek",
    ],
    gallery: ['/Annapurna Base Camp.jpg', '/Manang.jpg'],
    gettingThere: "Drive or take a local bus from Pokhara to Nayapul (1.5 hours). The trek begins from Nayapul via Tikhedhunga and Ulleri to Ghorepani. Most trekkers do the circuit anti-clockwise (Nayapul → Ghorepani → Tadapani → Ghandruk → Nayapul).",
    permits: "ACAP (Annapurna Conservation Area Project) permit + TIMS card. Purchased at the ACAP office in Pokhara or from the checkpoint at Birethanti.",
    bestTime: "October–November (crystal-clear post-monsoon skies) and March–May (rhododendrons in bloom). Avoid the monsoon months June–September — trails are muddy and views are cloud-blocked.",
    coordinates: [28.4024, 83.6913],
    relatedSlugs: ['annapurna-base-camp', 'pokhara', 'upper-mustang'],
    bookingCategory: 'trekking',
    communityTags: ['Poon Hill', 'Sunrise', 'Annapurna'],
  },
  {
    slug: 'upper-mustang',
    name: 'Upper Mustang',
    devanagari: 'माथिल्लो मुस्ताङ',
    region: 'Gandaki',
    type: 'Culture',
    elevation: '3,840 m',
    image: '/Upper Mustang.jpg',
    duration: '10–14 days',
    difficulty: 'Moderate',
    bestSeason: 'May–Oct',
    description: 'The forbidden kingdom — ancient cave dwellings, Buddhist monasteries and Tibetan culture.',
    stories: 97,
    overview: [
      "Upper Mustang is the last kingdom — a semi-autonomous enclave of Nepal that was closed to all foreigners until 1992. The former kingdom of Lo sits in a rain shadow beyond the Annapurna-Dhaulagiri barrier, where the monsoon cannot reach, and the landscape is pure Tibetan plateau: eroded ochre and crimson cliffs, sky burial sites, ancient cave dwellings, and monasteries draped in prayer flags.",
      "The restricted area permit ($500 for 10 days) limits visitor numbers and has preserved an authenticity that has vanished from most of the Himalaya. Lo Manthang — the walled medieval capital — has a population of around 1,000, a fourteenth-century palace, and monasteries containing some of the finest Tibetan Buddhist art outside Lhasa.",
      "Upper Mustang is one of the world's great archaeological sites. The cave cities carved into 50 million-year-old cliffs, discovered by Italian archaeologist Mauro Tosi in the 1990s, contain human remains, manuscripts, and murals dating back 3,000 years.",
    ],
    highlights: [
      "Lo Manthang — a perfectly preserved walled medieval city, the ancient capital",
      "Chhoser cave monastery — 1,000-year-old complex of 400 cliff-side caves",
      "Kagbeni — the gateway town at the confluence of two river canyons",
      "Eroded cliffs in ochre, red, and white — a Martian landscape unlike anywhere in Nepal",
      "Tibetan Buddhist monasteries with 14th–17th century murals",
      "Restricted permit zone — one of Nepal's most exclusive and authentic treks",
    ],
    gallery: ['/Manang.jpg'],
    gettingThere: "Fly Kathmandu → Jomsom (35 min, weather permitting), then jeep to Kagbeni. Alternatively, the road from Pokhara via Beni is now fully motorable to Jomsom (7–8 hours on a rough but scenic road).",
    permits: "Restricted Area Permit: $500 for 10 days, $50/day additional. ACAP permit also required. Permits must be obtained through a government-registered trekking agency — independent trekking is not permitted.",
    bestTime: "May–October is the only viable window — the Jomsom airstrip and mountain roads are often closed by snow November–April. Unlike the rest of Nepal, the rain shadow means monsoon (June–September) is actually a good time here.",
    coordinates: [28.9984, 83.8584],
    relatedSlugs: ['pokhara', 'annapurna-base-camp', 'poon-hill'],
    bookingCategory: 'trekking',
    communityTags: ['Upper Mustang', 'Remote', 'Culture'],
  },
  {
    slug: 'rara-lake',
    name: 'Rara Lake',
    devanagari: 'रारा ताल',
    region: 'Karnali',
    type: 'Nature',
    elevation: '2,990 m',
    image: '/Rara Lake.jpg',
    duration: '7–10 days',
    difficulty: 'Moderate',
    bestSeason: 'Sep–Nov',
    description: "Nepal's largest lake — pristine turquoise water nestled amid cedar forests, rarely visited.",
    stories: 58,
    overview: [
      "Rara Lake is Nepal's greatest secret — a turquoise jewel of 10.8 km² set in the remote Karnali Province at 2,990 metres, encircled by Himalayan cedar, Himalayan pine, and juniper forest, with snowfields glittering above. It is one of the most pristine lakes in Asia.",
      "The journey to reach Rara is itself an adventure: a flight from Kathmandu to the tiny mountain airstrip at Talcha, or a multi-day overland journey through some of Nepal's most remote terrain. The effort filters out the casual visitor entirely — on a busy day, Rara Lake might see a dozen trekkers.",
      "The lake is the centrepiece of Rara National Park, home to red pandas, Himalayan black bears, ghoral, musk deer, and over 200 bird species. The cultural fabric of Magar and Brahmin villages around the lake rim adds a human warmth to an already extraordinary landscape.",
    ],
    highlights: [
      "Nepal's largest lake — 10.8 km² of pristine turquoise water at 2,990 m",
      "Rara National Park — red pandas, Himalayan black bears, musk deer",
      "No roads, no crowds — one of Nepal's genuinely wild destinations",
      "Chuchemara Danda ridge — panoramic views over the lake and distant Himalaya",
      "Traditional Magar and Brahmin villages around the lake rim",
      "One of Asia's most pristine alpine lakes",
    ],
    gallery: [],
    gettingThere: "Fly Kathmandu → Talcha Airport (Mugu, near Rara). Flights are weather-dependent and not always reliable. Alternatively, bus to Jumla, then trek 3–4 days. The overland approach through Karnali Province is an adventure in itself.",
    permits: "Rara National Park entry permit (obtainable at park entrance).",
    bestTime: "September–November for post-monsoon clarity, stable weather, and the most vibrant lake colour. April–May for spring flowers. Winter (December–February) sees snowfall and very cold temperatures — access can be difficult.",
    coordinates: [29.5264, 82.0879],
    relatedSlugs: ['langtang-valley', 'upper-mustang', 'chitwan'],
    bookingCategory: 'trekking',
    communityTags: ['Rara', 'Remote', 'Nature'],
  },
  {
    slug: 'langtang-valley',
    name: 'Langtang Valley',
    devanagari: 'लाङटाङ उपत्यका',
    region: 'Bagmati',
    type: 'Trek',
    elevation: '3,430 m',
    image: '/Langtang Valley.jpg',
    duration: '7–10 days',
    difficulty: 'Moderate',
    bestSeason: 'Oct–Nov, Mar–Apr',
    description: 'The valley of glaciers — a high-altitude trek just hours from Kathmandu.',
    stories: 143,
    overview: [
      "Langtang Valley is Nepal's most accessible high-altitude trek — just 65 km north of Kathmandu as the crow flies, yet a world apart from the city. The valley runs northeast between Nepal and Tibet, shadowed by Langtang Lirung (7,227 m), with glaciers descending from the peaks to within a stone's throw of the trail.",
      "The 2015 earthquake sent a catastrophic landslide onto Langtang village, killing 350 people including many trekking guides and their families. The valley has rebuilt with extraordinary resilience. Trekking here is a meaningful act of solidarity — every rupee spent in the teahouses and lodges supports the community's recovery.",
      "The trek's highlight is Kyanjin Gompa at 3,870 m — a working Buddhist monastery with a famous yak cheese factory, and the launch point for several high-altitude day trips including the challenging Tserko Ri (4,984 m) with views into Tibet.",
    ],
    highlights: [
      "Kyanjin Gompa — a working Buddhist monastery at 3,870 m with yak cheese factory",
      "Tserko Ri at 4,984 m — challenging day summit with views deep into Tibet",
      "Gosaikunda Lake — a sacred glacial lake on a demanding side route",
      "Langtang Lirung — a 7,227 m glacier-draped peak towering above the valley floor",
      "Community resilience — rebuilt after the 2015 earthquake by the local Tamang community",
      "Accessible in 7 hours from Kathmandu — ideal for shorter itineraries",
    ],
    gallery: ['/Gosaikunda Lake.jpg'],
    gettingThere: "Drive from Kathmandu to Syabrubesi (7–8 hours via Dhunche). Local buses depart from Kathmandu's Machhapokhari bus station. Jeeps are faster and more comfortable.",
    permits: "Langtang National Park permit + TIMS card. Obtainable at the park checkpoint at Dhunche or in Kathmandu.",
    bestTime: "October–November for clear skies and stable conditions. March–May for rhododendrons in bloom below 3,500 m. The valley is cold in winter but technically accessible — spring and autumn are overwhelmingly preferred.",
    coordinates: [28.2143, 85.5150],
    relatedSlugs: ['everest-base-camp', 'kathmandu', 'poon-hill'],
    bookingCategory: 'trekking',
    communityTags: ['Langtang', 'Resilience', 'History'],
  },
  {
    slug: 'bhaktapur',
    name: 'Bhaktapur',
    devanagari: 'भक्तपुर',
    region: 'Bagmati',
    type: 'City',
    elevation: '1,400 m',
    image: '/Bhaktapur.jpg',
    duration: '1 day',
    difficulty: 'Easy',
    bestSeason: 'Year-round',
    description: 'A medieval city frozen in time — Newari woodwork, pottery squares, and Durbar Square.',
    stories: 176,
    overview: [
      "Bhaktapur — City of Devotees — is the best-preserved medieval city in the Kathmandu Valley and arguably in all of South Asia. Declared a UNESCO World Heritage Site in 1979, it is largely free of the traffic and commercial noise that have transformed Kathmandu. Walking into Bhaktapur's Durbar Square feels, in the best possible way, like walking into the 16th century.",
      "The city's Newari craftsmen are still active: potters at Pottery Square (Kumale Tole) have shaped clay here for centuries; wood carvers maintain the tradition in peacock-window courts; women in traditional dhaka dress weave in doorways. The 55-Window Palace and the Golden Gate represent the apex of Newari woodcarving art.",
      "Bhaktapur's cuisine is also distinct from Kathmandu: juju dhau (king yoghurt), bara (lentil pancakes), and sanya khuna (cold fish curry) are Bhaktapur originals that you will not find prepared the same way anywhere else.",
    ],
    highlights: [
      "Nyatapola Temple — Nepal's tallest pagoda at 5 storeys, perfectly preserved",
      "55-Window Palace — a masterwork of Newari woodcarving at Durbar Square",
      "Pottery Square — a living craft tradition, potters shaping clay as they have for centuries",
      "Golden Gate — the gilded entrance to the Palace of 55 Windows",
      "Taumadhi Square — Nepal's finest medieval cityscape",
      "Juju dhau — Bhaktapur's famous king yoghurt, served in clay cups",
    ],
    gallery: [],
    gettingThere: "Local bus No. 2 from Kathmandu's Ratna Park bus station, or taxi from Thamel (30–45 min). An entry fee is payable at the main gate.",
    permits: "Bhaktapur entry fee: approximately $15 for foreign nationals. Some tour packages include this.",
    bestTime: "Year-round. Bisket Jatra (April, Nepali New Year) and Indra Jatra are spectacular festivals. Avoid major festival days if you want quiet exploration — or embrace them for the experience.",
    coordinates: [27.6727, 85.4280],
    relatedSlugs: ['kathmandu', 'boudhanath-stupa', 'pashupatinath'],
    bookingCategory: 'taxi',
    communityTags: ['Bhaktapur', 'Culture', 'Newari'],
  },
  {
    slug: 'boudhanath-stupa',
    name: 'Boudhanath Stupa',
    devanagari: 'बौद्धनाथ स्तूप',
    region: 'Kathmandu',
    type: 'Spiritual',
    elevation: '1,400 m',
    image: '/Boudhanath Stupa.jpg',
    duration: 'Half day',
    difficulty: 'Easy',
    bestSeason: 'Year-round',
    description: "One of the world's largest stupas, encircled by Tibetan monasteries and prayer wheels.",
    stories: 201,
    overview: [
      "Boudhanath is one of the largest spherical stupas in the world — a 36-metre dome encircled by the all-seeing eyes of Buddha, draped in prayer flags that snap in the Kathmandu wind. It is the most important Tibetan Buddhist monument outside Tibet and a UNESCO World Heritage Site.",
      "Over fifty Tibetan monasteries ring the stupa, and the community that has grown around it is one of the world's great concentrations of Tibetan Buddhist culture. Monks in burgundy robes, traders selling thangka paintings and singing bowls, pilgrims spinning prayer wheels — the kora (circumambulation) is one of Asia's most moving daily rituals.",
      "At dawn or dusk, with butter lamps lit and the mountain light catching the gilded spire, Boudhanath belongs to a category of places that can change how you understand the world.",
    ],
    highlights: [
      "36-metre stupa dome — one of the world's largest Buddhist monuments",
      "All-seeing eyes of Buddha — the famous painted gaze on the four sides of the spire",
      "50+ Tibetan monasteries in the surrounding quarter",
      "Dawn kora (circumambulation) with monks and pilgrims",
      "Rooftop cafés with stupa views — some of the best coffee in Nepal",
      "Tibetan crafts quarter — authentic thangka paintings, singing bowls, and butter lamps",
    ],
    gallery: [],
    gettingThere: "6 km east of Kathmandu's Thamel district. Taxi takes 20–30 minutes. Can be combined with Pashupatinath Temple, which is 1 km away.",
    permits: null,
    bestTime: "Year-round. Buddha Jayanti (Buddha's Birthday, May full moon) is the most atmospheric day of the year. Early morning (6–8 am) is when the kora is most active and peaceful.",
    coordinates: [27.7215, 85.3620],
    relatedSlugs: ['pashupatinath', 'kathmandu', 'bhaktapur'],
    bookingCategory: 'taxi',
    communityTags: ['Boudhanath', 'Buddhist', 'Spirituality'],
  },
  {
    slug: 'pashupatinath',
    name: 'Pashupatinath Temple',
    devanagari: 'पशुपतिनाथ मन्दिर',
    region: 'Kathmandu',
    type: 'Spiritual',
    elevation: '1,300 m',
    image: '/Pashupatinath Temple.jpg',
    duration: 'Half day',
    difficulty: 'Easy',
    bestSeason: 'Year-round',
    description: "Nepal's most sacred Hindu temple on the Bagmati river, with burning ghats and ancient ritual.",
    stories: 168,
    overview: [
      "Pashupatinath is Nepal's most sacred Hindu temple and one of the most significant Shaivite pilgrimage sites in the world. Built beside the Bagmati River — a tributary of the Ganges — the temple complex encompasses 492 temples, shrines, and ashrams spanning fifteen centuries of devotion.",
      "The riverside ghats are where Kathmandu's Hindus are cremated. It is one of those places where the cycle of life and death is not hidden but openly, matter-of-factly present — bodies burning on the stone platforms, families gathered in grief, sadhus meditating on the banks. It can be confronting, and it is also profoundly real.",
      "Non-Hindus cannot enter the main temple, but may freely explore the surrounding complex, including the Mrigasthali forest of ash-covered Shiva shrines, the Panch Dewal temples, and the viewpoint above the ghats. The evening aarti fire ceremony on the river is one of Kathmandu's most beautiful rituals.",
    ],
    highlights: [
      "Sacred burning ghats on the Bagmati River — a profound meditation on mortality",
      "Ash-covered sadhus — holy men who receive visitors at the temple precincts",
      "Gilded pagoda roof and silver-plated doors of the main Pashupati shrine",
      "Mrigasthali forest — a Shiva shrine complex in ancient deer park",
      "Evening aarti — fire-offering ceremony at dusk on the riverbank",
      "One of the most important Shaivite pilgrimage sites in the world",
    ],
    gallery: [],
    gettingThere: "5 km east of central Kathmandu, adjacent to Boudhanath (1 km away). Taxi from Thamel takes 15–20 minutes.",
    permits: "Non-Hindus pay a $15 fee to access the outer complex and river viewpoints. Hindus enter free.",
    bestTime: "Year-round. Maha Shivaratri (February/March) draws millions of pilgrims and is the most dramatic day to visit — sadhus from across South Asia gather on the ghats.",
    coordinates: [27.7105, 85.3486],
    relatedSlugs: ['boudhanath-stupa', 'kathmandu', 'bhaktapur'],
    bookingCategory: 'taxi',
    communityTags: ['Pashupatinath', 'Spirituality', 'Kathmandu'],
  },
  {
    slug: 'chitwan',
    name: 'Chitwan National Park',
    devanagari: 'चितवन राष्ट्रिय निकुञ्ज',
    region: 'Bagmati',
    type: 'Wildlife',
    elevation: '150 m',
    image: '/Chitwan National Park.jpg',
    duration: '2–3 days',
    difficulty: 'Easy',
    bestSeason: 'Oct–Mar',
    description: 'Home to Bengal tigers, one-horned rhinos, and elephant safaris through dense jungle.',
    stories: 234,
    overview: [
      "Chitwan National Park is one of Asia's finest wildlife sanctuaries — a UNESCO World Heritage Site protecting a rare surviving stretch of the Terai lowland: tropical forests, elephant-grass floodplains, and wetlands that once stretched across the entire subcontinent. It is Nepal's oldest and most celebrated national park.",
      "The park shelters approximately 700 one-horned rhinoceroses — among the world's largest protected populations — and around 120 Bengal tigers. The density of megafauna here is extraordinary: jeep safaris regularly encounter rhinos at close range, and elephant grass walks at dawn often yield multiple sightings.",
      "The Tharu people, whose ancestral homeland surrounds the park, have developed an extraordinary cultural programme around sustainable wildlife tourism — from traditional Stick Dance performances to dugout canoe rides on the Rapti River.",
    ],
    highlights: [
      "One-horned rhinoceros — Chitwan holds ~700, one of the world's largest populations",
      "Bengal tiger — approximately 120 individuals within the park",
      "Jeep safari and jungle walk — encounter megafauna on foot with naturalist guides",
      "Rapti River canoe — spot gharial crocodiles and kingfishers from the water",
      "Tharu cultural village — traditional Stick Dance and village walks",
      "650+ bird species including the endangered Bengal Florican",
    ],
    gallery: ['/Bardia National Park.jpg'],
    gettingThere: "Drive from Kathmandu to Sauraha (4–5 hours via tourist bus or private vehicle). Fly to Bharatpur Airport (25 min from Kathmandu) then transfer to Sauraha (30 min by road).",
    permits: "Chitwan National Park entry fee: $30 per day for foreign nationals.",
    bestTime: "October–March for the best wildlife sightings — vegetation thins and animals concentrate near water sources. The park partially closes in mid-May when the monsoon makes vegetation too dense for wildlife spotting.",
    coordinates: [27.5291, 84.3542],
    relatedSlugs: ['rara-lake', 'kathmandu', 'pokhara'],
    bookingCategory: 'safari',
    communityTags: ['Chitwan', 'Wildlife', 'Photography'],
  },
];

// ── Mountains & Treks ──────────────────────────────────────────────────────

export interface MountainPeak {
  name: string;
  devanagari: string;
  elevation: string;
  description: string;
  note: string;
  icon: string;
  photo: string;
}

export interface TrekRoute {
  name: string;
  duration: string;
  description: string;
  difficulty: string;
  season: string;
  note: string;
  icon: string;
  photo: string;
  href: string;
}

export interface Viewpoint {
  name: string;
  elevation: string;
  note: string;
  icon: string;
  photo: string;
  href: string;
}

// Ordered by elevation, highest first
export const MOUNTAIN_PEAKS: MountainPeak[] = [
  {
    name: "Everest",
    devanagari: "सगरमाथा",
    elevation: "8,848.86 m",
    description: "The Goddess of the Sky — Earth's highest summit, dominating the Khumbu skyline across the border of Nepal and Tibet.",
    note: "World's Highest",
    icon: "🏔️",
    photo: "/Kala Patthar.jpg",
  },
  {
    name: "Kanchenjunga",
    devanagari: "कञ्चनजङ्घा",
    elevation: "8,586 m",
    description: "Five Treasures of Snow — the world's third-highest peak, straddling Nepal's far-eastern border with India in one of Asia's most remote ranges.",
    note: "Third Highest",
    icon: "⛰️",
    photo: "/Mera Peak BC.jpg",
  },
  {
    name: "Lhotse",
    devanagari: "ल्होत्से",
    elevation: "8,516 m",
    description: "The South Face — arguably the greatest sheer wall on Earth: 3,200 m of near-vertical rock and ice, sharing the South Col with Everest.",
    note: "Fourth Highest",
    icon: "🏔️",
    photo: "/Everest BC South.jpg",
  },
  {
    name: "Makalu",
    devanagari: "मकालु",
    elevation: "8,485 m",
    description: "The Black Giant — a near-perfect pyramid rising from the remote Barun Valley, Nepal's most isolated 8,000-metre peak.",
    note: "Barun Valley",
    icon: "🏔️",
    photo: "/Makalu Base Camp.jpg",
  },
  {
    name: "Cho Oyu",
    devanagari: "चो ओयु",
    elevation: "8,188 m",
    description: "The Turquoise Goddess — the sixth-highest peak on Earth, rising from the Nepal-Tibet border above the Gokyo Valley.",
    note: "Tibet Border",
    icon: "⛰️",
    photo: "/Gokyo Ri.jpg",
  },
  {
    name: "Dhaulagiri I",
    devanagari: "धौलागिरी",
    elevation: "8,167 m",
    description: "The White Mountain — a massive, isolated summit rising in sheer solitude above the world's deepest river gorge, the Kali Gandaki.",
    note: "White Mountain",
    icon: "❄️",
    photo: "/Dhaulagiri BC.jpg",
  },
  {
    name: "Manaslu",
    devanagari: "मनास्लु",
    elevation: "8,163 m",
    description: "Spirit of the Mountain — the eighth-highest peak globally and the centrepiece of Nepal's most beautiful restricted-area circuit trek.",
    note: "Circuit Trek",
    icon: "🗻",
    photo: "/Manaslu Base Camp.jpg",
  },
  {
    name: "Annapurna I",
    devanagari: "अन्नपूर्णा",
    elevation: "8,091 m",
    description: "Full of Food — the highest fatality-rate 8,000er, towering over the city of Pokhara and guarding the world's deepest gorge.",
    note: "Most Formidable",
    icon: "⛰️",
    photo: "/Annapurna Base Camp.jpg",
  },
];

export const TREK_ROUTES: TrekRoute[] = [
  {
    name: "Everest Base Camp",
    duration: "14–18 days",
    description: "The world's most celebrated high-altitude trek — threading through Sherpa settlements and glacial moraine to the foot of Earth's highest summit.",
    difficulty: "Challenging",
    season: "Oct–Nov · Mar–May",
    note: "Classic",
    icon: "🎒",
    photo: "/everest-base-camp.jpg",
    href: "/destinations/everest-base-camp",
  },
  {
    name: "Annapurna Circuit",
    duration: "15–20 days",
    description: "A complete circumnavigation of the Annapurna Massif, crossing the 5,416 m Thorong La Pass through landscapes that shift from tropical to arctic.",
    difficulty: "Moderate–Challenging",
    season: "Oct–Nov · Mar–May",
    note: "Epic Loop",
    icon: "🔄",
    photo: "/Thorong La Pass.jpg",
    href: "/destinations/annapurna-base-camp",
  },
  {
    name: "Langtang Trek",
    duration: "7–10 days",
    description: "Nepal's most accessible high-altitude valley — just 65 km north of Kathmandu — a landscape of glaciers, yak pastures, and Tibetan monastery life.",
    difficulty: "Moderate",
    season: "Oct–Nov · Mar–May",
    note: "Near KTM",
    icon: "🌿",
    photo: "/Langtang Valley.jpg",
    href: "/destinations/langtang-valley",
  },
  {
    name: "Manaslu Circuit",
    duration: "14–16 days",
    description: "A permit-restricted loop around the world's 8th-highest peak — raw terrain, ancient monasteries, and almost none of the Everest crowds.",
    difficulty: "Challenging",
    season: "Sep–Nov",
    note: "Remote",
    icon: "🗺️",
    photo: "/Manaslu Base Camp.jpg",
    href: "/booking?cat=trekking",
  },
  {
    name: "Poon Hill Trek",
    duration: "4–5 days",
    description: "The ideal first Himalayan trek — a short, achievable circuit above the rhododendron treeline with some of the most celebrated sunrise views in Asia.",
    difficulty: "Easy–Moderate",
    season: "Oct–Nov · Mar–May",
    note: "Best Sunrise",
    icon: "🌄",
    photo: "/Poon Hill.jpg",
    href: "/destinations/poon-hill",
  },
  {
    name: "Three Passes Trek",
    duration: "20+ days",
    description: "The ultimate Khumbu challenge — crossing Kongma La, Cho La, and Renjo La to link the Everest, Gokyo, and Khumbu valleys in one expedition.",
    difficulty: "Expert",
    season: "Oct–Nov",
    note: "Advanced",
    icon: "🚩",
    photo: "/Gokyo Ri.jpg",
    href: "/destinations/everest-base-camp",
  },
  {
    name: "Gosaikunda Trek",
    duration: "4–5 days",
    description: "A sacred glacial lake at 4,380 m, revered by Hindus and Buddhists alike — approached through dense rhododendron and bamboo forests from Langtang.",
    difficulty: "Moderate",
    season: "Sep–Nov · Mar–May",
    note: "Sacred Lake",
    icon: "🙏",
    photo: "/Gosaikunda Lake.jpg",
    href: "/destinations/langtang-valley",
  },
  {
    name: "Upper Mustang Trek",
    duration: "10–14 days",
    description: "The forbidden kingdom — a rain-shadow Tibetan plateau of eroded cliffs, medieval cave monasteries, and Lo Manthang's perfectly preserved walled city.",
    difficulty: "Moderate",
    season: "May–Oct",
    note: "Restricted",
    icon: "🏜️",
    photo: "/Upper Mustang.jpg",
    href: "/destinations/upper-mustang",
  },
];

export const VIEWPOINTS: Viewpoint[] = [
  {
    name: "Kala Patthar",
    elevation: "5,644 m",
    note: "Best Everest view",
    icon: "👁️",
    photo: "/Kala Patthar.jpg",
    href: "/destinations/everest-base-camp",
  },
  {
    name: "Gokyo Ri",
    elevation: "5,357 m",
    note: "Four 8,000ers visible",
    icon: "🏞️",
    photo: "/Gokyo Ri.jpg",
    href: "/destinations/everest-base-camp",
  },
  {
    name: "Everest Base Camp",
    elevation: "5,364 m",
    note: "Khumbu Glacier",
    icon: "⛺",
    photo: "/Everest BC South.jpg",
    href: "/destinations/everest-base-camp",
  },
  {
    name: "Annapurna BC",
    elevation: "4,130 m",
    note: "360° amphitheatre",
    icon: "⛺",
    photo: "/Annapurna BC.jpg",
    href: "/destinations/annapurna-base-camp",
  },
  {
    name: "Thorong La Pass",
    elevation: "5,416 m",
    note: "Annapurna Circuit",
    icon: "🚩",
    photo: "/Thorong La Pass.jpg",
    href: "/destinations/annapurna-base-camp",
  },
  {
    name: "Gorak Shep",
    elevation: "5,140 m",
    note: "Last stop before EBC",
    icon: "🏕️",
    photo: "/Gorak Shep.jpg",
    href: "/destinations/everest-base-camp",
  },
];
