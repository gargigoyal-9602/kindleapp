Feature: OfflineBrowsing

    Scenario: User navigates to OfflineBrowsing
        Given I am a User loading OfflineBrowsing
        When I navigate to the OfflineBrowsing
        Then OfflineBrowsing will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors