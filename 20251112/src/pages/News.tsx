import { useState, useEffect } from "react";
import { mockNews } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, TrendingUp, Bookmark, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [sortBy, setSortBy] = useState<"newest" | "views">("newest");
  const [bookmarks, setBookmarks] = useState<number[]>([]);
  const [summaries, setSummaries] = useState<Record<number, string>>({});
  const [loadingSummary, setLoadingSummary] = useState<number | null>(null);

  // Load bookmarks from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("newsBookmarks");
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks));
    }
  }, []);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem("newsBookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const toggleBookmark = (id: number, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (bookmarks.includes(id)) {
      setBookmarks(bookmarks.filter(b => b !== id));
      toast.success("북마크에서 제거되었습니다");
    } else {
      setBookmarks([...bookmarks, id]);
      toast.success("북마크에 추가되었습니다");
    }
  };

  const generateSummary = async (article: typeof mockNews[0], e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (summaries[article.id]) {
      toast.info("이미 요약이 생성되었습니다");
      return;
    }

    setLoadingSummary(article.id);
    try {
      const { data, error } = await supabase.functions.invoke("summarize-news", {
        body: { content: article.contentKo },
      });

      if (error) throw error;

      setSummaries(prev => ({ ...prev, [article.id]: data.summary }));
      toast.success("AI 요약이 생성되었습니다");
    } catch (error) {
      console.error("Error generating summary:", error);
      toast.error("요약 생성에 실패했습니다");
    } finally {
      setLoadingSummary(null);
    }
  };

  const categories = [
    { label: "전체", value: "전체" },
    { label: "제품 출시", value: "product" },
    { label: "기업 실적", value: "earnings" },
    { label: "기술 혁신", value: "technology" },
    { label: "파트너십", value: "partnership" },
  ];

  const getCategoryName = (category: string): string => {
    switch (category) {
      case "product": return "제품 출시";
      case "earnings": return "기업 실적";
      case "technology": return "기술 혁신";
      case "partnership": return "파트너십";
      default: return category;
    }
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case "product": return "bg-blue-500";
      case "earnings": return "bg-green-500";
      case "technology": return "bg-purple-500";
      case "partnership": return "bg-orange-500";
      default: return "bg-primary";
    }
  };

  const filteredNews = mockNews.filter((article) => {
    const matchesCategory = selectedCategory === "전체" || article.category === selectedCategory;
    return matchesCategory;
  }).sort((a, b) => {
    if (sortBy === "newest") {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime();
    }
    return b.views - a.views;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">NVIDIA 최신 뉴스 & 인사이트</h1>
        <p className="text-muted-foreground">제품, 기술, 투자자 정보 업데이트</p>
      </motion.div>

      {/* Filter Chips */}
      <div className="flex gap-2 mb-8 flex-wrap">
        {categories.map((cat) => (
          <Button
            key={cat.label}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.value)}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* News Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map((article, index) => {
          const isBookmarked = bookmarks.includes(article.id);
          return (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
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
                      <Badge
                        className="absolute top-3 left-3"
                        style={{ backgroundColor: getCategoryColor(article.category) }}
                      >
                        {getCategoryName(article.category)}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-3 right-3 bg-background/80 hover:bg-background"
                        onClick={(e) => toggleBookmark(article.id, e)}
                      >
                        <Bookmark className={`h-4 w-4 ${isBookmarked ? "fill-primary text-primary" : ""}`} />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <span>{article.publishedDate}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{article.readTime}분 소요</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg mb-2 line-clamp-2">{article.titleKo}</CardTitle>
                    <CardDescription className="line-clamp-3">{article.summaryKo}</CardDescription>
                    
                    {summaries[article.id] && (
                      <div className="mt-3 p-3 glass-card rounded-lg border border-primary/20">
                        <p className="text-sm flex items-start gap-2">
                          <Sparkles className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{summaries[article.id]}</span>
                        </p>
                      </div>
                    )}

                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{article.source}</Badge>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={(e) => generateSummary(article, e)}
                          disabled={loadingSummary === article.id}
                        >
                          <Sparkles
                            className={`h-4 w-4 ${summaries[article.id] ? "fill-primary text-primary" : ""} ${loadingSummary === article.id ? "animate-pulse" : ""}`}
                          />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        <span>{article.views.toLocaleString()} 조회</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
