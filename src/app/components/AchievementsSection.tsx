import { motion, useMotionValue, useTransform } from "motion/react";
import { Award, Trophy, Medal, Star, Target, Zap } from "lucide-react";
import { useState } from "react";

const achievements = [
  {
    icon: Trophy,
    title: "First Place - Data Science Hackathon 2025",
    description: "Won first place among 200+ teams for building an AI-powered healthcare diagnosis system.",
    date: "March 2025",
    category: "Competition",
  },
  {
    icon: Award,
    title: "AWS Certified Machine Learning - Specialty",
    description: "Professional certification validating expertise in building, training, and deploying ML models on AWS.",
    date: "January 2025",
    category: "Certification",
  },
  {
    icon: Medal,
    title: "Dean's List - All Semesters",
    description: "Consistently maintained GPA > 3.8/4.0 throughout undergraduate program.",
    date: "2021-2025",
    category: "Academic",
  },
  {
    icon: Star,
    title: "Research Publication - IEEE Conference",
    description: "Published paper on 'Novel Approaches to Time Series Anomaly Detection using Deep Learning'.",
    date: "November 2024",
    category: "Research",
  },
  {
    icon: Target,
    title: "Kaggle Expert",
    description: "Achieved Expert tier on Kaggle with multiple top 10% competition finishes and 3 gold medals.",
    date: "Ongoing",
    category: "Competition",
  },
  {
    icon: Zap,
    title: "Google Data Analytics Professional Certificate",
    description: "Comprehensive certification covering data analysis, visualization, and statistical methods.",
    date: "August 2024",
    category: "Certification",
  },
];

function AchievementCard({ achievement, index }: { achievement: typeof achievements[0]; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={() => setIsFlipped(!isFlipped)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="perspective-1000 achievement-card interactive cursor-pointer"
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="backface-hidden bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all group">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/20 transition-colors"
              >
                <achievement.icon className="w-6 h-6 text-primary" />
              </motion.div>
            </div>

            <div className="flex-1">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg pr-2">{achievement.title}</h3>
                <span className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs whitespace-nowrap">
                  {achievement.category}
                </span>
              </div>

              <p className="text-muted-foreground text-sm mb-2">
                {achievement.description}
              </p>

              <p className="text-xs text-muted-foreground">
                {achievement.date}
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary/20 to-primary/10 border border-primary rounded-lg p-6 flex items-center justify-center"
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="text-center">
            <achievement.icon className="w-16 h-16 text-primary mx-auto mb-4" />
            <p className="text-lg">🎉 Unlocked!</p>
            <p className="text-sm text-muted-foreground mt-2">Click to flip back</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function AchievementsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <h2 className="text-3xl md:text-4xl mb-8 text-center">Achievements & Certifications</h2>
      <p className="text-center text-muted-foreground mb-8">Click on cards to flip them</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((achievement, index) => (
          <AchievementCard key={achievement.title} achievement={achievement} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
