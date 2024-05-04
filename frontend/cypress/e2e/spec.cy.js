const backend = 'https://web-application.osc-fr1.scalingo.io'

describe('App test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('New user can register', () => {
    cy.intercept('POST', backend + '/register', { fixture: 'register.json' }).as('register')
    
    cy.get('.RegisterForm').as('registerForm');
    
    cy.get('@registerForm').within(() => {
      cy.get('input[type="text"]').eq(0).type('John Doe');
      cy.get('input[type="text"]').eq(1).type('John.Doe@acme.com');
      cy.get('input[type="password"]').eq(0).type('1m02P@SsF0rt!');
      cy.get('input[type="password"]').eq(1).type('1m02P@SsF0rt!');
      cy.get('button').click();
      cy.wait('@register')
      cy.contains('Enregistrement réussi');
      cy.get('input[type="text"]').should('have.value', '');
      cy.get('input[type="password"]').should('have.value', '');
    });
    
    cy.get('.LoginForm input[type="text"]').should('have.value', 'John.Doe@acme.com');
  });
  
  it('Registered user cannot register', () => {
    cy.intercept('POST', backend + '/register', { fixture: 'register_error.json' }).as('register')
    
    cy.get('.RegisterForm').as('registerForm');
    
    cy.get('@registerForm').within(() => {
      cy.get('input[type="text"]').eq(0).type('John Doe');
      cy.get('input[type="text"]').eq(1).type('John.Doe@acme.com');
      cy.get('input[type="password"]').eq(0).type('1m02P@SsF0rt!');
      cy.get('input[type="password"]').eq(1).type('1m02P@SsF0rt!');
      cy.get('button').click();
      cy.wait('@register')
      cy.contains("Échec de l'enregistrement");
    });
  });
  
  it('User cannot log in with wrong password', () => {
    cy.intercept('POST', backend + '/login', { fixture: 'login_error.json' }).as('login')
    
    cy.get('.LoginForm').as('loginForm');
    cy.get('@loginForm').within(() => {
      cy.get('input[type="text"]').type('John.Doe@acme.com');
      cy.get('input[type="password"]').type('1m02P@sF0rt!');
      cy.get('button').click();
      cy.wait('@login')
      cy.contains("Échec de la connexion");
    });
  });
  
  it('User can log in', () => {
    cy.intercept('POST', backend + '/login', { fixture: 'login.json' }).as('login')
    
    cy.get('.LoginForm').as('loginForm');
    
    cy.get('@loginForm').within(() => {
      cy.get('input[type="text"]').type('John.Doe@acme.com');
      cy.get('input[type="password"]').type('1m02P@SsF0rt!');
      cy.get('button').click();
      cy.wait('@login')
    });

    cy.contains('Bonjour, John Doe');
  });
});
