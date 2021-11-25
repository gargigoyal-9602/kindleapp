Feature: ReviewPrompt

    Scenario: User navigates to ReviewPrompt
        Given I am a User loading ReviewPrompt
        When I navigate to the ReviewPrompt
        Then ReviewPrompt will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors