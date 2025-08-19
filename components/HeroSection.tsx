import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-background to-muted/20"></div>

      {/* Background decorative images */}
      <div className="absolute top-10 right-10 opacity-20 hidden lg:block">
        <Image
          src="/diverse-students-collaboration.png"
          alt="Educational elements"
          width={200}
          height={200}
          className="animate-pulse"
        />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-[family-name:var(--font-playfair)] mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
              Join the Conversation
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Connect with students and educators worldwide. Share knowledge,
              ask questions, and engage in meaningful course discussions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center">
              <Button
                asChild
                size="lg"
                className="bg-accent hover:bg-accent/90 text-lg px-8 py-6 group"
              >
                <Link href="/courses/c1/forum">
                  Start Discussing
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/diverse-students-collaboration.png"
                alt="Students collaborating in discussion"
                width={600}
                height={500}
                className="w-full h-auto"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent"></div>
            </div>

            {/* Floating cards */}
            <div className="absolute -top-4 -right-4 bg-card border shadow-lg rounded-lg p-4 animate-float">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm font-bold">✓</span>
                </div>
                <span className="text-sm font-medium">Question Solved!</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-card border shadow-lg rounded-lg p-4 animate-float-delayed">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 text-sm font-bold">💡</span>
                </div>
                <span className="text-sm font-medium">New Insight Shared</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
