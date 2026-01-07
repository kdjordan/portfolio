<script setup lang="ts">
useSeoMeta({
  title: 'Blog - Kevin Jordan',
  description: 'Thoughts on development and technology.'
})

const { data: posts } = await useAsyncData('blog-posts', () => {
  return queryContent('blog')
    .only(['_path', 'title', 'description', 'date', 'tags'])
    .sort({ date: -1 })
    .find()
})
</script>

<template>
  <div class="min-h-screen pt-32">
    <h1 class="text-size4xl font-bold text-primary-white mb-12">Blog</h1>
    <div v-if="posts && posts.length" class="space-y-8">
      <article v-for="post in posts" :key="post._path" class="border-b border-white/20 pb-8">
        <NuxtLink :to="post._path" class="group">
          <h2 class="text-size2xl text-primary-white group-hover:text-gray-300 transition-colors">{{ post.title }}</h2>
          <p class="text-gray-400 mt-2">{{ post.description }}</p>
        </NuxtLink>
      </article>
    </div>
    <p v-else class="text-gray-400">No posts yet.</p>
  </div>
</template>
