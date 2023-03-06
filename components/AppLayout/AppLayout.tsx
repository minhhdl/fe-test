import { PropsWithChildren } from "react";
import Head from "next/head";
import Header from "../Header/Header";

interface IAppLayoutProps extends PropsWithChildren {
  title: string;
}

export default function AppLayout({ title, children }: IAppLayoutProps) {
  return (
    <>
      <Head>
        <title>{title} - Supermomos Dev</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </>
  );
}
