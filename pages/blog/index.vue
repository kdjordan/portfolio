<script setup lang="ts">
const siteUrl = 'https://kevinjordan.dev'
const pageTitle = 'Blog — Kevin Jordan'
const pageDescription = 'Dispatches on broken workflows, operator-built AI systems, hidden operational value, and shipping software that survives real work.'
const ogImage = `${siteUrl}/og-image.png`

useSeoMeta({
  title: pageTitle,
  description: pageDescription,
  ogTitle: pageTitle,
  ogDescription: pageDescription,
  ogSiteName: 'Kevin Jordan',
  ogType: 'website',
  ogUrl: `${siteUrl}/blog`,
  ogImage,
  ogImageWidth: '1200',
  ogImageHeight: '630',
  ogImageAlt: 'Kevin Jordan data sheet homepage preview',
  twitterCard: 'summary_large_image',
  twitterTitle: pageTitle,
  twitterDescription: pageDescription,
  twitterImage: ogImage,
  twitterImageAlt: 'Kevin Jordan data sheet homepage preview'
})

useHead({
  link: [
    { rel: 'canonical', href: `${siteUrl}/blog` }
  ]
})

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryContent('blog')
    .only(['_path', 'title', 'description', 'date', 'tags'])
    .sort({ date: -1 })
    .find()
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    timeZone: 'UTC',
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
          On broken workflows, operator-built AI systems, and the mess companies should stop tolerating.
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
