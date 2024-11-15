<template>
  <div class="p-4">
    <h2 v-if="contact">{{ contact.firstName }} {{ contact.lastName }}</h2>
    <p v-if="contact">Email: {{ contact.email }}</p>

    <!-- Edit form, shown conditionally if in edit mode -->
    <div v-if="contact && isEditing" class="mt-4">
      <input
        v-model="contact.firstName"
        placeholder="First Name"
        class="border p-2 mb-2 w-full"
      />
      <input
        v-model="contact.lastName"
        placeholder="Last Name"
        class="border p-2 mb-2 w-full"
      />
      <input
        v-model="contact.email"
        placeholder="Email"
        class="border p-2 mb-2 w-full"
      />
      <button @click="saveContact" class="bg-green-500 text-white p-2 mr-2">
        Save
      </button>
      <button @click="cancelEdit" class="bg-gray-300 text-black p-2">
        Cancel
      </button>
    </div>

    <!-- Display Edit and Delete buttons if not in edit mode -->
    <div v-else-if="contact">
      <button @click="enableEdit" class="mt-2 bg-blue-500 text-white p-2 mr-2">
        Edit
      </button>
      <button @click="deleteContact" class="mt-2 bg-red-500 text-white p-2">
        Delete
      </button>
    </div>

    <!-- Fallback message if no contact is found -->
    <div v-else>
      <p>Contact not found.</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const contact = ref(null)
    const isEditing = ref(false) // Tracks if edit mode is active

    onMounted(() => {
      const contacts = JSON.parse(localStorage.getItem('contacts')) || []
      contact.value = contacts.find(c => c.id == route.params.id)

      // Check if contact is found, otherwise display a fallback message
      if (!contact.value) {
        alert("Contact not found.")
      }
    })

    const enableEdit = () => {
      isEditing.value = true // Enables edit mode
    }

    const cancelEdit = () => {
      isEditing.value = false // Disables edit mode without saving
      const contacts = JSON.parse(localStorage.getItem('contacts')) || []
      contact.value = contacts.find(c => c.id == route.params.id)
    }

    const saveContact = () => {
      let contacts = JSON.parse(localStorage.getItem('contacts')) || []
      const index = contacts.findIndex(c => c.id == route.params.id)
      if (index !== -1) {
        contacts[index] = contact.value // Update contact in the list
        localStorage.setItem('contacts', JSON.stringify(contacts)) // Save to local storage
      }
      isEditing.value = false // Exit edit mode
    }

    const deleteContact = () => {
      let contacts = JSON.parse(localStorage.getItem('contacts')) || []
      contacts = contacts.filter(c => c.id != route.params.id)
      localStorage.setItem('contacts', JSON.stringify(contacts))
      router.push('/') // Redirect to home page
    }

    return { contact, isEditing, enableEdit, cancelEdit, saveContact, deleteContact }
  }
}
</script>
