import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Share2, Box } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockProducts } from '@/data/mockData';
import Product3DViewer from '@/components/Product3DViewer';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Button variant="outline" onClick={() => navigate('/products')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            제품 목록으로
          </Button>
          <p className="mt-8 text-center text-muted-foreground">제품을 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'ai': return 'AI & Data Center';
      case 'gaming': return 'Gaming & Graphics';
      case 'automotive': return 'Autonomous Vehicles';
      case 'professional': return 'Professional Visualization';
      default: return category;
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Button variant="outline" onClick={() => navigate('/products')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          제품 목록으로
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="text-sm">
                {getCategoryLabel(product.category)}
              </Badge>
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl text-muted-foreground mb-4">{product.nameKo}</p>
            
            {product.price && (
              <div className="text-3xl font-bold text-primary mb-6 font-mono-numbers">
                ${product.price.toLocaleString()}
              </div>
            )}

            <p className="text-muted-foreground mb-6">{product.descriptionKo}</p>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                구매 문의
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Key Features */}
            <Card className="metric-card">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">주요 특징</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{product.descriptionKo}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>출시일: {new Date(product.releaseDate).toLocaleDateString('ko-KR')}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Tabs */}
        <Tabs defaultValue="specs" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="specs">제품 사양</TabsTrigger>
            <TabsTrigger value="3d">3D 뷰어</TabsTrigger>
            <TabsTrigger value="features">기술 세부사항</TabsTrigger>
            <TabsTrigger value="support">지원 정보</TabsTrigger>
            <TabsTrigger value="reviews">사용자 리뷰</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-6">
            <Card className="metric-card">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6">기술 사양</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="glass-card p-4 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">{key}</div>
                      <div className="text-xl font-semibold font-mono-numbers">{value}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="3d" className="mt-6">
            <Card className="metric-card">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Box className="h-6 w-6 text-primary" />
                  <h3 className="text-2xl font-bold">3D 제품 뷰어</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  마우스로 드래그하여 회전, 스크롤하여 확대/축소할 수 있습니다
                </p>
                <Product3DViewer productCategory={product.category} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="features" className="mt-6">
            <Card className="metric-card">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6">기술 세부사항</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-primary">아키텍처</h4>
                    <p className="text-muted-foreground">{product.description}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-primary">성능 특징</h4>
                    <p className="text-muted-foreground">
                      최첨단 기술로 설계된 이 제품은 {getCategoryLabel(product.category)} 분야에서 
                      탁월한 성능을 발휘합니다.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-primary">응용 분야</h4>
                    <p className="text-muted-foreground">
                      AI 학습, 추론, 렌더링, 시뮬레이션 등 다양한 워크로드에 최적화되었습니다.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="support" className="mt-6">
            <Card className="metric-card">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6">지원 정보</h3>
                <div className="space-y-4">
                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">드라이버 다운로드</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      최신 드라이버를 다운로드하여 최적의 성능을 경험하세요.
                    </p>
                    <Button variant="outline" size="sm">드라이버 다운로드</Button>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">기술 문서</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      제품 매뉴얼, 프로그래밍 가이드, API 문서를 확인하세요.
                    </p>
                    <Button variant="outline" size="sm">문서 보기</Button>
                  </div>
                  <div className="glass-card p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">고객 지원</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      기술 지원이 필요하신가요? 고객 지원팀에 문의하세요.
                    </p>
                    <Button variant="outline" size="sm">문의하기</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <Card className="metric-card">
              <CardContent className="pt-6">
                <h3 className="text-2xl font-bold mb-6">사용자 리뷰</h3>
                <div className="space-y-4">
                  {[1, 2, 3].map((_, idx) => (
                    <div key={idx} className="glass-card p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">사용자 {idx + 1}</span>
                        <span className="text-primary">⭐⭐⭐⭐⭐</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        뛰어난 성능과 안정성으로 매우 만족스럽습니다. {product.nameKo}로 
                        작업 효율이 크게 향상되었습니다.
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">2025-11-0{idx + 1}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
