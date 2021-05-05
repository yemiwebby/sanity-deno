import { Application, Router } from 'https://deno.land/x/oak@v7.3.0/mod.ts';
import {
  React,
  ReactDOMServer,
  StaticRouter,
} from "../dep.ts";
import App from "../components/App.tsx";

const app = new Application();
const port: number = 8000;

const jsBundlePath = "/main.js";

const { diagnostics, files } = await Deno.emit("./ssr/client.tsx", {
  bundle: "esm",
  compilerOptions: { lib: ["dom", "dom.iterable", "esnext"] },
});

console.log(diagnostics);

const router = new Router();
router
  .get("/", (context) => {
    const app = ReactDOMServer.renderToString(
      <StaticRouter location={context.request.url} context={context}>
        <App />
      </StaticRouter>
    );
    context.response.type = "text/html";
    context.response.body = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss/dist/tailwind.min.css" rel="stylesheet">
    <title>Sanity <-> Deno</title>
    <script type="module" src="${jsBundlePath}"></script>
</head>
<body>
    <div id="root">${app}
    </div>
</body>
</html>`;
  })
  .get(jsBundlePath, (context) => {
    context.response.type = "application/javascript";
    context.response.body = files["deno:///bundle.js"];
  });

app.addEventListener("error", (event) => {
  console.error(event.error);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen({ port });
console.log(`Server is running on port ${port}`);