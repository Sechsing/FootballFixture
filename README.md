# WebScraper
A console application that scrapes a sports site - Football fixtures listing page and fixture page then returns a JSON array of all the games on the page

To run the code, the following dependencies are required:
node.js: JavaScript runtime that allows you to run JavaScript code outside the browser.
axios: To make HTTP requests to fetch the HTML content of the target website.
cheerio: To parse and manipulate the HTML content using jQuery-like syntax.
moment.js: To parse and format the date/time information from the match page.
typescript: TypeScript compiler for transpiling TypeScript code to JavaScript.
ts-node: A tool to run TypeScript files directly without needing a separate compilation step.

If you do not have Node.js installed, download and install it from Node.js official website.

Install the required packages by running the following command in the terminal:
npm install axios cheerio moment
This will add the necessary libraries to your node_modules folder and include them in your package.json file.

Make sure you also have the TypeScript definitions for these libraries. You can install the type definitions by running:
npm install --save-dev @types/axios @types/cheerio @types/moment

Running the Scraper:
Once all dependencies are installed, the scraper can be run by executing the following command in the terminal:
npx ts-node scraper.ts