import { useRuntimeConfig } from '#app'

export function baseURL() {
    const config  = useRuntimeConfig()
    console.log('config', config)
    return config.public.apiURL
}