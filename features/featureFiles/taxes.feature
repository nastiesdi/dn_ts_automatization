@taxes @smoke
Feature: Tax Calculation


    Bunch of tests for tax calculations for different countries

    @ems-255 @notaxes
    Scenario: Tax is not provided in Cvent eventsScenario: Tax is not provided in Cvent events
        Given no tax has been set up in Cvent for any registraion product for an event
        And no tax code has been added to the EM Event in SF
        When I proceed to register for an No Tax event
        Then the content of the Json will be:
            | Field              | Value        |
            | authorityName      | Out of Scope |
            | sellerRegistration | GB 243315784 |
            | taxRateCode        | SO           |



    @ems-272 @uk
    Scenario: Tax is provided in Cvent events United Kingdom Tax
        Given a Tax Name of United Kingdom VAT and a Tax code of SR has been set up in Cvent for any registraion product for an event
        And the same Tax Code SR has been added to the EM Event in SF
        When I proceed to register for an United Kingdom event
        Then the content of the Json will be:
            | Field              | Value              |
            | authorityName      | United Kingdom VAT |
            | sellerRegistration | GB 243315784       |
            | taxRateCode        | SR                 |

    @ems-272 @fr
    Scenario: Tax is provided in Cvent events France Tax
        Given a Tax Name of France TVA and a Tax code of SR has been set up in Cvent for any registraion product for an event
        And the same Tax Code SR has been added to the EM Event in SF
        When I proceed to register for an France event
        Then the content of the Json will be:
            | Field              | Value        |
            | authorityName      | France TVA   |
            | sellerRegistration | GB 243315784 |
            | taxRateCode        | SR           |



    @ems-272 @de
    Scenario: Tax is provided in Cvent events Gremany Tax
        Given a Tax Name of Gremany VAT and a Tax code of SR has been set up in Cvent for any registraion product for an event
        And the same Tax Code SR has been added to the EM Event in SF
        When I proceed to register for an German event
        Then the content of the Json will be:
            | Field              | Value        |
            | authorityName      | Germany VAT  |
            | sellerRegistration | GB 243315784 |
            | taxRateCode        | SR           |

    @ems-272 @nl
    Scenario: Tax is provided in Cvent events Netherlands Tax
        Given a Tax Name of Netherlands VAT and a Tax code of SR has been set up in Cvent for any registraion product for an event
        And the same Tax Code SR has been added to the EM Event in SF
        When I proceed to register for an Netherlands event
        Then the content of the Json will be:
            | Field              | Value           |
            | authorityName      | Netherlands VAT |
            | sellerRegistration | GB 243315784    |
            | taxRateCode        | SR              |

    @ems-272 @uae
    Scenario: Tax is provided in Cvent events UAE Tax
        Given a Tax Name of UAE VAT and a Tax code of SR has been set up in Cvent for any registraion product for an event
        And the same Tax Code SR has been added to the EM Event in SF
        When I proceed to register for an UAE event
        Then the content of the Json will be:
            | Field              | Value        |
            | authorityName      | UAE VAT      |
            | sellerRegistration | GB 243315784 |
            | taxRateCode        | SR           |

    @ems-272 @pt
    Scenario: Tax is provided in Cvent events Portugal Tax
        Given a Tax Name of Portugal VAT and a Tax code of SR has been set up in Cvent for any registraion product for an event
        And the same Tax Code SR has been added to the EM Event in SF
        When I proceed to register for an Portugal event
        Then the content of the Json will be:
            | Field              | Value        |
            | authorityName      | Portugal VAT |
            | sellerRegistration | GB 243315784 |
            | taxRateCode        | SR           |

