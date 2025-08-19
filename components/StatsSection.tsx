import { Users, MessageCircle, BookOpen } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Students",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: MessageCircle,
      value: "1M+",
      label: "Discussions",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: BookOpen,
      value: "500+",
      label: "Course Topics",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div
                className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow`}
              >
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <h3 className="text-3xl font-bold font-[family-name:var(--font-playfair)] mb-2">
                {stat.value}
              </h3>
              <p className="text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
