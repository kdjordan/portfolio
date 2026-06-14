<script setup lang="ts">
definePageMeta({
  layout: false
})

const { data: session } = await useFetch('/api/admin/session')

async function logOut() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>

<template>
  <main class="min-h-screen bg-bg-primary px-6 py-8 text-text-primary md:px-16">
    <div class="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl flex-col">
      <header class="flex items-center justify-between border-b border-rule pb-5">
        <div>
          <p class="font-mono text-label uppercase tracking-widest text-accent">
            Local AI Receptionist
          </p>
          <h1 class="mt-2 font-display text-4xl font-semibold leading-none">
            Console
          </h1>
        </div>
        <button
          class="border border-rule px-4 py-2 font-mono text-mono-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
          type="button"
          @click="logOut"
        >
          Logout
        </button>
      </header>

      <section class="flex flex-1 items-center">
        <div>
          <p class="font-serif text-2xl text-text-secondary">
            Authenticated Console shell.
          </p>
          <p class="mt-3 font-mono text-sm text-text-muted">
            Signed in as {{ session?.admin?.username }}.
          </p>
        </div>
      </section>
    </div>
  </main>
</template>
