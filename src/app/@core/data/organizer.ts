export interface Veranstalter {
    id;
    email;
    name;
    passwort;
    selfCheckout;
}

export interface Kellner {
    id;
    email;
    name;
    passwort;
    veranstalter?;
}

export interface Bestellung {
    id
    bestellzeit
    finished
    printed
    tischnr
}