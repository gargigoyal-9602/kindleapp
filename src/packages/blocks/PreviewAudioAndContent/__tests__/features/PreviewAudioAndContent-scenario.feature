Feature: PreviewAudioAndContent

    Scenario: User navigates to PreviewAudioAndContent
        Given I am a User loading PreviewAudioAndContent
        When I navigate to the PreviewAudioAndContent
        Then PreviewAudioAndContent will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors