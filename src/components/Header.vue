<template>
    <header class="bg-blue-600 p-4 text-white flex justify-between items-center">
      <h1>Contact Book</h1>
      <nav>
        <router-link to="/" class="mx-2">Home</router-link>
        <router-link to="/about" class="mx-2">About Us</router-link>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'Header',
  }
  </script>
  
  