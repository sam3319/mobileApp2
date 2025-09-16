import { User, GraduationCap, Target, Code, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  const aboutCards = [
    {
      icon: User,
      title: "프로필",
      content: "안녕하세요! 기술로 세상을 바꾸고 싶은 열정적인 개발자입니다.",
      details: ["나이: 20세", "취미: 코딩, 새로운 기술 탐구", "좌우명: 끊임없는 학습과 성장"]
    },
    {
      icon: GraduationCap,
      title: "학업 정보",
      content: "기술 전공 2학년으로 컴퓨터 과학의 기초를 탄탄히 다지고 있습니다.",
      details: ["전공: 컴퓨터공학과", "학년: 2학년", "GPA: 3.8/4.5", "주요 과목: 자료구조, 알고리즘, 데이터베이스"]
    },
    {
      icon: Target,
      title: "관심 분야",
      content: "클라우드 엔지니어링과 컨테이너화 기술에 특별한 관심을 가지고 있습니다.",
      details: ["클라우드 아키텍처 설계", "DevOps 자동화", "마이크로서비스 아키텍처", "컨테이너 오케스트레이션"]
    },
    {
      icon: Code,
      title: "현재 진행 프로젝트",
      content: "실무에 필요한 다양한 기술 스택을 활용한 프로젝트들을 진행 중입니다.",
      details: ["OTT 스트리밍 플랫폼 개발", "CI/CD 파이프라인 구축", "Kubernetes 클러스터 관리 시스템"]
    }
  ];

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            기술에 대한 열정과 끊임없는 학습으로 성장하는 개발자의 이야기
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {aboutCards.map((card, index) => (
            <Card 
              key={index} 
              className="netflix-card group scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform">
                      <card.icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold mb-3 text-gradient">
                      {card.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {card.content}
                    </p>
                    
                    <ul className="space-y-2">
                      {card.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-foreground/80">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Achievement Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "2", label: "Years of Study", icon: GraduationCap },
            { number: "8+", label: "Projects", icon: Code },
            { number: "15+", label: "Technologies", icon: Target },
            { number: "2+", label: "Certifications", icon: Award }
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center netflix-card p-6 scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <stat.icon className="w-8 h-8 text-accent mx-auto mb-4" />
              <div className="text-3xl font-bold text-gradient mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;