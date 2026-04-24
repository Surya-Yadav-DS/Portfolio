import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export function AboutSection() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <div className="bg-gradient-to-br from-card via-card to-secondary/20 border border-border rounded-lg p-8 md:p-10">
        <div className="flex items-center gap-3 mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl">About Me</h2>
        </div>

        <div className="space-y-4 text-muted-foreground">
          <p className="text-lg leading-relaxed">
            I'm a passionate Data Scientist and Machine Learning Engineer with a strong foundation in computer science
            and a specialization in extracting meaningful insights from complex datasets. My journey in data science
            combines rigorous academic training with hands-on experience in building production-ready ML systems.
          </p>

          <p className="leading-relaxed">
            Throughout my career, I've developed expertise in the full data science lifecycle—from data collection and
            preprocessing to model deployment and monitoring. I'm particularly interested in deep learning, natural
            language processing, and building scalable data pipelines that drive business value.
          </p>

          <p className="leading-relaxed">
            I believe in continuous learning and staying current with the latest advancements in AI and machine learning.
            When I'm not training models or analyzing data, you'll find me contributing to open-source projects,
            participating in Kaggle competitions, or writing technical blog posts to share knowledge with the community.
          </p>

          <div className="pt-4 flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
              Problem Solver
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
              Team Player
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
              Continuous Learner
            </span>
            <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm">
              Open Source Contributor
            </span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
