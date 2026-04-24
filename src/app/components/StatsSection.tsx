import { motion } from "motion/react";
import { Code2, GitBranch, Award, Users } from "lucide-react";

const stats = [
  {
    icon: Code2,
    value: "50+",
    label: "Projects Completed",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: GitBranch,
    value: "10K+",
    label: "Lines of Code",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Award,
    value: "15+",
    label: "Certifications",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: Users,
    value: "8+",
    label: "Collaborations",
    color: "from-green-500 to-emerald-500",
  },
];

export function StatsSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-12"
    >
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.05 }}
            className="bg-card border border-border rounded-lg p-6 text-center hover:shadow-lg transition-all"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className={`w-12 h-12 mx-auto mb-4 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}
            >
              <stat.icon className="w-6 h-6 text-white" />
            </motion.div>
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-3xl mb-2"
            >
              {stat.value}
            </motion.h3>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
