"use client";

import { Controller, Control } from "react-hook-form";

type TagInputProps = {
  name: string; // RHF field name (e.g., "tags")
  control: Control<any>;
  placeholder?: string;
  max?: number; // default 5
};

export function TagInput({
  name,
  control,
  placeholder = "Add a tag and press Enter",
  max = 5,
}: TagInputProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => {
        const value: string[] = Array.isArray(field.value) ? field.value : [];
        const addTag = (raw: string) => {
          const clean = raw.trim().toLowerCase();
          if (!clean) return;
          if (!/^[a-z0-9-]{1,20}$/.test(clean)) return; // alphanumeric or hyphen
          if (value.includes(clean)) return;
          if (value.length >= max) return;
          field.onChange([...value, clean]);
        };
        const removeTag = (t: string) => {
          field.onChange(value.filter((x) => x !== t));
        };
        const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter" || e.key === "," || e.key === "Tab") {
            e.preventDefault();
            addTag((e.target as HTMLInputElement).value);
            (e.target as HTMLInputElement).value = "";
          }
        };
        const onPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
          const text = e.clipboardData.getData("text");
          if (!text) return;
          e.preventDefault();
          text.split(",").forEach((t) => addTag(t));
        };
        return (
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              {value.map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm"
                >
                  #{t}
                  <button
                    type="button"
                    aria-label={`Remove ${t}`}
                    className="rounded-full bg-gray-200 px-1 leading-none hover:bg-gray-300"
                    onClick={() => removeTag(t)}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              onKeyDown={onKeyDown}
              onPaste={onPaste}
              placeholder={
                value.length >= max ? "Maximum tags reached" : placeholder
              }
              disabled={value.length >= max}
              className="w-full border p-3 rounded"
            />
            <p className="mt-1 text-xs text-gray-500">
              {value.length}/{max} tags
            </p>
          </div>
        );
      }}
    />
  );
}
