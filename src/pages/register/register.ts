import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { Register } from '../../models/register';

/**
 * Generated class for the RegisterPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as Register;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private afAuth: AngularFireAuth) {
  }

  register(user: Register){
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).then(auth => {
      console.log(auth);
    }).catch(err => {
      this.toastCtrl.create({message: err.message, duration: 2000}).present();
    });
  }

}
