import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
     answerCheck: function(ans) {
      var answer = this.get('choice');
      if (answer === ans){
        alert('Congratualtions, You got it Correct!');
      } else {
        alert('Sorry, That is Incorrect!');
      }

    //let trivCard = this.store.createRecord('card');
    // var question;
    // this.store.findRecord('card', id).then(function(item){
    //    alert(item.get('question'));
    // })
    //let question = trivCard.question;
    //alert(this.question);
  }
  }
});
