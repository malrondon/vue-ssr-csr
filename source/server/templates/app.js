import { gtmHead, gtmBody } from './vendors/gtm';
import newrelic from './vendors/newrelic';

const applicationVersion = process.env.npm_package_version;

// Não pode haver nenhum caractere antes do <!DOCTYPE html>, nem mesmo espaço em branco.
// Caso contrário a renderização no browser entra em QuirksMode e ficado bugado.

export default ({ html }) => {
  return `<!DOCTYPE html>
  <html>
    <head>
      <meta content="IE=edge" http-equiv=X-UA-Compatible>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
      <meta name="version" content="${applicationVersion}" />
      ${newrelic()}
      <script type="application/ld+json">
        {
          "@context": "https://schema.org",
          "@type": "Organization",
          "url": "https://webapp.com.br",
          "logo": "https://webapp.com.br/icon-512x512.png"
        }
      </script>
      <link rel="manifest" href="/manifest.json">
      <link rel="shortcut icon" type="image/x-icon" href="/favicon.ico">
      <link href="/main.min.css" rel="stylesheet">
      ${gtmHead()}
    </head>
    <body>
        ${gtmBody()}
        <div id="main">${html}</div>
        <script type="text/javascript" src="/main.min.js"></script>
    </body>
  </html>
`;
};
