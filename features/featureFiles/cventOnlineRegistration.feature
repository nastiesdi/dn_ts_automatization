@cvent-online-registration @smoke
Feature: Cvent Online Registration

    As the Events Platform User
    I want to record in Salesforce when a user has registered themselves for an event on Cvent
    So that we can see this in Salesforce

    @ems-248
    Scenario: A new user registers himself to attend an Event
        Given a user navigates to Cvent to register for an event
        And enter the data in the registration form
        When the transaction is processed by Cvent and SnapLogic
        Then verify the content of the Json