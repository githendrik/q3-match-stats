import type {Stat} from "~/models/stat";
import type {Weapon} from "~/models/weapon";
import type {Item} from "~/models/item";

export class Player {
    declare name: string;
    declare stats: Stat;
    declare weapons: Weapon[]
    declare items: Item[]
}