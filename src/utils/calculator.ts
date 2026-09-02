export type CalculatorInput = {
  monthlyRevenue: number;
  monthlyCosts: number;
  flatRate: number;
  sicknessInsurance: boolean;
};

export type CalculatorResult = {
  MIESIACE: number;
  ZUS_PREFERENCYJNY: number;
  zusSpolecznyRoczny: number;
  zdrowotnaRyczaltRoczna: number;
  podatekRyczaltRoczny: number;
  razemRyczaltRoczny: number;
  zdrowotnaSkalaRoczna: number;
  podatekSkalaRoczny: number;
  razemSkalaRoczny: number;
};

const MONTHS = 12;
const START_RELIEF_MONTHS = 6;
const PREFERENTIAL_ZUS_MONTHS = MONTHS - START_RELIEF_MONTHS;
const PREFERENTIAL_ZUS_WITH_SICKNESS = 456.18;
const PREFERENTIAL_ZUS_WITHOUT_SICKNESS = 420.86;
const MINIMUM_SCALE_HEALTH_MONTHLY = 432.54;

export function calculateTaxComparison(input: CalculatorInput): CalculatorResult {
  const monthlyRevenue = Math.max(0, input.monthlyRevenue);
  const monthlyCosts = Math.max(0, input.monthlyCosts);
  const flatRate = Math.max(0, input.flatRate);
  const preferentialZus = input.sicknessInsurance
    ? PREFERENTIAL_ZUS_WITH_SICKNESS
    : PREFERENTIAL_ZUS_WITHOUT_SICKNESS;

  const annualRevenue = monthlyRevenue * MONTHS;
  const annualCosts = monthlyCosts * MONTHS;
  const annualSocialZus = preferentialZus * PREFERENTIAL_ZUS_MONTHS;

  // Ryczałt: paid social contributions reduce revenue for the health threshold.
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
    MIESIACE: MONTHS,
    ZUS_PREFERENCYJNY: preferentialZus,
    zusSpolecznyRoczny: annualSocialZus,
    zdrowotnaRyczaltRoczna: annualFlatRateHealth,
    podatekRyczaltRoczny: annualFlatRateTax,
    razemRyczaltRoczny: annualFlatRateTotal,
    zdrowotnaSkalaRoczna: annualScaleHealth,
    podatekSkalaRoczny: annualScaleTax,
    razemSkalaRoczny: annualScaleTotal,
  };
}
