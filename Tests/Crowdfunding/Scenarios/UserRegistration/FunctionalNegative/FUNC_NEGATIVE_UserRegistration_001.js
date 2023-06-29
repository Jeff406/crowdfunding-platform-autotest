const { assert, expect } = require("chai");
const { HttpResponse } = require('selenium-webdriver/devtools/networkinterceptor');
const {selectors} = require('../../../../../Fixtures/PageFixtures/InvestorRegistrationPageFixtures');

const InvestorRegistrationPage = require('../../../../../Pages/InvestorRegistrationPage')
const addContext = require('mochawesome/addContext');

describe('Crowdfunding Platform', () => {
  describe('[NEGATIVE][TEST SUITE 001] - Investor Registration Form Submission', () => {
    let page = new InvestorRegistrationPage();
  
    beforeEach(async function () {
      page = new InvestorRegistrationPage(global.driver);
    })
      
    const tests = require('../../../../../Fixtures/ParameterizedTests/UserRegistration/FUNC_NEGATIVE_UserRegistration_001.json');
      
      // This is a parameterized test
      tests.forEach(test => {
        it(`[${test.testId}] - ${test.description}`, async function (){
          let formInput = test.formInput;
  
          addContext(this, {title: 'Test description', value: test.description});
          addContext(this, {title: 'Test data', value: formInput});
  
          await page.open();
          await page.enterAllInput(
            formInput.gender, 
            formInput.title, 
            formInput.investorType, 
            formInput.firstName, 
            formInput.lastName, 
            formInput.email,
            formInput.password,
            formInput.tnc,
            formInput.privacyPolicy,
            true
            );
  
          const elementValidation = await page.getElement(selectors[test.validationSelectorKey]);
          let validationMessage = await driver.executeScript('return arguments[0].validationMessage;', elementValidation);
                  
          assert.notEqual(validationMessage, '');
        });
      });
  })
})
