const PLACEHOLDER_IMAGE = "/livin-bottle-box.jpg";

export type Collection = {
  slug: string;
  name: string;
  tag: string;
  price: string;
  priceValue: number;
  image: string;
  story: string;
  origin: string;
  notes: string[];
  layers: {
    top: string;
    heart: string;
    base: string;
  };
};

export const CURRENCY_SYMBOL = "₹";

export function formatPrice(value: number): string {
  return CURRENCY_SYMBOL + value.toLocaleString("en-IN");
}

export const collections: Collection[] = [
  {
    slug: "midnight-cambodi",
    name: "Midnight Cambodi",
    tag: "Intense · Resinous",
    price: "₹42,000",
    priceValue: 42000,
    image: PLACEHOLDER_IMAGE,
    story:
      "A grand, moonlit interpretation of Cambodian oud aged in ancient cedar barrels for eighteen seasons.",
    origin:
      "Wild-harvested from the Pursat highlands and rested in our Dubai atelier before every bottling.",
    notes: [
      "Saffron",
      "Pink Pepper",
      "Taif Rose",
      "Leather",
      "Cambodi Oud",
      "Amber",
    ],
    layers: {
      top: "Saffron, Pink Pepper",
      heart: "Taif Rose, Leather",
      base: "Cambodi Oud, Amber",
    },
  },
  {
    slug: "imperial-gold",
    name: "Imperial Gold",
    tag: "Bright · Opulent",
    price: "₹38,000",
    priceValue: 38000,
    image: PLACEHOLDER_IMAGE,
    story:
      "A crown of citrus and white flowers laid upon a bed of white oud — an homage to the golden hours of a royal court.",
    origin:
      "White oud from the highlands of Assam, married with Sicilian bergamot and Grasse jasmine.",
    notes: [
      "Bergamot",
      "Cardamom",
      "Jasmine Sambac",
      "White Oud",
      "Musk",
      "Sandalwood",
    ],
    layers: {
      top: "Bergamot, Cardamom",
      heart: "Jasmine Sambac",
      base: "White Oud, Musk",
    },
  },
  {
    slug: "noir-royale",
    name: "Noir Royale",
    tag: "Smoky · Eternal",
    price: "₹46,000",
    priceValue: 46000,
    image: PLACEHOLDER_IMAGE,
    story:
      "Aged oud drawn from the deepest resin veins, wrapped in incense smoke and violet leaf.",
    origin:
      "A decade-aged reserve oud, laid down under Burmese incense and finished with rare Mysore patchouli.",
    notes: [
      "Incense",
      "Black Plum",
      "Violet Leaf",
      "Cedar",
      "Aged Oud",
      "Patchouli",
    ],
    layers: {
      top: "Incense, Black Plum",
      heart: "Violet Leaf, Cedar",
      base: "Aged Oud, Patchouli",
    },
  },
];

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getOtherCollections(slug: string): Collection[] {
  return collections.filter((c) => c.slug !== slug);
}
