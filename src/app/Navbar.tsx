/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  // const router = useRouter();
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <div className="flex bg-gray-800 py-2 px-5 justify-between">
      <div className="flex">
        <h1 className="mr-6">Navbar</h1>
        <ul className="flex">
          <Link href="/">
            <li key="home" className={`mr-6 ${pathName === "/" ? "text-blue-500" : ""} cursor-pointer`}>
              Home
            </li>
          </Link>
          <Link href="/about">
            <li key="about" className={`mr-6 ${pathName === "/about" ? "text-blue-500" : ""} cursor-pointer`}>
              About
            </li>
          </Link>
          <Link href="/about/profile">
            <li key="profile" className={`mr-6 ${pathName === "/about/profile" ? "text-blue-500" : ""} cursor-pointer`}>
              Profile
            </li>
          </Link>
        </ul>
      </div>
      <div className="">
        {status === "authenticated" ? (
          <div className="flex">
            <h4 className="mr-4">{session.user.email}</h4>
            <button className="bg-white rounded-md h-7 px-3 text-black cursor-pointer" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        ) : (
          <button className="bg-white rounded-md h-7 px-3 text-black cursor-pointer" onClick={() => signIn()}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
