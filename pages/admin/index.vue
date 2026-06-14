<script setup lang="ts">
definePageMeta({
  layout: false
})

const { data: session } = await useFetch('/api/admin/session')

// Console sections. Each is filled in by its own Stage 1 worktree:
// Territories + Pipeline ship behind these links; `ready` flips on as they land.
const sections = [
  {
    title: 'Territories',
    href: '/admin/territories',
    description: 'Saved vertical + metro searches that drive Places ingest.',
    ready: true
  },
  {
    title: 'Pipeline',
    href: '/admin/pipeline',
    description: 'Sourced → scored → consult → live board for working Leads.',
    ready: true
  }
]

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
            Lead Engine
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

      <section class="flex flex-1 flex-col justify-center py-10">
        <p class="font-mono text-sm text-text-muted">
          Signed in as {{ session?.admin?.username }}.
        </p>

        <div class="mt-6 grid gap-4 sm:grid-cols-2">
          <NuxtLink
            v-for="section in sections"
            :key="section.href"
            :to="section.ready ? section.href : ''"
            :class="[
              'block border border-rule p-6 transition-colors',
              section.ready
                ? 'hover:border-accent hover:text-accent'
                : 'cursor-not-allowed opacity-50'
            ]"
          >
            <p class="font-display text-2xl font-semibold">
              {{ section.title }}
            </p>
            <p class="mt-2 font-serif text-text-secondary">
              {{ section.description }}
            </p>
            <p v-if="!section.ready" class="mt-3 font-mono text-mono-sm uppercase tracking-widest text-text-muted">
              Coming soon
            </p>
          </NuxtLink>
        </div>
      </section>
    </div>
  </main>
</template>
