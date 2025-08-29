import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function MainLayout({ children }) {
  return (
    <>
      <Navigation />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </>
  )
}