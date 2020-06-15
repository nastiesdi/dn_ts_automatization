import { by, element } from 'protractor';

export class personalInformationRepository {

    //Event Registration Personal Information fields (splitted a bit to improve readability)
    readonly SalutationDropdown = element(by.xpath("//span[contains(text(),'Salutation')]/../../../../div/select"));

    readonly AttendeeFirstNameField = element(by.xpath("//span[contains(text(),'First Name')]/../../../../div/div/input"));
    readonly AttendeeLastNameField = element(by.xpath("//span[contains(text(),'Last Name')]/../../../../div/div/input"));
    readonly AttendeeEmailAddressField = element(by.xpath("//span[contains(text(),'Email Address')]/../../../../div/div/input"));

    readonly BehalfPersonCheckbox = element(by.xpath("//input[@name='adminRegSelected']"));

    readonly RegistrationTypeDropdown = element(by.xpath("//span[contains(text(),'Registration Type')]/../../../div/select"));

    readonly CompanyField = element(by.xpath("//span[contains(text(),'Company')]/../../../../div/div/input"));
    readonly JobTitleField = element(by.xpath("//span[contains(text(),'Job Title')]/../../../../div/div/input"));
    readonly WorkPhoneField = element(by.xpath("//span[contains(text(),'Work Phone')]/../../../../div/div/input"));
    readonly AddressLineField = element(by.xpath("//span[contains(text(),'Address Line 1')]/../../../../div/div/input"));

    readonly CountryDropdown = element(by.xpath("//span[contains(text(),'Country')]/../../../../div/select"));
    readonly StateProvinceField = element(by.xpath("//span[contains(text(),'State/Province')]/../../../../div/div/input"));
    readonly CityField = element(by.xpath("//span[contains(text(),'City')]/../../../../div/div/input"));
    readonly ZipCodeField = element(by.xpath("//span[contains(text(),'Post/Zip Code')]/../../../../div/div/input"));

    //Marketing Preferences (GDPR elements)
    readonly emailCheckbox = element(by.xpath("//span[contains(text(),'Email')]/../../../../div/*[@data-cvent-id='checkbox']/li/input"));
    readonly telephoneCheckbox = element(by.xpath("//span[contains(text(),'Telephone')]/../../../../div/*[@data-cvent-id='checkbox']/li/input"));
    readonly smsCheckbox = element(by.xpath("//span[contains(text(),'SMS')]/../../../../div/*[@data-cvent-id='checkbox']/li/input"));
    readonly mailCheckbox = element(by.xpath("//span[contains(text(),'Mail')]/../../../../div/*[@data-cvent-id='checkbox']/li/input"));
}