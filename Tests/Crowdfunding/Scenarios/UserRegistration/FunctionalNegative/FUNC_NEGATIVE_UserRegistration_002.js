const { assert, expect } = require("chai");
const InvestorRegistrationPage = require('../../../../../Pages/InvestorRegistrationPage')

const addContext = require('mochawesome/addContext');

describe('Crowdfunding Platform', () => {
  describe('[NEGATIVE][TEST SUITE 002] - Investor Registration Form Submission', () => {
    let page = new InvestorRegistrationPage();
  
    beforeEach(async function () {
      page = new InvestorRegistrationPage(global.driver);
      await page.open();
      await page.acceptCookie();
    })
      
    const tests = require('../../../../../Fixtures/ParameterizedTests/UserRegistration/FUNC_NEGATIVE_UserRegistration_002.json');
      
    // This is a parameterized test
    tests.forEach(test => {
      it(`[${test.testId}] - ${test.description}`, async function (){
        let formInput = test.formInput;

        addContext(this, {title: 'Test description', value: test.description});
        addContext(this, {title: 'Test data', value: formInput});

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

        // Wait for the form to be submitted
        await driver.sleep(3000);

        // Get log for assertion
        let res = await page.getChromeLogByHttpCode(422);

        assert.equal(res.length, 1,  `Expect there is (1) response with status code 422, actual (${res.length})`);
      });
    });
  })
});
