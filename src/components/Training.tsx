import { motion } from 'framer-motion';
import { Clock, ArrowUpRight, Award, BookOpen } from 'lucide-react';
import { training } from '../data/content';

export default function Training() {
  return (
    <section id="training" className="relative z-10 py-28 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-db-red text-[13px] font-semibold tracking-widest uppercase mb-3">
            Learn
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-db-dark tracking-tight">
            Free Training & Certifications
          </h2>
          <p className="text-db-gray-300 mt-4 text-[15px] max-w-md mx-auto leading-relaxed">
            Self-paced courses from Databricks Academy — all free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {training.map((t, i) => (
            <motion.a
              key={t.title}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="group bg-white rounded-2xl p-6 no-underline border border-db-gray-100 hover:border-db-gray-200 transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                    t.badge === 'Certification'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-blue-50 text-blue-600'
                  }`}
                >
                  {t.badge === 'Certification' ? <Award size={10} /> : <BookOpen size={10} />}
                  {t.badge}
                </span>
                <ArrowUpRight size={13} className="text-db-gray-200 group-hover:text-db-red transition-colors" />
              </div>
              <h3 className="font-semibold text-db-dark text-[15px] mb-2 group-hover:text-db-red transition-colors">
                {t.title}
              </h3>
              <p className="text-[13px] text-db-gray-300 leading-relaxed mb-4">{t.description}</p>
              <div className="flex items-center gap-3 text-[12px] text-db-gray-300">
                <span className="inline-flex items-center gap-1">
                  <Clock size={11} /> {t.duration}
                </span>
                <span className="font-semibold text-db-green">{t.cost}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
