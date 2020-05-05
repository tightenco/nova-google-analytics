<template>
    <div>
        <div class="flex items-center mb-3">
            <heading class="text-90 font-normal text-2xl flex-no-shrink">Google Analytics stats</heading>
        </div>

        <div class="alert alert-danger mb-2" v-if="errorMessage.length > 0" v-html="errorMessage"></div>

        <div v-if="errorMessage.length == 0">
            <base-trend-metric
                @selected="handleRangeSelected"
                :chart-data="chartData"
                :loading="loading"
                :title="'Views per day'"
                :prefix="''"
                :suffix="''"
                :ranges="ranges"
                :selected-range-key="selectedRangeKey"
                :value="total">
            </base-trend-metric>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'

export default {
    props: ['resourceName', 'resourceId', 'field', 'panel'],
    data: function() {
        return {
            partials: [],
            total: 0,
            loading: true,
            chartData: {},
            ranges: [
                {"value": 7, "label": "Week"},
                {"value": 14, "label": "2 weeks"},
                {"value": 30, "label": "Month"},
                {"value": 90, "label": "3 months"},
                {"value": 180, "label": "6 months"},
                {"value": 365, "label": "Year"},
            ],
            selectedRangeKey: 7,
            errorMessage: ''
        }
    },

    computed: {
        path() {
            // Workaround to satisfy all Nova versions
            return typeof this.field === 'undefined' ? this.panel.fields[0].path : this.field.path
        }
    },

    mounted() {
        if(typeof this.path === 'undefined' || this.path == '') {
            this.errorMessage = 'Missing <strong>path</strong> in resource field definition.<br/><br/><pre>StatsPerPage::make()->path(_PATH_)</pre>'
        } else {
            this.fetch()
        }
    },

    methods: {
        fetch() {
            Nova.request()
                .post('/nova-vendor/nova-google-analytics/stats-per-page', {days: this.selectedRangeKey, path: this.path})
                .then(response => {
                    let labels = []
                    this.partials = _.map(response.data.partials, function(item) {
                        labels.push(item.date.slice(6, 8) + '-' + item.date.slice(4, 6) + '-' + item.date.slice(0, 4))
                        return {meta: item.date.slice(6, 8) + '-' + item.date.slice(4, 6) + '-' + item.date.slice(0, 4), value: parseInt(item.pageviews)}
                    })
                    this.total = response.data.total.pageviews

                    this.chartData = {
                        series: [this.partials],
                        labels: labels
                    };
                    this.loading = false
                })
                .catch(error => {
                    console.log(error.response)
                    this.errorMessage = error.response.data.message
                })
        },
        handleRangeSelected(key) {
            this.loading = true
            this.selectedRangeKey = key
        }
    },

    watch: {
        selectedRangeKey() {
            this.fetch()
        }
    }
}
</script>


<style scoped>
    .alert {
        background-color: #ffc9c9;
        color: #000;
        border-radius: .5rem;
        padding: 10px;
        border: 1px solid red;
    }
</style>
