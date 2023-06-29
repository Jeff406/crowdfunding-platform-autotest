**NOTE!!!**
My excuse for using this User Registration Form at https://my.ecoligo.investments/investor/registration for buiding this project.
Due to lack of time I cannot prepare a real website for test.
If there is any junk data, it's just 1 or 2 users with invalid names are created. My sorry again.

**Objectives**
 - To build a automation testing project against the User Registration Form for crowdfundiong platform
 - Integrate Mochawesome report

**Tech used**
 - nodejs 
 - Test runner: mocha 
 - Browser automation and assertion toolchain: selenium-webdriver, chai 
 - Report module: mochawesome

**Features**
- The project allows for the implementation of specific test cases via tags (@). For example, when we need to smoke test the production, some test cases must be skipped (for example, load testing), so we simply include @smoketest in the running options (you will know later), and only test cases with the tag @smoketest will be performed.
- Dynamic evaluations are available.
- The test report includes useful debugging information, such as the request parameter in each test, which you can import to Postman for further investigation

**How to install and run the project locally**

To run project locally, node (v18.16.1, lower version would not work) and npm should be pre-installed
    npm install
    npm install -g npx

This was tested in Linux (Ubuntu 23.04) and Google Chrome must be installed in default location and available in PATH env (/usr/bin)
This might work in Windows. (not tested)

Running by pre-defined scripts:

    BASE_URL=https://my.ecoligo.investments npm run test:regression
    BASE_URL=https://my.ecoligo.investments npm run test:smoketest

Single test running command:

    BASE_URL=your_base_url npx mocha Tests/Crowdfunding/Scenarios/UserRegistration/FunctionalNegative/FUNC_NEGATIVE_UserRegistration_001.js --timeout=30000 --reporter mochawesome --require Configs/RootHooks.js

Running test by tagging:

    BASE_URL=your_base_url npx mocha Tests/Crowdfunding/Scenarios/UserRegistration/FunctionalNegative --recursive --timeout=30000 --reporter mochawesome --require Configs/RootHooks.js –grep @yourtag1 –grep @yourtag2

URL configuration and Selectors are defined under file: Fixtures/PageFixtures/InvestorRegistrationPageFixtures.js, .. in exports.path

The default setup use BASE_URL from the ENV, to run smoke test:

    BASE_URL=https://my.ecoligo.investments npm run test:smoketest

**Project structure**

	.
	├── Configs
	│   └── RootHooks.js
	├── Fixtures
	│   ├── PageFixtures
	│   │   └── InvestorRegistrationPageFixtures.js
	│   └── ParameterizedTests
	│       └── UserRegistration
	│           ├── FUNC_NEGATIVE_UserRegistration_001.json
	│           └── FUNC_NEGATIVE_UserRegistration_002.json
	├── mochawesome-report
	│   ├── mochawesome.html
	│   ├── mochawesome.json
	│   └── result.json
	├── package.json
	├── package-lock.json
	├── Pages
	│   ├── BasePage.js
	│   └── InvestorRegistrationPage.js
	├── README.md
	└── Tests
			└── Crowdfunding
					└── Scenarios
							├── InvestmentProjects
							└── UserRegistration
									├── FunctionalNegative
									│   ├── FUNC_NEGATIVE_UserRegistration_001.js
									│   └── FUNC_NEGATIVE_UserRegistration_002.js
									└── FunctionalPositive
											└── FUNC_POSITIVE_UserRegistration_001.js



There are 3 test suites: dynamic tests, functionality tests defined by 3 files (*FUNC_NEGATIVE_UserRegistration_001*, *FUNC_NEGATIVE_UserRegistration_002*, *FUNC_POSITIVE_UserRegistration_001*). These tests cover both positive and negative cases, including different types of testing:

- Dynamic tests: test cases are dynamically generated at run time. Test data is an array of test inputs including the different inputs for the form submission, test description, test ID, related selector to evaluate.
- Functional cases: general test cases that covers smoke testing and from manual cases that can be automated.

Test script are defined as below structure

	describe('Crowdfunding Platform', () => {
	   describe('[NEGATIVE][TEST SUITE 001] - Investor Registration Form Submission', () => {
	      it('Test case 1 @smoketest', async () => {
	      });
	      it('Test case 2 @regression', async () => {
	      });
	      it('Test case 3 @sometag', async () => {
	      });
	      it('Test case 4', async () => {
	      });
	   });
	});

Test 'describe' can also have tags, allowing you to freely select which test suite and scenario to execute.

**How to write test cases**

All tests are defined in Tests/Scenarios folder. When there are new requirements, a new folder can be created e.g InvestmentProjects beside UserRegistration folder.
Then subfolders can be created inside the UserRegistration, e.g FunctionalNegative

For local development, each new test case should have tag @intest then execute with

    BASE_URL=https://my.ecoligo.investments npm run test:implement
to make it easy to develop test case and debug. This tag should be removed before pushing your codes.

**Reporting**

Following the completion of the tests, an HTML report will be produced. The document can be found at mochawesome-report/mochawesome.html.

At runtime, information about the test-running process is displayed in the console along with the running test case and test results, information about the assertion result, and a highlight-colored comparison of the actual result and expected result. 

The html report and console log display information about the test execution process that can be used to examine the test case.

**Limitations**

Screenshot for each failed test case is not available
Dynamic test by reading testing data from CSV files is supported but need a custom configuration so only data from json are used now.

For dynamic tests, the test data input should have a pattern something like

    {
			"testId": "TC-19",
			"description": "VERIFY THAT THE FORM REJECT TO SUBMIT IF THE USER DOES NOT ACCEPT TERM AND CONDITION",
			"formInput": {
				"gender": "male",
				"title": "Mr.",
				"investorType": "PrivateInvestor",
				"firstName": "John",
				"lastName": "Doe",
				"email": "leqthai406@gmail.com",
				"password": "123456?a",
				"tnc": false,
				"privacyPolicy": true
			}
    }



