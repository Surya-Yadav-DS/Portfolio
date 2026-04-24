import { motion, useMotionValue, useTransform } from "motion/react";
import { Brain, Code2, Database, TrendingUp, BarChart3, GitBranch } from "lucide-react";
import { useState } from "react";

const skillCategories = [
  {
    icon: Brain,
    title: "Machine Learning",
    skills: [
      { name: "TensorFlow", level: 90 },
      { name: "PyTorch", level: 85 },
      { name: "Scikit-learn", level: 95 },
      { name: "Keras", level: 80 },
    ],
  },
  {
    icon: Code2,
    title: "Programming",
    skills: [
      { name: "Python", level: 95 },
      { name: "R", level: 80 },
      { name: "SQL", level: 90 },
      { name: "JavaScript", level: 75 },
    ],
  },
  {
    icon: Database,
    title: "Data Engineering",
    skills: [
      { name: "Apache Spark", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "MongoDB", level: 80 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    icon: BarChart3,
    title: "Data Visualization",
    skills: [
      { name: "Tableau", level: 85 },
      { name: "Plotly", level: 90 },
      { name: "D3.js", level: 70 },
      { name: "Power BI", level: 80 },
    ],
  },
  {
    icon: TrendingUp,
    title: "Analytics",
    skills: [
      { name: "Statistical Analysis", level: 90 },
      { name: "A/B Testing", level: 85 },
      { name: "Predictive Modeling", level: 88 },
      { name: "Time Series", level: 82 },
    ],
  },
  {
    icon: GitBranch,
    title: "Tools & Platforms",
    skills: [
      { name: "Git", level: 90 },
      { name: "Docker", level: 85 },
      { name: "AWS", level: 80 },
      { name: "Azure ML", level: 75 },
    ],
  },
];

function SkillCard({ category, index }: { category: typeof skillCategories[0]; index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      className="bg-card border border-border rounded-lg p-6 hover:shadow-2xl transition-shadow skill-card interactive cursor-pointer"
    >
            <div className="flex items-center gap-3 mb-4" style={{ transform: "translateZ(50px)" }}>
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="p-2 bg-primary/10 rounded-lg"
              >
                <category.icon className="w-6 h-6 text-primary" />
              </motion.div>
              <h3 className="text-xl">{category.title}</h3>
            </div>

            <div className="space-y-3">
              {category.skills.map((skill, skillIndex) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-foreground/80">{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05, duration: 0.8, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
  );
}

export function SkillsSection() {
  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <h2 className="text-3xl md:text-4xl mb-8 text-center">Skills & Expertise</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, categoryIndex) => (
          <SkillCard key={category.title} category={category} index={categoryIndex} />
        ))}
      </div>
    </motion.section>
  );
}
