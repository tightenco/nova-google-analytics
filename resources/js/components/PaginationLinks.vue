<template>
  <div class="bg-20 rounded-b">
    <nav v-if="data.length > 0" class="flex justify-between items-center">
      <!-- Previous Link -->
      <div>
        <button
            :disabled="!hasPrevious"
            class="btn btn-link py-3 px-4"
            :class="{
                    'text-primary dim': hasPrevious,
                    'text-80 opacity-50 cursor-not-allowed': !hasPrevious,
                }"
            rel="prev"
            @click.prevent="previousPage()"
            dusk="previous"
        >
          {{__('Previous')}}
        </button>
      </div>

      <!-- Page Definition -->
      <div v-if="currentPage && totalPages" class="text-sm text-80 px-4">{{ currentPage }} {{ __('of')}} {{ totalPages }}</div>

      <!-- Next Link -->
      <div>
        <button
            :disabled="!hasMore"
            class="ml-auto btn btn-link py-3 px-4"
            :class="{
                    'text-primary dim': hasMore,
                    'text-80 opacity-50 cursor-not-allowed': !hasMore,
                }"
            rel="next"
            @click.prevent="nextPage()"
            dusk="next"
        >
          {{__('Next')}}
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['data', 'hasMore', 'hasPrevious', 'currentPage', 'totalPages'],
  methods: {
    /**
     * Select the previous page.
     */
    previousPage() {
      this.$emit('previous')
    },
    /**
     * Select the next page.
     */
    nextPage() {
      this.$emit('next')
    },
  },
}
</script>