import { NextResponse } from 'next/server'
import { MongoClient } from 'mongodb'

// MongoDB connection
let client
let db

async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URL)
    await client.connect()
    db = client.db(process.env.DB_NAME || 'zaddy_platform')
  }
  return db
}

// Mock data for demonstration
const mockPackages = [
  {
    id: 'alpha',
    name: 'Alpha',
    title: 'E-commerce Fundamentals',
    price: 2999,
    originalPrice: 4999,
    status: 'active',
    features: [
      'Product research & selection',
      'Store setup & optimization',
      'Marketing strategies',
      'Order fulfillment basics',
      'Customer service mastery'
    ],
    modules: [
      {
        id: 'module1',
        title: 'E-commerce Introduction',
        lessons: [
          { id: 'lesson1', title: 'What is E-commerce?', duration: 1200, videoUrl: '/mock-video-1' },
          { id: 'lesson2', title: 'Market Research Basics', duration: 1800, videoUrl: '/mock-video-2' }
        ]
      }
    ]
  },
  {
    id: 'beta',
    name: 'Beta',
    title: 'Alpha + AI Vibe Coding',
    price: 4999,
    originalPrice: 7999,
    status: 'active',
    features: [
      'Everything in Alpha',
      'AI-powered development',
      'No-code/Low-code solutions',
      'Automation workflows',
      'Custom app building'
    ]
  },
  {
    id: 'gamma',
    name: 'Gamma',
    title: 'Complete Package + UGC',
    price: 7999,
    originalPrice: 12999,
    status: 'active',
    features: [
      'Everything in Alpha + Beta',
      'Instagram influencing',
      'Video content creation',
      'Personal brand building'
    ]
  }
]

const mockUsers = [
  {
    id: 'user1',
    email: 'test@example.com',
    name: 'John Doe',
    activePackages: ['alpha'],
    progress: {
      alpha: {
        completedLessons: ['lesson1'],
        currentLesson: 'lesson2',
        progressPercentage: 65
      }
    }
  }
]

// API Routes Handler
export async function GET(request) {
  const url = new URL(request.url)
  const pathname = url.pathname.replace('/api', '')
  
  try {
    // Root API endpoint
    if (pathname === '/' || pathname === '') {
      return NextResponse.json({ 
        message: 'Zaddy Platform API is running!',
        status: 'success',
        timestamp: new Date().toISOString()
      })
    }

    // Get all packages
    if (pathname === '/packages') {
      return NextResponse.json({
        success: true,
        packages: mockPackages
      })
    }

    // Get specific package
    if (pathname.startsWith('/packages/')) {
      const packageId = pathname.split('/')[2]
      const packageData = mockPackages.find(p => p.id === packageId)
      
      if (!packageData) {
        return NextResponse.json({ error: 'Package not found' }, { status: 404 })
      }
      
      return NextResponse.json({
        success: true,
        package: packageData
      })
    }

    // Get user profile
    if (pathname === '/profile') {
      const authHeader = request.headers.get('authorization')
      // Mock authentication check
      if (!authHeader) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      }
      
      return NextResponse.json({
        success: true,
        user: mockUsers[0]
      })
    }

    // Get user progress
    if (pathname === '/progress') {
      return NextResponse.json({
        success: true,
        progress: mockUsers[0].progress
      })
    }

    // Default 404 for unmatched routes
    return NextResponse.json({ error: 'Route not found' }, { status: 404 })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message 
    }, { status: 500 })
  }
}

export async function POST(request) {
  const url = new URL(request.url)
  const pathname = url.pathname.replace('/api', '')
  
  try {
    const body = await request.json()

    // Mock login endpoint
    if (pathname === '/auth/login') {
      const { email, password } = body
      
      // Mock authentication
      if (email && password) {
        const user = mockUsers.find(u => u.email === email)
        if (user) {
          return NextResponse.json({
            success: true,
            user,
            token: 'mock-jwt-token-' + Date.now()
          })
        }
      }
      
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Mock registration endpoint
    if (pathname === '/auth/register') {
      const { email, name, phone, password } = body
      
      // Mock user creation
      const newUser = {
        id: 'user' + Date.now(),
        email,
        name,
        phone,
        activePackages: [],
        progress: {}
      }
      
      return NextResponse.json({
        success: true,
        user: newUser,
        message: 'Registration successful'
      })
    }

    // Mock purchase endpoint
    if (pathname === '/purchase') {
      const { packageId, paymentMethod } = body
      
      // Mock payment processing
      const package = mockPackages.find(p => p.id === packageId)
      if (!package) {
        return NextResponse.json({ error: 'Package not found' }, { status: 404 })
      }
      
      return NextResponse.json({
        success: true,
        orderId: 'order_' + Date.now(),
        message: 'Purchase successful',
        package
      })
    }

    // Mock progress update
    if (pathname === '/progress/update') {
      const { lessonId, watchedDuration, completed } = body
      
      return NextResponse.json({
        success: true,
        message: 'Progress updated successfully'
      })
    }

    return NextResponse.json({ error: 'Route not found' }, { status: 404 })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message 
    }, { status: 500 })
  }
}

export async function PUT(request) {
  const url = new URL(request.url)
  const pathname = url.pathname.replace('/api', '')
  
  try {
    const body = await request.json()

    // Mock profile update
    if (pathname === '/profile') {
      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully'
      })
    }

    return NextResponse.json({ error: 'Route not found' }, { status: 404 })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message 
    }, { status: 500 })
  }
}

export async function DELETE(request) {
  const url = new URL(request.url)
  const pathname = url.pathname.replace('/api', '')
  
  try {
    // Mock delete operations can be added here
    return NextResponse.json({ error: 'Route not found' }, { status: 404 })
    
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      message: error.message 
    }, { status: 500 })
  }
}