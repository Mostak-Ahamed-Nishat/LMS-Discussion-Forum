"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Course } from "@/lib/types";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="max-w-sm border border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-2xl">{course.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-700 dark:text-gray-400">
          {course.description}
        </CardDescription>
      </CardContent>
      <CardFooter>
        <Link
          href={`/courses/${course.id}/forum`}
          className={
            buttonVariants({ size: "sm" }) +
            " inline-flex items-center px-3 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
          }
        >
          Course Discussion
          <ArrowRight size={15} className="ml-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}
