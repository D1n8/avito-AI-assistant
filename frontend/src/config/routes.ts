export const routes = {
    main: {
        mask: '/',
        create: () => '/'
    },
    list: {
        mask: '/ads',
        create: () => '/ads'
    },
    detail: {
        mask: '/ads/:id',
        create: (id: string) => `/ads/${id}`
    },
    edit: {
        mask: '/ads/:id/edit',
        create: (id: string) => `/ads/${id}/edit`
    }
}