<script setup>
import { reactive } from 'vue';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const data = reactive({
  email: "",
  password: "",
  newEmail: "",
  newPassword: "",
  isLoggedIn: false,
  isLoading: true
});

const auth = getAuth();
const login = () => {
  signInWithEmailAndPassword(auth, data.email, data.password)
    .then((userCredential) => {
      alert("ログインに成功しました！");
    })
    .catch((err) => {
      console.log(err);
      alert("正しいログイン情報を入力してください");
    });
};

const signUp = () => {
  createUserWithEmailAndPassword(auth, data.newEmail, data.newPassword)
    .then((userCredential) => {
      alert("ユーザー作成に成功しました！");
    })
    .catch((err) => {
      console.log(err);
      alert("ユーザー作成に失敗しました");
    });
};

const logout = () => {
  signOut(auth);
};

onAuthStateChanged(auth, user => {
  data.isLoggedIn = user ? true : false;
  data.isLoading = false;
});
</script>

<template>
  <h1>Login Example</h1>
  <div v-if="data.isLoading" class="loading-area">
    Loading...
  </div>
  <div v-else-if="data.isLoggedIn" class="logout-area">
    <h2>ログアウト</h2>
    <div class="container">
      <button @click="logout">ログアウトする</button>
    </div>
  </div>
  <div v-else class="authentication-area">
    <h2>ログイン</h2>
    <div class="container">

      <div class="input-area">
        <label for="email">メールアドレス</label>
        <input id="email" type="text" name="email" v-model="data.email">
      </div>
      <div class="input-area">
        <label for="password">パスワード</label>
        <input id="password" type="password" name="password" v-model="data.password">
      </div>
      <div class="submit-area">
        <button class="login" @click="login">ログイン</button>
      </div>
    </div>

    <h2>新規作成</h2>
    <div class="container">

      <div class="input-area">
        <label for="new-email">メールアドレス</label>
        <input id="new-email" type="text" name="new-email" v-model="data.newEmail">
      </div>
      <div class="input-area">
        <label for="new-password">パスワード</label>
        <input id="new-password" type="password" name="new-password" v-model="data.newPassword">
      </div>
      <div class="submit-area">
        <button class="signUp" @click="signUp">ユーザーを作成</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .container {
    text-align: center;
  }
</style>
