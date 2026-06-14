<script setup lang="ts">
const route = useRoute()
const { data: session } = await useFetch('/api/admin/session')

const nav = [
  { n: '01', label: 'Overview', to: '/admin' },
  { n: '02', label: 'Territories', to: '/admin/territories' },
  { n: '03', label: 'Businesses', to: '/admin/businesses' },
  { n: '04', label: 'Pipeline', to: '/admin/pipeline' }
]

function isActive(to: string) {
  return to === '/admin' ? route.path === '/admin' : route.path.startsWith(to)
}

async function logOut() {
  await $fetch('/api/admin/logout', { method: 'POST' })
  await navigateTo('/admin/login')
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-bg-primary text-text-primary md:flex-row">
    <aside
      class="flex shrink-0 flex-col gap-8 border-b border-rule bg-bg-tertiary px-5 py-6 md:min-h-screen md:w-64 md:border-b-0 md:border-r"
    >
      <NuxtLink to="/admin" class="block">
        <p class="font-mono text-label uppercase tracking-[0.25em] text-accent">
          Lead Engine
        </p>
        <p class="mt-1 font-display text-3xl font-semibold leading-none">
          Console
        </p>
      </NuxtLink>

      <nav class="flex gap-1 overflow-x-auto md:flex-1 md:flex-col md:overflow-visible">
        <NuxtLink
          v-for="item in nav"
          :key="item.to"
          :to="item.to"
          class="group relative flex items-baseline gap-3 whitespace-nowrap px-3 py-2.5 transition-colors md:border-l-2"
          :class="isActive(item.to)
            ? 'text-accent md:border-accent'
            : 'text-text-secondary md:border-transparent hover:text-accent'"
        >
          <span class="font-mono text-mono-sm tabular-nums opacity-60">{{ item.n }}</span>
          <span class="font-mono text-mono-sm font-semibold uppercase tracking-widest">{{ item.label }}</span>
        </NuxtLink>
      </nav>

      <div class="hidden border-t border-rule pt-5 md:block">
        <p class="font-mono text-mono-sm text-text-muted">
          Signed in as
        </p>
        <p class="font-mono text-mono-sm text-text-secondary">
          {{ session?.admin?.username ?? '—' }}
        </p>
        <button
          class="mt-3 w-full border border-rule px-3 py-2 font-mono text-mono-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
          type="button"
          @click="logOut"
        >
          Logout
        </button>
      </div>

      <button
        class="ml-auto shrink-0 self-center border border-rule px-3 py-2 font-mono text-mono-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent md:hidden"
        type="button"
        @click="logOut"
      >
        Logout
      </button>
    </aside>

    <main class="min-w-0 flex-1 px-6 py-8 md:px-12">
      <slot />
    </main>
  </div>
</template>
