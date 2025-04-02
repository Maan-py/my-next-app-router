"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

const LoginPage = () => {
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const form = e.currentTarget as HTMLFormElement;
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email.value,
        password: form.password.value,
        callbackUrl,
      });

      if (!res?.error) {
        setIsLoading(false);
        form.reset();
        push(callbackUrl);
      } else {
        if (res.status === 401) {
          setIsLoading(false);
          setErrorMessage("Email atau password salah");
          console.log(res.error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold text-white-900">Sign in to your account</h2>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white-900">
              Email address
            </label>
            <div className="mt-2">
              <input type="email" name="email" id="email" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black placeholder:text-white-400 focus:outline-indigo-600" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-white-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input type="password" name="password" id="password" required className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-black placeholder:text-gray-400 focus:outline-indigo-600" />
            </div>
          </div>

          <div>
            <button disabled={isLoading} type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500">
              {isLoading ? "Loading..." : "Sign in"}
            </button>
          </div>
          <hr />
          <button type="button" onClick={() => signIn("google", { callbackUrl, redirect: false })} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-indigo-500">
            Login With Google
          </button>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not registered?
          <Link href="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

const SuspendedLoginPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPage />
    </Suspense>
  );
};

export default SuspendedLoginPage;
