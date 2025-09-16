import { Mail, Phone, Github, Linkedin, MessageCircle, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: "이메일",
      value: "your.email@example.com",
      link: "mailto:your.email@example.com",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: Phone,
      label: "전화번호",
      value: "+82 10-1234-5678",
      link: "tel:+821012345678",
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      icon: MapPin,
      label: "위치",
      value: "Seoul, South Korea",
      link: "#",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    }
  ];

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      username: "@yourname",
      link: "https://github.com/yourname",
      color: "text-white",
      bgColor: "bg-gray-900"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      username: "Your Name",
      link: "https://linkedin.com/in/yourname",
      color: "text-blue-600",
      bgColor: "bg-blue-600/10"
    },
    {
      icon: MessageCircle,
      label: "Blog",
      username: "tech-blog",
      link: "https://yourblog.com",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-t from-primary/5 to-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16 slide-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Contact & Social
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            새로운 기회와 협업을 위해 언제든지 연락해 주세요
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8 scale-in">
            <h3 className="text-2xl font-semibold text-gradient mb-6">
              연락처 정보
            </h3>
            
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((contact, index) => (
                <Card key={index} className="netflix-card group">
                  <CardContent className="p-6">
                    <a 
                      href={contact.link}
                      className="flex items-center gap-4 group-hover:text-accent transition-colors"
                    >
                      <div className={`w-12 h-12 rounded-lg ${contact.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <contact.icon className={`w-6 h-6 ${contact.color}`} />
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground">{contact.label}</h4>
                        <p className="text-muted-foreground text-sm">{contact.value}</p>
                      </div>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Social Links */}
            <div className="pt-8">
              <h4 className="text-lg font-medium text-gradient mb-4">소셜 미디어</h4>
              <div className="grid grid-cols-1 gap-3">
                {socialLinks.map((social, index) => (
                  <Card key={index} className="netflix-card group">
                    <CardContent className="p-4">
                      <a 
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 group-hover:text-accent transition-colors"
                      >
                        <div className={`w-10 h-10 rounded-lg ${social.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                          <social.icon className={`w-5 h-5 ${social.color}`} />
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">{social.label}</h5>
                          <p className="text-muted-foreground text-xs">{social.username}</p>
                        </div>
                      </a>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="scale-in" style={{ animationDelay: '0.2s' }}>
            <Card className="netflix-card">
              <CardContent className="p-8">
                <h3 className="text-2xl font-semibold text-gradient mb-6">
                  메시지 보내기
                </h3>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        이름
                      </label>
                      <Input 
                        placeholder="홍길동"
                        className="bg-muted/50 border-border focus:border-accent focus:ring-accent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        이메일
                      </label>
                      <Input 
                        type="email"
                        placeholder="example@email.com"
                        className="bg-muted/50 border-border focus:border-accent focus:ring-accent"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      제목
                    </label>
                    <Input 
                      placeholder="협업 제안 / 기술 문의 / 기타"
                      className="bg-muted/50 border-border focus:border-accent focus:ring-accent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      메시지
                    </label>
                    <Textarea 
                      placeholder="안녕하세요! 포트폴리오를 보고 연락드립니다..."
                      rows={5}
                      className="bg-muted/50 border-border focus:border-accent focus:ring-accent resize-none"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow"
                  >
                    메시지 전송
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Available for Work */}
            <Card className="netflix-card mt-6">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <div>
                    <h4 className="font-medium text-foreground">협업 가능</h4>
                    <p className="text-sm text-muted-foreground">새로운 프로젝트와 인턴십 기회를 찾고 있습니다</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-16 p-8 rounded-lg bg-gradient-card/30 border border-border/50">
          <p className="text-muted-foreground text-sm leading-relaxed">
            빠른 응답을 위해 이메일로 연락해 주시면 24시간 내에 답변드리겠습니다.<br />
            기술적인 질문이나 협업 제안은 언제나 환영합니다! 🚀
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;