#### Procedimentos para Instalação

````
$ git clone https://github.com/wellsm/posts-ionic3.git
$ cd posts-ionic3
$ npm install
````

#### Configuração do FIREBASE

Crie o arquivo src/app/firebase.credentials.ts com o conteúdo abaixo, preencha com os dados da sua aplicação criada no Firebase

````
export const FIREBASE_CREDENTIALS = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};
````

Habilite também a Autenticação com Email/Senha no Firebase

