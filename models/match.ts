import type {Player} from "~/models/player";

export class Match {
    declare filename: string;
    declare datetime: Date;
    declare map: string;
    declare type: string;
    declare isTeamGame: boolean;
    declare duration: string;
    declare players: Player[]
}