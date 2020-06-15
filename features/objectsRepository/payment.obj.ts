import { by, element } from 'protractor';

export class paymentRepository {
    //Trigerring radiobutton  
    readonly creditCardRadioButton = element(by.xpath("//label[contains(text(),'Credit Card')]/../input"));

    //Card Details
    readonly typeDropdown = element(by.xpath("//span[contains(text(),'Type')]/../../../div/select"));
    readonly creditCardNumberField = element(by.xpath("//span[contains(text(),'Credit Card Number')]/../../../div/div/input"));
    readonly nameOnCardField = element(by.xpath("//span[contains(text(),'Name on Card')]/../../../div/div/input"));
    readonly cardSecurityCodeField = element(by.xpath("//span[contains(text(),'Card Security Code')]/../../../div/div/input"));

    readonly monthDropdown = element(by.xpath("//span[contains(text(),'Month')]/../../../div/select"));
    readonly yearDropdown = element(by.xpath("//span[contains(text(),'Year')]/../../../div/select"));

    //Billing Information
    readonly address1Field = element(by.xpath("//span[contains(text(),'Address 1')]/../../../div/div/input"));
    readonly address2Field = element(by.xpath("//span[contains(text(),'Address 2')]/../../../div/div/input"));

    readonly countryDropdown = element(by.xpath("//span[contains(text(),'Country')]/../../../div/select"));
    readonly cityField = element(by.xpath("//span[contains(text(),'City')]/../../../div/div/input"));
    readonly stateProvinceDropdown = element(by.xpath("//span[contains(text(),'State/Province')]/../../../div/select"));
    readonly zipCodeField = element(by.xpath("//span[contains(text(),'ZIP/Postal Code')]/../../../div/div/input"));

}