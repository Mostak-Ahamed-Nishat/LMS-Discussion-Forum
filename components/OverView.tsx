import React from "react";
import { BookOpen, MessageSquare, Users } from "lucide-react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";

function OverView() {
  return (
    <div className="py-10 container mx-auto px-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
        <Card className="border-border bg-blue-50">
          <CardHeader>
            <MessageSquare className="h-8 w-8  mb-2 text-blue-500" />
            <CardTitle className="font-heading">Active Discussions</CardTitle>
            <CardDescription>
              Participate in ongoing conversations and share your insights
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-border bg-green-50">
          <CardHeader>
            <Users className="h-8 w-8 text-green-600 mb-2" />
            <CardTitle className="font-heading">Peer Learning</CardTitle>
            <CardDescription>
              Learn from your classmates and help others succeed
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-border bg-purple-50">
          <CardHeader>
            <BookOpen className="h-8 w-8 text-accent mb-2" />
            <CardTitle className="font-heading">Course Resources</CardTitle>
            <CardDescription>
              Access course-specific discussions and materials
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default OverView;
