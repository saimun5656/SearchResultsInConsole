const { chromium } = require('playwright');

(async () => {
    // Launch a new browser instance
    const browser = await chromium.launch({ headless: false }); // Set to true for headless mode
    const page = await browser.newPage();

    // Navigate to Google
    await page.goto('https://www.google.com');

    // Wait for the search input to be visible
    const searchInput = await page.waitForSelector('input[name="q"]:not([type="hidden"])', { state: 'visible' });

    // Type your search query into the search box
    await searchInput.fill('Playwright JavaScript');

    // Press 'Enter' to perform the search
    await searchInput.press('Enter');

    // Wait for the search results to load
    await page.waitForSelector('#search');

    // Extract the search result titles and URLs
    const results = await page.evaluate(() => {
        const titles = Array.from(document.querySelectorAll('h3')).map(title => title.innerText);
        const urls = Array.from(document.querySelectorAll('div.yuRUbf > a')).map(link => link.href);
        return titles.map((title, index) => ({ title, url: urls[index] }));
    });

    // Log the results
    console.log(results);

    // Close the browser
    await browser.close();
})();
