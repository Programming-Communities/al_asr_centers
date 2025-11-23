// components/UI/ContactCard.tsx
'use client'

import { Phone, Globe, MessageCircle } from 'lucide-react'

interface ContactCardProps {
  title: string
  subtitle: string
  contacts: string[]
  websites: string[]
  description: string
}

export default function ContactCard({ 
  title, 
  subtitle, 
  contacts, 
  websites, 
  description 
}: ContactCardProps) {
  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, '_self')
  }

  const handleWhatsApp = (phone: string) => {
    window.open(`https://wa.me/${phone.replace('+', '')}`, '_blank')
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 font-arabic mb-4">
          {subtitle}
        </p>
        <p className="text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>

      {/* Contact Numbers */}
      <div className="space-y-4 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Contact Numbers:
        </h3>
        {contacts.map((contact, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone size={18} className="text-green-600 dark:text-green-400" />
              <span className="text-gray-700 dark:text-gray-300 font-medium">{contact}</span>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleCall(contact)}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Call
              </button>
              <button
                onClick={() => handleWhatsApp(contact)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm transition-colors flex items-center space-x-1"
              >
                <MessageCircle size={14} />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Websites */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          Visit Our Websites:
        </h3>
        <div className="space-y-2">
          {websites.map((website, index) => (
            <a
              key={index}
              href={`https://${website}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
            >
              <Globe size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 font-medium">
                {website}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}