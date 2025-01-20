describe("todo tests", () => {
  const uniqueSeed = Date.now().toString();
  const getUniqueId = () => Cypress._.uniqueId(uniqueSeed);
  let category = "";

  beforeEach(() => {
    cy.visit("/");
    category = getUniqueId();
    cy.get('input[placeholder="New category"]').type(`${category}`)
    cy.contains("button", "Add").click()
  });

  it("should render the todo app", () => {
    cy.getDataTest("todo-header").should("exist");
  });

  it("add category", () => {

    const uniqueId = getUniqueId();
    cy.contains("h1", "todos")
    cy.get('input[placeholder="New category"]').type(`${uniqueId}`)
    cy.contains("button", "Add").click()

    cy.get(`input[value="${uniqueId}"]`)
  })

  it("update category", () => {
    const uniqueId = getUniqueId();
    cy.contains("h1", "todos")
    cy.get('input[placeholder="New category"]').type(`${uniqueId}`)
    cy.contains("button", "Add").click()

    cy.get(`input[value="${uniqueId}"]`).type(`ab`)

    cy.get(`input[value="${uniqueId}b"]`)
  })

  it("add task", () => {
    const uniqueId = getUniqueId();
    cy.contains("h1", "todos")
    cy.get('input[placeholder="Add todo..."]').type(`${uniqueId}`)
    cy.get('select[name="category"]').select(category)
    cy.get("button[class='input-submit']").click()

    cy.contains("span", uniqueId)
  })

  it("sort by priority", () => {
    const uniqueId = getUniqueId();
    cy.contains("h1", "todos")
    cy.get('input[placeholder="Add todo..."]').type(`${uniqueId} low`)
    cy.get('select[name="category"]').select(category)
    cy.get("button[class='input-submit']").click()

    cy.get('input[placeholder="Add todo..."]').type(`${uniqueId} high`)
    cy.get('select[name="category"]').select(category)
    cy.get('select[name="priority"]').select("High")
    cy.get("button[class='input-submit']").click()

    cy.contains("button", "Sort by Priority").click();


    cy.get("span").first().contains("HIGH");
    cy.get("span").last().contains("LOW");
  })

  it("get Task by Category", () => {
    const uniqueId = getUniqueId();
    cy.contains("h1", "todos")
    cy.get('input[placeholder="Add todo..."]').type(`${uniqueId}`)
    cy.get('select[name="category"]').select(category)
    cy.get("button[class='input-submit']").click()

    cy.get("div[class='_modeButtons_17a5m_11']").within(() => {
      cy.get('select').select(category);
    })


    cy.contains("span", uniqueId)
  })
});
