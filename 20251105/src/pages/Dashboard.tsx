import { mockStockData, mockChartData, mockNews } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, DollarSign, BarChart3, Newspaper, Bell } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroBackground from "@/assets/hero-background.jpg";

export default function Dashboard() {
  const formatCurrency = (value: number) => {
    if (value >= 1000000000000) return `$${(value / 1000000000000).toFixed(2)}T`;
    if (value >= 1000000000) return `$${(value / 1000000000).toFixed(2)}B`;
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    return `$${value.toFixed(2)}`;
  };

  const getCategoryName = (category: string): string => {
    switch (category) {
      case "product": return "제품 출시";
      case "earnings": return "기업 실적";
      case "technology": return "기술 혁신";
      case "partnership": return "파트너십";
      default: return category;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative py-20 overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(118, 185, 0, 0.9) 0%, rgba(0, 0, 0, 0.95) 100%), url(${heroBackground})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'overlay'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 text-center relative z-10"
        >
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-lg"
          >
            NVIDIA 투자자를 위한 종합 플랫폼
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-xl text-white/90 mb-8 drop-shadow-md"
          >
            실시간 주가 정보, 제품 기술, 투자자 자료를 한 곳에서
          </motion.p>
          
          {/* Real-time Price Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="glass-card inline-block px-8 py-6 backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl"
          >
            <div className="flex items-center gap-4">
              <div>
                <p className="text-white/80 text-sm mb-1">NVDA 실시간 주가</p>
                <p className="text-5xl font-bold text-white font-mono-numbers">
                  ${mockStockData.price.toFixed(2)}
                </p>
              </div>
              <Badge 
                className={`${
                  mockStockData.change >= 0 
                    ? 'bg-green-500 hover:bg-green-600' 
                    : 'bg-red-500 hover:bg-red-600'
                } text-white px-4 py-2 text-lg shadow-lg`}
              >
                {mockStockData.change >= 0 ? <TrendingUp className="inline mr-1" /> : <TrendingDown className="inline mr-1" />}
                {mockStockData.change >= 0 ? '+' : ''}{mockStockData.change.toFixed(2)} ({mockStockData.changePercent >= 0 ? '+' : ''}{mockStockData.changePercent.toFixed(2)}%)
              </Badge>
            </div>
            <p className="text-white/60 text-sm mt-3">
              {mockStockData.timestamp} 기준
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Key Metrics Grid */}
      <section className="container mx-auto px-4 py-12">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-8"
        >
          주요 지표
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Metric Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Card className="glass-card h-[240px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">실시간 주가</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono-numbers">${mockStockData.price.toFixed(2)}</div>
                <p className={`text-xs flex items-center gap-1 mt-1 ${mockStockData.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {mockStockData.change >= 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {mockStockData.change >= 0 ? '+' : ''}{mockStockData.change.toFixed(2)} ({mockStockData.changePercent >= 0 ? '+' : ''}{mockStockData.changePercent.toFixed(2)}%)
                </p>
                <div className="mt-4 h-16">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockChartData.slice(-7)}>
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="hsl(var(--primary))" 
                        fill="hsl(var(--primary))" 
                        fillOpacity={0.2}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Metric Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass-card h-[240px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">52주 최고/최저</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-muted-foreground">최고가</p>
                    <p className="text-xl font-bold font-mono-numbers text-green-500">${mockStockData.high52Week.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">최저가</p>
                    <p className="text-xl font-bold font-mono-numbers text-red-500">${mockStockData.low52Week.toFixed(2)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Metric Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Card className="glass-card h-[240px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">P/E Ratio</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono-numbers">{mockStockData.peRatio.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground mt-1">업계 평균 35.2</p>
                <Badge className="mt-3" variant="outline">평가 기준</Badge>
              </CardContent>
            </Card>
          </motion.div>

          {/* Metric Card 4 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass-card h-[240px]">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">거래량</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono-numbers">{(mockStockData.volume / 1000000).toFixed(1)}M</div>
                <p className="text-xs text-green-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +12.5%
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Recent News Preview */}
      <section className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-3xl font-bold">최신 NVIDIA 소식</h2>
          <Link to="/news">
            <Button variant="outline">더 보기</Button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockNews.slice(0, 3).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`/news/${article.id}`}>
                <Card className="glass-card hover-scale overflow-hidden group cursor-pointer h-full">
                  <CardHeader className="p-0">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={article.imageUrl}
                        alt={article.titleKo}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                        {getCategoryName(article.category)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <CardTitle className="text-lg mb-2 line-clamp-2">{article.titleKo}</CardTitle>
                    <CardDescription className="line-clamp-3 mb-4">{article.summaryKo}</CardDescription>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{article.publishedDate}</span>
                      <Badge variant="outline">{article.source}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
