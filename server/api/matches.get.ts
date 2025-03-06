import {MatchRepository} from "~/repositories/match.repository";

export default defineEventHandler(async event => {
    return MatchRepository.query()
        .descending('datetime')
        .limit(10)
        .find();
})