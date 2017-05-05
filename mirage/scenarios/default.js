export default function(server) {

  // Use /mirage/fixtures/cards.js to create entries from JSON
  server.loadFixtures('cards');

  // Uses /mirage/factories/card.js to create entries using
  let card = server.create('card', { question: 'Some Question' });
  //server.createList('card', 3, { card }); // BROKEN ATM FOR MULTIPLE CARD GENERATION
}
