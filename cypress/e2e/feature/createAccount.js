import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { createSelectors, loginSelectors } from "../../support/selector";
function generateRandomEmail() {
  const timestamp = Date.now();
  return `user${timestamp}@example.com`;
}

function generateRandomPassword() {
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  let password = "";
  for (let i = 0; i < 3; i++) {
    password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
  }
  return password;
}

let email;
let password;

Given("the user is on the home page", () => {
  cy.visit("/");
});
When("user navigate to create account page", () => {
  cy.visit("/customer/account/create/");
});
When("the user fill all the details", () => {
  email = generateRandomEmail();
  password = generateRandomPassword();
  cy.get("#firstname").type("firstname");
  cy.get("#lastname").type("lastname");
  cy.get(createSelectors.usernameInput).type(email);
  cy.get(createSelectors.passwordInput).type(password);
  cy.get(createSelectors.submitButton).type(password);
});
When("click on create account button", () => {
  cy.get("button[title='Create an Account']").click();
});
Then("the user should be redirected to the My account page", () => {
  cy.url().should(
    "eq",
    "https://magento.softwaretestingboard.com/customer/account/"
  );
  cy.get(".box.box-information").contains(email);
});
Then("proper succes message should display", () => {
  cy.get("div[role='alert']").contains("Thank you for registering with Main Website Store.");
});
When("user navigate to sign in page", () =>{
  cy.get("a").contains("Sign In").click();
});
When("the user enters valid credentials",  () => {
  cy.get(loginSelectors.username).type(email);
  cy.get(loginSelectors.password).first().type(password);
});
When("the user clicks on the login button",()=>{
  cy.get("button[id='send2']").first().click();
});

Then("the user should be redirected to the home page",()=>{
  cy.url().should(
    "eq",
    "https://magento.softwaretestingboard.com/"
  );
});



