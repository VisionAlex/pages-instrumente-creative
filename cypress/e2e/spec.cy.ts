describe("My First Test", () => {
  it("Visits the Home Page", () => {
    cy.visit("/");
    cy.title().should("include", "Editura Instrumente Creative");
    cy.findByText(/Vizualizează toate produsele/i).click();
    cy.url().should("include", "/produse");
    cy.findByTestId("product-0").findByTestId("add-to-cart").click();
  });
});
