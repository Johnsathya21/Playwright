// pages/loginPage.js
import { expect } from '@playwright/test';
import BasePage from './BasePage';
import HomePage from '../pages/HomePage';

class LoginPage extends BasePage {
    
    constructor(page) 
    {
        super(page);
        this.txtUserName = page.locator('div').filter({ hasText: /^Select Username$/ }).nth(2);
        this.ddlUserName = page.getByText('demouser', { exact: true });
        this.txtPassword= page.locator('div').filter({ hasText: /^Select Password$/ }).nth(2);
        this.ddlPassword= page.getByText('testingisfun99', { exact: true });
        this.btnLogIn = page.getByRole('button', { name: 'Log In' });
        
        
    }

    async login() 
    {
        const homePage = new HomePage(this.page);

        // Check if the page is still open before clicking
        if (this.page.isClosed()) {
            throw new Error('Page has been closed before setting the UserName field');
        }
        
        try {
            await this.txtUserName.click();
            await this.ddlUserName.click();
            await this.txtPassword.click();
            await this.ddlPassword.click();
            await this.btnLogIn.click();

            await homePage.validateSuccesfulLogIn();     
            
            await this.page.screenshot({path: './test-results/screenshot.png'});
           // const screenshotPath = await this.captureScreenshot('login-success', 'pass');
            //return screenshotPath;
        } 
        
        catch (error) 
        {
            console.log("An error occurred during the login process:", error);
            console.error("An error occurred during the login process:", error);
            // Optionally: take a screenshot for debugging
            //await this.page.screenshot({ path: 'error-login-screenshot.png' });
            // Optionally: rethrow the error if you want it to propagate
            throw error;
        }
    }



}

export default LoginPage;
