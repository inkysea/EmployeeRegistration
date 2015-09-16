Feature: HR can update an employee in their Employee list
  As a HR Manager
  I want to update an employee in my Employee list
  So that I can remember who works for the company

  Scenario: Employee updated in list
    Given I have a list of employees
    When I update an Employee in the  list
    Then The Employee information is updated

  Scenario: Duplicate Employee in list
    Given I have an existing Employee in the list
    When I add a duplicate Employee to the list
    Then the HR admin is presented with an error that the employee already exists