import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Bookmark, Share2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockNews } from '@/data/mockData';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = mockNews.find(n => n.id === Number(id));

  if (!article) {
    return (
      <div className="min-h-screen py-8">
        <div className="container mx-auto px-4">
          <Button variant="outline" onClick={() => navigate('/news')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            뉴스 목록으로
          </Button>
          <p className="mt-8 text-center text-muted-foreground">기사를 찾을 수 없습니다.</p>
        </div>
      </div>
    );
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'product': return '제품 출시';
      case 'earnings': return '기업 실적';
      case 'technology': return '기술 혁신';
      case 'partnership': return '파트너십';
      default: return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'product': return 'bg-blue-500/20 text-blue-400';
      case 'earnings': return 'bg-green-500/20 text-green-400';
      case 'technology': return 'bg-purple-500/20 text-purple-400';
      case 'partnership': return 'bg-orange-500/20 text-orange-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <Button variant="outline" onClick={() => navigate('/news')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          뉴스 목록으로
        </Button>

        {/* Article Header */}
        <Card className="metric-card mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge className={getCategoryColor(article.category)}>
                {getCategoryLabel(article.category)}
              </Badge>
              <Badge variant={article.source === 'NVIDIA 공식' ? 'default' : 'secondary'}>
                {article.source}
              </Badge>
            </div>

            <h1 className="text-4xl font-bold mb-4">{article.titleKo}</h1>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(article.publishedDate).toLocaleDateString('ko-KR')}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {article.readTime}분 소요
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Bookmark className="mr-2 h-4 w-4" />
                북마크
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" />
                공유
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Featured Image */}
        <img
          src={article.imageUrl}
          alt={article.titleKo}
          className="w-full h-96 object-cover rounded-lg mb-6"
        />

        {/* Article Content */}
        <Card className="metric-card mb-6">
          <CardContent className="pt-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground mb-6">{article.summaryKo}</p>
              
              <div className="space-y-4 text-foreground">
                <p>
                  {article.contentKo}
                </p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4">주요 내용</h2>
                <p>
                  NVIDIA는 지속적으로 AI와 그래픽 기술의 경계를 넓혀가고 있습니다. 
                  이번 발표는 업계에 큰 영향을 미칠 것으로 예상되며, 특히 데이터센터와 
                  게이밍 시장에서 혁신적인 변화를 가져올 것입니다.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">시장 전망</h2>
                <p>
                  전문가들은 이번 발표가 NVIDIA의 시장 지배력을 더욱 강화할 것으로 
                  전망하고 있습니다. AI 반도체 시장의 성장과 함께 NVIDIA의 기술력이 
                  더욱 부각될 것으로 예상됩니다.
                </p>

                <h2 className="text-2xl font-bold mt-8 mb-4">투자자 의견</h2>
                <p>
                  애널리스트들은 이번 소식이 주가에 긍정적인 영향을 미칠 것으로 분석하고 
                  있으며, 장기적인 성장 잠재력을 높게 평가하고 있습니다.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Related Articles */}
        <Card className="metric-card">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">관련 기사</h2>
            <div className="space-y-4">
              {mockNews
                .filter(n => n.id !== article.id && n.category === article.category)
                .slice(0, 3)
                .map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="glass-card p-4 rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                    onClick={() => navigate(`/news/${relatedArticle.id}`)}
                  >
                    <div className="flex gap-4">
                      <img
                        src={relatedArticle.imageUrl}
                        alt={relatedArticle.titleKo}
                        className="w-24 h-24 object-cover rounded"
                      />
                      <div className="flex-1">
                      <Badge className={getCategoryColor(relatedArticle.category)}>
                        {getCategoryLabel(relatedArticle.category)}
                      </Badge>
                        <h3 className="font-semibold mt-2 line-clamp-2">
                          {relatedArticle.titleKo}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {new Date(relatedArticle.publishedDate).toLocaleDateString('ko-KR')}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NewsDetail;
