import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';

import { Post } from '../../models/post';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';

/**
 * Generated class for the PostDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-detail',
  templateUrl: 'post-detail.html',
})
export class PostDetailPage {

  postSubscription: Subscription;
  postsRef$: FirebaseObjectObservable<Post>;
  commentsRef$: FirebaseListObservable<Array<Comment>>;
  post = {} as Post;
  comment = {} as Comment;
  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private database: AngularFireDatabase,
    private afAuth: AngularFireAuth) {
    // Pegando o ID do post passado como parametro
    const postId = this.navParams.get('id');
    
    // Atribuindo referencia a uma instancia de busca em posts do firebase
    this.postsRef$ = this.database.object(`posts/${postId}`);
    this.commentsRef$ = this.database.list(`posts/${postId}/comments`);
      
    // Pegando usuário
    this.user = User.fromJSON(this.afAuth.auth.currentUser);

    this.postSubscription = this.postsRef$.subscribe(post => {
      this.post = post;
    });
  }

  getFormatDate(created_at: string){
    let date = new Date(created_at);
    let month_names = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

    let day = date.getDate();
    let month = month_names[date.getMonth()];
    
    let hour = date.getHours().toString();

    if(Number(hour) < 10) hour = '0' + hour;

    let minutes = date.getMinutes();

    return `${day} de ${month} às ${hour}:${minutes}`; 
  }

  sendComment(comment: Comment){
    comment.user = this.user;
    
    // Adiciona a referencia de comentários desse post mais um comentário
    this.commentsRef$.push(comment);

    //Limpa o comentário para limpar o textarea
    this.comment.text = '';
    
  }

  ionViewWillLeave(){
    // Removendo observação para limpeza de dados em memória
    this.postSubscription.unsubscribe(); 
  }

}
