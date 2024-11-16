"use client"

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function FAQ() {
  const t = useTranslations('FAQ')
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const faqs = [
    {
      id: 1,
      question: t('q1'),
      answer: t('a1'),
    },
    {
      id: 2,
      question: t('q2'),
      answer: t('a2'),
    },
    {
      id: 3,
      question: t('q3'),
      answer: t('a3'),
    },
    {
      id: 4,
      question: t('q4'),
      answer: t('a4'),
    },
    {
      id: 5,
      question: t('q5'),
      answer: t('a5'),
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-3xl mx-auto divide-y divide-gray-200 dark:divide-gray-700">
      {faqs.map((faq, index) => (
        <div key={faq.id} className="py-6">
          <button
            onClick={() => toggleFAQ(index)}
            className="flex justify-between items-center w-full text-left"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              {faq.question}
            </h3>
            <span className="ml-6 flex-shrink-0">
              {openIndex === index ? (
                <ChevronUp className="h-6 w-6 text-primary dark:text-primary-light" />
              ) : (
                <ChevronDown className="h-6 w-6 text-gray-400 dark:text-gray-500" />
              )}
            </span>
          </button>
          {openIndex === index && (
            <div className="mt-4 pr-12">
              <p className="text-base text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
