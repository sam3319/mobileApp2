import { ExternalLink, Github, Play, Calendar, Users, Code } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProjectsSection = () => {
  const projects = [
    {
      title: "OTT 스트리밍 플랫폼",
      description: "JSP와 MariaDB를 활용한 Netflix 스타일의 스트리밍 서비스 플랫폼",
      image: "/api/placeholder/600/400",
      tech: ["JSP", "MariaDB", "HTML/CSS", "JavaScript"],
      status: "완료",
      progress: 100,
      stats: { duration: "3개월", team: "4명", commits: "150+" },
      details: [
        "사용자 인증 및 권한 관리 시스템 구축",
        "비디오 스트리밍 및 재생 기능 구현",
        "추천 알고리즘 기반 컨텐츠 추천",
        "반응형 웹 디자인 적용"
      ]
    },
    {
      title: "CI/CD 파이프라인 구축",
      description: "AWS CodeBuild와 Jenkins를 활용한 자동화된 배포 시스템",
      image: "/api/placeholder/600/400",
      tech: ["AWS CodeBuild", "Jenkins", "Docker", "GitHub Actions"],
      status: "진행중",
      progress: 80,
      stats: { duration: "2개월", team: "개인", commits: "80+" },
      details: [
        "Git 워크플로우 기반 자동 빌드 시스템",
        "Docker 컨테이너화 및 이미지 관리",
        "AWS ECS를 통한 자동 배포",
        "테스트 자동화 및 품질 검증"
      ]
    },
    {
      title: "Kubernetes 클러스터 관리",
      description: "컨테이너 오케스트레이션을 위한 K8s 클러스터 구축 및 관리",
      image: "/api/placeholder/600/400",
      tech: ["Kubernetes", "Docker", "Helm", "Prometheus"],
      status: "진행중",
      progress: 65,
      stats: { duration: "1.5개월", team: "개인", commits: "45+" },
      details: [
        "Multi-node 클러스터 구축 및 설정",
        "Pod 오토스케일링 및 리소스 관리",
        "Ingress Controller 설정",
        "모니터링 및 로깅 시스템 구축"
      ]
    },
    {
      title: "Android 면접 준비 앱",
      description: "기술 면접 준비를 위한 문제 은행 및 모의 면접 Android 앱",
      image: "/api/placeholder/600/400",
      tech: ["Android", "Java", "SQLite", "Material Design"],
      status: "계획중",
      progress: 25,
      stats: { duration: "예정", team: "개인", commits: "10+" },
      details: [
        "카테고리별 면접 문제 데이터베이스",
        "실시간 모의 면접 기능",
        "학습 진도 추적 및 분석",
        "사용자 맞춤형 문제 추천"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "완료": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "진행중": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "계획중": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Projects Portfolio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            실무 경험을 쌓기 위해 진행한 다양한 프로젝트들을 소개합니다
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={index}
              className="netflix-card group scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardHeader className="p-0">
                {/* Project Image */}
                <div className="relative aspect-video bg-gradient-card rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                    <Play className="w-16 h-16 text-accent opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`${getStatusColor(project.status)} border`}>
                      {project.status}
                    </Badge>
                  </div>

                  {/* Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 bg-background/20 backdrop-blur-sm p-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-foreground/80">진행률</span>
                      <span className="text-xs text-accent font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-1.5">
                      <div 
                        className="h-full bg-gradient-to-r from-secondary to-accent rounded-full transition-all duration-1000"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {/* Project Title & Description */}
                <h3 className="text-2xl font-semibold mb-3 text-gradient group-hover:text-accent transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Project Stats */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-3 bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <Calendar className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">{project.stats.duration}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">{project.stats.team}</div>
                  </div>
                  <div className="text-center">
                    <Code className="w-4 h-4 text-accent mx-auto mb-1" />
                    <div className="text-xs text-muted-foreground">{project.stats.commits}</div>
                  </div>
                </div>

                {/* Key Features */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-foreground mb-2">주요 기능</h4>
                  <ul className="space-y-1">
                    {project.details.slice(0, 3).map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-xs text-muted-foreground">
                        <div className="w-1 h-1 rounded-full bg-accent"></div>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-secondary/50 text-secondary hover:bg-secondary hover:text-secondary-foreground">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Demo
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;