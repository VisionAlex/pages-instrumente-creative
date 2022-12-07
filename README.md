# Welcome to Instrumente Creative Frontend Repo!

<img src="https://imagedelivery.net/_Qvu0ID0pPyVjDxZnl16ng/e1e83cec-f941-4f10-6eaa-192b7e88c700/small"/>

You can preview the web app at: https://instrumente-creative.pages.dev
## Development

In order to run the development you need to have the required env variables in a file .dev.vars.

Before starting the project you need to generate the sdk and types from the graphql schema

```sh
# Generate sdk and types
npm run codegen
```
Then you can run the development server.

```sh
npm run dev
```

Open up [http://127.0.0.1:8788](http://127.0.0.1:8788) and you should be ready to go!

## Deployment

Pushing to main branch would trigger a deploy to cloudflare pages.
Pushing to develop would trigger a deploy to a preview page.
