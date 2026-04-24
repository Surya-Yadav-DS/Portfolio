import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export function ContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormState({ name: "", email: "", message: "" });
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-8"
    >
      <h2 className="text-3xl md:text-4xl mb-8 text-center">Get In Touch</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <h3 className="text-2xl mb-4">Let's Connect</h3>
          <p className="text-muted-foreground mb-6">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
          </p>

          <div className="space-y-4">
            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg interactive"
            >
              <div className="p-3 bg-primary/10 rounded-lg">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p>your.email@example.com</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg interactive"
            >
              <div className="p-3 bg-primary/10 rounded-lg">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p>+1 (123) 456-7890</p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ x: 10 }}
              className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg interactive"
            >
              <div className="p-3 bg-primary/10 rounded-lg">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p>City, Country</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm mb-2">Name</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              required
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary interactive"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Email</label>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="email"
              required
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary interactive"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-2">Message</label>
            <motion.textarea
              whileFocus={{ scale: 1.02 }}
              required
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              rows={6}
              className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none interactive"
              placeholder="Tell me about your project..."
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg flex items-center justify-center gap-2 interactive disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </motion.form>
      </div>
    </motion.section>
  );
}
