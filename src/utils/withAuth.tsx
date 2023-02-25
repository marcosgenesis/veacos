import type { GetServerSidePropsContext } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export const requireAuthentication = async (
  context: GetServerSidePropsContext,
  cb: (session: Session) => void
) => {
  
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

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
