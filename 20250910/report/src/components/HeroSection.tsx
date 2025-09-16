import { Play, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient"></div>
      <div className="absolute inset-0 glow-effect opacity-50"></div>
      
      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 fade-in">
        {/* Hero text */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-gradient">
          개발자 <span className="text-foreground">이동현</span>의 여정
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
          클라우드 엔지니어링과 컨테이너화 기술로<br />
          미래를 설계하는 기술 전공 2학년
        </p>

        {/* Video player placeholder */}
        <div className="relative w-full max-w-2xl mx-auto mb-12 netflix-card">
          <div className="aspect-video bg-gradient-card rounded-lg flex items-center justify-center group cursor-pointer">
            <Button variant="secondary" size="lg" className="scale-110 group-hover:scale-125 transition-transform">
              <Play className="w-6 h-6 mr-2" />
              자기소개 영상 재생
            </Button>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Button 
            variant="default" 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow"
            onClick={scrollToNext}
          >
            포트폴리오 둘러보기
          </Button>
          <Button 
            variant="outline" 
            size="lg"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            연락하기
          </Button>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToNext}
          className="animate-bounce text-accent hover:text-secondary transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-10 w-20 h-20 bg-accent/10 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-1/3 right-10 w-32 h-32 bg-secondary/10 rounded-full blur-xl animate-float" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};

export default HeroSection;