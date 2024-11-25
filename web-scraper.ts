import axios from 'axios';
import * as cheerio from 'cheerio';

const scrapeWebsite = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results: { tournament: string, teamA: string, teamB: string, venue: string, datetime: string | null }[] = [];

        // Iterate over each <a> tag, but now properly handle asynchronous operations
        const links = $('a').get();
        for (const link of links) {
            const href = $(link).attr('href');
            if (href) {
                const fullUrl = href.startsWith('http') ? href : new URL(href, url).toString();
                
                // Fetch the match page for each link
                const { data: matchPageData } = await axios.get(fullUrl);
                const matchPage$ = cheerio.load(matchPageData);

                // Extract match details
                const fixtureText = matchPage$(link).find('.sdc-site-match-header__detail-fixture').text().trim();
                const tournament = fixtureText.split('.').slice(-1).join('').trim();
                const [teamA, teamB] = fixtureText.split(' vs ').map(team => team.split('.')[0].trim());
                const venue = matchPage$(link).find('.sdc-site-match-header__detail-venue').text().trim();
                const datetime = matchPage$(link).find('.sdc-site-match-header__detail-time').attr('aria-label')?.trim();
                const isoDatetime = datetime ? new Date(datetime).toISOString() : null;

                // Push the match details to the results array
                results.push({
                    tournament,
                    teamA,
                    teamB,
                    venue,
                    datetime: isoDatetime
                });
            }
        }

        // Output the results as JSON
        const output = { results };
        console.log(JSON.stringify(output, null, 2)); // Pretty-print the JSON with 2 spaces indentation
        return output;

    } catch (error) {
        console.error('Error scraping website:', error);
    }
};

// Call the function with the target URL
const url = 'https://www.crossinghoods.com/software-engineer-test/';
scrapeWebsite(url);
