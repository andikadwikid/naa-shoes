'use client'

import { useState } from 'react'

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "mainEntity": {
    "@type": "Organization",
    "name": "NAA Shoes",
    "url": "https://naashoes.com",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+62-21-1234-5678",
        "contactType": "customer service",
        "availableLanguage": ["Indonesian", "English"],
        "hoursAvailable": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "18:00"
        }
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Fashion Street No. 123",
      "addressLocality": "Jakarta Selatan",
      "addressRegion": "DKI Jakarta",
      "postalCode": "12345",
      "addressCountry": "ID"
    }
  }
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      


      <main id="main-content" className="min-h-screen bg-gray-50 py-12" role="main">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <header className="text-center mb-12" role="banner">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact <span className="gradient-text">Us</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Ada pertanyaan atau butuh bantuan? Kami siap membantu Anda!
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Contact Form */}
            <section 
              className="bg-white rounded-lg shadow-sm p-8"
              aria-labelledby="contact-form-heading"
              role="region"
            >
              <h2 id="contact-form-heading" className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div 
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-green-800">Terima kasih! Pesan Anda telah diterima. Kami akan segera merespons.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div 
                  className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-800">Maaf, terjadi kesalahan. Silakan coba lagi atau hubungi kami langsung.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors touch-manipulation"
                    placeholder="Nama lengkap Anda"
                    aria-describedby="name-error"
                  />
                  <div id="name-error" className="sr-only" aria-live="polite"></div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors touch-manipulation"
                    placeholder="email@example.com"
                    aria-describedby="email-error email-help"
                  />
                  <p id="email-help" className="text-xs text-gray-500 mt-1">
                    We'll never share your email address
                  </p>
                  <div id="email-error" className="sr-only" aria-live="polite"></div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors touch-manipulation"
                    aria-describedby="subject-error"
                  >
                    <option value="">Pilih topik</option>
                    <option value="general">Pertanyaan Umum</option>
                    <option value="product">Informasi Produk</option>
                    <option value="order">Status Pesanan</option>
                    <option value="return">Return & Exchange</option>
                    <option value="complaint">Keluhan</option>
                    <option value="suggestion">Saran</option>
                  </select>
                  <div id="subject-error" className="sr-only" aria-live="polite"></div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    aria-required="true"
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors touch-manipulation resize-vertical"
                    placeholder="Tulis pesan Anda di sini..."
                    aria-describedby="message-error message-help"
                    maxLength={1000}
                  />
                  <p id="message-help" className="text-xs text-gray-500 mt-1">
                    Maximum 1000 characters
                  </p>
                  <div id="message-error" className="sr-only" aria-live="polite"></div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 touch-manipulation"
                  aria-describedby="submit-help"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
                <p id="submit-help" className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our privacy policy
                </p>
              </form>
            </section>

            {/* Contact Information */}
            <div className="space-y-8">
              
              {/* Contact Details */}
              <section 
                className="bg-white rounded-lg shadow-sm p-8"
                aria-labelledby="contact-info-heading"
                role="region"
              >
                <h2 id="contact-info-heading" className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
                <div className="space-y-6" role="list" aria-label="Contact information">
                  
                  <div className="flex items-start space-x-4" role="listitem">
                    <div 
                      className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      role="img"
                      aria-label="Store location"
                    >
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Store Address</h3>
                      <address className="text-gray-600 not-italic">
                        Jl. Fashion Street No. 123<br />
                        Jakarta Selatan, DKI Jakarta 12345<br />
                        Indonesia
                      </address>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" role="listitem">
                    <div 
                      className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      role="img"
                      aria-label="Phone contact"
                    >
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Phone</h3>
                      <p>
                        <a href="tel:+622112345678" className="text-gray-600 hover:text-pink-600 transition-colors">
                          +62 21 1234 5678
                        </a>
                      </p>
                      <p>
                        <a href="tel:+6281234567890" className="text-gray-600 hover:text-pink-600 transition-colors">
                          +62 812 3456 7890
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" role="listitem">
                    <div 
                      className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      role="img"
                      aria-label="Email contact"
                    >
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Email</h3>
                      <p>
                        <a href="mailto:hello@naashoes.com" className="text-gray-600 hover:text-pink-600 transition-colors">
                          hello@naashoes.com
                        </a>
                      </p>
                      <p>
                        <a href="mailto:support@naashoes.com" className="text-gray-600 hover:text-pink-600 transition-colors">
                          support@naashoes.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4" role="listitem">
                    <div 
                      className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center flex-shrink-0"
                      role="img"
                      aria-label="Business hours"
                    >
                      <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Business Hours</h3>
                      <div className="text-gray-600">
                        <p>Senin - Jumat: <time>9:00 - 18:00</time></p>
                        <p>Sabtu: <time>9:00 - 16:00</time></p>
                        <p>Minggu: Tutup</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* FAQ Quick Links */}
              <aside 
                className="bg-pink-50 rounded-lg p-6"
                aria-labelledby="quick-help-heading"
                role="complementary"
              >
                <h3 id="quick-help-heading" className="text-lg font-semibold text-pink-900 mb-4">Quick Help</h3>
                <nav className="space-y-2" role="list" aria-label="Quick help links">
                  <a 
                    href="#" 
                    className="block text-pink-700 hover:text-pink-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                    role="listitem"
                  >
                    📦 How to track my order?
                  </a>
                  <a 
                    href="#" 
                    className="block text-pink-700 hover:text-pink-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                    role="listitem"
                  >
                    👠 Size guide and fitting
                  </a>
                  <a 
                    href="#" 
                    className="block text-pink-700 hover:text-pink-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                    role="listitem"
                  >
                    🔄 Return and exchange policy
                  </a>
                  <a 
                    href="#" 
                    className="block text-pink-700 hover:text-pink-900 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 rounded"
                    role="listitem"
                  >
                    💳 Payment methods accepted
                  </a>
                </nav>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
