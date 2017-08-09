/*
{
    "uid":"krd77wwTn6NhCYgGNyPb72cFmb72",
    "displayName":null,
    "photoURL":null,
    "email":"wellingtonsdsm@gmail.com",
    "emailVerified":false,
    "phoneNumber":null
}
*/
export class User {
    uid: string;
    displayName: string;
    photoURL: string;
    email: string;
    emailVerified: boolean;

    constructor(obj?: User) {
        this.uid = obj.uid;
        this.displayName = obj.displayName;
        this.photoURL = obj.photoURL;
        this.email = obj.email;
        this.emailVerified = obj.emailVerified;
    }

    static fromJSON(obj?: User): User {
        return new User(obj);
    }

}