import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { Login } from '../../models/login';
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as Login;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private afAuth: AngularFireAuth) {
  }

  login(user: Login){
    this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(auth => {
      console.log(auth);
    }).catch(err => {
      this.toastCtrl.create({message: err.message, duration: 2000}).present();
    })
  }

}
