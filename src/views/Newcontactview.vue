<template>
    <div class="p-4">
      <h2>Add New Contact</h2>
      <form @submit.prevent="addContact">
        <input v-model="firstName" placeholder="First Name" required class="mb-2 p-2 block w-full" />
        <input v-model="lastName" placeholder="Last Name" required class="mb-2 p-2 block w-full" />
        <input v-model="email" placeholder="Email" required class="mb-2 p-2 block w-full" />
        <button type="submit" class="p-2 bg-blue-500 text-white">Save Contact</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  
  export default {
    setup() {
      const firstName = ref('')
      const lastName = ref('')
      const email = ref('')
  
      const addContact = () => {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || []
        const newContact = {
          id: Date.now(),
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
        }
        contacts.push(newContact)
        localStorage.setItem('contacts', JSON.stringify(contacts))
        window.location.href = '/'
      }
  
      return { firstName, lastName, email, addContact }
    }
  }
  </script>
  