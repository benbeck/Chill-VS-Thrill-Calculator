import { useState, useEffect } from "react";
import { InputSection } from "@/components/calculator/input-section";
import { ResultsSection } from "@/components/calculator/results-section";
import {
  calculateReturns,
  type CalculatorInputs,
  type CalculatorResults,
} from "@/lib/calculator";

const defaultInputs: CalculatorInputs = {
  businessIdea: "SaaS Product",
  sp500Return: 10.5,
  investmentAmount: 100000,
  duration: 10,
  businessProfit: 75000,
  businessGrowthRate: 5,
  exitType: "multiplier",
  exitMultiplier: 3,
  exitCashAmount: 1000000,
  timeCommitment: 40,
  costPerHour: 50,
  mentalEffort: "medium",
};

export default function Calculator() {
  const [inputs, setInputs] = useState<CalculatorInputs>(defaultInputs);
  const [results, setResults] = useState<CalculatorResults | null>(null);

  useEffect(() => {
    const newResults = calculateReturns(inputs);
    setResults(newResults);
  }, [inputs]);

  const updateInput = (key: keyof CalculatorInputs, value: number | string) => {
    setInputs((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-slate-900">
              Index vs Initiative Calculator
            </h1>
            <p className="mt-2 text-lg text-slate-600">
              Compare S&P 500 returns with your business venture potential
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <InputSection inputs={inputs} onInputChange={updateInput} />
          {results && <ResultsSection inputs={inputs} results={results} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-slate-600">
            <p className="text-sm">
              This calculator provides estimates based on historical data and
              your inputs. Consult a financial advisor for personalized advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
