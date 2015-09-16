Feature: HR can remove an employee from their Employee list
  As a HR Manager
  I want to remove an employee from my Employee list
  So that I can remember who works for the company

  Scenario: Employee removed from list
    Given I have a list with at least one employee
    When I remove an Employee from the  list
    Then The Employee list no longer contains the Employee
