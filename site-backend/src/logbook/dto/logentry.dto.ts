import { Coordinates } from "../schemas/logentry.schema";

export interface LogEntryDTO {
    band: string,
    quality: number,
    callsign: string,
    location: string | Coordinates,
    notes: string,
}