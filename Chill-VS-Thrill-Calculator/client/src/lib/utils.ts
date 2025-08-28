import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, showSign = false, abbreviated = false): string {
  if (amount === 0) return '$0';
  
  if (abbreviated && Math.abs(amount) >= 1000000) {
    let value: number, suffix: string;
    if (Math.abs(amount) >= 1000000000) {
      value = amount / 1000000000;
      suffix = 'B';
    } else {
      value = amount / 1000000;
      suffix = 'M';
    }
    
    // Format to exactly 4 significant digits
    let formatted: string;
    if (value >= 10) {
      formatted = value.toFixed(2);
    } else {
      formatted = value.toFixed(3);
    }
    formatted = formatted.replace(/\.?0+$/, '');
    
    const sign = (showSign && amount < 0) ? '-' : '';
    return `${sign}$${formatted}${suffix}`;
  }
  
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(Math.abs(amount));
  
  if (showSign && amount < 0) {
    return '-' + formatted;
  }
  return formatted;
}

export function formatNumberWithCommas(value: number | string): string {
  const num = typeof value === 'string' ? parseFloat(value) || 0 : value;
  return new Intl.NumberFormat('en-US').format(num);
}

export function parseNumberFromCommas(value: string): number {
  return parseFloat(value.replace(/,/g, '')) || 0;
}
