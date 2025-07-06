import { AlertCircle } from "lucide-react";

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center h-60 text-center px-4">
      <AlertCircle className="w-10 h-10 text-red-500 mb-2" />
      <p className="text-lg font-semibold text-red-600">An error occurred. Please try again later.</p>
    </div>
  );
};

export default Error;
