// Collection types + Supabase-backed loaders.
//
// Content lives in the Supabase `collections` table (one row per collection,
// slug PK, `data` JSONB column holding the shape below). Public routes call
// the server functions here from their loader; the admin editor mutates via
// src/lib/admin-supabase.ts.

import { createServerFn } from "@tanstack/react-start";

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
  photo: string;
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
      photo: "/livin-gift-box.jpg",
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Server functions — hit Supabase                                             */
/* -------------------------------------------------------------------------- */

type Row = { data: Collection };

/** All collections, sorted by name. Used by home + collections index. */
export const getCollectionsFn = createServerFn({ method: "GET" }).handler(
  async () => {
    const { createSupabaseServerRead } = await import("../lib/supabase");
    const client = createSupabaseServerRead();
    const { data, error } = await client
      .from("collections")
      .select("data")
      .order("data->>name", { ascending: true });
    if (error) throw new Error(`Failed to load collections: ${error.message}`);
    return (data ?? []).map((r: Row) => r.data);
  },
);

/** Single collection by slug (nullable — returns null when not found). */
export const getCollectionFn = createServerFn({ method: "GET" })
  .validator((slug: unknown) => {
    if (typeof slug !== "string" || !slug) {
      throw new Error("slug must be a non-empty string");
    }
    return slug;
  })
  .handler(async ({ data: slug }) => {
    const { createSupabaseServerRead } = await import("../lib/supabase");
    const client = createSupabaseServerRead();
    const { data, error } = await client
      .from("collections")
      .select("data")
      .eq("slug", slug)
      .maybeSingle();
    if (error) throw new Error(`Failed to load collection: ${error.message}`);
    return (data as Row | null)?.data ?? null;
  });

/** Every collection except the given slug — used for "Also of the House". */
export const getOtherCollectionsFn = createServerFn({ method: "GET" })
  .validator((slug: unknown) => {
    if (typeof slug !== "string") throw new Error("slug must be a string");
    return slug;
  })
  .handler(async ({ data: slug }) => {
    const { createSupabaseServerRead } = await import("../lib/supabase");
    const client = createSupabaseServerRead();
    const { data, error } = await client
      .from("collections")
      .select("data")
      .neq("slug", slug)
      .order("data->>name", { ascending: true });
    if (error) throw new Error(`Failed to load collections: ${error.message}`);
    return (data ?? []).map((r: Row) => r.data);
  });
