describe('Notes', () => {
	it('adding new', () => {
		const NOTE_TITLE = 'New note';
		const NOTE_CONTENT = 'new content';

		cy.visit('http://localhost:3000');

		cy.get('[data-cy="addNoteButton"]').click();

		cy.get('[data-cy="title"]').type(NOTE_TITLE);
		cy.get('[data-cy="content"]').type(NOTE_CONTENT);
		cy.get('[data-cy="saveNoteButton"]').click();

		cy.get(`[data-cy="${NOTE_TITLE}"] > :nth-child(2)`).should('be.visible');
	});

	it('removing note', () => {
		cy.visit('http://localhost:3000');

		const NOTE_TITLE = 'delectus aut autem';
    
    cy.get('[data-cy="Total"]').should('have.text', 3)
		cy.get(`[data-cy="${NOTE_TITLE}"] > :nth-child(1) > input`).check();
		cy.get('[data-cy="removeNoteButton"]').click();
		cy.get('[data-cy="Total"]').should('have.text', 2)
	});
});
