<template>
  <div class="bg-stone-950 min-h-screen text-2xl">
    <div class="max-w-5xl m-auto py-16 px-8">
      <div>
        <img src="./public/logo.png" alt="logo" class="w-32 m-auto" />
      </div>
      <div class="my-16 font-q3 text-4xl text-quake-red">
        Latest Matches
      </div>
      <div>
        <Match v-for="match in matches" :key="match.filename" :match="match" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type {Match} from "~/models/match";

const matches: Ref<Match[]> = ref([])

onMounted(() => {
  console.log('mounted')

  $fetch('/api/matches').then((response) => {
    matches.value = response
  })
})

</script>
