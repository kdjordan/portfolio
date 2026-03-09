<script setup lang="ts">
useSeoMeta({
  title: 'Blog — Kevin Jordan',
  description: 'Thoughts on AI systems, building companies, and shipping products.'
})

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryContent('blog')
    .only(['_path', 'title', 'description', 'date', 'tags'])
    .sort({ date: -1 })
    .find()
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen pt-32 pb-24">
    <div class="section-container">
      <!-- Page header -->
      <div class="mb-16">
        <h1 class="text-section font-display text-text-primary leading-tight mb-4">
          BLOG
        </h1>
        <p class="text-body-lg text-text-secondary max-w-2xl">
          On AI systems, building companies, and shipping products.
        </p>
      </div>

      <!-- Posts -->
      <div v-if="posts && posts.length" class="space-y-0">
        <NuxtLink
          v-for="post in posts"
          :key="post._path"
          :to="post._path"
          class="article-item group"
        >
          <div class="flex-1">
            <h2 class="font-display text-section-sub text-text-primary uppercase group-hover:text-accent transition-colors duration-snappy">
              {{ post.title }}
            </h2>
            <p v-if="post.description" class="text-body-sm text-text-secondary mt-2 leading-relaxed max-w-2xl">
              {{ post.description }}
            </p>
            <div v-if="post.tags" class="flex gap-3 mt-3">
              <span
                v-for="tag in post.tags"
                :key="tag"
                class="font-mono text-mono-sm text-text-muted"
              >
                #{{ tag }}
              </span>
            </div>
          </div>
          <div class="hidden md:block shrink-0">
            <span class="font-mono text-mono-sm text-text-muted">
              {{ formatDate(post.date) }}
            </span>
          </div>
        </NuxtLink>
      </div>

      <!-- Empty state -->
      <div v-else class="py-16 border-t border-text-muted/20">
        <p class="text-body text-text-muted">Articles coming soon.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.article-item {
  @apply flex justify-between items-start gap-8 py-8 border-b border-text-muted/20;
  @apply transition-all duration-snappy;
}

.article-item:first-child {
  @apply border-t;
}

.article-item:hover {
  @apply pl-4 border-accent/30;
}
</style>
