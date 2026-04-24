import { motion } from "motion/react";
import { Home, User, Code2, Award, FileText, Briefcase, Mail } from "lucide-react";
import { useState } from "react";

const navItems = [
  { icon: Home, label: "Home", href: "#home" },
  { icon: User, label: "About", href: "#about" },
  { icon: Code2, label: "Skills", href: "#skills" },
  { icon: Award, label: "Projects", href: "#projects" },
  { icon: FileText, label: "Research", href: "#research" },
  { icon: Briefcase, label: "Experience", href: "#experience" },
  { icon: Mail, label: "Contact", href: "#contact" },
];

export function FloatingNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="bg-card/80 backdrop-blur-lg border border-border rounded-full px-6 py-3 shadow-2xl">
        <div className="flex items-center gap-2">
          {navItems.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              onClick={() => setActiveIndex(index)}
              className="relative p-3 rounded-full interactive group"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeIndex === index && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <item.icon
                className={`w-5 h-5 relative z-10 transition-colors ${
                  activeIndex === index ? "text-primary-foreground" : "text-muted-foreground group-hover:text-primary"
                }`}
              />

              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded text-xs whitespace-nowrap pointer-events-none"
              >
                {item.label}
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
