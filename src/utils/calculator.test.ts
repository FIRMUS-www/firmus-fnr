import { describe, expect, it } from "vitest";
import { calculateTaxComparison, getMonthlySocialZus } from "./calculator";

const defaults = {
  monthlyRevenue: 10_000,
  monthlyCosts: 1_000,
  flatRate: 8.5,
  sicknessInsurance: true,
} as const;

describe("calculateTaxComparison", () => {
  it("uses no social contributions during start relief", () => {
    const result = calculateTaxComparison({
      ...defaults,
      contributionStage: "start",
    });

    expect(result.monthlySocialZus).toBe(0);
    expect(result.annualSocialZus).toBe(0);
    expect(result.annualFlatRateTotal).toBeCloseTo(19_743.36, 2);
    expect(result.annualScaleTotal).toBeCloseTo(19_080, 2);
  });

  it("uses preferential contributions in months 7–30", () => {
    const result = calculateTaxComparison({
      ...defaults,
      contributionStage: "preferential",
    });

    expect(result.monthlySocialZus).toBe(456.18);
    expect(result.annualSocialZus).toBeCloseTo(5_474.16, 2);
  });

  it("uses standard contributions from month 31", () => {
    const withSickness = getMonthlySocialZus("standard", true);
    const withoutSickness = getMonthlySocialZus("standard", false);

    expect(withSickness).toBe(1_926.76);
    expect(withoutSickness).toBe(1_788.29);
  });

  it("selects all three ryczałt health contribution thresholds", () => {
    const calculate = (monthlyRevenue: number) =>
      calculateTaxComparison({
        ...defaults,
        monthlyRevenue,
        monthlyCosts: 0,
        contributionStage: "start",
      });

    expect(calculate(4_000).annualFlatRateHealth).toBeCloseTo(498.35 * 12, 2);
    expect(calculate(10_000).annualFlatRateHealth).toBeCloseTo(830.58 * 12, 2);
    expect(calculate(30_000).annualFlatRateHealth).toBeCloseTo(1_495.04 * 12, 2);
  });

  it("applies the tax-free amount and minimum scale health contribution", () => {
    const result = calculateTaxComparison({
      monthlyRevenue: 2_000,
      monthlyCosts: 500,
      flatRate: 8.5,
      sicknessInsurance: true,
      contributionStage: "start",
    });

    expect(result.annualScaleTax).toBe(0);
    expect(result.annualScaleHealth).toBeCloseTo(432.54 * 12, 2);
  });

  it("applies the 32% scale rate above 120,000 PLN", () => {
    const result = calculateTaxComparison({
      monthlyRevenue: 20_000,
      monthlyCosts: 0,
      flatRate: 12,
      sicknessInsurance: true,
      contributionStage: "standard",
    });

    const income = 240_000 - 1_926.76 * 12;
    const expectedTax = 10_800 + (income - 120_000) * 0.32;
    expect(result.annualScaleTax).toBeCloseTo(expectedTax, 2);
  });
});
