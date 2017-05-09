import Ember from 'ember';
import Firebase from 'firebase';

//const {computed, inject: {service} } = Ember;

export default Ember.Route.extend({
  firebaseApp: Ember.inject.service(),

  actions: {
    login: function() {
      var controller = this.get('controller');
      var email = controller.get('email');
      var pass = controller.get('password');
      const ref = this.get('firebaseApp').auth();

      return ref.signInWithEmailAndPassword(email, pass).catch(function(error) {
        console.log('Github sign in error', error);
      }).then(function() {
        //console.log(user);
        this.transitionTo('room');
      }.bind(this));
    },



    logout: function() {
      var controller = this.get('controller');
      const ref = this.get('firebaseApp').auth();
      ref.auth().signOut().then(function() {
        this.transitionTo('login');
      }.bind(this));
    },

    signup: function() {
      this.transitionTo('signup');
    },

    github: function() {
      const ref = this.get('firebaseApp').auth();
      var provider = new Firebase.auth.GithubAuthProvider();
      
      provider.addScope('profile');
      provider.addScope('user');

      Firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var user = result.user;
      }).catch(function(error) {
        console.log('Github sign in error', error);
      }).then(function() {
        this.transitionTo('room');
      }.bind(this));
    }
  }

});
