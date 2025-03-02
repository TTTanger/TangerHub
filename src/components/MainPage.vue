<template>
  <div class="main-page">
    <div class="header">
      <User v-if="user" ref="user" class="user"
        :id="user.id"
        :name="user.name"
        :email="user.email"
        :password="user.password"
        :avatar="user.avatar">
      </User>
      <div v-else class="loading">Loading user...</div>
      <NavBar class="nav-bar" />
    </div>

    <h1>Posts</h1>
    <div v-if="user">
      <ColorfulButton
        class="create-post-button"
        @click="togglePostCreate"
        :text="buttonText">
      </ColorfulButton>
    </div>

    <div v-if="startCreatePost" class="create-post">
      <CreatePost :user="user"/>
    </div>

    <div class="posts-container">
      <div v-if="postError" class="error">{{ error }}</div>
      <div v-else-if="loadingPost" class="loading">Loading posts...</div>
      <template v-else>
        <Post v-for="post in posts" :key="post.id" :id="String(post.id)" :author="post.author" :title="post.title"
          :content="post.content" :comments="post.comments" :imgs="post.imgs" :files="post.files" />
      </template>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import ColorfulButton from './ColorfulButton.vue';
import Post from './Post.vue';
import User from './User.vue';
import CreatePost from './CreatePost.vue';

import axios from 'axios';


export default {
  data() {
    return {
      user: null,
      posts: [],
      loadingPost: false,
      error: null,
      loginError: null,
      postError: null,
      buttonText: 'Create Post',
      startCreatePost: false,
    };
  },
  components: {
    NavBar,
    Post,
    ColorfulButton,
    User,
    CreatePost,
  },

  methods: {
    async fetchUser() {
      this.loginLoading = true;
      this.loginError = null;
      try {
        const response = await axios.get('/testdata/user.json');
        if (response.data && response.data.id) {
          this.user = response.data;
          console.log('User data:', this.user);
        }
        else {
          throw new Error('Invalid user data');
        }
      }
      catch (loginError) {
        this.loginError = 'Failed to load user. Please try again later.';
      }
    },
    async fetchPosts() {
      this.loadingPost = true;
      this.postError = null;
      try {
        const response = await axios.get('/testdata/testdata.json');
        if (response.data && Array.isArray(response.data)) {
          this.posts = response.data;
        } else {
          throw new Error('Invalid data structure');
        }
      } catch (error) {
        this.postError = 'Failed to load posts. Please try again later.';
        console.error('Failed to fetch posts:', error);
      } finally {
        this.loadingPost = false;
      }
    },
    togglePostCreate() {
      this.startCreatePost = !this.startCreatePost;
      this.buttonText = this.startCreatePost ? 'Cancel' : 'Create Post';
    },
  },

  mounted() {
    this.fetchUser();
    this.fetchPosts();
  }
};
</script>

<style scoped>
.header {
  position: sticky;
  align-items: center;
  display: flex;
  background-color: rgb(24, 167, 255);
  border-radius: 10px;
  padding: 0.5rem 1rem;
  top: 0;
  max-width: 800px;
  margin: 0 auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.user {
  position: relative;
  padding: 0.5rem 1rem;
  display: flex;
}

.nav-bar {
  flex: 1;
  display: flex;
  justify-content: center;
}

.create-post{
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.create-post-button {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.posts-container {
  max-width: 1000px;
  min-width: auto;
  margin: 0 auto;
  padding: 1rem 2rem;
  box-sizing: border-box;
}

.error {
  color: red;
  padding: 1em;
  text-align: center;
  border-radius: 4px;
  background-color: rgba(255, 0, 0, 0.1);
}

.loading {
  padding: 1em;
  text-align: center;
  color: #666;
}

@media (max-width: 768px) {
  .user-wrapper {
    margin-left: 1rem;
  }

  .posts-container {
    padding: 0 1rem;
  }
}
</style>
