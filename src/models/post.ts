import { User } from './user';
import { Comment } from './comment';

export interface Post {
    $key?: string;
    content: string;
    created_at: number;
    updated_at: number;

    user: User;
    comments: Array<Comment>;
}