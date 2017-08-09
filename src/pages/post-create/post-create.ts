import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

import { Post } from '../../models/post';
import { User } from '../../models/user';
/**
 * Generated class for the PostCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-create',
  templateUrl: 'post-create.html',
})
export class PostCreatePage {

  postsRef$: FirebaseListObservable<Array<Post>>;
  post = {} as Post;
  user = {} as User;

  constructor(
    public navCtrl: NavController, 
    private database: AngularFireDatabase, 
    private afAuth: AngularFireAuth) {
    this.postsRef$ = this.database.list('posts');
    this.user = User.fromJSON(this.afAuth.auth.currentUser);
  }

  store(post: Post){
    // Adicionar na lista de posts do firebase um novo post
    this.postsRef$.push({
      content: post.content,
      created_at: new Date().getTime(),
      updated_at: new Date().getTime(),
      user: this.user
    });

    // Resetando a instancia de post
    this.post = {} as Post;

    // Retornando para a lista de posts
    this.navCtrl.pop();
  }

}
