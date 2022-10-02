import Layout from "../../components/Layout";

export default function News({ results }) {
  return (
    <Layout>
      <h1>Top Stories</h1>
      <ul>
        {results.map((result) => {
          return (
            <li key={result.url}>
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </li>
          );
        })}
      </ul>
    </Layout>
  );
}

const API_KEY = "9hUvOqGGdnCBvGKg4EB3L7mGdBC8hKKJ";

export async function getStaticProps() {
  const URL = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${API_KEY}`;
  const response = await fetch(URL);
  const data = await response.json();
  return {
    props: {
      results: data.results,
    },
  };
}
