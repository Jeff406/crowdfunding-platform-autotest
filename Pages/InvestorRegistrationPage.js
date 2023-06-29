const {By} = require('selenium-webdriver');
const {path, selectors} = require('../Fixtures/PageFixtures/InvestorRegistrationPageFixtures');

var BasePage = require ('../Pages/BasePage');


class InvestorRegistrationPage extends BasePage{

    async open() {
        await this.goTo(path);
    }

    getPath() {
        return path;
    }


    async selectGender(gender) {
        await this.selectByValue(selectors.gender, gender);
    }

    async enterTitle(title) {
        await this.enterText(selectors.title, title);
    }

    async selectInvestorType(type) {
        await this.selectByValue(selectors.investorType, type);
    }

    async enterFirstName(firstName) {
        await this.enterText(selectors.firstName, firstName);
    }

    async enterLastName(lastName) {
        await this.enterText(selectors.lastName, lastName);
    }

    async enterEmail(email) {
        await this.enterText(selectors.email, email);
        return this;
    }

    async enterPassword(password) {
        await this.enterText(selectors.password, password);
    }

    async scrollFromPassWordField() {
        let password =  await this.driver.findElement(By.css(selectors.password));
        await this.driver.executeScript("arguments[0].scrollIntoView()", password);
    }

    async clickTnc() {
        await this.clickBySelector(selectors.tnc);
    }

    async clickPp() {
        await this.clickBySelector(selectors.privacyPolicy);
    }

    async clickRegistration() {
        await this.clickBySelector(selectors.submitBtn);
    }

    async enterAllInput(gender, title, investorType, firstName, lastName, email, password, isClickTnc = false, isClickPP = false, isSubmit = false) {
        if (gender) {
            await this.selectGender(gender);
        }
        if (title) {
            await this.enterTitle(title);
        }
        if (investorType) {
            await this.selectInvestorType(investorType);
        }
        if (firstName) {
            await this.enterFirstName(firstName);
        }
        if (lastName) {
            await this.enterLastName(lastName);
        }
        if (email) {
            await this.enterEmail(email);
        }
        if (password) {
            await this.enterPassword(password);
        }

        await this.scrollFromPassWordField();

        await this.driver.sleep(500);

        if (isClickTnc) {
            await this.clickTnc();
        }

        if (isClickPP) {
            await this.clickPp(); 
        }

        if (isSubmit) {
            await this.clickRegistration();
        }
    }

}
module.exports = InvestorRegistrationPage;