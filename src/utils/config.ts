
interface IConfig {
    apiHost: string,
    apiWs: string
}

const ConfigFunction = () => {
    const config: { [key: string]: IConfig } = {
        "http://localhost:5173/": {
            apiHost: 'http://localhost:8787',
            apiWs: 'ws://localhost:8787'

        }
    }

    return config[window.location.href] || {};
}

export const Config = ConfigFunction();

export const Call = {
    urlTo: (path: string) => { return `${Config.apiHost}${path}` }
}
