const { chromium } = require('playwright');
const readline = require('readline');

// Function to get user input from the console
function getUserInput(query) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise(resolve => rl.question(query, answer => {
    rl.close();
    resolve(answer);
  }));
}

(async () => {
  let browser;

  try {
    // Get the search query from the user
    const searchQuery = await getUserInput('Please enter your search query: ');

    // Notify the user that the search is being performed
    console.log('Searching for results...');

    // Launch a new browser instance (headless by default)
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Navigate to Google
    await page.goto('https://www.google.com');

    // Brief wait for the page to settle
    await page.waitForTimeout(2000);

    // Use a verified selector for the search input
    const searchInput = await page.locator('textarea[name="q"]');

    // Type the user's search query and perform the search
    await searchInput.fill(searchQuery);
    await searchInput.press('Enter');

    // Wait for results to appear before extraction
    await page.waitForSelector('div.g'); // Wait for a result container

    // Extract search result titles and URLs using evaluate

    const results = await page.evaluate(() => {

      // Improved selector for URLs:
      const urls = Array.from(document.querySelectorAll('div.g a[href]')).map(link => link.href);
      const titles = Array.from(document.querySelectorAll('h3.LC20lb')).map(title => title.innerText);
      return urls.map((url, index) => ({ title: titles[index], url }));
    });

    // Log the search results to the console
    console.log(results);
  }
  catch (error) {
    console.error("Error:", error);
  }
  finally {

    if (browser) {
      await browser.close();
    }
  }
})();
