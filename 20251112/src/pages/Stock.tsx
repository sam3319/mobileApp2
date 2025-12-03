import { useState, useEffect } from "react";
import { mockStockData as initialStockData, mockChartData as initialChartData } from "@/data/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { TrendingUp, TrendingDown, Filter, Bell, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { PriceAlert } from "@/types";

export default function Stock() {
  const [mockStockData, setMockStockData] = useState(initialStockData);
  const [mockChartData, setMockChartData] = useState(initialChartData);
  const [timeRange, setTimeRange] = useState("1개월");
  const [chartType, setChartType] = useState<"area" | "line">("area");
  const [showFilters, setShowFilters] = useState(false);
  const [volumeFilter, setVolumeFilter] = useState("all");
  const [technicalIndicator, setTechnicalIndicator] = useState("none");
  const [priceRange, setPriceRange] = useState([initialStockData.low52Week, initialStockData.high52Week]);
  const [alerts, setAlerts] = useState<PriceAlert[]>([]);
  const [newAlertPrice, setNewAlertPrice] = useState("");
  const [newAlertCondition, setNewAlertCondition] = useState<"above" | "below">("above");

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMockStockData(prev => {
        const change = (Math.random() - 0.5) * 2;
        const newPrice = prev.price + change;
        const newChange = newPrice - prev.open;
        const newChangePercent = (newChange / prev.open) * 100;
        
        return {
          ...prev,
          price: newPrice,
          change: newChange,
          changePercent: newChangePercent,
          timestamp: new Date().toLocaleString('ko-KR'),
        };
      });

      setMockChartData(prev => {
        const newDataPoint = {
          timestamp: new Date().toLocaleTimeString('ko-KR'),
          price: mockStockData.price,
          volume: Math.floor(Math.random() * 10000000) + 50000000,
        };
        return [...prev.slice(-50), newDataPoint];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [mockStockData.price]);

  // Load alerts from localStorage
  useEffect(() => {
    const savedAlerts = localStorage.getItem("priceAlerts");
    if (savedAlerts) {
      setAlerts(JSON.parse(savedAlerts));
    }
  }, []);

  // Save alerts to localStorage
  useEffect(() => {
    localStorage.setItem("priceAlerts", JSON.stringify(alerts));
  }, [alerts]);

  // Check alerts
  useEffect(() => {
    alerts.forEach(alert => {
      if (!alert.active) return;
      
      if (alert.condition === "above" && mockStockData.price >= alert.targetPrice) {
        toast.success(`가격 알림: $${mockStockData.price}가 목표가 $${alert.targetPrice}을 넘었습니다!`);
        setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, active: false } : a));
      } else if (alert.condition === "below" && mockStockData.price <= alert.targetPrice) {
        toast.success(`가격 알림: $${mockStockData.price}가 목표가 $${alert.targetPrice} 아래로 떨어졌습니다!`);
        setAlerts(prev => prev.map(a => a.id === alert.id ? { ...a, active: false } : a));
      }
    });
  }, [alerts]);

  const addAlert = () => {
    const price = parseFloat(newAlertPrice);
    if (isNaN(price) || price <= 0) {
      toast.error("유효한 가격을 입력하세요");
      return;
    }

    const newAlert: PriceAlert = {
      id: Date.now().toString(),
      targetPrice: price,
      condition: newAlertCondition,
      createdAt: new Date().toISOString(),
      active: true,
    };

    setAlerts([...alerts, newAlert]);
    setNewAlertPrice("");
    toast.success("가격 알림이 추가되었습니다");
  };

  const removeAlert = (id: string) => {
    setAlerts(alerts.filter(a => a.id !== id));
    toast.success("알림이 삭제되었습니다");
  };

  const timeRanges = ["1일", "1주", "1개월", "3개월", "6개월", "1년"];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Live Ticker */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6 mb-8"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">NVDA</p>
              <p className="text-4xl font-bold font-mono-numbers">${mockStockData.price.toFixed(2)}</p>
            </div>
            <Badge className={mockStockData.change >= 0 ? "bg-primary" : "bg-destructive"}>
              {mockStockData.change >= 0 ? <TrendingUp className="mr-1 h-4 w-4" /> : <TrendingDown className="mr-1 h-4 w-4" />}
              {mockStockData.change >= 0 ? "+" : ""}{mockStockData.change.toFixed(2)} ({mockStockData.changePercent >= 0 ? "+" : ""}{mockStockData.changePercent.toFixed(2)}%)
            </Badge>
          </div>
          <Badge className={mockStockData.marketStatus === "open" ? "bg-primary" : "bg-muted"}>
            {mockStockData.marketStatus === "open" ? "장중" : "장마감"}
          </Badge>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Section */}
        <div className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>주가 차트</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  필터
                </Button>
              </div>

              {/* Filters */}
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="glass-card p-4 mt-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>거래량 필터</Label>
                      <Select value={volumeFilter} onValueChange={setVolumeFilter}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체</SelectItem>
                          <SelectItem value="high">높음</SelectItem>
                          <SelectItem value="low">낮음</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>기술적 지표</Label>
                      <Select value={technicalIndicator} onValueChange={setTechnicalIndicator}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">없음</SelectItem>
                          <SelectItem value="ma">이동평균</SelectItem>
                          <SelectItem value="rsi">RSI</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>가격 범위: ${priceRange[0]} - ${priceRange[1]}</Label>
                      <Slider
                        min={0}
                        max={300}
                        step={10}
                        value={priceRange}
                        onValueChange={setPriceRange}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Time Range */}
              <div className="flex gap-2 mt-4 flex-wrap">
                {timeRanges.map((range) => (
                  <Button
                    key={range}
                    variant={timeRange === range ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTimeRange(range)}
                  >
                    {range}
                  </Button>
                ))}
              </div>

              {/* Chart Type */}
              <div className="flex gap-2 mt-4">
                <Button
                  variant={chartType === "area" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("area")}
                >
                  영역
                </Button>
                <Button
                  variant={chartType === "line" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setChartType("line")}
                >
                  선형
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="h-[500px]">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === "area" ? (
                    <AreaChart data={mockChartData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Area type="monotone" dataKey="price" stroke="hsl(var(--primary))" fill="url(#colorPrice)" />
                    </AreaChart>
                  ) : (
                    <LineChart data={mockChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="timestamp" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip />
                      <Line type="monotone" dataKey="price" stroke="hsl(var(--primary))" strokeWidth={2} />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Statistics */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg">키 통계</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">시가</p>
                <p className="font-mono-numbers font-semibold">${mockStockData.open.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">고가</p>
                <p className="font-mono-numbers font-semibold">${mockStockData.high.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">저가</p>
                <p className="font-mono-numbers font-semibold">${mockStockData.low.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">거래량</p>
                <p className="font-mono-numbers font-semibold">{(mockStockData.volume / 1000000).toFixed(1)}M</p>
              </div>
              <div>
                <p className="text-muted-foreground">시가총액</p>
                <p className="font-mono-numbers font-semibold">${(mockStockData.marketCap / 1000000000000).toFixed(2)}T</p>
              </div>
              <div>
                <p className="text-muted-foreground">P/E Ratio</p>
                <p className="font-mono-numbers font-semibold">{mockStockData.peRatio.toFixed(2)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Price Alerts */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Bell className="h-5 w-5" />
                가격 알림 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>목표 가격</Label>
                <Input
                  type="number"
                  placeholder="예: 200.00"
                  value={newAlertPrice}
                  onChange={(e) => setNewAlertPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>조건</Label>
                <Select value={newAlertCondition} onValueChange={(v: "above" | "below") => setNewAlertCondition(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="above">가격이 이상일 때</SelectItem>
                    <SelectItem value="below">가격이 이하일 때</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={addAlert} className="w-full">
                <Bell className="mr-2 h-4 w-4" />
                알림 추가
              </Button>

              <div className="space-y-2 mt-4">
                <Label className="text-sm font-semibold">활성 알림</Label>
                <AnimatePresence>
                  {alerts.length === 0 ? (
                    <p className="text-sm text-muted-foreground">설정된 알림이 없습니다</p>
                  ) : (
                    alerts.map((alert) => (
                      <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex items-center justify-between p-3 glass-card"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            ${alert.targetPrice.toFixed(2)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {alert.condition === "above" ? "이상" : "이하"}
                            {!alert.active && " (완료)"}
                          </p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeAlert(alert.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </motion.div>
                    ))
                  )}
                </AnimatePresence>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
