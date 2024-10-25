<script setup>
  import { reactive } from 'vue';
  import { getDatabase, onValue, push, ref } from "firebase/database";

  const data = reactive({
    input: "",
    messages: []
  })

  const db = getDatabase();
  onValue(ref(db, 'message'), (snapshot) => {
    data.messages = [];
    for (const i in snapshot.val()) {
      data.messages.push(snapshot.val()[i])
    }
  });

  const sendMessage = () => {
    if (data.input === "") return;
    push(ref(db, "message"), data.input);
    data.messages.push(data.input);
    data.input = "";
  }
</script>

<template>
  <h1>Realtime Database Example</h1>

  <div class="container">
    <div class="message-area">
      <div class="flex-container" v-for="(message, index) in data.messages " :key="index">
        <div class="number">
          {{index + 1}}
        </div>
        <div class="message">
          {{message}}
        </div>
      </div>
    </div>

    <div class="input-area">
      <p class="input-title">
        テキストを入力
      </p>
      <input type="text" name="message" v-model="data.input">
      <button class="send-message" @click="sendMessage">送信</button>
    </div>
  </div>
</template>

<style scoped>
  .container {
    text-align: center;
  }
  .message-area {
    text-align: center;
  }
  .flex-container {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
  }
</style>