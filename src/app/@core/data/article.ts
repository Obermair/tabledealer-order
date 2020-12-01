import { Kategorie } from "./category";
import { Veranstalter } from "./organizer";

export interface Artikel {
    id;
    kategorie: Kategorie;
    name;
    preis;
    veranstalter: Veranstalter;
  }