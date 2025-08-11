// components/Pagination.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function range(from, to) {
  return [...Array(to - from + 1)].map((_, i) => from + i);
}

export default function Pagination({
  current = 1,
  total = 1,
  onChange = () => {},
  siblingCount = 1,
}) {
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
