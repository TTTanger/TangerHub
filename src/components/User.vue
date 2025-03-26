<template>
  <div class="user-container">
    <img :src="avatar" alt="Avatar" class="user-avatar" />
    <div class="user-name">{{ name }}</div>
  </div>
</template>

<script>
export default {
  name: 'User-component',
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
