<template>
  <div class="reply">
    <div class="reply-header">
      <img :src="author.avatar" alt="Avatar" class="reply-avatar" />
      <h3>{{ author?.name }}</h3>
    </div>
    <form @submit.prevent="submitReply">
      <div class="reply-text">
        <input type="text" v-model="text" placeholder="Write a reply..." />
        <button @click="submitReply">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "ReplyComponent",
  props: {
    author: {
      type: Object,
      required: true,
    },
    data() {
      return {
        text: this.text || "", // Initialize text with an empty string
        time: new Date().toLocaleString(), // Add current time
      };
    },
  },
  methods: {
    submitReply() {
      // Logic to submit the reply
      console.log("Reply submitted:", this.text);
      this.text = ""; // Clear the input after submission
    },
  },
}
</script>

<style scoped>
.reply {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.reply-header {
  display: flex;
  align-items: center;
}

.reply-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.reply-text {
  margin: 10px 0;
}
</style>
