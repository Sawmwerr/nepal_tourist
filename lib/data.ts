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
    tags: ['Sherpa', 'Namche', 'Homestay'],
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

export interface Destination {
  slug: string;
  name: string;
  region: string;
  type: string;
  elevation: string;
  image: string;
  duration: string;
  difficulty: string;
  bestSeason: string;
  description: string;
  stories: number;
}

export const DESTINATION_LIST: Destination[] = [
  { slug: 'everest-base-camp', name: 'Everest Base Camp', region: 'Khumbu', type: 'Trek', elevation: '5,364 m', image: '/everest-base-camp.jpg', duration: '14–18 days', difficulty: 'Challenging', bestSeason: 'Oct–Nov, Mar–Apr', description: 'The iconic trek to the foot of the world\'s tallest peak through Sherpa villages and glacial valleys.', stories: 284 },
  { slug: 'annapurna-base-camp', name: 'Annapurna Base Camp', region: 'Gandaki', type: 'Trek', elevation: '4,130 m', image: '/Annapurna Base Camp.jpg', duration: '7–10 days', difficulty: 'Moderate', bestSeason: 'Oct–Nov, Mar–Apr', description: 'A natural amphitheatre of 360° Himalayan giants — one of the most dramatic landscapes on Earth.', stories: 218 },
  { slug: 'kathmandu', name: 'Kathmandu', region: 'Bagmati', type: 'City', elevation: '1,400 m', image: '/Kathmandu.jpg', duration: '3–5 days', difficulty: 'Easy', bestSeason: 'Year-round', description: 'Ancient temples, living goddesses, and seven UNESCO World Heritage Sites in one extraordinary valley.', stories: 341 },
  { slug: 'pokhara', name: 'Pokhara', region: 'Gandaki', type: 'City', elevation: '822 m', image: '/Pokhara.jpg', duration: '2–4 days', difficulty: 'Easy', bestSeason: 'Oct–Apr', description: 'Mirror lakes reflecting the Annapurna range at dawn — Nepal\'s adventure capital.', stories: 297 },
  { slug: 'poon-hill', name: 'Poon Hill', region: 'Gandaki', type: 'Trek', elevation: '3,210 m', image: '/Poon Hill.jpg', duration: '4–5 days', difficulty: 'Easy', bestSeason: 'Oct–Nov, Mar–Apr', description: 'Nepal\'s most famous sunrise viewpoint — golden light flooding across Annapurna and Dhaulagiri.', stories: 189 },
  { slug: 'upper-mustang', name: 'Upper Mustang', region: 'Gandaki', type: 'Culture', elevation: '3,840 m', image: '/Upper Mustang.jpg', duration: '10–14 days', difficulty: 'Moderate', bestSeason: 'May–Oct', description: 'The forbidden kingdom — ancient cave dwellings, Buddhist monasteries and Tibetan culture.', stories: 97 },
  { slug: 'rara-lake', name: 'Rara Lake', region: 'Karnali', type: 'Nature', elevation: '2,990 m', image: '/Rara Lake.jpg', duration: '7–10 days', difficulty: 'Moderate', bestSeason: 'Sep–Nov', description: 'Nepal\'s largest lake — pristine turquoise water nestled amid cedar forests, rarely visited.', stories: 58 },
  { slug: 'langtang-valley', name: 'Langtang Valley', region: 'Bagmati', type: 'Trek', elevation: '3,430 m', image: '/Langtang Valley.jpg', duration: '7–10 days', difficulty: 'Moderate', bestSeason: 'Oct–Nov, Mar–Apr', description: 'The valley of glaciers — a high-altitude trek just hours from Kathmandu.', stories: 143 },
  { slug: 'bhaktapur', name: 'Bhaktapur', region: 'Bagmati', type: 'City', elevation: '1,400 m', image: '/Bhaktapur.jpg', duration: '1 day', difficulty: 'Easy', bestSeason: 'Year-round', description: 'A medieval city frozen in time — Newari woodwork, pottery squares, and Durbar Square.', stories: 176 },
  { slug: 'boudhanath-stupa', name: 'Boudhanath Stupa', region: 'Kathmandu', type: 'Spiritual', elevation: '1,400 m', image: '/Boudhanath Stupa.jpg', duration: 'Half day', difficulty: 'Easy', bestSeason: 'Year-round', description: 'One of the world\'s largest stupas, encircled by Tibetan monasteries and prayer wheels.', stories: 201 },
  { slug: 'pashupatinath', name: 'Pashupatinath Temple', region: 'Kathmandu', type: 'Spiritual', elevation: '1,300 m', image: '/Pashupatinath Temple.jpg', duration: 'Half day', difficulty: 'Easy', bestSeason: 'Year-round', description: 'Nepal\'s most sacred Hindu temple on the Bagmati river, with burning ghats and ancient ritual.', stories: 168 },
  { slug: 'chitwan', name: 'Chitwan National Park', region: 'Bagmati', type: 'Wildlife', elevation: '150 m', image: '/Chitwan National Park.jpg', duration: '2–3 days', difficulty: 'Easy', bestSeason: 'Oct–Mar', description: 'Home to Bengal tigers, one-horned rhinos, and elephant safaris through dense jungle.', stories: 234 },
];

// ── Mountains & Treks ──────────────────────────────────────────────────────

export interface MountainPeak {
  name: string;
  elevation: string;
  note: string;
  icon: string;
}

export interface TrekRoute {
  name: string;
  duration: string;
  note: string;
  icon: string;
  href: string;
}

export interface Viewpoint {
  name: string;
  elevation: string;
  note: string;
  icon: string;
  href: string;
}

export const MOUNTAIN_PEAKS: MountainPeak[] = [
  { name: "Everest",      elevation: "8,848 m", note: "World's Highest",  icon: "🏔️" },
  { name: "Annapurna I",  elevation: "8,091 m", note: "Most Deadly",      icon: "⛰️" },
  { name: "Manaslu",      elevation: "8,163 m", note: "Circuit Trek",     icon: "🗻" },
  { name: "Dhaulagiri I", elevation: "8,167 m", note: "White Mountain",   icon: "❄️" },
  { name: "Makalu",       elevation: "8,485 m", note: "Barun Valley",     icon: "🏔️" },
  { name: "Cho Oyu",      elevation: "8,188 m", note: "Tibet Border",     icon: "⛰️" },
];

export const TREK_ROUTES: TrekRoute[] = [
  { name: "Everest Base Camp",  duration: "14–18 days", note: "Classic",      icon: "🎒", href: "/destinations/everest-base-camp" },
  { name: "Annapurna Circuit",  duration: "15–20 days", note: "Epic Loop",    icon: "🔄", href: "/mountains" },
  { name: "Langtang Trek",      duration: "7–10 days",  note: "Near KTM",     icon: "🌿", href: "/destinations/langtang-valley" },
  { name: "Manaslu Circuit",    duration: "14–16 days", note: "Remote",       icon: "🗺️", href: "/mountains" },
  { name: "Poon Hill Trek",     duration: "4–5 days",   note: "Best Sunrise", icon: "🌄", href: "/destinations/poon-hill" },
  { name: "Three Passes Trek",  duration: "20+ days",   note: "Advanced",     icon: "🚩", href: "/mountains" },
  { name: "Gosaikunda Trek",    duration: "4–5 days",   note: "Sacred Lake",  icon: "🙏", href: "/mountains" },
  { name: "Upper Mustang Trek", duration: "10–14 days", note: "Restricted",   icon: "🏜️", href: "/destinations/upper-mustang" },
];

export const VIEWPOINTS: Viewpoint[] = [
  { name: "Kala Patthar",      elevation: "5,644 m", note: "Best Everest view",     icon: "👁️", href: "/mountains" },
  { name: "Gokyo Ri",          elevation: "5,357 m", note: "Four 8,000ers visible", icon: "🏞️", href: "/mountains" },
  { name: "Everest Base Camp", elevation: "5,364 m", note: "Khumbu Glacier",        icon: "⛺", href: "/destinations/everest-base-camp" },
  { name: "Annapurna BC",      elevation: "4,130 m", note: "360° amphitheatre",     icon: "⛺", href: "/destinations/annapurna-base-camp" },
  { name: "Thorong La Pass",   elevation: "5,416 m", note: "Annapurna Circuit",     icon: "🚩", href: "/mountains" },
  { name: "Gorak Shep",        elevation: "5,140 m", note: "Last stop before EBC",  icon: "🏕️", href: "/mountains" },
];
