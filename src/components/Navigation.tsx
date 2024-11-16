"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import LanguageSwitcher from './LanguageSwitcher'
import ThemeSwitcher from './ThemeSwitcher'
import { Menu, X } from 'lucide-react'

// 导航链接配置
const navLinks = [
  { href: '/', label: 'home' },
  { href: '/products', label: 'products' },
  { href: '/blog', label: 'blog' },
  { href: '/#faq', label: 'faq' }
] as const

export default function Navigation() {
  const t = useTranslations('Navigation')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-primary dark:text-primary-light">
            {t('logo')}
          </Link>

          {/* 桌面端导航链接 */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                {t(label)}
              </Link>
            ))}
          </div>

          {/* 功能按钮区 */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block">
              <ThemeSwitcher />
            </div>
            <LanguageSwitcher />
            {/* 移动端菜单按钮 */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={toggleDrawer}
              aria-label={isDrawerOpen ? t('closeMenu') : t('openMenu')}
            >
              {isDrawerOpen ? (
                <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700 dark:text-gray-200" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端抽屉菜单 */}
      <div
        className={`fixed inset-y-0 right-0 transform ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        } md:hidden w-64 bg-white dark:bg-gray-900 shadow-lg transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4 space-y-6">
          <div className="flex justify-end">
            <button
              onClick={toggleDrawer}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={t('closeMenu')}
            >
              <X className="w-6 h-6 text-gray-700 dark:text-gray-200" />
            </button>
          </div>
          
          {/* 移动端导航链接 */}
          <div className="flex flex-col space-y-4">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary-light transition-colors"
                onClick={toggleDrawer}
              >
                {t(label)}
              </Link>
            ))}
          </div>

          {/* 移动端主题切换按钮 */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <ThemeSwitcher />
          </div>
        </div>
      </div>

      {/* 背景遮罩 */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleDrawer}
          aria-hidden="true"
        />
      )}
    </nav>
  )
}
