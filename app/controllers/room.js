import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    answerCheck: function() {
      var answer = this.get('choice');
      alert('You selected answer: ' + answer);
    },
  }
});
