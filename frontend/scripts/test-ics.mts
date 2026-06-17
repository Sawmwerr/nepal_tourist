import { generateICS } from "../lib/notifications/ics.ts";

const single = generateICS({
  reference: "NPL-TEST1234",
  categoryId: "paragliding",
  categoryLabel: "Paragliding",
  selections: { "Date": "2026-08-15", "Number of Flyers": "2" },
});
console.log("=== Single date (paragliding — expect DTEND=20260816):");
single.split("\r\n").filter(l => /DTSTART|DTEND|SUMMARY/.test(l)).forEach(l => console.log(l));

const range = generateICS({
  reference: "NPL-TEST5678",
  categoryId: "hotels",
  categoryLabel: "Hotels & Stays",
  selections: { "Check-in Date": "2026-09-10", "Check-out Date": "2026-09-14" },
});
console.log("\n=== Date range (hotels — expect DTEND=20260914):");
range.split("\r\n").filter(l => /DTSTART|DTEND|SUMMARY/.test(l)).forEach(l => console.log(l));

const trek = generateICS({
  reference: "NPL-TESTABCD",
  categoryId: "trekking",
  categoryLabel: "Trekking",
  selections: { "Start Date": "2026-10-01", "Duration": "7-10 days" },
});
console.log("\n=== Duration-based trekking (7-10 days=10 — expect DTEND=20261011):");
trek.split("\r\n").filter(l => /DTSTART|DTEND|SUMMARY/.test(l)).forEach(l => console.log(l));
