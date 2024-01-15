# Victorious Audio Website

Young website for @[peakza](https://github.com/PeaksZA)'s website - selling custom in-ear monitors (IEM's)

Built with SvelteKit using Typescript. 
I used Superforms with Zod for form validation (so lovely!).
I used Tailwind for styling + DaisyUI to build nice components quickly. 
For emails, React Email makes a guest appearance - since all you need is the render
function to run server-side to spit out some tasty email-friendly HTML :)

Was a fun one to build! 

## Features

- Cart
- Checkout
- Nicely formatted emails for order notifications to admin and customer
- Admin route to view, approve orders and send invoices
- View transitions (because it was very easy and fun)

## Developing

A local Postgres db (you can cd into this project and run `docker compose -f docker-compose.dev.yml up` to get one if you need! - provided you have Docker installed)

See `.env.example`

```bash
pnpm i

pnpm run dev

# or start the server and open the app in a new browser tab
pnpm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
