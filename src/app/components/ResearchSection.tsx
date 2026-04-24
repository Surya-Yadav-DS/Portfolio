import { motion } from "motion/react";
import { FileText, ExternalLink, Users, Calendar } from "lucide-react";

const researchPapers = [
  {
    title: "Novel Approaches to Time Series Anomaly Detection using Deep Learning",
    authors: "Your Name, Co-Author 1, Co-Author 2",
    venue: "IEEE International Conference on Data Science",
    year: "2024",
    abstract: "This paper presents a novel deep learning architecture for detecting anomalies in multivariate time series data, achieving state-of-the-art performance on benchmark datasets.",
    citations: 15,
    link: "#",
    pdfLink: "#",
    tags: ["Deep Learning", "Anomaly Detection", "Time Series"],
  },
  {
    title: "Efficient Feature Engineering Techniques for Large-Scale Machine Learning",
    authors: "Your Name, Co-Author 3",
    venue: "ACM International Conference on Machine Learning",
    year: "2024",
    abstract: "We propose automated feature engineering methods that significantly reduce computational overhead while maintaining model accuracy for large-scale ML applications.",
    citations: 8,
    link: "#",
    pdfLink: "#",
    tags: ["Feature Engineering", "Scalability", "AutoML"],
  },
  {
    title: "Transfer Learning for Medical Image Classification with Limited Data",
    authors: "Co-Author 1, Your Name, Co-Author 4",
    venue: "Journal of Medical AI Research",
    year: "2023",
    abstract: "A comprehensive study on transfer learning techniques for medical image classification when labeled data is scarce, demonstrating improved diagnostic accuracy.",
    citations: 23,
    link: "#",
    pdfLink: "#",
    tags: ["Transfer Learning", "Medical AI", "Computer Vision"],
  },
];

export function ResearchSection() {
  return (
    <motion.section
      id="research"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl mb-3">Research Publications</h2>
        <p className="text-muted-foreground">
          Published research in machine learning and data science
        </p>
      </div>

      <div className="space-y-6">
        {researchPapers.map((paper, index) => (
          <motion.div
            key={paper.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-all interactive"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center"
                >
                  <FileText className="w-8 h-8 text-primary" />
                </motion.div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl mb-2">{paper.title}</h3>

                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{paper.authors}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{paper.year}</span>
                  </div>
                </div>

                <p className="text-primary mb-3">{paper.venue}</p>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {paper.abstract}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {paper.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-border">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Citations: </span>
                    <span className="font-medium text-primary">{paper.citations}</span>
                  </div>
                  <motion.a
                    href={paper.link}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-primary hover:underline interactive"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Paper</span>
                  </motion.a>
                  <motion.a
                    href={paper.pdfLink}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 text-sm text-primary hover:underline interactive"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Download PDF</span>
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 text-center"
      >
        <p className="text-muted-foreground mb-4">View all publications on Google Scholar</p>
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg interactive"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
          </svg>
          <span>Google Scholar Profile</span>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}
