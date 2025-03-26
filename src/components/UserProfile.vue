<template>
  <div class="user-container">
    <User v-if="user" ref="user" class="user"
      :id="user.id"
      :name="user.name"
      :email="user.email"
      :password="user.password"
      :avatar="user.avatar"
      @click="updateUserData"
      style="cursor: pointer">
    </User>
  </div>

  <div v-if="user" ref="user" class="user-profile">
    <p class="user-name">Name: {{ user.name }}</p>
    <p class="user-email">Email: {{ user.email }}</p>
    <p class="user-password">Password: {{ user.password }}</p>
    <p class="user-id">ID: {{ user.id }}</p>
  </div>
    <div v-else class="loading">Loading user...</div>
</template>

<script>

import User from './User.vue';
import axios from 'axios';

export default {
  data() {
    return {
      user: null,
      loginLoading: false,
    };
  },
  name: 'UserProfileComponent',
  components: {
    User,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    }
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
    updateUserData() {
      // 用于更新用户数据的方法

      console.log('Updated user data:', {
        id: this.id,
        name: this.name,
        password: this.password,
        avatar: this.avatar,
        email: this.email,
      });
    },
  },
  mounted() {
    this.fetchUser();
  },
}
</script>

<style scoped>
.user-container {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 1rem;
  object-fit: cover;
}

.user-name {
  font-weight: 600;
  color: #2c3e50;
}
</style>
