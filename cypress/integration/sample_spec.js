describe("My First Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:1986/");
  });

  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });
});
