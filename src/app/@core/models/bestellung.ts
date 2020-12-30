export interface Bestellung {
    id?: number;
    bestellzeit?: Date;
    finished?: Boolean;
    printed?: Boolean;
    tischnr: number;
}