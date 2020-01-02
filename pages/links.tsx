import { map } from "lodash";
import Layout from "components/Layout";
import Section from "components/layout/Section";

const LINKS = {
  News: {
    "Mundo Albiceleste": "https://mundoalbiceleste.com",
    "Golazo Argentino": "https://golazoargentino.com"
  },
  Podcasts: {
    "Hand of Pod": "https://handofpod.wordpress.com",
    "Golazo Argentino": "https://player.fm/series/golazo"
  },
  "Visiting Buenos Aires": {
    "Buenos Aires Travel Guide":
      "https://www.gringoinbuenosaires.com/buenos-aires-travel-guide/",
    "LandingPadBA - your alternative guide to Buenos Aires":
      "https://landingpadba.com",
    "Entre Tiempos - football history bookstore":
      "https://www.facebook.com/entretiemposfutbol/"
  },
  Twitter: {
    "Albicelestes list":
      "https://twitter.com/sobstel/lists/albicelestes/members"
  },
  Sources: {
    "11v11": "https://www.11v11.com",
    Soccerway: "https://int.soccerway.com"
  },
  Books: [
    "Angels With Dirty Faces: The Footballing History of Argentina (Jonathan Wilson)",
    "test"
  ]
};

const LinksPage = () => (
  <Layout title="Links">
    {map(LINKS, (links, title) => (
      <Section title={title} key={title}>
        <ul className="list-disc pl-6">
          {map(links, (link, text) => (
            <>
              <li key={link}>
                {text ? (
                  <a
                    href={link}
                    target="_blank"
                    className="text-blue-600 hover:text-black"
                    rel="noopener"
                  >
                    {text}
                  </a>
                ) : (
                  link
                )}
              </li>
            </>
          ))}
        </ul>
      </Section>
    ))}
  </Layout>
);

LinksPage.getInitialProps = ({ res }: any) => {
  if (res) {
    res.setHeader(
      "Cache-Control",
      "s-maxage=86400, max-age=3600, stale-while-revalidate"
    );
  }

  return {};
};

export default LinksPage;
