import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-6">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <h1 className="text-8xl font-bold text-gradient animate-float">404</h1>
          <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent/20 rounded-full blur-xl animate-pulse"></div>
        </div>
        
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          페이지를 찾을 수 없습니다
        </h2>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.<br />
          홈페이지로 돌아가서 다시 시도해 보세요.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow"
          >
            <a href="/">
              <Home className="w-4 h-4 mr-2" />
              홈으로 돌아가기
            </a>
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => window.history.back()}
            className="border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            이전 페이지로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
