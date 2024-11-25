import axios from 'axios';
import * as cheerio from 'cheerio';

const scrapWebsite = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('title').text();
        console.log('Page Title:', title);

        $('a').each((index, element) => {
            const href = $(element).attr('href');
            if (href) {
              console.log(`Link ${index + 1}: ${href}`);
            }
          });
      
        } catch (error) {
          console.error('Error scraping website:', error);
    }
};

const url = 'https://www.crossinghoods.com/software-engineer-test/)';
scrapWebsite(url);
