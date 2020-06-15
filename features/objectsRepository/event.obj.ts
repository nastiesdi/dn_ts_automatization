import { by, element } from 'protractor';

export class eventRepository {
    //Event page main buttons  
    readonly registerNowButton = element(by.xpath("//span[contains(text(),'Register Now')]/.."));

    //loadingSpinner with message
    readonly loadingMessage = element(by.xpath("//*[contains(@class,'Dialog__loadingMessageText')]"));

    //Register Form Navigation buttons
    readonly nextButton = element(by.id("forward"));
    readonly cancelButton = element(by.id("exit"));
    readonly previousButton = element(by.id("backward"));
    readonly sumbitButton = element(by.id("complete"));

    //Helpful elements to proceed checkout
    registrationItemsSelected = element(by.xpath("//span[contains(text(),'Selected')]"));
    registrationSummaryExtraAttendeesButton = element(by.xpath("//button[@data-cvent-id='add-group-member-button']"));
    confirmationNumber = element(by.xpath("//*[contains(text(),'Your Confirmation Number is:')]/../div"));
}