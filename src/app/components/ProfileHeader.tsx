import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { Github, Linkedin, Mail, MapPin, Phone, Download } from "lucide-react";
import { useState } from "react";

export function ProfileHeader() {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      id="home"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative bg-gradient-to-br from-primary via-primary/90 to-primary/80 text-primary-foreground rounded-lg p-8 md:p-12 overflow-hidden interactive"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)]" />

      {isHovered && (
        <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_50%)]" />
      )}

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-accent to-secondary p-1">
            <div className="w-full h-full rounded-full bg-muted flex items-center justify-center overflow-hidden">
              <span className="text-5xl md:text-6xl">👨‍💻</span>
            </div>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 border-2 border-dashed border-primary-foreground/30 rounded-full"
          />
        </motion.div>

        <div className="flex-1 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-5xl mb-2"
          >
            Your Name
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-primary-foreground/80 mb-4"
          >
            Data Scientist | Machine Learning Engineer
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center md:justify-start text-sm text-primary-foreground/70"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>City, Country</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span>your.email@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>+1 (123) 456-7890</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 mt-6 justify-center md:justify-start"
          >
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors interactive"
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors interactive"
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors interactive"
            >
              <Mail className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="#"
              whileHover={{ scale: 1.2, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors interactive"
              title="Google Scholar"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l4.838 3.94A8 8 0 0 1 12 9a8 8 0 0 1 7.162 4.44L24 9.5z"/>
              </svg>
            </motion.a>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-4 py-2 bg-primary-foreground text-primary rounded-full flex items-center gap-2 interactive"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Resume</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
