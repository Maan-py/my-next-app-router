import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center flex-col justify-center min-h-screen">
      <h1 className="text-9xl">404</h1>
      <h2 className="mb-5 text-xl">Page not found</h2>
      <Link href={"/"} className="bg-blue-700 text-white p-3">
        Back to Home
      </Link>
    </div>
  );
}
