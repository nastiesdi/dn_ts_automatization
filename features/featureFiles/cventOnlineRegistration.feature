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

    @ems-249
    Scenario: A user register someone else to attend an Event (2 attendees) (same company details)
        Given a user navigates to Cvent to register two attendees for an event
        And enter the data in the registration form for 2 attendees
        When the transaction is processed by Cvent and SnapLogic
        Then verify the content of the Json

    @ems-250
    Scenario: A user register himself and someone else to attend an Event (2 attendees) (same company details)
        Given a user navigates to Cvent to register for an event
        And register an additional delegates
        When the transaction is processed by Cvent and SnapLogic
        Then verify the content of the Json


    @ems-251
    Scenario: A user register someone else to attend an Event
        Given a user navigates to Cvent to register some else for an event
        And enter the data in the registration form with someone else
        When the transaction is processed by Cvent and SnapLogic
        Then verify the content of the Json

    @ems-252
    Scenario: A user register himself and someone else to attend an Event (same company details)
        Given a user navigates to Cvent to register himself for an event
        And register another delegate for the same event
        When the transaction is processed by Cvent and SnapLogic
        Then verify the content of the Json