# Today's Moon

This is a simple web-app that shows the current phase of the moon.

## Description

Built starting from the [Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## API used

The moon data for this app was sourced from [The Moon Phase API from RapidAPI's
library.](https://rapidapi.com/MoonAPIcom/api/moon-phase)

## Live Deployment

The latest main branch of this application is deployed by [Railway](https://railway.app) to [https://moon-info-production.up.railway.app/](https://moon-info-production.up.railway.app/).

## Installation

```bash
npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Tailwind CSS

This project uses [Tailwind CSS](https://tailwindcss.com/) for styling. To
instruct tailwind to watch files for class changes during development, run the following command:

```bash
npm run start:dev:css
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Favicons

Favicons were generated using [Favicon.io](https://favicon.io/).

## PWA

This app is a fully developed
[PWA](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps). It was
developed following the documentation on
[pwabuilder](https://docs.pwabuilder.com/#/) (founded by Microsoft).
