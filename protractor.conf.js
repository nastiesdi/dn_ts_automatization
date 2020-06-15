const crew = require('serenity-js/lib/stage_crew');
const fs = require("fs");
const rimraf = require('rimraf');
const mkdirp = require("mkdirp");
const reportsFolder = process.cwd() + "/target";

exports.config = {
    chromeOnly: true,
    directConnect: true,
    // Framework definition - tells Protractor to use Serenity/JS
    framework: 'custom',
    frameworkPath: require.resolve('serenity-js'),

    specs: ['features/**/*.feature'],

    params: {
        defaultTimeout: 60000,
        noTaxEventID: "1f12737f-727b-439b-ac1a-a9443666f04a",
        ukEventID: "7f3130ae-87f4-48c2-a0b0-84b7250f3cf9",
        franceEventID: "3e955479-f71b-4ed2-b28f-be7e799c5820",
        germanyEventID: "4b683c25-fd98-4953-b7b4-b1784def71f6",
        netherlandsEventID: "f609b3b1-2571-430b-a2d5-94b4b2745f04",
        uaeEventID: "2f00cf39-a0f1-45dd-ac4a-fafa022d7a8f",
        portugalEventID: "63007e7d-e9ad-49f7-a84d-b3925d3a92e6"
    },

    cucumberOpts: {
        require: ['features/**/*.ts'], // loads step definitions
        format: 'pretty',               // enable console output
        compiler: 'ts:ts-node/register',   // interpret step definitions as TypeScript
        tags: ['@smoke', '@ems-272'] //Execution tags, will be executed tests with ALL tags, i.e. BOTH @smoke and @publist tagged tests will run
    },

    serenity: {
        crew: [
            crew.serenityBDDReporter(),
            crew.photographer()
        ],

        dialect: 'cucumber',  // or 'mocha'
    },

    beforeLaunch: () => {
        //Check if reports directory exists, if not create it
        //If exists - clean it
        if (!fs.existsSync(reportsFolder)) {
            mkdirp.sync(reportsFolder);
        }
        else {
            rimraf.sync(reportsFolder);
            mkdirp.sync(reportsFolder);
        }
    },

    onPrepare: () => {
        /**
         * If you are testing against a non-angular site - set ignoreSynchronization setting to true
         *
         * If true, Protractor will not attempt to synchronize with the page before
         * performing actions. This can be harmful because Protractor will not wait
         * until $timeouts and $http calls have been processed, which can cause
         * tests to become flaky. This should be used only when necessary, such as
         * when a page continuously polls an API using $timeout.
         *
         * @type {boolean}
         */
        browser.waitForAngularEnabled(false);
        browser.ignoreSynchronization = true;
    },

    seleniumAddress: 'http://localhost:4444/wd/hub',
    baseUrl: "https://web-sandbox.cvent.com/event/7f3130ae-87f4-48c2-a0b0-84b7250f3cf9/summary?rp=00000000-0000-0000-0000-000000000000",
    capabilities: {
        browserName: "chrome",
        //Parallel Execution
        //-----------------------------------------
        //TODO: Optimize logger for parallel mode
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
            args: ["--window-size=1920,1080"]
            //-----------------------------------------
            //Headless Mode
            //-----------------------------------------
            //chromeOptions: {
            //    args: ["--headless", "--disable-gpu", "--window-size=1920,1080"]
        }
        //-----------------------------------------
    }
}