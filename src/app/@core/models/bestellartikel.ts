import { Artikel } from "./Artikel";
import { Bestellung } from "./bestellung";

export interface Bestellungartikel {
    id?: number;
    artikel: Artikel;
    bestellung: Bestellung;
    menge: number;
}