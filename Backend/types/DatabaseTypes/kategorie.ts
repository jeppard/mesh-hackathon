export interface KategoriePrimaryKey {
  id: number;
}
export interface Kategorie extends KategoriePrimaryKey{
  name: string;
  ueberkategorie?: number;
}
