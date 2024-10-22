import { format } from 'date-fns';

async function getEvents() {
  const events = await fetch('http://otakunode.otaku-festival.com/event').then(
    (r) => r.json()
  );
  return events;
}

function getSitemap(events) {
  const staticUrl = ['about', 'contact', 'gallery'];
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${'https://otaku-festival.com'}</loc>
        <lastmod>${'2023-09-26'}</lastmod>
      </url>
      ${staticUrl
        .map(
          (item) => `<url>
            <loc>${'https://otaku-festival.com/' + item}</loc>
            <lastmod>${'2023-09-26'}</lastmod>
          </url>`
        )
        .join('')}
      
      ${events
        .map(
          (event) => `<url>
            <loc>${'https://otaku-festival.com/event/' + event._id}</loc>
            <lastmod>${format(
              new Date(event.updatedAt),
              'yyyy-MM-dd'
            )}</lastmod>
          </url>`
        )
        .join('')}
      </urlset>
    `;
}

export default function Sitemap() {
  return null;
}

export const getServerSideProps = async ({ res }) => {
  res.setHeader('Content-Type', 'text/xml');
  res.write(getSitemap(await getEvents()));
  res.end();
  return {
    props: {},
  };
};
