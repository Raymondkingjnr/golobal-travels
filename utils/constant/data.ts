export type AmenityCode =
    | 'FREE_CANCELLATION' | 'FINTRNT' | 'FBRKFST' | 'FPRKING'
    | 'FITSPA' | 'SPOOL' | 'AIRSHUTTL' | 'FAIRSHUTTL'
    | 'BUSCNTR' | 'CASINO' | 'PETALLOW' | 'RESTRNT'
    | 'HANDFAC' | 'NSMKFAC' | 'SPA';


export const amenityLabels: Record<AmenityCode, string> = {
    FREE_CANCELLATION: 'Free Cancellation',
    FINTRNT: 'Free Internet',
    FBRKFST: 'Free Breakfast',
    FPRKING: 'Free Parking',
    FITSPA: 'Fitness Center',
    SPOOL: 'Pool',
    AIRSHUTTL: 'Airport Shuttle',
    FAIRSHUTTL: 'Free Airport Shuttle',
    BUSCNTR: 'Business Center',
    CASINO: 'Casino',
    PETALLOW: 'Pets Allowed',
    RESTRNT: 'Restaurant',
    HANDFAC: 'Handicapped Facilities',
    NSMKFAC: 'No Smoking Rooms',
    SPA: 'Spa',
};