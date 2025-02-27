export default defineNuxtPlugin((nuxtApp) => {
    const apiBase = 'http://127.0.0.1:8080'
    
    // Create a wrapper around $fetch to provide methods like post, get, etc.
    const api = {
        get: (url, options = {}) => $fetch(url, { 
            baseURL: apiBase, 
            method: 'GET',
            ...options 
        }),
        post: (url, body, options = {}) => $fetch(url, { 
            baseURL: apiBase, 
            method: 'POST', 
            body,
            ...options 
        }),
        put: (url, body, options = {}) => $fetch(url, { 
            baseURL: apiBase, 
            method: 'PUT', 
            body,
            ...options 
        }),
        delete: (url, options = {}) => $fetch(url, { 
            baseURL: apiBase, 
            method: 'DELETE',
            ...options 
        })
    }
    
    return {
        provide: {
            api
        }
    }
})