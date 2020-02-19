describe('Los estudiantes under monkeys', () => {
  it('visits los estudiantes and survives monkeys', () => {
    cy.visit('https://losestudiantes.co');
    cy.contains('Cerrar').click();
    cy.wait(1000);
    // randomClick(10);
    randomEvent(10);
  })
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// function randomClick(monkeysLeft) {

//   function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min)) + min;
//   };

//   var monkeysLeft = monkeysLeft;
//   if(monkeysLeft > 0) {
//     cy.get('a').then($links => {
//       var randomLink = $links.get(getRandomInt(0, $links.length));
//       if(!Cypress.dom.isHidden(randomLink)) {
//         cy.wrap(randomLink).click({force: true});
//         monkeysLeft = monkeysLeft - 1;
//       }
//       cy.wait(1000);
//       randomClick(monkeysLeft);
//     });
//   }   
// }


const CLICK_LINK = 'CLICK_LINK';
const FILL_FIELD = 'FILL_FIELD';
const SELECT_COMBO = 'SELECT_COMBO';
const CLICK_BUTTON = 'CLICK_BUTTON';

function randomEvent(eventsLeft) {

  var eventsLeft = eventsLeft;

  if ( eventsLeft > 0 ) {

    const events = [CLICK_LINK, FILL_FIELD, SELECT_COMBO, CLICK_BUTTON];
    const selectedEvent = events[getRandomInt(0, events.length)];

    switch(selectedEvent) {
      case CLICK_LINK:
        cy.get('a').then( $links => {
          var randomLink = $links.get(getRandomInt(0, $links.length));
          if(!Cypress.dom.isHidden(randomLink)) {
            cy.wrap(randomLink).click({force: true});
            eventsLeft = eventsLeft - 1;
          }
          cy.wait(1000);
          randomEvent(eventsLeft);
        });

        break;
      case FILL_FIELD:

        cy.get('input').then( $textInputs => {
          var randomInput = $textInputs.get(getRandomInt(0, $textInputs.length));
          if(!Cypress.dom.isHidden(randomInput)) {
            cy.wrap(randomInput).click({force: true}).type('Lo que sea', { force: true });
            eventsLeft = eventsLeft - 1;
          }
          cy.wait(1000);
          randomEvent(eventsLeft);
        });

        break;
      case SELECT_COMBO:
        cy.get('body').then( $body => {

          if ($body.find('select').length) {
            cy.get('select').then( async ($selectCombos) => {
              var randomCombo = $selectCombos.get(getRandomInt(0, $selectCombos.length));
              if(!Cypress.dom.isHidden(randomCombo)) {
                const firstOption = await cy.wrap(randomCombo).get('option').eq(0);
                if (firstOption) {
                  cy.wrap(randomCombo).select(firstOption.val());
                }
                
                eventsLeft = eventsLeft - 1;
              }
              cy.wait(1000);
              randomEvent(eventsLeft);
            });
          } else {
            randomEvent(eventsLeft);
            console.log('No select found');
          }
        });
        break;
      case CLICK_BUTTON:

        cy.get('button').then($buttons => {
          var randomButton = $buttons.get(getRandomInt(0, $buttons.length));
          if(!Cypress.dom.isHidden(randomButton)) {
            cy.wrap(randomButton).click({force: true});
            eventsLeft = eventsLeft - 1;
          }
          cy.wait(1000);
          randomEvent(eventsLeft);
        });

        break;
      default: 
        break;
    }
    console.log(`selected event: ${selectedEvent}`);
    
  } 
}
