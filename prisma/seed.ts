import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  // Travel styles
  const styles = [
    { name: "hiking", emoji: "🥾" },
    { name: "beach", emoji: "🏖️" },
    { name: "nightlife", emoji: "🎉" },
    { name: "culture", emoji: "🏛️" },
    { name: "food", emoji: "🍜" },
    { name: "music", emoji: "🎵" },
    { name: "adventure", emoji: "🧗" },
    { name: "photography", emoji: "📸" },
  ];

  for (const s of styles) {
    await prisma.travelStyle.upsert({
      where: { name: s.name },
      update: {},
      create: s,
    });
  }

  // Cities
  const cities = [
    {
      slug: "kyoto",
      name: "Kyoto",
      country: "Japan",
      emoji: "🏯",
      description: "Ancient temples, tea ceremonies and bamboo groves",
      history:
        "Japan's imperial capital for over a millennium, Kyoto preserves more than 1,600 Buddhist temples and 400 Shinto shrines within its city limits.",
      bestTime: "March–May · Oct–Nov",
      dailyBudget: "$60–90",
      currency: "JPY",
      language: "Japanese",
      spots: [
        { name: "Fushimi Inari Shrine", description: "10,000 torii gates trail", emoji: "⛩️", isHidden: false },
        { name: "Arashiyama Bamboo Grove", description: "Dawn walk before crowds", emoji: "🎋", isHidden: false },
        { name: "Philosopher's Path", description: "Canal walk under cherry blossoms", emoji: "🌸", isHidden: true },
        { name: "Ura-Nishiki Market", description: "Hidden back alley food stalls", emoji: "🍱", isHidden: true },
      ],
    },
    {
      slug: "lisbon",
      name: "Lisbon",
      country: "Portugal",
      emoji: "🎭",
      description: "Fado music, coastal sunsets and pastel de nata",
      history:
        "One of Europe's oldest capitals, Lisbon sits on seven hills above the Tagus estuary. The Alfama district dates to Moorish occupation.",
      bestTime: "Apr–Jun · Sep–Oct",
      dailyBudget: "$50–80",
      currency: "EUR",
      language: "Portuguese",
      spots: [
        { name: "Alfama District", description: "Narrow cobblestone alleyways", emoji: "🏘️", isHidden: false },
        { name: "Pastéis de Belém", description: "Original custard tart bakery since 1837", emoji: "🥐", isHidden: false },
        { name: "Tasca do Chico", description: "Best fado in a 20-seat room", emoji: "🎸", isHidden: true },
        { name: "Miradouro da Graça", description: "Sunset viewpoint locals prefer", emoji: "🌅", isHidden: true },
      ],
    },
    {
      slug: "bali",
      name: "Bali",
      country: "Indonesia",
      emoji: "🌺",
      description: "Temple rituals, rice terraces and surf breaks",
      history:
        "The last stronghold of Hindu culture in Indonesia, Bali's spiritual landscape is defined by over 20,000 temples.",
      bestTime: "May–Sep",
      dailyBudget: "$30–60",
      currency: "IDR",
      language: "Balinese / Indonesian",
      spots: [
        { name: "Tegallalang Rice Terraces", description: "UNESCO-listed irrigation system", emoji: "🌾", isHidden: false },
        { name: "Tanah Lot Temple", description: "Sea temple at sunset", emoji: "🌊", isHidden: false },
        { name: "Tirta Empul Holy Spring", description: "Sacred purification ceremony", emoji: "💧", isHidden: true },
        { name: "Penglipuran Village", description: "Most traditional Balinese village", emoji: "🏡", isHidden: true },
      ],
    },
    {
      slug: "marrakech",
      name: "Marrakech",
      country: "Morocco",
      emoji: "🕌",
      description: "Medina markets, riads and Saharan sunsets",
      history:
        "Founded in 1070, the Red City served as Morocco's imperial capital. The medina's chaotic souks follow medieval trade routes.",
      bestTime: "Mar–May · Sep–Nov",
      dailyBudget: "$40–70",
      currency: "MAD",
      language: "Arabic / French",
      spots: [
        { name: "Djemaa el-Fna Square", description: "Snake charmers and storytellers", emoji: "🐍", isHidden: false },
        { name: "Bahia Palace", description: "19th-century vizier's palace", emoji: "🏛️", isHidden: false },
        { name: "Foundouk el-Amira", description: "Hidden artisan cooperative", emoji: "🧵", isHidden: true },
        { name: "Café Arabe Rooftop", description: "Medina skyline no tourist knows", emoji: "☕", isHidden: true },
      ],
    },
    {
      slug: "medellin",
      name: "Medellín",
      country: "Colombia",
      emoji: "🌆",
      description: "Urban innovation, street art and eternal spring",
      history:
        "Once the world's most dangerous city, Medellín transformed into a global model of urban innovation through cable cars and community libraries.",
      bestTime: "Year-round (eternal spring)",
      dailyBudget: "$25–50",
      currency: "COP",
      language: "Spanish",
      spots: [
        { name: "El Poblado", description: "Café culture and nightlife hub", emoji: "🍹", isHidden: false },
        { name: "Botero Plaza", description: "Fernando Botero sculpture park", emoji: "🎨", isHidden: false },
        { name: "La Sierra Cable Car", description: "Locals' commute with city views", emoji: "🚡", isHidden: true },
        { name: "Mercado del Río", description: "Local food market with 40+ stalls", emoji: "🥩", isHidden: true },
      ],
    },
  ];

  const cityRecords: Record<string, string> = {};

  for (const c of cities) {
    const { spots, ...cityData } = c;
    const city = await prisma.city.upsert({
      where: { slug: cityData.slug },
      update: {},
      create: cityData,
    });
    cityRecords[city.slug] = city.id;

    for (const spot of spots) {
      await prisma.spot.create({
        data: { ...spot, cityId: city.id },
      });
    }
  }

  // Seed users / guides
  const guidePassword = await bcrypt.hash("guide123", 10);

  const guideUsers = [
    {
      name: "Yuki Tanaka",
      email: "yuki@starylo.com",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=yuki",
      bio: "Temple scholar and tea ceremony master with 8 years guiding experience.",
      citySlug: "kyoto",
      specialties: "Temple trails, Tea ceremony, Photography",
      hourlyRate: 55,
      rating: 4.99,
      reviewCount: 312,
    },
    {
      name: "Ana Bela Santos",
      email: "ana@starylo.com",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=ana",
      bio: "Professional fado singer turned food and music guide in Lisbon's oldest quarter.",
      citySlug: "lisbon",
      specialties: "Fado music, Local cuisine, Alfama history",
      hourlyRate: 45,
      rating: 4.97,
      reviewCount: 289,
    },
    {
      name: "Made Sari",
      email: "made@starylo.com",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=made",
      bio: "Balinese dancer and cultural guide helping visitors connect with real ceremonies.",
      citySlug: "bali",
      specialties: "Temple rituals, Dance, Spiritual ceremonies",
      hourlyRate: 35,
      rating: 4.98,
      reviewCount: 445,
    },
    {
      name: "Hassan El Fassi",
      email: "hassan@starylo.com",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=hassan",
      bio: "Historian and storyteller who brings 900 years of Marrakech to life.",
      citySlug: "marrakech",
      specialties: "Medina history, Souk navigation, Traditional crafts",
      hourlyRate: 40,
      rating: 4.95,
      reviewCount: 198,
    },
    {
      name: "Jorge Restrepo",
      email: "jorge@starylo.com",
      image: "https://api.dicebear.com/9.x/personas/svg?seed=jorge",
      bio: "Urban architect who documented Medellín's transformation from ground zero.",
      citySlug: "medellin",
      specialties: "Urban transformation, Street art, Architecture",
      hourlyRate: 30,
      rating: 4.96,
      reviewCount: 167,
    },
  ];

  for (const g of guideUsers) {
    const user = await prisma.user.upsert({
      where: { email: g.email },
      update: {},
      create: {
        name: g.name,
        email: g.email,
        image: g.image,
        password: guidePassword,
      },
    });

    await prisma.guide.upsert({
      where: { userId: user.id },
      update: {},
      create: {
        userId: user.id,
        cityId: cityRecords[g.citySlug],
        bio: g.bio,
        specialties: g.specialties,
        hourlyRate: g.hourlyRate,
        rating: g.rating,
        reviewCount: g.reviewCount,
        verified: true,
      },
    });
  }

  // Demo traveler user
  await prisma.user.upsert({
    where: { email: "demo@starylo.com" },
    update: {},
    create: {
      name: "Demo Traveler",
      email: "demo@starylo.com",
      password: await bcrypt.hash("demo123", 10),
    },
  });

  // Seed events
  const events = [
    {
      citySlug: "lisbon",
      title: "Fado Night at Tasca do Chico",
      description: "Intimate fado performance in a tiny historic tasca",
      venue: "Tasca do Chico, Alfama",
      eventDate: new Date("2026-05-10T21:00:00"),
      artist: "Ana Bela Santos & guests",
      genre: "Fado",
      isFree: false,
      maxRsvp: 30,
    },
    {
      citySlug: "kyoto",
      title: "Dawn Temple Trail Walk",
      description: "Guided walk through Fushimi Inari before the crowds",
      venue: "Fushimi Inari Shrine",
      eventDate: new Date("2026-05-12T05:30:00"),
      artist: "Yuki Tanaka",
      genre: "Culture",
      isFree: true,
      maxRsvp: 15,
    },
    {
      citySlug: "medellin",
      title: "Graffiti Tour + Salsa Night",
      description: "Street art walk ending at a rooftop salsa club",
      venue: "El Centro → El Poblado",
      eventDate: new Date("2026-05-15T17:00:00"),
      artist: "Jorge Restrepo",
      genre: "Street Art / Music",
      isFree: true,
      maxRsvp: 20,
    },
  ];

  for (const e of events) {
    const { citySlug, ...eventData } = e;
    await prisma.event.create({
      data: { ...eventData, cityId: cityRecords[citySlug] },
    });
  }

  console.log("✅ Database seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
