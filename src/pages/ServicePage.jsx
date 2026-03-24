import React from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import FormWizard from '../components/FormWizard/FormWizard'

const services = {
  deratisation: {
    title: 'Dératisation à Menton',
    description: 'Expertise locale en lutte contre les rongeurs (rats, souris) pour particuliers et professionnels.',
    content: 'Nos techniciens certifiés interviennent rapidement à Menton pour sécuriser votre environnement.'
  },
  desinsectisation: {
    title: 'Désinsectisation à Menton',
    description: 'Élimination durable des insectes nuisibles : cafards, punaises de lit, frelons, fourmis.',
    content: 'Solutions ciblées et respectueuses de votre santé pour éradiquer toute infestation.'
  },
  desinfection: {
    title: 'Désinfection à Menton',
    description: 'Protocoles de désinfection professionnels pour une hygiène irréprochable.',
    content: 'Traitements virucides et bactéricides adaptés aux locaux sensibles.'
  },
  nettoyage: {
    title: 'Nettoyage à Menton',
    description: 'Services de nettoyage spécialisés et entretien courant de haute qualité.',
    content: 'Équipes dédiées pour un résultat impeccable sur tous types de surfaces.'
  },
  debarrassage: {
    title: 'Débarrassage à Menton',
    description: 'Évacuation rapide et responsable de vos encombrants.',
    content: 'Tri, enlèvement et nettoyage après débarras pour redonner vie à vos espaces.'
  }
}

function ServicePage() {
  const { serviceId } = useParams()
  const service = services[serviceId]

  if (!service) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="py-20 text-center text-white bg-slate-900"
      >
        Service non trouvé
      </motion.div>
    )
  }

  return (
    <div className="bg-slate-950 text-white selection:bg-red-600 overflow-x-hidden">
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative py-24 px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950"
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-6"
          >
            {service.title}
          </h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8"
          >
            {service.description}
          </motion.p>
        </div>
      </motion.section>
      
      <section className="py-16 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-bold text-white">Pourquoi nous choisir à Menton ?</h2>
            <p className="text-slate-400 leading-relaxed">
              {service.content}
            </p>
            <ul className="space-y-4">
              {['Intervention rapide 24/7', 'Devis gratuit & transparent', 'Techniciens certifiés Certibiocide'].map((item, index) => (
                <motion.li 
                  key={item}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-center gap-3 text-slate-300"
                >
                  <span className="h-2 w-2 rounded-full bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.6)]" />
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm"
          >
             <FormWizard />
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ServicePage
