const { chromium } = require('playwright');

(async () => {
  // Launch a new browser instance (non-headless for testing)
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    // Navigate to Google
    await page.goto('https://www.google.com');

    
    await page.waitForTimeout(2000); // Brief wait for page to settle

    // Use verified selector for search input
    const searchInput = await page.locator('textarea[name="q"]');

    // Type your search query and perform search
    await searchInput.fill('Playwright JavaScript');
    await searchInput.press('Enter');

    
    await page.waitForTimeout(2000); // Brief wait for results to appear

    // Extract search result titles and URLs using evaluate
    const results = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('h3')).map(title => title.innerText);
      const urls = Array.from(document.querySelectorAll('div.yuRUbf > a')).map(link => link.href);
      return titles.map((title, index) => ({ title, url: urls[index] }));
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
