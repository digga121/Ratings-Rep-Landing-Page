"use client";

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { CheckIcon } from '@radix-ui/react-icons'
import { contentVersions, getVersionFromParams } from '../utils/contentVersions'

export function BetaSignupLandingPage() {
  const searchParams = useSearchParams()
  const version = getVersionFromParams(searchParams)
  const content = contentVersions[version]

  const [email, setEmail] = useState('')
  const [companyCategory, setCompanyCategory] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [step, setStep] = useState(1)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submitted:', { email, companyCategory, businessName })
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`fixed top-0 left-0 right-0 z-50 bg-black px-4 lg:px-6 flex items-center transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
        <Link className="flex items-center justify-center" href="#">
          <img 
            src="https://ratingsrep.com/includes/assets/logo-web.svg" 
            alt="Ratings Rep Logo" 
            className={`transition-all duration-300 ${isScrolled ? 'h-10 w-auto' : 'h-[60px] w-[254px]'}`}
          />
        </Link>
      </header>
      <main className={`flex-1 ${isScrolled ? 'pt-16' : 'pt-24'}`}>
        <section 
          className="w-full py-6 md:py-8 lg:py-12 bg-black text-white bg-cover bg-center"
          style={{
            backgroundImage: `url('${content.heroBackgroundImage}')`,
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.6)"
          }}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-3 text-center">
              <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl/none">
                {content.heroTitle}
              </h1>
              <p className="mx-auto max-w-[600px] text-gray-300 text-sm md:text-base">
                {content.heroSubtitle}
              </p>
            </div>
            <div className="mx-auto max-w-sm space-y-4 mt-6">
              <form onSubmit={handleSubmit} className="space-y-3">
                {step === 1 && (
                  <div className="space-y-1">
                    <Label htmlFor="email" className="text-white text-sm">Email</Label>
                    <div className="flex space-x-2">
                      <Input
                        id="email"
                        placeholder="you@example.com"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white text-black flex-grow"
                      />
                      <Button type="button" onClick={nextStep} className="bg-white text-black hover:bg-gray-200">
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                {step === 2 && (
                  <div className="space-y-1">
                    <Label htmlFor="companyCategory" className="text-white text-sm">Company Category</Label>
                    <div className="flex space-x-2">
                      <Button type="button" onClick={prevStep} className="bg-gray-600 text-white hover:bg-gray-700">
                        Back
                      </Button>
                      <Select onValueChange={setCompanyCategory} value={companyCategory} className="flex-grow">
                        <SelectTrigger className="bg-white text-black">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="technology">Technology</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button type="button" onClick={nextStep} className="bg-white text-black hover:bg-gray-200">
                        Next
                      </Button>
                    </div>
                  </div>
                )}
                {step === 3 && (
                  <div className="space-y-1">
                    <Label htmlFor="businessName" className="text-white text-sm">Business Name</Label>
                    <div className="flex space-x-2">
                      <Button type="button" onClick={prevStep} className="bg-gray-600 text-white hover:bg-gray-700">
                        Back
                      </Button>
                      <Input
                        id="businessName"
                        placeholder="Your Business Name"
                        required
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="bg-white text-black flex-grow"
                      />
                      <Button type="submit" className="bg-white text-black hover:bg-gray-200">
                        Join
                      </Button>
                    </div>
                  </div>
                )}
              </form>
              <p className="text-xs text-gray-400 text-center">
                By joining, you agree to our{" "}
                <Link href="#" className="underline underline-offset-2">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="#" className="underline underline-offset-2">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
        
        <section className="w-full py-6 md:py-10 lg:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-4">
              {content.whyJoinTitle}
            </h2>
            <div className="grid gap-6 mt-6 md:grid-cols-3">
              {content.whyJoinReasons.map((reason, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 border p-4 rounded-lg">
                  <CheckIcon className="h-8 w-8 text-green-500" />
                  <h3 className="text-xl font-bold text-center">{reason.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-16 lg:py-6">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              {content.featuresTitle}
            </h2>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
              {content.features.map((feature, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-4 border rounded-lg">
                  <h3 className="text-xl font-bold text-center">{feature.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-6">
              {content.getStartedTitle}
            </h2>
            <div className="grid gap-6 mt-8 md:grid-cols-3">
              {content.getStartedSteps.map((step, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 p-4">
                  <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-xl font-bold">{index + 1}</div>
                  <h3 className="text-xl font-bold text-center">{step.title}</h3>
                  <p className="text-sm text-gray-600 text-center">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-8 md:py-16 lg:py-24">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              {content.seeInActionTitle}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mb-8">
              {content.seeInActionDescription}
            </p>
            <Button className="bg-black text-white hover:bg-gray-800">
              {content.downloadSampleReportButtonText}
            </Button>
            <p className="mt-4 text-sm text-gray-500">
              {content.downloadSampleReportNote}
            </p>
          </div>
        </section>

        <section className="w-full py-8 md:py-16 lg:py-24 bg-gray-100">
          <div className="container px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              {content.unlockAITitle}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl mb-8">
              {content.unlockAIDescription}
            </p>
            <Button className="bg-black text-white hover:bg-gray-800">
              {content.referFriendButtonText}
            </Button>
          </div>
        </section>

        {/* You can add more sections here for testimonials if needed */}

      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-600">
          © 2023 Ratings Rep. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
        </nav>
      </footer>
    </div>
  )
}