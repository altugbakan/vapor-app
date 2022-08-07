import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (

    <div className="container">
      <Head>
        <title>Vapor</title>
        <meta name="description" content="Swap Ethereum assets" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="main">
        <div className="flex-row">
          <Image src="/favicon.ico" alt="Vapor Logo" height={60} width={60} />
          <h1 className="title" style={{ marginLeft: "5px" }}>
            Vapor
          </h1>
        </div>

        <p className="description">
          Create decentralized no-gas trade offers between tokens and NFTs!
        </p>

        <div className="grid">
          <Link href="/create">
            <a className="card">
              <h2>Create Offer &rarr;</h2>
              <p>Create an offer with no gas fee!</p>
            </a>
          </Link>

          <Link href="/view">
            <a className="card">
              <h2>View Offers &rarr;</h2>
              <p>View the public offers that anyone can accept.</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className="footer">
        <a
          href="https://ethglobal.com/events/metabolism/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Created for Metabolism - ETHGlobal
          <span className="logo">
            <Image src="/ethereum.png" alt="Ethereum Logo" width={16} height={24} />
          </span>
        </a>
      </footer>
    </div>
  );
}

export default Home;