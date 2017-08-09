import { User } from './user';

export class Comment {
    $key?: string;
    text: string;

    user: User;
}