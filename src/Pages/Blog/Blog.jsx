import React from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Calendar,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Link as LinkIcon,
} from "lucide-react";

// ==== YOUR ASSETS (swap paths if needed) ====
import hero from "../../assets/blog/hero.png";
import thumb1 from "../../assets/blog/item1.png";
import thumb2 from "../../assets/blog/item2.png";
import thumb3 from "../../assets/blog/item11.png";
import gallery1 from "../../assets/blog/item22.png";
import gallery2 from "../../assets/blog/item33.png";
import gallery3 from "../../assets/blog/item44.png";
import gallery4 from "../../assets/blog/item55.png";

// ==== MOCK DATA (sidebar) ====
const categories = [
  { name: "Milk & Dairies", count: 16 },
  { name: "Sea Food", count: 24 },
  { name: "Fresh Fruit", count: 53 },
  { name: "Pet Food", count: 21 },
  { name: "Meat Food", count: 48 },
];

const recentPost = {
  date: "Sep 09, 2023",
  title: "10 Tasty Organic Fruits Choose",
  image: thumb1,
};

const gallery = [gallery1, gallery2, gallery3, gallery4];

const tags = ["Vegetables", "Juice", "Meat Food", "Cabbage", "Organic Food", "Juice"];

// ============================================
// Reusable Pagination (with "…" collapsing)
// ============================================
function range(from, to) {
  return [...Array(Math.max(0, to - from + 1))].map((_, i) => from + i);
}

function Pagination({ current = 1, total = 1, onChange = () => {}, siblingCount = 1 }) {
  if (total <= 1) return null;

  const left = Math.max(1, current - siblingCount);
  const right = Math.min(total, current + siblingCount);

  const items = [
    1,
    ...(left > 2 ? ["…"] : []),
    ...range(Math.max(2, left), Math.min(right, total - 1)),
    ...(right < total - 1 ? ["…"] : []),
    total,
  ];

  const base =
    "px-3 py-1.5 text-sm rounded border border-gray-200 dark:border-gray-700";
  const active = "bg-red-500 text-white border-red-500";
  const btn =
    "flex items-center gap-1 " + base + " hover:bg-gray-50 dark:hover:bg-gray-800";

  return (
    <nav className="flex items-center justify-center gap-2">
      <button
        className={btn}
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
      >
        <ChevronLeft size={16} /> Previous
      </button>

      {items.map((it, i) =>
        it === "…" ? (
          <span key={`dots-${i}`} className={base + " cursor-default"}>
            …
          </span>
        ) : (
          <button
            key={it}
            className={`${base} ${
              current === it
                ? active
                : "hover:bg-gray-50 dark:hover:bg-gray-800"
            }`}
            onClick={() => onChange(it)}
          >
            {it}
          </button>
        )
      )}

      <button
        className={btn}
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
      >
        Next <ChevronRight size={16} />
      </button>
    </nav>
  );
}

// ============================================
// Blog Page (single-article layout + sidebar)
// ============================================
export default function BlogPage() {
  // URL-based page (e.g., /blog?page=2). Plug into API later.
  const [params, setParams] = useSearchParams();
  const currentPage = Number(params.get("page") || 1);
  const totalPages = 5; // TODO: replace with Math.ceil(totalPosts / pageSize) from API

  const handlePageChange = (p) => setParams({ page: String(p) });

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main column */}
        <article className="lg:col-span-8 bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {/* Cover */}
          <img src={hero} alt="cover" className="w-full h-72 object-cover" />

          <div className="p-6 sm:p-8">
            {/* Meta */}
            <div className="text-sm text-gray-500 dark:text-gray-400 flex flex-wrap gap-4">
              <span className="text-red-500 font-semibold">By Admin</span>
              <span className="flex items-center gap-1">
                <MessageCircle size={16} /> 07 Comment
              </span>
              <span className="flex items-center gap-1">
                <Calendar size={16} /> Date – 09.09.2024
              </span>
            </div>

            <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Health Benefits of a Raw food
            </h1>

            <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde
              mollitia nihil sunt reprehenderit natus, soluta officia iure enim
              itaque, iste qui exercitationem at odit beatae debitis ratione
              molestiae quis atque.
            </p>

            <p className="mt-4 text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
              doloribus dolor odio nobis cum voluptatem laudantium harum
              veritatis sint!
            </p>

            {/* Two inline cards */}
            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={thumb2} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    <span className="text-red-500 mr-2">●</span>
                    Lorem ipsum dolor consectetur adipisicing elit. Molestia, dolorum!
                  </p>
                </div>
              </div>
              <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img src={thumb3} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="text-sm font-semibold text-gray-800 dark:text-white">
                    <span className="text-red-500 mr-2">●</span>
                    Lorem ipsum dolor consectetur adipisicing elit. Molestia, dolorum!
                  </p>
                </div>
              </div>
            </div>

            {/* Quote / highlight */}
            <div className="mt-6 p-4 sm:p-5 rounded-lg border-l-4 border-red-500 bg-gray-50 dark:bg-gray-800 dark:border-red-400">
              <p className="text-gray-700 dark:text-gray-200">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat repellat
                earum architecto odit soluta quas odio distinctio quae numquam. <br />
                <span className="block font-semibold mt-2 text-red-600">John martin</span>
              </p>
            </div>

            {/* Body */}
            <p className="mt-6 text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores officia magni
              explicabo fuga molestiae architecto ipsa excepturi laudantium molestias.
            </p>

            {/* Tags + share */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex flex-wrap gap-2">
                {["Cabbage", "Appetizer", "Meat Food"].map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                <button className="p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <LinkIcon size={16} />
                </button>
                <button className="p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">f</button>
                <button className="p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">x</button>
                <button className="p-2 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">in</button>
              </div>
            </div>

            {/* Pagination */}
            <div className="mt-8">
              <Pagination
                current={currentPage}
                total={totalPages}
                onChange={(p) => handlePageChange(p)}
                siblingCount={1}
              />
            </div>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Search */}
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <div className="flex">
              <input
                type="text"
                placeholder="Search here…"
                className="flex-1 px-3 py-2 text-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-l"
              />
              <button className="px-3 bg-red-500 text-white rounded-r">
                <Search size={16} />
              </button>
            </div>
          </div>

          {/* Categories */}
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Category</h4>
            <ul className="space-y-2 text-sm">
              {categories.map((c) => (
                <li
                  key={c.name}
                  className="flex items-center justify-between py-2 border-b last:border-0 border-gray-100 dark:border-gray-800"
                >
                  <span className="text-gray-700 dark:text-gray-300">{c.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">({c.count})</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recent Post */}
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Recent Post</h4>
            <div className="flex gap-3">
              <img src={recentPost.image} alt="" className="w-20 h-20 object-cover rounded" />
              <div>
                <span className="inline-block text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded">
                  {recentPost.date}
                </span>
                <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-white">
                  {recentPost.title}
                </p>
              </div>
            </div>
          </div>

          {/* Gallery */}
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Latest Gallery</h4>
            <div className="grid grid-cols-4 gap-2">
              {gallery.map((g, i) => (
                <img key={i} src={g} className="h-14 w-full object-cover rounded" alt="" />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="p-4 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
            <h4 className="font-semibold mb-3 text-gray-800 dark:text-white">Popular Tags</h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((t) => (
                <button
                  key={t}
                  className="text-xs px-3 py-1 rounded border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-red-400"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

