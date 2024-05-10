export interface Veranstalter {
    id?: number;
    name?: String;
    email: String;
    passwort: String;
    selfCheckout?: Boolean;
    speisenSinglePrint?: Boolean;
    printerUrl?: string;
}
