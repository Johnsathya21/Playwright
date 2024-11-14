// pages/BasePage.js
class BasePage {
    constructor(page) {
        this.page = page;
    }

    async goTo(url) {
        await this.page.goto(url);
    }

    // Click on an element
     async click(selector) {
    

        // Check if selector is a string or a Locator
        if (typeof selector === 'string') {
            console.log(`Clicking on element: ${selector}`);
            await this.page.locator(selector).click();  // If string selector, use page.click()
        } else {
            console.log(`Clicking on Locator '+${selector}` );
            await selector.click();  // If Locator object, call click() directly on it
        }
    }

    // Type in a text field
    async type(selector, text) {
        console.log(`Typing "${text}" into element: ${selector}`);
        await this.page.fill(selector, text);
    }


   // async captureScreenshot(stepName, result) {
     //   const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      //  const screenshotPath = `./screenshots/${stepName}-${result}-${timestamp}.png`;
      //  await this.page.screenshot({ path: screenshotPath });
      //  return screenshotPath;
   // }

}
export default BasePage;
