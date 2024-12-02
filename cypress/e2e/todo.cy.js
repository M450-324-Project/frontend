describe("todo tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should render the todo app", () => {
    cy.getDataTest("todo-header").should("exist");
  });

  it("should add a todo", () => {
    cy.get('[data-set="todo-form"] ').should("exist");
    cy.get('[data-set="todo-form"] input[name = "title"]').type(
      "Watch a movie"
    );
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    cy.contains("Watch a movie").should("exist");
  });

  it("should mark a todo as completed", () => {
    cy.get('[data-set="todo-form"] input[name = "title"]').type(
      "Watch a movie"
    );
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    cy.contains("Watch a movie").should("exist");
    cy.get('[data-set="todo-list"] input[type ="checkbox"]')
      .should("exist")
      .should("not.be.checked");
    // you can also use should have class completed to check if the todo is completed
    cy.get('[data-set="todo-list"] input[type ="checkbox"]')
      .should("exist")
      .click()
      .should("be.checked");
  });

  it("should delete a todo", () => {
    cy.get('[data-set="todo-form"] input[name = "title"]').type(
      "Watch a movie"
    );
    cy.get('[data-set = "add-todo-btn"]').should("exist").click();
    cy.contains("Watch a movie").should("exist");

    cy.get('[data-set="todo-list"] [data-set="delete-todo-btn"]')
      .should("exist")
      .click();
    cy.contains("Watch a movie").should("not.exist");
  });
});
