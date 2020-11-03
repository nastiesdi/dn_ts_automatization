import { browser } from "protractor";
import { BrowserHacks } from "../../support/browserHacks";
import chai = require('chai');
import {OnetehPage} from "../pageObjects/oneteh.page";

export = function cventSteps() {

    //Default cucumber timeout
    this.setDefaultTimeout(600 * 1000);

    //Loading browser hacks
    let browserHacks = new BrowserHacks;

    //Loading Event Page Object
    let oneteh = new OnetehPage;

    //Unique identifier    
    let uniqueIndentifier: string;

    //Swagger API Caller

    //Chai-as-Promised setup
    chai.use(require('chai-as-promised'));

    //Hooks
    this.Before(async () => {
        //ACTIONS BEFORE EXECUTING EACH TEST, I.E. SOME PRE-REQS FOR TEST OR SETUP
    });

    this.After(async () => {
        //ACTIONS AFTER EXECUTING EACH TEST, I.E. CLEANUP
        await browserHacks.ClearBrowserData();
    });

    //Step Definitions

    //Given expression, can only be used with Given in .feature file
    this.Given(/^I am on oneteh homepage$/, async () => {
        await browser.navigate().to(browser.params.onetehByURL);
        await oneteh.Loaded();
    });

    //Can only be used with When, Then, And expressions in .feature file
    this.Then(/^enter "(.*?)" in Search field/, async (value) => {
        await oneteh.Search(value);
    });

    //Can only be used with When, Then, And expressions in .feature file
    // this.Then(/^I see "(.*?)" item/, async (value) => {
    //     await oneteh.VerifyItemIsVisible(value);
    // });
}