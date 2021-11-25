Feature: UploadMedia

    Scenario: User navigates to UploadMedia
        Given I am a User loading UploadMedia
        When I navigate to the UploadMedia
        Then UploadMedia will load with out errors
        And I can enter text with out errors
        And I can select the button with with out errors
        And I can leave the screen with out errors