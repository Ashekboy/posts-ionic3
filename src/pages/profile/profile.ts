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
    this.afAuth.auth.currentUser.updateProfile(user).then(() => {
      this.toastCtrl.create({ message: 'Usuário Atualizado', duration: 2000 }).present();
      this.navCtrl.setRoot('PostListPage');
    }).catch(err => {
      this.toastCtrl.create({ message: err.message, duration: 2000 }).present();
    });
  }

  takePicture() {
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
    this._CAMERA.getPicture(options).then(data => {
      let base64Image = 'data:image/jpeg;base64,' + data;
      return this.imageProvider.upload(base64Image, this.user.uid, this.user.photoURL);
    }).then(data => {
      alert(data);
      this.user.photoURL = data;
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
      ],
      enableBackdropDismiss: false
    }).present();
  }

}
