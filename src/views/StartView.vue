<template>
  <div class="p-4">
    <input v-model="filter" placeholder="Search by name" class="p-2 mb-4 w-full" />
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id" class="mb-2">
        <router-link :to="{ name: 'contact-details', params: { id: contact.id } }">
          {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>
      </li>
    </ul>
    <router-link to="/new" class="block mt-4 text-blue-500">Add New Contact</router-link>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  setup() {
    const contacts = ref([])

    onMounted(() => {
      const storedContacts = JSON.parse(localStorage.getItem('contacts')) || []
      contacts.value = storedContacts
    })

    const filter = ref('')
    const filteredContacts = computed(() => {
      return contacts.value.filter(contact => 
        contact.firstName.toLowerCase().includes(filter.value.toLowerCase()) ||
        contact.lastName.toLowerCase().includes(filter.value.toLowerCase())
      )
    })

    return { contacts, filter, filteredContacts }
  }
}
</script>
