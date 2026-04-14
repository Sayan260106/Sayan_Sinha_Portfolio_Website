import { motion } from 'motion/react';
import { BLOG_POSTS } from '../constants';
import { Calendar, ArrowRight } from 'lucide-react';

export default function Blog() {
  return (
    <section id="blog" className="py-24 px-6 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4">Insights</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold">
              Latest <span className="text-zinc-500">Articles.</span>
            </h3>
          </div>
          <motion.button
            whileHover={{ x: 5 }}
            className="text-sm font-bold flex items-center gap-2 text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            View all posts <ArrowRight size={18} />
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[16/9] rounded-3xl overflow-hidden mb-6 bg-zinc-900 border border-zinc-800">
                {/* Placeholder for blog image */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-blue-500/20 group-hover:scale-110 transition-transform duration-500"></div>
                <div className="absolute inset-0 flex items-center justify-center opacity-20 group-hover:opacity-40 transition-opacity">
                  <span className="text-8xl font-display font-bold">0{post.id}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-xs text-zinc-500 font-bold uppercase tracking-widest mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-800"></span>
                <span>5 min read</span>
              </div>

              <h4 className="text-2xl font-display font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h4>
              
              <p className="text-zinc-400 leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-2 text-sm font-bold text-zinc-100"
              >
                Read More <ArrowRight size={16} className="text-emerald-500" />
              </motion.div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
