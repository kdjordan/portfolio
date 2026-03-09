<script setup lang="ts">
const { data: posts } = await useAsyncData('featured-posts', () => {
  return queryContent('blog')
    .only(['_path', 'title', 'description', 'date', 'tags'])
    .sort({ date: -1 })
    .limit(3)
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
  <section id="articles" class="section-container">
    <!-- Section header -->
    <div class="section-header">
      <span class="section-number">05</span>
      <span class="section-label">Latest Articles</span>
    </div>

    <!-- Posts -->
    <div v-if="posts && posts.length" class="articles-list">
      <NuxtLink
        v-for="post in posts"
        :key="post._path"
        :to="post._path"
        class="article-item group"
      >
        <div class="flex-1">
          <h3 class="font-display text-section-sub text-text-primary uppercase group-hover:text-accent transition-colors duration-snappy">
            {{ post.title }}
          </h3>
          <p v-if="post.description" class="text-body-sm text-text-secondary mt-2 leading-relaxed">
            {{ post.description }}
          </p>
        </div>
        <div class="article-meta">
          <span class="font-mono text-mono-sm text-text-muted">
            {{ formatDate(post.date) }}
          </span>
        </div>
      </NuxtLink>
    </div>

    <!-- Empty state -->
    <div v-else class="py-12 border-t border-b border-text-muted/20">
      <p class="text-body text-text-muted">Articles coming soon.</p>
    </div>

    <!-- View all link -->
    <div class="mt-12">
      <NuxtLink
        to="/blog"
        class="font-mono text-mono-sm text-accent link-hover inline-flex items-center gap-2"
      >
        All articles &rarr;
      </NuxtLink>
    </div>
  </section>
</template>

<style scoped>
.articles-list {
  @apply space-y-0;
}

.article-item {
  @apply flex justify-between items-start gap-8 py-6 border-b border-text-muted/20;
  @apply transition-all duration-snappy;
}

.article-item:first-child {
  @apply border-t;
}

.article-item:hover {
  @apply pl-4 border-accent/30;
}

.article-meta {
  @apply hidden md:block shrink-0;
}
</style>
