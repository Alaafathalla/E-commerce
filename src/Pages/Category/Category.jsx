import React, { useCallback, useEffect, useMemo, useState, useTransition } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight, RefreshCcw, Search, Tag, Star, Clock3, Flame } from "lucide-react";
import Helmet from "react-helmet";
import useDataStore from "../../Stores/useDataStore";;

/**
 * Categories (Clean Code)
 * - English UI
 * - Italian is default active filter on first load
 * - URL-driven state (?tag=..., ?page=...)
 * - Robust image fallbacks
 * - Small, focused components
 */

// ------------------------
// Constants & Utilities
// ------------------------
const DEFAULT_LIMIT = 12;
const STATIC_FALLBACK_IMG = "https://placehold.co/600x400?text=No+Image";

const TAG_IMAGES = {
  breakfast: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1600&auto=format&fit=crop",
  lunch: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1600&auto=format&fit=crop",
  dinner: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1600&auto=format&fit=crop",
  dessert: "https://images.unsplash.com/photo-1475855581690-80accde3ae2b?q=80&w=1600&auto=format&fit=crop",
  soup: "https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=1600&auto=format&fit=crop",
  salad: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop",
  pasta: "https://images.unsplash.com/photo-1524182576065-4f0792cfe6cf?q=80&w=1600&auto=format&fit=crop",
  chicken: "https://images.unsplash.com/photo-1604908554049-51e25ba78a5d?q=80&w=1600&auto=format&fit=crop",
  beef: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=1600&auto=format&fit=crop",
  vegan: "https://images.unsplash.com/photo-1505575972945-280edc63f3b0?q=80&w=1600&auto=format&fit=crop",
  "milks & dairies": "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
  "coffes & teas": "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop",
  "pet foods": "https://images.unsplash.com/photo-1558944351-c37d31fd69de?q=80&w=1600&auto=format&fit=crop",
  meats: "https://images.unsplash.com/photo-1604908177071-8aa3d7dfb2a2?q=80&w=1600&auto=format&fit=crop",
  vegetables: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?q=80&w=1600&auto=format&fit=crop",
  fruits: "https://images.unsplash.com/photo-1574226516831-e1dff420e43e?q=80&w=1600&auto=format&fit=crop",
};

const heroFor = (tag) => (tag ? pickTagImage(tag) : "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1920&auto=format&fit=crop");

function placeholderFor(text) {
  const t = encodeURIComponent(String(text || "tag"));
  return `https://placehold.co/600x400?text=${t}`;
}

function pickTagImage(tag) {
  if (!tag) return placeholderFor(tag);
  const key = String(tag).toLowerCase();
  return TAG_IMAGES[key] || placeholderFor(tag);
}

function getSafeImageUrl(url) {
  if (!url || typeof url !== "string" || url.trim() === "") return STATIC_FALLBACK_IMG;
  return url;
}

function formatMinutes(min) {
  if (!min && min !== 0) return null;
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h && m) return `${h}h ${m}m`;
  if (h) return `${h}h`;
  return `${m}m`;
}

// ------------------------
// UI Subcomponents
// ------------------------
function Stars({ rating = 0 }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating ${rating} of 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < full || (i === full && half);
        return (
          <Star key={i} className={`h-4 w-4 ${filled ? "fill-yellow-400 stroke-yellow-500" : "stroke-gray-300"}`} />
        );
      })}
    </div>
  );
}

function ImageWithFallback({ src, alt, className }) {
  const [error, setError] = useState(false);
  const safe = getSafeImageUrl(src);
  return (
    <img
      src={error ? STATIC_FALLBACK_IMG : safe}
      alt={alt}
      onError={() => setError(true)}
      loading="lazy"
      className={className}
    />
  );
}

function RecipeCard({ r }) {
  const prep = formatMinutes(r?.prepTimeMinutes) || "";
  const cook = formatMinutes(r?.cookTimeMinutes) || "";
  const total = r?.prepTimeMinutes && r?.cookTimeMinutes ? formatMinutes(r.prepTimeMinutes + r.cookTimeMinutes) : null;
  const kcal = r?.caloriesPerServing;
  const subtitle = r?.cuisine || (Array.isArray(r?.mealType) ? r.mealType.join(", ") : "");

  return (
    <article className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 hover:shadow-md transition">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-gray-50 dark:bg-gray-800">
        <ImageWithFallback src={r?.image || r?.thumbnail} alt={r?.name || "Recipe"} className="h-full w-full object-cover" />
        {subtitle && (
          <span className="absolute left-2 top-2 rounded-full bg-black/70 px-3 py-1 text-xs text-white backdrop-blur">
            {subtitle}
          </span>
        )}
      </div>

      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{r?.cuisine || r?.mealType?.[0] || "Recipe"}</p>
      <h3 className="line-clamp-2 mt-1 text-sm font-semibold text-gray-800 dark:text-white">{r?.name}</h3>

      <div className="mt-2 flex items-center justify-between">
        <Stars rating={Number(r?.rating) || 0} />
        {total && (
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-300">
            <Clock3 className="h-4 w-4" /> {total}
          </div>
        )}
      </div>

      <div className="mt-2 flex items-center gap-3 text-xs text-gray-600 dark:text-gray-300">
        {prep && (<span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> Prep: {prep}</span>)}
        {cook && (<span className="inline-flex items-center gap-1"><Clock3 className="h-3 w-3" /> Cook: {cook}</span>)}
        {kcal ? (<span className="ml-auto inline-flex items-center gap-1"><Flame className="h-3 w-3" /> {kcal} kcal</span>) : null}
      </div>
    </article>
  );
}

function TagChip({ label, isActive, onClick }) {
  const to = label ? `?tag=${encodeURIComponent(label)}` : "#";
  return (
    <NavLink
      to={to}
      onClick={(e) => {
        if (!label) e.preventDefault();
        else onClick?.(label);
      }}
      className={
        "whitespace-nowrap rounded-full border px-3 py-1.5 text-sm transition " +
        (isActive
          ? "bg-blue-600 text-white border-blue-600"
          : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800")
      }
      title={label || "…"}
    >
      {label || "…"}
    </NavLink>
  );
}

function Pagination({ page, totalPages, onChange }) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
      <div className="flex items-center gap-2">
        <button
          disabled={page <= 1}
          onClick={() => onChange(Math.max(1, page - 1))}
          className="inline-flex items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" /> Prev
        </button>
        <span className="rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm">{page} / {totalPages}</span>
        <button
          disabled={page >= totalPages}
          onClick={() => onChange(Math.min(totalPages, page + 1))}
          className="inline-flex items-center gap-1 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm disabled:opacity-50"
        >
          Next <ChevronLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ------------------------
// Main Component
// ------------------------
export default function Categories() {
  // UI State
  const [showAllTags, setShowAllTags] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [payload, setPayload] = useState({ recipes: [], total: 0, skip: 0, limit: DEFAULT_LIMIT });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [loadingKey, setLoadingKey] = useState(null);

  // Router search params
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedTag = searchParams.get("tag") || ""; // URL-driven active tag

  // Data store bindings
  const recipeTags = useDataStore((s) => s.recipeTags);
  const tagsLoading = useDataStore((s) => s.tagsLoading);
  const tagsError = useDataStore((s) => s.tagsError);
  const getRecipeTags = useDataStore((s) => s.getRecipeTags);
  const getRecipesByTag = useDataStore((s) => s.getRecipesByTag);

  const heroImage = heroFor(selectedTag);

  // Ensure 'Italian' is the default active filter on first load
  const setActiveTag = useCallback((tag) => {
    const next = new URLSearchParams(searchParams);
    if (tag) next.set("tag", tag); else next.delete("tag");
    next.set("page", "1");
    setPage(1);
    setSearchParams(next, { replace: false });
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    if (!searchParams.get("tag")) setActiveTag("Italian");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load tags on mount
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        await getRecipeTags(false);
        if (ignore) return;
      } catch (err) {
        console.error("Failed to load tags", err);
      }
    })();
    return () => { ignore = true; };
  }, [getRecipeTags]);

  // Fetch recipes when tag/page/limit changes
  useEffect(() => {
    if (!selectedTag) return;
    const skip = (page - 1) * limit;
    const params = { skip, limit };

    startTransition(async () => {
      setLoadingKey(selectedTag.toLowerCase());
      setError(null);
      try {
        const data = await getRecipesByTag(selectedTag, forceRefresh, params);
        setPayload(data || { recipes: [], total: 0, skip, limit });
      } catch (e) {
        setError(e?.message || "Failed to fetch recipes");
      } finally {
        setLoadingKey(null);
        if (forceRefresh) setForceRefresh(false);
      }
    });
  }, [selectedTag, page, limit, forceRefresh, getRecipesByTag, startTransition]);

  // Derived lists & flags
  const filteredTags = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = Array.isArray(recipeTags) ? recipeTags : [];
    return q ? list.filter((t) => String(t).toLowerCase().includes(q)) : list;
  }, [recipeTags, query]);

  const totalPages = Math.max(1, Math.ceil((payload?.total || 0) / limit));
  const loading = isPending || (!!selectedTag && loadingKey === selectedTag.toLowerCase());

  // Keep local pagination synced with URL if it changes externally
  useEffect(() => {
    const p = Number(searchParams.get("page") || 1);
    if (!Number.isNaN(p) && p !== page) setPage(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // Handlers
  const handlePageChange = useCallback((nextPage) => {
    setPage(nextPage);
    const params = new URLSearchParams(searchParams);
    params.set("page", String(nextPage));
    setSearchParams(params, { replace: false });
  }, [searchParams, setSearchParams]);

  const handleLimitChange = useCallback((e) => {
    const v = Number(e.target.value);
    setLimit(v);
    setPage(1);
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    setSearchParams(params, { replace: false });
  }, [searchParams, setSearchParams]);

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10">
      {/* Hero */}
      <div className="relative mb-6 overflow-hidden rounded-3xl border border-gray-200 dark:border-gray-700">
        <ImageWithFallback src={heroImage} alt="Categories hero" className="h-48 w-full object-cover sm:h-64 md:h-72" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end justify-between p-6">
          <div>
            <h1 className="text-2xl font-bold text-white drop-shadow-sm">Discover Categories</h1>
            <p className="mt-1 text-white/80">Search tags and pick a category to browse photo-rich recipes.</p>
          </div>
          <button
            onClick={() => setForceRefresh(true)}
            className="hidden items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-3 py-2 text-sm text-white backdrop-blur hover:bg-white/20 sm:inline-flex"
            title="Refresh data"
          >
            <RefreshCcw className="h-4 w-4" /> Refresh
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <header className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search a tag…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-2xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-gray-900/70 px-11 py-3 outline-none backdrop-blur transition focus:border-transparent focus:shadow-md"
          />
          <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 opacity-60" />
        </div>
        <button
          onClick={() => setForceRefresh(true)}
          className="inline-flex items-center gap-2 self-start rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
          title="Refresh data"
        >
          <RefreshCcw className="h-4 w-4" /> Refresh
        </button>
      </header>

      {/* Tags (chips + modal) */}
      <section className="mb-8">
        {tagsError && (
          <div className="mb-3 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">{tagsError}</div>
        )}

        <div className="flex items-center gap-2 overflow-x-auto py-1">
          {(tagsLoading ? Array.from({ length: 12 }).map((_, i) => `skeleton-${i}`) : filteredTags.slice(0, 12)).map((t, idx) => {
            const label = typeof t === "string" ? t : "";
            const isActive = selectedTag.toLowerCase() === label.toLowerCase();
            return (
              <TagChip key={label || idx} label={label} isActive={isActive} onClick={setActiveTag} />
            );
          })}

          {filteredTags.length > 12 && (
            <button
              onClick={() => setShowAllTags(true)}
              className="whitespace-nowrap rounded-full border border-gray-200 dark:border-gray-700 px-3 py-1.5 text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              View all
            </button>
          )}
        </div>

        {!tagsLoading && filteredTags.length === 0 && (
          <p className="mt-6 text-sm text-gray-500">No matching tags.</p>
        )}

        {showAllTags && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setShowAllTags(false)} />
            <div className="relative w-full sm:max-w-3xl max-h-[80vh] overflow-auto rounded-t-2xl sm:rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-base font-semibold">All categories</h3>
                <button onClick={() => setShowAllTags(false)} className="rounded-md border px-2 py-1 text-sm">Close</button>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {filteredTags.map((t, idx) => {
                  const label = String(t);
                  const img = pickTagImage(label);
                  const isActive = selectedTag.toLowerCase() === label.toLowerCase();
                  const to = `?tag=${encodeURIComponent(label)}`;
                  return (
                    <NavLink
                      key={label + idx}
                      to={to}
                      onClick={() => { setActiveTag(label); setShowAllTags(false); }}
                      className={
                        "group relative flex items-center gap-3 overflow-hidden rounded-2xl border p-2 text-right transition hover:shadow " +
                        (isActive ? "ring-2 ring-blue-600" : "")
                      }
                    >
                      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-800">
                        <ImageWithFallback src={img} alt={label} className="h-full w-full object-cover" />
                      </div>
                      <span className="truncate text-sm">{label}</span>
                      <Tag className="ml-auto h-4 w-4 shrink-0 text-gray-400" />
                    </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </section>

      {/* Recipes list */}
      <section>
        {!selectedTag && (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-8 text-gray-600 dark:text-gray-300">
            Pick a category above to view recipes with photos.
          </div>
        )}

        {!!selectedTag && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recipes: {selectedTag}</h2>
              <button onClick={() => setForceRefresh(true)} className="inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 px-3 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-800">
                <RefreshCcw className="h-4 w-4" /> Refresh
              </button>
            </div>

            {error && (
              <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">Error: {error}</div>
            )}

            {loading ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: limit }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-4">
                    <div className="aspect-[4/3] w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
                    <div className="mt-3 space-y-2">
                      <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                      <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                {payload.recipes?.length === 0 ? (
                  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-gray-600 dark:text-gray-300">No recipes in this category.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {payload.recipes.map((r) => (
                      <RecipeCard key={r.id} r={r} />
                    ))}
                  </div>
                )}

                {totalPages > 1 && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Pagination page={page} totalPages={totalPages} onChange={handlePageChange} />
                    <div className="flex items-center gap-2 text-sm">
                      <label className="text-gray-600 dark:text-gray-300">/page</label>
                      <select
                        className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-2 py-1"
                        value={limit}
                        onChange={handleLimitChange}
                      >
                        {[6, 12, 24, 48].map((n) => (
                          <option key={n} value={n}>{n}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </section>
      <Helmet>
        <title>FAQ page</title>
        <meta name="description" content="faq"/>
        <meta property="og:title" content="الصفحة الرئيسية" />
      </Helmet>
    </div>
  );
}



