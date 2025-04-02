import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || "http//:localhost:3000"),
  title: "Next App Router",
  description: "Generated by create next app",
  authors: [{ name: "Next.js Team", url: "http//:localhost:3000" }],
};

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>Hello World!</h1>
      </main>
    </div>
  );
}
