import { expect } from '@playwright/test';
import BasePage from './BasePage';

const testData = JSON.parse(JSON.stringify(require('../resources/testdata.json')));

class ConfirmationPage extends BasePage 
{
    constructor(page) 
    {
        super(page);

        this.lblOrderNumber= page.locator("//*[contains(text(),'Your order number is ')]//strong");
        this.btnContinueShopping= page.getByRole('button', { name: 'Continue Shopping »' });

    }

    async getOrderNumber() 
    {
        // Check if the page is still open before clicking
        if (this.page.isClosed()) {
            throw new Error('Page has been closed before continue shopping');
        }
        
        try {
           
            await expect(this.lblOrderNumber).toBeVisible();
            const text = await this.lblOrderNumber.innerText();
            console.log('Your order number is '+text);

        } 

        catch (error) 
        {
            console.error("An error occurred during the ContinueShopping:", error);
            // Optionally: take a screenshot for debugging
            await this.page.screenshot({ path: 'error-continueShopping-screenshot.png' });
            // Optionally: rethrow the error if you want it to propagate
            throw error;
        }
    }

    async clickContinueShopping() 
    {

        // Check if the page is still open before clicking
        if (this.page.isClosed()) {
            throw new Error('Page has been closed before continue shopping');
        }
        
        try {
           
            await this.btnContinueShopping.click()
        } 

        catch (error) 
        {
            console.error("An error occurred during the ContinueShopping:", error);
            // Optionally: take a screenshot for debugging
            await this.page.screenshot({ path: 'error-continueShopping-screenshot.png' });
            // Optionally: rethrow the error if you want it to propagate
            throw error;
        }
    }

   
}

export default ConfirmationPage;
