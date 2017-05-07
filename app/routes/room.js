import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    //return this.store.findAll('card'); // this returns all the questions

    let triviaCard = this.store.findAll('card').then(function(item){

      // change the multiplicative number at the end to
      // the number of questions we have in database
      var randomIndex = Math.floor(Math.random() * 3);
      let newCard = item.objectAt(randomIndex);

      return [newCard];
    });

    return triviaCard;
  }
});
