import { by, element } from 'protractor';

//This class serves as  a storage for page elements, each page object has its own object repo class - i.e. "home.page.ts" have "homepage.obj.ts" and inherits it
export class onlinerRepository {
    readonly onlinerLogo = element(by.css(".onliner_logo"));
    readonly fastSearch = element(by.className("fast-search__input"));

    //Iframe, needed to enter and find some elements in DOM, if you won't switch to it - you will have error "Element Not Found"
    readonly searchPopupIframe = element(by.css(".modal-iframe"));
}