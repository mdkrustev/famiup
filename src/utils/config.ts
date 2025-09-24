
interface IConfig {
    apiHost: string,
    apiWs: string
}

const ConfigFunction = () => {
    const config: { [key: string]: IConfig } = {
        "http://localhost:5173": {
            apiHost: 'http://localhost:8787',
            apiWs: 'ws://localhost:8787'
        },
        "https://famiup.pages.dev": {
            apiHost: 'https://famiup-api.mdkrustev.workers.dev',
            apiWs: 'wss://famiup-api.mdkrustev.workers.dev'
        }
    }

    console.log('tessst', window.location.origin)

    const setConfig = config[window.location.origin] || {};

    console.log(setConfig)

    return setConfig
}

export const Config = ConfigFunction();

export const Call = {
    urlTo: (path: string) => { return `${Config.apiHost}${path}` }
}
