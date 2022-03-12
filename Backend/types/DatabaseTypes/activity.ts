export interface Activity{
    id: number;
    name: string;
    ort: string;
    anfangsdatum: Date;
    enddatum?: Date;
    beschreibung: string;
    author: number; // User Id
    bild?: string;
}
