<script setup lang="ts">
definePageMeta({ layout: 'admin' })

interface TerritoryRecord {
  id: number
  vertical: string
  metro: string
  createdAt: string
  lastRunAt: string | null
}

const METRO_PRESETS = ['Eugene', 'Springfield', 'Salem', 'Portland OR']

const { data: territories, refresh } = await useFetch<TerritoryRecord[]>('/api/admin/territories')

const vertical = ref('')
const metro = ref('')
const addPending = ref(false)
const addError = ref('')

// Per-row run state, keyed by territory id.
const runningId = ref<number | null>(null)
const runResult = ref<Record<number, string>>({})

async function addTerritory() {
  addError.value = ''
  if (!vertical.value.trim() || !metro.value.trim()) {
    addError.value = 'Vertical and metro are required.'
    return
  }

  addPending.value = true
  try {
    await $fetch('/api/admin/territories', {
      method: 'POST',
      body: { vertical: vertical.value, metro: metro.value }
    })
    vertical.value = ''
    metro.value = ''
    await refresh()
  } catch (error: any) {
    addError.value = error?.statusMessage ?? 'Could not add territory.'
  } finally {
    addPending.value = false
  }
}

async function deleteTerritory(id: number) {
  await $fetch(`/api/admin/territories/${id}`, { method: 'DELETE' })
  delete runResult.value[id]
  await refresh()
}

async function runTerritory(id: number) {
  runningId.value = id
  runResult.value = { ...runResult.value, [id]: '' }
  try {
    const result = await $fetch<{ ok: boolean, ingested: number }>('/api/admin/businesses/ingest', {
      method: 'POST',
      body: { territoryId: id }
    })
    runResult.value = { ...runResult.value, [id]: `Ingested ${result.ingested}` }
    await refresh()
  } catch (error: any) {
    runResult.value = { ...runResult.value, [id]: error?.statusMessage ?? 'Run failed' }
  } finally {
    runningId.value = null
  }
}
</script>

<template>
  <div class="mx-auto w-full max-w-5xl">
      <header class="border-b-2 border-text-primary pb-4">
        <p class="font-mono text-label uppercase tracking-widest text-accent">
          Searches
        </p>
        <h1 class="mt-2 font-display text-4xl font-semibold leading-none">
          Territories
        </h1>
      </header>

      <section class="py-8">
        <p class="font-mono text-label uppercase tracking-widest text-text-muted">
          Add territory
        </p>

        <form class="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end" @submit.prevent="addTerritory">
          <label class="block flex-1">
            <span class="font-mono text-mono-sm uppercase tracking-widest text-text-muted">Vertical</span>
            <input
              v-model="vertical"
              class="mt-2 w-full border border-rule bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary outline-none focus:border-accent"
              placeholder="dentists"
              type="text"
            >
          </label>

          <label class="block flex-1">
            <span class="font-mono text-mono-sm uppercase tracking-widest text-text-muted">Metro</span>
            <input
              v-model="metro"
              class="mt-2 w-full border border-rule bg-bg-secondary px-4 py-3 font-mono text-sm text-text-primary outline-none focus:border-accent"
              placeholder="Eugene"
              type="text"
            >
          </label>

          <button
            class="bg-text-primary px-5 py-3 font-mono text-sm uppercase tracking-widest text-bg-primary transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-60"
            :disabled="addPending"
            type="submit"
          >
            {{ addPending ? 'Adding' : 'Add' }}
          </button>
        </form>

        <div class="mt-3 flex flex-wrap gap-2">
          <button
            v-for="preset in METRO_PRESETS"
            :key="preset"
            class="border border-rule px-3 py-1 font-mono text-mono-sm uppercase tracking-widest text-text-secondary transition-colors hover:border-accent hover:text-accent"
            type="button"
            @click="metro = preset"
          >
            {{ preset }}
          </button>
        </div>

        <p v-if="addError" class="mt-3 font-mono text-sm text-accent" role="alert">
          {{ addError }}
        </p>
      </section>

      <section>
        <p class="font-mono text-label uppercase tracking-widest text-text-muted">
          Saved territories
        </p>

        <div v-if="territories && territories.length" class="mt-4 divide-y divide-rule border border-rule">
          <div
            v-for="territory in territories"
            :key="territory.id"
            class="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p class="font-display text-xl font-semibold">
                {{ territory.vertical }}
                <span class="text-text-secondary">— {{ territory.metro }}</span>
              </p>
              <p class="mt-1 font-mono text-mono-sm uppercase tracking-widest text-text-muted">
                Last run: {{ territory.lastRunAt ?? 'never' }}
              </p>
              <p
                v-if="runResult[territory.id]"
                class="mt-1 font-mono text-mono-sm text-accent"
              >
                {{ runResult[territory.id] }}
              </p>
            </div>

            <div class="flex shrink-0 gap-2">
              <button
                class="border border-rule px-4 py-2 font-mono text-mono-sm uppercase tracking-widest transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
                :disabled="runningId === territory.id"
                type="button"
                @click="runTerritory(territory.id)"
              >
                {{ runningId === territory.id ? 'Running' : 'Run' }}
              </button>
              <button
                class="border border-rule px-4 py-2 font-mono text-mono-sm uppercase tracking-widest text-text-muted transition-colors hover:border-accent hover:text-accent"
                type="button"
                @click="deleteTerritory(territory.id)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        <p v-else class="mt-4 font-serif text-text-secondary">
          No territories yet. Add one above to drive Places ingest.
        </p>
      </section>
  </div>
</template>
