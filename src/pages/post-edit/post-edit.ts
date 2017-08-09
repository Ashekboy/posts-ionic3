import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Subscription } from 'rxjs/Subscription';

import { Post } from '../../models/post';

/**
 * Generated class for the PostEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-post-edit',
  templateUrl: 'post-edit.html',
})
export class PostEditPage {

  postSubscription: Subscription;
  postsRef$: FirebaseObjectObservable<Post>;
  post = {} as Post;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: AngularFireDatabase) {
    // Pegando o ID do post passado como parametro
    const postId = this.navParams.get('id');
    
    // Atribuindo referencia a uma instancia de busca em posts do firebase
    this.postsRef$ = this.database.object(`posts/${postId}`);

    this.postSubscription = this.postsRef$.subscribe(post => {
      this.post = post;
    });
  }

  update(post: Post){
    post.updated_at = new Date().getTime();
    this.postsRef$.update(post);
    this.navCtrl.popToRoot();
  }

  ionViewWillLeave(){
    // Removendo observação para limpeza de dados em memória
    this.postSubscription.unsubscribe(); 
  }

}
