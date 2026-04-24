import { ProfileHeader } from "./components/ProfileHeader";
import { AboutSection } from "./components/AboutSection";
import { StatsSection } from "./components/StatsSection";
import { SkillsSection } from "./components/SkillsSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { ResearchSection } from "./components/ResearchSection";
import { AchievementsSection } from "./components/AchievementsSection";
import { EducationExperience } from "./components/EducationExperience";
import { ContactSection } from "./components/ContactSection";
import { ThemeToggle } from "./components/ThemeToggle";
import { FloatingNav } from "./components/FloatingNav";

export default function App() {
  return (
    <div className="min-h-screen bg-background relative overflow-x-hidden">
      <ThemeToggle />
      <FloatingNav />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <ProfileHeader />
        <AboutSection />
        <StatsSection />
        <SkillsSection />
        <ProjectsSection />
        <ResearchSection />
        <AchievementsSection />
        <EducationExperience />
        <ContactSection />

        <footer className="text-center text-muted-foreground text-sm py-8 border-t border-border">
          <p>© 2026 Your Name. Built with React, Tailwind CSS, and Motion.</p>
        </footer>
      </div>
    </div>
  );
}