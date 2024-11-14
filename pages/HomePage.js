import { expect } from '@playwright/test';
import BasePage from './BasePage';

class HomePage extends BasePage 
{
    constructor(page) 
    {
        super(page);
        this.btnSignIn = page.getByRole('link', { name: 'Sign In' });
        this.lnkLogOut= page.getByRole('link', { name: 'Logout' });
        this.lnkLoginName= page.getByText('demouser');
        this.lnkVendorOnePlus= page.getByText('OnePlus');
        this.lnkONePlus8AddToCart= page.locator('[id="\\32 0"]').getByText('Add to cart');
        this.lnkCheckOut= page.getByText('Checkout');
    }

    /**
        * Function to click on SignIn button.
        * @returns {Promise} A promise that resolves when login is complete.
    */
    async signIn() 
    {

        // Check if the page is still open before clicking
        if (this.page.isClosed()) {
            throw new Error('Page has been closed before clicking the signIn button');
        }
        
        try {
            await this.click(this.btnSignIn); 
        } 

        catch (error) 
        {
            console.error("An error occurred during the signIn process:", error);
            // Optionally: take a screenshot for debugging
            await this.page.screenshot({ path: 'error-signIn-screenshot.png' });
            // Optionally: rethrow the error if you want it to propagate
            throw error;
        }
    }

    async validateSuccesfulLogIn() 
    {

        try {
            await expect(this.lnkLoginName).toBeVisible();   
        } 

        catch (error) 
        {
            console.error("An error occurred during the logIn process:", error);
            // Optionally: take a screenshot for debugging
            await this.page.screenshot({ path: 'error-logIn-screenshot.png' });
            // Optionally: rethrow the error if you want it to propagate
            throw error;
        }
    }


    async logOut() 
    {
        try {
            await this.click(this.lnkLogOut);

            await expect(this.btnSignIn).toBeVisible();
        }    
        catch (error) 
        {
            console.error("An error occurred during the logout process:", error);
            // Optionally: take a screenshot for debugging
            await this.page.screenshot({ path: 'error-logout-screenshot.png' });
            // Optionally: rethrow the error if you want it to propagate
            throw error;
        }
    }


    async addToCart() 
    {
        try {
            await this.click(this.lnkVendorOnePlus);

            await this.click(this.lnkONePlus8AddToCart);
        }    
        catch (error) 
        {
            console.error("An error occurred during the addToCart process:", error);
            // Optionally: take a screenshot for debugging
            await this.page.screenshot({ path: 'error-addToCart-screenshot.png' });
            // Optionally: rethrow the error if you want it to propagate
            throw error;
        }
    }

    async checkOut() 
    {
        try {
            await this.click(this.lnkCheckOut);
        }    
        catch (error) 
        {
            console.error("An error occurred during the checkout process:", error);
            // Optionally: take a screenshot for debugging
            await this.page.screenshot({ path: 'error-checkOut-screenshot.png' });
            // Optionally: rethrow the error if you want it to propagate
            throw error;
        }
    }


}

export default HomePage;
