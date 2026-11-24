import { formatInTimeZone, fromZonedTime } from 'date-fns-tz'

const TIMEZONE = 'America/Toronto'

/**
 * Formats an ISO timestamp as MM.DD.YY in the event's local timezone.
 * e.g. '2026-09-24T00:00:00-04:00' -> '09.24.26'
 */
export function formatRevealDate(isoString: string): string {
  return formatInTimeZone(isoString, TIMEZONE, 'MM.dd.yy')
}

// e.g. '2026-09-24T00:00:00-04:00' -> 'September 24'
export function formatRevealDateLong(isoString: string): string {
  return formatInTimeZone(isoString, 'America/Toronto', 'MMMM d')
}

export const EVENT = {
  number: 'SFL 001',
  title: 'The Inaugural Event',
  date: 'Saturday, November 28, 2026',
  // First bout 6:30 PM Eastern. Drives the countdown timer.
  scheduledAt: fromZonedTime('2026-11-28 18:30:00', TIMEZONE).toISOString(),
  doors: 'Doors 5:00 PM \u2014 First Bout 6:30 PM',
  venue: 'DEMO ROOM',
  city: 'Toronto, Ontario',
  address: '307 Lake Shore Blvd E, M5A 1C1',
  cardReveal: '15 BOUTS ANNOUNCED',
  cardRevealAt: fromZonedTime('2026-09-24 00:00:00', TIMEZONE).toISOString(),
  ticketUrl: 'https://tickets.skyfightleague.ca',
}

export type Discipline = 'BJJ' | 'MUAY THAI' | 'MMA' | 'JUNIOR MUAY THAI'

export type Fighter = {
  name: string
  nickname?: string
  record?: string
  country: string
  corner: 'red' | 'white'
}

export type Bout = {
  boutNumber: string
  discipline: Discipline
  weightClass: string
  isTitle?: boolean
  isMainEvent?: boolean
  isCoMain?: boolean
  rounds?: number
  red: Fighter
  white: Fighter
}

export const MAIN_EVENT: Bout = {
  boutNumber: '15',
  discipline: 'BJJ',
  weightClass: 'Main Event \u2014 BJJ',
  isTitle: true,
  isMainEvent: true,
  red: {
    name: 'Simon Marcus',
    country: 'Canada',
    corner: 'red',
  },
  white: {
    name: 'Davis Rapagna',
    country: 'Canada',
    corner: 'white',
  },
}

export const FIGHT_CARD: Bout[] = [
  MAIN_EVENT,
  {
    boutNumber: '14',
    discipline: 'MUAY THAI',
    weightClass: 'Co-Main Event \u2014 Muay Thai',
    isCoMain: true,
    red: { name: 'Efe Yikici', country: 'Canada', corner: 'red' },
    white: { name: 'Thomas Liamakeros', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '13',
    discipline: 'MMA',
    weightClass: 'Bout 13 \u2014 MMA',
    red: { name: 'Gabe Del Giudice', country: 'Canada', corner: 'red' },
    white: { name: 'Asein Kasymov', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '12',
    discipline: 'JUNIOR MUAY THAI',
    weightClass: 'Bout 12 \u2014 Junior Muay Thai',
    red: { name: 'Islam Omar', country: 'Canada', corner: 'red' },
    white: { name: 'Alvin Zeng', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '11',
    discipline: 'BJJ',
    weightClass: 'Bout 11 \u2014 BJJ',
    red: { name: 'Ferdaws Nayimi', nickname: 'Bobby', country: 'Canada', corner: 'red' },
    white: { name: 'Heliam Blanco', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '10',
    discipline: 'MUAY THAI',
    weightClass: 'Bout 10 \u2014 Muay Thai',
    red: { name: 'Jay Camacho', country: 'Canada', corner: 'red' },
    white: { name: 'Gaurav Sumai', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '09',
    discipline: 'MUAY THAI',
    weightClass: 'Bout 09 \u2014 Muay Thai',
    red: { name: 'Alex Picknell', country: 'Canada', corner: 'red' },
    white: { name: 'Wisnel Noel', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '08',
    discipline: 'BJJ',
    weightClass: 'Bout 08 \u2014 BJJ',
    red: { name: 'Alex Delpeshe', country: 'Canada', corner: 'red' },
    white: { name: 'Jody Gyivicsan', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '07',
    discipline: 'MUAY THAI',
    weightClass: 'Bout 07 \u2014 Muay Thai',
    red: { name: 'Illia Pinkovskyi', country: 'Canada', corner: 'red' },
    white: { name: 'Mathias Grandmont', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '06',
    discipline: 'MMA',
    weightClass: 'Bout 06 \u2014 MMA',
    red: { name: 'Danylo Kaniovskyi', country: 'Canada', corner: 'red' },
    white: { name: 'Pedro Henrique Pereira Da Silva', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '05',
    discipline: 'MUAY THAI',
    weightClass: 'Bout 05 \u2014 Muay Thai',
    red: { name: 'Karam Halloun', country: 'Canada', corner: 'red' },
    white: { name: 'Nathan Dhanoa', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '04',
    discipline: 'BJJ',
    weightClass: 'Bout 04 \u2014 BJJ',
    red: { name: 'Cody Kent', country: 'Canada', corner: 'red' },
    white: { name: 'Michael Gomes', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '03',
    discipline: 'MMA',
    weightClass: 'Bout 03 \u2014 MMA',
    red: { name: 'Nicholas Gurski', country: 'Canada', corner: 'red' },
    white: { name: 'Max Klutch', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '02',
    discipline: 'MUAY THAI',
    weightClass: 'Bout 02 \u2014 Muay Thai',
    red: { name: 'Dimitris Efthimiadis', country: 'Canada', corner: 'red' },
    white: { name: 'Keshav Mishra', country: 'Canada', corner: 'white' },
  },
  {
    boutNumber: '01',
    discipline: 'MMA',
    weightClass: 'Bout 01 \u2014 MMA',
    red: { name: 'Duncan Shaheen', country: 'Canada', corner: 'red' },
    white: { name: 'Salvador Ngupi', country: 'Canada', corner: 'white' },
  },
]

export const NAV_LINKS = [
  { label: 'Fight Card', href: '/#fight-card' },
  { label: 'About Us', href: '/about' },
  { label: 'Opportunities', href: '/opportunities' },
]