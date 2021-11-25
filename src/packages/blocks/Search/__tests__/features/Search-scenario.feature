Feature: Search

    Scenario: User navigates to Search
        Given I am a User loading Search
        When I navigate to the Search
        Then Search will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors