import { Veranstalter } from "./veranstalter";

export interface Kellner {
    id: number;
    name: String;
    email: String;
    passwort: String;
    veranstalter?: Veranstalter;
}
