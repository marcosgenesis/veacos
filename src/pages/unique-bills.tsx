import React from "react";
import Sidebar from "../components/Sidebar";

const UniqueBills: React.FC = () => {
  return (
    <main className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full">
        <div className="flex justify-between bg-white p-6 shadow-sm">
          <div className="flex flex-col">
            <p className="text-xl font-medium">Vendas Únicas</p>
            <p className="text-sm text-gray-400">
              Utilize essa funcionalidade pra caso uma pessoa compre
              recorrentemente algo a você
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UniqueBills;
