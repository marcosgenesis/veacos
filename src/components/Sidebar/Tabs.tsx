import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { useRouter } from "next/router";

const MobileTabs: React.FC = () => {
  const router = useRouter();  
  return (
    <Tabs.Root
      className="flex w-full flex-col gap-4"
      defaultValue={router.pathname}
    >
      <Tabs.List
        className="flex gap-2 rounded-xl border-2 border-gray-200 bg-gray-100 p-1"
        aria-label="Manage your account"
      >
        <Tabs.Trigger
          className="
            flex h-[45px] flex-1 
            cursor-default select-none 
            items-center justify-center 
            rounded-lg px-5 text-[15px]
            font-medium leading-none
          data-[state=active]:bg-gray-50
          data-[state=inactive]:bg-gray-100 
          data-[state=active]:text-gray-800 
          data-[state=inactive]:text-gray-600 
            data-[state=active]:shadow-md"
          value="/home"
          onClick={() => router.push("/home")}
        >
          Quem me deve
        </Tabs.Trigger>
        <Tabs.Trigger
          className="
          flex h-[45px] flex-1 
          cursor-default select-none 
          items-center justify-center 
          rounded-lg px-5 text-[15px]
          font-medium leading-none
          data-[state=active]:bg-gray-50
          data-[state=inactive]:bg-gray-100 
          data-[state=active]:text-gray-800 
          data-[state=inactive]:text-gray-600 
          data-[state=active]:shadow-md"
          value="/my-bills"
          onClick={() => router.push("/my-bills")}
        >
          Quem eu devo
        </Tabs.Trigger>
      </Tabs.List>
    </Tabs.Root>
  );
};

export default MobileTabs;
