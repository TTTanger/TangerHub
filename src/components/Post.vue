<template>
  <div class="post">
    <div class="post-header">
      <div class="author">
        <img :src="author?.avatar" alt="Avatar" />
        <p>{{ author?.name }}</p>
      </div>
      <div class="post-id">
        <span>ID: {{ id }}</span>
      </div>
    </div>

    <div class="post-content">
    <h2 class="post-title">{{ title }}</h2>
      <transition name="fade">
        <p v-if="content" :class="{ 'post-text': true, 'clamped': !expanded }">{{ content }}</p>
      </transition>
    </div>

    <div class="pics-container">
      <div class="pics-grid">
        <img v-for="(img, index) in imgs.slice(0, 9)" :key="index" v-lazy="img" alt="Img" />
      </div>
    </div>

    <transition name="slide">
      <div class="files-container" v-if="files && files.length > 0">
        <h3>Attachments</h3>
        <div class="files-list">
          <div v-for="(file, index) in files" :key="`file-${index}`" class="file-item" @click="downloadFile(file)">
            <i class="file-icon"></i>
            <span class="file-name">{{ getFileName(file) }}</span>
          </div>
        </div>
      </div>
    </transition>

    <button class="reply-button" @click="startReply">Reply</button>

    <div class="expand-button-container">
      <button class="expand-button" @click="toggleExpand">{{ expanded ? '收起' : '展开' }}</button>
    </div>
    <transition name="slide">
      <Reply v-if="startReply" :author="author"/>
    </transition>

    <transition name="slide">
      <div class="comments-container" v-if="expanded">
        <h3>Comments</h3>
        <div v-if="isLoadingComments" class="loading">Loading comments...</div>
        <template v-else>
          <Comment v-for="comment in comments" :key="comment.id" :author="comment.author" :text="comment.content"
            :date="comment.date" />
        </template>
      </div>
    </transition>
  </div>
</template>

<script>
import Comment from './Comment.vue';
import Reply from './Reply.vue';

export default {
  name: 'Post-component',
  components: {
    Reply,
    Comment,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    comments: {
      type: Object,
      required: true,
    },
    imgs: {
      type: Array,
      required: true,
    },
    files: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      expanded: false,
      isLoadingComments: false,
    };
  },
  methods: {
    toggleExpand() {
      this.expanded = !this.expanded;
    },
    downloadFile(file) {
      if (file.url) {
        window.open(file.url, '_blank');
      }
    },
    getFileName(file) {
      return file.name || file.url.split('/').pop();
    },
    async fetchComments() {
      this.isLoadingComments = true;
      try {
        // TODO: Implement API call to fetch comments
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated delay
        console.log("Fetched comments.");
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        this.isLoadingComments = false;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-out;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.post {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1em 1.5em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

.author {
  display: flex;
  align-items: center;
}

.author img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.post-id {
  font-size: 0.9em;
  color: #888;
}

.post-content {
  margin-bottom: 1em;
}

.post-title {
  text-align: center;
}

.post-text {
  transition: all 0.3s ease;
  text-align: left;
  max-height: 1000px;
}

.post-text.clamped {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  overflow: hidden;
}

.expand-button-container {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1em;
}

.expand-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 0.5em 1em;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.expand-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.pics-container {
  margin-bottom: 1em;
}

.pics-container .pics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1em;
}

.pics-container img {
  width: 100%;
  height: auto;
  margin: auto;
  border-radius: 4px;
}

.comments-container {
  margin-top: 1em;
}

.comment {
  margin-bottom: 1em;
  text-align: left;
}

.comment p {
  margin: 0;
}
</style>
