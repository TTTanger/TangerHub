<template>
    <nav>
      <router-link to="/" @click="setActive('home')" :class="{ active: active === 'home' }">Home</router-link>
      <router-link to="/album" @click="setActive('album')" :class="{ active: active === 'album' }">Album</router-link>
      <router-link to="/chatai" @click="setActive('chatai')"
        :class="{ active: active === 'chatai' }">ChatAI</router-link>
      <router-link to="/friends" @click="setActive('friends')"
        :class="{ active: active === 'friends' }">Friends</router-link>
    </nav>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'NavBar',
  setup() {
    const active = ref('home')
    const x = ref(220)

    const setActive = (name) => {
      active.value = name
    }

    const onMousemove = (e) => {
      x.value = Math.min(Math.max(e.clientX, 220), 280)
    }

    return {
      active,
      setActive,
      x,
      onMousemove
    }
  }
}
</script>

<style scoped>

a {
  color: #000000;
  padding: 0.7em 1em;
  margin-right: 10px;
  border-radius: 6px;
  transition: background-color 0.3s;
}

a:hover {
  background-color: #93cbff;
}

.active {
  font-weight: bold;
  background-color: #93cbff;
  color: #fff;
}
</style>
