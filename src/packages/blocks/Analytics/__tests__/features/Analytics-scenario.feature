Feature: Analytics

    Scenario: User navigates to Analytics
        Given I am a User loading Analytics
        When I navigate to the Analytics
        Then Analytics will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors