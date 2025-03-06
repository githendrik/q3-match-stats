#!/usr/bin/bash

export NUXT_STATS_PATH="$STATS_PATH"
export NUXT_DB_PATH="$DB_PATH"

echo "Using stats path: $NUXT_STATS_PATH"
echo "Using db path: $NUXT_DB_PATH"

# sleep 100000000

node .output/server/index.mjs