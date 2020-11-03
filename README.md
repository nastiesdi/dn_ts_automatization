# Pre-reqs: 
Install node.js LTS version, JDK and Visual Studio Code <br />

# Install steps: 
Open folder project in VS Code, and then in terminal: <br />

> npm install <br />
> npm run postinstall <br />
> npm run update-reporter <br />

# Usage: 
in the first terminal window in VS Code: <br />
> npm run webdriver <br />

in the second terminal window in VS Code: <br />
> npm run tests <br />

to get the test results opened in BDD HTML format in browser: <br />
> npm run report <br />

# Selecting scenarios to run: 
In protractor.conf.js change tags (in cucumberOpts section, it has comments for help, read it before doing something) <br />

# Additional (not must-have, but pretty useful setup): 
To be able to perform "Go to definition" on Gherkin steps in VS Code <br />

Install "Cucumber (Gherkin) Full Support" extension from VS Code extensions <br />

Then in Extensions select a settings(gears) button under "Cucumber (Gherkin) Full Support">Extension Settings>click on "Edit in settings.json" and then just delete all stuff in it and paste next lines: <br />
 
> {
> "cucumberautocomplete.steps": "/features/stepDefinitions/*.steps.ts",
> "cucumberautocomplete.syncfeatures": "features/featureFiles/*feature",
> "cucumberautocomplete.customParameters": []
> }

Then just re-open VS Code <br />
