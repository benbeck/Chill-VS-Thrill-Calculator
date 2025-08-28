import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ComparisonChart } from "./comparison-chart";
import { Info } from "lucide-react";
import { type CalculatorInputs, type CalculatorResults } from "@/lib/calculator";
import { formatCurrency } from "@/lib/utils";

interface ResultsSectionProps {
  inputs: CalculatorInputs;
  results: CalculatorResults;
}

export function ResultsSection({ inputs, results }: ResultsSectionProps) {
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');

  const getRecommendation = () => {
    const difference = Math.abs(results.sp500FinalValue - results.businessFinalValue);
    const percentDifference = (difference / Math.max(results.sp500FinalValue, results.businessFinalValue) * 100).toFixed(1);

    if (results.sp500FinalValue > results.businessFinalValue) {
      return `Based on your inputs, <strong>S&P 500 investment appears more favorable</strong> by ${formatCurrency(difference)} (${percentDifference}% better). The business initiative shows lower returns when accounting for opportunity costs and stress factors.`;
    } else {
      return `Based on your inputs, <strong>the business initiative appears more favorable</strong> by ${formatCurrency(difference)} (${percentDifference}% better). However, consider the additional risks and uncertainties of business ownership.`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">S&P 500</h3>
              <div className="h-3 w-3 bg-primary rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(results.sp500FinalValue, false, true)}</div>
              <div className="text-sm text-slate-600">Total Return</div>
              <div className="text-lg font-semibold text-success">+{formatCurrency(results.sp500Profit, false, true)}</div>
              <div className="text-sm text-slate-500">Net Profit</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">{inputs.businessIdea || 'Business Initiative'}</h3>
              <div className="h-3 w-3 bg-success rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(results.businessTotalRevenue, false, true)}</div>
              <div className="text-sm text-slate-600">Total Revenue</div>
              <div className={`text-lg font-semibold ${results.businessTotalProfit >= 0 ? 'text-success' : 'text-destructive'}`}>
                {formatCurrency(results.businessTotalProfit, true, true)}
              </div>
              <div className="text-sm text-slate-500">Net Profit</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Exit Scenario</h3>
              <div className="h-3 w-3 bg-warning rounded-full"></div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-slate-900">{formatCurrency(results.businessExitValue, false, true)}</div>
              <div className="text-sm text-slate-600">
                {inputs.exitType === 'multiplier' 
                  ? `Exit Value (${inputs.exitMultiplier}x Revenue)` 
                  : 'Exit Value (Fixed Amount)'}
              </div>
              <div className="text-lg font-semibold text-success">+{formatCurrency(results.businessExitValue - inputs.investmentAmount, false, true)}</div>
              <div className="text-sm text-slate-500">Net Profit</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendation */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-6">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Info className="w-5 h-5 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Recommendation</h3>
            <p 
              className="text-slate-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: getRecommendation() }}
            />
          </div>
        </div>
      </div>

      {/* Chart Container */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Returns Comparison</h3>
          <div className="h-96 w-full relative">
            <ComparisonChart 
              sp500Value={results.sp500FinalValue}
              businessValue={results.businessFinalValue}
              businessExitValue={results.businessExitValue}
              yearlyData={results.yearlyData}
              chartType={chartType}
              onChartTypeChange={setChartType}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Breakdown Table */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Detailed Breakdown</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-2 font-medium text-slate-600">Metric</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-600">S&P 500</th>
                  <th className="text-right py-3 px-2 font-medium text-slate-600">Business</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-2 text-slate-700">Initial Investment</td>
                  <td className="py-3 px-2 text-right text-slate-900">{formatCurrency(inputs.investmentAmount)}</td>
                  <td className="py-3 px-2 text-right text-slate-900">{formatCurrency(inputs.investmentAmount)}</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-slate-700">Annual Revenue</td>
                  <td className="py-3 px-2 text-right text-slate-900">{formatCurrency(results.sp500AnnualReturn)}</td>
                  <td className="py-3 px-2 text-right text-slate-900">{formatCurrency(inputs.businessProfit)}</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-slate-700">Time Cost (Annual)</td>
                  <td className="py-3 px-2 text-right text-slate-900">$0</td>
                  <td className="py-3 px-2 text-right text-slate-900">-{formatCurrency(results.annualTimeCost)}</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-slate-700">Stress Adjustment</td>
                  <td className="py-3 px-2 text-right text-slate-900">$0</td>
                  <td className="py-3 px-2 text-right text-slate-900">-{formatCurrency(results.stressAdjustment)}</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-3 px-2 font-semibold text-slate-900">True Annual Profit</td>
                  <td className="py-3 px-2 text-right font-semibold text-slate-900">{formatCurrency(results.sp500AnnualReturn)}</td>
                  <td className={`py-3 px-2 text-right font-semibold ${results.trueAnnualBusinessProfit >= 0 ? 'text-slate-900' : 'text-destructive'}`}>
                    {formatCurrency(results.trueAnnualBusinessProfit, true)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-2 text-slate-700">Annual Growth</td>
                  <td className="py-3 px-2 text-right text-slate-900">{inputs.sp500Return}%</td>
                  <td className="py-3 px-2 text-right text-slate-900">{inputs.businessGrowthRate}%</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="py-3 px-2 font-semibold text-slate-900">{inputs.duration}-Year Total</td>
                  <td className="py-3 px-2 text-right font-semibold text-success">{formatCurrency(results.sp500FinalValue)}</td>
                  <td className={`py-3 px-2 text-right font-semibold ${results.businessFinalValue >= 0 ? 'text-success' : 'text-destructive'}`}>
                    {formatCurrency(results.businessFinalValue, true)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
