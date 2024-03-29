import { GetServerSideProps, type NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { RiGoogleFill } from "react-icons/ri";
import Button from "../components/Button";
import { getServerAuthSession } from "../server/auth";
import { authOptions } from "./api/auth/[...nextauth]";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bem vindo | Veacos</title>
      </Head>
      <main className="flex h-screen items-center justify-center bg-gray-100 dark:bg-gray-800">
        <div className="flex flex-col gap-4 rounded-md bg-white dark:bg-gray-900 p-8 text-center">
          <div>
            <h3 className="text-3xl font-medium">Bem vindo a Veacos</h3>
            <p className="text-gray-400">
              Gerencie quem te deve e a quem você deve
            </p>
          </div>
          <Button icon={RiGoogleFill} onClick={() => signIn("google")} isFullWidth variant="solid">
            Entrar
          </Button>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);
  if (session) {
    return {
      redirect: { destination: "/home", permanent: false },
      props: { session },
    };
  }
  return { props: {} };
};
export default Home;
