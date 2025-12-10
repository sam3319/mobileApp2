// NVIDIA Asset - TypeScript Type Definitions

export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  peRatio: number;
  eps: number;
  high52Week: number;
  low52Week: number;
  open: number;
  high: number;
  low: number;
  avgVolume: number;
  beta: number;
  dividendYield: number;
  timestamp: string;
  marketStatus: 'open' | 'closed';
}

export interface ChartDataPoint {
  timestamp: string;
  price: number;
  volume?: number;
}

export interface NewsArticle {
  id: number;
  title: string;
  titleKo: string;
  summary: string;
  summaryKo: string;
  content: string;
  contentKo: string;
  category: 'product' | 'earnings' | 'technology' | 'partnership';
  publishedDate: string;
  imageUrl: string;
  source: string;
  readTime: number;
  views: number;
  featured?: boolean;
}

export interface Product {
  id: number;
  name: string;
  nameKo: string;
  category: 'ai' | 'gaming' | 'automotive' | 'professional';
  description: string;
  descriptionKo: string;
  imageUrl: string;
  specs: Record<string, string>;
  releaseDate: string;
  price?: number;
}

export interface FinancialData {
  quarter: string;
  revenue: number;
  netIncome: number;
  grossMargin: number;
  operatingMargin: number;
  eps: number;
}

export interface PriceAlert {
  id: string;
  targetPrice: number;
  condition: 'above' | 'below';
  createdAt: string;
  active: boolean;
}
