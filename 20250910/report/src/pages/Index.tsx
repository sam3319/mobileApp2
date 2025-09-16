import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main>
        <section id="home">
          <HeroSection />
        </section>
        
        <section id="about">
          <AboutSection />
        </section>
        
        <section id="skills">
          <SkillsSection />
        </section>
        
        <section id="projects">
          <ProjectsSection />
        </section>
        
        <section id="experience">
          <ExperienceSection />
        </section>
        
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card/50 border-t border-border py-8 text-center">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-muted-foreground text-sm">
            © 2024 Developer Portfolio. Built with React, TypeScript & Tailwind CSS
          </p>
          <p className="text-muted-foreground text-xs mt-2">
            "지속적인 학습과 성장을 통해 더 나은 개발자가 되겠습니다" 🚀
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
