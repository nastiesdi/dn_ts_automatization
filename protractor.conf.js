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
        onlinerByURL: "https://www.onliner.by/",
        onetehByURL: "https://www.1teh.by/"

    },

    cucumberOpts: {
        require: ['features/**/*.ts'], // loads step definitions
        format: 'pretty', // enable console output
        compiler: 'ts:ts-node/register', // interpret step definitions as TypeScript
        tags: ['@smoke'] //Execution tags, will be executed tests with ALL tags, i.e. if you have ['@smoke', '@1'] then BOTH @smoke and @1 tagged test(s) will run
    },

    serenity: {
        crew: [
            crew.serenityBDDReporter(),
            crew.photographer()
        ],

        dialect: 'cucumber', // or 'mocha'
    },

    beforeLaunch: () => {
        //Check if reports directory exists, if not create it
        //If exists - clean it
        if (!fs.existsSync(reportsFolder)) {
            mkdirp.sync(reportsFolder);
        } else {
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
    baseUrl: "https://google.com",
    capabilities: {
        browserName: "chrome",
        //Parallel Execution
        //-----------------------------------------
        //TODO: Optimize logger for parallel mode
        shardTestFiles: true,
        maxInstances: 2,
        chromeOptions: {
            //Standard mode
            args: ["--window-size=1920,1080"]
                //-----------------------------------------
                //Headless Mode
                //-----------------------------------------
                //args: ["--headless", "--disable-gpu", "--window-size=1920,1080"]
                //-----------------------------------------
        }
    }
}