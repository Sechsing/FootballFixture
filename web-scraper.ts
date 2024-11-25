import axios from 'axios';
import * as cheerio from 'cheerio';

const scrapWebsite = async (url: 'https://www.crossinghoods.com/software-engineer-test/)') => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const title = $('title').text();
        console.log('Page Title:', title);
    }
}