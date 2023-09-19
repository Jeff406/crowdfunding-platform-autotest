const baseUrl = process.env.BASE_URL;
const selectors = require('../Fixtures/PageFixtures/BasePageFixtures').selectors;
const {By, Select, until} = require('selenium-webdriver');
const { Type } = require('selenium-webdriver/lib/logging');

class BasePage{
    constructor(driver, selectors){
        this.driver = driver;
        this.url = null;
    }
    async goTo(path){
        await driver.get(baseUrl + path);
    }

    async acceptCookie() {
        this.clickBySelector(selectors.acceptCookiesBtn);
    }

    getBaseUrl(){
        return baseUrl;
    }

    async enterText(selector, text){
        await driver.findElement(By.css(selector)).sendKeys(text);
    }
    async clickBySelector(selector){
        
        let element = await this.driver.findElement(By.css(selector));

        try {
            await element.click();
        } catch (e) {
            await this.driver.executeScript("arguments[0].click();", element);
        }
    }

    async selectByValue(selector, value) {
        const selectElement = await driver.findElement(By.css(selector));
        const select = new Select(selectElement);

        await select.selectByValue(value)
    }

    async getChromeLogByHttpCode(statusCode) {
        const logs = await driver.manage().logs().get(Type.PERFORMANCE);
        
        let res = logs.filter(item => {
          let message = item.message;
          let json = JSON.parse(message);
          
          return json.message.params && json.message.params.response && json.message.params.response.status == statusCode;
        });

        return res;
    }

    async getElement(selector) {
        return await driver.findElement(By.css(selector));
    }

    async closeBrowser(){
        await driver.quit();
    }
}

module.exports = BasePage;