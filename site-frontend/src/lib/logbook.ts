/* maidenhead converting functions courtesey of chatgpt */
export function latLonToMaiden(lat: number, lon: number, precision = 6) {
  lat += 90;
  lon += 180;

  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const a = 'abcdefghijklmnopqrstuvwxyz';
  let locator = '';

  locator += A[Math.floor(lon / 20)];
  locator += A[Math.floor(lat / 10)];
  lon %= 20;
  lat %= 10;

  locator += Math.floor(lon / 2);
  locator += Math.floor(lat / 1);
  lon %= 2;
  lat %= 1;

  if (precision >= 6) {
    locator += a[Math.floor((lon * 12))];
    locator += a[Math.floor((lat * 24))];
  }

  return locator;
}

export function maidenToLatLon(locator: string) {
  locator = locator.toUpperCase();
  const A = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let lon = (A.indexOf(locator[0]) * 20) - 180;
  let lat = (A.indexOf(locator[1]) * 10) - 90;

  lon += parseInt(locator[2]) * 2;
  lat += parseInt(locator[3]) * 1;

  if (locator.length >= 6) {
    lon += (locator[4].toLowerCase().charCodeAt(0) - 97) * (2 / 24);
    lat += (locator[5].toLowerCase().charCodeAt(0) - 97) * (1 / 24);
  }

  // Center of the grid square
  lon += (2 / 24) / 2;
  lat += (1 / 24) / 2;

  return { lat: lat, lon: lon };
}

export interface Coordinates {
  lat: number;
  long: number;
}

export interface LogEntry {
  band: string,
  quality: number;
  callsign: string
  location: string | Coordinates;
  notes: string;
  time: number;
  poster: string;
}

export async function getRecentLogbookPosts(server: string, n?: number): Promise<LogbookPost[]> {
  let req = await fetch(`${server}/logbook/recent`);
  return await req.json();
}