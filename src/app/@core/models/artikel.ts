import { Kategorie } from "./kategorie";
import { Veranstalter } from "./veranstalter";

export interface Artikel {
    id: number;
    name: String;
    preis: number;
    kategorie?: Kategorie;
    veranstalter?: Veranstalter;
}
