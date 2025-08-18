import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
      <Link
        href="/dashboard"
        className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-indigo-50 transition-colors duration-300"
      >
        Ir para o Dashboard
      </Link>
    </main>
  );
};

export default page;
