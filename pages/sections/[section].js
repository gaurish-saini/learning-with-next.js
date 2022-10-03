import Head from "next/head";
import Layout from "../../components/Layout";
import { handler } from "../api";

export default function News({ results, title }) {
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
          {results?.map((result) => (
            <li key={result.url}>
              <a href={result.url} rel="noreferrer nofollower" target="_blank">
                {result.title}
              </a>
            </li>
          ))}
        </ul>
      </main>
    </Layout>
  );
}
const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ";

export async function getStaticPaths() {
  const results = await handler(
    `https://api.nytimes.com/svc/news/v3/content/section-list.json?api-key=${API_KEY}`
  );
  return {
    paths: results.map((result) => {
      return { params: { section: result.section } };
    }),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const results = await handler(
    `https://api.nytimes.com/svc/news/v3/content/nyt/${params.section}.json?api-key=${API_KEY}`
  );
  return {
    props: {
      results,
      title: params.section,
    },
  };
}
