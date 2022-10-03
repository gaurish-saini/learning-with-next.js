import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { handler } from "../api";

export default function Sections({ results, title }) {
  return (
    <Layout>
      <Head>
        <title>{title}</title>
        <meta name="description" content={title} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>{title}</h1>
        <ul>
          {results?.map((result) => {
            return (
              <>
                - <Link href={`sections/${result.section}`} key={result.section}>
                  <a>{result.display_name}</a>
                </Link>
                <br />
              </>
            );
          })}
        </ul>
      </main>
    </Layout>
  );
}

const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ";
export async function getStaticProps({ params }) {
  return {
    props: {
      results: await handler(
        `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`
      ),
      title: "Sections",
    },
  };
}
