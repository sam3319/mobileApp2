import { Code, Server, Cloud, Database, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SkillsSection = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Frontend",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      skills: [
        { name: "React", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "HTML/CSS", level: 90 },
        { name: "TypeScript", level: 70 }
      ]
    },
    {
      icon: Server,
      title: "Backend",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      skills: [
        { name: "Java", level: 85 },
        { name: "Python", level: 75 },
        { name: "JSP", level: 80 },
        { name: "Spring Boot", level: 70 }
      ]
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      skills: [
        { name: "AWS", level: 75 },
        { name: "Docker", level: 80 },
        { name: "Kubernetes", level: 70 },
        { name: "Jenkins", level: 65 }
      ]
    },
    {
      icon: Database,
      title: "Database",
      color: "text-orange-400",
      bgColor: "bg-orange-500/10",
      skills: [
        { name: "MariaDB", level: 85 },
        { name: "MySQL", level: 80 },
        { name: "PostgreSQL", level: 70 },
        { name: "MongoDB", level: 60 }
      ]
    },
    {
      icon: Wrench,
      title: "Tools",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      skills: [
        { name: "Git", level: 90 },
        { name: "Eclipse", level: 85 },
        { name: "VS Code", level: 90 },
        { name: "IntelliJ", level: 75 }
      ]
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-background to-card/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Skills & Tech Stack
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            다양한 기술 스택을 활용하여 풀스택 개발 역량을 키워가고 있습니다
          </p>
        </div>

        {/* Skills Cards - Netflix style horizontal scroll */}
        <div className="scroll-container">
          {skillCategories.map((category, index) => (
            <Card 
              key={index}
              className="netflix-card flex-shrink-0 w-80 scale-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-lg ${category.bgColor} flex items-center justify-center`}>
                    <category.icon className={`w-6 h-6 ${category.color}`} />
                  </div>
                  <h3 className="text-2xl font-semibold text-gradient">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-foreground">
                          {skill.name}
                        </span>
                        <Badge variant="secondary" className="text-xs">
                          {skill.level}%
                        </Badge>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r from-secondary to-accent transition-all duration-1000 ease-out rounded-full`}
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${(index * 0.2) + (skillIndex * 0.1)}s`
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Learning Path */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-8 text-gradient">
            현재 학습 중인 기술들
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Microservices Architecture",
              "AWS EKS",
              "GraphQL",
              "Next.js",
              "Redis",
              "Apache Kafka",
              "Terraform",
              "Prometheus"
            ].map((tech, index) => (
              <Badge 
                key={index}
                variant="outline"
                className="text-sm py-2 px-4 border-accent/50 text-accent hover:bg-accent hover:text-accent-foreground transition-colors scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;