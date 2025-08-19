"use client";
import { CalendarDays, MapPin, Video, Users } from "lucide-react";

type Meetup = {
  id: string | number;
  title: string;
  date: string; // e.g. "Nov 25"
  location: string; // e.g. "Dhaka, BD" or "Online"
  type: "Online" | "In‑person" | "Workshop" | string;
};

export function MeetupsList({ items }: { items: Meetup[] }) {
  const typeIcon = (t: string) => {
    if (t.toLowerCase().includes("online"))
      return <Video className="h-5 w-5 text-blue-500" />;
    if (t.toLowerCase().includes("workshop"))
      return <Users className="h-5 w-5 text-purple-500" />;
    return <CalendarDays className="h-5 w-5 text-emerald-600" />;
  };

  return (
    <div className="bg-green-50 rounded-xl shadow p-4">
      <h2 className="font-semibold text-gray-900 mb-3">Upcoming Meetups</h2>
      <ul className="space-y-2">
        {items.map((m) => (
          <li
            key={m.id}
            className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 transition cursor-pointer"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-gray-100">
              {typeIcon(m.type)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <div className="font-medium text-gray-900 truncate">
                  {m.title}
                </div>
                <span className="ml-1 text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                  {m.date}
                </span>
              </div>
              <div className="mt-0.5 text-sm text-gray-500 flex items-center gap-2">
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {m.location}
                </span>
                <span>•</span>
                <span>{m.type}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
