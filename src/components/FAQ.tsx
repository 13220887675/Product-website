'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  id: number
  question: string
  answer: string
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null)
  const t = useTranslations('FAQ')

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: t('q1'),
      answer: t('a1')
    },
    {
      id: 2,
      question: t('q2'),
      answer: t('a2')
    },
    {
      id: 3,
      question: t('q3'),
      answer: t('a3')
    },
    {
      id: 4,
      question: t('q4'),
      answer: t('a4')
    },
    {
      id: 5,
      question: t('q5'),
      answer: t('a5')
    }
  ]

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        {t('title')}
      </h2>
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
        >
          <button
            className="w-full flex justify-between items-center p-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            onClick={() => toggleFAQ(faq.id)}
          >
            <span className="text-left font-medium text-gray-900 dark:text-white">
              {faq.question}
            </span>
            {openId === faq.id ? (
              <ChevronUp className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDown className="h-5 w-5 text-gray-500" />
            )}
          </button>
          {openId === faq.id && (
            <div className="p-4 bg-gray-50 dark:bg-gray-900">
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
