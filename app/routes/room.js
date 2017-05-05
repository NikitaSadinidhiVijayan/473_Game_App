import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    let triviaCard = this.store.createRecord('card', {
      question: 'Which of the following is NOT a feature of ES6',
      a: 'Arrow Function Notation',
      b: 'Enhanced Object Literals',
      c: 'Bean Validation',
      d: 'Iterables and iterators',
      answer: 'c'
    });
    return [triviaCard];
  }
});
