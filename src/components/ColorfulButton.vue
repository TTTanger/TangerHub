<template>
  <button class="colorfulbutton" :style="{ backgroundColor: `hsl(${hue}, 80%, 70%)` }" @mousemove="onMousemove"
    @mouseleave="resetHue">
    <h3 class="text">{{ text }}</h3>
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      hue: 200,
      baseHue: 200,
      maxHue: 280
    }
  },
  methods: {
    onMousemove(e) {
      const rect = e.target.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percentage = x / width;
      this.hue = this.baseHue + (this.maxHue - this.baseHue) * percentage;
    },
    resetHue() {
      this.hue = this.baseHue;
    }
  }
}
</script>

<style scoped>
.colorfulbutton {
  padding: 1em;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: 0.3s background-color ease;
}

.colorfulbutton:hover {
  background-color: #ddd;
}
</style>
