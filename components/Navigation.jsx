
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'
import { Crown, Menu, X } from 'lucide-react'

export default function Navigation({ setCurrentView, onLogin, user }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  function LoginForm({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
      e.preventDefault()
      onLogin(email, password)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="rounded-3xl"
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="rounded-3xl"
          />
        </div>
        <Button type="submit" className="w-full neon-border-cyan rounded-3xl">Login</Button>
        <Button type="button" variant="outline" className="w-full rounded-3xl">Continue with Google</Button>
      </form>
    )
  }

  return (
    <nav className="glass-nav fixed top-3 left-1/2 transform -translate-x-1/2 z-50 p-4 w-full max-w-4xl">
      <div className="flex items-center w-full">
        {/* Left: Logo/Brand */}
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <Crown className="h-8 w-8 neon-cyan floating" />
          <span className="text-2xl font-bold">Zaddrix</span>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-6 justify-center flex-1 min-w-0">
          <Button variant="ghost" className="hover-lift" asChild><a href="/">Home</a></Button>
          <Button variant="ghost" className="hover-lift" asChild><a href="/packages">Packages</a></Button>
          <Button variant="ghost" className="hover-lift" asChild><a href="/reviews">Reviews</a></Button>
          <Button variant="ghost" className="hover-lift" asChild><a href="/about">About</a></Button>
        </div>

        {/* Right: Login/Dashboard */}
        <div className="flex items-center space-x-4 flex-1 min-w-0 justify-end">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center space-x-2">
              <Avatar className="floating">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Button className="btn-animated" onClick={() => setCurrentView('dashboard')}>Dashboard</Button>
            </div>
          ) : (
            <Button className="neon-border-cyan rounded-3xl" asChild>
              <h1>Login</h1>
            </Button>
          )}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden mt-4 glass-card p-4">
          <div className="flex flex-col space-y-2">
            <Button variant="ghost" asChild><a href="/" onClick={() => setIsMenuOpen(false)}>Home</a></Button>
            <Button variant="ghost" asChild><a href="/packages" onClick={() => setIsMenuOpen(false)}>Packages</a></Button>
            <Button variant="ghost" asChild><a href="/reviews" onClick={() => setIsMenuOpen(false)}>Reviews</a></Button>
            <Button variant="ghost" asChild><a href="/about" onClick={() => setIsMenuOpen(false)}>About</a></Button>
          </div>
        </div>
      )}
    </nav>
  )
}
