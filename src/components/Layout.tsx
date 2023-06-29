import Head from "next/head";
import React from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="flex items-center justify-center">
      <Head>
        <title>Veacos</title>
      </Head>
      <div className="flex min-h-screen w-full flex-col md:my-8 md:w-9/12 md:flex-row lg:w-8/12">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
