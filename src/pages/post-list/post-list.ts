import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Post } from '../../models/post';

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
    // Se não houver nenhum comentário no Node no Firebase
    if(post.comments === undefined) return '0 Comentários';
    
    // Conta o número de propriedades no node, Firebase guarda propriedades a cada adição e não posições
    let countComments = Object.keys(post.comments).length;

    // Se 1 retorna no singular, senão plural
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
            // Efetua logout e redireciona para a Tela informada no Observable em app.component
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
