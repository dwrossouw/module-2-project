import { House } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main className="flex justify-center px-4 py-12">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg text-center">
        <h1 className="text-6xl font-bold text-[#EAC77B] mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-[#1D3151] mb-3">
          The page is missing from the vault.
        </h2>
        <p className="text-gray-600 text-base">
          The page you are looking for could not be found.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 mt-6 bg-[#1D3151] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#247F80] transition-colors"
        >
          <House size={18} />
          Back to Home
        </Link>
      </div>
    </main>
  );
}

export default NotFoundPage;
