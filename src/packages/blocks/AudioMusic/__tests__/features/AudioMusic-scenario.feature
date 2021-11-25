Feature: AudioMusic

    Scenario: User navigates to AudioMusic
        Given I am a User loading AudioMusic
        When I navigate to the AudioMusic
        Then AudioMusic will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors