import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PostCommentEditPage } from './post-comment-edit';

@NgModule({
  declarations: [
    PostCommentEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PostCommentEditPage),
  ],
})
export class PostCommentEditPageModule {}
