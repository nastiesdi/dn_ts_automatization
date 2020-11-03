@smoke
Feature: Searching goods

    As a user a want to find necessary goods using search field

    Scenario: Search on homepage

        Given I am on oneteh homepage
        When enter "i9-9900k" in Search field
        Then I see "Intel Core i9-9900K (BOX)" item