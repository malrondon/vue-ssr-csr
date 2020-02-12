export default () => `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>404 | WebApp</title>
    </head>
    <body>
        <div id="content">
            <div class="container">
                <div class="row">
                <div class="col-xs-12 col-md-6">
                    <div class="error-page error-feedback">
                    <h1>Ops!  :(</h1>
                    <p>página não encontrada</p>
                    </div>
                </div>
                <div class="col-xs-12 col-md-6 text-center">
                    <div class="error-page error-message">
                    <h3>O que pode ter acontecido?</h3>
                    <ul>
                        <li>O conteúdo não está mais no ar.</li>
                        <li>A página mudou de lugar.</li>
                        <li>O servidor está fora do ar.</li>
                        <li>Você digitou o endereço errado.</li>
                    </ul>
                    </div>
                </div>
                </div>
            </div>
        </div>
    </body>
    </html>
`;
