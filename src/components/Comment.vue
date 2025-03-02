<template>
  <div class="comment">
    <div class="comment-header">
      <img :src="author?.avatar" alt="avatar" class="comment-avatar" />
      <h4>{{ author?.name }}</h4>
    </div>
    <p class="comment-text">{{ text }}</p>
    <div class="comment-footer">
      <span class="comment-date">{{ date }}</span>
      <button class="comment-reply" @click="reply">Reply</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Comment",
  props: {
    author: {
      type: Object,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  methods: {
    reply() {
      this.$emit("reply");
    },
  },
};
</script>

<style scoped>
.comment {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comment-header {
  display: flex;
  align-items: center;
}

.comment-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.comment-text {
  margin: 10px 0;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.comment-date {
  font-size: 0.8em;
  color: #888;
}

.comment-reply {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}

.comment-reply:hover {
  background-color: #0056b3;
}
</style>