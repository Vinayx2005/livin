import {
  createFileRoute,
  Link,
  useNavigate,
} from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Plus, Trash2, Save, Upload } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase";
import { saveCollectionFn } from "@/lib/admin-supabase";
import {
  Collection,
  Spec,
  FaqEntry,
  getCollectionFn,
  newCollectionTemplate,
} from "@/data/collections";

export const Route = createFileRoute("/admin/collections/$slug")({
  head: () => ({
    meta: [
      { title: "Edit collection — LIVIN'" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminEditPage,
});

/* -------------------------------------------------------------------------- */
/* Field primitives                                                            */
/* -------------------------------------------------------------------------- */

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-[10px] uppercase tracking-[0.3em] text-gold mb-2">
      {children}
    </label>
  );
}

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="glass-card p-6 md:p-8">
      <div className="mb-6">
        <h2 className="font-display italic text-2xl md:text-3xl text-navy-deep leading-tight">
          {title}
        </h2>
        {hint && (
          <p className="mt-2 text-sm text-navy-deep/60 leading-relaxed">
            {hint}
          </p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}

function TextInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none transition-colors"
      />
    </div>
  );
}

function NumberInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder={placeholder}
        className="w-full bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none transition-colors"
      />
    </div>
  );
}

function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none transition-colors leading-relaxed"
      />
    </div>
  );
}

/**
 * Image field. Accepts a URL pasted directly (external URL or a path under
 * /public/) OR an upload — the file goes to the `livin-images` Supabase
 * Storage bucket and its public URL is written into `value`.
 */
function ImageInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    setUploading(true);
    setError(null);
    try {
      const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
      const stamp = Math.floor(Math.random() * 1_000_000_000).toString(36);
      const path = `${stamp}.${ext}`;
      const { error: uploadErr } = await supabaseBrowser.storage
        .from("livin-images")
        .upload(path, file, { cacheControl: "31536000", upsert: false });
      if (uploadErr) throw uploadErr;
      const { data } = supabaseBrowser.storage
        .from("livin-images")
        .getPublicUrl(path);
      onChange(data.publicUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex flex-wrap items-stretch gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="/path.jpg or https://…"
          className="flex-1 min-w-0 bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none transition-colors"
        />
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) void handleFile(f);
            e.target.value = "";
          }}
        />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          disabled={uploading}
          className="inline-flex items-center gap-2 px-4 py-2 border border-navy-deep/30 text-navy-deep text-[11px] uppercase tracking-[0.3em] hover:bg-navy-deep hover:text-white disabled:opacity-50 transition-colors"
        >
          <Upload size={14} strokeWidth={1.5} />
          {uploading ? "Uploading…" : "Upload"}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-700 bg-red-50 border border-red-200 px-3 py-2 rounded">
          {error}
        </p>
      )}
      {value && (
        <img
          src={value}
          alt=""
          className="mt-3 max-h-40 rounded border border-gold/15"
        />
      )}
    </div>
  );
}

function StringList({
  label,
  values,
  onChange,
  placeholder,
  multiline = false,
}: {
  label: string;
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  multiline?: boolean;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="space-y-2">
        {values.map((v, i) => (
          <div key={i} className="flex items-start gap-2">
            {multiline ? (
              <textarea
                rows={3}
                value={v}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                placeholder={placeholder}
                className="flex-1 bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none leading-relaxed"
              />
            ) : (
              <input
                type="text"
                value={v}
                onChange={(e) => {
                  const next = [...values];
                  next[i] = e.target.value;
                  onChange(next);
                }}
                placeholder={placeholder}
                className="flex-1 bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none"
              />
            )}
            <button
              type="button"
              aria-label={`Remove ${label} item ${i + 1}`}
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="mt-1 text-navy-deep/40 hover:text-red-700 transition-colors p-2"
            >
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, ""])}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:text-navy-deep transition-colors"
        >
          <Plus size={14} strokeWidth={1.5} /> Add
        </button>
      </div>
    </div>
  );
}

function SpecList({
  values,
  onChange,
}: {
  values: Spec[];
  onChange: (next: Spec[]) => void;
}) {
  return (
    <div>
      <Label>Specifications</Label>
      <div className="space-y-3">
        {values.map((s, i) => (
          <div key={i} className="grid grid-cols-[1fr_2fr_auto] gap-2">
            <input
              type="text"
              value={s.label}
              onChange={(e) => {
                const next = [...values];
                next[i] = { ...s, label: e.target.value };
                onChange(next);
              }}
              placeholder="Label"
              className="bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none"
            />
            <input
              type="text"
              value={s.value}
              onChange={(e) => {
                const next = [...values];
                next[i] = { ...s, value: e.target.value };
                onChange(next);
              }}
              placeholder="Value"
              className="bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none"
            />
            <button
              type="button"
              aria-label={`Remove spec ${i + 1}`}
              onClick={() => onChange(values.filter((_, j) => j !== i))}
              className="text-navy-deep/40 hover:text-red-700 transition-colors p-2"
            >
              <Trash2 size={16} strokeWidth={1.5} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, { label: "", value: "" }])}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:text-navy-deep transition-colors"
        >
          <Plus size={14} strokeWidth={1.5} /> Add spec
        </button>
      </div>
    </div>
  );
}

function FaqList({
  values,
  onChange,
}: {
  values: FaqEntry[];
  onChange: (next: FaqEntry[]) => void;
}) {
  return (
    <div>
      <Label>Frequently Asked Questions</Label>
      <div className="space-y-4">
        {values.map((f, i) => (
          <div key={i} className="glass-card p-4 space-y-3">
            <input
              type="text"
              value={f.q}
              onChange={(e) => {
                const next = [...values];
                next[i] = { ...f, q: e.target.value };
                onChange(next);
              }}
              placeholder="Question"
              className="w-full bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none"
            />
            <textarea
              rows={3}
              value={f.a}
              onChange={(e) => {
                const next = [...values];
                next[i] = { ...f, a: e.target.value };
                onChange(next);
              }}
              placeholder="Answer"
              className="w-full bg-white border border-gold/25 focus:border-gold rounded px-3 py-2 text-navy-deep font-display outline-none leading-relaxed"
            />
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => onChange(values.filter((_, j) => j !== i))}
                className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-red-700/70 hover:text-red-700 transition-colors"
              >
                <Trash2 size={14} strokeWidth={1.5} /> Remove
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...values, { q: "", a: "" }])}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-gold hover:text-navy-deep transition-colors"
        >
          <Plus size={14} strokeWidth={1.5} /> Add Q&A
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Page                                                                        */
/* -------------------------------------------------------------------------- */

function AdminEditPage() {
  const { slug } = Route.useParams();
  const navigate = useNavigate();

  const [ready, setReady] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [data, setData] = useState<Collection>(newCollectionTemplate(slug));
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    tone: "ok" | "err";
    text: string;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: session } = await supabaseBrowser.auth.getSession();
      if (cancelled) return;
      if (!session.session) {
        navigate({ to: "/admin/login" });
        return;
      }
      try {
        const existing = await getCollectionFn({ data: slug });
        if (cancelled) return;
        if (existing) {
          setData(existing);
          setIsNew(false);
        } else {
          setData(newCollectionTemplate(slug));
          setIsNew(true);
        }
      } catch (err) {
        if (!cancelled) {
          setMessage({
            tone: "err",
            text:
              err instanceof Error
                ? `Failed to load collection: ${err.message}`
                : "Failed to load collection.",
          });
        }
      } finally {
        if (!cancelled) setReady(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [navigate, slug]);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    const { data: session } = await supabaseBrowser.auth.getSession();
    const accessToken = session.session?.access_token;
    if (!accessToken) {
      navigate({ to: "/admin/login" });
      return;
    }
    try {
      const result = await saveCollectionFn({
        data: {
          accessToken,
          collection: data as unknown as Record<string, unknown>,
          isNew,
        },
      });
      setMessage({ tone: "ok", text: result.message });
      if (isNew) setIsNew(false);
    } catch (err) {
      setMessage({
        tone: "err",
        text: err instanceof Error ? err.message : "Save failed.",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!ready) return null;

  const patch = (partial: Partial<Collection>) =>
    setData((d) => ({ ...d, ...partial }));

  return (
    <main className="min-h-screen bg-ivory pt-[calc(5rem+50px)] pb-40">
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        <div className="mb-10 flex items-center justify-between gap-4">
          <Link
            to="/admin"
            className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-gold/80 hover:text-gold transition-colors"
          >
            <ArrowLeft size={14} strokeWidth={1.5} /> All collections
          </Link>
          <p className="text-[10px] uppercase tracking-[0.4em] text-navy-deep/60">
            {isNew ? "Creating new" : "Editing"} · /{data.slug || slug}
          </p>
        </div>

        <div className="mb-10">
          <h1 className="font-display italic text-4xl md:text-5xl text-navy-deep leading-tight">
            {isNew ? "New collection" : (data.name || "Untitled collection")}
          </h1>
        </div>

        <div className="space-y-8">
          {/* Hero fields */}
          <Section title="Hero" hint="Shown on the collections grid and at the top of the detail page.">
            <TextInput
              label="Name"
              value={data.name}
              onChange={(v) => patch({ name: v })}
              placeholder="e.g. Midnight Cambodi"
            />
            <TextInput
              label="Tag"
              value={data.tag}
              onChange={(v) => patch({ tag: v })}
              placeholder="e.g. Intense · Resinous"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <TextInput
                label="Price (display)"
                value={data.price}
                onChange={(v) => patch({ price: v })}
                placeholder="₹42,000"
              />
              <NumberInput
                label="Price (numeric — used for cart maths)"
                value={data.priceValue}
                onChange={(v) => patch({ priceValue: v })}
                placeholder="42000"
              />
            </div>
            <ImageInput
              label="Hero image"
              value={data.image}
              onChange={(v) => patch({ image: v })}
            />
            <TextArea
              label="Story (hero paragraph)"
              value={data.story}
              onChange={(v) => patch({ story: v })}
              rows={3}
            />
            <TextInput
              label="Buy Now button URL"
              value={data.buyNowUrl}
              onChange={(v) => patch({ buyNowUrl: v })}
              placeholder="/cart or https://…"
            />
          </Section>

          {/* Layers */}
          <Section title="Layers" hint="Fragrance layers shown on the home Featured Collections cards.">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <TextInput
                label="Top layer"
                value={data.layers.top}
                onChange={(v) =>
                  patch({ layers: { ...data.layers, top: v } })
                }
              />
              <TextInput
                label="Heart layer"
                value={data.layers.heart}
                onChange={(v) =>
                  patch({ layers: { ...data.layers, heart: v } })
                }
              />
              <TextInput
                label="Base layer"
                value={data.layers.base}
                onChange={(v) =>
                  patch({ layers: { ...data.layers, base: v } })
                }
              />
            </div>
          </Section>

          {/* Story Behind */}
          <Section title="The Story Behind This Collection">
            <TextInput
              label="Heading"
              value={data.storyBehind.heading}
              onChange={(v) =>
                patch({
                  storyBehind: { ...data.storyBehind, heading: v },
                })
              }
            />
            <StringList
              label="Paragraphs"
              values={data.storyBehind.paragraphs}
              onChange={(next) =>
                patch({
                  storyBehind: { ...data.storyBehind, paragraphs: next },
                })
              }
              multiline
            />
            <NumberInput
              label="Which paragraph is styled in gold italic? (0-based index, leave 0 if none)"
              value={data.storyBehind.highlightIndex ?? 0}
              onChange={(v) =>
                patch({
                  storyBehind: { ...data.storyBehind, highlightIndex: v },
                })
              }
            />
          </Section>

          {/* What's Included */}
          <Section title="What's Included">
            <TextInput
              label="Heading"
              value={data.whatsIncluded.heading}
              onChange={(v) =>
                patch({
                  whatsIncluded: { ...data.whatsIncluded, heading: v },
                })
              }
            />
            <TextArea
              label="Intro paragraph"
              value={data.whatsIncluded.intro}
              onChange={(v) =>
                patch({ whatsIncluded: { ...data.whatsIncluded, intro: v } })
              }
              rows={3}
            />
            <StringList
              label="Included items"
              values={data.whatsIncluded.items}
              onChange={(next) =>
                patch({
                  whatsIncluded: { ...data.whatsIncluded, items: next },
                })
              }
              placeholder="e.g. A carefully selected luxury fragrance"
            />
            <TextArea
              label="Closer (italic gold line)"
              value={data.whatsIncluded.closer}
              onChange={(v) =>
                patch({
                  whatsIncluded: { ...data.whatsIncluded, closer: v },
                })
              }
              rows={3}
            />
            <ImageInput
              label="Photo"
              value={data.whatsIncluded.photo}
              onChange={(v) =>
                patch({ whatsIncluded: { ...data.whatsIncluded, photo: v } })
              }
            />
          </Section>

          {/* Make It Personal */}
          <Section title="Make It Personal">
            <TextInput
              label="Heading"
              value={data.makeItPersonal.heading}
              onChange={(v) =>
                patch({
                  makeItPersonal: { ...data.makeItPersonal, heading: v },
                })
              }
            />
            <StringList
              label="Paragraphs"
              values={data.makeItPersonal.paragraphs}
              onChange={(next) =>
                patch({
                  makeItPersonal: {
                    ...data.makeItPersonal,
                    paragraphs: next,
                  },
                })
              }
              multiline
            />
            <NumberInput
              label="Gold-italic paragraph index (0-based)"
              value={data.makeItPersonal.highlightIndex ?? 0}
              onChange={(v) =>
                patch({
                  makeItPersonal: {
                    ...data.makeItPersonal,
                    highlightIndex: v,
                  },
                })
              }
            />
            <ImageInput
              label="Photo"
              value={data.makeItPersonal.photo}
              onChange={(v) =>
                patch({
                  makeItPersonal: {
                    ...data.makeItPersonal,
                    photo: v,
                  },
                })
              }
            />
          </Section>

          {/* Fragrance Details */}
          <Section title="Fragrance Details">
            <TextInput
              label="Heading"
              value={data.fragranceDetails.heading}
              onChange={(v) =>
                patch({
                  fragranceDetails: {
                    ...data.fragranceDetails,
                    heading: v,
                  },
                })
              }
            />
            <StringList
              label="Paragraphs (last one is styled italic gold)"
              values={data.fragranceDetails.paragraphs}
              onChange={(next) =>
                patch({
                  fragranceDetails: {
                    ...data.fragranceDetails,
                    paragraphs: next,
                  },
                })
              }
              multiline
            />
            <SpecList
              values={data.fragranceDetails.specs}
              onChange={(next) =>
                patch({
                  fragranceDetails: {
                    ...data.fragranceDetails,
                    specs: next,
                  },
                })
              }
            />
          </Section>

          {/* Livin' Experience */}
          <Section title="The Livin' Experience">
            <TextInput
              label="Heading"
              value={data.livinExperience.heading}
              onChange={(v) =>
                patch({
                  livinExperience: { ...data.livinExperience, heading: v },
                })
              }
            />
            <StringList
              label="Paragraphs"
              values={data.livinExperience.paragraphs}
              onChange={(next) =>
                patch({
                  livinExperience: {
                    ...data.livinExperience,
                    paragraphs: next,
                  },
                })
              }
              multiline
            />
            <TextArea
              label="Closer (large italic gold line)"
              value={data.livinExperience.closer}
              onChange={(v) =>
                patch({
                  livinExperience: { ...data.livinExperience, closer: v },
                })
              }
              rows={2}
            />
          </Section>

          {/* FAQ */}
          <Section title="Frequently Asked Questions">
            <FaqList
              values={data.faq}
              onChange={(next) => patch({ faq: next })}
            />
          </Section>

          {/* Ready to Make Someone Smile */}
          <Section title="Ready to Make Someone Smile?">
            <TextInput
              label="Heading"
              value={data.readyToMakeSmile.heading}
              onChange={(v) =>
                patch({
                  readyToMakeSmile: {
                    ...data.readyToMakeSmile,
                    heading: v,
                  },
                })
              }
            />
            <StringList
              label="Paragraphs"
              values={data.readyToMakeSmile.paragraphs}
              onChange={(next) =>
                patch({
                  readyToMakeSmile: {
                    ...data.readyToMakeSmile,
                    paragraphs: next,
                  },
                })
              }
              multiline
            />
            <TextArea
              label="Closer (italic gold line)"
              value={data.readyToMakeSmile.closer}
              onChange={(v) =>
                patch({
                  readyToMakeSmile: {
                    ...data.readyToMakeSmile,
                    closer: v,
                  },
                })
              }
              rows={2}
            />
            <ImageInput
              label="Photo"
              value={data.readyToMakeSmile.photo}
              onChange={(v) =>
                patch({
                  readyToMakeSmile: {
                    ...data.readyToMakeSmile,
                    photo: v,
                  },
                })
              }
            />
          </Section>
        </div>

        {/* Save bar */}
        <div className="sticky bottom-0 mt-10 -mx-6 md:-mx-10 px-6 md:px-10 py-5 bg-ivory/95 backdrop-blur-md border-t border-gold/20 shadow-[0_-10px_30px_rgba(20,42,92,0.06)] flex items-center gap-4">
          {message && (
            <p
              className={
                message.tone === "ok"
                  ? "flex-1 text-sm text-green-800 bg-green-50 border border-green-200 px-3 py-2 rounded"
                  : "flex-1 text-sm text-red-800 bg-red-50 border border-red-200 px-3 py-2 rounded"
              }
            >
              {message.text}
            </p>
          )}
          {!message && <div className="flex-1" />}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-8 py-3 bg-navy-deep text-white text-[11px] uppercase tracking-[0.35em] hover:bg-navy disabled:opacity-50 transition-colors"
          >
            <Save size={14} strokeWidth={1.5} />
            {saving
              ? "Saving…"
              : isNew
                ? "Create collection"
                : "Save changes"}
          </button>
        </div>
      </div>
    </main>
  );
}
