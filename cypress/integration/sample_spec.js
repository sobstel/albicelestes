describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
});
