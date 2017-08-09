import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Post } from '../../models/post';
/**
 * Generated class for the PostListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-list',
  templateUrl: 'post-list.html',
})
export class PostListPage {

  postsRef$: FirebaseListObservable<Array<Post>>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private database: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    // Apontar postsRef$ para a lista contida no Firebase
    this.postsRef$ = this.database.list('posts');
  }

  getCommentCount(post: Post){
    if(post.comments === undefined) return '0 Comentários';

    let countComments = Object.keys(post.comments).length;

    return countComments == 1 ? '1 Commentário' : countComments + ' Comentários';
  }

  logout() {
    this.alertCtrl.create({
      title: 'Sair',
      message: 'Desejar Sair do Sistema?',
      buttons: [
        {
          text: 'Sim',
          handler: () => {
            this.afAuth.auth.signOut();
          }
        },
        {
          text: 'Não',
          role: 'cancel'
        }
      ]
    }).present();
  }

}
