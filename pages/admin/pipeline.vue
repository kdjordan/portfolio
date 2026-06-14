<script setup lang="ts">
import type { BoardCard, PromotableBusiness } from '../../server/utils/receptionist/leads'

definePageMeta({
  layout: false
})

interface BoardResponse {
  board: BoardCard[]
  candidates: PromotableBusiness[]
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

const { data, refresh } = await useFetch<BoardResponse>('/api/admin/leads/board')

const columns = computed(() =>
  STAGES.map((stage) => ({
    ...stage,
    cards: (data.value?.board ?? []).filter((card) => card.stage === stage.id)
  }))
)

const candidates = computed(() => data.value?.candidates ?? [])

const promoteOpen = ref(false)
const promotingId = ref<number | null>(null)
const promoteError = ref('')

async function promote(businessId: number) {
  promotingId.value = businessId
  promoteError.value = ''
  try {
    await $fetch('/api/admin/leads/promote', {
      method: 'POST',
      body: { businessId }
    })
    await refresh()
  } catch (error) {
    promoteError.value = 'Could not promote that business. It may already be a lead.'
  } finally {
    promotingId.value = null
  }
}

function rating(value: number | null) {
  return value === null ? '—' : value.toFixed(1)
}

function score(value: number | null) {
  return value === null ? '—' : String(value)
}
</script>

<template>
  <main class="min-h-screen bg-bg-primary px-6 py-8 text-text-primary md:px-12">
    <div class="mx-auto flex w-full max-w-[110rem] flex-col">
      <header class="flex flex-wrap items-end justify-between gap-4 border-b border-rule pb-5">
        <div>
          <NuxtLink
            to="/admin"
            class="font-mono text-mono-sm uppercase tracking-widest text-text-muted transition-colors hover:text-accent"
          >
            ← Console
          </NuxtLink>
          <h1 class="mt-3 font-display text-4xl font-semibold leading-none">
            Pipeline
          </h1>
          <p class="mt-2 font-serif text-text-secondary">
            Sourced → scored → consult → live. Read-only board of working Leads.
          </p>
        </div>
        <button
          class="border border-rule px-4 py-2 font-mono text-mono-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent"
          type="button"
          @click="promoteOpen = !promoteOpen"
        >
          {{ promoteOpen ? 'Close' : 'Promote' }} ({{ candidates.length }})
        </button>
      </header>

      <!-- Promote drawer -->
      <section
        v-if="promoteOpen"
        class="mt-6 border border-rule bg-bg-secondary p-6"
      >
        <p class="font-mono text-label uppercase tracking-widest text-accent">
          Promote to Lead
        </p>
        <p class="mt-2 font-serif text-text-secondary">
          Businesses with no Lead yet. Promoting drops them into the Sourced column.
        </p>

        <p v-if="promoteError" class="mt-3 font-mono text-mono-sm text-accent" role="alert">
          {{ promoteError }}
        </p>

        <ul v-if="candidates.length" class="mt-5 divide-y divide-rule border-t border-rule">
          <li
            v-for="candidate in candidates"
            :key="candidate.id"
            class="flex flex-wrap items-center justify-between gap-3 py-3"
          >
            <div class="min-w-0">
              <p class="truncate font-display text-lg font-semibold">
                {{ candidate.name }}
              </p>
              <p class="font-mono text-mono-sm text-text-muted">
                {{ candidate.phone ?? 'No phone' }}
                · ★ {{ rating(candidate.rating) }}
                · {{ candidate.hasSite ? 'has site' : 'no site' }}
                · score {{ score(candidate.siteScore) }}
              </p>
            </div>
            <button
              class="shrink-0 bg-text-primary px-4 py-2 font-mono text-mono-sm uppercase tracking-widest text-bg-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
              :disabled="promotingId === candidate.id"
              type="button"
              @click="promote(candidate.id)"
            >
              {{ promotingId === candidate.id ? 'Promoting' : 'Promote' }}
            </button>
          </li>
        </ul>

        <p v-else class="mt-5 font-mono text-mono-sm text-text-muted">
          Every sourced business is already a Lead.
        </p>
      </section>

      <!-- Board -->
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
              <p class="font-display text-lg font-semibold leading-tight">
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
  </main>
</template>
