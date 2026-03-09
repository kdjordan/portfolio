<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.path}`, () => {
  return queryContent(route.path).findOne()
})

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

useSeoMeta({
  title: () => post.value?.title ? `${post.value.title} — Kevin Jordan` : 'Blog',
  description: () => post.value?.description || ''
})

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<template>
  <div class="min-h-screen pt-32 pb-24">
    <article class="section-container">
      <!-- Back link -->
      <div class="mb-12">
        <NuxtLink
          to="/blog"
          class="font-mono text-mono-sm text-text-muted link-hover inline-flex items-center gap-2"
        >
          &larr; Back to blog
        </NuxtLink>
      </div>

      <!-- Header -->
      <header class="mb-16 max-w-3xl">
        <h1 class="text-section font-display text-text-primary leading-tight mb-6">
          {{ post?.title }}
        </h1>
        <div class="flex items-center gap-6">
          <span v-if="post?.date" class="font-mono text-mono-sm text-text-muted">
            {{ formatDate(post.date) }}
          </span>
          <div v-if="post?.tags" class="flex gap-3">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="font-mono text-mono-sm text-text-muted"
            >
              #{{ tag }}
            </span>
          </div>
        </div>
      </header>

      <!-- Content -->
      <div class="max-w-3xl prose prose-lg">
        <ContentRenderer v-if="post" :value="post" />
      </div>
    </article>
  </div>
</template>
