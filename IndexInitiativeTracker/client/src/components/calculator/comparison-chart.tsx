import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface ComparisonChartProps {
  sp500Value: number;
  businessValue: number;
  businessExitValue: number;
  yearlyData: {
    year: number;
    sp500Value: number;
    businessValue: number;
    businessExitValue: number;
  }[];
  chartType: 'bar' | 'line';
  onChartTypeChange: (type: 'bar' | 'line') => void;
}

export function ComparisonChart({ 
  sp500Value, 
  businessValue, 
  businessExitValue, 
  yearlyData, 
  chartType, 
  onChartTypeChange 
}: ComparisonChartProps) {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (!chartRef.current || !yearlyData || yearlyData.length === 0) return;

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    if (chartType === 'bar') {
      // Bar chart for total comparison
      chartInstance.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['S&P 500 Investment', 'Business Initiative', 'Exit Scenario'],
          datasets: [{
            label: 'Total Return',
            data: [sp500Value, businessValue, businessExitValue],
            backgroundColor: ['#2563EB', '#10B981', '#F59E0B'],
            borderColor: ['#1D4ED8', '#059669', '#D97706'],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(context.parsed.y);
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(value as number);
                }
              }
            }
          }
        }
      });
    } else {
      // Line chart for yearly comparison
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: yearlyData.map(d => `Year ${d.year}`),
          datasets: [
            {
              label: 'S&P 500',
              data: yearlyData.map(d => d.sp500Value),
              borderColor: '#2563EB',
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              borderWidth: 3,
              fill: false,
              tension: 0.1
            },
            {
              label: 'Business Initiative',
              data: yearlyData.map(d => d.businessValue),
              borderColor: '#10B981',
              backgroundColor: 'rgba(16, 185, 129, 0.1)',
              borderWidth: 3,
              fill: false,
              tension: 0.1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(context.parsed.y)}`;
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                  }).format(value as number);
                }
              }
            },
            x: {
              title: {
                display: true,
                text: 'Time Period'
              }
            }
          }
        }
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [sp500Value, businessValue, businessExitValue, yearlyData, chartType]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Chart Type Toggle */}
      <div className="flex gap-2 mb-4 flex-shrink-0">
        <button
          onClick={() => onChartTypeChange('bar')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            chartType === 'bar' 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Total Comparison
        </button>
        <button
          onClick={() => onChartTypeChange('line')}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            chartType === 'line' 
              ? 'bg-primary text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          Yearly Trend
        </button>
      </div>
      <div className="flex-1 relative min-h-0">
        <canvas ref={chartRef} className="absolute inset-0 w-full h-full" />
      </div>
    </div>
  );
}
