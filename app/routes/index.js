import Ember from 'ember';

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),
  beforeModel: function(){
    const ref = this.get('firebaseApp').auth();

    //if no user logged in, will redirect to login page.
    ref.onAuthStateChanged(function(user){
       if(!user)
       {
         this.transitionTo('login');
       }
    }.bind(this)
  );
}
});
