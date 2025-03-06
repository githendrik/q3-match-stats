import { neboa } from 'neboa'
import {dbPath} from "~/util/env";

const dbFile = `${dbPath}/matches.db`;

console.log(`Using db file: ${dbFile}`)

const db = neboa(dbFile, {
    fileMustExist: false,
    timeout: 5000
})

db.authenticate() // Returns true if the connection was successful

export const MatchRepository = db.collection('matches')

