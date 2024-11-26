import { scrapeWebsite } from './web-scraper';
import axios from 'axios';

// Jest mocks
jest.mock('axios');

describe('scrapeWebsite', () => {
  let mockAxiosGet: jest.Mock;

  beforeEach(() => {
    // Reset the mock before each test
    mockAxiosGet = axios.get as jest.Mock;
  });

  it('should scrape the website and extract match details (Test 1)', async () => {
    // Simulate the HTML data that axios will return for the main page and match page
    const mockPageData = `
      <a href="/match/123">Match Link</a>
    `;
    
    const mockMatchPageData = `
      <div class="sdc-site-match-header__detail-fixture">
        Team A vs Team B. Tournament XYZ.
      </div>
      <div class="sdc-site-match-header__detail-venue">Stadium Name</div>
      <div class="sdc-site-match-header__detail-time" aria-label="5:30pm, Monday 25th November 2024">3:00pm, Monday 25th November 2024.</div>
    `;

    // Mock axios to return the above HTML for the main page and match page
    mockAxiosGet.mockResolvedValueOnce({ data: mockPageData });
    mockAxiosGet.mockResolvedValueOnce({ data: mockMatchPageData });

    // Call the function that is being tested
    const result = await scrapeWebsite('https://www.example.com');

    if (result) {
        // Assertions for Test 1
        expect(result.results).toHaveLength(1);
        expect(result.results[0]).toEqual({
          tournament: 'Tournament XYZ',
          teamA: 'Team A',
          teamB: 'Team B',
          venue: 'Stadium Name',
          datetime: expect.any(String),
        });
      } else {
        console.log('No data returned');
      }
  });

  it('should scrape the website and extract match details (Test 2)', async () => {
    // Simulate the HTML data that axios will return for the main page and match page with different values
    const mockPageData = `
      <a href="/match/124">Match Link</a>
    `;
    
    const mockMatchPageData = `
      <div class="sdc-site-match-header__detail-fixture">
        Team X vs Team Y. International Cup.
      </div>
      <div class="sdc-site-match-header__detail-venue">Arena 123</div>
      <div class="sdc-site-match-header__detail-time" aria-label="7:00pm, Wednesday 27th November 2024">7:00pm, Wednesday 27th November 2024.</div>
    `;

    // Mock axios to return the above HTML for the main page and match page
    mockAxiosGet.mockResolvedValueOnce({ data: mockPageData });
    mockAxiosGet.mockResolvedValueOnce({ data: mockMatchPageData });

    // Call the function that is being tested
    const result = await scrapeWebsite('https://www.example.com');

    if (result) {
        // Assertions for Test 2
        expect(result.results).toHaveLength(1);
        expect(result.results[0]).toEqual({
          tournament: 'International Cup',
          teamA: 'Team X',
          teamB: 'Team Y',
          venue: 'Arena 123',
          datetime: expect.any(String),
        });
      } else {
        console.log('No data returned');
      }
  });

  it('should scrape the website and extract match details (Test 3)', async () => {
    // Simulate the HTML data that axios will return for the main page and match page with different values
    const mockPageData = `
      <a href="/match/125">Match Link</a>
    `;
    
    const mockMatchPageData = `
      <div class="sdc-site-match-header__detail-fixture">
        Team A vs Team C. Champions League.
      </div>
      <div class="sdc-site-match-header__detail-venue">Main Stadium</div>
      <div class="sdc-site-match-header__detail-time" aria-label="9:30pm, Friday 29th November 2024">9:30pm, Friday 29th November 2024.</div>
    `;

    // Mock axios to return the above HTML for the main page and match page
    mockAxiosGet.mockResolvedValueOnce({ data: mockPageData });
    mockAxiosGet.mockResolvedValueOnce({ data: mockMatchPageData });

    // Call the function that is being tested
    const result = await scrapeWebsite('https://www.example.com');

    if (result) {
        // Assertions for Test 3
        expect(result.results).toHaveLength(1);
        expect(result.results[0]).toEqual({
          tournament: 'Champions League',
          teamA: 'Team A',
          teamB: 'Team C',
          venue: 'Main Stadium',
          datetime: expect.any(String),
        });
      } else {
        console.log('No data returned');
      }
  });
});
