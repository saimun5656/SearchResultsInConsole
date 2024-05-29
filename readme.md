# Playwright Search Script

This script uses Playwright to search for a query on Google and display the results in the console.

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Installation

1. **Clone the Repository**

   Clone this repository to your local machine using the following command:

   ```sh
   git clone https://github.com/saimun5656/SearchResultsInConsole.git
   ```

   Replace `yourusername` with your GitHub username.

2. **Navigate to the Project Directory**

   Change to the project directory:

   ```sh
   cd playwright-search
   ```

3. **Install Dependencies**

   Install the required Node.js packages using npm:

   ```sh
   npm install
   ```

## Usage

1. **Run the Script**

   Execute the script using Node.js:

   ```sh
   node search.js
   ```

   The script will launch a browser, perform a search on Google, and log the search results (titles and URLs) to the console.

## Configuration

- **Change the Search Query**

   Modify the search query in the `search.js` script by changing the string `'Playwright JavaScript'` to your desired search term.

   ```javascript
    await searchInput.fill('Playwright JavaScript');
   ```

## Notes

- Ensure that you have a stable internet connection, as the script needs to access Google's website.
- This script uses Chromium by default. If you want to use a different browser (like Firefox or WebKit), you can modify the `chromium` import to `firefox` or `webkit` respectively and adjust the launch command accordingly.

## Troubleshooting

- **Error: `chromium.launch` failed:** Ensure that Playwright's browser binaries are properly installed. You can force re-installation using:

  ```sh
  npx playwright install
  ```

- **Timeouts or Navigation Failures:** Check your internet connection and ensure that Google is accessible from your location.

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Node.js Documentation](https://nodejs.org/en/docs/)
