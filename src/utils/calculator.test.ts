import { describe, expect, it } from "vitest";
import { calculateTaxComparison } from "./calculator";

describe("calculateTaxComparison", () => {
  it("calculates the default 10,000 / 1,000 / 8.5% scenario", () => {
    const result = calculateTaxComparison({
      monthlyRevenue: 10_000,
      monthlyCosts: 1_000,
      flatRate: 8.5,
      sicknessInsurance: true,
    });

    expect(result.ZUS_PREFERENCYJNY).toBe(456.18);
    expect(result.zusSpolecznyRoczny).toBeCloseTo(2_737.08, 2);
    expect(result.zdrowotnaRyczaltRoczna).toBeCloseTo(9_966.96, 2);
    expect(result.podatekRyczaltRoczny).toBeCloseTo(9_543.75, 2);
    expect(result.razemRyczaltRoczny).toBeCloseTo(22_247.79, 2);

    expect(result.podatekSkalaRoczny).toBeCloseTo(9_031.55, 2);
    expect(result.zdrowotnaSkalaRoczna).toBeCloseTo(9_473.66, 2);
    expect(result.razemSkalaRoczny).toBeCloseTo(21_242.29, 2);
  });

  it("uses the lower preferential ZUS without voluntary sickness insurance", () => {
    const result = calculateTaxComparison({
      monthlyRevenue: 10_000,
      monthlyCosts: 1_000,
      flatRate: 8.5,
      sicknessInsurance: false,
    });

    expect(result.ZUS_PREFERENCYJNY).toBe(420.86);
    expect(result.zusSpolecznyRoczny).toBeCloseTo(2_525.16, 2);
  });

  it("selects all three ryczałt health contribution thresholds", () => {
    const low = calculateTaxComparison({
      monthlyRevenue: 4_000,
      monthlyCosts: 0,
      flatRate: 8.5,
      sicknessInsurance: true,
    });
    const middle = calculateTaxComparison({
      monthlyRevenue: 10_000,
      monthlyCosts: 0,
      flatRate: 8.5,
      sicknessInsurance: true,
    });
    const high = calculateTaxComparison({
      monthlyRevenue: 30_000,
      monthlyCosts: 0,
      flatRate: 8.5,
      sicknessInsurance: true,
    });

    expect(low.zdrowotnaRyczaltRoczna).toBeCloseTo(498.35 * 12, 2);
    expect(middle.zdrowotnaRyczaltRoczna).toBeCloseTo(830.58 * 12, 2);
    expect(high.zdrowotnaRyczaltRoczna).toBeCloseTo(1_495.04 * 12, 2);
  });

  it("applies the tax-free amount and minimum scale health contribution", () => {
    const result = calculateTaxComparison({
      monthlyRevenue: 2_000,
      monthlyCosts: 500,
      flatRate: 8.5,
      sicknessInsurance: true,
    });

    expect(result.podatekSkalaRoczny).toBe(0);
    expect(result.zdrowotnaSkalaRoczna).toBeCloseTo(432.54 * 12, 2);
  });

  it("applies the 32% scale rate above 120,000 PLN", () => {
    const result = calculateTaxComparison({
      monthlyRevenue: 20_000,
      monthlyCosts: 0,
      flatRate: 12,
      sicknessInsurance: true,
    });

    const income = 240_000 - 456.18 * 6;
    const expectedTax = 10_800 + (income - 120_000) * 0.32;
    expect(result.podatekSkalaRoczny).toBeCloseTo(expectedTax, 2);
  });
});
