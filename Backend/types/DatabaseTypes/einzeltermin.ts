
export interface EinzeltermineKey{
  id: number
}

export interface Einzeltermin extends EinzeltermineKey{
    activityId: number; // Activität dazu
    anfang: Date;
    ende: Date;
}
