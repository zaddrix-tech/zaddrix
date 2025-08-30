'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ThemeToggle } from '@/components/theme-toggle'
import { 
  Play, 
  CheckCircle, 
  Star, 
  Users, 
  Trophy, 
  Zap, 
  Crown,
  ArrowRight,
  BookOpen,
  Video,
  Lock,
  Menu,
  X
} from 'lucide-react'
import Navigation from '@/components/Navigation' // <--- moved Navigation here

// Particle System Component
const ParticleSystem = () => {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    const createParticle = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: Math.random() * 10 + 15,
      delay: Math.random() * 5
    })

    const initialParticles = Array.from({ length: 15 }, createParticle)
    setParticles(initialParticles)

    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-14),
        createParticle()
      ])
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="particles-bg">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.left}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`
          }}
        />
      ))}
    </div>
  )
}

// Enhanced Floating Icons Component
const FloatingIcons = () => {
  const icons = [
    { Icon: Crown, delay: 0, duration: 6 },
    { Icon: Zap, delay: 2, duration: 8 },
    { Icon: Trophy, delay: 4, duration: 7 },
    { Icon: Star, delay: 1, duration: 9 }
  ]

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {icons.map(({ Icon, delay, duration }, index) => (
        <div
          key={index}
          className="absolute opacity-20"
          style={{
            top: `${20 + (index * 15)}%`,
            left: `${10 + (index * 20)}%`,
            animation: `floating ${duration}s ease-in-out infinite`,
            animationDelay: `${delay}s`
          }}
        >
          <Icon className="h-12 w-12 text-cyan-400" />
        </div>
      ))}
    </div>
  )
}

// Mock Data
const packages = [
  {
    id: 'alpha',
    name: 'Alpha',
    title: 'E-commerce Fundamentals',
    price: 5999,
    originalPrice: 8999,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxvbmxpbmUlMjBidXNpbmVzc3xlbnwwfHx8fDE3NTYxMDAyNzl8MA&ixlib=rb-4.1.0&q=85',
    features: [
      'Product research & selection',
      'Store setup & optimization',
      'Marketing strategies',
      'Order fulfillment basics',
      'Customer service mastery'
    ],
    modules: 5,
    lessons: 25,
    duration: '8 hours'
  },
  {
    id: 'beta',
    name: 'Beta',
    title: 'Alpha + AI Vibe Coding',
    price: 7999,
    originalPrice: 9999,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxjb2Rpbmd8ZW58MHx8fHwxNzU2MTAwMjg0fDA&ixlib=rb-4.1.0&q=85',
    features: [
      'Everything in Alpha',
      'AI-powered development',
      'No-code/Low-code solutions',
      'Automation workflows',
      'Custom app building',
      'AI tool mastery'
    ],
    modules: 8,
    lessons: 40,
    duration: '15 hours'
  },
  {
    id: 'gamma',
    name: 'Gamma',
    title: 'Complete Package + UGC',
    price: 9999,
    originalPrice: 12999,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1726066012749-f81bf4422d4e?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzF8MHwxfHNlYXJjaHwxfHxjb250ZW50JTIwY3JlYXRpb258ZW58MHx8fHwxNzU2MTAwMjg5fDA&ixlib=rb-4.1.0&q=85',
    features: [
      'Everything in Alpha + Beta',
      'Instagram influencing',
      'Video content creation',
      'Veo3 video generation',
      'JSON prompting mastery',
      'Personal brand building',
      'Monetization strategies',
      'Community management'
    ],
    modules: 12,
    lessons: 60,
    duration: '25 hours'
  },
  {
    id: 'sigma',
    name: 'Sigma',
    title: 'Advanced AI Mastery',
    price: 'Coming Soon',
    originalPrice: null,
    status: 'coming-soon',
    image: null,
    features: [
      'Advanced AI techniques',
      'Custom model training',
      'Enterprise solutions',
      'White-label products',
      '1-on-1 mentorship'
    ],
    modules: '???',
    lessons: '???',
    duration: 'TBA'
  }
]

const testimonials = [
  {
    name: 'Dr Aatif',
    avatar: '/api/placeholder/40/40',
    role: 'MBBS Student, Malegaon',
    content: 'I am an MBBS student from Malegaon, Maharashtra. I recently joined Zaddrix and was truly impressed with their system. The owner provides 24/7 support, and the team feels more like a family than just a company. Thank you, Zaddrix!',
    rating: 5,
    earnings: '8000/week'
  },
  {
    name: 'Dr Muhib',
    avatar: '/api/placeholder/40/40',
    role: 'BDS Student, Dhule',
    content: 'I am a BDS student from Dhule and joined Zaddrix just 10 days ago. The system here is amazing within my first week itself, I earned over ₹10,000. Thank you, Zaddrix.',
    rating: 5,
    earnings: '₹10,000/week'
  },
  {
    name: 'Mr Mansor',
    avatar: '/api/placeholder/40/40',
    role: 'Businessman, Malegaon',
    content: 'I am Mansor from Malegaon, Maharashtra. Though I am a businessman, I trust Zaddrix even more than my own business. Its system and earning opportunities are truly amazing. Thank you to the Zaddrix founders!',
    rating: 5,
    earnings: '₹7,000/week'
  }
]

export default function ZaddrixPlatform() {
  const [currentView, setCurrentView] = useState('home')
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [user, setUser] = useState(null)

  // Mock login function
  const mockLogin = (email, password) => {
    setUser({
      name: 'John Doe',
      email: email,
      avatar: '/api/placeholder/40/40',
      activePackages: ['alpha'],
      joinedAt: '2024-01-15'
    })
    setCurrentView('dashboard')
  }

  // Login Form Component
  const LoginForm = ({ onLogin }) => {
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
        <Button type="submit" className="w-full neon-border-cyan rounded-3xl btn-animated">Login</Button>
        <Button type="button" variant="outline" className="w-full rounded-3xl btn-animated">Continue with Google</Button>
      </form>
    )
  }

  // Package Card Component with Enhanced Animations
  const PackageCard = ({ pkg, isDetailed = false }) => (
    <Card className={`glass-card hover-lift tilt-card ${pkg.status === 'coming-soon' ? 'opacity-60' : ''} ${isDetailed ? 'w-full' : ''}`}>
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          {pkg.image ? (
            <div className="floating">
              <img src={pkg.image} alt={pkg.title} className="w-20 h-20 rounded-2xl object-cover" />
            </div>
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-400 flex items-center justify-center floating-delayed">
              <Lock className="h-10 w-10 text-white" />
            </div>
          )}
        </div>
        <div className="flex justify-center mb-2">
          <Badge className={`${pkg.name.toLowerCase() === 'alpha' ? 'bg-green-500 pulse-glow' : pkg.name.toLowerCase() === 'beta' ? 'bg-blue-500 pulse-glow' : pkg.name.toLowerCase() === 'gamma' ? 'bg-purple-500 pulse-glow' : 'bg-gray-500'} transition-all duration-300`}>
            {pkg.name}
          </Badge>
        </div>
        <CardTitle className="text-foreground">{pkg.title}</CardTitle>
        <CardDescription>
          {typeof pkg.price === 'number' ? (
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">₹{pkg.price.toLocaleString()}</div>
              {pkg.originalPrice && (
                <div className="text-sm text-muted-foreground line-through">₹{pkg.originalPrice.toLocaleString()}</div>
              )}
            </div>
          ) : (
            <div className="text-2xl font-bold text-muted-foreground">{pkg.price}</div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div className="hover-lift">
              <BookOpen className="h-4 w-4 mx-auto mb-1" />
              <div>{pkg.modules} Modules</div>
            </div>
            <div className="hover-lift">
              <Video className="h-4 w-4 mx-auto mb-1" />
              <div>{pkg.lessons} Lessons</div>
            </div>
            <div className="hover-lift">
              <Trophy className="h-4 w-4 mx-auto mb-1" />
              <div>{pkg.duration}</div>
            </div>
          </div>
          
          <div className="space-y-2">
            {pkg.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 fade-in-up revealed hover-lift" style={{animationDelay: `${index * 0.1}s`}}>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            {pkg.status === 'active' ? (
              <>
                <Button 
                  className="w-full neon-border-cyan rounded-3xl btn-animated magnetic"
                  onClick={() => {
                    setSelectedPackage(pkg)
                    setCurrentView('package-detail')
                  }}
                >
                  View Details <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                {!isDetailed && (
                  <Button 
                    className="w-full neon-border-purple rounded-3xl btn-animated magnetic"
                    onClick={() => alert('Mock purchase - would integrate Razorpay here')}
                  >
                    Buy Now ₹{pkg.price.toLocaleString()}
                  </Button>
                )}
              </>
            ) : (
              <Button disabled className="w-full rounded-3xl">
                Coming Soon
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  // Home View with Enhanced Animations
  const HomeView = () => (
    <div className="min-h-screen">
      <ParticleSystem />
      
      {/* Hero Section */}
      <section
        className="hero-bg min-h-screen flex items-center justify-center relative pt-24 pb-12 px-4 md:px-8"
        aria-label="Hero Section"
      >
        <FloatingIcons />
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzB8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fGJsdWV8MTc1NjEwMDI1MHww&ixlib=rb-4.1.0&q=85)',
          }}
          aria-hidden="true"
        />
        <div className="container mx-auto text-center relative z-10 flex flex-col items-center justify-center">
          <h1 className="font-bold mb-6 break-words w-full
            text-4xl sm:text-5xl md:text-6xl lg:text-8xl
            leading-tight md:leading-tight lg:leading-tight"
          >
            <span>Learn</span>
            <span className="mx-2 md:mx-4">•</span>
            <span>Earn</span>
            <span className="mx-2 md:mx-4">•</span>
            <span>Grow</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 text-muted-foreground max-w-xl sm:max-w-2xl md:max-w-3xl mx-auto fade-in-up revealed">
            Master AI-integrated skills and build profitable online businesses from home.
            Join thousands earning ₹50K+ monthly with our premium training programs.
          </p>
          <div className="flex flex-col gap-4 w-full max-w-xs sm:max-w-md md:max-w-lg mx-auto
            md:flex-row md:justify-center md:items-center"
          >
            <Button
              size="lg"
              className="neon-border-cyan text-lg px-8 py-6 rounded-3xl btn-animated magnetic w-full md:w-auto"
              onClick={() => setCurrentView('packages')}
              aria-label="Explore Packages"
            >
              <Zap className="mr-2 h-5 w-5" />
              Explore Packages
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 rounded-3xl btn-animated w-full md:w-auto"
              onClick={() => setCurrentView('reviews')}
              aria-label="Success Stories"
            >
              <Users className="mr-2 h-5 w-5" />
              Success Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Package Preview with Enhanced Animations */}
      <section className="py-20">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12 fade-in-up revealed">Choose Your Path</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.slice(0, 3).map((pkg, index) => (
              <div key={pkg.id} className="fade-in-up revealed" style={{animationDelay: `${index * 0.2}s`}}>
                <PackageCard pkg={pkg} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof with Enhanced Effects */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-12 fade-in-up revealed">Success Stories</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="fade-in-up revealed" style={{animationDelay: `${index * 0.15}s`}}>
                <Card className="glass-card hover-lift">
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-sm mb-4">{testimonial.content}</p>
                    <Badge className="neon-border-cyan pulse-glow">{testimonial.earnings}</Badge>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12 fade-in-up revealed">
            <h2 className="text-4xl font-bold mb-4">About Zaddrix</h2>
            <p className="text-xl text-muted-foreground">Empowering the next generation of digital entrepreneurs</p>
          </div>
          
          <Card className="glass-card mb-8 hover-lift fade-in-up revealed">
            <CardContent className="p-8">
              <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
              <p className="text-lg leading-relaxed mb-6">
                At Zaddrix, we believe everyone deserves the opportunity to build a profitable online business from home. 
                Our mission is to democratize access to cutting-edge AI tools and proven business strategies, 
                enabling anyone to achieve financial freedom through digital entrepreneurship.
              </p>
              <p className="text-lg leading-relaxed">
                We've helped over 10,000+ students generate millions in combined revenue through our progressive 
                learning system that takes you from complete beginner to advanced AI-powered entrepreneur.
              </p>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="glass-card text-center hover-lift tilt-card fade-in-up revealed" style={{animationDelay: '0.1s'}}>
              <CardContent className="p-6">
                <Users className="h-12 w-12 mx-auto text-blue-500 mb-4 floating" />
                <h3 className="text-2xl font-bold mb-2">100+</h3>
                <p className="text-muted-foreground">Students Trained</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center hover-lift tilt-card fade-in-up revealed" style={{animationDelay: '0.2s'}}>
              <CardContent className="p-6">
                <Trophy className="h-12 w-12 mx-auto mb-4 text-green-500 floating-delayed" />
                <h3 className="text-2xl font-bold mb-2">₹10L+</h3>
                <p className="text-muted-foreground">Student Revenue Generated</p>
              </CardContent>
            </Card>
            
            <Card className="glass-card text-center hover-lift tilt-card fade-in-up revealed" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-6">
                <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500 floating" />
                <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
                <p className="text-muted-foreground">Average Rating</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )

  // Package Detail View
  const PackageDetailView = () => {
    if (!selectedPackage) return <div>Package not found</div>

    return (
      <div className="min-h-screen pt-20 py-8">
        <div className="container mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setCurrentView('packages')}
            className="mb-6 btn-animated hover-lift"
          >
            ← Back to Packages
          </Button>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="fade-in-up revealed">
              <PackageCard pkg={selectedPackage} isDetailed={true} />
            </div>
            
            <div className="space-y-8 fade-in-up revealed" style={{animationDelay: '0.2s'}}>
              <div>
                <h2 className="text-3xl font-bold mb-4 neon-cyan">Course Curriculum</h2>
                <div className="space-y-4">
                  {selectedPackage.features.map((feature, index) => (
                    <Card key={index} className="glass-card hover-lift">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center pulse-glow">
                            <span className="text-sm font-bold text-cyan-400">{index + 1}</span>
                          </div>
                          <span>{feature}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  size="lg" 
                  className="w-full neon-border-purple text-lg btn-animated magnetic rounded-3xl"
                  onClick={() => alert('Mock purchase flow - would integrate Razorpay here')}
                >
                  <Crown className="mr-2 h-5 w-5" />
                  Enroll Now - ₹{selectedPackage.price.toLocaleString()}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  30-day money-back guarantee • Lifetime access • Community included
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Dashboard View
  const DashboardView = () => (
    <div className="min-h-screen pt-20 py-8">
      <div className="container mx-auto">
        <div className="mb-8 fade-in-up revealed">
          <h1 className="text-4xl font-bold mb-2 neon-cyan">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground">Continue your learning journey</p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="glass-card hover-lift fade-in-up revealed">
              <CardHeader>
                <CardTitle className="neon-purple">Your Active Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <img 
                      src={packages[0].image} 
                      alt="Alpha Course" 
                      className="w-16 h-16 rounded-xl object-cover floating"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">Alpha - E-commerce Fundamentals</h3>
                      <div className="flex items-center space-x-2 mt-2">
                        <Progress value={65} className="flex-1" />
                        <span className="text-sm">65%</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">Module 3 of 5 • 16 lessons completed</p>
                    </div>
                    <Button className="btn-animated magnetic" onClick={() => setCurrentView('course-player')}>
                      <Play className="h-4 w-4 mr-2" />
                      Continue
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover-lift fade-in-up revealed" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle>Recent Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 hover-lift">
                    <Trophy className="h-8 w-8 text-yellow-500 floating" />
                    <div>
                      <p className="font-semibold">First Sale Milestone</p>
                      <p className="text-sm text-muted-foreground">Completed your first product listing</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 hover-lift">
                    <CheckCircle className="h-8 w-8 text-green-500 floating-delayed" />
                    <div>
                      <p className="font-semibold">Module 2 Complete</p>
                      <p className="text-sm text-muted-foreground">Store setup and optimization mastered</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-8">
            <Card className="glass-card hover-lift fade-in-up revealed" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle>Learning Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold">16</div>
                  <p className="text-sm text-muted-foreground">Lessons Completed</p>
                </div>
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold">5.2h</div>
                  <p className="text-sm text-muted-foreground">Watch Time</p>
                </div>
                <div className="text-center hover-lift">
                  <div className="text-3xl font-bold text-yellow-500">7</div>
                  <p className="text-sm text-muted-foreground">Days Streak</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass-card hover-lift pulse-glow fade-in-up revealed" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle>Upgrade Available</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">Ready for AI coding? Upgrade to Beta package and save ₹1000!</p>
                <Button className="w-full btn-animated magnetic rounded-3xl">
                  Upgrade to Beta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  // Course Player View
  const CoursePlayerView = () => (
    <div className="min-h-screen pt-20 py-8">
      <div className="container mx-auto">
        <Button 
          variant="ghost" 
          onClick={() => setCurrentView('dashboard')}
          className="mb-6 btn-animated hover-lift"
        >
          ← Back to Dashboard
        </Button>
        
        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 fade-in-up revealed">
            <Card className="glass-card hover-lift">
              <CardContent className="p-0">
                <div className="aspect-video bg-black rounded-t-3xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <Play className="h-16 w-16 mx-auto mb-4 opacity-60 floating" />
                    <p className="text-lg">Mock Video Player</p>
                    <p className="text-sm opacity-60">Would integrate Bunny.net CDN here</p>
                  </div>
                </div>
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">Product Research Fundamentals</h2>
                  <p className="text-muted-foreground mb-4">Learn how to find winning products using advanced research techniques and AI tools.</p>
                  <div className="flex items-center space-x-4">
                    <Progress value={35} className="flex-1" />
                    <span className="text-sm">12:35 / 18:42</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="fade-in-up revealed" style={{animationDelay: '0.2s'}}>
            <Card className="glass-card hover-lift">
              <CardHeader>
                <CardTitle>Course Modules</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {[
                  { title: 'Introduction to E-commerce', lessons: 5, completed: true },
                  { title: 'Product Research', lessons: 6, completed: false, current: true },
                  { title: 'Store Setup', lessons: 5, completed: false },
                  { title: 'Marketing Basics', lessons: 4, completed: false },
                  { title: 'Scaling & Growth', lessons: 5, completed: false }
                ].map((module, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg cursor-pointer transition-all hover-lift ${
                      module.current ? 'bg-cyan-500/20 border-cyan-500/50 border pulse-glow' : 
                      module.completed ? 'bg-green-500/20' : 'bg-muted/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{module.title}</span>
                      {module.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                      {module.current && <Play className="h-4 w-4 text-cyan-500 floating" />}
                    </div>
                    <p className="text-sm text-muted-foreground">{module.lessons} lessons</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )

  // Packages View
  const PackagesView = () => (
    <div className="min-h-screen pt-20 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-in-up revealed">
          <h1 className="text-5xl font-bold mb-4">Choose Your Package</h1>
          <p className="text-xl text-muted-foreground">Progressive learning paths designed for maximum earning potential</p>
        </div>
        
        <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
          {packages.map((pkg, index) => (
            <div key={pkg.id} className="fade-in-up revealed" style={{animationDelay: `${index * 0.15}s`}}>
              <PackageCard pkg={pkg} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // Reviews View
  const ReviewsView = () => (
    <div className="min-h-screen pt-20 py-8">
      <div className="container mx-auto">
        <div className="text-center mb-12 fade-in-up revealed">
          <h1 className="text-5xl font-bold mb-4">Success Stories</h1>
          <p className="text-xl text-muted-foreground">Real results from real students</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="fade-in-up revealed" style={{animationDelay: `${index * 0.1}s`}}>
              <Card className="glass-card hover-lift tilt-card">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="floating">
                      <AvatarImage src={testimonial.avatar} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400 floating" style={{animationDelay: `${i * 0.1}s`}} />
                    ))}
                  </div>
                  <p className="mb-4">{testimonial.content}</p>
                  <Badge className="pulse-glow">{testimonial.earnings}</Badge>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  // About View
  const AboutView = () => (
    <div className="min-h-screen pt-20 py-8">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12 fade-in-up revealed">
          <h1 className="text-5xl font-bold mb-4">About Zaddrix</h1>
          <p className="text-xl text-muted-foreground">Empowering the next generation of digital entrepreneurs</p>
        </div>
        
        <Card className="glass-card mb-8 hover-lift fade-in-up revealed">
          <CardContent className="p-8">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg leading-relaxed mb-6">
              At Zaddrix, we believe everyone deserves the opportunity to build a profitable online business from home. 
              Our mission is to democratize access to cutting-edge AI tools and proven business strategies, 
              enabling anyone to achieve financial freedom through digital entrepreneurship.
            </p>
            <p className="text-lg leading-relaxed">
              We've helped over 10,000+ students generate millions in combined revenue through our progressive 
              learning system that takes you from complete beginner to advanced AI-powered entrepreneur.
            </p>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="glass-card text-center hover-lift tilt-card fade-in-up revealed" style={{animationDelay: '0.1s'}}>
            <CardContent className="p-6">
              <Users className="h-12 w-12 mx-auto mb-4 floating" />
              <h3 className="text-2xl font-bold mb-2">10,000+</h3>
              <p className="text-muted-foreground">Students Trained</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center hover-lift tilt-card fade-in-up revealed" style={{animationDelay: '0.2s'}}>
            <CardContent className="p-6">
              <Trophy className="h-12 w-12 mx-auto mb-4 floating-delayed" />
              <h3 className="text-2xl font-bold mb-2">₹50CR+</h3>
              <p className="text-muted-foreground">Student Revenue Generated</p>
            </CardContent>
          </Card>
          
          <Card className="glass-card text-center hover-lift tilt-card fade-in-up revealed" style={{animationDelay: '0.3s'}}>
            <CardContent className="p-6">
              <Star className="h-12 w-12 mx-auto mb-4 text-yellow-500 floating" />
              <h3 className="text-2xl font-bold mb-2">4.9/5</h3>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )

  // Only render the views, Navigation/Footer will be in layout.js
  return (
    <div className="min-h-screen">
      <Navigation setCurrentView={setCurrentView} onLogin={mockLogin} user={user} />
      
      {currentView === 'home' && <HomeView />}
      {currentView === 'packages' && <PackagesView />}
      {currentView === 'package-detail' && <PackageDetailView />}
      {currentView === 'reviews' && <ReviewsView />}
      {currentView === 'about' && <AboutView />}
      {currentView === 'dashboard' && user && <DashboardView />}
      {currentView === 'course-player' && user && <CoursePlayerView />}
    </div>
  )
}
