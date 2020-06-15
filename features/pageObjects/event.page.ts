import { browser, ExpectedConditions, promise, by } from "protractor";
import { eventRepository } from "../objectsRepository/event.obj";
import { personalInformationRepository } from "../objectsRepository/personalInformation.obj";
import { paymentRepository } from "../objectsRepository/payment.obj";
import chai = require("chai");

const defaultTimeout = 60000;
chai.use(require('chai-smoothie'));
const expect = chai.expect;

//Swagger API Caller
let responseObject: any;
const pingSnaplogic = require('request-promise');


export class EventPage {

    //Locators      
    readonly eventElements = new eventRepository;
    readonly personalInformationElements = new personalInformationRepository;
    readonly paymentElements = new paymentRepository;

    public async Loaded(): promise.Promise<void> {
        //Check that Cvent Online Registration page loaded and you can proceed with next actions
        await browser.wait(ExpectedConditions.presenceOf(this.eventElements.registerNowButton), defaultTimeout);
    }

    public async PersonalInformationLoaded(): promise.Promise<void> {
        //Check for main Personal Information page elements to appear
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.SalutationDropdown), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.AttendeeFirstNameField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.AttendeeLastNameField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.AttendeeEmailAddressField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.BehalfPersonCheckbox), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.RegistrationTypeDropdown), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.CompanyField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.JobTitleField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.WorkPhoneField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.AddressLineField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.CountryDropdown), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.StateProvinceField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.CityField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.personalInformationElements.ZipCodeField), defaultTimeout);
    }

    public async StartRegister(): promise.Promise<void> {
        //Start registration process on cvent page (Register Now)
        await this.eventElements.registerNowButton.click();
        await this.WaitForLoadingSpinnerToDisappear();
        await this.PersonalInformationLoaded();
    }

    //Single Attendee
    public async RegisterSingleAttendee(indentifier: string): promise.Promise<void> {
        //This method used for a standard (common) single attendee registration using Cvent UI
        //TODO: Unite that with GDPRAttendee method

        //Safewaiter for main elements for Personal Information page
        await this.PersonalInformationLoaded();

        //Fill in Personal Information Details
        await this.FillInPersonalInformationDetails(indentifier);

        //Clicking Next button
        await browser.wait(ExpectedConditions.visibilityOf(this.eventElements.nextButton), defaultTimeout);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.eventElements.nextButton), defaultTimeout);
        await this.eventElements.nextButton.click();

        //Waiting for the next screen (Selected Payment)
        await this.ProceedSelectedPayment();

        //Waiting for the next screen (Registration Summary)   
        await this.ProceedRegistrationSummary();

        //Click on Radio Button to enable credit card fields  
        await this.UseCreditCard();
        await this.CreditCardFieldsLoaded();

        //Enter credit card details
        await this.FillInCreditCardDetails();

        //Enter Billing Information
        await this.FillInBillingInformation();

        //Click Submit button and wait
        await this.Submit();
    }

    //Register with someone else
    public async RegisterWithSomeoneElse(indentifier: string): promise.Promise<void> {
        //This method used for a standard (common) single attendee registration using Cvent UI
        //TODO: Unite that with GDPRAttendee method

        //Safewaiter for main elements for Personal Information page
        await this.PersonalInformationLoaded();

        //Click on Book with someone else
        await this.personalInformationElements.BehalfPersonCheckbox.click();

        //Fill in additional fields appeared
        await this.FillInPersonalInformationAdditionalFields(indentifier);

        //Fill in Personal Information Details
        await this.FillInPersonalInformationDetails(indentifier);

        //Clicking Next button
        await browser.wait(ExpectedConditions.visibilityOf(this.eventElements.nextButton), defaultTimeout);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.eventElements.nextButton), defaultTimeout);
        await this.eventElements.nextButton.click();

        //Waiting for the next screen (Selected Payment)
        await this.ProceedSelectedPayment();

        //Waiting for the next screen (Registration Summary)   
        await this.ProceedRegistrationSummary();

        //Click on Radio Button to enable credit card fields  
        await this.UseCreditCard();
        await this.CreditCardFieldsLoaded();

        //Enter credit card details
        await this.FillInCreditCardDetails();

        //Enter Billing Information
        await this.FillInBillingInformation();

        //Click Submit button and wait
        await this.Submit();
    }

    public async GDPRRegisterSingleAttendee(indentifier: string, table): promise.Promise<void> {
        //This method used for a single attendee registration using Cvent UI and GDPR Checkboxes 
        //Main difference of this method is that you can specify which checkboxes should be ticked and which don't
        //TODO: Unite that with common single attendee method

        const input = table.hashes();

        //Safewaiter for main elements for Personal Information page
        await this.PersonalInformationLoaded();

        //Fill in Personal Information Details
        await this.FillInPersonalInformationDetails(indentifier);

        //Activting GDPR checkboxes 
        //TODO: Think about this how to put that to generic method
        //POSSIBLE SOLUTION: Check for table is null(undefinied) or not or using default variable value     
        for (const item of input) {
            if (item.Status == "Ticked") {
                await eval(`browser.wait(ExpectedConditions.elementToBeClickable(this.personalInformationElements.${item.Checkbox}), defaultTimeout)`);
                await eval(`this.personalInformationElements.${item.Checkbox}.click()`);
                await this.personalInformationElements.emailCheckbox.click();
            }
        }

        //Clicking Next button
        await browser.wait(ExpectedConditions.visibilityOf(this.eventElements.nextButton), defaultTimeout);
        await browser.wait(ExpectedConditions.elementToBeClickable(this.eventElements.nextButton), defaultTimeout);
        await this.eventElements.nextButton.click();

        //Waiting for the next screen (Selected Payment)
        await this.ProceedSelectedPayment();

        //Waiting for the next screen (Registration Summary)   
        await this.ProceedRegistrationSummary();

        //Click on Radio Button to enable credit card fields  
        await this.UseCreditCard();
        await this.CreditCardFieldsLoaded();

        //Enter credit card details
        await this.FillInCreditCardDetails();

        //Enter Billing Information
        await this.FillInBillingInformation();

        //Click Submit button and wait
        await this.Submit();
    }

    //Tax registration
    public async taxRegistration(indentifier: string, eventCountry: string): promise.Promise<any> {
        //Setupping eventID and eventURL using browser.params global storage
        let eventID = await eval(`browser.params.${eventCountry}EventID`);
        let eventURL = `https://web-sandbox.cvent.com/event/${eventID}/summary?rp=00000000-0000-0000-0000-000000000000`;

        await browser.navigate().to(eventURL);        
        await this.Loaded();
        await browser.navigate().to(eventURL);
        await this.Loaded();
        await this.StartRegister();
        await this.RegisterSingleAttendee(indentifier);
        responseObject = await this.processEvent(indentifier, eventID);

        return responseObject;
    }

    public async processEvent(uniqueIndentifier: string, eventID: string):promise.Promise<any> {
        //This method is used to make GET and POST requests

        let getRequest = {
            method: "GET",
            uri: `https://elastic.snaplogic.com:443/api/1/rest/slsched/feed/EuromoneyStaging/Events/RetrieveDelegates/Retrieve?emailAddress=emsautomation${uniqueIndentifier}@mailinator.com&eventId=${eventID}`,
            headers: { "Authorization": "Bearer BroU91tIjhTgsVwqQ6NIbZLGAOcuuQnn" }
        }

        await pingSnaplogic(getRequest)
            .then(response => {
                //For debugging in case of fails
                /* console.log("Result of GET request:")
                console.log(response); */
                responseObject = response;
            })
            .catch(err => console.log('error ', err));

        //Performing POST Request trigger prcoessing and to grap responce of it
        let postRequest = {
            method: "POST",
            uri: `https://elastic.snaplogic.com:443/api/1/rest/slsched/feed/EuromoneyStaging/Events/TriggerRegistration/Trigger`,
            headers: {
                "Authorization": "Bearer BroU91tIjhTgsVwqQ6NIbZLGAOcuuQnn",
                "Content-Type": "application/json"
            },
            body: `${responseObject}`
        }

        await pingSnaplogic(postRequest)
            .then(response => {
                //For debugging in case of fails
                /* console.log("Result of POST request:")
                console.log(response); */
                responseObject = response;
            })
            .catch(err => console.log('error ', err));

        return responseObject;
    }

    private async WaitForLoadingSpinnerToDisappear(): promise.Promise<void> {
        //Useful method to avoid annoying Loading Spinners in Cvent UI
        //Neccesary sleep delay to properly catch this "brilliant" spinner, otherwise ExpectedConditions not always catch it and wait till its disappearing
        await browser.sleep(1000);
        await browser.wait(ExpectedConditions.presenceOf(this.eventElements.loadingMessage), defaultTimeout);
        await browser.wait(ExpectedConditions.invisibilityOf(this.eventElements.loadingMessage), defaultTimeout);
    }

    //Personal information section without "Behalf" without checkbox ticked
    private async FillInPersonalInformationDetails(indentifier: string): promise.Promise<void> {
        //Filling in Personal Information defails data like firstName, lastName, e-mail, address, etc
        await this.personalInformationElements.SalutationDropdown.element(by.cssContainingText("option", "Prof")).click();
        await this.personalInformationElements.AttendeeFirstNameField.sendKeys(`firstName${indentifier}`);
        await this.personalInformationElements.AttendeeLastNameField.sendKeys(`lastName${indentifier}`);
        await this.personalInformationElements.AttendeeEmailAddressField.sendKeys(`emsautomation${indentifier}@mailinator.com`);
        await this.personalInformationElements.CompanyField.sendKeys(`testCompany${indentifier}`);
        await this.personalInformationElements.JobTitleField.sendKeys(`specialist${indentifier}`);
        await this.personalInformationElements.WorkPhoneField.sendKeys(`${indentifier}`);
        await this.personalInformationElements.AddressLineField.sendKeys(`Grand Hyatt Hotel`);
        await this.personalInformationElements.CountryDropdown.element(by.cssContainingText("option", "United Kingdom")).click();
        await this.personalInformationElements.StateProvinceField.sendKeys("England");
        await this.personalInformationElements.CityField.sendKeys("London");
        await this.personalInformationElements.ZipCodeField.sendKeys("EC4Y 8AX");

        //As last part picking Register Type because it triggers loading spinner
        await this.personalInformationElements.RegistrationTypeDropdown.element(by.cssContainingText("option", "General Delegate")).click();
        await this.WaitForLoadingSpinnerToDisappear();
    }

    //Personal information section appeared "Behalf" checkbox ticked
    private async FillInPersonalInformationAdditionalFields(indentifier: string): promise.Promise<void> {

        await this.personalInformationElements.PersonalFirstNameField.sendKeys(`personalFirstName${indentifier}`);
        await this.personalInformationElements.PersonalLastNameField.sendKeys(`personalLastName${indentifier}`);
        await this.personalInformationElements.PersonalemailAddressField.sendKeys(`personalEmailAddress${indentifier}@mailinator.com`);
    }

    private async ProceedSelectedPayment(): promise.Promise<void> {
        //Proceed to the next page from Selected Payment page
        await browser.wait(ExpectedConditions.presenceOf(this.eventElements.registrationItemsSelected), defaultTimeout);
        await this.eventElements.nextButton.click();
    }

    private async ProceedRegistrationSummary(): promise.Promise<void> {
        //Proceed to the next page from Registration Summary page
        await browser.wait(ExpectedConditions.presenceOf(this.eventElements.registrationSummaryExtraAttendeesButton), defaultTimeout);
        await this.eventElements.nextButton.click();
    }

    private async UseCreditCard(): promise.Promise<void> {
        //Trigger Credit Card fields appearance
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.creditCardRadioButton), defaultTimeout);
        this.paymentElements.creditCardRadioButton.click();
    }

    private async CreditCardFieldsLoaded(): promise.Promise<void> {
        //Verify Credit Card Fields loaded
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.typeDropdown), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.creditCardNumberField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.nameOnCardField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.cardSecurityCodeField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.monthDropdown), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.yearDropdown), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.address1Field), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.address2Field), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.countryDropdown), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.cityField), defaultTimeout);
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.zipCodeField), defaultTimeout);
    }

    private async FillInCreditCardDetails(): promise.Promise<void> {
        //Fill in payment info (credit card details)
        await this.paymentElements.typeDropdown.element(by.cssContainingText("option", "Mastercard")).click();
        await this.paymentElements.creditCardNumberField.sendKeys("5555555555554444");
        await this.paymentElements.nameOnCardField.sendKeys("Automation Dude");
        await this.paymentElements.cardSecurityCodeField.sendKeys("123");
        await this.paymentElements.monthDropdown.element(by.cssContainingText("option", "February")).click();
        await this.paymentElements.yearDropdown.element(by.cssContainingText("option", "2022")).click();
    }

    private async FillInBillingInformation(): promise.Promise<void> {
        //Fill in Billing Information details for credit card
        await this.paymentElements.address1Field.sendKeys("Grand Hyatt Hotel");
        await this.paymentElements.countryDropdown.element(by.cssContainingText("option", "United Kingdom")).click();
        await this.paymentElements.cityField.sendKeys("Grand Hyatt Hotel");

        //Neccessary step of expectation due to some elements transformation
        await browser.wait(ExpectedConditions.presenceOf(this.paymentElements.stateProvinceDropdown), defaultTimeout);

        await this.paymentElements.stateProvinceDropdown.element(by.cssContainingText("option", "London,City of")).click();            
        await this.paymentElements.zipCodeField.sendKeys("EC4Y 8AX");
    }

    private async Submit(): promise.Promise<void> {
        //Submit attendee registration
        await this.eventElements.sumbitButton.click();
        await this.WaitForLoadingSpinnerToDisappear();
        await browser.wait(ExpectedConditions.visibilityOf(this.eventElements.confirmationNumber), defaultTimeout);
    }
}