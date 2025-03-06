const runtimeConfig = useRuntimeConfig()

if (!runtimeConfig.statsPath) {
    throw Error('STATS_PATH not set in env')
}

if (!runtimeConfig.dbPath) {
    throw Error('DB_PATH not set in env')
}

export const statsPath = runtimeConfig.statsPath
export const dbPath = runtimeConfig.dbPath