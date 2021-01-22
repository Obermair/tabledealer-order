export interface Bestellung {
    id?: number;
    bestellzeit?: string;
    name?: string;
    finished?: Boolean;
    printed?: Boolean;
    tischnr: number;
}