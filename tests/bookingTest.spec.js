import { test, expect } from '@playwright/test';
import BrowserFactory from '../utils/BrowserFactory';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import ShoppingPage from '../pages/ShoppingPage';
import ConfirmationPage from '../pages/ConfirmationPage';
import fs from 'fs';
import allure from 'allure-commandline';  // Ensure Allure is properly set up if used

const testData = JSON.parse(JSON.stringify(require('../resources/testdata.json')));

test.beforeAll(async () => {
    await BrowserFactory.initBrowser();
});

test.afterAll(async () => {
    await BrowserFactory.closeBrowser();
});

test('Order a Phone', async ({}, testInfo) => {
    const context = await BrowserFactory.createContext(testInfo.title);  // Pass test title for video name
    const page = await context.newPage();

    const loginPage = new LoginPage(page);
    const homePage = new HomePage(page);
    const shoppingPage = new ShoppingPage(page);
    const confirmationPage = new ConfirmationPage(page);
    const url = testData.URL;

    await loginPage.goTo(url);
    await homePage.signIn();
    await loginPage.login();
    await homePage.addToCart();
    await homePage.checkOut();
    await shoppingPage.placeOrder();
    await confirmationPage.getOrderNumber();
    await confirmationPage.clickContinueShopping();
    await homePage.logOut();

    // Save the video and attach it using testInfo
    await BrowserFactory.saveAndAttachVideo(context, testInfo);
});
