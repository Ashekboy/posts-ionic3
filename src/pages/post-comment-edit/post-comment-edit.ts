import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

import { Comment } from '../../models/comment';

/**
 * Generated class for the PostCommentEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-comment-edit',
  templateUrl: 'post-comment-edit.html',
})
export class PostCommentEditPage {

  commentSubscription: Subscription;
  commentsRef$: FirebaseObjectObservable<Comment>;
  comment = {} as Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    let postId = this.navParams.get('postId');
    let commentId = this.navParams.get('commentId');

    this.commentsRef$ = this.database.object(`posts/${postId}/comments/${commentId}`);

    this.commentSubscription = this.commentsRef$.subscribe(comment => {
      this.comment = comment;
    });
  }

  update(comment: Comment){
    this.commentsRef$.update(comment);
    this.navCtrl.pop();
  }

  ionViewWillLeave(){
    // Removendo observação para limpeza de dados em memória
    this.commentSubscription.unsubscribe(); 
  }

}
