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
      <div className="w-full">
        <Sidebar />
        <div className="w-full">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
