import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="text-center space-y-6 px-4">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900">Welcome to Interview Ready</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">Your AI-powered mock interview platform with instant feedback</p>
        <Button className="px-8 py-3 text-lg" asChild>
          <Link href="/sign-in">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}
