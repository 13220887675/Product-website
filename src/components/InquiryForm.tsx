"use client"

import { useForm } from 'react-hook-form'
import { useTranslations } from 'next-intl'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Product } from '@/types/product'

interface Props {
  product?: Product
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  company: yup.string().required(),
  message: yup.string().required(),
}).required()

type FormData = yup.InferType<typeof schema>

export default function InquiryForm({ product }: Props) {
  const t = useTranslations('InquiryForm')
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      message: product ? t('defaultMessage', { product: product.name }) : '',
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      // Here you would typically send the data to your backend
      const formData = product
        ? {
            ...data,
            productId: product.id,
            productName: product.name,
          }
        : data
      
      console.log(formData)
      reset()
      alert(t('success'))
    } catch (error) {
      alert(t('error'))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl mx-auto">
      <div className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('name.label')}
          </label>
          <input
            type="text"
            id="name"
            {...register('name')}
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{t('name.required')}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('email.label')}
          </label>
          <input
            type="email"
            id="email"
            {...register('email')}
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{t('email.required')}</p>
          )}
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('company.label')}
          </label>
          <input
            type="text"
            id="company"
            {...register('company')}
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{t('company.required')}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t('message.label')}
          </label>
          <textarea
            id="message"
            rows={4}
            {...register('message')}
            className="mt-1 block w-full border-gray-300 dark:border-gray-600 shadow-sm focus:border-primary focus:ring-primary dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{t('message.required')}</p>
          )}
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-offset-gray-800"
          >
            {t('submit')}
          </button>
        </div>
      </div>
    </form>
  )
}
