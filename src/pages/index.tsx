import { GetServerSideProps, type NextPage } from "next";
import { getSession, signIn } from "next-auth/react";
import Head from "next/head";
import { RiGoogleFill } from "react-icons/ri";
import Button from "../components/Button";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Bem vindo | Veacos</title>
      </Head>
      <main className="flex h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col gap-4 rounded-md bg-white p-8 text-center">
          <div>
            <h3 className="text-3xl font-medium">Bem vindo a Veacos</h3>
            <p className="text-gray-400">
              Gerencie quem te deve e a quem você deve
            </p>
          </div>
          <Button icon={RiGoogleFill} onClick={signIn("google")}>
            Entrar
          </Button>
        </div>
      </main>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session) {
    return { redirect: { destination: "/home", permanent: false } };
  }
  return { props: {} };
};
export default Home;
