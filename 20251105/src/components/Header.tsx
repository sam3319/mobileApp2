import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { mockStockData } from '@/data/mockData';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: '메인 대시보드' },
    { path: '/stock', label: '실시간 주가' },
    { path: '/company', label: '기업 정보' },
    { path: '/products', label: '제품 및 기술' },
    { path: '/news', label: '뉴스' },
    { path: '/portfolio', label: '포트폴리오' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const changeColor = mockStockData.change >= 0 ? 'text-primary' : 'text-destructive';
  const changeIcon = mockStockData.change >= 0 ? '▲' : '▼';

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover-scale">
            <TrendingUp className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold">
              <span className="text-primary">NVIDIA</span> Asset
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary/20 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Live Stock Ticker - Desktop */}
          <div className="hidden lg:flex items-center gap-2 stock-ticker">
            <span className="text-sm font-medium text-muted-foreground">NVDA</span>
            <span className="text-lg font-bold font-mono-numbers">${mockStockData.price.toFixed(2)}</span>
            <span className={`text-sm font-medium ${changeColor}`}>
              {mockStockData.changePercent >= 0 ? '+' : ''}
              {mockStockData.changePercent.toFixed(2)}% {changeIcon}
            </span>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-white/10 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {/* Mobile Stock Info */}
              <div className="mt-2 px-4 py-3 glass-card rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">NVDA</span>
                  <div className="text-right">
                    <div className="font-bold font-mono-numbers">${mockStockData.price.toFixed(2)}</div>
                    <div className={`text-sm ${changeColor}`}>
                      {mockStockData.changePercent >= 0 ? '+' : ''}
                      {mockStockData.changePercent.toFixed(2)}% {changeIcon}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
