import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, ActionSheetController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImageProvider } from '../../providers/image/image';

import { User } from '../../models/user';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User;

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public actionSheetCtrl: ActionSheetController,
    private imageProvider: ImageProvider,
    private _CAMERA: Camera,
    private afAuth: AngularFireAuth) {
    // Atribuindo a variavel user: Usuário Conectado
    this.user = User.fromJSON(this.afAuth.auth.currentUser);
  }

  update(user: User) {
    // Cria referencia, poderia ser chamado diretamente
    let userRef$ = this.afAuth.auth.currentUser;
    // Atualiza apenas Nome e Foto
    userRef$.updateProfile(user).then(() => {
      // Atualiza email e aguarda apenas por erro
      userRef$.updateEmail(user.email).catch(err => {
        this.toastCtrl.create({ message: err.message, duration: 2000 }).present();
      });
      // Seta a página inicial para a lista de Posts
      this.navCtrl.setRoot('PostListPage');
    }).catch(err => {
      // Exibe um TOAST de erro se houver
      this.toastCtrl.create({ message: err.message, duration: 2000 }).present();
    });
  }

  takePicture() {
    // OPções para Chamar a Camera
    const takePictureOptions: CameraOptions = {
      quality: 50,
      sourceType: this._CAMERA.PictureSourceType.CAMERA,
      destinationType: this._CAMERA.DestinationType.DATA_URL,
      encodingType: this._CAMERA.EncodingType.JPEG,
      mediaType: this._CAMERA.MediaType.PICTURE
    };
    
    this.getPicture(takePictureOptions);
  }

  selectPicture() {
    // Opções para chamar a Galeria
    const choosePictureOptions: CameraOptions = {
      quality: 50,
      sourceType: this._CAMERA.PictureSourceType.PHOTOLIBRARY,
      destinationType: this._CAMERA.DestinationType.DATA_URL,
      encodingType: this._CAMERA.EncodingType.JPEG,
      mediaType: this._CAMERA.MediaType.PICTURE
    };

    this.getPicture(choosePictureOptions);
  }

  getPicture(options: CameraOptions) {
    // Chama a camera ou Galeria de acordo com opções
    this._CAMERA.getPicture(options).then(data => {
      // Retorna em base64 a foto capturada
      let base64Image = 'data:image/jpeg;base64,' + data;
      //Efetua o upload da imagem no firebase e retorna o erro ou sucesso
      return this.imageProvider.upload(base64Image, this.user.uid, this.user.photoURL);
    }).then(data => {
      alert(JSON.stringify(data));
      this.user.photoURL = data;
      // Atualiza o usuário
      this.update(this.user);
    });
  }

  changePicture() {
    this.actionSheetCtrl.create({
      buttons: [
        {
          text: 'Escolher',
          icon: 'images',
          handler: () => {
            this.selectPicture();
          }
        },
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Cancelar',
          icon: 'close-circle',
          role: 'cancel'
        }
      ]
    }).present();
  }

}
