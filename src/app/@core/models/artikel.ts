import { Kategorie } from "../data/category";
import { Veranstalter } from "./veranstalter";

export interface Artikel {
    id: number;
    name: String;
    kategorie?: Kategorie;
    veranstalter?: Veranstalter;
}
