const addContext = require('mochawesome/addContext');
// const {Builder, Browser, By, Key, until} = require('selenium-webdriver');
const webdriver = require('selenium-webdriver');
const { Preferences, Type, Level } = require('selenium-webdriver/lib/logging')
const chrome = require('selenium-webdriver/chrome');

exports.mochaHooks = {
  beforeEach: function () {
    const caps = webdriver.Capabilities.chrome();
    const logPrefs = new Preferences();
    logPrefs.setLevel(Type.PERFORMANCE, Level.ALL);
  
    caps.setLoggingPrefs(logPrefs);
    caps.set('goog:loggingPrefs', logPrefs);
  
    const options = new chrome.Options(caps);
    const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

    global.driver = driver;
  },
  afterEach: async function () {
    await global.driver.quit();
  }
};