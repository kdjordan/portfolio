<script setup lang="ts">
import type { PromotableBusiness } from '../../server/utils/receptionist/leads'

definePageMeta({ layout: 'admin' })

interface BusinessesResponse {
  businesses: PromotableBusiness[]
}

const { data, refresh } = await useFetch<BusinessesResponse>('/api/admin/businesses')

// Weakest online presence first — no site, then lowest-scoring sites, then
// unscored, then the healthy ones. That ordering surfaces the best leads up top.
const rows = computed(() => {
  const list = [...(data.value?.businesses ?? [])]
  return list.sort((a, b) => {
    if (a.hasSite !== b.hasSite) return a.hasSite - b.hasSite
    const sa = a.siteScore ?? 1000
    const sb = b.siteScore ?? 1000
    return sa - sb
  })
})

const withoutSite = computed(() => rows.value.filter((r) => !r.hasSite).length)

// Promote
const promotingId = ref<number | null>(null)
const rowError = ref<Record<number, string>>({})

async function promote(id: number) {
  promotingId.value = id
  rowError.value = { ...rowError.value, [id]: '' }
  try {
    await $fetch('/api/admin/leads/promote', { method: 'POST', body: { businessId: id } })
    await refresh()
  } catch {
    rowError.value = { ...rowError.value, [id]: 'Could not promote' }
  } finally {
    promotingId.value = null
  }
}

// Score — the endpoint works a 60s budget per call and returns `remaining`,
// so we loop until it drains. Cap the calls as a runaway guard.
const scoring = ref(false)
const scoreStatus = ref('')

async function scoreSites() {
  scoring.value = true
  let total = 0
  try {
    for (let call = 0; call < 30; call++) {
      const r = await $fetch<{ scored: number, failed: number, remaining: number }>(
        '/api/admin/score',
        { method: 'POST' }
      )
      total += r.scored
      scoreStatus.value = r.remaining > 0
        ? `Scoring… ${total} done, ${r.remaining} to go`
        : `Scored ${total}`
      if (r.remaining === 0) break
    }
    await refresh()
  } catch {
    scoreStatus.value = 'Scoring failed — try again'
  } finally {
    scoring.value = false
  }
}

function fmtRating(v: number | null) {
  return v === null ? '—' : `★ ${v.toFixed(1)}`
}
</script>

<template>
  <div class="mx-auto w-full max-w-5xl">
    <header class="flex flex-wrap items-end justify-between gap-4 border-b-2 border-text-primary pb-4">
      <div>
        <p class="font-mono text-label uppercase tracking-widest text-accent">
          Sourced
        </p>
        <h1 class="mt-2 font-display text-4xl font-semibold leading-none">
          Businesses
        </h1>
        <p class="mt-2 font-serif text-text-secondary">
          <template v-if="rows.length">
            <span class="text-text-primary">{{ rows.length }}</span> sourced ·
            <span class="text-accent">{{ withoutSite }}</span> with no site
          </template>
          <template v-else>Run a territory to source businesses.</template>
        </p>
      </div>

      <div class="flex flex-col items-end gap-2">
        <button
          class="border border-rule px-4 py-2 font-mono text-mono-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
          :disabled="scoring || !rows.length"
          type="button"
          @click="scoreSites"
        >
          {{ scoring ? 'Scoring…' : 'Score sites' }}
        </button>
        <p v-if="scoreStatus" class="font-mono text-mono-sm text-text-muted">
          {{ scoreStatus }}
        </p>
      </div>
    </header>

    <div v-if="rows.length" class="mt-2 overflow-x-auto">
      <table class="w-full border-collapse text-left">
        <thead>
          <tr class="border-b border-rule font-mono text-mono-sm uppercase tracking-widest text-text-muted">
            <th class="py-3 pr-4 font-normal">Business</th>
            <th class="px-4 py-3 font-normal">Rating</th>
            <th class="px-4 py-3 font-normal">Web presence</th>
            <th class="py-3 pl-4 text-right font-normal">Action</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-rule">
          <tr
            v-for="row in rows"
            :key="row.id"
            class="align-top transition-colors hover:bg-bg-secondary"
          >
            <td class="py-4 pr-4">
              <a
                v-if="row.website"
                :href="row.website"
                target="_blank"
                rel="noopener noreferrer"
                class="group/site inline-flex items-baseline gap-1 font-display text-lg font-semibold leading-tight transition-colors hover:text-accent"
              >
                {{ row.name }}
                <span class="font-mono text-mono-sm text-text-muted transition-colors group-hover/site:text-accent">↗</span>
              </a>
              <p v-else class="font-display text-lg font-semibold leading-tight">{{ row.name }}</p>
              <p class="mt-0.5 font-mono text-mono-sm text-text-muted">{{ row.phone ?? 'No phone' }}</p>
              <p v-if="rowError[row.id]" class="mt-1 font-mono text-mono-sm text-accent">{{ rowError[row.id] }}</p>
            </td>
            <td class="px-4 py-4 font-mono text-mono-sm text-text-secondary">
              {{ fmtRating(row.rating) }}
            </td>
            <td class="px-4 py-4">
              <span
                v-if="!row.hasSite"
                class="inline-block bg-accent px-2 py-1 font-mono text-mono-sm uppercase tracking-widest text-bg-primary"
              >
                No site
              </span>
              <span
                v-else-if="row.siteScore === null"
                class="font-mono text-mono-sm text-text-muted"
              >
                Has site · unscored
              </span>
              <span v-else class="font-mono text-mono-sm">
                <span
                  class="text-2xl font-semibold"
                  :class="row.siteScore < 50 ? 'text-accent' : 'text-text-primary'"
                >{{ row.siteScore }}</span>
                <span class="text-text-muted">/100{{ row.siteScore < 50 ? ' · weak' : '' }}</span>
              </span>
            </td>
            <td class="py-4 pl-4 text-right">
              <button
                class="bg-text-primary px-4 py-2 font-mono text-mono-sm uppercase tracking-widest text-bg-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="promotingId === row.id"
                type="button"
                @click="promote(row.id)"
              >
                {{ promotingId === row.id ? 'Promoting' : 'Promote' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-else class="mt-10 max-w-prose font-serif text-lg text-text-secondary">
      No sourced businesses yet. Head to
      <NuxtLink to="/admin/territories" class="text-accent hover:underline">Territories</NuxtLink>,
      save a vertical + metro, and hit Run to pull businesses from Google Places.
    </p>
  </div>
</template>
