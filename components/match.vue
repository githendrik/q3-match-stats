<template>
  <div class="my-16">
    <div class="mb-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>Date: {{ matchDate }}</div>
        <div>Duration: {{ matchDuration }}</div>
        <div>Map: {{ match.map }}</div>
        <div>Type: {{ match.type }}</div>
      </div>
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
            <th class="p-4 border-b hidden md:table-cell">
              <p class="block font-normal leading-none">
                Deaths
              </p>
            </th>
            <th class="p-4 border-b hidden md:table-cell">
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
            <td class="p-4 hidden md:table-cell">
              <p class="block font-normal leading-normal">
                {{ player.stats.deaths }}
              </p>
            </td>
            <td class="p-4 hidden md:table-cell">
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
  import {secondsToDuration} from "~/util/time";

  const { orderBy } = pkg;

  const props = defineProps({
    match: {
      type: Object as PropType<Match>,
      required: true
    },
  })

  const players = computed(() => orderBy(props.match.players, ['stats.net'], ['desc']))
  const matchDate = computed(() => new Date(props.match?.datetime).toLocaleString("de-DE", { timeZone: "UTC" }))
  const matchDuration = computed(() => secondsToDuration(props.match?.duration - 1))

</script>