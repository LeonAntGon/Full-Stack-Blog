import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        {/* Metadatos específicos para la página de inicio */}
        <title>Gimblog frontend</title>
        <meta name="description" content="Bienvenido a mi blog personal donde comparto mis experiencias y conocimientos" />
        <meta property="og:title" content="Inicio - Mi Blog Personal" />
        <meta property="og:description" content="Bienvenido a mi blog personal donde comparto mis experiencias y conocimientos" />
      </Head>
    
    </>
  );
}
