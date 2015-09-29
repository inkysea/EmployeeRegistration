'use strict';

module.exports = function() {

    this.Given(/^I have an empty list$/, function (callback) {

        var webdriverio = require('webdriverio');
        var options = {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        };

       // WebElement downloadTab = driver.findElement(By.id("menu_download"));
       // WebElement downloadLink = downloadTab.findElement(By.tagName("a"));
       // downloadLink.click();

        webdriverio
            .remote(options)
            .init()
            .url('http://localhost:3000')
            .title(function(err, res) {
                console.log('Title was: ' + res.value);
            })
            .end();
        callback();
    });

    this.When(/^I add an Employee to the list$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        var webdriverio = require('webdriverio');
        var options = {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        };

        // WebElement downloadTab = driver.findElement(By.id("menu_download"));
        // WebElement downloadLink = downloadTab.findElement(By.tagName("a"));
        // downloadLink.click();


        var timestamp = process.hrtime()
        var screenshotPath = 'SnapShots/error-report-' + timestamp +'.jpg'


        webdriverio
            .remote(options)
            .init()
            .url('http://localhost:3000')
            .title(function(err, res) {
                console.log('Title was: ' + res.value);
            })
            .click('a')
            .setValue('#editEmployeeTitle', 'Manager')
            .setValue('#editEmployeeName', 'Kristopher William Thieler')
            .submitForm('#editEmployeeSubmit')
            .saveScreenshot(screenshotPath,function(err, result) {
                console.log("screenshot saved");
            })
            .end();

        callback();
    });


    this.Then(/^The Employee list contains the newly added Employee$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        var webdriverio = require('webdriverio');
        var options = {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        };

        webdriverio
            .remote(options)
            .init()
            .url('http://localhost:3000')
            .title(function(err, res) {
                console.log('Title was: ' + res.value);
            })
            .selectByVisibleText('#selectbox', 'Kristopher William Thieler')
            .saveScreenshot('./snapshot.png')
            //.saveScreenshot('./VerifyEmployeeList.png') // Save the screenshot to disk
            .end();
        callback();
    });

    this.Given(/^I have an existing Employee in the list$/, function (callback) {
        var webdriverio = require('webdriverio');
        var options = {
            desiredCapabilities: {
                browserName: 'firefox'
            }
        };

        webdriverio
            .remote(options)
            .init()
            .url('http://localhost:3000')
            .title(function(err, res) {
                console.log('Title was: ' + res.value);
            })
            .selectByVisibleText('#selectbox', 'Kristopher William Thieler')
            .saveScreenshot('./snapshot.png');
        //.saveScreenshot('./VerifyEmployeeList.png') // Save the screenshot to disk
        //.end();
        callback();
    });

    this.When(/^I add a duplicate Employee to the list$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

    this.Then(/^the HR admin is presented with an error that the employee already exists$/, function (callback) {
        // Write code here that turns the phrase above into concrete actions
        callback.pending();
    });

}