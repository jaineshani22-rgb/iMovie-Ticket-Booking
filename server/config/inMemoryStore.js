const bcrypt = require('bcryptjs');

// Pre-hashed passwords for seed accounts
// 'admin123' and 'user123'
const defaultAdminPassHash = bcrypt.hashSync('admin123', 10);
const defaultUserPassHash = bcrypt.hashSync('user123', 10);

const INITIAL_USERS = [
  {
    _id: '65f1a0000000000000000001',
    username: 'Admin Manager',
    email: 'admin@imovies.com',
    password: defaultAdminPassHash,
    role: 'admin',
    favorites: ['65f1b0000000000000000001', '65f1b0000000000000000021'],
    createdAt: new Date().toISOString()
  },
  {
    _id: '65f1a0000000000000000002',
    username: 'Tanishq Pardeshi',
    email: 'user@imovies.com',
    password: defaultUserPassHash,
    role: 'user',
    favorites: ['65f1b0000000000000000001', '65f1b0000000000000000022'],
    createdAt: new Date().toISOString()
  }
];

const INITIAL_CINEMAS = [
  {
    _id: 'cin_us_nyc_01',
    name: 'iMovies Lincoln Square IMAX',
    chain: 'iMovies VIP',
    country: 'US',
    countryName: 'United States',
    city: 'New York',
    address: '1998 Broadway, New York, NY 10023',
    screens: 12,
    formats: ['IMAX 70mm Laser', 'Dolby Cinema', 'VIP Recliners'],
    currency: 'USD',
    currencySymbol: '$',
    basePrice: 22,
    amenities: ['Heated Recliners', 'Full Bar Lounge', 'In-Seat Dining', 'Laser Projection'],
    rating: 4.9
  },
  {
    _id: 'cin_us_nyc_02',
    name: 'iMovies Times Square Dolby Palace',
    chain: 'iMovies VIP',
    country: 'US',
    countryName: 'United States',
    city: 'New York',
    address: '234 W 42nd St, New York, NY 10036',
    screens: 10,
    formats: ['Dolby Atmos', '4DX', 'RealD 3D'],
    currency: 'USD',
    currencySymbol: '$',
    basePrice: 20,
    amenities: ['Motorized Recliners', 'Gourmet Concessions', 'Dolby Vision HDR'],
    rating: 4.8
  },
  {
    _id: 'cin_us_la_01',
    name: 'iMovies Century City Premiere',
    chain: 'iMovies VIP',
    country: 'US',
    countryName: 'United States',
    city: 'Los Angeles',
    address: '10250 Santa Monica Blvd, Los Angeles, CA 90067',
    screens: 14,
    formats: ['IMAX Laser', 'Dolby Cinema', 'ScreenX'],
    currency: 'USD',
    currencySymbol: '$',
    basePrice: 21,
    amenities: ['Director Suites', 'Sommelier Selection', 'Valet Parking'],
    rating: 4.9
  },
  {
    _id: 'cin_gb_lon_01',
    name: 'iMovies Odeon Luxe Leicester Square',
    chain: 'iMovies VIP',
    country: 'GB',
    countryName: 'United Kingdom',
    city: 'London',
    address: '24-26 Leicester Square, London WC2H 7LQ',
    screens: 8,
    formats: ['Dolby Cinema', 'IMAX Laser', 'Royal Box'],
    currency: 'GBP',
    currencySymbol: '£',
    basePrice: 18,
    amenities: ['Oscar Wilde Bar', 'Luxury Reclining Seats', 'Dolby Atmos'],
    rating: 4.9
  },
  {
    _id: 'cin_gb_lon_02',
    name: 'iMovies BFI IMAX Southbank',
    chain: 'iMovies VIP',
    country: 'GB',
    countryName: 'United Kingdom',
    city: 'London',
    address: '1 Charlie Chaplin Walk, Waterloo, London SE1 8XR',
    screens: 1,
    formats: ['1.43:1 Giant IMAX Laser', '12-Channel Sound'],
    currency: 'GBP',
    currencySymbol: '£',
    basePrice: 22,
    amenities: ['Largest Screen in UK', 'Next-Gen Laser 4K', 'Premium Circle'],
    rating: 5.0
  },
  {
    _id: 'cin_in_mum_01',
    name: 'iMovies PVR ICON Lower Parel',
    chain: 'iMovies VIP',
    country: 'IN',
    countryName: 'India',
    city: 'Mumbai',
    address: 'High Street Phoenix, Senapati Bapat Marg, Lower Parel, Mumbai 400013',
    screens: 9,
    formats: ['IMAX Laser with Atmos', '4DX Motion', 'Gold Class Recliner'],
    currency: 'INR',
    currencySymbol: '₹',
    basePrice: 450,
    amenities: ['Plush Leather Recliners', 'Chef-Crafted Menu', 'Exclusive VIP Lounge'],
    rating: 4.9
  },
  {
    _id: 'cin_in_mum_02',
    name: 'iMovies INOX Megaplex Malad',
    chain: 'iMovies VIP',
    country: 'IN',
    countryName: 'India',
    city: 'Mumbai',
    address: 'Inorbit Mall, Link Road, Malad West, Mumbai 400064',
    screens: 11,
    formats: ['IMAX Laser', 'ScreenX 270°', 'MX4D', 'INSIGNIA VIP'],
    currency: 'INR',
    currencySymbol: '₹',
    basePrice: 380,
    amenities: ['Live Kitchen Gourmet Food', 'Butler on Call', 'Dolby Atmos Sound'],
    rating: 4.8
  },
  {
    _id: 'cin_in_del_01',
    name: 'iMovies Directors Cut Vasant Kunj',
    chain: 'iMovies VIP',
    country: 'IN',
    countryName: 'India',
    city: 'Delhi',
    address: 'Ambience Mall, Nelson Mandela Marg, Vasant Kunj, New Delhi 110070',
    screens: 6,
    formats: ['Platinum Suites', 'Dolby Atmos Laser', 'Dine-In Theater'],
    currency: 'INR',
    currencySymbol: '₹',
    basePrice: 650,
    amenities: ['180° Fully Reclining Beds', 'Curated Wine & Dine', 'Concierge Service'],
    rating: 5.0
  },
  {
    _id: 'cin_ca_tor_01',
    name: 'iMovies Scotiabank Theatre IMAX',
    chain: 'iMovies VIP',
    country: 'CA',
    countryName: 'Canada',
    city: 'Toronto',
    address: '259 Richmond St W, Toronto, ON M5V 3M6',
    screens: 14,
    formats: ['IMAX Laser', 'UltraAVX', 'D-BOX Motion'],
    currency: 'CAD',
    currencySymbol: 'CA$',
    basePrice: 20,
    amenities: ['UltraAVX Atmos', 'VIP Lounge', 'Reserved Seating'],
    rating: 4.8
  },
  {
    _id: 'cin_au_syd_01',
    name: 'iMovies IMAX Sydney Harbour',
    chain: 'iMovies VIP',
    country: 'AU',
    countryName: 'Australia',
    city: 'Sydney',
    address: 'The Ribbon, 31 Wheat Rd, Darling Harbour NSW 2000',
    screens: 4,
    formats: ['World-Class IMAX 4K Laser', 'Full Recliners', 'Private Couches'],
    currency: 'AUD',
    currencySymbol: 'A$',
    basePrice: 28,
    amenities: ['Panoramic Harbour Views', 'Premium Pods', 'Gourmet Bar'],
    rating: 5.0
  },
  {
    _id: 'cin_jp_tok_01',
    name: 'iMovies TOHO Cinemas Roppongi Hills',
    chain: 'iMovies VIP',
    country: 'JP',
    countryName: 'Japan',
    city: 'Tokyo',
    address: '6-10-2 Roppongi, Minato-ku, Tokyo 106-0032',
    screens: 9,
    formats: ['MediaMation MX4D', 'TCX Dolby Atmos', 'Premier Luxury Box'],
    currency: 'JPY',
    currencySymbol: '¥',
    basePrice: 2200,
    amenities: ['Leather Luxury Box Seats', 'Pristine Cleanliness', 'English Subtitle Support'],
    rating: 4.9
  },
  {
    _id: 'cin_sg_sin_01',
    name: 'iMovies Shaw Theatres Lido IMAX',
    chain: 'iMovies VIP',
    country: 'SG',
    countryName: 'Singapore',
    city: 'Singapore',
    address: '350 Orchard Road, 5th/6th Floor Shaw House, Singapore 238868',
    screens: 11,
    formats: ['IMAX with Laser', 'Lumiere VIP Dining', 'Dolby Atmos'],
    currency: 'SGD',
    currencySymbol: 'S$',
    basePrice: 19,
    amenities: ['Electric Recliners', 'Complimentary Beverages', 'Orchard Road Access'],
    rating: 4.8
  },
  {
    _id: 'cin_ae_dxb_01',
    name: 'iMovies Reel Cinemas Dubai Mall',
    chain: 'iMovies VIP',
    country: 'AE',
    countryName: 'United Arab Emirates',
    city: 'Dubai',
    address: 'The Dubai Mall, Financial Centre Rd, Downtown Dubai',
    screens: 26,
    formats: ['Platinum Suites', 'IMAX Laser', 'ScreenX', 'Guy Fieri Dine-In'],
    currency: 'AED',
    currencySymbol: 'AED ',
    basePrice: 75,
    amenities: ['Private Butler Service', 'Blankets & Pillows', '5-Star Dining'],
    rating: 5.0
  },
  {
    _id: 'cin_de_ber_01',
    name: 'iMovies Zoo Palast Berlin',
    chain: 'de',
    country: 'DE',
    countryName: 'Germany',
    city: 'Berlin',
    address: 'Hardenbergstraße 29a, 10623 Berlin',
    screens: 7,
    formats: ['Dolby Atmos Heritage', 'Club Sessel Recliners', '4K Laser'],
    currency: 'EUR',
    currencySymbol: '€',
    basePrice: 17,
    amenities: ['Historic Grand Hall', 'Cocktail Service at Seat', 'Berlinale Red Carpet Venue'],
    rating: 4.9
  }
];

const INITIAL_MOVIES = [
  // ----------------------------------------------------
  // HOLLYWOOD BLOCKBUSTERS
  // ----------------------------------------------------
  {
    _id: '65f1b0000000000000000001',
    title: 'Dune: Part Two',
    industry: 'Hollywood',
    description:
      'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family, facing a choice between love and the fate of the universe.',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    duration: 166,
    posterUrl: 'https://image.tmdb.org/t/p/w780/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/xOMo8BRK7PfcJv9JCnx7s5200SV.jpg',
    releaseDate: '2024-03-01T00:00:00.000Z',
    ticketPrice: 320,
    theater: 'iMovies IMAX Laser - Screen 1',
    rating: 8.8,
    language: 'English',
    trailerKey: 'Way9Dexny3w',
    director: 'Denis Villeneuve',
    category: 'now_playing',
    cast: [
      { name: 'Timothée Chalamet', character: 'Paul Atreides', profileUrl: 'https://image.tmdb.org/t/p/w185/BE2sdjpgsa2rNTFa66f7upkaOP.jpg' },
      { name: 'Zendaya', character: 'Chani', profileUrl: 'https://image.tmdb.org/t/p/w185/r3A7evB5Ac2y59mQ1Vj8X8n6b1s.jpg' },
      { name: 'Rebecca Ferguson', character: 'Lady Jessica', profileUrl: 'https://image.tmdb.org/t/p/w185/6NR8eT4e6fGv7X2r9s3a2mK2.jpg' },
      { name: 'Austin Butler', character: 'Feyd-Rautha', profileUrl: 'https://image.tmdb.org/t/p/w185/2c0O3B1vQv6jC4f8pL1m.jpg' }
    ],
    showtimes: ['10:30 AM', '02:15 PM', '06:30 PM', '10:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000002',
    title: 'Oppenheimer',
    industry: 'Hollywood',
    description:
      'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II at Los Alamos.',
    genre: ['Biography', 'Drama', 'History'],
    duration: 180,
    posterUrl: 'https://image.tmdb.org/t/p/w780/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg',
    releaseDate: '2023-07-21T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.9,
    language: 'English',
    trailerKey: 'uYPbbksJxIg',
    director: 'Christopher Nolan',
    category: 'popular',
    cast: [
      { name: 'Cillian Murphy', character: 'J. Robert Oppenheimer', profileUrl: 'https://image.tmdb.org/t/p/w185/360cLng6IRio437n3eXwhXp00fS.jpg' },
      { name: 'Emily Blunt', character: 'Katherine Oppenheimer', profileUrl: 'https://image.tmdb.org/t/p/w185/nPJXaRMtxvgBq15Toq6y7u9.jpg' },
      { name: 'Matt Damon', character: 'Leslie Groves', profileUrl: 'https://image.tmdb.org/t/p/w185/elSlNg0VXUD2Kcx14k4v8p9.jpg' },
      { name: 'Robert Downey Jr.', character: 'Lewis Strauss', profileUrl: 'https://image.tmdb.org/t/p/w185/1YjdSym1jA7LnUXw32i49V5.jpg' }
    ],
    showtimes: ['11:00 AM', '03:00 PM', '07:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000003',
    title: 'Spider-Man: Across the Spider-Verse',
    industry: 'Hollywood',
    description:
      'Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence, and must redefine what it means to be a hero.',
    genre: ['Animation', 'Action', 'Sci-Fi'],
    duration: 140,
    posterUrl: 'https://image.tmdb.org/t/p/w780/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg',
    releaseDate: '2023-06-02T00:00:00.000Z',
    ticketPrice: 250,
    theater: 'iMovies 4DX - Screen 3',
    rating: 8.7,
    language: 'English',
    trailerKey: 'cqGjhVJWtEg',
    director: 'Joaquim Dos Santos, Kemp Powers',
    category: 'popular',
    cast: [
      { name: 'Shameik Moore', character: 'Miles Morales (voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/u7cK6t9oJc2a1.jpg' },
      { name: 'Hailee Steinfeld', character: 'Gwen Stacy (voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/4vB8y5.jpg' },
      { name: 'Oscar Isaac', character: 'Miguel O’Hara (voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/8yP3V2.jpg' }
    ],
    showtimes: ['10:00 AM', '01:30 PM', '05:00 PM', '08:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000004',
    title: 'Deadpool & Wolverine',
    industry: 'Hollywood',
    description:
      'A listless Wade Wilson toils in civilian life with his days as the morally flexible mercenary Deadpool behind him. But when his homeworld faces an existential threat, he reluctantly suits up with a brooding Wolverine.',
    genre: ['Action', 'Comedy', 'Sci-Fi'],
    duration: 127,
    posterUrl: 'https://image.tmdb.org/t/p/w780/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/9l1eZiJHmhr5jA625IRGQnTgVTc.jpg',
    releaseDate: '2024-07-26T00:00:00.000Z',
    ticketPrice: 340,
    theater: 'iMovies IMAX Laser - Screen 1',
    rating: 8.6,
    language: 'English',
    trailerKey: '73_1biulkYk',
    director: 'Shawn Levy',
    category: 'now_playing',
    cast: [
      { name: 'Ryan Reynolds', character: 'Wade Wilson / Deadpool', profileUrl: 'https://image.tmdb.org/t/p/w185/h1co81Qa92CY0j1X5sM.jpg' },
      { name: 'Hugh Jackman', character: 'Logan / Wolverine', profileUrl: 'https://image.tmdb.org/t/p/w185/bX5m6u7O8.jpg' },
      { name: 'Emma Corrin', character: 'Cassandra Nova', profileUrl: 'https://image.tmdb.org/t/p/w185/5m6u7O8bX.jpg' }
    ],
    showtimes: ['11:15 AM', '02:45 PM', '06:15 PM', '09:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000005',
    title: 'Gladiator II',
    industry: 'Hollywood',
    description:
      'Years after witnessing the death of revered hero Maximus, Lucius must enter the Colosseum after his home is conquered by tyrannical Emperors who rule Rome with an iron fist.',
    genre: ['Action', 'Drama', 'Adventure'],
    duration: 148,
    posterUrl: 'https://image.tmdb.org/t/p/w780/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/euYIwmwkmz95mnXvufEmbL6vavr.jpg',
    releaseDate: '2024-11-22T00:00:00.000Z',
    ticketPrice: 350,
    theater: 'iMovies 70mm IMAX - Screen 1',
    rating: 8.5,
    language: 'English',
    trailerKey: '4rgYUipGJNo',
    director: 'Ridley Scott',
    category: 'upcoming',
    cast: [
      { name: 'Paul Mescal', character: 'Lucius Verus', profileUrl: 'https://image.tmdb.org/t/p/w185/mK7v6a1.jpg' },
      { name: 'Pedro Pascal', character: 'Marcus Acacius', profileUrl: 'https://image.tmdb.org/t/p/w185/7y5p2.jpg' },
      { name: 'Denzel Washington', character: 'Macrinus', profileUrl: 'https://image.tmdb.org/t/p/w185/9u4v1.jpg' }
    ],
    showtimes: ['12:30 PM', '04:15 PM', '08:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000006',
    title: 'Inside Out 2',
    industry: 'Hollywood',
    description:
      'Teenager Riley experiences a sudden demolition of Headquarters to make room for brand-new Emotions! Joy, Sadness, Anger, Fear and Disgust aren’t sure how to feel when Anxiety turns up.',
    genre: ['Animation', 'Comedy', 'Adventure'],
    duration: 96,
    posterUrl: 'https://image.tmdb.org/t/p/w780/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/xg27NrXi7EgQx7AcQfr7498QWWx.jpg',
    releaseDate: '2024-06-14T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.4,
    language: 'English',
    trailerKey: 'LEjhY15eCx0',
    director: 'Kelsey Mann',
    category: 'popular',
    cast: [
      { name: 'Amy Poehler', character: 'Joy (voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/3v8K.jpg' },
      { name: 'Maya Hawke', character: 'Anxiety (voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/9v7L.jpg' }
    ],
    showtimes: ['10:00 AM', '01:00 PM', '04:00 PM', '07:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000007',
    title: 'Interstellar',
    industry: 'Hollywood',
    description:
      'When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft along with a team of researchers to find a new planet for humans.',
    genre: ['Sci-Fi', 'Drama', 'Adventure'],
    duration: 169,
    posterUrl: 'https://image.tmdb.org/t/p/w780/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/xJHokMbljvjADYdit5fK5VQsXEG.jpg',
    releaseDate: '2014-11-07T00:00:00.000Z',
    ticketPrice: 350,
    theater: 'iMovies 70mm IMAX - Screen 1',
    rating: 9.0,
    language: 'English',
    trailerKey: 'zSWdZVtXT7E',
    director: 'Christopher Nolan',
    category: 'popular',
    cast: [
      { name: 'Matthew McConaughey', character: 'Joseph Cooper', profileUrl: 'https://image.tmdb.org/t/p/w185/sY2wa5.jpg' },
      { name: 'Anne Hathaway', character: 'Amelia Brand', profileUrl: 'https://image.tmdb.org/t/p/w185/tLKit.jpg' }
    ],
    showtimes: ['11:30 AM', '03:30 PM', '07:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000008',
    title: 'The Batman',
    industry: 'Hollywood',
    description:
      'When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate the city’s hidden corruption and question his family’s involvement.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 176,
    posterUrl: 'https://image.tmdb.org/t/p/w780/74xTEgt7R36Fpooo50r9T25onhq.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/b0PlSFdDwbyK0cf5RxwDpaOJQvQ.jpg',
    releaseDate: '2022-03-04T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'iMovies IMAX Laser - Screen 1',
    rating: 8.3,
    language: 'English',
    trailerKey: 'mqqft2x_Aa4',
    director: 'Matt Reeves',
    category: 'popular',
    cast: [
      { name: 'Robert Pattinson', character: 'Bruce Wayne / Batman', profileUrl: 'https://image.tmdb.org/t/p/w185/8A.jpg' },
      { name: 'Zoë Kravitz', character: 'Selina Kyle', profileUrl: 'https://image.tmdb.org/t/p/w185/9B.jpg' }
    ],
    showtimes: ['12:00 PM', '04:00 PM', '08:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000009',
    title: 'Wicked',
    industry: 'Hollywood',
    description:
      'The untold story of the witches of Oz, centering on Elphaba, a green-skinned woman who becomes the Wicked Witch of the West, and Glinda, an exceptionally popular blonde woman.',
    genre: ['Musical', 'Fantasy', 'Romance'],
    duration: 160,
    posterUrl: 'https://image.tmdb.org/t/p/w780/xDGbZ0JJ3mYaGKy4Nzd9Kph6M9L.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/uKb22E5ww9bX9hv8pf8P8b7t4jB.jpg',
    releaseDate: '2024-11-27T00:00:00.000Z',
    ticketPrice: 310,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.7,
    language: 'English',
    trailerKey: '6COmYeLsz4c',
    director: 'Jon M. Chu',
    category: 'upcoming',
    cast: [
      { name: 'Cynthia Erivo', character: 'Elphaba Thropp', profileUrl: 'https://image.tmdb.org/t/p/w185/erivo.jpg' },
      { name: 'Ariana Grande', character: 'Glinda Upland', profileUrl: 'https://image.tmdb.org/t/p/w185/grande.jpg' }
    ],
    showtimes: ['01:30 PM', '05:30 PM', '09:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000010',
    title: 'Top Gun: Maverick',
    industry: 'Hollywood',
    description:
      'After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when leading TOP GUNs elite graduates.',
    genre: ['Action', 'Drama'],
    duration: 130,
    posterUrl: 'https://image.tmdb.org/t/p/w780/62HCnUTziyWcpDaBO2i1DX17ljH.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/odJ4hx6g6vBt4lBWKFD1tI8WS4x.jpg',
    releaseDate: '2022-05-27T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.4,
    language: 'English',
    trailerKey: 'qSqVVqua428',
    director: 'Joseph Kosinski',
    category: 'popular',
    cast: [
      { name: 'Tom Cruise', character: 'Pete "Maverick" Mitchell', profileUrl: 'https://image.tmdb.org/t/p/w185/cruise.jpg' },
      { name: 'Miles Teller', character: 'Bradley "Rooster" Bradshaw', profileUrl: 'https://image.tmdb.org/t/p/w185/teller.jpg' }
    ],
    showtimes: ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000011',
    title: 'Avatar: The Way of Water',
    industry: 'Hollywood',
    description:
      'Set more than a decade after the events of the first film, Jake Sully and Neytiri have formed a family and are doing everything to stay together on Pandora.',
    genre: ['Sci-Fi', 'Adventure', 'Action'],
    duration: 192,
    posterUrl: 'https://image.tmdb.org/t/p/w780/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/s16H6tpK2utvwDtzZIMQvRjrqqw.jpg',
    releaseDate: '2022-12-16T00:00:00.000Z',
    ticketPrice: 380,
    theater: 'iMovies IMAX 3D Laser - Screen 1',
    rating: 8.7,
    language: 'English',
    trailerKey: 'd9MyW72ELq0',
    director: 'James Cameron',
    category: 'popular',
    cast: [
      { name: 'Sam Worthington', character: 'Jake Sully', profileUrl: 'https://image.tmdb.org/t/p/w185/worthington.jpg' },
      { name: 'Zoe Saldaña', character: 'Neytiri', profileUrl: 'https://image.tmdb.org/t/p/w185/saldana.jpg' }
    ],
    showtimes: ['11:00 AM', '03:15 PM', '07:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000012',
    title: 'Inception',
    industry: 'Hollywood',
    description:
      'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
    genre: ['Sci-Fi', 'Action', 'Mystery'],
    duration: 148,
    posterUrl: 'https://image.tmdb.org/t/p/w780/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8ZTVqvKDQ8emSGUEMjsS4yHAwrp.jpg',
    releaseDate: '2010-07-16T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'iMovies 70mm IMAX - Screen 1',
    rating: 8.9,
    language: 'English',
    trailerKey: 'YoHD9XEInc0',
    director: 'Christopher Nolan',
    category: 'popular',
    cast: [
      { name: 'Leonardo DiCaprio', character: 'Dom Cobb', profileUrl: 'https://image.tmdb.org/t/p/w185/dicaprio.jpg' },
      { name: 'Joseph Gordon-Levitt', character: 'Arthur', profileUrl: 'https://image.tmdb.org/t/p/w185/levitt.jpg' }
    ],
    showtimes: ['12:15 PM', '04:30 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000013',
    title: 'Barbie',
    industry: 'Hollywood',
    description:
      'Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they discover the joys and perils of living among humans.',
    genre: ['Comedy', 'Fantasy', 'Adventure'],
    duration: 114,
    posterUrl: 'https://image.tmdb.org/t/p/w780/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/nHf61UzkfFno5X1ofIhugCPus2R.jpg',
    releaseDate: '2023-07-21T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.1,
    language: 'English',
    trailerKey: 'pBk4NYhWNMM',
    director: 'Greta Gerwig',
    category: 'popular',
    cast: [
      { name: 'Margot Robbie', character: 'Barbie', profileUrl: 'https://image.tmdb.org/t/p/w185/robbie.jpg' },
      { name: 'Ryan Gosling', character: 'Ken', profileUrl: 'https://image.tmdb.org/t/p/w185/gosling.jpg' }
    ],
    showtimes: ['10:45 AM', '01:45 PM', '05:15 PM', '08:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000014',
    title: 'Alien: Romulus',
    industry: 'Hollywood',
    description:
      'While scavenging the deep ends of a derelict space station, a group of young space colonizers come face to face with the most terrifying life form in the universe.',
    genre: ['Horror', 'Sci-Fi', 'Thriller'],
    duration: 119,
    posterUrl: 'https://image.tmdb.org/t/p/w780/b33nnKl12vfwh49R0n595qygPIS.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/9SSEUrSqhljBMzRe4aBTh17rUaC.jpg',
    releaseDate: '2024-08-16T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'iMovies 4DX - Screen 3',
    rating: 8.2,
    language: 'English',
    trailerKey: 'x0XDEhP4MQs',
    director: 'Fede Álvarez',
    category: 'now_playing',
    cast: [
      { name: 'Cailee Spaeny', character: 'Rain Carradine', profileUrl: 'https://image.tmdb.org/t/p/w185/spaeny.jpg' },
      { name: 'David Jonsson', character: 'Andy', profileUrl: 'https://image.tmdb.org/t/p/w185/jonsson.jpg' }
    ],
    showtimes: ['01:00 PM', '04:45 PM', '08:15 PM', '10:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ----------------------------------------------------
  // BOLLYWOOD BLOCKBUSTERS
  // ----------------------------------------------------
  {
    _id: '65f1b0000000000000000021',
    title: 'Jawan',
    industry: 'Bollywood',
    description:
      'A high-octane action thriller outlining the emotional journey of a prison warden who sets out to rectify the wrongs in the society, with help from his team of women soldiers.',
    genre: ['Action', 'Thriller', 'Drama'],
    duration: 169,
    posterUrl: 'https://image.tmdb.org/t/p/w780/jFt1g94tKBvTE7zU7Ap785k4mS.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/7eR0MsqpE5X4L7uX7yX8qQ.jpg',
    releaseDate: '2023-09-07T00:00:00.000Z',
    ticketPrice: 350,
    theater: 'iMovies PVR ICON Lower Parel',
    rating: 8.6,
    language: 'Hindi',
    trailerKey: 'COv52Qyctws',
    director: 'Atlee',
    category: 'popular',
    cast: [
      { name: 'Shah Rukh Khan', character: 'Vikram Rathore / Azad', profileUrl: 'https://image.tmdb.org/t/p/w185/srk.jpg' },
      { name: 'Nayanthara', character: 'Narmada Rai', profileUrl: 'https://image.tmdb.org/t/p/w185/nayan.jpg' },
      { name: 'Vijay Sethupathi', character: 'Kalee Gaikwad', profileUrl: 'https://image.tmdb.org/t/p/w185/vjs.jpg' },
      { name: 'Deepika Padukone', character: 'Aishwarya Rathore', profileUrl: 'https://image.tmdb.org/t/p/w185/deepika.jpg' }
    ],
    showtimes: ['11:30 AM', '03:15 PM', '07:00 PM', '10:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000022',
    title: 'Stree 2: Sarkate Ka Aatank',
    industry: 'Bollywood',
    description:
      'After the events of Stree, the town of Chanderi faces a new terror in the form of a headless ghost named Sarkata, who abducts modern independent women.',
    genre: ['Comedy', 'Horror', 'Mystery'],
    duration: 147,
    posterUrl: 'https://image.tmdb.org/t/p/w780/h9YvU1rEw6C2ZgL2w4rO3nL0.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mQ7Z2r8u9q.jpg',
    releaseDate: '2024-08-15T00:00:00.000Z',
    ticketPrice: 320,
    theater: 'iMovies INOX Megaplex Malad',
    rating: 8.5,
    language: 'Hindi',
    trailerKey: '_AHfZvh_1gA',
    director: 'Amar Kaushik',
    category: 'now_playing',
    cast: [
      { name: 'Shraddha Kapoor', character: 'The Woman with No Name', profileUrl: 'https://image.tmdb.org/t/p/w185/shraddha.jpg' },
      { name: 'Rajkummar Rao', character: 'Vicky', profileUrl: 'https://image.tmdb.org/t/p/w185/rajkummar.jpg' },
      { name: 'Pankaj Tripathi', character: 'Rudra', profileUrl: 'https://image.tmdb.org/t/p/w185/pankaj.jpg' },
      { name: 'Aparshakti Khurana', character: 'Bittu', profileUrl: 'https://image.tmdb.org/t/p/w185/aparshakti.jpg' }
    ],
    showtimes: ['10:15 AM', '01:45 PM', '05:30 PM', '09:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000023',
    title: 'Kalki 2898 AD',
    industry: 'Bollywood',
    description:
      'Set in a post-apocalyptic world in the year 2898 AD, the story follows a lab-engineered child carrying the reincarnation of Lord Vishnu’s tenth avatar, Kalki.',
    genre: ['Sci-Fi', 'Action', 'Fantasy'],
    duration: 181,
    posterUrl: 'https://image.tmdb.org/t/p/w780/1lxbv4vG1r2p1K7yv2N9w6x.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/kalkibackdrop.jpg',
    releaseDate: '2024-06-27T00:00:00.000Z',
    ticketPrice: 380,
    theater: 'iMovies Directors Cut Vasant Kunj',
    rating: 8.7,
    language: 'Hindi',
    trailerKey: 'kQDd1AhGIHk',
    director: 'Nag Ashwin',
    category: 'now_playing',
    cast: [
      { name: 'Prabhas', character: 'Bhairava', profileUrl: 'https://image.tmdb.org/t/p/w185/prabhas.jpg' },
      { name: 'Amitabh Bachchan', character: 'Ashwatthama', profileUrl: 'https://image.tmdb.org/t/p/w185/amitabh.jpg' },
      { name: 'Deepika Padukone', character: 'SUM-80 / Sumathi', profileUrl: 'https://image.tmdb.org/t/p/w185/deepika.jpg' },
      { name: 'Kamal Haasan', character: 'Supreme Yaskin', profileUrl: 'https://image.tmdb.org/t/p/w185/kamal.jpg' }
    ],
    showtimes: ['10:00 AM', '02:00 PM', '06:00 PM', '09:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000024',
    title: 'Animal',
    industry: 'Bollywood',
    description:
      'A hardened son returns from exile to take bloody vengeance after an assassination attempt on his father, embarking on a path of unrelenting darkness.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 201,
    posterUrl: 'https://image.tmdb.org/t/p/w780/hr9rjhcS0xQ6x5m1L7x7O0.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/animalbackdrop.jpg',
    releaseDate: '2023-12-01T00:00:00.000Z',
    ticketPrice: 340,
    theater: 'iMovies PVR ICON Lower Parel',
    rating: 8.3,
    language: 'Hindi',
    trailerKey: 'Dydmpfo68DA',
    director: 'Sandeep Reddy Vanga',
    category: 'popular',
    cast: [
      { name: 'Ranbir Kapoor', character: 'Ranvijay Singh', profileUrl: 'https://image.tmdb.org/t/p/w185/ranbir.jpg' },
      { name: 'Rashmika Mandanna', character: 'Geetanjali', profileUrl: 'https://image.tmdb.org/t/p/w185/rashmika.jpg' },
      { name: 'Anil Kapoor', character: 'Balbir Singh', profileUrl: 'https://image.tmdb.org/t/p/w185/anil.jpg' },
      { name: 'Bobby Deol', character: 'Abrar Haque', profileUrl: 'https://image.tmdb.org/t/p/w185/bobby.jpg' }
    ],
    showtimes: ['11:00 AM', '03:30 PM', '08:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000025',
    title: 'Pathaan',
    industry: 'Bollywood',
    description:
      'An exiled RAW agent teams up with an ISI operative to take down a rogue former soldier who plans to release a deadly synthetic virus across India.',
    genre: ['Action', 'Thriller', 'Adventure'],
    duration: 146,
    posterUrl: 'https://image.tmdb.org/t/p/w780/m1b9ToB5s8zJ0q7y7O.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/pathaanbackdrop.jpg',
    releaseDate: '2023-01-25T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'iMovies INOX Megaplex Malad',
    rating: 8.2,
    language: 'Hindi',
    trailerKey: 'vqu4zbi42us',
    director: 'Siddharth Anand',
    category: 'popular',
    cast: [
      { name: 'Shah Rukh Khan', character: 'Pathaan', profileUrl: 'https://image.tmdb.org/t/p/w185/srk.jpg' },
      { name: 'Deepika Padukone', character: 'Rubina Mohsin', profileUrl: 'https://image.tmdb.org/t/p/w185/deepika.jpg' },
      { name: 'John Abraham', character: 'Jim', profileUrl: 'https://image.tmdb.org/t/p/w185/john.jpg' }
    ],
    showtimes: ['12:15 PM', '04:00 PM', '07:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000026',
    title: '12th Fail',
    industry: 'Bollywood',
    description:
      'Based on the inspiring real-life journey of IPS officer Manoj Kumar Sharma, who restarts his academic journey despite extreme poverty and obstacles.',
    genre: ['Biography', 'Drama'],
    duration: 147,
    posterUrl: 'https://image.tmdb.org/t/p/w780/4L5x6P7p9o2.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/12thfailbackdrop.jpg',
    releaseDate: '2023-10-27T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'iMovies Directors Cut Vasant Kunj',
    rating: 9.1,
    language: 'Hindi',
    trailerKey: 'we3nfltXPEY',
    director: 'Vidhu Vinod Chopra',
    category: 'popular',
    cast: [
      { name: 'Vikrant Massey', character: 'Manoj Kumar Sharma', profileUrl: 'https://image.tmdb.org/t/p/w185/vikrant.jpg' },
      { name: 'Medha Shankr', character: 'Shraddha Joshi', profileUrl: 'https://image.tmdb.org/t/p/w185/medha.jpg' }
    ],
    showtimes: ['10:30 AM', '02:00 PM', '05:30 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000027',
    title: 'Fighter',
    industry: 'Bollywood',
    description:
      'Top IAF aviators come together to form an elite squadron tasked with counter-terror air strikes and defending the nation’s airspace under intense pressure.',
    genre: ['Action', 'Thriller', 'Drama'],
    duration: 166,
    posterUrl: 'https://image.tmdb.org/t/p/w780/zDZowB8XQzL3b2m.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/fighterbackdrop.jpg',
    releaseDate: '2024-01-25T00:00:00.000Z',
    ticketPrice: 320,
    theater: 'iMovies PVR ICON Lower Parel',
    rating: 8.4,
    language: 'Hindi',
    trailerKey: '6amIq_mP4xM',
    director: 'Siddharth Anand',
    category: 'popular',
    cast: [
      { name: 'Hrithik Roshan', character: 'Shamsher Pathania (Patty)', profileUrl: 'https://image.tmdb.org/t/p/w185/hrithik.jpg' },
      { name: 'Deepika Padukone', character: 'Minal Rathore (Minni)', profileUrl: 'https://image.tmdb.org/t/p/w185/deepika.jpg' },
      { name: 'Anil Kapoor', character: 'Rakesh Jaisingh (Rocky)', profileUrl: 'https://image.tmdb.org/t/p/w185/anil.jpg' }
    ],
    showtimes: ['11:45 AM', '03:15 PM', '06:45 PM', '10:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000028',
    title: 'RRR',
    industry: 'Bollywood',
    description:
      'A fearless warrior on a perilous mission confronts a steely cop serving the British forces in 1920s pre-independent India, leading to an extraordinary friendship and revolution.',
    genre: ['Action', 'Drama', 'History'],
    duration: 187,
    posterUrl: 'https://image.tmdb.org/t/p/w780/nEufeZlyAOLqO2brrs0ye2.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/rrrbackdrop.jpg',
    releaseDate: '2022-03-25T00:00:00.000Z',
    ticketPrice: 360,
    theater: 'iMovies 70mm IMAX - Screen 1',
    rating: 8.9,
    language: 'Hindi',
    trailerKey: 'NgBoMJy386M',
    director: 'S.S. Rajamouli',
    category: 'popular',
    cast: [
      { name: 'N.T. Rama Rao Jr.', character: 'Komaram Bheem', profileUrl: 'https://image.tmdb.org/t/p/w185/ntr.jpg' },
      { name: 'Ram Charan', character: 'Alluri Sitarama Raju', profileUrl: 'https://image.tmdb.org/t/p/w185/ramcharan.jpg' },
      { name: 'Alia Bhatt', character: 'Sita', profileUrl: 'https://image.tmdb.org/t/p/w185/alia.jpg' }
    ],
    showtimes: ['12:00 PM', '04:15 PM', '08:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000029',
    title: 'Bhool Bhulaiyaa 3',
    industry: 'Bollywood',
    description:
      'Rooh Baba travels to the royal kingdom of Raktaghat in Bengal, where he encounters two menacing spirits claiming to be the real Manjulika.',
    genre: ['Comedy', 'Horror', 'Mystery'],
    duration: 158,
    posterUrl: 'https://image.tmdb.org/t/p/w780/q8g7v1.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/bb3backdrop.jpg',
    releaseDate: '2024-11-01T00:00:00.000Z',
    ticketPrice: 330,
    theater: 'iMovies INOX Megaplex Malad',
    rating: 8.2,
    language: 'Hindi',
    trailerKey: 'dGgD-HwS6p0',
    director: 'Anees Bazmee',
    category: 'upcoming',
    cast: [
      { name: 'Kartik Aaryan', character: 'Rooh Baba / Ruhaan', profileUrl: 'https://image.tmdb.org/t/p/w185/kartik.jpg' },
      { name: 'Vidya Balan', character: 'Manjulika', profileUrl: 'https://image.tmdb.org/t/p/w185/vidya.jpg' },
      { name: 'Madhuri Dixit', character: 'Anjulika', profileUrl: 'https://image.tmdb.org/t/p/w185/madhuri.jpg' },
      { name: 'Triptii Dimri', character: 'Meera', profileUrl: 'https://image.tmdb.org/t/p/w185/triptii.jpg' }
    ],
    showtimes: ['01:00 PM', '05:00 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000030',
    title: 'Dunki',
    industry: 'Bollywood',
    description:
      'Four friends from a village in Punjab share a common dream: to travel to England. Hardy promises to take them across borders through unconventional paths.',
    genre: ['Comedy', 'Drama'],
    duration: 161,
    posterUrl: 'https://image.tmdb.org/t/p/w780/wFp3aX8p.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/dunkibackdrop.jpg',
    releaseDate: '2023-12-21T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'iMovies Directors Cut Vasant Kunj',
    rating: 8.0,
    language: 'Hindi',
    trailerKey: '9_T58u2mUo8',
    director: 'Rajkumar Hirani',
    category: 'popular',
    cast: [
      { name: 'Shah Rukh Khan', character: 'Hardy Singh Dhillon', profileUrl: 'https://image.tmdb.org/t/p/w185/srk.jpg' },
      { name: 'Taapsee Pannu', character: 'Manu Randhawa', profileUrl: 'https://image.tmdb.org/t/p/w185/taapsee.jpg' },
      { name: 'Vicky Kaushal', character: 'Sukhi', profileUrl: 'https://image.tmdb.org/t/p/w185/vicky.jpg' }
    ],
    showtimes: ['10:45 AM', '02:15 PM', '06:30 PM', '09:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000031',
    title: 'Shaitaan',
    industry: 'Bollywood',
    description:
      'A family’s quiet weekend retreat turns into a nightmare when they allow a friendly but mysterious stranger into their home, who puts their daughter under a hypnotic spell.',
    genre: ['Horror', 'Thriller', 'Mystery'],
    duration: 132,
    posterUrl: 'https://image.tmdb.org/t/p/w780/z08Yw3k.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/shaitaanbackdrop.jpg',
    releaseDate: '2024-03-08T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'iMovies INOX Megaplex Malad',
    rating: 8.1,
    language: 'Hindi',
    trailerKey: '83w0q6q0_9E',
    director: 'Vikas Bahl',
    category: 'now_playing',
    cast: [
      { name: 'Ajay Devgn', character: 'Kabir Rishi', profileUrl: 'https://image.tmdb.org/t/p/w185/ajay.jpg' },
      { name: 'R. Madhavan', character: 'Vanraj Kashyap', profileUrl: 'https://image.tmdb.org/t/p/w185/madhavan.jpg' },
      { name: 'Jyotika', character: 'Jyoti Rishi', profileUrl: 'https://image.tmdb.org/t/p/w185/jyotika.jpg' }
    ],
    showtimes: ['01:15 PM', '04:45 PM', '08:15 PM', '10:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000032',
    title: 'Brahmāstra: Part One – Shiva',
    industry: 'Bollywood',
    description:
      'A young DJ discovers his strange connection with the element of fire and holds the power to awaken the Brahmāstra, a supernatural weapon capable of destroying the universe.',
    genre: ['Fantasy', 'Action', 'Adventure'],
    duration: 167,
    posterUrl: 'https://image.tmdb.org/t/p/w780/x61w5L9b.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/brahmastrabackdrop.jpg',
    releaseDate: '2022-09-09T00:00:00.000Z',
    ticketPrice: 320,
    theater: 'iMovies PVR ICON Lower Parel',
    rating: 8.2,
    language: 'Hindi',
    trailerKey: 'V5Z77yK29nk',
    director: 'Ayan Mukerji',
    category: 'popular',
    cast: [
      { name: 'Ranbir Kapoor', character: 'Shiva', profileUrl: 'https://image.tmdb.org/t/p/w185/ranbir.jpg' },
      { name: 'Alia Bhatt', character: 'Isha', profileUrl: 'https://image.tmdb.org/t/p/w185/alia.jpg' },
      { name: 'Amitabh Bachchan', character: 'Guru', profileUrl: 'https://image.tmdb.org/t/p/w185/amitabh.jpg' }
    ],
    showtimes: ['11:00 AM', '02:45 PM', '06:15 PM', '09:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ----------------------------------------------------
  // ADDITIONAL HOLLYWOOD MASTERPIECES & BLOCKBUSTERS
  // ----------------------------------------------------
  {
    _id: '65f1b0000000000000000015',
    title: 'The Dark Knight',
    industry: 'Hollywood',
    description:
      'Batman raises the stakes in his war on crime with the help of Lt. Jim Gordon and DA Harvey Dent, but finds himself tested by a criminal mastermind known as the Joker.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 152,
    posterUrl: 'https://image.tmdb.org/t/p/w780/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/hkBaDkMWbLaf8B1rDYRtpwnA0iW.jpg',
    releaseDate: '2008-07-18T00:00:00.000Z',
    ticketPrice: 310,
    theater: 'iMovies 70mm IMAX - Screen 1',
    rating: 9.0,
    language: 'English',
    trailerKey: 'EXeTwQWrcwY',
    director: 'Christopher Nolan',
    category: 'popular',
    cast: [
      { name: 'Christian Bale', character: 'Bruce Wayne / Batman', profileUrl: 'https://image.tmdb.org/t/p/w185/bale.jpg' },
      { name: 'Heath Ledger', character: 'Joker', profileUrl: 'https://image.tmdb.org/t/p/w185/ledger.jpg' },
      { name: 'Aaron Eckhart', character: 'Harvey Dent', profileUrl: 'https://image.tmdb.org/t/p/w185/eckhart.jpg' }
    ],
    showtimes: ['11:30 AM', '03:15 PM', '07:15 PM', '10:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000016',
    title: 'The Shawshank Redemption',
    industry: 'Hollywood',
    description:
      'A banker convicted of uxoricide forms a friendship over a quarter of a century with a hardened convict, while maintaining his innocence and striving for his freedom.',
    genre: ['Drama', 'Crime'],
    duration: 142,
    posterUrl: 'https://image.tmdb.org/t/p/w780/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/kXfqFc22bybGxyIHQI1hchbxN9T.jpg',
    releaseDate: '1994-09-23T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 9.3,
    language: 'English',
    trailerKey: 'PLl99DlL6b4',
    director: 'Frank Darabont',
    category: 'popular',
    cast: [
      { name: 'Tim Robbins', character: 'Andy Dufresne', profileUrl: 'https://image.tmdb.org/t/p/w185/robbins.jpg' },
      { name: 'Morgan Freeman', character: 'Ellis Boyd "Red" Redding', profileUrl: 'https://image.tmdb.org/t/p/w185/freeman.jpg' }
    ],
    showtimes: ['12:00 PM', '04:00 PM', '08:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000017',
    title: 'Pulp Fiction',
    industry: 'Hollywood',
    description:
      'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    genre: ['Crime', 'Drama'],
    duration: 154,
    posterUrl: 'https://image.tmdb.org/t/p/w780/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg',
    releaseDate: '1994-10-14T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'iMovies 4DX - Screen 3',
    rating: 8.9,
    language: 'English',
    trailerKey: 's7EdQ4FqbhY',
    director: 'Quentin Tarantino',
    category: 'popular',
    cast: [
      { name: 'John Travolta', character: 'Vincent Vega', profileUrl: 'https://image.tmdb.org/t/p/w185/travolta.jpg' },
      { name: 'Samuel L. Jackson', character: 'Jules Winnfield', profileUrl: 'https://image.tmdb.org/t/p/w185/jackson.jpg' },
      { name: 'Uma Thurman', character: 'Mia Wallace', profileUrl: 'https://image.tmdb.org/t/p/w185/thurman.jpg' }
    ],
    showtimes: ['01:30 PM', '05:30 PM', '09:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000018',
    title: 'La La Land',
    industry: 'Hollywood',
    description:
      'While navigating their careers in Los Angeles, a pianist and an aspiring actress fall in love while attempting to reconcile their aspirations for the future.',
    genre: ['Musical', 'Romance', 'Comedy'],
    duration: 128,
    posterUrl: 'https://image.tmdb.org/t/p/w780/uDO8zWDhfWwoFdKS4fzkVJt0Rf0.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/qJeU7KM4nTov05k7fauUqLg8cba.jpg',
    releaseDate: '2016-12-09T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.6,
    language: 'English',
    trailerKey: '0pdqf4P9MB8',
    director: 'Damien Chazelle',
    category: 'popular',
    cast: [
      { name: 'Ryan Gosling', character: 'Sebastian Wilder', profileUrl: 'https://image.tmdb.org/t/p/w185/gosling.jpg' },
      { name: 'Emma Stone', character: 'Mia Dolan', profileUrl: 'https://image.tmdb.org/t/p/w185/stone.jpg' }
    ],
    showtimes: ['11:15 AM', '03:00 PM', '06:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000019',
    title: 'Avengers: Endgame',
    industry: 'Hollywood',
    description:
      'After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos’ actions.',
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    duration: 181,
    posterUrl: 'https://image.tmdb.org/t/p/w780/or06FN3Dka5tukK1e9sl16pB3iy.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg',
    releaseDate: '2019-04-26T00:00:00.000Z',
    ticketPrice: 340,
    theater: 'iMovies IMAX Laser - Screen 1',
    rating: 8.7,
    language: 'English',
    trailerKey: 'TcMBFSGVi1c',
    director: 'Anthony Russo, Joe Russo',
    category: 'popular',
    cast: [
      { name: 'Robert Downey Jr.', character: 'Tony Stark / Iron Man', profileUrl: 'https://image.tmdb.org/t/p/w185/rdj.jpg' },
      { name: 'Chris Evans', character: 'Steve Rogers / Captain America', profileUrl: 'https://image.tmdb.org/t/p/w185/evans.jpg' },
      { name: 'Scarlett Johansson', character: 'Natasha Romanoff', profileUrl: 'https://image.tmdb.org/t/p/w185/scarlett.jpg' }
    ],
    showtimes: ['10:45 AM', '02:45 PM', '06:45 PM', '10:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000020',
    title: 'Titanic',
    industry: 'Hollywood',
    description:
      'An aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic in 1912.',
    genre: ['Romance', 'Drama'],
    duration: 194,
    posterUrl: 'https://image.tmdb.org/t/p/w780/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/yDIv0yvLzGk8W8LphrB6Q6H1dZ5.jpg',
    releaseDate: '1997-12-19T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'iMovies 70mm IMAX - Screen 1',
    rating: 8.8,
    language: 'English',
    trailerKey: 'CHekzSiZjrY',
    director: 'James Cameron',
    category: 'popular',
    cast: [
      { name: 'Leonardo DiCaprio', character: 'Jack Dawson', profileUrl: 'https://image.tmdb.org/t/p/w185/dicaprio.jpg' },
      { name: 'Kate Winslet', character: 'Rose DeWitt Bukater', profileUrl: 'https://image.tmdb.org/t/p/w185/winslet.jpg' }
    ],
    showtimes: ['12:30 PM', '04:45 PM', '08:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000001B',
    title: 'Coco',
    industry: 'Hollywood',
    description:
      'Aspiring musician Miguel, confronted with his family’s ancestral ban on music, enters the Land of the Dead to find his great-great-grandfather, a legendary singer.',
    genre: ['Animation', 'Adventure', 'Fantasy'],
    duration: 105,
    posterUrl: 'https://image.tmdb.org/t/p/w780/gGEsBPAijhVUFoiNpgZXqRVWJt2.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/askg3SMvhqEl4OL52YuvdtY40Yb.jpg',
    releaseDate: '2017-11-22T00:00:00.000Z',
    ticketPrice: 250,
    theater: 'iMovies Dolby Atmos - Screen 2',
    rating: 8.8,
    language: 'English',
    trailerKey: 'Rvr68u6k5sI',
    director: 'Lee Unkrich',
    category: 'popular',
    cast: [
      { name: 'Anthony Gonzalez', character: 'Miguel (voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/gonzalez.jpg' },
      { name: 'Gael García Bernal', character: 'Héctor (voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/bernal.jpg' }
    ],
    showtimes: ['10:00 AM', '01:15 PM', '04:30 PM', '07:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000001C',
    title: 'The Conjuring',
    industry: 'Hollywood',
    description:
      'Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their Rhode Island farmhouse.',
    genre: ['Horror', 'Mystery', 'Thriller'],
    duration: 112,
    posterUrl: 'https://image.tmdb.org/t/p/w780/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/m5zk1dE428wB2RkJ7r5q.jpg',
    releaseDate: '2013-07-19T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'iMovies 4DX - Screen 3',
    rating: 8.2,
    language: 'English',
    trailerKey: 'k10ETZ41q5o',
    director: 'James Wan',
    category: 'popular',
    cast: [
      { name: 'Vera Farmiga', character: 'Lorraine Warren', profileUrl: 'https://image.tmdb.org/t/p/w185/farmiga.jpg' },
      { name: 'Patrick Wilson', character: 'Ed Warren', profileUrl: 'https://image.tmdb.org/t/p/w185/wilson.jpg' }
    ],
    showtimes: ['02:00 PM', '06:00 PM', '09:30 PM', '11:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ----------------------------------------------------
  // ADDITIONAL BOLLYWOOD BLOCKBUSTERS & ALL-TIME CLASSICS
  // ----------------------------------------------------
  {
    _id: '65f1b0000000000000000033',
    title: 'Dilwale Dulhania Le Jayenge',
    industry: 'Bollywood',
    description:
      'Raj and Simran meet on a train trip through Europe and fall deeply in love. Raj must win over Simran’s conservative father in Punjab before her arranged marriage takes place.',
    genre: ['Romance', 'Drama'],
    duration: 189,
    posterUrl: 'https://image.tmdb.org/t/p/w780/2CAL2433ZeIihfX1Hb2139CX0pW.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/9079vd2p1b2d3.jpg',
    releaseDate: '1995-10-20T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'iMovies Maratha Mandir Heritage Screen',
    rating: 8.9,
    language: 'Hindi',
    trailerKey: 'c25GKl5VNeY',
    director: 'Aditya Chopra',
    category: 'popular',
    cast: [
      { name: 'Shah Rukh Khan', character: 'Raj Malhotra', profileUrl: 'https://image.tmdb.org/t/p/w185/srk.jpg' },
      { name: 'Kajol', character: 'Simran Singh', profileUrl: 'https://image.tmdb.org/t/p/w185/kajol.jpg' },
      { name: 'Amrish Puri', character: 'Chaudhry Baldev Singh', profileUrl: 'https://image.tmdb.org/t/p/w185/amrish.jpg' }
    ],
    showtimes: ['11:30 AM', '03:45 PM', '08:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000034',
    title: '3 Idiots',
    industry: 'Bollywood',
    description:
      'Two friends embark on a quest for a lost college friend who challenged the rigid Indian education system and inspired them to pursue their real passions.',
    genre: ['Comedy', 'Drama'],
    duration: 170,
    posterUrl: 'https://image.tmdb.org/t/p/w780/66A9MqXGZ71iKxT6w7eM95xH7iL.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/uLtV6LHGZ15oHovb.jpg',
    releaseDate: '2009-12-25T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'iMovies Directors Cut Vasant Kunj',
    rating: 9.0,
    language: 'Hindi',
    trailerKey: 'K0eDlFX9GMc',
    director: 'Rajkumar Hirani',
    category: 'popular',
    cast: [
      { name: 'Aamir Khan', character: 'Ranchoddas "Rancho" Chhanchad', profileUrl: 'https://image.tmdb.org/t/p/w185/aamir.jpg' },
      { name: 'R. Madhavan', character: 'Farhan Qureshi', profileUrl: 'https://image.tmdb.org/t/p/w185/madhavan.jpg' },
      { name: 'Sharman Joshi', character: 'Raju Rastogi', profileUrl: 'https://image.tmdb.org/t/p/w185/sharman.jpg' },
      { name: 'Kareena Kapoor', character: 'Pia Sahastrabuddhe', profileUrl: 'https://image.tmdb.org/t/p/w185/kareena.jpg' }
    ],
    showtimes: ['10:30 AM', '02:15 PM', '06:00 PM', '09:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000035',
    title: 'Dangal',
    industry: 'Bollywood',
    description:
      'Former wrestler Mahavir Singh Phogat and his two wrestler daughters struggle towards glory at the Commonwealth Games in the face of societal oppression.',
    genre: ['Biography', 'Drama'],
    duration: 161,
    posterUrl: 'https://image.tmdb.org/t/p/w780/5G2g01iWj63u0L5qB78o.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/dangalbackdrop.jpg',
    releaseDate: '2016-12-23T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'iMovies PVR ICON Lower Parel',
    rating: 8.8,
    language: 'Hindi',
    trailerKey: 'x_7YlGv9u1g',
    director: 'Nitesh Tiwari',
    category: 'popular',
    cast: [
      { name: 'Aamir Khan', character: 'Mahavir Singh Phogat', profileUrl: 'https://image.tmdb.org/t/p/w185/aamir.jpg' },
      { name: 'Fatima Sana Shaikh', character: 'Geeta Phogat', profileUrl: 'https://image.tmdb.org/t/p/w185/fatima.jpg' },
      { name: 'Sanya Malhotra', character: 'Babita Kumari', profileUrl: 'https://image.tmdb.org/t/p/w185/sanya.jpg' }
    ],
    showtimes: ['11:00 AM', '03:00 PM', '07:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000036',
    title: 'Zindagi Na Milegi Dobara',
    industry: 'Bollywood',
    description:
      'Three friends decide to turn their fantasy road trip across Spain into reality after one of them gets engaged, confronting their deepest fears and rediscovering life.',
    genre: ['Comedy', 'Drama', 'Romance'],
    duration: 155,
    posterUrl: 'https://image.tmdb.org/t/p/w780/b5w4N1M2x4eZ.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/znmdbackdrop.jpg',
    releaseDate: '2011-07-15T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'iMovies INOX Megaplex Malad',
    rating: 8.7,
    language: 'Hindi',
    trailerKey: 'ifIBOKCWEHc',
    director: 'Zoya Akhtar',
    category: 'popular',
    cast: [
      { name: 'Hrithik Roshan', character: 'Arjun Saluja', profileUrl: 'https://image.tmdb.org/t/p/w185/hrithik.jpg' },
      { name: 'Farhan Akhtar', character: 'Imran Qureshi', profileUrl: 'https://image.tmdb.org/t/p/w185/farhan.jpg' },
      { name: 'Abhay Deol', character: 'Kabir Dewan', profileUrl: 'https://image.tmdb.org/t/p/w185/abhay.jpg' },
      { name: 'Katrina Kaif', character: 'Laila', profileUrl: 'https://image.tmdb.org/t/p/w185/katrina.jpg' }
    ],
    showtimes: ['12:15 PM', '04:30 PM', '08:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000037',
    title: 'Andhadhun',
    industry: 'Bollywood',
    description:
      'A series of mysterious events changes the life of a blind pianist who must now report a crime that he should not technically know anything about.',
    genre: ['Crime', 'Thriller', 'Mystery'],
    duration: 139,
    posterUrl: 'https://image.tmdb.org/t/p/w780/dyHAU3x4bW5q.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/andhadhunbackdrop.jpg',
    releaseDate: '2018-10-05T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'iMovies Directors Cut Vasant Kunj',
    rating: 8.8,
    language: 'Hindi',
    trailerKey: '2iVYI99VGaw',
    director: 'Sriram Raghavan',
    category: 'popular',
    cast: [
      { name: 'Ayushmann Khurrana', character: 'Akash Saraf', profileUrl: 'https://image.tmdb.org/t/p/w185/ayushmann.jpg' },
      { name: 'Tabu', character: 'Simi Sinha', profileUrl: 'https://image.tmdb.org/t/p/w185/tabu.jpg' },
      { name: 'Radhika Apte', character: 'Sophie', profileUrl: 'https://image.tmdb.org/t/p/w185/radhika.jpg' }
    ],
    showtimes: ['01:00 PM', '05:15 PM', '09:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000038',
    title: 'Tumbbad',
    industry: 'Bollywood',
    description:
      'A mythological horror story about a family who builds a shrine for Hastar, a monster-god who should never be worshipped, to attain unending gold.',
    genre: ['Horror', 'Fantasy', 'Drama'],
    duration: 104,
    posterUrl: 'https://image.tmdb.org/t/p/w780/6xK4Zt4j9b4y.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/tumbbadbackdrop.jpg',
    releaseDate: '2018-10-12T00:00:00.000Z',
    ticketPrice: 310,
    theater: 'iMovies 4DX - Screen 3',
    rating: 8.7,
    language: 'Hindi',
    trailerKey: 'sN75MPxgvX8',
    director: 'Rahi Anil Barve',
    category: 'now_playing',
    cast: [
      { name: 'Sohum Shah', character: 'Vinayak Rao', profileUrl: 'https://image.tmdb.org/t/p/w185/sohum.jpg' }
    ],
    showtimes: ['02:30 PM', '06:45 PM', '10:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000039',
    title: 'Queen',
    industry: 'Bollywood',
    description:
      'A Delhi girl from a traditional family sets out on a solo honeymoon to Paris and Amsterdam after her fiancé calls off their wedding right before the ceremony.',
    genre: ['Comedy', 'Drama'],
    duration: 144,
    posterUrl: 'https://image.tmdb.org/t/p/w780/queenposter.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/queenbackdrop.jpg',
    releaseDate: '2014-03-07T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'iMovies INOX Megaplex Malad',
    rating: 8.6,
    language: 'Hindi',
    trailerKey: 'KGC6vl3Arf0',
    director: 'Vikas Bahl',
    category: 'popular',
    cast: [
      { name: 'Kangana Ranaut', character: 'Rani Mehra', profileUrl: 'https://image.tmdb.org/t/p/w185/kangana.jpg' },
      { name: 'Rajkummar Rao', character: 'Vijay Dhingra', profileUrl: 'https://image.tmdb.org/t/p/w185/rajkummar.jpg' },
      { name: 'Lisa Haydon', character: 'Vijayalakshmi', profileUrl: 'https://image.tmdb.org/t/p/w185/lisa.jpg' }
    ],
    showtimes: ['11:00 AM', '02:45 PM', '06:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000040',
    title: 'Drishyam 2',
    industry: 'Bollywood',
    description:
      '7 years after the case related to Vijay Salgaonkar and his family was closed, a series of unexpected events brings a dark truth to light under a relentless new IG.',
    genre: ['Crime', 'Thriller', 'Drama'],
    duration: 140,
    posterUrl: 'https://image.tmdb.org/t/p/w780/drishyam2poster.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/drishyam2backdrop.jpg',
    releaseDate: '2022-11-18T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'iMovies PVR ICON Lower Parel',
    rating: 8.6,
    language: 'Hindi',
    trailerKey: 'cxA2y9Tgl7o',
    director: 'Abhishek Pathak',
    category: 'popular',
    cast: [
      { name: 'Ajay Devgn', character: 'Vijay Salgaonkar', profileUrl: 'https://image.tmdb.org/t/p/w185/ajay.jpg' },
      { name: 'Tabu', character: 'Meera Deshmukh', profileUrl: 'https://image.tmdb.org/t/p/w185/tabu.jpg' },
      { name: 'Akshaye Khanna', character: 'Tarun Ahlawat', profileUrl: 'https://image.tmdb.org/t/p/w185/akshaye.jpg' },
      { name: 'Shriya Saran', character: 'Nandini Salgaonkar', profileUrl: 'https://image.tmdb.org/t/p/w185/shriya.jpg' }
    ],
    showtimes: ['01:30 PM', '05:00 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ====================================================
  // ANIMATION MASTERPIECES (Bollywood & Hollywood)
  // ====================================================
  {
    _id: '65f1b000000000000000002b',
    title: 'Ramayana: The Legend of Prince Rama',
    industry: 'Bollywood',
    description:
      'An epic anime adaptation of the timeless Indian epic Ramayana. Prince Rama and Lakshman embark on a heroic quest across ancient Bharat to rescue Sita from Lanka.',
    genre: ['Animation', 'Action', 'Adventure', 'Fantasy', 'Family'],
    duration: 135,
    posterUrl: 'https://image.tmdb.org/t/p/w780/kH4vFw3gCgU2j8K63tUvhbMlhR6.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8pjWFs9bZtgoh5qK4dYcK7bMlhR.jpg',
    releaseDate: '2024-10-18T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'PVR INOX P[XL] & Laser Cinema',
    rating: 9.2,
    language: 'Hindi',
    trailerKey: 'g_8kK8s_B1w',
    director: 'Yugo Sako, Ram Mohan',
    category: 'popular',
    cast: [
      { name: 'Arun Govil', character: 'Prince Rama (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/arungovil.jpg' },
      { name: 'Namrata Sawhney', character: 'Sita (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/namrata.jpg' },
      { name: 'Amrish Puri', character: 'Ravana (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/amrishpuri.jpg' }
    ],
    showtimes: ['10:00 AM', '01:45 PM', '05:30 PM', '09:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000002c',
    title: 'Chaar Sahibzaade',
    industry: 'Bollywood',
    description:
      'The legendary saga of the four sons of Guru Gobind Singh Ji, chronicling their immense courage and supreme sacrifice for justice against tyranny.',
    genre: ['Animation', 'History', 'Action', 'Drama', 'War'],
    duration: 128,
    posterUrl: 'https://image.tmdb.org/t/p/w780/rWJ2iS1P0oE3c0U88s2c1d3p0zS.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5nZbvK8oQ2kU4jH7mZ5p2e6c1.jpg',
    releaseDate: '2014-11-06T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'Cinepolis VIP Screens',
    rating: 8.5,
    language: 'Hindi',
    trailerKey: 'cK6vVp_Z9kM',
    director: 'Harry Baweja',
    category: 'popular',
    cast: [
      { name: 'Om Puri', character: 'Narrator', profileUrl: 'https://image.tmdb.org/t/p/w185/ompuri.jpg' },
      { name: 'Harman Baweja', character: 'Guru Gobind Singh (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/harman.jpg' }
    ],
    showtimes: ['11:15 AM', '03:00 PM', '06:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000002d',
    title: 'Hanuman',
    industry: 'Bollywood',
    description:
      'India’s landmark first full-length 2D animation feature following the heroic childhood and celestial adventures of Lord Hanuman.',
    genre: ['Animation', 'Adventure', 'Fantasy', 'Family'],
    duration: 105,
    posterUrl: 'https://image.tmdb.org/t/p/w780/6E3U9ZkE3qZq5w2Zq6g4h7q6k1r.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mQvK8jL7p8b2c4e6a8r0t2y5.jpg',
    releaseDate: '2005-10-21T00:00:00.000Z',
    ticketPrice: 240,
    theater: 'PVR ICON Gold Screen 2',
    rating: 7.8,
    language: 'Hindi',
    trailerKey: 'nK6p0zZ_8jA',
    director: 'Soumitra Ranade',
    category: 'popular',
    cast: [
      { name: 'Mukesh Khanna', character: 'Hanuman (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/mukesh.jpg' },
      { name: 'Viraj Kapoor', character: 'Young Maruti (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/viraj.jpg' }
    ],
    showtimes: ['10:30 AM', '02:00 PM', '05:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000002e',
    title: 'The Lion King',
    industry: 'Hollywood',
    description:
      'Lion cub and future king Simba is duped into exile by his treacherous uncle Scar, only to return years later to reclaim his rightful throne in Pride Rock.',
    genre: ['Animation', 'Drama', 'Adventure', 'Family', 'Musical'],
    duration: 88,
    posterUrl: 'https://image.tmdb.org/t/p/w780/sKCr78jnEcIGG9POYfZHT3BGq5Y.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2u0u565Z0b8y4Zc6e4e7a8r0t2y.jpg',
    releaseDate: '1994-06-24T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'Dolby Cinema Auditorium 4',
    rating: 8.5,
    language: 'English',
    trailerKey: '4sj1MT05MQI',
    director: 'Roger Allers, Rob Minkoff',
    category: 'popular',
    cast: [
      { name: 'Matthew Broderick', character: 'Adult Simba (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/matthew.jpg' },
      { name: 'James Earl Jones', character: 'Mufasa (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/jamesearljones.jpg' },
      { name: 'Jeremy Irons', character: 'Scar (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/jeremyirons.jpg' }
    ],
    showtimes: ['11:00 AM', '02:15 PM', '05:30 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000002f',
    title: 'Spirited Away',
    industry: 'Hollywood',
    description:
      'During her family’s move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits where humans are changed into beasts.',
    genre: ['Animation', 'Fantasy', 'Adventure', 'Family', 'Mystery'],
    duration: 125,
    posterUrl: 'https://image.tmdb.org/t/p/w780/393mhqrL0hA20eCksk0T9Pq958Y.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mSDmvloA24Q0c2Yc7a8r0t2y.jpg',
    releaseDate: '2001-07-20T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'Regal IMAX Laser & ScreenX',
    rating: 8.6,
    language: 'Japanese',
    trailerKey: 'ByXuk9QqQkk',
    director: 'Hayao Miyazaki',
    category: 'popular',
    cast: [
      { name: 'Rumi Hiiragi', character: 'Chihiro Ogino (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/rumi.jpg' },
      { name: 'Miyu Irino', character: 'Haku (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/miyu.jpg' }
    ],
    showtimes: ['12:30 PM', '04:15 PM', '07:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000030',
    title: 'WALL-E',
    industry: 'Hollywood',
    description:
      'In a distant, abandoned future, a small waste-collecting robot inadvertently embarks on a space journey that will ultimately decide the fate of mankind.',
    genre: ['Animation', 'Sci-Fi', 'Romance', 'Family', 'Adventure'],
    duration: 98,
    posterUrl: 'https://image.tmdb.org/t/p/w780/hbhFnRzzg6ZDmm8YAmxBnQpQIPh.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/fK5ssFhVsUWcfWqCtsf0yM.jpg',
    releaseDate: '2008-06-27T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'BFI IMAX Laser Screen',
    rating: 8.4,
    language: 'English',
    trailerKey: 'alIq_8454BG',
    director: 'Andrew Stanton',
    category: 'popular',
    cast: [
      { name: 'Ben Burtt', character: 'WALL-E / M-O (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/benburtt.jpg' },
      { name: 'Elissa Knight', character: 'EVE (Voice)', profileUrl: 'https://image.tmdb.org/t/p/w185/elissaknight.jpg' }
    ],
    showtimes: ['01:00 PM', '04:30 PM', '08:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ====================================================
  // ROMANCE CLASSICS & MODERN HITS (Bollywood & Hollywood)
  // ====================================================
  {
    _id: '65f1b0000000000000000031',
    title: 'Jab We Met',
    industry: 'Bollywood',
    description:
      'A depressed wealthy businessman’s life is turned upside down when he meets an effervescent, chatterbox Punjabi woman on an overnight train through North India.',
    genre: ['Romance', 'Comedy', 'Drama'],
    duration: 138,
    posterUrl: 'https://image.tmdb.org/t/p/w780/nQG1U3zJ2Bf1pWf2c0iPzK2y5aX.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/kH4vFw3gCgU2j8K63tUvhbMlhR6.jpg',
    releaseDate: '2007-10-26T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'PVR ICON Gold Lounge',
    rating: 8.0,
    language: 'Hindi',
    trailerKey: 'nK6p0zZ_8jA',
    director: 'Imtiaz Ali',
    category: 'popular',
    cast: [
      { name: 'Shahid Kapoor', character: 'Aditya Kashyap', profileUrl: 'https://image.tmdb.org/t/p/w185/shahid.jpg' },
      { name: 'Kareena Kapoor', character: 'Geet Dhillon', profileUrl: 'https://image.tmdb.org/t/p/w185/kareena.jpg' }
    ],
    showtimes: ['11:30 AM', '02:45 PM', '06:15 PM', '09:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000032',
    title: 'Yeh Jawaani Hai Deewani',
    industry: 'Bollywood',
    description:
      'Kabir and Naina bond during a transformative trekking trip to Manali. Years later, their paths cross again at a lavish Udaipur destination wedding.',
    genre: ['Romance', 'Drama', 'Comedy'],
    duration: 160,
    posterUrl: 'https://image.tmdb.org/t/p/w780/g7qYVb0q1vXqK6yq4WzYhYyF5aD.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8pjWFs9bZtgoh5qK4dYcK7bMlhR.jpg',
    releaseDate: '2013-05-31T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'INOX Megaplex Screen 3',
    rating: 7.3,
    language: 'Hindi',
    trailerKey: 'Rbp2FOftJnk',
    director: 'Ayan Mukerji',
    category: 'popular',
    cast: [
      { name: 'Ranbir Kapoor', character: 'Kabir Thapar (Bunny)', profileUrl: 'https://image.tmdb.org/t/p/w185/ranbir.jpg' },
      { name: 'Deepika Padukone', character: 'Naina Talwar', profileUrl: 'https://image.tmdb.org/t/p/w185/deepika.jpg' },
      { name: 'Aditya Roy Kapur', character: 'Avi', profileUrl: 'https://image.tmdb.org/t/p/w185/aditya.jpg' }
    ],
    showtimes: ['10:45 AM', '02:15 PM', '05:45 PM', '09:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000033',
    title: 'Veer-Zaara',
    industry: 'Bollywood',
    description:
      'An Indian Air Force pilot falls deeply in love with a Pakistani heiress. Separated by geopolitical boundaries, their love endures 22 years in prison silence.',
    genre: ['Romance', 'Drama', 'Musical', 'History'],
    duration: 192,
    posterUrl: 'https://image.tmdb.org/t/p/w780/fFk7zK4Z7Xq4sKz3v4g4j5v4k8b.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5nZbvK8oQ2kU4jH7mZ5p2e6c1.jpg',
    releaseDate: '2004-11-12T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'PVR Heritage Screen',
    rating: 7.9,
    language: 'Hindi',
    trailerKey: 'OSaV309V_C4',
    director: 'Yash Chopra',
    category: 'popular',
    cast: [
      { name: 'Shah Rukh Khan', character: 'Squadron Leader Veer Pratap Singh', profileUrl: 'https://image.tmdb.org/t/p/w185/srk.jpg' },
      { name: 'Preity Zinta', character: 'Zaara Haayat Khan', profileUrl: 'https://image.tmdb.org/t/p/w185/preity.jpg' },
      { name: 'Rani Mukerji', character: 'Saamiya Siddiqui', profileUrl: 'https://image.tmdb.org/t/p/w185/rani.jpg' }
    ],
    showtimes: ['01:15 PM', '05:00 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000034',
    title: 'Sita Ramam',
    industry: 'Bollywood',
    description:
      'An orphaned Indian soldier receives an anonymous passionate letter from a woman named Sita Mahalakshmi. When he sets out to find her, love transcends time and war.',
    genre: ['Romance', 'Drama', 'Mystery', 'War'],
    duration: 163,
    posterUrl: 'https://image.tmdb.org/t/p/w780/2t710cvy9iX8Q57u6XnK3jZgQ4V.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mQvK8jL7p8b2c4e6a8r0t2y5.jpg',
    releaseDate: '2022-08-05T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'Cinepolis VIP Auditorium',
    rating: 8.5,
    language: 'Hindi',
    trailerKey: 'q_tG6k29a0A',
    director: 'Hanu Raghavapudi',
    category: 'popular',
    cast: [
      { name: 'Dulquer Salmaan', character: 'Lieutenant Ram', profileUrl: 'https://image.tmdb.org/t/p/w185/dulquer.jpg' },
      { name: 'Mrunal Thakur', character: 'Sita Mahalakshmi / Princess Noor Jahan', profileUrl: 'https://image.tmdb.org/t/p/w185/mrunal.jpg' },
      { name: 'Rashmika Mandanna', character: 'Afreen', profileUrl: 'https://image.tmdb.org/t/p/w185/rashmika.jpg' }
    ],
    showtimes: ['11:45 AM', '03:15 PM', '06:45 PM', '10:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000035',
    title: 'Barfi!',
    industry: 'Bollywood',
    description:
      'A charming, mute and hearing-impaired young man develops deep and emotional bonds with two very different women across Kolkata and the Darjeeling hills.',
    genre: ['Romance', 'Comedy', 'Drama'],
    duration: 151,
    posterUrl: 'https://image.tmdb.org/t/p/w780/e5b6T3sY3Gq0g0Z8v0e6a4b3c2d.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2u0u565Z0b8y4Zc6e4e7a8r0t2y.jpg',
    releaseDate: '2012-09-14T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'iMovies Screen 2 Laser',
    rating: 8.1,
    language: 'Hindi',
    trailerKey: 'y6nK5bVp_Z9',
    director: 'Anurag Basu',
    category: 'popular',
    cast: [
      { name: 'Ranbir Kapoor', character: 'Murphy Johnson (Barfi)', profileUrl: 'https://image.tmdb.org/t/p/w185/ranbir.jpg' },
      { name: 'Priyanka Chopra', character: 'Jhilmil Chatterjee', profileUrl: 'https://image.tmdb.org/t/p/w185/priyanka.jpg' },
      { name: 'Ileana D’Cruz', character: 'Shruti Ghosh', profileUrl: 'https://image.tmdb.org/t/p/w185/ileana.jpg' }
    ],
    showtimes: ['01:30 PM', '05:15 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000036',
    title: 'The Notebook',
    industry: 'Hollywood',
    description:
      'An elderly man reads a passionate love story from his worn notebook to a nursing home resident about two young lovers separated by social class and World War II.',
    genre: ['Romance', 'Drama'],
    duration: 123,
    posterUrl: 'https://image.tmdb.org/t/p/w780/rNzQyW4f8B8cQeg7Dgtuvm04F9B.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mSDmvloA24Q0c2Yc7a8r0t2y.jpg',
    releaseDate: '2004-06-25T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'AMC Empire 25 Screen 6',
    rating: 7.9,
    language: 'English',
    trailerKey: '4M7LIcH8C9U',
    director: 'Nick Cassavetes',
    category: 'popular',
    cast: [
      { name: 'Ryan Gosling', character: 'Noah Calhoun', profileUrl: 'https://image.tmdb.org/t/p/w185/ryangosling.jpg' },
      { name: 'Rachel McAdams', character: 'Allie Hamilton', profileUrl: 'https://image.tmdb.org/t/p/w185/rachelmcadams.jpg' }
    ],
    showtimes: ['02:00 PM', '06:00 PM', '09:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000037',
    title: 'Before Sunrise',
    industry: 'Hollywood',
    description:
      'A young American man and a French woman meet on a train from Budapest and spend one unforgettable, philosophical night wandering the streets of Vienna.',
    genre: ['Romance', 'Drama'],
    duration: 101,
    posterUrl: 'https://image.tmdb.org/t/p/w780/khkJwK8u0xX0T3bW0k6j3a5e8f1.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/fK5ssFhVsUWcfWqCtsf0yM.jpg',
    releaseDate: '1995-01-27T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'Odeon Luxe Leicester Square',
    rating: 8.1,
    language: 'English',
    trailerKey: '9v6X-nS_qQY',
    director: 'Richard Linklater',
    category: 'popular',
    cast: [
      { name: 'Ethan Hawke', character: 'Jesse', profileUrl: 'https://image.tmdb.org/t/p/w185/ethanhawke.jpg' },
      { name: 'Julie Delpy', character: 'Céline', profileUrl: 'https://image.tmdb.org/t/p/w185/juliedelpy.jpg' }
    ],
    showtimes: ['04:00 PM', '07:30 PM', '10:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000038',
    title: 'Past Lives',
    industry: 'Hollywood',
    description:
      'Nora and Hae Sung, two deeply connected childhood friends in Seoul, are wrested apart when her family emigrates. Decades later, they reunite in New York for one fateful week.',
    genre: ['Romance', 'Drama'],
    duration: 105,
    posterUrl: 'https://image.tmdb.org/t/p/w780/k3waqVXSnvCZWfJYNtdamTgTtTA.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/kH4vFw3gCgU2j8K63tUvhbMlhR6.jpg',
    releaseDate: '2023-06-02T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'Filmhouse Cinema Screen 1',
    rating: 7.9,
    language: 'English',
    trailerKey: 'kA244xewjcI',
    director: 'Celine Song',
    category: 'popular',
    cast: [
      { name: 'Greta Lee', character: 'Nora Moon', profileUrl: 'https://image.tmdb.org/t/p/w185/gretalee.jpg' },
      { name: 'Teo Yoo', character: 'Hae Sung', profileUrl: 'https://image.tmdb.org/t/p/w185/teoyoo.jpg' },
      { name: 'John Magaro', character: 'Arthur', profileUrl: 'https://image.tmdb.org/t/p/w185/johnmagaro.jpg' }
    ],
    showtimes: ['01:45 PM', '05:30 PM', '08:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ====================================================
  // BIOGRAPHY & SPORTS INSPIRING Sagas (Bollywood & Hollywood)
  // ====================================================
  {
    _id: '65f1b0000000000000000039',
    title: 'M.S. Dhoni: The Untold Story',
    industry: 'Bollywood',
    description:
      'The inspirational journey of Mahendra Singh Dhoni, from a small-town railway ticket collector in Ranchi to the world champion captain of the Indian cricket team.',
    genre: ['Biography', 'Sports', 'Drama'],
    duration: 190,
    posterUrl: 'https://image.tmdb.org/t/p/w780/rJ9A1wJgY4m2aU6Q2kX8bX3q7kM.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8pjWFs9bZtgoh5qK4dYcK7bMlhR.jpg',
    releaseDate: '2016-09-30T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'PVR IMAX Phoenix Marketcity',
    rating: 8.0,
    language: 'Hindi',
    trailerKey: '6L6XqWoS8tw',
    director: 'Neeraj Pandey',
    category: 'popular',
    cast: [
      { name: 'Sushant Singh Rajput', character: 'Mahendra Singh Dhoni', profileUrl: 'https://image.tmdb.org/t/p/w185/sushant.jpg' },
      { name: 'Kiara Advani', character: 'Sakshi Dhoni', profileUrl: 'https://image.tmdb.org/t/p/w185/kiara.jpg' },
      { name: 'Disha Patani', character: 'Priyanka Jha', profileUrl: 'https://image.tmdb.org/t/p/w185/disha.jpg' }
    ],
    showtimes: ['11:00 AM', '03:15 PM', '07:00 PM', '10:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000003a',
    title: 'Bhaag Milkha Bhaag',
    industry: 'Bollywood',
    description:
      'The true story of the "Flying Sikh" Milkha Singh, who overcame the horrors of the 1947 Partition to become a world-record-breaking Olympian.',
    genre: ['Biography', 'Sports', 'Drama', 'History'],
    duration: 186,
    posterUrl: 'https://image.tmdb.org/t/p/w780/f4iZg6rU8jB7pL1v5n0q8w4b2tG.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5nZbvK8oQ2kU4jH7mZ5p2e6c1.jpg',
    releaseDate: '2013-07-12T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'INOX Laser Palladium',
    rating: 8.2,
    language: 'Hindi',
    trailerKey: '3uICX_mN_1A',
    director: 'Rakeysh Omprakash Mehra',
    category: 'popular',
    cast: [
      { name: 'Farhan Akhtar', character: 'Milkha Singh', profileUrl: 'https://image.tmdb.org/t/p/w185/farhan.jpg' },
      { name: 'Sonam Kapoor', character: 'Biro', profileUrl: 'https://image.tmdb.org/t/p/w185/sonam.jpg' },
      { name: 'Pavan Malhotra', character: 'Coach Gurudev Singh', profileUrl: 'https://image.tmdb.org/t/p/w185/pavan.jpg' }
    ],
    showtimes: ['10:30 AM', '02:30 PM', '06:30 PM', '09:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000003b',
    title: 'Chandu Champion',
    industry: 'Bollywood',
    description:
      'The extraordinary real-life story of Murlikant Petkar, India’s first Paralympic gold medalist who triumphed through wars, bullet wounds, and sheer indomitable spirit.',
    genre: ['Biography', 'Sports', 'Drama', 'War'],
    duration: 143,
    posterUrl: 'https://image.tmdb.org/t/p/w780/t6S6e5XfXk5L0g3y6T7m9p2c0bA.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mQvK8jL7p8b2c4e6a8r0t2y5.jpg',
    releaseDate: '2024-06-14T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'PVR P[XL] Audi 1',
    rating: 8.1,
    language: 'Hindi',
    trailerKey: 'IBda9F3hM7U',
    director: 'Kabir Khan',
    category: 'now_playing',
    cast: [
      { name: 'Kartik Aaryan', character: 'Murlikant Petkar', profileUrl: 'https://image.tmdb.org/t/p/w185/kartik.jpg' },
      { name: 'Vijay Raaz', character: 'Tiger Ali (Coach)', profileUrl: 'https://image.tmdb.org/t/p/w185/vijayraaz.jpg' },
      { name: 'Bhuvan Arora', character: 'Garnail Singh', profileUrl: 'https://image.tmdb.org/t/p/w185/bhuvan.jpg' }
    ],
    showtimes: ['12:00 PM', '03:45 PM', '07:15 PM', '10:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000003c',
    title: 'Shershaah',
    industry: 'Bollywood',
    description:
      'The life and valiant heroism of Captain Vikram Batra (Param Vir Chakra), whose fearless courage reclaimed Point 4875 during the 1999 Kargil War.',
    genre: ['Biography', 'Action', 'War', 'Drama'],
    duration: 135,
    posterUrl: 'https://image.tmdb.org/t/p/w780/1v0Jg3pX1qF3p9aQ2y2c8v4b0tB.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2u0u565Z0b8y4Zc6e4e7a8r0t2y.jpg',
    releaseDate: '2021-08-12T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'iMovies Screen 1 4K',
    rating: 8.3,
    language: 'Hindi',
    trailerKey: 'Q0FTxQC_Ges',
    director: 'Vishnuvardhan',
    category: 'popular',
    cast: [
      { name: 'Sidharth Malhotra', character: 'Capt. Vikram Batra / Vishal Batra', profileUrl: 'https://image.tmdb.org/t/p/w185/sidharth.jpg' },
      { name: 'Kiara Advani', character: 'Dimple Cheema', profileUrl: 'https://image.tmdb.org/t/p/w185/kiara.jpg' },
      { name: 'Shiv Panditt', character: 'Capt. Sanjeev Jamwal', profileUrl: 'https://image.tmdb.org/t/p/w185/shiv.jpg' }
    ],
    showtimes: ['01:15 PM', '04:45 PM', '08:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000003d',
    title: 'Sanju',
    industry: 'Bollywood',
    description:
      'A candid biographical chronicle of movie star Sanjay Dutt’s controversial, roller-coaster life—from superstardom and personal addiction to jail terms and redemption.',
    genre: ['Biography', 'Drama', 'Comedy'],
    duration: 161,
    posterUrl: 'https://image.tmdb.org/t/p/w780/wF8sL8u1g3u0e0h7t6k9y4b2a8d.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mSDmvloA24Q0c2Yc7a8r0t2y.jpg',
    releaseDate: '2018-06-29T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'Cinepolis Grand Screen',
    rating: 7.7,
    language: 'Hindi',
    trailerKey: 'rrrvdBv78vQ',
    director: 'Rajkumar Hirani',
    category: 'popular',
    cast: [
      { name: 'Ranbir Kapoor', character: 'Sanjay Dutt (Sanju)', profileUrl: 'https://image.tmdb.org/t/p/w185/ranbir.jpg' },
      { name: 'Paresh Rawal', character: 'Sunil Dutt', profileUrl: 'https://image.tmdb.org/t/p/w185/paresh.jpg' },
      { name: 'Vicky Kaushal', character: 'Kamlesh (Kamli)', profileUrl: 'https://image.tmdb.org/t/p/w185/vicky.jpg' }
    ],
    showtimes: ['11:15 AM', '03:00 PM', '06:30 PM', '09:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000003e',
    title: 'The Wolf of Wall Street',
    industry: 'Hollywood',
    description:
      'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime and corruption on Wall Street.',
    genre: ['Biography', 'Comedy', 'Crime', 'Drama'],
    duration: 180,
    posterUrl: 'https://image.tmdb.org/t/p/w780/pWHfK0yXyR7g987m5j5gU7iJb9c.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/fK5ssFhVsUWcfWqCtsf0yM.jpg',
    releaseDate: '2013-12-25T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'AMC Lincoln Square IMAX',
    rating: 8.2,
    language: 'English',
    trailerKey: 'iszwuX1AK6A',
    director: 'Martin Scorsese',
    category: 'popular',
    cast: [
      { name: 'Leonardo DiCaprio', character: 'Jordan Belfort', profileUrl: 'https://image.tmdb.org/t/p/w185/dicaprio.jpg' },
      { name: 'Jonah Hill', character: 'Donnie Azoff', profileUrl: 'https://image.tmdb.org/t/p/w185/jonahhill.jpg' },
      { name: 'Margot Robbie', character: 'Naomi Lapaglia', profileUrl: 'https://image.tmdb.org/t/p/w185/margotrobbie.jpg' }
    ],
    showtimes: ['12:30 PM', '04:30 PM', '08:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000003f',
    title: 'The Social Network',
    industry: 'Hollywood',
    description:
      'As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea.',
    genre: ['Biography', 'Drama'],
    duration: 120,
    posterUrl: 'https://image.tmdb.org/t/p/w780/n0ybibhJtQ5icDqTpTfZBDXKnZG.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/kH4vFw3gCgU2j8K63tUvhbMlhR6.jpg',
    releaseDate: '2010-10-01T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'Cineworld Leicester Square',
    rating: 7.8,
    language: 'English',
    trailerKey: 'lB95KLmpLR4',
    director: 'David Fincher',
    category: 'popular',
    cast: [
      { name: 'Jesse Eisenberg', character: 'Mark Zuckerberg', profileUrl: 'https://image.tmdb.org/t/p/w185/jesseeisenberg.jpg' },
      { name: 'Andrew Garfield', character: 'Eduardo Saverin', profileUrl: 'https://image.tmdb.org/t/p/w185/andrewgarfield.jpg' },
      { name: 'Justin Timberlake', character: 'Sean Parker', profileUrl: 'https://image.tmdb.org/t/p/w185/timberlake.jpg' }
    ],
    showtimes: ['02:15 PM', '05:45 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000040',
    title: "Schindler's List",
    industry: 'Hollywood',
    description:
      'In German-occupied Poland during WWII, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.',
    genre: ['Biography', 'Drama', 'History', 'War'],
    duration: 195,
    posterUrl: 'https://image.tmdb.org/t/p/w780/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8pjWFs9bZtgoh5qK4dYcK7bMlhR.jpg',
    releaseDate: '1993-12-15T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'BFI Southbank Screen 1',
    rating: 9.0,
    language: 'English',
    trailerKey: 'gG22XNhtnoY',
    director: 'Steven Spielberg',
    category: 'popular',
    cast: [
      { name: 'Liam Neeson', character: 'Oskar Schindler', profileUrl: 'https://image.tmdb.org/t/p/w185/liamneeson.jpg' },
      { name: 'Ben Kingsley', character: 'Itzhak Stern', profileUrl: 'https://image.tmdb.org/t/p/w185/benkingsley.jpg' },
      { name: 'Ralph Fiennes', character: 'Amon Göth', profileUrl: 'https://image.tmdb.org/t/p/w185/ralphfiennes.jpg' }
    ],
    showtimes: ['01:00 PM', '05:30 PM', '09:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000041',
    title: 'Ford v Ferrari',
    industry: 'Hollywood',
    description:
      'American car designer Carroll Shelby and driver Ken Miles battle corporate interference and the laws of physics to build a revolutionary race car for Ford Motor Co.',
    genre: ['Biography', 'Sports', 'Drama', 'Action'],
    duration: 152,
    posterUrl: 'https://image.tmdb.org/t/p/w780/dR1Ju50iudrOi3Ka4GbT5A0nQqp.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5nZbvK8oQ2kU4jH7mZ5p2e6c1.jpg',
    releaseDate: '2019-11-15T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'Regal LA Live IMAX',
    rating: 8.1,
    language: 'English',
    trailerKey: 'I3h9Z8KGX9o',
    director: 'James Mangold',
    category: 'popular',
    cast: [
      { name: 'Matt Damon', character: 'Carroll Shelby', profileUrl: 'https://image.tmdb.org/t/p/w185/mattdamon.jpg' },
      { name: 'Christian Bale', character: 'Ken Miles', profileUrl: 'https://image.tmdb.org/t/p/w185/christianbale.jpg' }
    ],
    showtimes: ['11:45 AM', '03:15 PM', '06:45 PM', '10:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ====================================================
  // MUSICAL MASTERPIECES (Bollywood & Hollywood)
  // ====================================================
  {
    _id: '65f1b0000000000000000042',
    title: 'Rockstar',
    industry: 'Bollywood',
    description:
      'Janardhan Jakhar chases musical greatness by seeking genuine heartbreak, transforming into the fiery, renegade international rock sensation Jordan.',
    genre: ['Musical', 'Drama', 'Romance'],
    duration: 159,
    posterUrl: 'https://image.tmdb.org/t/p/w780/x2U5e0pL2kK7b8m9n0p2y4c6d8e.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mQvK8jL7p8b2c4e6a8r0t2y5.jpg',
    releaseDate: '2011-11-11T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'PVR ICON Dolby Atmos Screen',
    rating: 7.9,
    language: 'Hindi',
    trailerKey: 'bK6vVp_Z9kM',
    director: 'Imtiaz Ali',
    category: 'popular',
    cast: [
      { name: 'Ranbir Kapoor', character: 'Janardhan Jakhar / Jordan', profileUrl: 'https://image.tmdb.org/t/p/w185/ranbir.jpg' },
      { name: 'Nargis Fakhri', character: 'Heer Kaul', profileUrl: 'https://image.tmdb.org/t/p/w185/nargis.jpg' },
      { name: 'Shammi Kapoor', character: 'Ustad Jameel Khan', profileUrl: 'https://image.tmdb.org/t/p/w185/shammi.jpg' }
    ],
    showtimes: ['12:15 PM', '04:00 PM', '07:30 PM', '10:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000043',
    title: 'Gully Boy',
    industry: 'Bollywood',
    description:
      'A 22-year-old Muslim youth from the slums of Dharavi, Mumbai discovers his voice through hip-hop, igniting an explosive underground rap revolution.',
    genre: ['Musical', 'Drama'],
    duration: 153,
    posterUrl: 'https://image.tmdb.org/t/p/w780/vG9rZk7b1qP4y8c2d5m6n7p8q9r.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2u0u565Z0b8y4Zc6e4e7a8r0t2y.jpg',
    releaseDate: '2019-02-14T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'INOX Megaplex Screen 1',
    rating: 7.9,
    language: 'Hindi',
    trailerKey: 'JFBfcjv_j7U',
    director: 'Zoya Akhtar',
    category: 'popular',
    cast: [
      { name: 'Ranveer Singh', character: 'Murad Ahmed (Gully Boy)', profileUrl: 'https://image.tmdb.org/t/p/w185/ranveer.jpg' },
      { name: 'Alia Bhatt', character: 'Safeena Firdausi', profileUrl: 'https://image.tmdb.org/t/p/w185/alia.jpg' },
      { name: 'Siddhant Chaturvedi', character: 'MC Sher', profileUrl: 'https://image.tmdb.org/t/p/w185/siddhant.jpg' }
    ],
    showtimes: ['01:45 PM', '05:15 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000044',
    title: 'Aashiqui 2',
    industry: 'Bollywood',
    description:
      'Fading music icon Rahul discovers talented bar singer Aarohi and turns her into a superstar, even as his own personal demons threaten their passionate love.',
    genre: ['Musical', 'Romance', 'Drama'],
    duration: 132,
    posterUrl: 'https://image.tmdb.org/t/p/w780/k7fG7m9k2j0b5v8c1d3p4y6q8w0.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mSDmvloA24Q0c2Yc7a8r0t2y.jpg',
    releaseDate: '2013-04-26T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'Cinepolis VIP Screens',
    rating: 7.1,
    language: 'Hindi',
    trailerKey: 'FyXXgpPqe6w',
    director: 'Mohit Suri',
    category: 'popular',
    cast: [
      { name: 'Aditya Roy Kapur', character: 'Rahul Jaykar', profileUrl: 'https://image.tmdb.org/t/p/w185/aditya.jpg' },
      { name: 'Shraddha Kapoor', character: 'Aarohi Keshav Shirke', profileUrl: 'https://image.tmdb.org/t/p/w185/shraddha.jpg' }
    ],
    showtimes: ['11:00 AM', '02:30 PM', '06:00 PM', '09:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000045',
    title: 'The Greatest Showman',
    industry: 'Hollywood',
    description:
      'Celebrates the birth of show business and tells of a visionary who rose from nothing to create a spectacle that became a worldwide sensation.',
    genre: ['Musical', 'Biography', 'Drama'],
    duration: 105,
    posterUrl: 'https://image.tmdb.org/t/p/w780/b9Ceo8eR39073W8w5b8Z8w5v9uE.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/fK5ssFhVsUWcfWqCtsf0yM.jpg',
    releaseDate: '2017-12-20T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'AMC Lincoln Square Screen 4',
    rating: 7.6,
    language: 'English',
    trailerKey: 'AXCTMGYUg9A',
    director: 'Michael Gracey',
    category: 'popular',
    cast: [
      { name: 'Hugh Jackman', character: 'P.T. Barnum', profileUrl: 'https://image.tmdb.org/t/p/w185/hughjackman.jpg' },
      { name: 'Zac Efron', character: 'Phillip Carlyle', profileUrl: 'https://image.tmdb.org/t/p/w185/zacefron.jpg' },
      { name: 'Zendaya', character: 'Anne Wheeler', profileUrl: 'https://image.tmdb.org/t/p/w185/zendaya.jpg' }
    ],
    showtimes: ['01:30 PM', '05:00 PM', '08:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000046',
    title: 'Bohemian Rhapsody',
    industry: 'Hollywood',
    description:
      'The foot-stomping celebration of Queen, their music, and their extraordinary lead singer Freddie Mercury, leading up to their unforgettable 1985 Live Aid performance.',
    genre: ['Musical', 'Biography', 'Drama'],
    duration: 134,
    posterUrl: 'https://image.tmdb.org/t/p/w780/lHu1wtNKAteIoTuGN5R1487iLsL.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/kH4vFw3gCgU2j8K63tUvhbMlhR6.jpg',
    releaseDate: '2018-11-02T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'Odeon Luxe Leicester Square',
    rating: 7.9,
    language: 'English',
    trailerKey: 'mP0VHJYFOAU',
    director: 'Bryan Singer',
    category: 'popular',
    cast: [
      { name: 'Rami Malek', character: 'Freddie Mercury', profileUrl: 'https://image.tmdb.org/t/p/w185/ramimalek.jpg' },
      { name: 'Lucy Boynton', character: 'Mary Austin', profileUrl: 'https://image.tmdb.org/t/p/w185/lucyboynton.jpg' },
      { name: 'Gwilym Lee', character: 'Brian May', profileUrl: 'https://image.tmdb.org/t/p/w185/gwilymlee.jpg' }
    ],
    showtimes: ['12:45 PM', '04:15 PM', '07:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ====================================================
  // HORROR & CHILLS (Bollywood & Hollywood)
  // ====================================================
  {
    _id: '65f1b0000000000000000047',
    title: 'Munjya',
    industry: 'Bollywood',
    description:
      'A young man returns to his ancestral Konkan village and inadvertently releases a vengeful spirit named Munjya obsessed with finding a bride.',
    genre: ['Horror', 'Comedy', 'Mystery'],
    duration: 123,
    posterUrl: 'https://image.tmdb.org/t/p/w780/u6W6rK4v0a8b7c2d5e6f1g3h8j9.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8pjWFs9bZtgoh5qK4dYcK7bMlhR.jpg',
    releaseDate: '2024-06-07T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'PVR INOX Screen 4',
    rating: 7.2,
    language: 'Hindi',
    trailerKey: 'hQ6X8Zz_qQw',
    director: 'Aditya Sarpotdar',
    category: 'now_playing',
    cast: [
      { name: 'Abhay Verma', character: 'Bittu', profileUrl: 'https://image.tmdb.org/t/p/w185/abhay.jpg' },
      { name: 'Sharvari Wagh', character: 'Bela', profileUrl: 'https://image.tmdb.org/t/p/w185/sharvari.jpg' },
      { name: 'Mona Singh', character: 'Pammi (Bittu’s Mother)', profileUrl: 'https://image.tmdb.org/t/p/w185/monasingh.jpg' }
    ],
    showtimes: ['01:30 PM', '04:45 PM', '08:00 PM', '10:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000048',
    title: 'A Quiet Place: Day One',
    industry: 'Hollywood',
    description:
      'Experience the day the world went quiet in New York City as blind alien predators with hypersensitive hearing attack Earth in overwhelming numbers.',
    genre: ['Horror', 'Sci-Fi', 'Thriller'],
    duration: 99,
    posterUrl: 'https://image.tmdb.org/t/p/w780/hU1swcqRzFw9X09o1bT7M4j2wL9.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5nZbvK8oQ2kU4jH7mZ5p2e6c1.jpg',
    releaseDate: '2024-06-28T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'iMovies IMAX 4D Laser',
    rating: 7.1,
    language: 'English',
    trailerKey: 'YPY7J-flzxc',
    director: 'Michael Sarnoski',
    category: 'now_playing',
    cast: [
      { name: 'Lupita Nyong’o', character: 'Samira', profileUrl: 'https://image.tmdb.org/t/p/w185/lupita.jpg' },
      { name: 'Joseph Quinn', character: 'Eric', profileUrl: 'https://image.tmdb.org/t/p/w185/josephquinn.jpg' },
      { name: 'Alex Wolff', character: 'Reuben', profileUrl: 'https://image.tmdb.org/t/p/w185/alexwolff.jpg' }
    ],
    showtimes: ['02:00 PM', '05:30 PM', '09:00 PM', '11:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000049',
    title: 'The Shining',
    industry: 'Hollywood',
    description:
      'A family heads to an isolated winter resort hotel where a sinister presence influences the father into violence, while his psychic son sees horrific visions.',
    genre: ['Horror', 'Mystery', 'Drama'],
    duration: 146,
    posterUrl: 'https://image.tmdb.org/t/p/w780/bS294DiIRaL5q7B7a8716PqGf48.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mQvK8jL7p8b2c4e6a8r0t2y5.jpg',
    releaseDate: '1980-05-23T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'BFI Southbank Screen 2',
    rating: 8.4,
    language: 'English',
    trailerKey: 'S014445HN24',
    director: 'Stanley Kubrick',
    category: 'popular',
    cast: [
      { name: 'Jack Nicholson', character: 'Jack Torrance', profileUrl: 'https://image.tmdb.org/t/p/w185/jacknicholson.jpg' },
      { name: 'Shelley Duvall', character: 'Wendy Torrance', profileUrl: 'https://image.tmdb.org/t/p/w185/shelleyduvall.jpg' }
    ],
    showtimes: ['03:30 PM', '07:15 PM', '10:30 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000004a',
    title: 'Get Out',
    industry: 'Hollywood',
    description:
      'A young African-American visits his white girlfriend’s parents for the weekend, where his simmering uneasiness about their reception reaches a boiling point.',
    genre: ['Horror', 'Mystery', 'Thriller'],
    duration: 104,
    posterUrl: 'https://image.tmdb.org/t/p/w780/tFXcEccSQMf3lfhfXKSU9iRBpa3.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2u0u565Z0b8y4Zc6e4e7a8r0t2y.jpg',
    releaseDate: '2017-02-24T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'Regal LA Live Screen 5',
    rating: 7.8,
    language: 'English',
    trailerKey: 'DzfpyUB60YY',
    director: 'Jordan Peele',
    category: 'popular',
    cast: [
      { name: 'Daniel Kaluuya', character: 'Chris Washington', profileUrl: 'https://image.tmdb.org/t/p/w185/danielkaluuya.jpg' },
      { name: 'Allison Williams', character: 'Rose Armitage', profileUrl: 'https://image.tmdb.org/t/p/w185/allisonwilliams.jpg' }
    ],
    showtimes: ['04:30 PM', '08:00 PM', '10:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ====================================================
  // ACTION & SCI-FI BLOCKBUSTERS (Bollywood & Hollywood)
  // ====================================================
  {
    _id: '65f1b000000000000000004b',
    title: 'Furiosa: A Mad Max Saga',
    industry: 'Hollywood',
    description:
      'As the world fell, young Furiosa is snatched from the Green Place of Many Mothers into the hands of a Biker Horde led by Warlord Dementus.',
    genre: ['Action', 'Sci-Fi', 'Adventure'],
    duration: 148,
    posterUrl: 'https://image.tmdb.org/t/p/w780/iADOJ8Zymht2JPMoy3R7xUMZqaC.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mSDmvloA24Q0c2Yc7a8r0t2y.jpg',
    releaseDate: '2024-05-24T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'iMovies IMAX Laser Screen 1',
    rating: 7.6,
    language: 'English',
    trailerKey: 'XJMuhwVlca4',
    director: 'George Miller',
    category: 'now_playing',
    cast: [
      { name: 'Anya Taylor-Joy', character: 'Imperator Furiosa', profileUrl: 'https://image.tmdb.org/t/p/w185/anyataylorjoy.jpg' },
      { name: 'Chris Hemsworth', character: 'Warlord Dementus', profileUrl: 'https://image.tmdb.org/t/p/w185/chrishemsworth.jpg' },
      { name: 'Tom Burke', character: 'Praetorian Jack', profileUrl: 'https://image.tmdb.org/t/p/w185/tomburke.jpg' }
    ],
    showtimes: ['11:45 AM', '03:15 PM', '06:45 PM', '10:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000004c',
    title: 'The Matrix',
    industry: 'Hollywood',
    description:
      'When a computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    genre: ['Action', 'Sci-Fi'],
    duration: 136,
    posterUrl: 'https://image.tmdb.org/t/p/w780/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/fK5ssFhVsUWcfWqCtsf0yM.jpg',
    releaseDate: '1999-03-31T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'Dolby Cinema Auditorium 1',
    rating: 8.7,
    language: 'English',
    trailerKey: 'vKQi3bBA1y8',
    director: 'The Wachowskis',
    category: 'popular',
    cast: [
      { name: 'Keanu Reeves', character: 'Thomas Anderson / Neo', profileUrl: 'https://image.tmdb.org/t/p/w185/keanureeves.jpg' },
      { name: 'Laurence Fishburne', character: 'Morpheus', profileUrl: 'https://image.tmdb.org/t/p/w185/laurencefishburne.jpg' },
      { name: 'Carrie-Anne Moss', character: 'Trinity', profileUrl: 'https://image.tmdb.org/t/p/w185/carrieannemoss.jpg' }
    ],
    showtimes: ['01:15 PM', '04:45 PM', '08:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000004d',
    title: 'John Wick: Chapter 4',
    industry: 'Hollywood',
    description:
      'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.',
    genre: ['Action', 'Crime', 'Thriller'],
    duration: 169,
    posterUrl: 'https://image.tmdb.org/t/p/w780/vZloFAK7NKnMGKEHvYcnZkWIO0.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/kH4vFw3gCgU2j8K63tUvhbMlhR6.jpg',
    releaseDate: '2023-03-24T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'Cineworld IMAX SuperScreen',
    rating: 7.7,
    language: 'English',
    trailerKey: 'qEVUtrk8_B4',
    director: 'Chad Stahelski',
    category: 'popular',
    cast: [
      { name: 'Keanu Reeves', character: 'John Wick', profileUrl: 'https://image.tmdb.org/t/p/w185/keanureeves.jpg' },
      { name: 'Donnie Yen', character: 'Caine', profileUrl: 'https://image.tmdb.org/t/p/w185/donnieyen.jpg' },
      { name: 'Bill Skarsgård', character: 'Marquis de Gramont', profileUrl: 'https://image.tmdb.org/t/p/w185/billskarsgard.jpg' }
    ],
    showtimes: ['12:00 PM', '03:45 PM', '07:30 PM', '10:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000004e',
    title: 'K.G.F: Chapter 2',
    industry: 'Bollywood',
    description:
      'In the blood-soaked Kolar Gold Fields, Rocky’s name strikes dread into his enemies. As the government sees him as a menace, Rocky must battle Adheera and Inayat Khalil.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 168,
    posterUrl: 'https://image.tmdb.org/t/p/w780/khkJ4r7Zk3k0b9w8e7a6r5t4y3.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8pjWFs9bZtgoh5qK4dYcK7bMlhR.jpg',
    releaseDate: '2022-04-14T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'PVR P[XL] & IMAX Screen 1',
    rating: 8.3,
    language: 'Hindi',
    trailerKey: 'JKa05nyUmuQ',
    director: 'Prashanth Neel',
    category: 'popular',
    cast: [
      { name: 'Yash', character: 'Raja Krishnappa Bairya / Rocky', profileUrl: 'https://image.tmdb.org/t/p/w185/yash.jpg' },
      { name: 'Sanjay Dutt', character: 'Adheera', profileUrl: 'https://image.tmdb.org/t/p/w185/sanjaydutt.jpg' },
      { name: 'Raveena Tandon', character: 'Ramika Sen', profileUrl: 'https://image.tmdb.org/t/p/w185/raveena.jpg' }
    ],
    showtimes: ['11:00 AM', '02:45 PM', '06:30 PM', '10:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b000000000000000004f',
    title: 'Salaar: Part 1 – Ceasefire',
    industry: 'Bollywood',
    description:
      'A gang leader tries to keep a promise made to a dying friend and takes on other criminal gangs in the dystopian city of Khansaar.',
    genre: ['Action', 'Crime', 'Drama'],
    duration: 175,
    posterUrl: 'https://image.tmdb.org/t/p/w780/wI3m8m2b1k5k7t9y2c4d6f8h0.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5nZbvK8oQ2kU4jH7mZ5p2e6c1.jpg',
    releaseDate: '2023-12-22T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'INOX Megaplex Screen 2',
    rating: 7.5,
    language: 'Hindi',
    trailerKey: '4GPvYMKsrtI',
    director: 'Prashanth Neel',
    category: 'popular',
    cast: [
      { name: 'Prabhas', character: 'Deva / Salaar', profileUrl: 'https://image.tmdb.org/t/p/w185/prabhas.jpg' },
      { name: 'Prithviraj Sukumaran', character: 'Varadharaja Mannaar', profileUrl: 'https://image.tmdb.org/t/p/w185/prithviraj.jpg' },
      { name: 'Shruti Haasan', character: 'Aadhya', profileUrl: 'https://image.tmdb.org/t/p/w185/shrutii.jpg' }
    ],
    showtimes: ['12:30 PM', '04:15 PM', '08:00 PM', '11:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000050',
    title: 'Singham Again',
    industry: 'Bollywood',
    description:
      'DCP Bajirao Singham unites with DCP Veer Sooryavanshi, Sangram Bhalerao, and Lady Singham Shakti Shetty in an explosive cinematic universe showdown.',
    genre: ['Action', 'Drama', 'Crime'],
    duration: 154,
    posterUrl: 'https://image.tmdb.org/t/p/w780/nQG1U3zJ2Bf1pWf2c0iPzK2y5aX.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mQvK8jL7p8b2c4e6a8r0t2y5.jpg',
    releaseDate: '2024-11-01T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'PVR ICON Gold Screen 1',
    rating: 7.3,
    language: 'Hindi',
    trailerKey: 'wM8e9e1b2K4',
    director: 'Rohit Shetty',
    category: 'now_playing',
    cast: [
      { name: 'Ajay Devgn', character: 'DCP Bajirao Singham', profileUrl: 'https://image.tmdb.org/t/p/w185/ajaydevgn.jpg' },
      { name: 'Kareena Kapoor', character: 'Avni Kamat', profileUrl: 'https://image.tmdb.org/t/p/w185/kareena.jpg' },
      { name: 'Ranveer Singh', character: 'Sangram Bhalerao (Simmba)', profileUrl: 'https://image.tmdb.org/t/p/w185/ranveer.jpg' },
      { name: 'Akshay Kumar', character: 'DCP Veer Sooryavanshi', profileUrl: 'https://image.tmdb.org/t/p/w185/akshay.jpg' }
    ],
    showtimes: ['10:45 AM', '02:00 PM', '05:30 PM', '09:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ====================================================
  // COMEDY HITS & TIMELESS HUMOR (Bollywood & Hollywood)
  // ====================================================
  {
    _id: '65f1b0000000000000000051',
    title: 'Hera Pheri',
    industry: 'Bollywood',
    description:
      'Three unemployed roommates—a destitute landlord, a desperate young man, and an eccentric garage mechanic—find themselves caught in a hilarious wrong-number ransom caper.',
    genre: ['Comedy', 'Crime', 'Drama'],
    duration: 156,
    posterUrl: 'https://image.tmdb.org/t/p/w780/pWHfK0yXyR7g987m5j5gU7iJb9c.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2u0u565Z0b8y4Zc6e4e7a8r0t2y.jpg',
    releaseDate: '2000-03-31T00:00:00.000Z',
    ticketPrice: 250,
    theater: 'Cinepolis Heritage Screen',
    rating: 8.2,
    language: 'Hindi',
    trailerKey: 'bK6vVp_Z9kM',
    director: 'Priyadarshan',
    category: 'popular',
    cast: [
      { name: 'Akshay Kumar', character: 'Raju', profileUrl: 'https://image.tmdb.org/t/p/w185/akshay.jpg' },
      { name: 'Suniel Shetty', character: 'Shyam', profileUrl: 'https://image.tmdb.org/t/p/w185/suniel.jpg' },
      { name: 'Paresh Rawal', character: 'Baburao Ganpatrao Apte (Babu Bhaiya)', profileUrl: 'https://image.tmdb.org/t/p/w185/paresh.jpg' }
    ],
    showtimes: ['11:30 AM', '03:15 PM', '06:45 PM', '09:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000052',
    title: 'Munna Bhai M.B.B.S.',
    industry: 'Bollywood',
    description:
      'A lovable Mumbai gangster sets out to fulfill his father’s dream of becoming a certified doctor, enrolling in medical college and prescribing laughter and hugs.',
    genre: ['Comedy', 'Drama'],
    duration: 156,
    posterUrl: 'https://image.tmdb.org/t/p/w780/kH4vFw3gCgU2j8K63tUvhbMlhR6.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mSDmvloA24Q0c2Yc7a8r0t2y.jpg',
    releaseDate: '2003-12-19T00:00:00.000Z',
    ticketPrice: 260,
    theater: 'INOX Megaplex Screen 4',
    rating: 8.1,
    language: 'Hindi',
    trailerKey: '6L6XqWoS8tw',
    director: 'Rajkumar Hirani',
    category: 'popular',
    cast: [
      { name: 'Sanjay Dutt', character: 'Murli Prasad Sharma (Munna Bhai)', profileUrl: 'https://image.tmdb.org/t/p/w185/sanjaydutt.jpg' },
      { name: 'Arshad Warsi', character: 'Circuit (Sarkeshwar)', profileUrl: 'https://image.tmdb.org/t/p/w185/arshad.jpg' },
      { name: 'Boman Irani', character: 'Dr. J. C. Asthana', profileUrl: 'https://image.tmdb.org/t/p/w185/boman.jpg' }
    ],
    showtimes: ['01:00 PM', '04:30 PM', '08:00 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000053',
    title: 'The Grand Budapest Hotel',
    industry: 'Hollywood',
    description:
      'A writer encounters the owner of an aging high-class European hotel, who tells him of his early years serving as a lobby boy to an exceptional concierge.',
    genre: ['Comedy', 'Adventure', 'Crime'],
    duration: 99,
    posterUrl: 'https://image.tmdb.org/t/p/w780/eWdyYQreja6JGCzqHWX9NZkt5BW.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/fK5ssFhVsUWcfWqCtsf0yM.jpg',
    releaseDate: '2014-03-28T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'BFI Southbank Screen 1',
    rating: 8.1,
    language: 'English',
    trailerKey: '1Fg5iWmQjwk',
    director: 'Wes Anderson',
    category: 'popular',
    cast: [
      { name: 'Ralph Fiennes', character: 'Monsieur Gustave H.', profileUrl: 'https://image.tmdb.org/t/p/w185/ralphfiennes.jpg' },
      { name: 'Tony Revolori', character: 'Zero Moustafa', profileUrl: 'https://image.tmdb.org/t/p/w185/tonyrevolori.jpg' },
      { name: 'Saoirse Ronan', character: 'Agatha', profileUrl: 'https://image.tmdb.org/t/p/w185/saoirse.jpg' }
    ],
    showtimes: ['02:15 PM', '05:45 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000054',
    title: 'Knives Out',
    industry: 'Hollywood',
    description:
      'A detective investigates the mysterious death of a patriarch of an eccentric, combative family in a witty, twist-filled whodunnit mystery.',
    genre: ['Comedy', 'Mystery', 'Crime'],
    duration: 130,
    posterUrl: 'https://image.tmdb.org/t/p/w780/pThyQovXQrw2m0s9x82twj48Jq4.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/kH4vFw3gCgU2j8K63tUvhbMlhR6.jpg',
    releaseDate: '2019-11-27T00:00:00.000Z',
    ticketPrice: 270,
    theater: 'Regal LA Live Screen 3',
    rating: 7.9,
    language: 'English',
    trailerKey: 'qGqiHJTsR4Q',
    director: 'Rian Johnson',
    category: 'popular',
    cast: [
      { name: 'Daniel Craig', character: 'Benoit Blanc', profileUrl: 'https://image.tmdb.org/t/p/w185/danielcraig.jpg' },
      { name: 'Chris Evans', character: 'Ransom Drysdale', profileUrl: 'https://image.tmdb.org/t/p/w185/chrisevans.jpg' },
      { name: 'Ana de Armas', character: 'Marta Cabrera', profileUrl: 'https://image.tmdb.org/t/p/w185/anadearmas.jpg' }
    ],
    showtimes: ['01:30 PM', '04:45 PM', '08:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  // ====================================================
  // HISTORICAL & WAR EPIC MASTERPIECES (Bollywood & Hollywood)
  // ====================================================
  {
    _id: '65f1b0000000000000000055',
    title: 'Saving Private Ryan',
    industry: 'Hollywood',
    description:
      'Following the Normandy Landings, Captain John Miller leads a squad behind enemy lines to locate and retrieve paratrooper Private James Ryan whose brothers have fallen.',
    genre: ['War', 'Drama', 'Action', 'History'],
    duration: 169,
    posterUrl: 'https://image.tmdb.org/t/p/w780/uqx37cS8cpHg8x35f9U5IBlrCV3.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/8pjWFs9bZtgoh5qK4dYcK7bMlhR.jpg',
    releaseDate: '1998-07-24T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'Dolby Cinema Screen 2',
    rating: 8.6,
    language: 'English',
    trailerKey: 'zwhP5b4tD6g',
    director: 'Steven Spielberg',
    category: 'popular',
    cast: [
      { name: 'Tom Hanks', character: 'Captain John Miller', profileUrl: 'https://image.tmdb.org/t/p/w185/tomhanks.jpg' },
      { name: 'Matt Damon', character: 'Private James Francis Ryan', profileUrl: 'https://image.tmdb.org/t/p/w185/mattdamon.jpg' },
      { name: 'Tom Sizemore', character: 'Sergeant Mike Horvath', profileUrl: 'https://image.tmdb.org/t/p/w185/tomsizemore.jpg' }
    ],
    showtimes: ['12:30 PM', '04:30 PM', '08:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000056',
    title: '1917',
    industry: 'Hollywood',
    description:
      'April 6th, 1917. As an infantry battalion assembles to wage war deep in enemy territory, two British soldiers are assigned to race against time and deliver a message.',
    genre: ['War', 'Drama', 'Action', 'History'],
    duration: 119,
    posterUrl: 'https://image.tmdb.org/t/p/w780/iZf0KyrE25z1sage4SYFLG68vbt.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/5nZbvK8oQ2kU4jH7mZ5p2e6c1.jpg',
    releaseDate: '2019-12-25T00:00:00.000Z',
    ticketPrice: 280,
    theater: 'Cineworld Leicester Square IMAX',
    rating: 8.2,
    language: 'English',
    trailerKey: 'YqNYrYUiMfg',
    director: 'Sam Mendes',
    category: 'popular',
    cast: [
      { name: 'George MacKay', character: 'Lance Corporal William Schofield', profileUrl: 'https://image.tmdb.org/t/p/w185/georgemackay.jpg' },
      { name: 'Dean-Charles Chapman', character: 'Lance Corporal Tom Blake', profileUrl: 'https://image.tmdb.org/t/p/w185/deancharles.jpg' }
    ],
    showtimes: ['01:45 PM', '05:15 PM', '08:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000057',
    title: 'Uri: The Surgical Strike',
    industry: 'Bollywood',
    description:
      'Major Vihaan Singh Shergill of the Indian Special Forces leads a covert operation against terrorist launchpads across the Line of Control following the Uri attack.',
    genre: ['War', 'Action', 'Drama', 'History'],
    duration: 138,
    posterUrl: 'https://image.tmdb.org/t/p/w780/yB1aUe2m5n0b7v8c1d3p4y6q8w0.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/mQvK8jL7p8b2c4e6a8r0t2y5.jpg',
    releaseDate: '2019-01-11T00:00:00.000Z',
    ticketPrice: 290,
    theater: 'PVR INOX Laser Audi 2',
    rating: 8.2,
    language: 'Hindi',
    trailerKey: 'VVY3do6hKG4',
    director: 'Aditya Dhar',
    category: 'popular',
    cast: [
      { name: 'Vicky Kaushal', character: 'Major Vihaan Singh Shergill', profileUrl: 'https://image.tmdb.org/t/p/w185/vicky.jpg' },
      { name: 'Paresh Rawal', character: 'Govind Bhardwaj (NSA)', profileUrl: 'https://image.tmdb.org/t/p/w185/paresh.jpg' },
      { name: 'Yami Gautam', character: 'Pallavi Sharma / Jasmine', profileUrl: 'https://image.tmdb.org/t/p/w185/yami.jpg' }
    ],
    showtimes: ['11:30 AM', '03:00 PM', '06:30 PM', '09:45 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },
  {
    _id: '65f1b0000000000000000058',
    title: 'Lagaan: Once Upon a Time in India',
    industry: 'Bollywood',
    description:
      'In Victorian India, the residents of a drought-plagued village stake their entire future on an unprecedented cricket match against their British rulers to cancel their oppressive taxes.',
    genre: ['Drama', 'Musical', 'Sports', 'History'],
    duration: 224,
    posterUrl: 'https://image.tmdb.org/t/p/w780/x2U5e0pL2kK7b8m9n0p2y4c6d8e.jpg',
    backdropUrl: 'https://image.tmdb.org/t/p/w1280/2u0u565Z0b8y4Zc6e4e7a8r0t2y.jpg',
    releaseDate: '2001-06-15T00:00:00.000Z',
    ticketPrice: 300,
    theater: 'PVR ICON Heritage Screen',
    rating: 8.1,
    language: 'Hindi',
    trailerKey: 'OSaV309V_C4',
    director: 'Ashutosh Gowariker',
    category: 'popular',
    cast: [
      { name: 'Aamir Khan', character: 'Bhuvan', profileUrl: 'https://image.tmdb.org/t/p/w185/aamirkhan.jpg' },
      { name: 'Gracy Singh', character: 'Gauri', profileUrl: 'https://image.tmdb.org/t/p/w185/gracy.jpg' },
      { name: 'Rachel Shelley', character: 'Elizabeth Russell', profileUrl: 'https://image.tmdb.org/t/p/w185/rachelshelley.jpg' }
    ],
    showtimes: ['01:15 PM', '05:30 PM', '09:15 PM'],
    countryAvailability: ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE']
  },

  {
    "_id": "65f1b0000000000000000059",
    "title": "Laapataa Ladies",
    "aliases": [
      "Lapata Ladies",
      "Lost Ladies",
      "Laapata Ladies",
      "Lapata"
    ],
    "industry": "Bollywood",
    "description": "In 2001 rural India, two young brides inadvertently get swapped on a crowded passenger train. As one bride embarks on an unexpected path of independence and the other seeks her way home, a dedicated police inspector unravels the touching mystery.",
    "genre": [
      "Mystery",
      "Comedy",
      "Drama",
      "Romance"
    ],
    "duration": 124,
    "posterUrl": "https://image.tmdb.org/t/p/w780/jH6Qy9nK2g4Wf3P1E2r8t5u0.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/8m9qQh9nC5jV8QxJz4qG6f5gH9k.jpg",
    "releaseDate": "2024-03-01T00:00:00.000Z",
    "ticketPrice": 260,
    "theater": "PVR INOX Superplex - Screen 3",
    "rating": 8.5,
    "language": "Hindi",
    "trailerKey": "Vq9mB2K_8Z0",
    "director": "Kiran Rao",
    "category": "now_playing",
    "cast": [
      {
        "name": "Nitanshi Goel",
        "character": "Phool Kumari",
        "profileUrl": "https://image.tmdb.org/t/p/w185/nitanshi.jpg"
      },
      {
        "name": "Pratibha Ranta",
        "character": "Jaya / Pushpa Rani",
        "profileUrl": "https://image.tmdb.org/t/p/w185/pratibha.jpg"
      },
      {
        "name": "Sparsh Shrivastava",
        "character": "Deepak Kumar",
        "profileUrl": "https://image.tmdb.org/t/p/w185/sparsh.jpg"
      },
      {
        "name": "Ravi Kishan",
        "character": "Inspector Shyam Manohar",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ravikishan.jpg"
      },
      {
        "name": "Chhaya Kadam",
        "character": "Manju Maai",
        "profileUrl": "https://image.tmdb.org/t/p/w185/chhaya.jpg"
      }
    ],
    "showtimes": [
      "11:30 AM",
      "02:45 PM",
      "06:15 PM",
      "09:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000005a",
    "title": "Drishyam",
    "aliases": [
      "Drishyam 1"
    ],
    "industry": "Bollywood",
    "description": "Desperate measures are taken by a man who tries to save his family from the dark side of the law after they commit an unexpected crime.",
    "genre": [
      "Mystery",
      "Thriller",
      "Crime",
      "Drama"
    ],
    "duration": 163,
    "posterUrl": "https://image.tmdb.org/t/p/w780/1I98vM6e03y35uW.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/5P8dQY0rC3W35uW.jpg",
    "releaseDate": "2015-07-31T00:00:00.000Z",
    "ticketPrice": 270,
    "theater": "PVR ICON Gold Class",
    "rating": 8.2,
    "language": "Hindi",
    "trailerKey": "AuuX2j14sP4",
    "director": "Nishikant Kamat",
    "category": "popular",
    "cast": [
      {
        "name": "Ajay Devgn",
        "character": "Vijay Salgaonkar",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ajaydevgn.jpg"
      },
      {
        "name": "Tabu",
        "character": "IG Meera Deshmukh",
        "profileUrl": "https://image.tmdb.org/t/p/w185/tabu.jpg"
      },
      {
        "name": "Shriya Saran",
        "character": "Nandini Salgaonkar",
        "profileUrl": "https://image.tmdb.org/t/p/w185/shriya.jpg"
      },
      {
        "name": "Ishita Dutta",
        "character": "Anju Salgaonkar",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ishita.jpg"
      }
    ],
    "showtimes": [
      "10:45 AM",
      "02:15 PM",
      "06:00 PM",
      "09:45 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000005b",
    "title": "Merry Christmas",
    "aliases": [
      "Merry Christmas 2024",
      "Sriram Raghavan Merry Christmas"
    ],
    "industry": "Bollywood",
    "description": "On Christmas Eve, an uneasy romance between two strangers in Mumbai takes a dark, unpredictable turn as the festive night turns into an intricate labyrinth of secrets, murder, and deception.",
    "genre": [
      "Mystery",
      "Thriller",
      "Romance",
      "Drama"
    ],
    "duration": 142,
    "posterUrl": "https://image.tmdb.org/t/p/w780/merry_christmas_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/merry_christmas_bg.jpg",
    "releaseDate": "2024-01-12T00:00:00.000Z",
    "ticketPrice": 270,
    "theater": "PVR INOX Superplex",
    "rating": 7.3,
    "language": "Hindi",
    "trailerKey": "wF3zC3n7X4k",
    "director": "Sriram Raghavan",
    "category": "now_playing",
    "cast": [
      {
        "name": "Katrina Kaif",
        "character": "Maria",
        "profileUrl": "https://image.tmdb.org/t/p/w185/katrinakaif.jpg"
      },
      {
        "name": "Vijay Sethupathi",
        "character": "Albert",
        "profileUrl": "https://image.tmdb.org/t/p/w185/vijaysethupathi.jpg"
      },
      {
        "name": "Sanjay Kapoor",
        "character": "Ronnie",
        "profileUrl": "https://image.tmdb.org/t/p/w185/sanjaykapoor.jpg"
      }
    ],
    "showtimes": [
      "12:00 PM",
      "03:30 PM",
      "07:00 PM",
      "10:15 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000005c",
    "title": "Kahaani",
    "aliases": [
      "Kahani"
    ],
    "industry": "Bollywood",
    "description": "A pregnant woman arrives in Kolkata from London during the Durga Puja festival in search of her missing husband, but everyone she questions denies having ever met him.",
    "genre": [
      "Mystery",
      "Thriller",
      "Drama"
    ],
    "duration": 122,
    "posterUrl": "https://image.tmdb.org/t/p/w780/kahaani_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/kahaani_bg.jpg",
    "releaseDate": "2012-03-09T00:00:00.000Z",
    "ticketPrice": 250,
    "theater": "PVR INOX Heritage Hall",
    "rating": 8.1,
    "language": "Hindi",
    "trailerKey": "rs4xWqXj6-E",
    "director": "Sujoy Ghosh",
    "category": "popular",
    "cast": [
      {
        "name": "Vidya Balan",
        "character": "Vidya Bagchi",
        "profileUrl": "https://image.tmdb.org/t/p/w185/vidyabalan.jpg"
      },
      {
        "name": "Parambrata Chatterjee",
        "character": "Satyaki 'Rana' Sinha",
        "profileUrl": "https://image.tmdb.org/t/p/w185/parambrata.jpg"
      },
      {
        "name": "Nawazuddin Siddiqui",
        "character": "Inspector A. Khan",
        "profileUrl": "https://image.tmdb.org/t/p/w185/nawaz.jpg"
      }
    ],
    "showtimes": [
      "12:00 PM",
      "03:30 PM",
      "07:00 PM",
      "10:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000005d",
    "title": "Talaash: The Answer Lies Within",
    "aliases": [
      "Talaash"
    ],
    "industry": "Bollywood",
    "description": "An introspective police officer investigating the mysterious drowning death of a movie star crosses paths with a mysterious escort who holds unexpected answers.",
    "genre": [
      "Mystery",
      "Drama",
      "Crime",
      "Thriller"
    ],
    "duration": 140,
    "posterUrl": "https://image.tmdb.org/t/p/w780/talaash_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/talaash_bg.jpg",
    "releaseDate": "2012-11-30T00:00:00.000Z",
    "ticketPrice": 260,
    "theater": "Carnival IMAX Theatre",
    "rating": 7.2,
    "language": "Hindi",
    "trailerKey": "M6Q4j8tXGfU",
    "director": "Reema Kagti",
    "category": "popular",
    "cast": [
      {
        "name": "Aamir Khan",
        "character": "Inspector Surjan Singh Shekhawat",
        "profileUrl": "https://image.tmdb.org/t/p/w185/aamirkhan.jpg"
      },
      {
        "name": "Kareena Kapoor",
        "character": "Rosie / Simran",
        "profileUrl": "https://image.tmdb.org/t/p/w185/kareenakapoor.jpg"
      },
      {
        "name": "Rani Mukerji",
        "character": "Roshni Shekhawat",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ranimukerji.jpg"
      }
    ],
    "showtimes": [
      "01:15 PM",
      "04:45 PM",
      "08:15 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000005e",
    "title": "Badla",
    "aliases": [
      "The Invisible Guest Remake"
    ],
    "industry": "Bollywood",
    "description": "A dynamic young entrepreneur finds herself locked in a hotel room with the corpse of her dead lover. A veteran lawyer is hired to construct a defense over an intense three-hour conversation.",
    "genre": [
      "Mystery",
      "Crime",
      "Thriller",
      "Drama"
    ],
    "duration": 118,
    "posterUrl": "https://image.tmdb.org/t/p/w780/badla_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/badla_bg.jpg",
    "releaseDate": "2019-03-08T00:00:00.000Z",
    "ticketPrice": 270,
    "theater": "PVR Directors Cut",
    "rating": 7.8,
    "language": "Hindi",
    "trailerKey": "mSlgu8AQAd4",
    "director": "Sujoy Ghosh",
    "category": "popular",
    "cast": [
      {
        "name": "Amitabh Bachchan",
        "character": "Badal Gupta",
        "profileUrl": "https://image.tmdb.org/t/p/w185/amitabh.jpg"
      },
      {
        "name": "Taapsee Pannu",
        "character": "Naina Sethi",
        "profileUrl": "https://image.tmdb.org/t/p/w185/taapsee.jpg"
      },
      {
        "name": "Amrita Singh",
        "character": "Rani Kaur",
        "profileUrl": "https://image.tmdb.org/t/p/w185/amrita.jpg"
      }
    ],
    "showtimes": [
      "11:45 AM",
      "03:00 PM",
      "06:30 PM",
      "09:45 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000005f",
    "title": "Jaane Jaan",
    "aliases": [
      "The Devotion of Suspect X"
    ],
    "industry": "Bollywood",
    "description": "A gifted high school math teacher helps a single mother cover up a sudden murder, sparking a cat-and-mouse game with a relentless police investigator.",
    "genre": [
      "Mystery",
      "Thriller",
      "Crime",
      "Drama"
    ],
    "duration": 139,
    "posterUrl": "https://image.tmdb.org/t/p/w780/jaane_jaan_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/jaane_jaan_bg.jpg",
    "releaseDate": "2023-09-21T00:00:00.000Z",
    "ticketPrice": 260,
    "theater": "INOX Megaplex",
    "rating": 7,
    "language": "Hindi",
    "trailerKey": "kYn6A3s2x4Y",
    "director": "Sujoy Ghosh",
    "category": "now_playing",
    "cast": [
      {
        "name": "Kareena Kapoor Khan",
        "character": "Maya D'Souza",
        "profileUrl": "https://image.tmdb.org/t/p/w185/kareenakapoor.jpg"
      },
      {
        "name": "Jaideep Ahlawat",
        "character": "Naren Vyas",
        "profileUrl": "https://image.tmdb.org/t/p/w185/jaideep.jpg"
      },
      {
        "name": "Vijay Varma",
        "character": "Inspector Karan Anand",
        "profileUrl": "https://image.tmdb.org/t/p/w185/vijayvarma.jpg"
      }
    ],
    "showtimes": [
      "12:30 PM",
      "04:00 PM",
      "07:30 PM",
      "10:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000060",
    "title": "Shutter Island",
    "aliases": [
      "Ashecliffe"
    ],
    "industry": "Hollywood",
    "description": "In 1954, a U.S. Marshal investigates the disappearance of a murderer who escaped from a hospital for the criminally insane on a secluded Boston island.",
    "genre": [
      "Mystery",
      "Thriller",
      "Drama"
    ],
    "duration": 138,
    "posterUrl": "https://image.tmdb.org/t/p/w780/kve20tXwUZpu4GUX8l6X7Z4RIjP.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/c8vdqRjC1m4o5z9w8q8.jpg",
    "releaseDate": "2010-02-19T00:00:00.000Z",
    "ticketPrice": 290,
    "theater": "Odeon Luxe Leicester Square",
    "rating": 8.2,
    "language": "English",
    "trailerKey": "5iaYLCiq5RM",
    "director": "Martin Scorsese",
    "category": "popular",
    "cast": [
      {
        "name": "Leonardo DiCaprio",
        "character": "Teddy Daniels",
        "profileUrl": "https://image.tmdb.org/t/p/w185/dicaprio.jpg"
      },
      {
        "name": "Mark Ruffalo",
        "character": "Chuck Aule",
        "profileUrl": "https://image.tmdb.org/t/p/w185/markruffalo.jpg"
      },
      {
        "name": "Ben Kingsley",
        "character": "Dr. John Cawley",
        "profileUrl": "https://image.tmdb.org/t/p/w185/benkingsley.jpg"
      }
    ],
    "showtimes": [
      "01:00 PM",
      "04:30 PM",
      "08:00 PM",
      "11:15 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000061",
    "title": "Gone Girl",
    "aliases": [
      "Amazing Amy"
    ],
    "industry": "Hollywood",
    "description": "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
    "genre": [
      "Mystery",
      "Thriller",
      "Drama",
      "Crime"
    ],
    "duration": 149,
    "posterUrl": "https://image.tmdb.org/t/p/w780/qymaJhucquUwjpKV8y79mQ9i57b.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/mDgQvG5t9V2.jpg",
    "releaseDate": "2014-10-03T00:00:00.000Z",
    "ticketPrice": 280,
    "theater": "Regal IMAX at LA LIVE",
    "rating": 8.1,
    "language": "English",
    "trailerKey": "2-_-1nJf8Vg",
    "director": "David Fincher",
    "category": "popular",
    "cast": [
      {
        "name": "Ben Affleck",
        "character": "Nick Dunne",
        "profileUrl": "https://image.tmdb.org/t/p/w185/benaffleck.jpg"
      },
      {
        "name": "Rosamund Pike",
        "character": "Amy Dunne",
        "profileUrl": "https://image.tmdb.org/t/p/w185/rosamundpike.jpg"
      },
      {
        "name": "Neil Patrick Harris",
        "character": "Desi Collings",
        "profileUrl": "https://image.tmdb.org/t/p/w185/nph.jpg"
      }
    ],
    "showtimes": [
      "11:15 AM",
      "02:45 PM",
      "06:15 PM",
      "09:45 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000062",
    "title": "Prisoners",
    "aliases": [
      "Prisoners 2013"
    ],
    "industry": "Hollywood",
    "description": "When Keller Dover’s six-year-old daughter and her friend are kidnapped, he takes matters into his own hands while an eccentric young detective pursues several elusive leads.",
    "genre": [
      "Mystery",
      "Crime",
      "Drama",
      "Thriller"
    ],
    "duration": 153,
    "posterUrl": "https://image.tmdb.org/t/p/w780/tuZhZ662M1n873JkY2.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/5rZq9sY2t5uL.jpg",
    "releaseDate": "2013-09-20T00:00:00.000Z",
    "ticketPrice": 275,
    "theater": "BFI Southbank Screen 1",
    "rating": 8.2,
    "language": "English",
    "trailerKey": "bpXfcT61cbA",
    "director": "Denis Villeneuve",
    "category": "popular",
    "cast": [
      {
        "name": "Hugh Jackman",
        "character": "Keller Dover",
        "profileUrl": "https://image.tmdb.org/t/p/w185/hughjackman.jpg"
      },
      {
        "name": "Jake Gyllenhaal",
        "character": "Detective Loki",
        "profileUrl": "https://image.tmdb.org/t/p/w185/jakeg.jpg"
      },
      {
        "name": "Viola Davis",
        "character": "Nancy Birch",
        "profileUrl": "https://image.tmdb.org/t/p/w185/violadavis.jpg"
      }
    ],
    "showtimes": [
      "12:15 PM",
      "03:45 PM",
      "07:15 PM",
      "10:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000063",
    "title": "Se7en",
    "aliases": [
      "Seven",
      "Seven 1995"
    ],
    "industry": "Hollywood",
    "description": "Two detectives, a rookie and a veteran, hunt a serial killer who uses the seven deadly sins as his motifs in a rain-soaked, morally decayed metropolis.",
    "genre": [
      "Mystery",
      "Crime",
      "Thriller",
      "Drama"
    ],
    "duration": 127,
    "posterUrl": "https://image.tmdb.org/t/p/w780/6yoghtyTBoPquCO0Qv9NqnSZ.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/se7en_bg.jpg",
    "releaseDate": "1995-09-22T00:00:00.000Z",
    "ticketPrice": 280,
    "theater": "TCL Chinese Theatre IMAX",
    "rating": 8.6,
    "language": "English",
    "trailerKey": "znmZoVkCjpI",
    "director": "David Fincher",
    "category": "popular",
    "cast": [
      {
        "name": "Brad Pitt",
        "character": "Detective David Mills",
        "profileUrl": "https://image.tmdb.org/t/p/w185/bradpitt.jpg"
      },
      {
        "name": "Morgan Freeman",
        "character": "Detective William Somerset",
        "profileUrl": "https://image.tmdb.org/t/p/w185/morganfreeman.jpg"
      },
      {
        "name": "Kevin Spacey",
        "character": "John Doe",
        "profileUrl": "https://image.tmdb.org/t/p/w185/kevinspacey.jpg"
      }
    ],
    "showtimes": [
      "01:30 PM",
      "05:00 PM",
      "08:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000064",
    "title": "Memento",
    "aliases": [
      "Memento 2000"
    ],
    "industry": "Hollywood",
    "description": "A man with short-term memory loss attempts to track down his wife’s murderer, using an intricate system of polaroids and tattoos to piece together his fractured reality.",
    "genre": [
      "Mystery",
      "Thriller",
      "Crime"
    ],
    "duration": 113,
    "posterUrl": "https://image.tmdb.org/t/p/w780/memento_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/memento_bg.jpg",
    "releaseDate": "2000-10-11T00:00:00.000Z",
    "ticketPrice": 270,
    "theater": "Curzon Mayfair Cinema",
    "rating": 8.4,
    "language": "English",
    "trailerKey": "0vS0E9bBS74",
    "director": "Christopher Nolan",
    "category": "popular",
    "cast": [
      {
        "name": "Guy Pearce",
        "character": "Leonard Shelby",
        "profileUrl": "https://image.tmdb.org/t/p/w185/guypearce.jpg"
      },
      {
        "name": "Carrie-Anne Moss",
        "character": "Natalie",
        "profileUrl": "https://image.tmdb.org/t/p/w185/carrieannemoss.jpg"
      },
      {
        "name": "Joe Pantoliano",
        "character": "Teddy",
        "profileUrl": "https://image.tmdb.org/t/p/w185/pantoliano.jpg"
      }
    ],
    "showtimes": [
      "11:45 AM",
      "03:15 PM",
      "06:45 PM",
      "09:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000065",
    "title": "Glass Onion: A Knives Out Mystery",
    "aliases": [
      "Glass Onion",
      "Knives Out 2"
    ],
    "industry": "Hollywood",
    "description": "Famed Southern detective Benoit Blanc travels to a private Greek island to unravel a convoluted murder mystery hosted by a eccentric tech billionaire.",
    "genre": [
      "Mystery",
      "Comedy",
      "Crime",
      "Drama"
    ],
    "duration": 139,
    "posterUrl": "https://image.tmdb.org/t/p/w780/vDGr1YdrlfbU9wxTOdpf3zChmv9.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/dKQA85fA2aLq.jpg",
    "releaseDate": "2022-11-23T00:00:00.000Z",
    "ticketPrice": 285,
    "theater": "Alamo Drafthouse Cinema",
    "rating": 7.1,
    "language": "English",
    "trailerKey": "gj5ibYSz8C0",
    "director": "Rian Johnson",
    "category": "popular",
    "cast": [
      {
        "name": "Daniel Craig",
        "character": "Benoit Blanc",
        "profileUrl": "https://image.tmdb.org/t/p/w185/danielcraig.jpg"
      },
      {
        "name": "Edward Norton",
        "character": "Miles Bron",
        "profileUrl": "https://image.tmdb.org/t/p/w185/edwardnorton.jpg"
      },
      {
        "name": "Janelle Monáe",
        "character": "Helen Brand / Andi Brand",
        "profileUrl": "https://image.tmdb.org/t/p/w185/monae.jpg"
      }
    ],
    "showtimes": [
      "12:30 PM",
      "04:15 PM",
      "07:45 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000066",
    "title": "Return of Hanuman",
    "aliases": [
      "Hanuman Returns",
      "Hanuman 2"
    ],
    "industry": "Bollywood",
    "description": "Lord Hanuman decides to take human reincarnation as an ordinary modern schoolboy to defeat ancient asuras revived in the contemporary world.",
    "genre": [
      "Animation",
      "Adventure",
      "Fantasy",
      "Family",
      "Action"
    ],
    "duration": 105,
    "posterUrl": "https://image.tmdb.org/t/p/w780/hanuman2_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/hanuman2_bg.jpg",
    "releaseDate": "2007-12-28T00:00:00.000Z",
    "ticketPrice": 240,
    "theater": "PVR Anupam Cinema",
    "rating": 7.4,
    "language": "Hindi",
    "trailerKey": "v6Z2M7s_xU8",
    "director": "Anurag Kashyap",
    "category": "popular",
    "cast": [
      {
        "name": "Ayesha Takia",
        "character": "Special Appearance (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ayeshatakia.jpg"
      },
      {
        "name": "Makrand Deshpande",
        "character": "Narrator / Evil Priest",
        "profileUrl": "https://image.tmdb.org/t/p/w185/makrand.jpg"
      }
    ],
    "showtimes": [
      "10:00 AM",
      "01:30 PM",
      "05:00 PM",
      "08:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000067",
    "title": "Delhi Safari",
    "aliases": [
      "Delhi Safari 3D"
    ],
    "industry": "Bollywood",
    "description": "A group of spirited animals journey across India from Mumbai to Delhi to speak directly to the Parliament and save their forest habitat from urban deforestation.",
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family"
    ],
    "duration": 96,
    "posterUrl": "https://image.tmdb.org/t/p/w780/delhi_safari_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/delhi_safari_bg.jpg",
    "releaseDate": "2012-10-19T00:00:00.000Z",
    "ticketPrice": 250,
    "theater": "Cinemax Animation Dome",
    "rating": 7,
    "language": "Hindi",
    "trailerKey": "9r2t4y6u8i0",
    "director": "Nikhil Advani",
    "category": "popular",
    "cast": [
      {
        "name": "Govinda",
        "character": "Bajrangi the Monkey (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/govinda.jpg"
      },
      {
        "name": "Suniel Shetty",
        "character": "Sultan the Leopard (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/suniel.jpg"
      },
      {
        "name": "Boman Irani",
        "character": "Bagga the Bear (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/bomanirani.jpg"
      }
    ],
    "showtimes": [
      "11:00 AM",
      "02:30 PM",
      "06:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000068",
    "title": "Mahabharat 3D",
    "aliases": [
      "Mahabharat Animation"
    ],
    "industry": "Bollywood",
    "description": "The sacred epic saga of the Pandavas and Kauravas brought to life in state-of-the-art 3D animation featuring Bollywood legends voicing iconic warriors.",
    "genre": [
      "Animation",
      "Action",
      "Drama",
      "History",
      "Fantasy"
    ],
    "duration": 125,
    "posterUrl": "https://image.tmdb.org/t/p/w780/mahabharat3d_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/mahabharat3d_bg.jpg",
    "releaseDate": "2013-12-27T00:00:00.000Z",
    "ticketPrice": 260,
    "theater": "PVR Heritage Epic Cinema",
    "rating": 7.1,
    "language": "Hindi",
    "trailerKey": "w8s9d7f6g5h",
    "director": "Amaan Khan",
    "category": "popular",
    "cast": [
      {
        "name": "Amitabh Bachchan",
        "character": "Bheeshma Pitamah (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/amitabh.jpg"
      },
      {
        "name": "Ajay Devgn",
        "character": "Duryodhan (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ajaydevgn.jpg"
      },
      {
        "name": "Vidya Balan",
        "character": "Draupadi (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/vidyabalan.jpg"
      },
      {
        "name": "Sunny Deol",
        "character": "Bheem (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/sunnydeol.jpg"
      }
    ],
    "showtimes": [
      "01:00 PM",
      "04:30 PM",
      "08:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000069",
    "title": "Bal Ganesh",
    "aliases": [
      "Bal Ganesha"
    ],
    "industry": "Bollywood",
    "description": "Charming adventures of the baby elephant-headed god Lord Ganesh as he outwits demons, rescues his friends, and celebrates celestial sweets.",
    "genre": [
      "Animation",
      "Family",
      "Fantasy",
      "Musical"
    ],
    "duration": 103,
    "posterUrl": "https://image.tmdb.org/t/p/w780/balganesh_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/balganesh_bg.jpg",
    "releaseDate": "2007-10-26T00:00:00.000Z",
    "ticketPrice": 240,
    "theater": "Miraj Cinemas Family Screen",
    "rating": 7.2,
    "language": "Hindi",
    "trailerKey": "z4x5c6v7b8n",
    "director": "Pankaj Sharma",
    "category": "popular",
    "cast": [
      {
        "name": "Ashar Shaikh",
        "character": "Bal Ganesh (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ashar.jpg"
      },
      {
        "name": "Adarsh Gautam",
        "character": "Lord Shiva (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/adarsh.jpg"
      }
    ],
    "showtimes": [
      "10:30 AM",
      "02:00 PM",
      "05:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000006a",
    "title": "Ratatouille",
    "aliases": [
      "Remy"
    ],
    "industry": "Hollywood",
    "description": "A rat named Remy with an extraordinarily refined palate dreams of becoming a world-renowned Parisian chef, making an unusual alliance with a hapless garbage boy.",
    "genre": [
      "Animation",
      "Comedy",
      "Family",
      "Drama"
    ],
    "duration": 111,
    "posterUrl": "https://image.tmdb.org/t/p/w780/t3vaWRPSf6WjDSamIkK9B92p.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/q7n2yC4J9f3m9w5x.jpg",
    "releaseDate": "2007-06-29T00:00:00.000Z",
    "ticketPrice": 275,
    "theater": "El Capitan Theatre Hollywood",
    "rating": 8.1,
    "language": "English",
    "trailerKey": "NgsQ8mVNnM8",
    "director": "Brad Bird",
    "category": "popular",
    "cast": [
      {
        "name": "Patton Oswalt",
        "character": "Remy (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/pattonoswalt.jpg"
      },
      {
        "name": "Lou Romano",
        "character": "Alfredo Linguini (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/louromano.jpg"
      },
      {
        "name": "Peter O'Toole",
        "character": "Anton Ego (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/otoole.jpg"
      }
    ],
    "showtimes": [
      "11:15 AM",
      "02:45 PM",
      "06:15 PM",
      "09:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000006b",
    "title": "Up",
    "aliases": [
      "Up Pixar"
    ],
    "industry": "Hollywood",
    "description": "78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with thousands of helium balloons, inadvertently taking an overzealous young boy scout with him.",
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family",
      "Drama"
    ],
    "duration": 96,
    "posterUrl": "https://image.tmdb.org/t/p/w780/vpbaStTMt8qq9EIpG2f.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/kC3p0g1g2z.jpg",
    "releaseDate": "2009-05-29T00:00:00.000Z",
    "ticketPrice": 280,
    "theater": "Odeon IMAX Luxe",
    "rating": 8.3,
    "language": "English",
    "trailerKey": "ORFWdXl_zJ4",
    "director": "Pete Docter",
    "category": "popular",
    "cast": [
      {
        "name": "Ed Asner",
        "character": "Carl Fredricksen (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/edasner.jpg"
      },
      {
        "name": "Jordan Nagai",
        "character": "Russell (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/jordannagai.jpg"
      },
      {
        "name": "Christopher Plummer",
        "character": "Charles Muntz (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/plummer.jpg"
      }
    ],
    "showtimes": [
      "10:45 AM",
      "01:45 PM",
      "05:15 PM",
      "08:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000006c",
    "title": "Finding Nemo",
    "aliases": [
      "Nemo"
    ],
    "industry": "Hollywood",
    "description": "After his son is captured in the Great Barrier Reef and taken to Sydney, a timid clownfish embarks on a perilous journey to bring him home alongside a forgetful blue tang.",
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family"
    ],
    "duration": 100,
    "posterUrl": "https://image.tmdb.org/t/p/w780/eHuGQ10ocZZGRau5J.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/nemo_bg.jpg",
    "releaseDate": "2003-05-30T00:00:00.000Z",
    "ticketPrice": 275,
    "theater": "BFI IMAX London",
    "rating": 8.2,
    "language": "English",
    "trailerKey": "2zLkasScy7A",
    "director": "Andrew Stanton",
    "category": "popular",
    "cast": [
      {
        "name": "Albert Brooks",
        "character": "Marlin (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/albertbrooks.jpg"
      },
      {
        "name": "Ellen DeGeneres",
        "character": "Dory (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ellendegeneres.jpg"
      },
      {
        "name": "Alexander Gould",
        "character": "Nemo (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/alexgould.jpg"
      }
    ],
    "showtimes": [
      "11:00 AM",
      "02:30 PM",
      "06:00 PM",
      "09:15 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000006d",
    "title": "Toy Story",
    "aliases": [
      "Toy Story 1"
    ],
    "industry": "Hollywood",
    "description": "A cowboy doll is profoundly threatened and jealous when a high-tech spaceman action figure supplants him as top toy in a boy's bedroom.",
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Family"
    ],
    "duration": 81,
    "posterUrl": "https://image.tmdb.org/t/p/w780/uXDfjJbdP4ijW535BT.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/toystory_bg.jpg",
    "releaseDate": "1995-11-22T00:00:00.000Z",
    "ticketPrice": 270,
    "theater": "Regal Dolby Cinema",
    "rating": 8.3,
    "language": "English",
    "trailerKey": "v-PjgYDrg70",
    "director": "John Lasseter",
    "category": "popular",
    "cast": [
      {
        "name": "Tom Hanks",
        "character": "Woody (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/tomhanks.jpg"
      },
      {
        "name": "Tim Allen",
        "character": "Buzz Lightyear (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/timallen.jpg"
      },
      {
        "name": "Don Rickles",
        "character": "Mr. Potato Head (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/donrickles.jpg"
      }
    ],
    "showtimes": [
      "10:15 AM",
      "01:15 PM",
      "04:45 PM",
      "07:45 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000006e",
    "title": "Spider-Man: Into the Spider-Verse",
    "aliases": [
      "Spider-Verse",
      "Into the Spider-Verse"
    ],
    "industry": "Hollywood",
    "description": "Teenager Miles Morales becomes the new Spider-Man and joins other Spider-Heroes from alternate dimensions to stop a threat to all existence.",
    "genre": [
      "Animation",
      "Action",
      "Sci-Fi",
      "Adventure",
      "Family"
    ],
    "duration": 117,
    "posterUrl": "https://image.tmdb.org/t/p/w780/iiZZdoQBEYBv6id8su7bp.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/spiderverse_bg.jpg",
    "releaseDate": "2018-12-14T00:00:00.000Z",
    "ticketPrice": 285,
    "theater": "AMC IMAX Laser 3D",
    "rating": 8.4,
    "language": "English",
    "trailerKey": "tg52up16eq0",
    "director": "Bob Persichetti, Peter Ramsey, Rodney Rothman",
    "category": "popular",
    "cast": [
      {
        "name": "Shameik Moore",
        "character": "Miles Morales (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/shameik.jpg"
      },
      {
        "name": "Jake Johnson",
        "character": "Peter B. Parker (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/jakejohnson.jpg"
      },
      {
        "name": "Hailee Steinfeld",
        "character": "Gwen Stacy (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/haileesteinfeld.jpg"
      }
    ],
    "showtimes": [
      "12:00 PM",
      "03:30 PM",
      "07:00 PM",
      "10:15 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000006f",
    "title": "Puss in Boots: The Last Wish",
    "aliases": [
      "Puss in Boots 2",
      "The Last Wish"
    ],
    "industry": "Hollywood",
    "description": "Puss in Boots discovers that his passion for adventure has taken its toll: he has burned through eight of his nine lives. He launches an epic quest to find the mythical Last Wish.",
    "genre": [
      "Animation",
      "Adventure",
      "Comedy",
      "Fantasy",
      "Family"
    ],
    "duration": 102,
    "posterUrl": "https://image.tmdb.org/t/p/w780/kuf6dutpsT0vSV9VvD.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/lastwish_bg.jpg",
    "releaseDate": "2022-12-21T00:00:00.000Z",
    "ticketPrice": 275,
    "theater": "Cineworld IMAX ScreenX",
    "rating": 7.9,
    "language": "English",
    "trailerKey": "RqrXhwS3PeI",
    "director": "Joel Crawford",
    "category": "now_playing",
    "cast": [
      {
        "name": "Antonio Banderas",
        "character": "Puss in Boots (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/banderas.jpg"
      },
      {
        "name": "Salma Hayek Pinault",
        "character": "Kitty Softpaws (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/salmahayek.jpg"
      },
      {
        "name": "Harvey Guillén",
        "character": "Perrito (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/harvey.jpg"
      }
    ],
    "showtimes": [
      "11:30 AM",
      "02:45 PM",
      "06:15 PM",
      "09:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000070",
    "title": "Zootopia",
    "aliases": [
      "Zootropolis"
    ],
    "industry": "Hollywood",
    "description": "In a city of anthropomorphic animals, a rookie bunny cop and a cynical con artist fox must work together to uncover a sinister conspiracy shaking the metropolis.",
    "genre": [
      "Animation",
      "Comedy",
      "Adventure",
      "Family",
      "Mystery"
    ],
    "duration": 108,
    "posterUrl": "https://image.tmdb.org/t/p/w780/hlK0e0wAQ3V2L8648.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/zootopia_bg.jpg",
    "releaseDate": "2016-03-04T00:00:00.000Z",
    "ticketPrice": 275,
    "theater": "Regal IMAX South Beach",
    "rating": 8,
    "language": "English",
    "trailerKey": "jWM0ct-OLsM",
    "director": "Byron Howard, Rich Moore",
    "category": "popular",
    "cast": [
      {
        "name": "Ginnifer Goodwin",
        "character": "Judy Hopps (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/goodwin.jpg"
      },
      {
        "name": "Jason Bateman",
        "character": "Nick Wilde (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/bateman.jpg"
      },
      {
        "name": "Idris Elba",
        "character": "Chief Bogo (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/idriselba.jpg"
      }
    ],
    "showtimes": [
      "10:45 AM",
      "02:15 PM",
      "05:45 PM",
      "08:45 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000071",
    "title": "Shrek",
    "aliases": [
      "Shrek 1"
    ],
    "industry": "Hollywood",
    "description": "A mean lord exiles fairytale creatures to the swamp of a grumpy ogre, who must go on a quest and rescue a spirited princess for the lord in order to regain his land.",
    "genre": [
      "Animation",
      "Comedy",
      "Fantasy",
      "Adventure",
      "Romance",
      "Family"
    ],
    "duration": 90,
    "posterUrl": "https://image.tmdb.org/t/p/w780/dyhaB19AIC4Nt2.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/shrek_bg.jpg",
    "releaseDate": "2001-05-18T00:00:00.000Z",
    "ticketPrice": 260,
    "theater": "Odeon Luxe Haymarket",
    "rating": 7.9,
    "language": "English",
    "trailerKey": "CwXOrWvPBP8",
    "director": "Andrew Adamson, Vicky Jenson",
    "category": "popular",
    "cast": [
      {
        "name": "Mike Myers",
        "character": "Shrek (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/mikemyers.jpg"
      },
      {
        "name": "Eddie Murphy",
        "character": "Donkey (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/eddiemurphy.jpg"
      },
      {
        "name": "Cameron Diaz",
        "character": "Princess Fiona (Voice)",
        "profileUrl": "https://image.tmdb.org/t/p/w185/camerondiaz.jpg"
      }
    ],
    "showtimes": [
      "11:30 AM",
      "02:30 PM",
      "05:30 PM",
      "08:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000072",
    "title": "Laila Majnu",
    "aliases": [
      "Laila Majnu 2018"
    ],
    "industry": "Bollywood",
    "description": "Taking the legendary folklore into modern-day Kashmir, star-crossed lovers Qais and Laila deal with family feuds, societal expectations, and passion that turns into pure obsession.",
    "genre": [
      "Romance",
      "Drama"
    ],
    "duration": 140,
    "posterUrl": "https://image.tmdb.org/t/p/w780/lailamajnu_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/lailamajnu_bg.jpg",
    "releaseDate": "2018-09-07T00:00:00.000Z",
    "ticketPrice": 260,
    "theater": "PVR INOX Palladium",
    "rating": 7.8,
    "language": "Hindi",
    "trailerKey": "Cv4D8C4yKlo",
    "director": "Sajid Ali",
    "category": "popular",
    "cast": [
      {
        "name": "Avinash Tiwary",
        "character": "Qais Bhatt / Majnu",
        "profileUrl": "https://image.tmdb.org/t/p/w185/avinashtiwary.jpg"
      },
      {
        "name": "Triptii Dimri",
        "character": "Laila",
        "profileUrl": "https://image.tmdb.org/t/p/w185/triptiidimri.jpg"
      },
      {
        "name": "Mir Sarwar",
        "character": "Ghulam Sarwar",
        "profileUrl": "https://image.tmdb.org/t/p/w185/mirsarwar.jpg"
      }
    ],
    "showtimes": [
      "12:15 PM",
      "03:45 PM",
      "07:15 PM",
      "10:15 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000073",
    "title": "Tamasha",
    "aliases": [
      "Matargashti"
    ],
    "industry": "Bollywood",
    "description": "Ved and Tara meet in Corsica and decide not to disclose their real identities. When they reunite in Delhi years later, Tara helps Ved break free from his mundane corporate monotony.",
    "genre": [
      "Romance",
      "Drama",
      "Comedy"
    ],
    "duration": 139,
    "posterUrl": "https://image.tmdb.org/t/p/w780/tamasha_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/tamasha_bg.jpg",
    "releaseDate": "2015-11-27T00:00:00.000Z",
    "ticketPrice": 270,
    "theater": "Cinepolis VIP Cinema",
    "rating": 7.4,
    "language": "Hindi",
    "trailerKey": "o-e5eWVC344",
    "director": "Imtiaz Ali",
    "category": "popular",
    "cast": [
      {
        "name": "Ranbir Kapoor",
        "character": "Ved Vardhan Sahni",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ranbirkapoor.jpg"
      },
      {
        "name": "Deepika Padukone",
        "character": "Tara Maheshwari",
        "profileUrl": "https://image.tmdb.org/t/p/w185/deepikapadukone.jpg"
      },
      {
        "name": "Piyush Mishra",
        "character": "Storyteller",
        "profileUrl": "https://image.tmdb.org/t/p/w185/piyushmishra.jpg"
      }
    ],
    "showtimes": [
      "01:00 PM",
      "04:30 PM",
      "08:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000074",
    "title": "Sanam Teri Kasam",
    "aliases": [
      "Sanam Teri Kasam 2016"
    ],
    "industry": "Bollywood",
    "description": "An ex-convict with a heart of gold helps an awkward librarian transform her appearance and pursue love, leading to a profound, tragic romantic bond.",
    "genre": [
      "Romance",
      "Drama",
      "Musical"
    ],
    "duration": 154,
    "posterUrl": "https://image.tmdb.org/t/p/w780/sanam_teri_kasam_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/sanam_teri_kasam_bg.jpg",
    "releaseDate": "2016-02-05T00:00:00.000Z",
    "ticketPrice": 260,
    "theater": "PVR INOX Heritage Mall",
    "rating": 7.6,
    "language": "Hindi",
    "trailerKey": "1IP3_7T304c",
    "director": "Radhika Rao, Vinay Sapru",
    "category": "popular",
    "cast": [
      {
        "name": "Harshvardhan Rane",
        "character": "Inder Lal Parihaar",
        "profileUrl": "https://image.tmdb.org/t/p/w185/harshvardhan.jpg"
      },
      {
        "name": "Mawra Hocane",
        "character": "Saraswati 'Saru' Parthasaarthy",
        "profileUrl": "https://image.tmdb.org/t/p/w185/mawra.jpg"
      },
      {
        "name": "Vijay Raaz",
        "character": "Mustaqeem",
        "profileUrl": "https://image.tmdb.org/t/p/w185/vijayraaz.jpg"
      }
    ],
    "showtimes": [
      "11:45 AM",
      "03:15 PM",
      "06:45 PM",
      "10:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000075",
    "title": "Raanjhanaa",
    "aliases": [
      "Raanjhana"
    ],
    "industry": "Bollywood",
    "description": "Kundan, the son of a Hindu pundit in Varanasi, falls in love with Zoya, a Muslim girl, and spends his entire life pursuing her, inadvertently intertwining with campus student politics.",
    "genre": [
      "Romance",
      "Drama"
    ],
    "duration": 140,
    "posterUrl": "https://image.tmdb.org/t/p/w780/raanjhanaa_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/raanjhanaa_bg.jpg",
    "releaseDate": "2013-06-21T00:00:00.000Z",
    "ticketPrice": 250,
    "theater": "Waves Cinema Grand Hall",
    "rating": 7.6,
    "language": "Hindi",
    "trailerKey": "kY3Su_k-W1c",
    "director": "Aanand L. Rai",
    "category": "popular",
    "cast": [
      {
        "name": "Dhanush",
        "character": "Kundan Shankar",
        "profileUrl": "https://image.tmdb.org/t/p/w185/dhanush.jpg"
      },
      {
        "name": "Sonam Kapoor",
        "character": "Zoya Haider",
        "profileUrl": "https://image.tmdb.org/t/p/w185/sonamkapoor.jpg"
      },
      {
        "name": "Abhay Deol",
        "character": "Jasjeet Singh Shergill",
        "profileUrl": "https://image.tmdb.org/t/p/w185/abhaydeol.jpg"
      }
    ],
    "showtimes": [
      "12:30 PM",
      "04:00 PM",
      "07:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000076",
    "title": "Kal Ho Naa Ho",
    "aliases": [
      "KHNH",
      "Kal Ho Na Ho"
    ],
    "industry": "Bollywood",
    "description": "An introverted, chronically depressed MBA student in New York falls in love with her vibrant new neighbor, who harbors a fatal secret that leads him to play matchmaker with her best friend.",
    "genre": [
      "Romance",
      "Drama",
      "Comedy",
      "Musical"
    ],
    "duration": 186,
    "posterUrl": "https://image.tmdb.org/t/p/w780/khnh_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/khnh_bg.jpg",
    "releaseDate": "2003-11-28T00:00:00.000Z",
    "ticketPrice": 275,
    "theater": "Regal Times Square NYC",
    "rating": 7.9,
    "language": "Hindi",
    "trailerKey": "r5340yA1-uU",
    "director": "Nikkhil Advani",
    "category": "popular",
    "cast": [
      {
        "name": "Shah Rukh Khan",
        "character": "Aman Mathur",
        "profileUrl": "https://image.tmdb.org/t/p/w185/shahrukhkhan.jpg"
      },
      {
        "name": "Preity Zinta",
        "character": "Naina Catherine Kapur",
        "profileUrl": "https://image.tmdb.org/t/p/w185/preityzinta.jpg"
      },
      {
        "name": "Saif Ali Khan",
        "character": "Rohit Patel",
        "profileUrl": "https://image.tmdb.org/t/p/w185/saifalikhan.jpg"
      },
      {
        "name": "Jaya Bachchan",
        "character": "Jennifer Kapur",
        "profileUrl": "https://image.tmdb.org/t/p/w185/jayabachchan.jpg"
      }
    ],
    "showtimes": [
      "11:00 AM",
      "03:15 PM",
      "07:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000077",
    "title": "Kuch Kuch Hota Hai",
    "aliases": [
      "KKHH"
    ],
    "industry": "Bollywood",
    "description": "During their college years, Anjali is secretly in love with her best friend Rahul, who falls for Tina. Years after Tina passes away, her eight-year-old daughter sets out to reunite Rahul with Anjali.",
    "genre": [
      "Romance",
      "Drama",
      "Comedy",
      "Musical"
    ],
    "duration": 185,
    "posterUrl": "https://image.tmdb.org/t/p/w780/kkhh_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/kkhh_bg.jpg",
    "releaseDate": "1998-10-16T00:00:00.000Z",
    "ticketPrice": 270,
    "theater": "PVR ICON Gold Screen",
    "rating": 7.6,
    "language": "Hindi",
    "trailerKey": "zNq3A6jUfFo",
    "director": "Karan Johar",
    "category": "popular",
    "cast": [
      {
        "name": "Shah Rukh Khan",
        "character": "Rahul Khanna",
        "profileUrl": "https://image.tmdb.org/t/p/w185/shahrukhkhan.jpg"
      },
      {
        "name": "Kajol",
        "character": "Anjali Sharma",
        "profileUrl": "https://image.tmdb.org/t/p/w185/kajol.jpg"
      },
      {
        "name": "Rani Mukerji",
        "character": "Tina Malhotra",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ranimukerji.jpg"
      },
      {
        "name": "Salman Khan",
        "character": "Aman Mehra",
        "profileUrl": "https://image.tmdb.org/t/p/w185/salmankhan.jpg"
      }
    ],
    "showtimes": [
      "12:00 PM",
      "04:15 PM",
      "08:30 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000078",
    "title": "Eternal Sunshine of the Spotless Mind",
    "aliases": [
      "Eternal Sunshine"
    ],
    "industry": "Hollywood",
    "description": "When their relationship turns sour, a couple undergoes a high-tech medical procedure to have each other erased from their memories, only to rediscover their undeniable spark.",
    "genre": [
      "Romance",
      "Sci-Fi",
      "Drama"
    ],
    "duration": 108,
    "posterUrl": "https://image.tmdb.org/t/p/w780/5MwkWH9tYHv3mV9OdYTMR5qreIz.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/eternalsunshine_bg.jpg",
    "releaseDate": "2004-03-19T00:00:00.000Z",
    "ticketPrice": 285,
    "theater": "Curzon Bloomsbury Screen 1",
    "rating": 8.3,
    "language": "English",
    "trailerKey": "0zFywiAh7lc",
    "director": "Michel Gondry",
    "category": "popular",
    "cast": [
      {
        "name": "Jim Carrey",
        "character": "Joel Barish",
        "profileUrl": "https://image.tmdb.org/t/p/w185/jimcarrey.jpg"
      },
      {
        "name": "Kate Winslet",
        "character": "Clementine Kruczynski",
        "profileUrl": "https://image.tmdb.org/t/p/w185/katewinslet.jpg"
      },
      {
        "name": "Kirsten Dunst",
        "character": "Mary Svevo",
        "profileUrl": "https://image.tmdb.org/t/p/w185/kirstendunst.jpg"
      },
      {
        "name": "Mark Ruffalo",
        "character": "Stan",
        "profileUrl": "https://image.tmdb.org/t/p/w185/markruffalo.jpg"
      }
    ],
    "showtimes": [
      "01:15 PM",
      "04:45 PM",
      "08:15 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b0000000000000000079",
    "title": "Pride & Prejudice",
    "aliases": [
      "Pride and Prejudice"
    ],
    "industry": "Hollywood",
    "description": "Sparks fly when spirited Elizabeth Bennet meets the single, rich, and proud Mr. Darcy. But Mr. Darcy reluctantly finds himself falling in love with a woman beneath his class.",
    "genre": [
      "Romance",
      "Drama",
      "History"
    ],
    "duration": 129,
    "posterUrl": "https://image.tmdb.org/t/p/w780/pride_prejudice_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/pride_prejudice_bg.jpg",
    "releaseDate": "2005-09-16T00:00:00.000Z",
    "ticketPrice": 275,
    "theater": "Regal Mayfair Luxury Screen",
    "rating": 7.8,
    "language": "English",
    "trailerKey": "1dYv5u6v55Y",
    "director": "Joe Wright",
    "category": "popular",
    "cast": [
      {
        "name": "Keira Knightley",
        "character": "Elizabeth Bennet",
        "profileUrl": "https://image.tmdb.org/t/p/w185/keiraknightley.jpg"
      },
      {
        "name": "Matthew Macfadyen",
        "character": "Mr. Darcy",
        "profileUrl": "https://image.tmdb.org/t/p/w185/macfadyen.jpg"
      },
      {
        "name": "Donald Sutherland",
        "character": "Mr. Bennet",
        "profileUrl": "https://image.tmdb.org/t/p/w185/sutherland.jpg"
      }
    ],
    "showtimes": [
      "11:30 AM",
      "03:00 PM",
      "06:30 PM",
      "09:45 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000007a",
    "title": "About Time",
    "aliases": [
      "About Time 2013"
    ],
    "industry": "Hollywood",
    "description": "At the age of 21, Tim discovers he can travel in time and change what happens and has happened in his own life. His decision to make his world a better place by getting a girlfriend turns out not to be as easy as you might think.",
    "genre": [
      "Romance",
      "Fantasy",
      "Comedy",
      "Drama",
      "Sci-Fi"
    ],
    "duration": 123,
    "posterUrl": "https://image.tmdb.org/t/p/w780/about_time_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/about_time_bg.jpg",
    "releaseDate": "2013-09-04T00:00:00.000Z",
    "ticketPrice": 270,
    "theater": "Odeon Covent Garden",
    "rating": 7.8,
    "language": "English",
    "trailerKey": "T7A810DuHvw",
    "director": "Richard Curtis",
    "category": "popular",
    "cast": [
      {
        "name": "Domhnall Gleeson",
        "character": "Tim Lake",
        "profileUrl": "https://image.tmdb.org/t/p/w185/gleeson.jpg"
      },
      {
        "name": "Rachel McAdams",
        "character": "Mary",
        "profileUrl": "https://image.tmdb.org/t/p/w185/rachelmcadams.jpg"
      },
      {
        "name": "Bill Nighy",
        "character": "Dad",
        "profileUrl": "https://image.tmdb.org/t/p/w185/billnighy.jpg"
      }
    ],
    "showtimes": [
      "12:15 PM",
      "03:45 PM",
      "07:15 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000007b",
    "title": "(500) Days of Summer",
    "aliases": [
      "500 Days of Summer",
      "Five Hundred Days of Summer"
    ],
    "industry": "Hollywood",
    "description": "An offbeat romantic comedy about a greeting card writer and hopeless romantic who reflects on his 500-day romance with a girl who does not believe true love exists.",
    "genre": [
      "Romance",
      "Comedy",
      "Drama"
    ],
    "duration": 95,
    "posterUrl": "https://image.tmdb.org/t/p/w780/500_days_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/500_days_bg.jpg",
    "releaseDate": "2009-07-17T00:00:00.000Z",
    "ticketPrice": 265,
    "theater": "AMC Lincoln Square",
    "rating": 7.7,
    "language": "English",
    "trailerKey": "PsD0NpFLGYk",
    "director": "Marc Webb",
    "category": "popular",
    "cast": [
      {
        "name": "Joseph Gordon-Levitt",
        "character": "Tom Hansen",
        "profileUrl": "https://image.tmdb.org/t/p/w185/jgl.jpg"
      },
      {
        "name": "Zooey Deschanel",
        "character": "Summer Finn",
        "profileUrl": "https://image.tmdb.org/t/p/w185/zooey.jpg"
      },
      {
        "name": "Chloë Grace Moretz",
        "character": "Rachel Hansen",
        "profileUrl": "https://image.tmdb.org/t/p/w185/chloegrace.jpg"
      }
    ],
    "showtimes": [
      "01:30 PM",
      "04:45 PM",
      "08:00 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  },

  {
    "_id": "65f1b000000000000000007c",
    "title": "A Star Is Born",
    "aliases": [
      "Star Is Born"
    ],
    "industry": "Hollywood",
    "description": "A seasoned musician with addictions helps a struggling young singer find fame as age and alcoholism send his own career into a downward spiral.",
    "genre": [
      "Romance",
      "Drama",
      "Musical"
    ],
    "duration": 136,
    "posterUrl": "https://image.tmdb.org/t/p/w780/star_is_born_poster.jpg",
    "backdropUrl": "https://image.tmdb.org/t/p/w1280/star_is_born_bg.jpg",
    "releaseDate": "2018-10-05T00:00:00.000Z",
    "ticketPrice": 280,
    "theater": "Dolby Cinema at Vine St",
    "rating": 7.6,
    "language": "English",
    "trailerKey": "nSbzyEJ8X9G",
    "director": "Bradley Cooper",
    "category": "popular",
    "cast": [
      {
        "name": "Lady Gaga",
        "character": "Ally Maine",
        "profileUrl": "https://image.tmdb.org/t/p/w185/ladygaga.jpg"
      },
      {
        "name": "Bradley Cooper",
        "character": "Jackson Maine",
        "profileUrl": "https://image.tmdb.org/t/p/w185/bradleycooper.jpg"
      },
      {
        "name": "Sam Elliott",
        "character": "Bobby Maine",
        "profileUrl": "https://image.tmdb.org/t/p/w185/samelliott.jpg"
      }
    ],
    "showtimes": [
      "12:45 PM",
      "04:15 PM",
      "07:45 PM",
      "10:45 PM"
    ],
    "countryAvailability": [
      "US",
      "GB",
      "IN",
      "CA",
      "AU",
      "DE",
      "JP",
      "SG",
      "AE"
    ]
  }
];

const today = new Date().toISOString().split('T')[0];
const INITIAL_BOOKINGS = [
  {
    _id: '65f1c0000000000000000001',
    bookingRef: 'IMV-2026-X7942',
    user: '65f1a0000000000000000002',
    movie: '65f1b0000000000000000001',
    cinema: 'iMovies IMAX Laser - Screen 1',
    city: 'Mumbai',
    country: 'IN',
    currency: 'INR',
    seats: ['D4', 'D5', 'E6', 'E7'],
    seatTier: 'Standard & VIP',
    totalPrice: 1280,
    showDate: today,
    showTime: '06:30 PM',
    customer: {
      name: 'Tanishq Pardeshi',
      email: 'user@imovies.com',
      phone: '+91 98765 43210'
    },
    paymentStatus: 'paid',
    paymentMethod: 'Simulated Card',
    paymentTransactionId: 'TXN_VIP9472A',
    status: 'confirmed',
    bookingDate: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    _id: '65f1c0000000000000000002',
    bookingRef: 'IMV-2026-L8193',
    user: '65f1a0000000000000000002',
    movie: '65f1b0000000000000000021',
    cinema: 'iMovies PVR Luxe Lower Parel',
    city: 'Mumbai',
    country: 'IN',
    currency: 'INR',
    seats: ['F3', 'F4'],
    seatTier: 'VIP Recliner',
    totalPrice: 700,
    showDate: today,
    showTime: '07:30 PM',
    customer: {
      name: 'Tanishq Pardeshi',
      email: 'user@imovies.com',
      phone: '+91 98765 43210'
    },
    paymentStatus: 'paid',
    paymentMethod: 'UPI Verified',
    paymentTransactionId: 'TXN_LL8193B',
    status: 'confirmed',
    bookingDate: new Date(Date.now() - 86400000 * 3).toISOString()
  },
  {
    _id: '65f1c0000000000000000003',
    bookingRef: 'IMV-2026-M4412',
    user: '65f1a0000000000000000001',
    movie: '65f1b0000000000000000001',
    cinema: 'iMovies Lincoln Square IMAX',
    city: 'New York',
    country: 'US',
    currency: 'USD',
    seats: ['E4', 'E5'],
    seatTier: 'VIP Recliner',
    totalPrice: 44,
    showDate: today,
    showTime: '06:30 PM',
    customer: {
      name: 'Admin Manager',
      email: 'admin@imovies.com',
      phone: '+1 212 555 0199'
    },
    paymentStatus: 'paid',
    paymentMethod: 'Corporate Card',
    paymentTransactionId: 'TXN_ADM4412C',
    status: 'confirmed',
    bookingDate: new Date(Date.now() - 86400000 * 4).toISOString()
  }
];

const INITIAL_REVIEWS = [
  {
    _id: '65f1d0000000000000000001',
    movie: '65f1b0000000000000000001',
    user: '65f1a0000000000000000002',
    username: 'Tanishq Pardeshi',
    rating: 5,
    comment: 'A monumental cinematic triumph! The scale, Hans Zimmer score, and IMAX visuals were utterly mesmerizing from start to finish.',
    isVerifiedBooking: true,
    likes: 24,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    _id: '65f1d0000000000000000002',
    movie: '65f1b0000000000000000001',
    user: '65f1a0000000000000000003',
    username: 'Sarah Jenkins',
    rating: 5,
    comment: 'Austin Butler and Timothée Chalamet delivered career-defining performances. Best sci-fi experience in a theater since Interstellar!',
    isVerifiedBooking: true,
    likes: 18,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    _id: '65f1d0000000000000000003',
    movie: '65f1b0000000000000000001',
    user: '65f1a0000000000000000004',
    username: 'Marcus Vance',
    rating: 4,
    comment: 'Incredible worldbuilding and stunning desert cinematography. The pacing slows down slightly in the second act, but the finale is electrifying.',
    isVerifiedBooking: true,
    likes: 9,
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 7).toISOString()
  },
  {
    _id: '65f1d0000000000000000004',
    movie: '65f1b0000000000000000021',
    user: '65f1a0000000000000000002',
    username: 'Tanishq Pardeshi',
    rating: 5,
    comment: 'Heartwarming, hilariously witty, and deeply moving. Kiran Rao has created a modern gem of Indian cinema that everyone must watch!',
    isVerifiedBooking: true,
    likes: 31,
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    updatedAt: new Date(Date.now() - 86400000 * 1).toISOString()
  }
];

class InMemoryStore {
  constructor() {
    this.users = [...INITIAL_USERS];
    this.movies = [...INITIAL_MOVIES];
    this.cinemas = [...INITIAL_CINEMAS];
    this.bookings = [...INITIAL_BOOKINGS];
    this.reviews = [...INITIAL_REVIEWS];
    // Map of seat holds: key = `${movieId}_${showDate}_${showTime}_${seat}` => { holdId, userId, expiresAt }
    this.seatHolds = new Map();
    this.idCounter = 1000;
  }

  generateId() {
    this.idCounter += 1;
    return `65f1${this.idCounter.toString(16).padStart(20, '0')}`;
  }

  // Users
  findUserByEmail(email) {
    if (!email) return null;
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
  }

  findUserById(id) {
    return this.users.find((u) => u._id === id || String(u._id) === String(id)) || null;
  }

  createUser(userData) {
    const user = {
      _id: this.generateId(),
      username: userData.username,
      email: userData.email.toLowerCase(),
      password: userData.password,
      role: userData.role || 'user',
      favorites: [],
      createdAt: new Date().toISOString()
    };
    this.users.push(user);
    return user;
  }

  updateUser(id, updates) {
    const user = this.findUserById(id);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  }

  toggleFavorite(userId, movieId) {
    const user = this.findUserById(userId);
    if (!user) return [];
    if (!Array.isArray(user.favorites)) user.favorites = [];
    const index = user.favorites.indexOf(movieId);
    if (index > -1) {
      user.favorites.splice(index, 1);
    } else {
      user.favorites.push(movieId);
    }
    return user.favorites;
  }

  // Cinemas
  getCinemas(country, city) {
    let list = [...this.cinemas];
    if (country) {
      list = list.filter((c) => c.country.toLowerCase() === country.toLowerCase());
    }
    if (city && city !== 'All') {
      list = list.filter((c) => c.city.toLowerCase() === city.toLowerCase());
    }
    return list;
  }

  getCinemaById(id) {
    return this.cinemas.find((c) => c._id === id || String(c._id) === String(id)) || null;
  }

  // Movies: Enhanced with Industry filter, Genre sorting, and Minimum Rating filter
  getMovies(search, genre, category, country, language, industry, sortBy, minRating) {
    let list = [...this.movies];

    if (search) {
      const s = search.toLowerCase().trim();
      const sClean = s.replace(/[^a-z0-9]/g, '');
      const sDeVowel = s.replace(/aa+/g, 'a').replace(/ee+/g, 'e').replace(/oo+/g, 'o');

      list = list.filter((m) => {
        const titleLower = m.title.toLowerCase();
        const titleClean = titleLower.replace(/[^a-z0-9]/g, '');
        const titleDeVowel = titleLower.replace(/aa+/g, 'a').replace(/ee+/g, 'e').replace(/oo+/g, 'o');

        const titleMatch =
          titleLower.includes(s) ||
          (sClean.length > 2 && titleClean.includes(sClean)) ||
          (sDeVowel.length > 2 && titleDeVowel.includes(sDeVowel));

        const aliasMatch =
          Array.isArray(m.aliases) &&
          m.aliases.some((a) => {
            const aLower = a.toLowerCase();
            const aClean = aLower.replace(/[^a-z0-9]/g, '');
            const aDeVowel = aLower.replace(/aa+/g, 'a').replace(/ee+/g, 'e').replace(/oo+/g, 'o');
            return (
              aLower.includes(s) ||
              (sClean.length > 2 && aClean.includes(sClean)) ||
              (sDeVowel.length > 2 && aDeVowel.includes(sDeVowel))
            );
          });

        const descMatch = m.description && m.description.toLowerCase().includes(s);
        const directorMatch = m.director && m.director.toLowerCase().includes(s);
        const castMatch = Array.isArray(m.cast) && m.cast.some((c) => c.name.toLowerCase().includes(s));
        const genreMatch = Array.isArray(m.genre) && m.genre.some((g) => g.toLowerCase().includes(s));

        return titleMatch || aliasMatch || descMatch || directorMatch || castMatch || genreMatch;
      });
    }

    if (industry && industry !== 'All') {
      list = list.filter((m) => m.industry && m.industry.toLowerCase() === industry.toLowerCase());
    }

    if (genre && genre !== 'All') {
      list = list.filter((m) => Array.isArray(m.genre) && m.genre.includes(genre));
    }

    if (minRating && Number(minRating) > 0) {
      list = list.filter((m) => Number(m.rating || 0) >= Number(minRating));
    }

    if (category && category !== 'all') {
      list = list.filter((m) => m.category === category);
    }

    if (language && language !== 'All') {
      list = list.filter((m) => m.language && m.language.toLowerCase() === language.toLowerCase());
    }

    if (country) {
      list = list.filter((m) => !m.countryAvailability || m.countryAvailability.includes(country.toUpperCase()));
    }

    // Sorting logic
    if (sortBy === 'genre') {
      // Sort alphabetically by the primary genre
      list.sort((a, b) => {
        const genreA = (a.genre && a.genre[0]) || '';
        const genreB = (b.genre && b.genre[0]) || '';
        return genreA.localeCompare(genreB) || a.title.localeCompare(b.title);
      });
    } else if (sortBy === 'rating') {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'title') {
      list.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'duration') {
      list.sort((a, b) => (b.duration || 0) - (a.duration || 0));
    } else if (sortBy === 'price_low') {
      list.sort((a, b) => (a.ticketPrice || 0) - (b.ticketPrice || 0));
    } else if (sortBy === 'releaseDate') {
      list.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
    }

    return list;
  }

  getMovieById(id) {
    return (
      this.movies.find(
        (m) =>
          m._id === id ||
          String(m._id) === String(id) ||
          (m.tmdbId && String(m.tmdbId) === String(id))
      ) || null
    );
  }

  createMovie(movieData) {
    const movie = {
      _id: this.generateId(),
      title: movieData.title,
      aliases: Array.isArray(movieData.aliases) ? movieData.aliases : [],
      industry: movieData.industry || 'Hollywood',
      description: movieData.description || '',
      genre: Array.isArray(movieData.genre)
        ? movieData.genre
        : movieData.genre
        ? movieData.genre.split(',').map((g) => g.trim())
        : ['Action'],
      duration: Number(movieData.duration) || 120,
      posterUrl: movieData.posterUrl || '',
      backdropUrl: movieData.backdropUrl || '',
      trailerKey: movieData.trailerKey || '',
      releaseDate: movieData.releaseDate ? new Date(movieData.releaseDate).toISOString() : new Date().toISOString(),
      ticketPrice: Number(movieData.ticketPrice) || 250,
      theater: movieData.theater || 'iMovies IMAX Laser - Screen 1',
      rating: Number(movieData.rating) || 8.5,
      language: movieData.language || 'English',
      director: movieData.director || '',
      cast: Array.isArray(movieData.cast) ? movieData.cast : [],
      category: movieData.category || 'now_playing',
      showtimes:
        Array.isArray(movieData.showtimes) && movieData.showtimes.length > 0
          ? movieData.showtimes
          : ['10:30 AM', '02:00 PM', '06:30 PM', '09:45 PM'],
      countryAvailability: movieData.countryAvailability || ['US', 'GB', 'IN', 'CA', 'AU', 'DE', 'JP', 'SG', 'AE'],
      createdAt: new Date().toISOString()
    };
    this.movies.unshift(movie);
    return movie;
  }

  // Temporary Seat Holds (Concurrency Protection)
  cleanExpiredHolds() {
    const now = Date.now();
    for (const [key, hold] of this.seatHolds.entries()) {
      if (hold.expiresAt <= now) {
        this.seatHolds.delete(key);
      }
    }
  }

  holdSeats({ userId, movieId, showDate, showTime, seats }) {
    this.cleanExpiredHolds();
    const occupied = this.getOccupiedSeats(movieId, showDate, showTime, userId);
    const conflicts = seats.filter((s) => occupied.includes(s));
    if (conflicts.length > 0) {
      throw new Error(`Seat(s) ${conflicts.join(', ')} are currently reserved or locked by another patron.`);
    }

    const holdId = `HOLD_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const expiresAt = Date.now() + 8 * 60 * 1000; // 8 minutes TTL

    seats.forEach((seat) => {
      const key = `${movieId}_${showDate}_${showTime}_${seat}`;
      this.seatHolds.set(key, { holdId, userId, expiresAt, seat });
    });

    return { holdId, expiresAt, seats };
  }

  releaseHold({ holdId, userId }) {
    for (const [key, hold] of this.seatHolds.entries()) {
      if (hold.holdId === holdId && (!userId || hold.userId === userId)) {
        this.seatHolds.delete(key);
      }
    }
  }

  // Bookings
  getOccupiedSeats(movieId, showDate, showTime, excludeUserId = null) {
    this.cleanExpiredHolds();

    // Confirmed bookings (excluding cancelled ones)
    const matching = this.bookings.filter(
      (b) =>
        (b.movie === movieId || String(b.movie) === String(movieId)) &&
        b.showDate === showDate &&
        b.showTime === showTime &&
        b.status !== 'cancelled'
    );
    const confirmedSeats = matching.flatMap((b) => b.seats);

    // Active holds from other users
    const heldSeats = [];
    const prefix = `${movieId}_${showDate}_${showTime}_`;
    for (const [key, hold] of this.seatHolds.entries()) {
      if (key.startsWith(prefix)) {
        if (!excludeUserId || hold.userId !== excludeUserId) {
          heldSeats.push(hold.seat);
        }
      }
    }

    return [...new Set([...confirmedSeats, ...heldSeats])];
  }

  createBooking({
    userId,
    movie,
    seats,
    totalPrice,
    showDate,
    showTime,
    cinema,
    city,
    country,
    currency,
    seatTier,
    customer,
    paymentMethod
  }) {
    // Release any temporary holds for this user on these seats
    seats.forEach((seat) => {
      const key = `${movie}_${showDate}_${showTime}_${seat}`;
      this.seatHolds.delete(key);
    });

    const booking = {
      _id: this.generateId(),
      bookingRef: `IMV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      user: userId,
      movie,
      cinema: cinema || 'iMovies IMAX Laser - Screen 1',
      city: city || 'New York',
      country: country || 'US',
      currency: currency || 'USD',
      seatTier: seatTier || 'VIP Recliner',
      seats,
      totalPrice,
      showDate,
      showTime,
      customer: customer || { name: 'VIP Guest', email: 'guest@imovies.com' },
      paymentStatus: 'paid',
      paymentMethod: paymentMethod || 'Test Payment Gateway (Verified)',
      paymentTransactionId: `TXN_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
      status: 'confirmed',
      bookingDate: new Date().toISOString()
    };
    this.bookings.push(booking);
    return booking;
  }

  cancelBooking(bookingId, userId) {
    const booking = this.bookings.find(
      (b) =>
        (b._id === bookingId || String(b._id) === String(bookingId)) &&
        (b.user === userId || String(b.user) === String(userId))
    );
    if (!booking) {
      throw new Error('Booking not found or not authorized to cancel');
    }
    if (booking.status === 'cancelled') {
      throw new Error('This reservation is already cancelled');
    }
    booking.status = 'cancelled';
    booking.paymentStatus = 'refunded';
    return booking;
  }

  getUserBookings(userId) {
    const userBookings = this.bookings
      .filter((b) => b.user === userId || String(b.user) === String(userId))
      .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate));

    return userBookings.map((b) => {
      const movieDoc = this.getMovieById(b.movie) || {};
      const userDoc = this.findUserById(b.user) || {};
      return {
        ...b,
        movie: movieDoc,
        user: {
          _id: userDoc._id,
          username: userDoc.username,
          email: userDoc.email
        }
      };
    });
  }

  // ----------------------------------------------------
  // Reviews & Verified Booking Checks
  // ----------------------------------------------------
  hasUserBookedMovie(userId, movieId) {
    if (!userId || !movieId) return false;
    const uStr = String(userId);
    const mStr = String(movieId);
    return this.bookings.some(
      (b) =>
        (b.user === userId || String(b.user) === uStr) &&
        (b.movie === movieId || String(b.movie) === mStr) &&
        b.status !== 'cancelled'
    );
  }

  getMovieReviews(movieId, currentUserId = null) {
    const mStr = String(movieId);
    const movieReviews = this.reviews
      .filter((r) => r.movie === movieId || String(r.movie) === mStr)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    const total = movieReviews.length;
    const sum = movieReviews.reduce((acc, r) => acc + (Number(r.rating) || 0), 0);
    const averageRating = total > 0 ? parseFloat((sum / total).toFixed(1)) : 0;

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    movieReviews.forEach((r) => {
      const star = Math.round(Number(r.rating));
      if (distribution[star] !== undefined) {
        distribution[star] += 1;
      }
    });

    const userReview = currentUserId
      ? movieReviews.find((r) => r.user === currentUserId || String(r.user) === String(currentUserId)) || null
      : null;

    const hasBooked = currentUserId ? this.hasUserBookedMovie(currentUserId, movieId) : false;

    return {
      reviews: movieReviews,
      stats: {
        totalReviews: total,
        averageRating,
        ratingDistribution: distribution
      },
      hasBooked,
      userReview,
      canReview: hasBooked
    };
  }

  addOrUpdateReview({ userId, movieId, rating, comment, username }) {
    if (!userId || !movieId) {
      throw new Error('User ID and Movie ID are required');
    }
    const hasBooked = this.hasUserBookedMovie(userId, movieId);
    if (!hasBooked) {
      throw new Error('Only viewers who have previously booked this movie can submit a review.');
    }

    const numRating = Number(rating);
    if (!numRating || numRating < 1 || numRating > 5) {
      throw new Error('Rating must be between 1 and 5 stars');
    }

    if (!comment || typeof comment !== 'string' || comment.trim().length < 3) {
      throw new Error('Please provide a short comment (at least 3 characters)');
    }

    const uStr = String(userId);
    const mStr = String(movieId);
    const existingIndex = this.reviews.findIndex(
      (r) =>
        (r.user === userId || String(r.user) === uStr) &&
        (r.movie === movieId || String(r.movie) === mStr)
    );

    const now = new Date().toISOString();
    let savedReview;

    if (existingIndex >= 0) {
      this.reviews[existingIndex].rating = numRating;
      this.reviews[existingIndex].comment = comment.trim();
      this.reviews[existingIndex].updatedAt = now;
      if (username) this.reviews[existingIndex].username = username;
      savedReview = this.reviews[existingIndex];
    } else {
      savedReview = {
        _id: this.generateId(),
        movie: movieId,
        user: userId,
        username: username || 'Verified Guest',
        rating: numRating,
        comment: comment.trim(),
        isVerifiedBooking: true,
        likes: 0,
        createdAt: now,
        updatedAt: now
      };
      this.reviews.unshift(savedReview);
    }

    return savedReview;
  }

  deleteReview(userId, movieId) {
    const uStr = String(userId);
    const mStr = String(movieId);
    const initialLen = this.reviews.length;
    this.reviews = this.reviews.filter(
      (r) =>
        !((r.user === userId || String(r.user) === uStr) &&
          (r.movie === movieId || String(r.movie) === mStr))
    );
    return this.reviews.length < initialLen;
  }

  likeReview(reviewId) {
    const review = this.reviews.find((r) => r._id === reviewId || String(r._id) === String(reviewId));
    if (review) {
      review.likes = (review.likes || 0) + 1;
      return review.likes;
    }
    return 0;
  }
}

const inMemoryStore = new InMemoryStore();
module.exports = inMemoryStore;

