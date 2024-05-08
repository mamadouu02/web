const backend = 'https://web-application.osc-fr1.scalingo.io'

describe('Home view', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.intercept('POST', backend + '/login', { fixture: 'admin.json' }).as('login');
    cy.intercept('GET', backend + '/api/groupsmember', { fixture: 'groupsmember.json' }).as('groupsmember');
    cy.intercept('GET', backend + '/api/mygroups', { fixture: 'mygroups.json' }).as('mygroups');

    cy.get('.LoginForm').as('loginForm');

    cy.get('@loginForm').within(() => {
      cy.get('input[type="text"]').type('Sebastien.Viardot@grenoble-inp.fr');
      cy.get('input[type="password"]').type('123456');
      cy.get('button').click();
      cy.wait('@login');
    });

    cy.wait('@groupsmember');
    cy.wait('@mygroups');
  });

  it('User can list groups and add a group', () => {
    cy.intercept('GET', backend + '/api/groupsmember', { fixture: 'groupsmember_modified.json' }).as('groupsmemberModified');
    cy.intercept('GET', backend + '/api/mygroups', { fixture: 'mygroups_modified.json' }).as('mygroupsModified');
    cy.intercept('POST', backend + '/api/mygroups', { fixture: 'new_group.json' }).as('newGroup');

    cy.get('.Groups').within(() => {
      cy.get('.ListGroupsMember').should('contain', 'GroupOne');
      cy.get('.ListMyGroups').should('contain', 'GroupOne');

      cy.get('.InputField input[type="text"]').type('GroupThree');
      cy.get('button').click();

      cy.wait('@newGroup');

      cy.wait('@groupsmemberModified');
      cy.wait('@mygroupsModified');

      cy.get('.ListGroupsMember').should('contain', 'GroupOne');
      cy.get('.ListGroupsMember').should('contain', 'GroupThree');
      cy.get('.ListMyGroups').should('contain', 'GroupOne');
      cy.get('.ListMyGroups').should('contain', 'GroupThree');
    });
  });

  it('User can remove and add a member', () => {
    cy.intercept('GET', backend + '/api/users', { fixture: 'users.json' }).as('users');
    cy.intercept('GET', backend + '/api/mygroups/1', { fixture: 'members.json' }).as('members');
    cy.intercept('DELETE', backend + '/api/mygroups/1/4', { fixture: 'delete_member.json' }).as('deleteMember');
    cy.intercept('PUT', backend + '/api/mygroups/1/4', { fixture: 'add_member.json' }).as('addMember');
    
    cy.get('.ListMyGroups li:first-child').click();
    cy.wait('@users');
    cy.wait('@members');
    
    cy.get('.GroupManager').within(() => {
      cy.get('legend').should('contain', 'GroupOne');
      
      cy.get('.MemberManager select').should('exist');
      cy.get('.ListMembers li').should('have.length', 4);
      
      cy.intercept('GET', backend + '/api/mygroups/1', { fixture: 'members_modified.json' }).as('membersModified');

      cy.get('.ListMembers li:last-child button').click();
      
      cy.wait('@deleteMember');
      cy.wait('@membersModified')

      cy.get('.ListMembers li').should('have.length', 3);

      cy.get('.MemberManager select').select('Nils.Gesbert@grenoble-inp.fr');

      cy.intercept('GET', backend + '/api/mygroups/1', { fixture: 'members.json' }).as('membersModified');

      cy.get('.MemberManager button').click();

      cy.wait('@addMember');
      cy.wait('@membersModified')

      cy.get('.ListMembers li').should('have.length', 4);
    });
  });
});
