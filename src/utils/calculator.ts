export type ContributionStage = "start" | "preferential" | "standard";

export type CalculatorInput = {
  monthlyRevenue: number;
  monthlyCosts: number;
  flatRate: number;
  sicknessInsurance: boolean;
  contributionStage: ContributionStage;
};

export type CalculatorResult = {
  MONTHS: number;
  monthlySocialZus: number;
  annualSocialZus: number;
  annualFlatRateHealth: number;
  annualFlatRateTax: number;
  annualFlatRateTotal: number;
  annualScaleHealth: number;
  annualScaleTax: number;
  annualScaleTotal: number;
};

const MONTHS = 12;
const PREFERENTIAL_ZUS_WITH_SICKNESS = 456.18;
const PREFERENTIAL_ZUS_WITHOUT_SICKNESS = 420.86;
const STANDARD_ZUS_WITH_SICKNESS = 1_926.76;
const STANDARD_ZUS_WITHOUT_SICKNESS = 1_788.29;
const MINIMUM_SCALE_HEALTH_MONTHLY = 432.54;

export function getMonthlySocialZus(
  stage: ContributionStage,
  sicknessInsurance: boolean,
): number {
  if (stage === "start") return 0;
  if (stage === "preferential") {
    return sicknessInsurance
      ? PREFERENTIAL_ZUS_WITH_SICKNESS
      : PREFERENTIAL_ZUS_WITHOUT_SICKNESS;
  }
  return sicknessInsurance
    ? STANDARD_ZUS_WITH_SICKNESS
    : STANDARD_ZUS_WITHOUT_SICKNESS;
}

export function calculateTaxComparison(input: CalculatorInput): CalculatorResult {
  const monthlyRevenue = Math.max(0, input.monthlyRevenue);
  const monthlyCosts = Math.max(0, input.monthlyCosts);
  const flatRate = Math.max(0, input.flatRate);
  const monthlySocialZus = getMonthlySocialZus(
    input.contributionStage,
    input.sicknessInsurance,
  );

  const annualRevenue = monthlyRevenue * MONTHS;
  const annualCosts = monthlyCosts * MONTHS;
  const annualSocialZus = monthlySocialZus * MONTHS;

  // Ryczałt: paid social contributions reduce revenue used for the health threshold.
  const healthThresholdRevenue = Math.max(0, annualRevenue - annualSocialZus);
  const flatRateHealthMonthly =
    healthThresholdRevenue <= 60_000
      ? 498.35
      : healthThresholdRevenue <= 300_000
        ? 830.58
        : 1_495.04;
  const annualFlatRateHealth = flatRateHealthMonthly * MONTHS;

  // Social contributions and 50% of paid health contributions reduce taxable revenue.
  const flatRateTaxBase = Math.max(
    0,
    annualRevenue - annualSocialZus - annualFlatRateHealth * 0.5,
  );
  const annualFlatRateTax = flatRateTaxBase * (flatRate / 100);
  const annualFlatRateTotal = annualFlatRateTax + annualFlatRateHealth + annualSocialZus;

  // Scale: social contributions reduce income; health contribution is not tax-deductible.
  const scaleIncome = Math.max(0, annualRevenue - annualCosts - annualSocialZus);
  const annualScaleTax = Math.max(
    0,
    scaleIncome <= 30_000
      ? 0
      : scaleIncome <= 120_000
        ? scaleIncome * 0.12 - 3_600
        : 10_800 + (scaleIncome - 120_000) * 0.32,
  );
  const annualScaleHealth = Math.max(
    scaleIncome * 0.09,
    MINIMUM_SCALE_HEALTH_MONTHLY * MONTHS,
  );
  const annualScaleTotal = annualScaleTax + annualScaleHealth + annualSocialZus;

  return {
    MONTHS,
    monthlySocialZus,
    annualSocialZus,
    annualFlatRateHealth,
    annualFlatRateTax,
    annualFlatRateTotal,
    annualScaleHealth,
    annualScaleTax,
    annualScaleTotal,
  };
}
