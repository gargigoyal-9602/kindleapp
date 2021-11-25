Feature: CustomisableUserSubscriptions

    Scenario: User navigates to CustomisableUserSubscriptions
        Given I am a User loading CustomisableUserSubscriptions
        When I navigate to the CustomisableUserSubscriptions
        Then CustomisableUserSubscriptions will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors