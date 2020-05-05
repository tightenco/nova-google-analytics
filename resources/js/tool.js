Nova.booting((Vue, router) => {
    Vue.component('stats-per-page', require('./components/StatsPerPage'));
    // router.addRoutes([
    //     {
    //         name: 'nova-google-analytics',
    //         path: '/nova-google-analytics',
    //         component: require('./components/Tool'),
    //     },
    // ])
})
