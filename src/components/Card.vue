<template>
  <div class="bg-white p-4 rounded shadow">
    <h2 class="text-lg font-bold text-green-700">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      required: false,
      default: null
    }
  }
}
</script>
