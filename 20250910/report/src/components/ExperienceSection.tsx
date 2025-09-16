import { BookOpen, Trophy, Target, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const ExperienceSection = () => {
  const learningJourney = [
    {
      period: "2024.03 - 현재",
      title: "클라우드 엔지니어링 과정",
      description: "AWS 기반 클라우드 인프라 구축 및 관리 전문가 과정",
      status: "진행중",
      progress: 75,
      achievements: [
        "AWS Solutions Architect Associate 준비 중",
        "Docker & Kubernetes 실습 완료",
        "CI/CD 파이프라인 구축 프로젝트 완료"
      ],
      skills: ["AWS", "Docker", "Kubernetes", "Terraform"]
    },
    {
      period: "2024.01 - 현재", 
      title: "네이버클라우드 자격증 취득",
      description: "NCP Associate, Professional 자격증을 통한 클라우드 전문성 강화",
      status: "진행중",
      progress: 75,
      achievements: [
        "NCP Associate 자격증 취득 완료",
        "NCP Professional 준비 중",
        "네이버클라우드 플랫폼 실습 진행"
      ],
      skills: ["Naver Cloud Platform", "Cloud Architecture", "DevOps", "Infrastructure"]
    },
    {
      period: "2024.09 - 2024.12",
      title: "캡스톤 프로젝트",
      description: "팀 협업을 통한 실무형 프로젝트 개발",
      status: "진행중",
      progress: 45,
      achievements: [
        "프로젝트 기획 및 요구사항 정의 완료",
        "기술 스택 선정 및 아키텍처 설계",
        "프로토타입 개발 진행 중"
      ],
      skills: ["Team Collaboration", "Project Management", "Full-Stack Development"]
    },
    {
      period: "2023.03 - 2023.12",
      title: "컴퓨터공학 기초 과정",
      description: "자료구조, 알고리즘, 데이터베이스 등 기초 이론 학습",
      status: "완료",
      progress: 100,
      achievements: [
        "자료구조 및 알고리즘 A+ 학점",
        "데이터베이스 설계 프로젝트 우수상",
        "객체지향 프로그래밍 완주"
      ],
      skills: ["Data Structures", "Algorithms", "Database", "OOP"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "완료": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "진행중": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 70) return "bg-blue-500";
    if (progress >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-card/20 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Experience & Learning
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            지속적인 학습과 성장을 통해 쌓아온 경험들을 시간순으로 소개합니다
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-secondary to-primary transform md:-translate-x-0.5"></div>

          {/* Timeline items */}
          <div className="space-y-12">
            {learningJourney.map((item, index) => (
              <div 
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                } scale-in`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-gradient-hero rounded-full border-4 border-background transform -translate-x-2 md:-translate-x-2 z-10 shadow-glow">
                </div>

                {/* Content card */}
                <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'}`}>
                  <Card className="netflix-card">
                    <CardContent className="p-6">
                      {/* Period and Status */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2 text-sm text-accent">
                          <Calendar className="w-4 h-4" />
                          {item.period}
                        </div>
                        <Badge className={`${getStatusColor(item.status)} border text-xs`}>
                          {item.status}
                        </Badge>
                      </div>

                      {/* Title and Description */}
                      <h3 className="text-xl font-semibold mb-2 text-gradient">
                        {item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                        {item.description}
                      </p>

                      {/* Progress */}
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs text-foreground/80">진행률</span>
                          <span className="text-xs text-accent font-medium">{item.progress}%</span>
                        </div>
                        <Progress 
                          value={item.progress} 
                          className="h-2"
                        />
                      </div>

                      {/* Achievements */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-accent" />
                          주요 성과
                        </h4>
                        <ul className="space-y-1">
                          {item.achievements.map((achievement, achieveIndex) => (
                            <li key={achieveIndex} className="flex items-start gap-2 text-xs text-muted-foreground">
                              <div className="w-1 h-1 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Skills */}
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                          <Target className="w-4 h-4 text-accent" />
                          관련 기술
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {item.skills.map((skill, skillIndex) => (
                            <Badge key={skillIndex} variant="outline" className="text-xs py-1 px-2 border-accent/30 text-accent/80">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <div className="mt-20 text-center">
          <Card className="netflix-card max-w-2xl mx-auto scale-in">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-4 text-gradient flex items-center justify-center gap-2">
                <BookOpen className="w-6 h-6 text-accent" />
                앞으로의 목표
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                <div>
                  <h4 className="font-medium text-foreground mb-2">단기 목표 (6개월)</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent"></div>
                      NCP Professional 자격증 취득
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent"></div>
                      AWS 자격증 취득
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent"></div>
                      캡스톤 프로젝트 완성
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">장기 목표 (1-2년)</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent"></div>
                      클라우드 엔지니어 취업
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent"></div>
                      오픈소스 프로젝트 기여
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-accent"></div>
                      기술 블로그 운영
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;