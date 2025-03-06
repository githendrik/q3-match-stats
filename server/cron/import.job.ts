import {glob} from 'glob'
import {readFileSync} from 'fs';
import {XMLParser} from "fast-xml-parser";
import {Match} from "~/models/match";
import {Item} from "~/models/item";
import {Player} from "~/models/player";
import {Weapon} from "~/models/weapon";
import {MatchRepository} from "~/repositories/match.repository";

const options = {
    ignoreAttributes: false,
    attributeNamePrefix: '',
};

const globOptions = {
    prefix: statsPath,
    suffix: '.xml'
}

function toMatch(xmlObject: any, filename: string): Match {
    const match: Match = new Match();
    match.datetime = new Date(xmlObject.datetime);
    match.duration = xmlObject.duration;
    match.map = xmlObject.map;
    match.type = xmlObject.type;
    match.isTeamGame = xmlObject.isTeamGame === "true";
    match.players = [];
    match.filename = filename;

    xmlObject.player.forEach(p => {
        const player = new Player();
        player.name = p.name;

        const stats = new Stat();
        p.stat.forEach((stat: any) => {
            const key = stat.name.charAt(0).toLowerCase() + stat.name.slice(1);
            stats[key] = stat.value
        })

        player.stats = stats

        const weapons = Array.isArray(p.weapons.weapon) ? p.weapons.weapon : [p.weapons.weapon];
        player.weapons = weapons.map(w => {
            const weapon = new Weapon();
            weapon.name = w.name;
            weapon.kills = w.kills;
            weapon.hits = w.hits;
            weapon.shots = w.shots;
            return weapon;
        })

        const items = Array.isArray(p.items.item) ? p.items.item : [p.items.item];

        player.items = items.map(i => {
            const item = new Item();
            item.name = i.name;
            item.pickups = i.pickups;
            return item;
        })

        match.players.push(player);
    })

    return match;
}

import { defineCronHandler } from '#nuxt/cron'
import {Stat} from "~/models/stat";
import {statsPath} from "~/util/env";

export default defineCronHandler('everyFiveMinutes', async () => {
    const matchFiles = await glob(`${globOptions.prefix}/**/*${globOptions.suffix}`, { ignore: 'examples/stats/basics/**' })
    const parser = new XMLParser(options)

    const matches = []
    matchFiles.forEach(matchFile => {
        const xmlString = readFileSync(matchFile, 'utf-8')
        const xmlObject = parser.parse(xmlString)
        matches.push(toMatch(xmlObject.match, matchFile))
    })

    matches.forEach(match => {
        const inDB = MatchRepository.query().equalTo('filename', match.filename).count() > 0;

        if (!inDB) {
            MatchRepository.insert(match)
            console.log(`Adding new match to DB: ${match.filename}`)
        }

    })
})