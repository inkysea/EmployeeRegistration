Feature: HR can add an employee to their Employee list
  As a HR Manager
  I want to add an employee to my Employee list
  So that I can remember who works for the company

  Scenario: Employee added to list
    Given I have an empty list
    When I add an Employee to the list
    Then The Employee list contains the newly added Employee

  Scenario: Duplicate Employee in list
    Given I have an existing Employee in the list
    When I add a duplicate Employee to the list
    Then the HR admin is presented with an error that the employee already exists