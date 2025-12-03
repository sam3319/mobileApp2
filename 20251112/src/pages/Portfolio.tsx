import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Plus, X, DollarSign, PieChart } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { mockStockData } from "@/data/mockData";

interface PortfolioItem {
  id: string;
  shares: number;
  purchasePrice: number;
  purchaseDate: string;
}

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [newShares, setNewShares] = useState("");
  const [newPrice, setNewPrice] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("nvda-portfolio");
    if (saved) {
      setPortfolio(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nvda-portfolio", JSON.stringify(portfolio));
  }, [portfolio]);

  const addPosition = () => {
    const shares = parseFloat(newShares);
    const price = parseFloat(newPrice);

    if (isNaN(shares) || isNaN(price) || shares <= 0 || price <= 0) {
      toast.error("유효한 수량과 가격을 입력하세요");
      return;
    }

    const newPosition: PortfolioItem = {
      id: Date.now().toString(),
      shares,
      purchasePrice: price,
      purchaseDate: new Date().toISOString().split("T")[0],
    };

    setPortfolio([...portfolio, newPosition]);
    setNewShares("");
    setNewPrice("");
    toast.success("포지션이 추가되었습니다");
  };

  const removePosition = (id: string) => {
    setPortfolio(portfolio.filter((p) => p.id !== id));
    toast.success("포지션이 삭제되었습니다");
  };

  const totalShares = portfolio.reduce((sum, item) => sum + item.shares, 0);
  const totalInvestment = portfolio.reduce((sum, item) => sum + item.shares * item.purchasePrice, 0);
  const currentValue = totalShares * mockStockData.price;
  const totalGainLoss = currentValue - totalInvestment;
  const totalGainLossPercent = totalInvestment > 0 ? (totalGainLoss / totalInvestment) * 100 : 0;
  const averagePrice = totalShares > 0 ? totalInvestment / totalShares : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">NVDA 포트폴리오</h1>
        <p className="text-muted-foreground">나의 NVIDIA 주식 투자 현황</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 보유 주식</CardTitle>
              <PieChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono-numbers">{totalShares.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">평균 매입가: ${averagePrice.toFixed(2)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">총 투자금</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono-numbers">${totalInvestment.toFixed(2)}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">현재 가치</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-mono-numbers">${currentValue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground mt-1">현재가: ${mockStockData.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">손익</CardTitle>
              {totalGainLoss >= 0 ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
            </CardHeader>
            <CardContent>
              <div className={`text-3xl font-bold font-mono-numbers ${totalGainLoss >= 0 ? "text-success" : "text-destructive"}`}>
                ${totalGainLoss.toFixed(2)}
              </div>
              <p className={`text-xs mt-1 ${totalGainLoss >= 0 ? "text-success" : "text-destructive"}`}>
                {totalGainLoss >= 0 ? "+" : ""}{totalGainLossPercent.toFixed(2)}%
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Tabs defaultValue="positions" className="space-y-6">
        <TabsList className="glass-card">
          <TabsTrigger value="positions">보유 포지션</TabsTrigger>
          <TabsTrigger value="add">포지션 추가</TabsTrigger>
        </TabsList>

        <TabsContent value="positions">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>보유 포지션 목록</CardTitle>
              <CardDescription>현재 보유 중인 NVDA 주식 내역</CardDescription>
            </CardHeader>
            <CardContent>
              <AnimatePresence>
                {portfolio.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">보유 중인 포지션이 없습니다</p>
                ) : (
                  <div className="space-y-4">
                    {portfolio.map((position) => {
                      const currentPositionValue = position.shares * mockStockData.price;
                      const positionCost = position.shares * position.purchasePrice;
                      const positionGainLoss = currentPositionValue - positionCost;
                      const positionGainLossPercent = (positionGainLoss / positionCost) * 100;

                      return (
                        <motion.div
                          key={position.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="glass-card p-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <p className="font-semibold">{position.shares} 주</p>
                                <Badge variant="outline">{position.purchaseDate}</Badge>
                              </div>
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                                <div>
                                  <p className="text-muted-foreground">매입가</p>
                                  <p className="font-mono-numbers">${position.purchasePrice.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">현재가</p>
                                  <p className="font-mono-numbers">${mockStockData.price.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">투자금</p>
                                  <p className="font-mono-numbers">${positionCost.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-muted-foreground">손익</p>
                                  <p className={`font-mono-numbers ${positionGainLoss >= 0 ? "text-success" : "text-destructive"}`}>
                                    ${positionGainLoss.toFixed(2)} ({positionGainLoss >= 0 ? "+" : ""}
                                    {positionGainLossPercent.toFixed(2)}%)
                                  </p>
                                </div>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removePosition(position.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>새 포지션 추가</CardTitle>
              <CardDescription>보유 중인 NVIDIA 주식 정보를 입력하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="shares">보유 주식 수</Label>
                <Input
                  id="shares"
                  type="number"
                  placeholder="예: 10"
                  value={newShares}
                  onChange={(e) => setNewShares(e.target.value)}
                  step="0.01"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">매입 단가 (USD)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="예: 150.00"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  step="0.01"
                />
              </div>
              <Button onClick={addPosition} className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                포지션 추가
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
