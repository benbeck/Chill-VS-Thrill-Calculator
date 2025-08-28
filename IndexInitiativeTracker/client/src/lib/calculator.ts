export interface CalculatorInputs {
  businessIdea: string;
  sp500Return: number;
  investmentAmount: number;
  duration: number;
  businessProfit: number;
  businessGrowthRate: number;
  exitType: 'multiplier' | 'cash';
  exitMultiplier: number;
  exitCashAmount: number;
  timeCommitment: number;
  costPerHour: number;
  mentalEffort: 'low' | 'medium' | 'high';
}

export interface CalculatorResults {
  sp500FinalValue: number;
  sp500Profit: number;
  sp500AnnualReturn: number;
  businessTotalRevenue: number;
  businessTotalProfit: number;
  businessFinalValue: number;
  businessExitValue: number;
  annualTimeCost: number;
  stressAdjustment: number;
  trueAnnualBusinessProfit: number;
  yearlyData: {
    year: number;
    sp500Value: number;
    businessValue: number;
    businessExitValue: number;
  }[];
}

export function calculateReturns(inputs: CalculatorInputs): CalculatorResults {
  // S&P 500 calculations with compound interest
  const sp500FinalValue = inputs.investmentAmount * Math.pow(1 + (inputs.sp500Return / 100), inputs.duration);
  const sp500Profit = sp500FinalValue - inputs.investmentAmount;
  const sp500AnnualReturn = inputs.investmentAmount * (inputs.sp500Return / 100);

  // Business calculations with growth
  const annualTimeCost = inputs.timeCommitment * 52 * inputs.costPerHour;
  
  // Mental effort multipliers
  const stressMultipliers = { low: 0.05, medium: 0.10, high: 0.20 };
  const stressAdjustment = inputs.businessProfit * stressMultipliers[inputs.mentalEffort];
  
  // Calculate business returns with compound growth
  let businessTotalRevenue = 0;
  let businessTotalProfit = 0;
  const yearlyData = [];
  let cumulativeBusinessProfit = 0;
  
  for (let year = 0; year < inputs.duration; year++) {
    const yearlyProfit = inputs.businessProfit * Math.pow(1 + (inputs.businessGrowthRate / 100), year);
    const yearlyStressAdjustment = yearlyProfit * stressMultipliers[inputs.mentalEffort];
    const trueYearlyProfit = yearlyProfit - annualTimeCost - yearlyStressAdjustment;
    
    businessTotalRevenue += yearlyProfit;
    businessTotalProfit += trueYearlyProfit;
    cumulativeBusinessProfit += trueYearlyProfit;
    
    // Calculate cumulative values for yearly chart
    const sp500ValueAtYear = inputs.investmentAmount * Math.pow(1 + (inputs.sp500Return / 100), year + 1);
    const businessValueAtYear = inputs.investmentAmount + cumulativeBusinessProfit;
    const cumulativeRevenue = businessTotalRevenue;
    
    yearlyData.push({
      year: year + 1,
      sp500Value: sp500ValueAtYear,
      businessValue: businessValueAtYear,
      businessExitValue: inputs.exitType === 'multiplier' 
        ? cumulativeRevenue * inputs.exitMultiplier 
        : inputs.exitCashAmount
    });
  }
  
  const businessFinalValue = inputs.investmentAmount + businessTotalProfit;
  const businessExitValue = inputs.exitType === 'multiplier' 
    ? businessTotalRevenue * inputs.exitMultiplier 
    : inputs.exitCashAmount;
  const trueAnnualBusinessProfit = businessTotalProfit / inputs.duration;

  return {
    sp500FinalValue,
    sp500Profit,
    sp500AnnualReturn,
    businessTotalRevenue,
    businessTotalProfit,
    businessFinalValue,
    businessExitValue,
    annualTimeCost,
    stressAdjustment,
    trueAnnualBusinessProfit,
    yearlyData
  };
}
