const { assert, expect } = require("chai");
const { HttpResponse } = require('selenium-webdriver/devtools/networkinterceptor');
const {selectors} = require('../../../../../Fixtures/PageFixtures/InvestorRegistrationPageFixtures');

const InvestorRegistrationPage = require('../../../../../Pages/InvestorRegistrationPage')
const addContext = require('mochawesome/addContext');

describe('Crowdfunding Platform', () => {
  describe('[POSITIVE][TESTSUITE-001] - Investor Registration Form Submission', () => {
    let page = new InvestorRegistrationPage();
  
    beforeEach(async function () {
      page = new InvestorRegistrationPage(global.driver);
    })
      
    it('[TC-23] - VERIFY THAT THE CHECKBOX TO AGREE TO THE TERMS AND CONDITIONS AND PRIVACY POLICY CHECKBOX ARE UNCHECKED BY DEFAULT', async function (){
      await page.open();
      await page.scrollFromPassWordField();
  
      let tncElement = await page.getElement(selectors.tnc);
      let ppElement = await page.getElement(selectors.privacyPolicy);
      
      let isCheckedTnc = await tncElement.isSelected(); 
      let isCheckedPp = await ppElement.isSelected(); 
      
  
      assert.equal(isCheckedTnc, false);
      assert.equal(isCheckedPp, false);
    });
  
    it('[TC-23] - VERIFY THAT THE USER REGISTRATION FORM IS SUBMITTED SUCCESSFULLY WITH ALL VALID INPUTS @smoketest', async function () {
      await page.open();
      await page.enterAllInput(
        'male', 
        'Mr', 
        'PrivateInvestor', 
        'John', 
        'Doe', 
        'johndoe123@gmail.com', 
        '123456?aA', 
        true, 
        true, 
        false // In this test, the form won't be submit to prevent junk data submitted to the site so the test will always pass
        )
      
      let res = await page.getChromeLogByHttpCode(422);
      
      assert.equal(res.length, 0,  `Expect there is (0) response with status code 422, actual (${res.length})`);
    });
  });
});
