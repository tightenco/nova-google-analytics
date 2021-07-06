<template>
  <loading-view :loading="initialLoading">
    <heading class="mb-6">{{ title }}</heading>
    <div class="flex">
      <div class="relative h-9 flex-no-shrink mb-6">
        <icon type="search" class="absolute search-icon-center ml-3 text-70" />

        <input
            data-testid="search-input"
            dusk="search"
            class="appearance-none form-search w-search pl-search shadow"
            :placeholder="__('Search')"
            type="search"
            v-model="search"
            @keydown.stop="performSearch"
            @search="performSearch"
            spellcheck="false"
        />
      </div>
    </div>
    <loading-card :loading="loading" class="card relative">
      <div>
        <div class="flex items-center py-3 border-b border-50">
          <div class="flex items-center ml-auto px-3">
            <filter-menu :viaResource="false"
                         :perPage="limit"
                         :perPageOptions="[10, 25, 50, 100]"
                         @per-page-changed="updateLimit"
            ></filter-menu>
          </div>
        </div>
        <table v-if="pages.length > 0"
               class="table w-full table-default"
               cellpadding="0"
               cellspacing="0">
          <thead>
          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Pages"
                uri-key="ga:pageTitle"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Name') }}
              </span>
            </sortable-icon>
          </th>

          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Paths"
                uri-key="ga:pagePath"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Path') }}
              </span>
            </sortable-icon>
          </th>
          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Pages"
                uri-key="ga:pageviews"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Visits') }}
              </span>
            </sortable-icon>
          </th>
          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Pages"
                uri-key="ga:uniquePageviews"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Unique Visits') }}
              </span>
            </sortable-icon>
          </th>
          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Pages"
                uri-key="ga:avgTimeOnPage"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Avg. Time on Page') }}
              </span>
            </sortable-icon>
          </th>
          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Pages"
                uri-key="ga:entrances"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Entrances') }}
              </span>
            </sortable-icon>
          </th>
          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Pages"
                uri-key="ga:bounceRate"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Bounce Rate') }}
              </span>
            </sortable-icon>
          </th>
          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Pages"
                uri-key="ga:exitRate"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Exit Rate') }}
              </span>
            </sortable-icon>
          </th>
          <th class="text-left">
            <sortable-icon
                @sort="sortByChange"
                @reset="resetOrderBy"
                resource-name="Pages"
                uri-key="ga:pageValue"
                :direction="direction"
            >
              <span class="inline-flex items-center">
                {{ __('Page Value') }}
              </span>
            </sortable-icon>
          </th>
          </thead>
          <tbody>
          <tr v-for="page in pages">
            <td>{{ page.name }}</td>
            <td>{{ page.path }}</td>
            <td>{{ page.visits }}</td>
            <td>{{ page.unique_visits }}</td>
            <td>{{ getFormattedTime(page.avg_page_time) }}</td>
            <td>{{ page.entrances }}</td>
            <td>{{ getFormattedPercent(page.bounce_rate) }}</td>
            <td>{{ getFormattedPercent(page.exit_rate) }}</td>
            <td>{{ getFormattedCurrency(page.page_value) }}</td>
          </tr>
          </tbody>
        </table>
      </div>

      <pagination-links
          :data="pages"
          :hasMore="hasMore"
          :hasPrevious="hasPrevious"
          :current-page="page"
          :total-pages="totalPages"
          @previous="previousPage"
          @next="nextPage"
      ></pagination-links>
    </loading-card>
  </loading-view>
</template>

<script>
import PaginationLinks from "./PaginationLinks.vue";
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';
import FilterMenu from "./FilterMenu";

dayjs.extend(duration);
dayjs.extend(utc);

    export default {
      components: {
        'pagination-links': PaginationLinks,
        'dayjs': dayjs,
        'filter-menu': FilterMenu
      },
      data: function () {
        return {
          title: 'Google Analytics',
          pages: [],
          duration: 'week',
          initialLoading: true,
          loading: true,
          hasMore: true,
          page: 1,
          totalPages: 1,
          search: '',
          sortBy: 'ga:pageviews',
          sortDirection: 'desc',
          limit: 10,
        }
      },
      metaInfo() {
        return {
          title: this.title,
        }
      },
      methods: {
        updateDuration(event) {
          this.duration = event.target.value;
          this.getPages();
        },

        updateLimit(value) {
          console.log("update limit called")
          this.limit = value;
          this.getPages();
        },

        getPages() {
          Nova.request()
              .get(`/nova-vendor/nova-google-analytics/pages?limit=${this.limit}&duration=${this.duration}&page=${this.page}&s=${this.search}&sortBy=${this.sortBy}&sortDirection=${this.sortDirection}`)
              .then(response => {
                this.pages = response.data.pages;
                this.totalPages = response.data.totalPages;
                this.hasMore = response.data.hasMore;
                this.loading = false;
              });
        },

        nextPage() {
          this.loading = true
          this.page++
          this.getPages()
        },

        previousPage() {
          this.loading = true
          if (this.hasPrevious) {
            this.page--
          }
          this.getPages()
        },

        performSearch(event) {
          if (event.which != 9) {
            this.page = 1
            this.getPages()
          }
        },

        sortByChange(event) {
          let direction = this.sortDirection == 'asc' ? 'desc' : 'asc'

          if (this.sortBy != event.key) {
            direction = 'asc'
          }

          this.sortBy = event.key
          this.sortDirection = direction
          this.getPages()
        },

        resetOrderBy(event) {
          this.sortBy = 'ga:pageviews'
          this.sortDirection = 'desc'
          this.getPages()
        },

        getFormattedTime(timeString) {
          return dayjs.utc(dayjs.duration({seconds: timeString}).asMilliseconds()).format('HH:mm:ss')
        },

        getFormattedPercent(percentString) {
          return parseFloat(percentString).toFixed(2)+'%'
        },

        getFormattedCurrency(percentString) {
          //return '$'+parseFloat(percentString).toFixed(2)
          return new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(percentString)
        }
      },
      computed: {
        hasPrevious() {
          return this.page > 1
        }
      },
      mounted() {
        this.getPages();
        this.initialLoading = false;
      },
    }
</script>

<style>
    /* Scoped Styles */
</style>
