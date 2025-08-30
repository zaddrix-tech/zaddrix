'use client'

// Note: This component includes explicit light (default) and dark: variants.
// Future components should follow the same pattern to support both themes.

import { useState } from 'react'
import Link from 'next/link'
import { Twitter, Instagram, Mail, Github } from 'lucide-react'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('')

  const handleSubscribe = async (e) => {
    e.preventDefault()
    if (!email) return setStatus('Please enter an email')
    // mock subscribe
    setStatus('Subscribed (mock)')
    setEmail('')
    setTimeout(() => setStatus(''), 3000)
  }

  return (
    <footer className="bg-neutral-50 text-neutral-900 dark:bg-neutral-900 dark:text-white py-8 mt-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div>
            <h3 className="text-xl font-bold mb-2">Zaddrix</h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-300 max-w-sm">
              Premium AI-integrated skills training - glassmorphism UI, real results.
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">© {new Date().getFullYear()} Zaddy. All rights reserved.</p>
          </div>

          <nav aria-label="Footer navigation" className="flex justify-between md:justify-center">
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-neutral-700 hover:underline dark:text-neutral-200">Home</Link>
              </li>
              <li>
                <Link href="/packages" className="text-sm text-neutral-700 hover:underline dark:text-neutral-200">Packages</Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm text-neutral-700 hover:underline dark:text-neutral-200">Reviews</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-neutral-700 hover:underline dark:text-neutral-200">About</Link>
              </li>
            </ul>
            <ul className="space-y-2 hidden md:block ml-8">
              <li>
                <Link href="/contact" className="text-sm text-neutral-700 hover:underline dark:text-neutral-200">Contact</Link>
              </li>
              <li>
                <Link href="/auth/login" className="text-sm text-neutral-700 hover:underline dark:text-neutral-200">Login</Link>
              </li>
              <li>
                <Link href="/auth/register" className="text-sm text-neutral-700 hover:underline dark:text-neutral-200">Register</Link>
              </li>
            </ul>
          </nav>

          <div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <label htmlFor="footer-subscribe" className="sr-only">Email address</label>
              <input
                id="footer-subscribe"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="px-3 py-2 rounded-lg bg-neutral-100 border border-neutral-200 text-sm w-full sm:w-auto
                           dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
                aria-label="Subscribe email"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-cyan-400 text-neutral-900 font-medium text-sm hover:brightness-95
                           dark:bg-cyan-400 dark:text-neutral-900"
                aria-label="Subscribe"
              >
                Subscribe
              </button>
            </form>
            {status && <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2">{status}</p>}

            <div className="flex items-center gap-4 mt-4">
              <a href="#" aria-label="Twitter" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" aria-label="Instagram" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:hello@zaddy.example" aria-label="Email" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
              <a href="https://github.com" aria-label="GitHub" className="text-neutral-600 hover:text-neutral-800 dark:text-neutral-300 dark:hover:text-white">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
