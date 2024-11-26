# WebScraper: Football Fixtures Scraper

This is a console application that scrapes a sports site for football fixture data. It fetches the fixture listing page and individual fixture pages, then returns a JSON array of all the games on the page.

## Prerequisites

Before running the scraper, ensure that you have the following installed on your system:

- **Node.js**: A JavaScript runtime that allows you to run JavaScript code outside the browser.  
- **npm**: Node package manager (comes with Node.js) is required to install the dependencies.

## Dependencies

The scraper requires the following Node.js packages:

- `axios`: To make HTTP requests and fetch the HTML content of the target website.
- `cheerio`: To parse and manipulate the HTML content using jQuery-like syntax.
- `moment.js`: To parse and format date/time information from the match pages.
- `typescript`: A TypeScript compiler for transpiling TypeScript code to JavaScript.
- `ts-node`: A tool to run TypeScript files directly without needing a separate compilation step.

In the terminal, run the following command to install the required packages:
npm install axios cheerio moment

Make sure you also have the TypeScript definitions for these libraries. You can install the type definitions by running:
npm install --save-dev @types/axios @types/cheerio @types/moment

## Running the Scraper
Once all dependencies are installed, the scraper can be run by executing the following command in the terminal:
npx ts-node scraper.ts