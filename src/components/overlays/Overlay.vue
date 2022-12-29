<template>
  <div class="fixed top-0 left-0 z-50 shadow w-screen h-screen">
    <div class="w-full h-full bg-opacity-70 bg-gray-800" @click="$emit('close')"></div>
    <div class="m-10 absolute top-0 left-0 right-0 bottom-0">
      <div class="bg-brown-800 border-2 border-brown-700 outline outline-brown-900 p-4 rounded w-full h-full">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
