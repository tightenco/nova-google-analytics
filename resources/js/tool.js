Nova.booting((Vue, router) => {
    router.addRoutes([
        {
            name: 'nova-google-analytics',
            path: '/nova-google-analytics',
            component: require('./components/Tool'),
        },
    ])
})
