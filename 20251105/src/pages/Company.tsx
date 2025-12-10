import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { FileText, Download } from 'lucide-react';
import { mockFinancials } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner';

const Company = () => {
  const [selectedQuarter, setSelectedQuarter] = useState('Q3 2025');

  const handleDownload = (documentName: string) => {
    toast.success(`${documentName} 다운로드가 시작되었습니다.`);
  };

  const formatCurrency = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(1)}B`;
    if (value >= 1e6) return `$${(value / 1e6).toFixed(1)}M`;
    return `$${value.toFixed(2)}`;
  };

  const currentFinancials = mockFinancials.find(f => f.quarter === selectedQuarter) || mockFinancials[0];

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">NVIDIA 기업 정보</h1>
          <p className="text-muted-foreground text-lg">투자자를 위한 재무 및 IR 자료</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-card p-1">
            <TabsTrigger value="overview">개요</TabsTrigger>
            <TabsTrigger value="financials">재무제표</TabsTrigger>
            <TabsTrigger value="ir">IR 자료</TabsTrigger>
            <TabsTrigger value="shareholders">주주정보</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="metric-card">
                <CardHeader>
                  <CardTitle>회사 개요</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    NVIDIA는 1993년에 설립된 글로벌 기술 기업으로, GPU(Graphics Processing Unit) 발명의 선구자입니다. 
                    현재는 AI, 데이터센터, 자율주행, 게이밍 등 다양한 분야에서 혁신을 주도하고 있습니다.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    최첨단 컴퓨팅 플랫폼을 통해 과학적 발견, 의료 진단, 콘텐츠 제작 등 다양한 산업의 디지털 전환을 가속화하고 있습니다.
                  </p>
                  <div className="pt-4 border-t border-border space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">CEO</span>
                      <span className="font-semibold">Jensen Huang</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">설립</span>
                      <span className="font-semibold">1993년</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">본사</span>
                      <span className="font-semibold">Santa Clara, CA</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">직원 수</span>
                      <span className="font-semibold">29,600+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card">
                <CardHeader>
                  <CardTitle>비전 & 미션</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="glass-card p-6 rounded-lg border-l-4 border-primary">
                    <p className="text-lg font-semibold mb-4 text-primary">
                      "세계의 컴퓨터 그래픽과 AI 혁신을 선도합니다"
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      NVIDIA는 가속 컴퓨팅의 힘으로 불가능을 가능하게 만들고, 
                      인류가 직면한 가장 복잡한 문제들을 해결하는 데 기여하고자 합니다.
                    </p>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-1">$4.75T</div>
                      <div className="text-sm text-muted-foreground">시가총액</div>
                    </div>
                    <div className="text-center p-4 glass-card rounded-lg">
                      <div className="text-3xl font-bold text-primary mb-1">180+</div>
                      <div className="text-sm text-muted-foreground">국가 진출</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Financials Tab */}
          <TabsContent value="financials" className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {mockFinancials.map((f) => (
                <Button
                  key={f.quarter}
                  variant={selectedQuarter === f.quarter ? 'default' : 'outline'}
                  onClick={() => setSelectedQuarter(f.quarter)}
                >
                  {f.quarter}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <Card className="metric-card">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-2">매출</div>
                  <div className="text-3xl font-bold font-mono-numbers text-primary">
                    {formatCurrency(currentFinancials.revenue)}
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-2">순이익</div>
                  <div className="text-3xl font-bold font-mono-numbers text-primary">
                    {formatCurrency(currentFinancials.netIncome)}
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-2">매출총이익률</div>
                  <div className="text-3xl font-bold font-mono-numbers text-primary">
                    {currentFinancials.grossMargin.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card">
                <CardContent className="pt-6">
                  <div className="text-sm text-muted-foreground mb-2">영업이익률</div>
                  <div className="text-3xl font-bold font-mono-numbers text-primary">
                    {currentFinancials.operatingMargin.toFixed(1)}%
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="metric-card">
              <CardHeader>
                <CardTitle>분기별 EPS 추이</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={[...mockFinancials].reverse()}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis dataKey="quarter" stroke="hsl(var(--muted-foreground))" />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px',
                        }}
                      />
                      <Bar dataKey="eps" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-4">
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                재무제표 PDF 다운로드
              </Button>
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                실적 발표 자료
              </Button>
            </div>
          </TabsContent>

          {/* IR Materials Tab */}
          <TabsContent value="ir" className="space-y-4">
            {[
              { title: '2024 연차보고서', date: '2024-12-31', size: '15.2 MB' },
              { title: 'Q3 2025 실적발표', date: '2025-08-20', size: '8.5 MB' },
              { title: 'Q2 2025 실적발표', date: '2025-05-20', size: '7.8 MB' },
              { title: '주주총회 자료', date: '2025-06-15', size: '12.3 MB' },
              { title: 'AI 시장 전망 보고서', date: '2025-07-10', size: '22.1 MB' },
              { title: '2023 연차보고서', date: '2023-12-31', size: '14.8 MB' },
            ].map((doc, index) => (
              <Card key={index} className="metric-card hover:border-primary/50 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Download className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{doc.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {doc.date} • {doc.size}
                      </p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDownload(doc.title)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    다운로드
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </TabsContent>

          {/* Shareholders Tab */}
          <TabsContent value="shareholders" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="metric-card">
                <CardHeader>
                  <CardTitle>배당 히스토리</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { year: '2025', dividend: '$0.16', yield: '0.03%' },
                      { year: '2024', dividend: '$0.16', yield: '0.04%' },
                      { year: '2023', dividend: '$0.16', yield: '0.05%' },
                      { year: '2022', dividend: '$0.16', yield: '0.06%' },
                      { year: '2021', dividend: '$0.16', yield: '0.07%' },
                    ].map((item) => (
                      <div key={item.year} className="flex items-center justify-between py-2 border-b border-border">
                        <span className="font-semibold">{item.year}</span>
                        <div className="text-right">
                          <div className="font-mono-numbers">{item.dividend}</div>
                          <div className="text-sm text-muted-foreground">{item.yield}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="metric-card">
                <CardHeader>
                  <CardTitle>애널리스트 평가</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">매수</span>
                        <span className="font-semibold">42</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary rounded-full" style={{ width: '84%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">보유</span>
                        <span className="font-semibold">7</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-muted-foreground rounded-full" style={{ width: '14%' }} />
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">매도</span>
                        <span className="font-semibold">1</span>
                      </div>
                      <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-destructive rounded-full" style={{ width: '2%' }} />
                      </div>
                    </div>

                    <div className="pt-4 border-t border-border">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">목표주가 평균</span>
                        <span className="text-xl font-bold font-mono-numbers text-primary">$225.00</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Company;
