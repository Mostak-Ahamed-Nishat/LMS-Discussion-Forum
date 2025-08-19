"use client";

import { Course } from "@/lib/types";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({ course }: CourseCardProps) {
  console.log(course);
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {course.title}
      </h5>
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
        {course.description}
      </p>
      <Link
        href={`/courses/${course.id}/forum`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-accent rounded-lg hover:bg-accent/90 focus:ring-4 focus:outline-none focus:ring-accent/50"
      >
        Course Discussion
        <ArrowRight size={15} className="mt-1 ml-1" />
      </Link>
    </div>
  );
}
