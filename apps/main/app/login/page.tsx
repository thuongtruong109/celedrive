"use client";

import { LINK_SERVICE } from "@/shared";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchParamsComponent />
    </Suspense>
  );
}

function SearchParamsComponent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || LINK_SERVICE.DRIVE_DASHBOARD;
  return (
      <section className="full flex justify-center items-center">
          <div className="mx-auto md:w-8/12 lg:w-5/12 bg-white px-8 py-10">
            <button
                className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center mb-3"
                style={{ backgroundColor: "#3b5998" }}
                onClick={() => signIn("google", { callbackUrl })}
                type="button"
              >
                <img
                  className="pr-2"
                  src="/images/google.svg"
                  alt=""
                  style={{ height: "2rem" }}
                />
                <span>Continue with Google</span>
              </button>
              <button
                className="px-7 py-2 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full flex justify-center items-center"
                style={{ backgroundColor: "#55acee" }}
                onClick={() => signIn("github", { callbackUrl })}
                type="button"
              >
                <img
                  className="pr-2"
                  src="/images/github.svg"
                  alt=""
                  style={{ height: "2.2rem" }}
                />
                <span>Continue with GitHub</span>
              </button>
          </div>
      </section>
  );
}
