"use client";

import { ForumHeader } from "@/components/forum/ForumHeader";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "@/components/ui/button";

import {
  createThreadSchema,
  type CreateThreadInput,
} from "@/lib/validations/thread";
import { TagInput } from "@/components/forum/TagInput";
import { ArrowLeft } from "lucide-react";
import BottomNav from "@/components/BottomNav";

export default function NewThread({ params }: any) {
  const r = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateThreadInput>({
    resolver: zodResolver(createThreadSchema),
    defaultValues: {
      title: "",
      body: "",
      tags: [], // no default tags
    },
    mode: "onSubmit",
  });

  const onSubmit = async (values: CreateThreadInput) => {
    const payload = {
      courseId: params.courseId,
      authorId: "u1",
      title: values.title,
      body: values.body, // HTML from TinyMCE
      tags: values.tags, // array of strings
      status: { pinned: false, locked: false, acceptedAnswerId: null },
      upvotes: 0,
      downvotes: 0,
      views: 0,
    };

    const res = await fetch("/api/threads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      // basic error surface; keep it minimal
      console.error("Failed to create thread");
      return;
    }

    reset();
    r.push(`/courses/${params.courseId}/forum`);
  };

  return (
    <div>
      <ForumHeader courseId={params.courseId} onSearch={setSearchQuery} />
      <div className="container md:px-6xl">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-2xl mx-auto p-6 space-y-4"
        >
          <h1 className="text-2xl font-semibold">Create Thread</h1>

          {/* Title */}
          <div>
            <input
              className="w-full border p-3 rounded"
              placeholder="Title (min 10 characters)"
              {...register("title")}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Body (TinyMCE) */}
          <div>
            <Controller
              control={control}
              name="body"
              render={({ field }) => (
                <Editor
                  apiKey={
                    process.env.NEXT_PUBLIC_TINYMCE_API_KEY || "no-api-key"
                  }
                  value={field.value}
                  onEditorChange={(content) => field.onChange(content)}
                  init={{
                    height: 360,
                    menubar: false,
                    branding: false,
                    plugins:
                      "lists link code emoticons table autolink charmap preview",
                    toolbar:
                      "undo redo | styles | bold italic underline | bullist numlist outdent indent | link emoticons | removeformat | code preview",
                    toolbar_mode: "sliding",
                    content_style:
                      "body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; font-size:14px }",
                  }}
                />
              )}
            />
            {errors.body && (
              <p className="mt-1 text-sm text-red-600">{errors.body.message}</p>
            )}
          </div>

          {/* Tags as chips (max 5, with × remove) */}
          <div>
            <TagInput name="tags" control={control} />
            {errors.tags && (
              <p className="mt-1 text-sm text-red-600">
                {(errors.tags as any)?.message ||
                  "Please provide up to 5 valid tags"}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => r.back()}
              className="border border-purple-500 bg-white text-purple-600 hover:text-white hover:bg-purple-600 cursor-pointer flex items-center gap-2"
            >
              <ArrowLeft /> Back
            </Button>
            <Button
              type="submit"
              className="bg-purple-500 text-white hover:bg-purple-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </div>
      <BottomNav courseId="c1" />
    </div>
  );
}
