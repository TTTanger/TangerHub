<template>
  <button @click="$router.go(-1)">Back</button>
</template>

<script>
export default {
  name: 'BackButton',
}
</script>

<style scoped>
button {
  background-color: #1c9cf1;
  border: none;
  color: white;
  padding: 8px 20px;
  text-align: center;
  font-size: 16px;
  cursor: pointer;
  border-radius: 12px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>