import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    // Hardcoded trivia card
    // let triviaCard = this.store.createRecord('card', {
    //   question: 'Which of the following is NOT a feature of ES6',
    //   a: 'Arrow Function Notation',
    //   b: 'Enhanced Object Literals',
    //   c: 'Bean Validation',
    //   d: 'Iterables and iterators',
    //   answer: 'c'
    // });
    // return [triviaCard];

    return this.store.findAll('card');
  }
});
