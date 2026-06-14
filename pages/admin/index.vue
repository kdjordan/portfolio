<script setup lang="ts">
import type { BoardCard, PromotableBusiness } from '../../server/utils/receptionist/leads'

definePageMeta({ layout: 'admin' })

interface Territory { id: number }
interface BoardResponse { board: BoardCard[], candidates: PromotableBusiness[] }

const { data: territories } = await useFetch<Territory[]>('/api/admin/territories')
const { data: board } = await useFetch<BoardResponse>('/api/admin/leads/board')

const stats = computed(() => [
  { n: territories.value?.length ?? 0, label: 'Territories', to: '/admin/territories' },
  { n: board.value?.candidates?.length ?? 0, label: 'Sourced', to: '/admin/businesses' },
  { n: board.value?.board?.length ?? 0, label: 'Leads', to: '/admin/pipeline' }
])
</script>

<template>
  <div class="mx-auto w-full max-w-5xl">
    <header class="border-b-2 border-text-primary pb-4">
      <p class="font-mono text-label uppercase tracking-widest text-accent">
        Overview
      </p>
      <h1 class="mt-2 font-display text-4xl font-semibold leading-none">
        Lead engine
      </h1>
    </header>

    <p class="mt-6 max-w-prose font-serif text-lg text-text-secondary">
      Find local businesses with a weak or missing web presence, score the gap,
      and work them toward a paid consult.
    </p>

    <dl class="mt-10 grid grid-cols-3 border-y border-rule">
      <NuxtLink
        v-for="(stat, i) in stats"
        :key="stat.label"
        :to="stat.to"
        class="group py-7 transition-colors hover:bg-bg-secondary"
        :class="i > 0 ? 'border-l border-rule pl-6' : ''"
      >
        <dd class="font-display text-6xl font-semibold leading-none tabular-nums">
          {{ stat.n }}
        </dd>
        <dt class="mt-3 font-mono text-mono-sm uppercase tracking-widest text-text-muted transition-colors group-hover:text-accent">
          {{ stat.label }} →
        </dt>
      </NuxtLink>
    </dl>

    <p class="mt-8 font-mono text-mono-sm uppercase tracking-widest text-text-muted">
      Sourced → scored → hook sent → replied → consult → live
    </p>
  </div>
</template>
