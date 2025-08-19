"use client";
import { BookText, Home, MessagesSquareIcon, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav({ courseId }: { courseId: string }) {
  const pathname = usePathname();
  const active = (href: string) =>
    pathname?.startsWith(href) ? "text-black font-semibold" : "text-gray-600";

  return (
    <nav
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 shadow-sm safe-bottom"
      aria-label="Bottom navigation"
    >
      <div className="mx-auto max-w-7xl">
        <ul className="grid grid-cols-4 text-sm">
          <li>
            <Link
              href={`/`}
              className={`flex items-center justify-center gap-2 py-3 ${active(
                `/courses/${courseId}/forum`
              )}`}
            >
              <span>
                <Home className="text-purple-600" />
              </span>
              <span className="sr-only sm:not-sr-only">Home</span>
            </Link>
          </li>

          <li>
            <Link
              href={`/courses/${courseId}/forum/new`}
              className="flex items-center justify-center gap-2 py-3"
            >
              <Plus className="text-purple-500" />
            </Link>
          </li>

          <li>
            <Link
              href="#top"
              className="flex items-center justify-center gap-2 py-3 text-gray-600"
            >
              <BookText className="text-purple-600" />
            </Link>
          </li>
          <li>
            <Link
              href="#top"
              className="flex items-center justify-center gap-2 py-3 text-gray-600"
            >
              <MessagesSquareIcon className="text-purple-600" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
