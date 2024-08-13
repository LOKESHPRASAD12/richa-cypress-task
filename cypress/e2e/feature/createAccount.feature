Feature: Create account functionality

  Scenario: User create login account
    Given the user is on the home page
    When user navigate to create account page
    And the user fill all the details
    And click on create account button
    Then the user should be redirected to the My account page
    And proper succes message should display

  Scenario: User logs in with valid credentials
    Given the user is on the home page
    When user navigate to sign in page
    When the user enters valid credentials
    And the user clicks on the login button
    Then the user should be redirected to the home page