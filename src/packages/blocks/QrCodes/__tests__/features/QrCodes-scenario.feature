Feature: QrCodes

    Scenario: User navigates to QrCodes
        Given I am a User loading QrCodes
        When I navigate to the QrCodes
        Then QrCodes will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors