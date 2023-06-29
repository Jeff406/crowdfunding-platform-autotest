const baseUrl = process.env.BASE_URL;
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

    getBaseUrl(){
        return baseUrl;
    }

    async enterText(selector, text){
        await driver.findElement(By.css(selector)).sendKeys(text);
    }
    async clickBySelector(selector){
        await driver.wait(until.elementLocated(By.css(selector)), 3000);
        
        let element = driver.findElement(By.css(selector));
        await element.click();
        // const actions = driver.actions({async: true});
        // await actions.move({origin: element}).click().perform();

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