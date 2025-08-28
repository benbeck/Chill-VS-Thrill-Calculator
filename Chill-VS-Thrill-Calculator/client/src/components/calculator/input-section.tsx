import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { type CalculatorInputs } from "@/lib/calculator";
import { formatNumberWithCommas, parseNumberFromCommas } from "@/lib/utils";

interface InputSectionProps {
  inputs: CalculatorInputs;
  onInputChange: (key: keyof CalculatorInputs, value: number | string) => void;
}

export function InputSection({ inputs, onInputChange }: InputSectionProps) {
  const handleNumberChange = (key: keyof CalculatorInputs, value: string) => {
    const numericValue = parseNumberFromCommas(value);
    onInputChange(key, numericValue);
  };

  return (
    <div className="space-y-6">
      {/* Business Parameters - moved to top */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Business Parameters</h2>
          
          <div className="space-y-6">
            {/* Business Idea */}
            <div className="relative">
              <Label htmlFor="businessIdea" className="block text-sm font-medium text-slate-700 mb-2">
                Business Idea
              </Label>
              <Input
                id="businessIdea"
                type="text"
                value={inputs.businessIdea}
                onChange={(e) => onInputChange('businessIdea', e.target.value)}
                placeholder="e.g., SaaS Product, E-commerce Store, Consulting"
              />
            </div>

            {/* Total Investment Amount */}
            <div className="relative">
              <Label htmlFor="investmentAmount" className="block text-sm font-medium text-slate-700 mb-2">
                Total Investment Amount ($)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500">$</span>
                <Input
                  id="investmentAmount"
                  type="text"
                  value={formatNumberWithCommas(inputs.investmentAmount)}
                  onChange={(e) => handleNumberChange('investmentAmount', e.target.value)}
                  className="pl-8"
                  placeholder="100,000"
                />
              </div>
            </div>

            {/* Estimated Net Operating Income */}
            <div className="relative">
              <Label htmlFor="businessProfit" className="block text-sm font-medium text-slate-700 mb-2">
                Estimated Net Operating Income ($)
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500">$</span>
                <Input
                  id="businessProfit"
                  type="text"
                  value={formatNumberWithCommas(inputs.businessProfit)}
                  onChange={(e) => handleNumberChange('businessProfit', e.target.value)}
                  className="pl-8"
                  placeholder="75,000"
                />
              </div>
            </div>

            {/* Estimated Annual Growth */}
            <div className="relative">
              <Label htmlFor="businessGrowthRate" className="block text-sm font-medium text-slate-700 mb-2">
                Estimated Annual Growth (%)
              </Label>
              <div className="relative">
                <Input
                  id="businessGrowthRate"
                  type="number"
                  value={inputs.businessGrowthRate}
                  onChange={(e) => onInputChange('businessGrowthRate', parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="0"
                  max="100"
                  className="pr-8"
                />
                <span className="absolute right-3 top-3 text-slate-500">%</span>
              </div>
            </div>

            {/* Time Commitment */}
            <div className="relative">
              <Label htmlFor="timeCommitment" className="block text-sm font-medium text-slate-700 mb-2">
                Time Commitment (Hours/Week)
              </Label>
              <Input
                id="timeCommitment"
                type="number"
                value={inputs.timeCommitment}
                onChange={(e) => onInputChange('timeCommitment', parseFloat(e.target.value) || 0)}
                step="1"
                min="0"
                max="168"
              />
            </div>

            {/* Cost Per Hour */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="costPerHour" className="text-sm font-medium text-slate-700">
                  Your Time Value ($/Hour)
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-slate-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>What you could earn elsewhere or your opportunity cost</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-3 text-slate-500">$</span>
                <Input
                  id="costPerHour"
                  type="text"
                  value={formatNumberWithCommas(inputs.costPerHour)}
                  onChange={(e) => handleNumberChange('costPerHour', e.target.value)}
                  className="pl-8"
                  placeholder="50"
                />
              </div>
            </div>

            {/* Mental Effort Scale */}
            <div className="relative">
              <Label htmlFor="mentalEffort" className="block text-sm font-medium text-slate-700 mb-2">
                Mental Effort & Stress Level
              </Label>
              <Select value={inputs.mentalEffort} onValueChange={(value) => onInputChange('mentalEffort', value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High - Significant stress and mental resources</SelectItem>
                  <SelectItem value="medium">Medium - Moderate stress and effort</SelectItem>
                  <SelectItem value="low">Low - Minimal stress and mental load</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Time Horizon */}
            <div className="relative">
              <Label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-2">
                Time Horizon (Years)
              </Label>
              <Input
                id="duration"
                type="number"
                value={inputs.duration}
                onChange={(e) => onInputChange('duration', parseInt(e.target.value) || 0)}
                step="1"
                min="1"
                max="50"
              />
            </div>

            {/* Exit Value Configuration */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Label className="text-sm font-medium text-slate-700">
                  Potential Exit Value
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-slate-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Configure exit value as revenue multiplier or fixed cash amount</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              
              {/* Exit Type Toggle */}
              <div className="flex gap-2 mb-3">
                <Button
                  type="button"
                  variant={inputs.exitType === 'multiplier' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onInputChange('exitType', 'multiplier')}
                  className="flex-1"
                >
                  Multiplier
                </Button>
                <Button
                  type="button"
                  variant={inputs.exitType === 'cash' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onInputChange('exitType', 'cash')}
                  className="flex-1"
                >
                  Cash Amount
                </Button>
              </div>
              
              {/* Conditional Input */}
              {inputs.exitType === 'multiplier' ? (
                <div className="relative">
                  <Input
                    id="exitMultiplier"
                    type="number"
                    value={inputs.exitMultiplier}
                    onChange={(e) => onInputChange('exitMultiplier', parseFloat(e.target.value) || 0)}
                    step="0.1"
                    min="0"
                    max="20"
                    className="pr-8"
                    placeholder="Revenue multiplier"
                  />
                  <span className="absolute right-3 top-3 text-slate-500">x</span>
                </div>
              ) : (
                <div className="relative">
                  <span className="absolute left-3 top-3 text-slate-500">$</span>
                  <Input
                    id="exitCashAmount"
                    type="text"
                    value={formatNumberWithCommas(inputs.exitCashAmount)}
                    onChange={(e) => handleNumberChange('exitCashAmount', e.target.value)}
                    className="pl-8"
                    placeholder="1,000,000"
                  />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investment Parameters */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Investment Parameters</h2>
          
          <div className="space-y-6">
            {/* S&P 500 Return Input */}
            <div className="relative">
              <div className="flex items-center gap-2 mb-2">
                <Label htmlFor="sp500Return" className="text-sm font-medium text-slate-700">
                  S&P 500 Annual Return Average (%)
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-slate-500" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Historical average with dividends reinvested</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <Input
                  id="sp500Return"
                  type="number"
                  value={inputs.sp500Return}
                  onChange={(e) => onInputChange('sp500Return', parseFloat(e.target.value) || 0)}
                  step="0.1"
                  min="0"
                  max="50"
                  className="pr-8"
                />
                <span className="absolute right-3 top-3 text-slate-500">%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <Button 
        className="w-full bg-primary hover:bg-blue-700 text-white font-semibold py-4 px-6 text-base"
        size="lg"
      >
        Calculate & Compare Returns
      </Button>
    </div>
  );
}
