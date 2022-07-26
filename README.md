![Loonify](public/apple-touch-icon.png)

# Loonify — Lost and Found of the Future

Loonify is a web application, that helps you find lost things, or their owners pretty quickly and easily. It has aesthetic interface, great functionalities and modern technologies.

## Getting Started

### Environment variables

Pull the environment variables from [Dotenv Vault](https://www.dotenv.org/) with the following command:

```bash
npx dotenv-vault pull development .env.local
```

By the way, you can view the `.env.example` [here](https://vault.dotenv.org/project/vlt_c1eda61c374a4396b8650043a8a002592ad8619551d1bbdaa405fa8eaff69ad5/example).

### Dependencies

```bash
yarn install
```

### Start the development server

```
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Commands

This project is built using [Blitz.js](https://blitzjs.com/) and it comes with a powerful CLI that is designed to make development easy and fast. You use it with the following command: `yarn blitz`.

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  help      display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## What's inside?

- The `app/` folder is a container for most of the project. This is where you’ll put any pages or API routes.

- `db/` is where database configuration goes. If you’re writing models or checking migrations, this is where to go.

- `public/` is a folder where you will put any static assets. If you have images, files, or videos which you want to use in your app, this is where to put them.

- `integrations/` is a folder to put all third-party integrations like with Stripe, Sentry, etc.

- `test/` is a folder where you can put test utilities and integration tests.

- `package.json` contains information about your dependencies and devDependencies. If you’re using a tool like `npm` or `yarn`, you won’t have to worry about this much.

- `tsconfig.json` is our recommended setup for TypeScript.

- `.babelrc.js`, `.env`, etc. ("dotfiles") are configuration files for various bits of JavaScript tooling.

- `blitz.config.js` is for advanced custom configuration of Blitz. It extends [`next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/introduction).

- `jest.config.js` contains config for Jest tests. You can [customize it if needed](https://jestjs.io/docs/en/configuration).

You can read more about it in the [File Structure](https://blitzjs.com/docs/file-structure) section of the documentation.
