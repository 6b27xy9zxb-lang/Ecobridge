import { motion } from 'framer-motion'

const team = [
  { name: "Himanshu Pal", role: "CEO & Co-Founder", emoji: "👨‍💻", bio: "Visionary behind EcoBridge. Passionate about climate tech and building the green economy of tomorrow." },
  { name: "Piyush S", role: "Co-Founder & CTO", emoji: "👨‍💻", bio: "Tech architect powering EcoBridge. Builds AI systems that connect businesses and workers at scale." },
  { name: "Mahi Talwani", role: "Co-Founder & Head of Product", emoji: "👩‍🎨", bio: "Shapes the EcoBridge experience. Obsessed with design, user journeys, and green innovation." },
  { name: "Nandani Singh", role: "Co-Founder & Head of Partnerships", emoji: "👩‍💼", bio: "Connects EcoBridge to the world. Builds bridges between businesses, workers, and green opportunities." },
]

const values = [
  { icon: "🌍", title: "Planet First", desc: "Every feature we build is measured by its real-world climate impact." },
  { icon: "⚖️", title: "Just Transition", desc: "We believe workers shouldn't be left behind in the green shift." },
  { icon: "🔓", title: "Open Innovation", desc: "We share data and insights openly to accelerate the whole ecosystem." },
  { icon: "🤝", title: "Radical Collaboration", desc: "Businesses and workers win together — never at each other's expense." },
]

export default function About() {
  return (
    <main className="pt-28 pb-20 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-eco-green/10 text-eco-green mb-4">
            Our Mission
          </span>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-eco-white mb-6">
            Built for the <span className="text-eco-green">green transition</span>
          </h1>
          <p className="text-eco-muted text-xl max-w-2xl mx-auto leading-relaxed">
            EcoBridge was born from a simple belief — the green economy 
            should work for everyone. Businesses, workers, and the planet.
          </p>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          <h2 className="font-display text-3xl font-bold text-eco-white text-center mb-10">
            What we stand for
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-eco-border bg-eco-card hover:border-eco-green/30 transition-all text-center"
              >
                <div className="text-4xl mb-4">{v.icon}</div>
                <div className="font-display font-bold text-eco-white mb-2">{v.title}</div>
                <p className="text-eco-muted text-sm leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-display text-3xl font-bold text-eco-white text-center mb-10">
            Meet the team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-eco-border bg-eco-card hover:border-eco-green/30 transition-all text-center group"
              >
                <div className="w-16 h-16 rounded-full bg-eco-green/10 border border-eco-green/20 flex items-center justify-center text-3xl mx-auto mb-4 group-hover:border-eco-green/50 transition-all">
                  {t.emoji}
                </div>
                <div className="font-display font-bold text-eco-white mb-1">{t.name}</div>
                <div className="text-eco-green text-xs font-semibold mb-3">{t.role}</div>
                <p className="text-eco-muted text-xs leading-relaxed">{t.bio}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </main>
  )
}