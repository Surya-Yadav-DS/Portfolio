import { motion } from "motion/react";
import { GraduationCap, Briefcase, Calendar } from "lucide-react";

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    specialization: "Data Science",
    institution: "University Name",
    location: "City, Country",
    period: "2021 - 2025",
    gpa: "3.9/4.0",
    highlights: [
      "Concentration in Machine Learning and Data Analytics",
      "Relevant Coursework: Deep Learning, Statistical Methods, Big Data Analytics, Computer Vision",
      "Senior Thesis: Advanced Anomaly Detection in Time Series Data",
    ],
  },
];

const experience = [
  {
    title: "Data Science Intern",
    company: "Tech Company Name",
    location: "City, Country",
    period: "Jun 2024 - Aug 2024",
    description: [
      "Developed predictive models that improved customer retention by 28%",
      "Built automated ETL pipelines processing 10M+ records daily",
      "Collaborated with cross-functional teams to deliver ML-powered features",
      "Implemented A/B testing framework to validate model improvements",
    ],
  },
  {
    title: "Machine Learning Research Assistant",
    company: "University Research Lab",
    location: "City, Country",
    period: "Jan 2023 - May 2024",
    description: [
      "Conducted research on novel deep learning architectures for NLP tasks",
      "Published 2 papers in peer-reviewed conferences",
      "Mentored 5 undergraduate students in ML projects",
      "Secured $50K research grant for continued work",
    ],
  },
  {
    title: "Data Analytics Volunteer",
    company: "Non-Profit Organization",
    location: "City, Country",
    period: "Sep 2022 - Dec 2022",
    description: [
      "Analyzed donor data to optimize fundraising campaigns",
      "Created interactive dashboards for stakeholder reporting",
      "Improved donation conversion rate by 15% through data insights",
    ],
  },
];

export function EducationExperience() {
  return (
    <div id="experience" className="py-8 grid grid-cols-1 lg:grid-cols-2 gap-12">
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl mb-8">Education</h2>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow interactive cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl mb-1">{edu.degree}</h3>
                  <p className="text-primary mb-2">{edu.specialization}</p>
                  <p className="text-muted-foreground mb-1">{edu.institution}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                    <span>{edu.location}</span>
                    <span>•</span>
                    <span>{edu.period}</span>
                    <span>•</span>
                    <span>GPA: {edu.gpa}</span>
                  </div>

                  <ul className="space-y-2">
                    {edu.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl mb-8">Experience</h2>

        <div className="space-y-6">
          {experience.map((exp, index) => (
            <motion.div
              key={exp.title + exp.company}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: -10, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)" }}
              className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow interactive cursor-pointer"
            >
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl mb-1">{exp.title}</h3>
                  <p className="text-primary mb-2">{exp.company}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>{exp.period}</span>
                    <span>•</span>
                    <span>{exp.location}</span>
                  </div>

                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground flex gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
