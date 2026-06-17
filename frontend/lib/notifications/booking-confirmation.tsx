// Server-only — imports Resend. Do not import from client components.

import { Resend } from "resend";
import { render } from "@react-email/render";
import {
  Html, Head, Body, Container, Section, Text, Heading, Hr, Link, Row, Column,
} from "@react-email/components";
import { fmt, type PriceResult } from "@/lib/booking/pricing";
import type { Currency } from "@/lib/booking/catalog";
import { generateICS } from "./ics";

const SUPPORT_WA = "+977-9851234567";
const WA_LINK = "https://wa.me/9779851234567";

export interface BookingNotification {
  reference: string;
  categoryId: string;
  categoryLabel: string;
  categoryIcon: string;
  selections: Record<string, unknown>;
  included: string[];
  price: PriceResult | null;
  currency: Currency;
  contact: { name: string; email: string; phone: string };
}

// ─── Email template ───────────────────────────────────────────────────────────

function BookingEmail({ b }: { b: BookingNotification }) {
  const { reference, categoryIcon, categoryLabel, selections, included, price, currency, contact } = b;

  const rows = Object.entries(selections).flatMap(([k, v]) => {
    if (v === undefined || v === "" || v === null || v === false) return [];
    const val = Array.isArray(v) ? (v as string[]).join(", ") : String(v);
    return [{ key: k, val }];
  });

  return (
    <Html lang="en">
      <Head />
      <Body style={{ backgroundColor: "#0d1117", fontFamily: "'Segoe UI',Helvetica,sans-serif", margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: 560, margin: "0 auto", padding: "36px 20px" }}>

          <Text style={{ color: "#c4a35a", fontWeight: 700, fontSize: 17, margin: "0 0 22px", letterSpacing: "1px" }}>
            ▲ Nepal
          </Text>

          <Heading style={{ color: "#f0ece3", fontSize: 26, fontWeight: 700, margin: "0 0 6px", lineHeight: "1.2" }}>
            {categoryIcon} {categoryLabel}
          </Heading>
          <Text style={{ color: "#9a9584", fontSize: 14, margin: "0 0 28px" }}>
            Hi {contact.name} — your booking is confirmed!
          </Text>

          {/* Reference badge */}
          <Section style={{
            background: "rgba(196,163,90,0.12)",
            border: "1px solid rgba(196,163,90,0.28)",
            borderRadius: "10px",
            padding: "14px 18px",
            marginBottom: "24px",
          }}>
            <Text style={{ color: "#9a9584", fontSize: 11, textTransform: "uppercase", letterSpacing: "1.5px", margin: "0 0 4px" }}>
              Booking Reference
            </Text>
            <Text style={{ color: "#c4a35a", fontSize: 22, fontWeight: 700, letterSpacing: "3px", margin: 0 }}>
              {reference}
            </Text>
          </Section>

          {/* Booking details */}
          {rows.length > 0 && (
            <Section style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "14px 18px",
              marginBottom: "20px",
            }}>
              <Text style={{ color: "#f0ece3", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px" }}>
                Your Booking
              </Text>
              {rows.map(({ key, val }) => (
                <Row key={key} style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "5px", marginBottom: "5px" }}>
                  <Column style={{ color: "#9a9584", fontSize: 13, width: "44%" }}>{key}</Column>
                  <Column style={{ color: "#f0ece3", fontSize: 13 }}>{val}</Column>
                </Row>
              ))}
            </Section>
          )}

          {/* Price breakdown */}
          {price && (
            <Section style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              padding: "14px 18px",
              marginBottom: "20px",
            }}>
              <Text style={{ color: "#f0ece3", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 12px" }}>
                Price Summary
              </Text>
              {price.items.map(item => (
                <Row key={item.label} style={{ marginBottom: "4px" }}>
                  <Column style={{ color: "#9a9584", fontSize: 13 }}>{item.label}</Column>
                  <Column style={{ color: "#f0ece3", fontSize: 13, textAlign: "right" }}>{fmt(item.amount, currency)}</Column>
                </Row>
              ))}
              <Row style={{ marginBottom: "4px" }}>
                <Column style={{ color: "#9a9584", fontSize: 13 }}>VAT (13%)</Column>
                <Column style={{ color: "#f0ece3", fontSize: 13, textAlign: "right" }}>{fmt(price.vat, currency)}</Column>
              </Row>
              <Hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.12)", margin: "8px 0" }} />
              <Row>
                <Column style={{ color: "#f0ece3", fontSize: 15, fontWeight: 700 }}>Total</Column>
                <Column style={{ color: "#c4a35a", fontSize: 15, fontWeight: 700, textAlign: "right" }}>{fmt(price.total, currency)}</Column>
              </Row>
            </Section>
          )}

          {/* What's included */}
          <Section style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "14px 18px",
            marginBottom: "20px",
          }}>
            <Text style={{ color: "#f0ece3", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", margin: "0 0 10px" }}>
              What&apos;s Included
            </Text>
            {included.map(item => (
              <Text key={item} style={{ color: "#9a9584", fontSize: 13, margin: "0 0 6px" }}>
                <span style={{ color: "#c4a35a" }}>✓</span> {item}
              </Text>
            ))}
          </Section>

          {/* Calendar note */}
          <Section style={{ marginBottom: "20px" }}>
            <Text style={{ color: "#9a9584", fontSize: 13, margin: "0 0 4px" }}>
              📅 A calendar invite (.ics) is attached to this email — tap to add to your calendar.
            </Text>
          </Section>

          {/* Support */}
          <Section style={{ marginBottom: "28px" }}>
            <Text style={{ color: "#9a9584", fontSize: 13, margin: "0 0 5px" }}>
              Questions? We&apos;re available 24/7 on WhatsApp:
            </Text>
            <Link href={WA_LINK} style={{ color: "#c4a35a", fontSize: 14, fontWeight: 600 }}>
              {SUPPORT_WA}
            </Link>
          </Section>

          <Hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.06)", margin: "0 0 18px" }} />
          <Text style={{ color: "#6e6b58", fontSize: 11, margin: 0 }}>
            Nepal Tourism Platform · Crafted with care for adventurers worldwide
          </Text>

        </Container>
      </Body>
    </Html>
  );
}

// ─── Sender ───────────────────────────────────────────────────────────────────

export async function sendBookingConfirmation(b: BookingNotification): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const from   = process.env.FROM_EMAIL;
  if (!apiKey || !from) {
    throw new Error("[sendBookingConfirmation] RESEND_API_KEY and FROM_EMAIL must be set");
  }

  const html = await render(<BookingEmail b={b} />);

  const icsContent = generateICS({
    reference:     b.reference,
    categoryId:    b.categoryId,
    categoryLabel: b.categoryLabel,
    selections:    b.selections,
  });

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to: b.contact.email,
    subject: `Your Nepal booking — ${b.reference}`,
    html,
    attachments: [{
      filename:     `nepal-booking-${b.reference}.ics`,
      content:     Buffer.from(icsContent),
      contentType: "text/calendar; method=PUBLISH",
    }],
  });

  if (error) throw error;
}
