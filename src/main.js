import { createApp } from 'vue';
import App from './App.vue';
import VueRouter from "./router/index";

import "bootstrap/dist/css/bootstrap.min.css" ;

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAoH3zzPq_ILpYzyCXegzsDPlKlGvrOpC8",
  authDomain: "vite-project-97d06.firebaseapp.com",
  databaseURL: "https://vite-project-97d06-default-rtdb.firebaseio.com",
  projectId: "vite-project-97d06",
  storageBucket: "vite-project-97d06.appspot.com",
  messagingSenderId: "748871460171",
  appId: "1:748871460171:web:dea4ee681b14149d49b4ce"
};

const app = initializeApp(firebaseConfig);

createApp(App).use(VueRouter).mount('#app');
