import * as HoverCard from "@radix-ui/react-hover-card";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { RiLogoutBoxRLine, RiUserLine } from "react-icons/ri";
import Button from "../Button";

export const Profile = () => {
  const { data: sessionData } = useSession();
  return (
    <HoverCard.Root>
      <HoverCard.Trigger asChild>
        <div className="flex items-center gap-2">
          {sessionData?.user && sessionData?.user.image ? (
            <Image
              src={sessionData.user.image}
              width={50}
              height={50}
              alt="User Profile"
              className="rounded-full"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
              <RiUserLine size={24} className="fill-gray-400" />
            </div>
          )}
          <div>
            <p className="font-medium">{sessionData?.user?.name}</p>
            <p className="text-xs text-gray-400">{sessionData?.user?.email}</p>
          </div>
        </div>
      </HoverCard.Trigger>
      <HoverCard.Portal>
        <HoverCard.Content
          side="top"
          align="start"
          className="w-[300px] rounded-md bg-white p-5 shadow-lg data-[side=right]:animate-slideUpAndFade data-[side=right]:animate-slideLeftAndFade data-[side=right]:animate-slideRightAndFade data-[side=top]:animate-slideDownAndFade data-[state=open]:transition-all"
          sideOffset={5}
        >
          <div className=" flex flex-col gap-8">
            <div className="flex flex-col items-center gap-2">
              {sessionData?.user && sessionData?.user.image ? (
                <Image
                  src={sessionData.user.image}
                  width={50}
                  height={50}
                  alt="User Profile"
                  className="rounded-full"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
                  <RiUserLine size={24} className="fill-gray-400" />
                </div>
              )}
              <div className="text-center">
                <p className="font-medium">{sessionData?.user?.name}</p>
                <p className="text-xs text-gray-400">
                  {sessionData?.user?.email}
                </p>
              </div>
            </div>
            <Button
              variant="destructive"
              isFullWidth
              icon={RiLogoutBoxRLine}
              onClick={() => signOut({ callbackUrl: process.env.NEXTAUTH_URL })}
            >
              Sair
            </Button>
          </div>
        </HoverCard.Content>
      </HoverCard.Portal>
    </HoverCard.Root>
  );
};
