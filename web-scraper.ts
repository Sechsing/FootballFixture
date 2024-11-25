import axios from 'axios';
import * as cheerio from 'cheerio';
import moment from 'moment';

const scrapeWebsite = async (url: string) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results: { tournament: string, teamA: string, teamB: string, venue: string, datetime: string | null }[] = [];

        // Iterate over each <a> tag
        const links = $('a').get();
        for (const link of links) {
            const href = $(link).attr('href');
            if (href) {
                const fullUrl = href.startsWith('http') ? href : new URL(href, url).toString();
                
                // Fetch the match page for each link
                const { data: matchPageData } = await axios.get(fullUrl);
                const matchPage$ = cheerio.load(matchPageData);

                // Find the fixture text in the match page HTML
                const fixtureText = matchPage$('.sdc-site-match-header__detail-fixture').text().trim();

                // Extract match details from fixtureText
                if (fixtureText) {
                    const tournament = fixtureText.split('.').slice(-2).join('').trim();
                    const [teamA, teamB] = fixtureText.split(' vs ').map(team => team.split('.')[0].trim());
                    const venue = matchPage$('.sdc-site-match-header__detail-venue').text().trim();

                    // Extract and format datetime using moment.js
                    const datetimeString = matchPage$('.sdc-site-match-header__detail-time').attr('aria-label');
                    let isoDatetime: string | null = null;

                    if (datetimeString) {
                        // Try to parse the datetime using moment.js
                        const parsedDatetime = moment(datetimeString, "h:mma, dddd Do MMMM YYYY");
                        if (parsedDatetime.isValid()) {
                            isoDatetime = parsedDatetime.toISOString();
                        } else {
                            console.log("Failed to parse datetime:", datetimeString);
                        }
                    }

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
        }
        
        // Output the results as JSON
        const output = { results };
        // Pretty print the JSON with 2 spaces indentation
        console.log(JSON.stringify(output, null, 2)); 
        return output;

    } catch (error) {
        console.error('Error scraping website:', error);
    }
};

// Call the function with the target URL
const url = 'https://www.crossinghoods.com/software-engineer-test/';
scrapeWebsite(url);
