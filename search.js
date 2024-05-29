const { chromium } = require('playwright');

(async () => {
  // Launch a new browser instance (non-headless for testing)
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Navigate to Google
    await page.goto('https://www.google.com');

    // Brief wait for page to settle
    await page.waitForTimeout(2000);

    // Use verified selector for search input
    const searchInput = await page.locator('textarea[name="q"]');

    // Type your search query and perform search
    await searchInput.fill('Playwright JavaScript');
    await searchInput.press('Enter');

    // Wait for results to appear before extraction
    await page.waitForSelector('div.g'); // Wait for a result container

    // Extract search result titles and URLs using evaluate
    const results = await page.evaluate(() => {

      // Improved selector for URLs:
      const urls = Array.from(document.querySelectorAll('div.g a[href]')).map(link => link.href);
      const titles = Array.from(document.querySelectorAll('h3.LC20lb')).map(title => title.innerText);

      // Combine titles and URLs efficiently (optional):
      return urls.map((url, index) => ({ title: titles[index], url }));
    });

    // Log the search results to the console
    console.log(results);
  }
  catch (error) {
    console.error("Error:", error);
  }
  finally {
    // Always close the browser
    await browser.close();
  }
})();
