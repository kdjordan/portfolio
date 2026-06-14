<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const router = useRouter()

const username = ref('')
const password = ref('')
const pending = ref(false)
const errorMessage = ref('')

const nextPath = computed(() => {
  const next = route.query.next
  return typeof next === 'string' && next.startsWith('/admin') ? next : '/admin'
})

async function logIn() {
  pending.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/admin/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    await router.push(nextPath.value)
  } catch (error) {
    errorMessage.value = 'Invalid admin credentials.'
  } finally {
    pending.value = false
  }
}
</script>

<template>
  <main class="min-h-screen bg-bg-primary px-6 py-10 text-text-primary md:px-16">
    <section class="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-sm flex-col justify-center">
      <p class="font-mono text-label uppercase tracking-widest text-accent">
        Local AI Receptionist
      </p>
      <h1 class="mt-4 font-display text-5xl font-semibold leading-none">
        Console
      </h1>

      <form class="mt-10 space-y-5" @submit.prevent="logIn">
        <label class="block">
          <span class="font-mono text-mono-sm uppercase tracking-widest text-text-muted">Username</span>
          <input
            v-model="username"
            autocomplete="username"
            class="mt-2 w-full border border-rule bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary outline-none focus:border-accent"
            required
            type="text"
          >
        </label>

        <label class="block">
          <span class="font-mono text-mono-sm uppercase tracking-widest text-text-muted">Password</span>
          <input
            v-model="password"
            autocomplete="current-password"
            class="mt-2 w-full border border-rule bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary outline-none focus:border-accent"
            required
            type="password"
          >
        </label>

        <p v-if="errorMessage" class="font-mono text-sm text-accent" role="alert">
          {{ errorMessage }}
        </p>

        <button
          class="w-full bg-text-primary px-4 py-3 font-mono text-sm uppercase tracking-widest text-bg-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="pending"
          type="submit"
        >
          {{ pending ? 'Signing in' : 'Sign in' }}
        </button>
      </form>
    </section>
  </main>
</template>
