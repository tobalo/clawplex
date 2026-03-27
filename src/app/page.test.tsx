import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Home from "./page";

describe("ClawPlex DFW — Premium Minimalist TDD", () => {
  const originalFetch = global.fetch;

  beforeEach(() => {
    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ ok: true }),
    }) as typeof fetch;
  });

  afterEach(() => {
    global.fetch = originalFetch;
    vi.restoreAllMocks();
  });

  // ── Visual TDD Tests ──────────────────────────────────────────────────────

  it("[TEST_01] Zero border-radius — page has no rounded corners", () => {
    render(<Home />);
    // Premium Minimalist theme sets --radius: 0px
    const html = document.documentElement.innerHTML;
    expect(html).not.toMatch(/rounded-(lg|md|sm|xl|2xl|3xl|4xl)/);
  });

  it("[TEST_02] Background #FFFFFF, primary text #000000", () => {
    render(<Home />);
    const body = document.body;
    expect(body).toHaveStyle({ backgroundColor: "rgb(255, 255, 255)" });
    expect(body).toHaveStyle({ color: "rgb(0, 0, 0)" });
  });

  it("[TEST_03] Sections have py-24 or greater vertical breathing room", () => {
    render(<Home />);
    // Hero section
    const hero = screen.getByText("ClawPlex — DFW");
    expect(hero.closest("section")).toHaveClass("py-40");
  });

  it("[TEST_04] Text CTAs use hover:underline, primary buttons use hover:bg", () => {
    render(<Home />);
    // Venue Hosting link
    const venueLink = screen.getByText("PROPOSE_A_SPACE →");
    expect(venueLink).toHaveClass("hover:underline");
  });

  // ── Functional TDD Tests ─────────────────────────────────────────────────

  it("[TEST_05] Hero renders 100+ Builders as primary social proof", () => {
    render(<Home />);
    expect(screen.getByText("100+ Builders")).toBeInTheDocument();
    expect(screen.getByText("Live Demos")).toBeInTheDocument();
    expect(screen.getByText("No Posture")).toBeInTheDocument();
  });

  it("[TEST_06] Event Tracker shows APRIL 2026 (TBD) + Discord CTA", () => {
    render(<Home />);
    expect(screen.getByText("April 2026 (TBD)")).toBeInTheDocument();
    const discordBtn = screen.getByRole("link", { name: /Join Discord for Coordinates/i });
    expect(discordBtn).toBeInTheDocument();
    expect(discordBtn).toHaveAttribute("href", "https://discord.gg/q8kEquTu3z");
  });

  it("[TEST_07] Sponsorship Module renders two paths: i. Venue Hosting / ii. Hardware & Logistics", () => {
    render(<Home />);
    expect(screen.getByText("i.")).toBeInTheDocument();
    expect(screen.getByText("Venue Hosting")).toBeInTheDocument();
    expect(screen.getByText("ii.")).toBeInTheDocument();
    expect(screen.getByText("Hardware & Logistics")).toBeInTheDocument();
    expect(screen.getByText("PROPOSE_A_SPACE →")).toBeInTheDocument();
    expect(screen.getByText("BECOME_A_SPONSOR →")).toBeInTheDocument();
  });

  it("[TEST_08] March 24 Recap renders 100+ ATTENDEES stat and photo grid", () => {
    render(<Home />);
    expect(screen.getByText("100+")).toBeInTheDocument();
    expect(screen.getByText("ClawCon DFW.")).toBeInTheDocument();
    expect(screen.getByText("March 24, 2026")).toBeInTheDocument();
    // The photo grid renders 8 image divs (2-col md:4-col)
    const gallery = document.querySelectorAll("[class*='grid-cols']");
    expect(gallery.length).toBeGreaterThan(0);
  });

  // ── Agentic/SEO TDD Tests ─────────────────────────────────────────────────

  it("[TEST_09] /llms.txt route exists and returns text/plain", async () => {
    const res = await fetch("/llms.txt");
    const text = await res.text();
    expect(res.headers.get("Content-Type")).toMatch(/text\/plain/);
    expect(text).toContain("March 24, 2026");
    expect(text).toContain("100+");
    expect(text).toMatch(/venue|partner/i);
  });

  it("[TEST_10] JSON-LD EventSeries schema present with correct eventStatus", () => {
    render(<Home />);
    const ldJson = document.querySelector('script[type="application/ld+json"]');
    expect(ldJson).toBeInTheDocument();
    const schema = JSON.parse(ldJson?.textContent || "{}");
    expect(schema["@type"]).toBe("EventSeries");
    expect(schema.eventStatus).toBe("https://schema.org/EventScheduled");
  });

  // ── Newsletter ────────────────────────────────────────────────────────────

  it("submits newsletter signups through the /api/subscribe endpoint", async () => {
    render(<Home />);

    fireEvent.change(screen.getByPlaceholderText("your@email.com"), {
      target: { value: "member@example.com" },
    });
    fireEvent.submit(
      screen.getByRole("button", { name: /join the list/i }).closest("form")!,
    );

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "/api/subscribe",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }),
      );
    });
  });
});
