import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">404 - Page Not Found</h1>
        <p className="text-slate-400 mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/">
          <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
}
