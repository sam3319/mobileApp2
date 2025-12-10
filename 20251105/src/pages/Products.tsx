import { useState } from "react";
import { mockProducts } from "@/data/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, GitCompare } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import ProductComparison from "@/components/ProductComparison";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Products() {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [searchQuery, setSearchQuery] = useState("");
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const categories = [
    { label: "전체", value: "전체" },
    { label: "AI & Data Center", value: "AI & Data Center" },
    { label: "Gaming & Graphics", value: "Gaming & Graphics" },
    { label: "Autonomous Vehicles", value: "Autonomous Vehicles" },
  ];

  const getCategoryKey = (label: string): string => {
    switch (label) {
      case "AI & Data Center": return "ai";
      case "Gaming & Graphics": return "gaming";
      case "Autonomous Vehicles": return "automotive";
      case "Professional Visualization": return "professional";
      default: return "";
    }
  };

  const getCategoryName = (key: string): string => {
    switch (key) {
      case "ai": return "AI & Data Center";
      case "gaming": return "Gaming & Graphics";
      case "automotive": return "Autonomous Vehicles";
      case "professional": return "Professional Visualization";
      default: return key;
    }
  };

  const filteredProducts = mockProducts.filter((product) => {
    const matchesCategory = selectedCategory === "전체" || product.category === getCategoryKey(selectedCategory);
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameKo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleCompare = (product: Product) => {
    const isInList = compareList.some(p => p.id === product.id);
    if (isInList) {
      setCompareList(compareList.filter(p => p.id !== product.id));
      toast.success(`${product.name} 비교에서 제거됨`);
    } else {
      if (compareList.length >= 3) {
        toast.error("최대 3개 제품까지 비교할 수 있습니다");
        return;
      }
      setCompareList([...compareList, product]);
      toast.success(`${product.name} 비교에 추가됨`);
    }
  };

  const removeFromCompare = (id: number) => {
    setCompareList(compareList.filter(p => p.id !== id));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-4xl font-bold mb-2">NVIDIA 혁신 기술 & 제품</h1>
        <p className="text-muted-foreground">세계를 변화시키는 AI와 GPU 기술</p>
      </motion.div>

      {/* Search Bar */}
      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="제품 검색..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Filter Pills */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {categories.map((cat) => (
          <Button
            key={cat.label}
            variant={selectedCategory === cat.value ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat.value)}
            className="whitespace-nowrap"
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product, index) => {
          const isInCompare = compareList.some(p => p.id === product.id);
          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="glass-card hover-scale overflow-hidden group h-full">
                <CardHeader className="p-0">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                      {getCategoryName(product.category)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
                  <CardDescription className="mb-4">{product.nameKo}</CardDescription>
                  
                  <div className="space-y-2 mb-4">
                    {Object.entries(product.specs).slice(0, 3).map(([key, value]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/products/${product.id}`} className="flex-1">
                      <Button className="w-full">자세히 보기</Button>
                    </Link>
                    <Button
                      variant={isInCompare ? "default" : "outline"}
                      size="icon"
                      onClick={() => toggleCompare(product)}
                    >
                      <GitCompare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Floating Compare Button */}
      {compareList.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 right-8 z-50"
        >
          <Button
            size="lg"
            onClick={() => setShowComparison(true)}
            className="shadow-lg"
          >
            <GitCompare className="mr-2 h-5 w-5" />
            제품 비교하기 ({compareList.length})
          </Button>
        </motion.div>
      )}

      {/* Product Comparison Dialog */}
      <ProductComparison
        products={compareList}
        onRemove={removeFromCompare}
        onClose={() => setShowComparison(false)}
        open={showComparison}
      />
    </div>
  );
}
