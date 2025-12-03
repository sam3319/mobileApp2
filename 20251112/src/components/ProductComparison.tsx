import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Product } from "@/types";
import { X, Check } from "lucide-react";
import { motion } from "framer-motion";

interface ProductComparisonProps {
  products: Product[];
  onRemove: (id: number) => void;
  onClose: () => void;
  open: boolean;
}

export default function ProductComparison({ products, onRemove, onClose, open }: ProductComparisonProps) {
  if (products.length === 0) return null;

  const allSpecs = Array.from(
    new Set(products.flatMap(p => Object.keys(p.specs)))
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>제품 비교 ({products.length}개)</DialogTitle>
          <DialogDescription>
            선택한 제품들의 사양을 비교해보세요
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${products.length}, 1fr)` }}>
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4"
            >
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2 h-6 w-6"
                  onClick={() => onRemove(product.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-3">{product.nameKo}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-4">사양 비교</h4>
          <div className="space-y-2">
            {allSpecs.map((spec) => (
              <div
                key={spec}
                className="grid gap-4 py-3 border-b border-border/50"
                style={{ gridTemplateColumns: `200px repeat(${products.length}, 1fr)` }}
              >
                <div className="font-medium text-sm">{spec}</div>
                {products.map((product) => (
                  <div key={product.id} className="text-sm">
                    {product.specs[spec] || (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
