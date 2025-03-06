<template>
  <div class="my-16">
    <div class="mb-8">
      <div>Date: {{ match.datetime }}</div>
      <div>Duration: {{ match.duration }}</div>
      <div>Map: {{ match.map }}</div>
      <div>Type: {{ match.type }}</div>
    </div>

    <div class="mb-32">
      <div
          class="relative flex flex-col w-full h-full">
        <table class="w-full text-left table-auto min-w-max">
          <thead class="border-q3 text-quake-red">
          <tr>
            <th class="p-4 border-b">
              <p class="block font-normal leading-none">
                Name
              </p>
            </th>
            <th class="p-4 border-b">
              <p class="block font-normal leading-none">
                Kills
              </p>
            </th>
            <th class="p-4 border-b">
              <p class="block font-normal leading-none">
                Deaths
              </p>
            </th>
            <th class="p-4 border-b">
              <p class="block font-normal leading-none">
                Suicides
              </p>
            </th>
            <th class="p-4 border-b">
              <p class="block font-normal leading-none">
                Score
              </p>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="player in players" :key="player.name">
            <td class="p-4">
              <p class="block font-normal leading-normal">
                {{ player.name }}
              </p>
            </td>
            <td class="p-4">
              <p class="block font-normal leading-normal">
                {{ player.stats.kills }}
              </p>
            </td>
            <td class="p-4">
              <p class="block font-normal leading-normal">
                {{ player.stats.deaths }}
              </p>
            </td>
            <td class="p-4">
              <p class="block font-normal leading-normal">
                {{ player.stats.suicides }}
              </p>
            </td>
            <td class="p-4">
              <p class="block font-normal leading-normal">
                {{ player.stats.score }}
              </p>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type {Match} from "~/models/match";
  import type { PropType } from 'vue'
  import pkg from 'lodash';

  const { orderBy } = pkg;

  const props = defineProps({
    match: {
      type: Object as PropType<Match>,
      required: true
    },
  })

  const players = computed(() => orderBy(props.match?.players, ['stats.net'], ['desc']))

</script>