import React from 'react'
import { useParams } from 'react-router-dom'
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
    return <div className="py-20 text-center text-white bg-slate-900">Service non trouvé</div>
  }

  return (
    <div className="bg-slate-950 text-white selection:bg-red-600">
      <section className="relative py-24 px-6 lg:px-8 border-b border-slate-800 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent mb-6">
            {service.title}
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed mb-8">
            {service.description}
          </p>
        </div>
      </section>
      
      <section className="py-16 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Pourquoi nous choisir à Menton ?</h2>
            <p className="text-slate-400 leading-relaxed">
              {service.content}
            </p>
            <ul className="space-y-3">
              {['Intervention rapide 24/7', 'Devis gratuit & transparent', 'Techniciens certifiés Certibiocide'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-300">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 shadow-2xl backdrop-blur-sm">
             <FormWizard />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicePage
