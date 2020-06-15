import { browser } from "protractor";

export class BrowserHacks {
//Useful class with few tricks for Protactor, like clearing browser data (due to the fact, that browser.restart() gives NoSession error)    

    public async NavigateWithClearCache(url: string) {
        //Alternative to ClearBrowserData() in hooks
        await browser.navigate().to(url);
        await this.ClearBrowserData(); 
        await browser.navigate().to(url);
    }

    public async ClearBrowserData() {       
        //Use this method in Before/After hooks to make sure you don't have any issues because of the saved data from previous test 
        await browser.executeScript('window.localStorage.clear();');
        await browser.executeScript('window.sessionStorage.clear();');
        await browser.driver.manage().deleteAllCookies();         
    }
}