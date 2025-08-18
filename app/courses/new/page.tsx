"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewThread({ params }: any) {
  const r = useRouter();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("react,hooks");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        courseId: params.courseId,
        authorId: "u1",
        title,
        body,
        tags: tags.split(",").map((s) => s.trim()),
        status: { pinned: false, locked: false, acceptedAnswerId: null },
        upvotes: 0,
        downvotes: 0,
      }),
    });
    r.push(`/courses/${params.courseId}/forum`);
  }

  return (
    <form onSubmit={submit} className="max-w-xl mx-auto p-4 space-y-3">
      <input
        className="w-full border p-2 rounded"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full border p-2 rounded"
        placeholder="Body"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        placeholder="Tags (comma)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-black text-white rounded">Post</button>
      </div>
    </form>
  );
}
