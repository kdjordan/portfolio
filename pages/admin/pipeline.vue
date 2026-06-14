<script setup lang="ts">
import type { BoardCard } from '../../server/utils/receptionist/leads'

definePageMeta({ layout: 'admin' })

interface BoardResponse {
  board: BoardCard[]
}

const STAGES = [
  { id: 'sourced', label: 'Sourced' },
  { id: 'scored', label: 'Scored' },
  { id: 'hook_sent', label: 'Hook Sent' },
  { id: 'replied', label: 'Replied' },
  { id: 'consult', label: 'Consult' },
  { id: 'live', label: 'Live' },
  { id: 'churned', label: 'Churned' }
] as const

const { data } = await useFetch<BoardResponse>('/api/admin/leads/board')

const columns = computed(() =>
  STAGES.map((stage) => ({
    ...stage,
    cards: (data.value?.board ?? []).filter((card) => card.stage === stage.id)
  }))
)

function rating(value: number | null) {
  return value === null ? '—' : value.toFixed(1)
}

function score(value: number | null) {
  return value === null ? '—' : String(value)
}
</script>

<template>
  <div class="w-full">
    <header class="border-b-2 border-text-primary pb-4">
      <p class="font-mono text-label uppercase tracking-widest text-accent">
        Working leads
      </p>
      <h1 class="mt-2 font-display text-4xl font-semibold leading-none">
        Pipeline
      </h1>
      <p class="mt-2 font-serif text-text-secondary">
        Promote businesses from
        <NuxtLink to="/admin/businesses" class="text-accent hover:underline">Businesses</NuxtLink>;
        they land in Sourced and move right as you work them.
      </p>
    </header>

    <section class="mt-8 flex gap-px overflow-x-auto bg-rule pb-2">
      <div
        v-for="(column, index) in columns"
        :key="column.id"
        class="flex w-72 shrink-0 flex-col bg-bg-primary"
      >
        <div class="flex items-baseline justify-between border-b-2 border-text-primary px-3 pb-3 pt-1">
          <div class="flex items-baseline gap-2">
            <span class="font-mono text-mono-sm text-text-muted">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <h2 class="font-mono text-mono-sm font-semibold uppercase tracking-widest">
              {{ column.label }}
            </h2>
          </div>
          <span
            class="font-mono text-mono-sm"
            :class="column.cards.length ? 'text-accent' : 'text-text-muted'"
          >
            {{ column.cards.length }}
          </span>
        </div>

        <div class="flex flex-1 flex-col gap-3 p-3">
          <article
            v-for="card in column.cards"
            :key="card.leadId"
            class="border border-rule bg-bg-secondary p-4 transition-colors hover:border-accent"
          >
            <a
              v-if="card.website"
              :href="card.website"
              target="_blank"
              rel="noopener noreferrer"
              class="group/site inline-flex items-baseline gap-1 font-display text-lg font-semibold leading-tight transition-colors hover:text-accent"
            >
              {{ card.name }}
              <span class="font-mono text-mono-sm text-text-muted transition-colors group-hover/site:text-accent">↗</span>
            </a>
            <p v-else class="font-display text-lg font-semibold leading-tight">
              {{ card.name }}
            </p>
            <p class="mt-1 font-mono text-mono-sm text-text-muted">
              {{ card.phone ?? 'No phone' }}
            </p>
            <dl class="mt-3 grid grid-cols-3 gap-2 border-t border-rule pt-3 font-mono text-mono-sm">
              <div>
                <dt class="text-text-muted">Rating</dt>
                <dd class="mt-0.5">★ {{ rating(card.rating) }}</dd>
              </div>
              <div>
                <dt class="text-text-muted">Site</dt>
                <dd class="mt-0.5">{{ card.hasSite ? 'Yes' : 'No' }}</dd>
              </div>
              <div>
                <dt class="text-text-muted">Score</dt>
                <dd class="mt-0.5" :class="card.siteScore !== null ? 'text-accent' : ''">
                  {{ score(card.siteScore) }}
                </dd>
              </div>
            </dl>
          </article>

          <p
            v-if="!column.cards.length"
            class="border border-dashed border-rule px-3 py-6 text-center font-mono text-mono-sm text-text-muted"
          >
            Empty
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
