"use client";
import { useState } from "react";

export default function CommentComposer({
  disabled,
  onPost,
}: {
  disabled?: boolean;
  onPost: (text: string) => void;
}) {
  const [val, setVal] = useState("");

  return (
    <section className="">
      <h3 className="mb-3 text-lg font-semibold text-gray-900">
        Write a comment
      </h3>
      <textarea
        value={val}
        onChange={(e) => setVal(e.target.value)}
        rows={1}
        placeholder="Write a public comment..."
        disabled={disabled}
        className="w-full rounded-md border p-4 outline-none disabled:opacity-50"
      />
      <div className="mt-3 flex justify-end">
        <button
          onClick={() => {
            const v = val.trim();
            if (!v) return;
            onPost(v);
            setVal("");
          }}
          disabled={disabled || !val.trim()}
          className="rounded-xl bg-purple-500 px-4 py-2 text-white hover:opacity-90 disabled:opacity-40"
        >
          Post Comment
        </button>
      </div>
    </section>
  );
}
