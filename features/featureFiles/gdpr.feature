@gdpr @smoke
Feature: GDPR

    Scenarios for attendee to make sure that
    GDPR information selected during Cvent registration process are correctly stored in SF

    @ems-256
    Scenario: GDPR information selected during Cvent registration process are correctly stored in SF (Opt Out)
        Given a user register for an event in Cvent
        When he selects at Personal Information page
            | Checkbox          | Status |
            | emailCheckbox     | Ticked |
            | telephoneCheckbox | Ticked |
            | smsCheckbox       | Ticked |
            | mailCheckbox      | Ticked |
        And the data is passed to SF
        Then the following values will be present in the Json
            | Field         | Value |
            | dpaByEmail    | false |
            | dpaByPhone    | false |
            | dpaByPostmail | false |
            | dpaBySMS      | false |
            | dpaByFax      | null  |

    @ems-257
    Scenario: GDPR information selected during Cvent registration process are correctly stored in SF (Opt In)
        Given a user register for an event in Cvent
        When he selects at Personal Information page
            | Checkbox          | Status   |
            | emailCheckbox     | UnTicked |
            | telephoneCheckbox | UnTicked |
            | smsCheckbox       | UnTicked |
            | mailCheckbox      | UnTicked |
        And the data is passed to SF
        Then the following values will be present in the Json
            | Field         | Value |
            | dpaByEmail    | true  |
            | dpaByPhone    | true  |
            | dpaByPostmail | true  |
            | dpaBySMS      | true  |
            | dpaByFax      | null  |

