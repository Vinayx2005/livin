// Content is loaded from ../../content/collections/*.json. Each file is fully
// editable through the /admin UI, which commits the JSON back to the repo via
// the GitHub API. Vite watches these globs so changes hot-reload in dev.

const collectionModules = import.meta.glob<{ default: Collection }>(
  "../../content/collections/*.json",
  { eager: true },
);

export type Spec = { label: string; value: string };
export type FaqEntry = { q: string; a: string };

export type StoryBehind = {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  /** 0-based paragraph index rendered in italic gold accent */
  highlightIndex?: number;
};

export type WhatsIncluded = {
  eyebrow?: string;
  heading: string;
  intro: string;
  listLabel: string;
  items: string[];
  closer: string;
  photo: string;
};

export type MakeItPersonal = {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  highlightIndex?: number;
  notePreview: string;
  noteRecipient: string;
};

export type FragranceDetails = {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  specs: Spec[];
};

export type LivinExperience = {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  closer: string;
};

export type ReadyToMakeSmile = {
  heading: string;
  paragraphs: string[];
  closer: string;
};

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
  buyNowUrl: string;
  storyBehind: StoryBehind;
  whatsIncluded: WhatsIncluded;
  makeItPersonal: MakeItPersonal;
  fragranceDetails: FragranceDetails;
  livinExperience: LivinExperience;
  faq: FaqEntry[];
  readyToMakeSmile: ReadyToMakeSmile;
};

export const CURRENCY_SYMBOL = "₹";

export function formatPrice(value: number): string {
  return CURRENCY_SYMBOL + value.toLocaleString("en-IN");
}

/** Blank template used by the admin when creating a new collection. */
export function newCollectionTemplate(slug: string): Collection {
  return {
    slug,
    name: "",
    tag: "",
    price: "",
    priceValue: 0,
    image: "/livin-bottle-box.jpg",
    story: "",
    origin: "",
    notes: [],
    layers: { top: "", heart: "", base: "" },
    buyNowUrl: "/cart",
    storyBehind: {
      eyebrow: "The Ritual",
      heading: "The Story Behind This Collection",
      paragraphs: ["", "", ""],
      highlightIndex: 1,
    },
    whatsIncluded: {
      eyebrow: "The Experience",
      heading: "What's Included",
      intro: "",
      listLabel: "Inside you'll find",
      items: [""],
      closer: "",
      photo: "/livin-flatlay.jpg",
    },
    makeItPersonal: {
      eyebrow: "Your Words",
      heading: "Make It Personal",
      paragraphs: ["", "", ""],
      highlightIndex: 2,
      notePreview: "",
      noteRecipient: "Someone dear",
    },
    fragranceDetails: {
      eyebrow: "Specifications",
      heading: "Fragrance Details",
      paragraphs: ["", "", ""],
      specs: [
        { label: "Family", value: "" },
        { label: "Concentration", value: "" },
        { label: "Top Notes", value: "" },
        { label: "Heart Notes", value: "" },
        { label: "Base Notes", value: "" },
        { label: "Longevity", value: "" },
        { label: "Volume", value: "" },
        { label: "Origin", value: "" },
      ],
    },
    livinExperience: {
      eyebrow: "The Ritual",
      heading: "The Livin' Experience",
      paragraphs: ["", "", ""],
      closer: "",
    },
    faq: [{ q: "", a: "" }],
    readyToMakeSmile: {
      heading: "Ready to Make Someone Smile?",
      paragraphs: ["", ""],
      closer: "",
    },
  };
}

// Sort collections by name so ordering is stable regardless of file-system order.
export const collections: Collection[] = Object.values(collectionModules)
  .map((m) => m.default)
  .sort((a, b) => a.name.localeCompare(b.name));

export function getCollection(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export function getOtherCollections(slug: string): Collection[] {
  return collections.filter((c) => c.slug !== slug);
}
