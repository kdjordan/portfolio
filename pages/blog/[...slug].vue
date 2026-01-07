<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.path}`, () => {
  return queryContent(route.path).findOne()
})

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found' })
}

useSeoMeta({
  title: () => post.value?.title ? `${post.value.title} - Kevin Jordan` : 'Blog',
  description: () => post.value?.description || ''
})
</script>

<template>
  <article class="min-h-screen pt-32 prose prose-invert max-w-none">
    <header class="mb-12">
      <h1 class="text-size4xl font-bold text-primary-white">{{ post?.title }}</h1>
    </header>
    <ContentRenderer v-if="post" :value="post" />
  </article>
</template>
