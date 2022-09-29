import Layout from "../../components/Layout";
import { search } from "../api";

export default function News({ results }) {
  return (
    <Layout>
      <h1>Search</h1>
    </Layout>
  );
}

const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ";

export async function getServerSideProps({ params }) {
  const URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${params.query}&api-key=${API_KEY}`;
  const results = await search(URL);
  return {
    props: {
      results,
    },
  };
}
