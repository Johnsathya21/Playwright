import { expect } from '@playwright/test';
import BasePage from './BasePage';

const testData = JSON.parse(JSON.stringify(require('../resources/testdata.json')));

class ShoppingPage extends BasePage 
{
    constructor(page) 
    {
        super(page);

        this.txtFirstName= page.getByLabel('First Name');

        this.txtLastName= page.getByLabel('Last Name');

        this.txtAddress= page.getByLabel('Address');

        this.txtState= page.getByLabel('State/Province');

        this.txtPostalCode= page.getByLabel('Postal Code');

        this.btnSubmit= page.getByRole('button', { name: 'Submit' });


    }

    async placeOrder() 
    {

        // Check if the page is still open before clicking
        if (this.page.isClosed()) {
            throw new Error('Page has been closed before placing the order');
        }
        
        try {
            await this.txtFirstName.fill(testData.FirstName);   
            await this.txtLastName.fill(testData.LastName);   
            await this.txtPostalCode.fill(testData.Address);  
            await this.txtAddress.fill(testData.State);   
            await this.txtState.fill(testData.PostalCode);   
            
            await this.btnSubmit.click()
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
            await this.lnkLogOut.click();

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
}

export default ShoppingPage;
