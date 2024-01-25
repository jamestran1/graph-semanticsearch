'use client'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [locale, setLocale] = useState("en");

  useEffect(() => {
    const firstPath = window.location.pathname.split("/")[1];
    if (firstPath !== "en" && firstPath !== "de") {
      setLocale("en");
    }
    if (firstPath === "en" || firstPath === "de") {
      setLocale(firstPath);
    }
  }, [])

  const switchLanguageHanlder = (e: any) => {
    const paths = window.location.pathname.split("/");
    const newPath = [e.target.value, ...paths.slice(2, paths.length)].join("/");
    router.push("/" + newPath);
  };
  return (
    <html lang="en">
      <body className={classNames(inter.className, "bg-white")}>
        <div className="mx-auto w-20">
          <select
            id="language"
            name="language"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            value={locale}
            onChange={(e) => switchLanguageHanlder(e)}
          >
            <option value="en">🏴󠁧󠁢󠁥󠁮󠁧󠁿</option>
            <option value="de">🇩🇪</option>
          </select>
        </div>
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );
}
