import type { GetServerSidePropsContext } from "next";
import type { Session } from "next-auth";
import { getSession } from "next-auth/react";

export const requireAuthentication = async (
  context: GetServerSidePropsContext,
  cb: (session: Session) => void
) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return cb({ session });
};
