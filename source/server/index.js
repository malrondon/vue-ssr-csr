const fs = require("fs");
const path = require("path");
const compression = require("compression");
const express = require("express");
const app = express();

const favicon = require('serve-favicon');

const resolve = (file) => path.resolve(__dirname, file);

const config = require("../../config");
const isProduction = config.isProduction;

const template = fs.readFileSync(resolve("../shared/index.template.html"), "utf-8");

const createRenderer = (bundle, options) => {
	// https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md#why-use-bundlerenderer
	return require("vue-server-renderer").createBundleRenderer(bundle, Object.assign(options, {
		template,
		cache: require("lru-cache")({
			max: 1000,
			maxAge: 1000 * 60 * 15
		}),
		basedir: resolve("../../dist"),
		runInNewContext: false
	}))
}

const serve = (path, cache) => express.static(resolve(path), {
	maxAge: cache && isProduction ? 60 * 60 * 24 * 30 : 0
})

let renderer
let readyPromise
if (isProduction) {
	const bundle = require("../../dist/vue-ssr-server-bundle.json");
	const clientManifest = require("../../dist/vue-ssr-client-manifest.json");
	renderer = createRenderer(bundle, {
		clientManifest
	})
	readyPromise = Promise.resolve()
} else {
	readyPromise = require("../../internals/webpack/setup-dev-server")(app, (bundle, options) => {
		renderer = createRenderer(bundle, options);
	})
}

const render = (req, res, context) => {
	const s = Date.now()

	console.log(`Rendering: ${req.url}`)

	res.setHeader("Content-Type", "text/html")

	const errorHandler = (err) => {
		// TODO: Render Error Page
		console.error(`Fatal error when rendering : ${req.url}`)
		console.error(err)

		res.status(500)
		res.end(`500 | Fatal error: ${err}`)

		console.log(`Whole request: ${Date.now() - s}ms`)
	}

	renderer.renderToString(context, (err, html) => {
		if (err) return errorHandler(err)

		res.status(context.meta.httpStatusCode || 200)
		res.end(html)

		console.log(`Whole request: ${Date.now() - s}ms`)
	})
}

app.use(compression({ threshold: 0 }))
app.use(favicon('../../static/favicon.png'))

app.use("/dist", serve("../../dist", true))
app.use("/static", serve("../../static", true))
app.use("/service-worker.js", serve("../../dist/service-worker.js"))

app.get("*", (req, res) => {
	const context = {
		url: req.url
	}

	isProduction ?
		render(req, res, context) :
		readyPromise.then(() => render(req, res, context))
})

const port = config.server.port
let server = app.listen(port, () => {
	console.log(`Server started at localhost:${port}`)
})

module.exports = {
	ready: readyPromise,
	close: () => {
		server.close()
	}
}
