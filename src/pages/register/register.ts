import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';

import { Register } from '../../models/register';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as Register;

  constructor(
    public navCtrl: NavController, 
    public toastCtrl: ToastController, 
    private afAuth: AngularFireAuth) {}

  register(user: Register){
    // Cria um novo usuário com email e senha
    this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password).catch(err => {
      /* Verificado apenas o erro, pois o sucesso redireciona para ProfilePage para completar o cadastro
       * De acordo com o Observable em app.component
       * Exibe um toast por 2 segundos com a mensagem de erro - EM INGLÊS
       */
      this.toastCtrl.create({message: err.message, duration: 2000}).present();
    });
  }

}
