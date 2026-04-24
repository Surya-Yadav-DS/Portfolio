import { motion, useMotionValue, useTransform } from "motion/react";
import { ExternalLink, Github, Star } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "Customer Churn Prediction Model",
    description: "Built an ML model to predict customer churn with 94% accuracy using XGBoost and feature engineering. Deployed on AWS with real-time prediction API.",
    tags: ["Python", "XGBoost", "AWS", "Docker", "FastAPI"],
    github: "#",
    live: "#",
    highlight: "94% Accuracy",
  },
  {
    title: "Real-time Sentiment Analysis Dashboard",
    description: "Developed a streaming data pipeline for social media sentiment analysis using Apache Kafka, Spark, and React visualization dashboard.",
    tags: ["Apache Kafka", "Spark", "React", "NLP", "MongoDB"],
    github: "#",
    live: "#",
    highlight: "10K tweets/min",
  },
  {
    title: "Recommendation Engine",
    description: "Implemented collaborative filtering and content-based recommendation system for e-commerce platform, increasing user engagement by 35%.",
    tags: ["TensorFlow", "Python", "Redis", "PostgreSQL"],
    github: "#",
    live: "#",
    highlight: "+35% Engagement",
  },
  {
    title: "Computer Vision Object Detection",
    description: "Fine-tuned YOLOv8 model for custom object detection in retail environments, achieving real-time performance on edge devices.",
    tags: ["PyTorch", "YOLO", "OpenCV", "Edge AI"],
    github: "#",
    live: "#",
    highlight: "Real-time Detection",
  },
  {
    title: "Sales Forecasting System",
    description: "Time series forecasting model using LSTM and Prophet for multi-step ahead sales prediction with automated retraining pipeline.",
    tags: ["LSTM", "Prophet", "Python", "MLflow", "Airflow"],
    github: "#",
    live: "#",
    highlight: "MAPE < 5%",
  },
  {
    title: "Data Quality Monitoring Platform",
    description: "Built automated data quality monitoring system with anomaly detection, alerting, and visualization for data pipelines.",
    tags: ["Python", "Great Expectations", "Grafana", "PostgreSQL"],
    github: "#",
    live: "#",
    highlight: "99.9% Uptime",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [isClicked, setIsClicked] = useState(false);
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

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        borderColor: isClicked ? "var(--color-primary)" : "var(--color-border)",
        boxShadow: isClicked ? "0 0 20px rgba(var(--color-primary), 0.3)" : "none",
      }}
      className="bg-card border-2 border-border rounded-lg p-6 flex flex-col hover:shadow-xl transition-all group project-card interactive cursor-grab active:cursor-grabbing"
    >
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-xl pr-2">{project.title}</h3>
              <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs whitespace-nowrap">
                <Star className="w-3 h-3 fill-current" />
                <span>{project.highlight}</span>
              </div>
            </div>

            <p className="text-muted-foreground text-sm mb-4 flex-1">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex gap-3 pt-3 border-t border-border">
              <a
                href={project.github}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Code</span>
              </a>
              <a
                href={project.live}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Demo</span>
              </a>
            </div>
          </motion.div>
  );
}

export function ProjectsSection() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <h2 className="text-3xl md:text-4xl mb-8 text-center">Featured Projects</h2>
      <p className="text-center text-muted-foreground mb-8">Click or drag cards to interact</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </motion.section>
  );
}
