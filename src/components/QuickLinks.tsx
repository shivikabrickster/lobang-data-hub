import { motion } from 'framer-motion';
import {
  Rocket,
  Cpu,
  BookOpen,
  Bell,
  GraduationCap,
  Users,
  ArrowUpRight,
} from 'lucide-react';
import { quickLinks } from '../data/content';

const iconMap: Record<string, React.ElementType> = {
  Rocket, Cpu, BookOpen, Bell, GraduationCap, Users,
};

export default function QuickLinks() {
  return (
    <section id="quick-links" className="relative z-10 py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-db-red text-[13px] font-semibold tracking-widest uppercase mb-3">
            Quick Access
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-db-dark tracking-tight">
            Everything You Need
          </h2>
          <p className="text-db-gray-300 mt-4 text-[15px] max-w-md mx-auto leading-relaxed">
            Docs, tools, training, and community — all in one place.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickLinks.map((link, i) => {
            const Icon = iconMap[link.icon] || Rocket;
            return (
              <motion.a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-start gap-4 rounded-2xl p-5 no-underline border border-transparent hover:border-db-gray-100 hover:bg-db-gray-50/50 transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-db-gray-50 flex items-center justify-center shrink-0 group-hover:bg-db-red/8 transition-colors">
                  <Icon size={18} className="text-db-gray-300 group-hover:text-db-red transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-semibold text-db-dark text-[14px] group-hover:text-db-red transition-colors">
                      {link.title}
                    </h3>
                    <ArrowUpRight size={12} className="text-db-gray-200 group-hover:text-db-red transition-colors shrink-0" />
                  </div>
                  <p className="text-[13px] text-db-gray-300 mt-0.5 leading-relaxed">{link.description}</p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
