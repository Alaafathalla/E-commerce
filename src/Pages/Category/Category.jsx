

import React, { useEffect, useMemo, useState, useTransition } from "react";
import { ChevronLeft, ChevronRight, RefreshCcw, Search, Tag } from "lucide-react";

/**
 * Categories.jsx (React + JS, no Next.js)
 *
 * Usage:
 * <Categories getRecipesByTag={getRecipesByTag} />
 * - Pass the async function you shared (`getRecipesByTag(tag, forceRefresh?, params?)`).
 * - Styling uses Tailwind classes (optional). Swap/remove if you don't use Tailwind.
 */

const DEFAULT_LIMIT = 12;

export default function Categories({ getRecipesByTag }) {
  const [tags, setTags] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [forceRefresh, setForceRefresh] = useState(false);
  const [payload, setPayload] = useState({ recipes: [], total: 0, skip: 0, limit: DEFAULT_LIMIT });
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [loadingKey, setLoadingKey] = useState(null);

  // Fetch available tags once
  useEffect(() => {
    let ignore = false;
    (async () => {
      try {
        const res = await fetch("https://dummyjson.com/recipes/tags", { cache: "force-cache" });
        const data = await res.json();
        if (!ignore) setTags(Array.isArray(data) ? data : data?.tags || []);
      } catch (e) {
        console.error("Failed to load tags", e);
      }
    })();
    return () => { ignore = true; };
  }, []);

  // Fetch recipes whenever selection / pagination changes
  useEffect(() => {
    if (!selectedTag || typeof getRecipesByTag !== "function") return;
    const skip = (page - 1) * limit;
    const params = { skip, limit };

    startTransition(async () => {
      setLoadingKey(selectedTag.toLowerCase());
      setError(null);
      try {
        const data = await getRecipesByTag(selectedTag, forceRefresh, params);
        setPayload(data || { recipes: [], total: 0, skip, limit });
      } catch (e) {
        const msg = e?.message || "فشل في جلب الوصفات";
        setError(msg);
      } finally {
        setLoadingKey(null);
        if (forceRefresh) setForceRefresh(false);
      }
    });
  }, [selectedTag, page, limit, forceRefresh, getRecipesByTag]);

  const filteredTags = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? tags.filter((t) => String(t).toLowerCase().includes(q)) : tags;
  }, [tags, query]);

  const totalPages = Math.max(1, Math.ceil((payload?.total || 0) / limit));
  const loading = isPending || (!!selectedTag && loadingKey === selectedTag.toLowerCase());

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <header className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">التصنيفات</h1>
        <div className="flex items-center gap-2">
          <div className="relative w-72">
            <input
              type="text"
              placeholder="ابحث عن وسم…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full rounded-xl border bg-white/60 px-10 py-2 outline-none ring-0 backdrop-blur-sm transition focus:border-transparent focus:shadow-md"
            />
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60" />
          </div>
          <button
            onClick={() => setForceRefresh(true)}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            title="تحديث البيانات"
          >
            <RefreshCcw className="h-4 w-4" /> تحديث
          </button>
        </div>
      </header>

      {/* Tags grid */}
      <section className="mb-8">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {filteredTags.map((t) => {
            const active = selectedTag?.toLowerCase() === String(t).toLowerCase();
            return (
              <button
                key={t}
                onClick={() => { setSelectedTag(String(t)); setPage(1); }}
                className={
                  "flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-sm transition " +
                  (active ? "border-transparent bg-black text-white shadow" : "hover:bg-gray-50")
                }
              >
                <span className="truncate">{String(t)}</span>
                <Tag className="h-4 w-4 shrink-0" />
              </button>
            );
          })}
        </div>
        {filteredTags.length === 0 && (
          <p className="mt-6 text-sm text-gray-500">لا توجد وسوم مطابقة.</p>
        )}
      </section>

      {/* Recipes list */}
      <section>
        {!selectedTag && (
          <div className="rounded-xl border p-6 text-gray-600">
            اختر تصنيفًا من الأعلى لعرض الوصفات.
          </div>
        )}

        {!!selectedTag && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">وصفات: {selectedTag}</h2>
              <div className="flex items-center gap-2 text-sm">
                <label className="text-gray-600">عدد العناصر في الصفحة</label>
                <select
                  className="rounded-lg border px-2 py-1"
                  value={limit}
                  onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                >
                  {[6, 12, 24, 48].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <div className="rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
                حدث خطأ: {error}
              </div>
            )}

            {loading && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: limit }).map((_, i) => (
                  <div key={i} className="h-40 animate-pulse rounded-xl bg-gray-100" />
                ))}
              </div>
            )}

            {!loading && (
              <>
                {payload.recipes?.length === 0 ? (
                  <div className="rounded-xl border p-6 text-gray-600">لا توجد وصفات ضمن هذا التصنيف.</div>
                ) : (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {payload.recipes.map((r) => (
                      <article key={r.id} className="group overflow-hidden rounded-2xl border">
                        <a href={`/recipes/${r.id}`} className="block">
                          <div className="aspect-video w-full overflow-hidden bg-gray-100">
                            <img
                              alt={r.name}
                              src={r.image || r.thumbnail || "https://placehold.co/600x400"}
                              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                            />
                          </div>
                          <div className="p-3">
                            <h3 className="line-clamp-1 font-medium">{r.name}</h3>
                            <p className="mt-1 line-clamp-2 text-sm text-gray-600">{r.cuisine || (Array.isArray(r.mealType) ? r.mealType.join("، ") : "")}</p>
                          </div>
                        </a>
                      </article>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <button
                      disabled={page <= 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
                    >
                      <ChevronRight className="h-4 w-4" /> السابق
                    </button>
                    <span className="rounded-xl border px-3 py-2 text-sm">{page} / {totalPages}</span>
                    <button
                      disabled={page >= totalPages}
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
                    >
                      التالي <ChevronLeft className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
