import Link from "next/link";

function qs(obj: Record<string, string | string[] | undefined>) {
  const p = new URLSearchParams();
  Object.entries(obj).forEach(([k, v]) => {
    if (Array.isArray(v)) v.forEach((x) => p.append(k, x));
    else if (v) p.append(k, v);
  });
  return `?${p.toString()}`;
}

export default async function ForumIndex({ searchParams, params }: any) {
  const {
    q = "",
    sort = "createdAt",
    order = "desc",
    tag,
    page = "1",
  } = searchParams || {};
  const tags = Array.isArray(tag) ? tag : tag ? [tag] : [];
  const base = `/api/threads`;
  const query = qs({
    courseId: params.courseId,
    q: q || undefined,
    _sort: sort,
    _order: order,
    _page: page,
    _limit: "10",
    ...Object.fromEntries(tags.map((t, i) => [`tags_like`, t])),
  });

  const threads: any[] = await fetch(`${base}${query}`, {
    cache: "no-store",
  }).then((r) => r.json());

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <form className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search..."
            className="border rounded px-3 py-2"
          />
          <select
            name="sort"
            defaultValue={sort}
            className="border rounded px-2"
          >
            <option value="createdAt">Newest</option>
            <option value="upvotes">Top</option>
          </select>
          <button className="border px-3 rounded">Apply</button>
        </form>
        <Link
          href={`/courses/${params.courseId}/forum/new`}
          className="px-3 py-2 bg-black text-white rounded"
        >
          Create Thread
        </Link>
      </div>

      {threads.map((t) => (
        <Link
          key={t.id}
          href={`/threads/${t.id}`}
          className="block border rounded p-3 hover:bg-gray-50"
        >
          <div className="text-sm text-gray-500">{t.tags?.join(" • ")}</div>
          <div className="font-semibold">{t.title}</div>
          <div className="text-sm text-gray-600 flex gap-4">
            <span>👍 {t.upvotes}</span>
            <span>👎 {t.downvotes}</span>
            {t.status?.pinned && <span>📌 pinned</span>}
            {t.status?.locked && <span>🔒 locked</span>}
          </div>
        </Link>
      ))}
    </div>
  );
}
