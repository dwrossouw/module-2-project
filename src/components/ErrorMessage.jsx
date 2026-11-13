import { AlertTriangle } from "lucide-react";

function ErrorMessage({ message = "Something went wrong. Please try again." }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 max-w-lg mx-auto text-center">
      <AlertTriangle
        size={36}
        className="mx-auto mb-3 text-[#E38B70]"
      />

      <h2 className="text-xl font-semibold text-[#1D3151] mb-2">
        Oops! Something went wrong.
      </h2>

      <p className="text-gray-600">{message}</p>
    </div>
  );
}

export default ErrorMessage;