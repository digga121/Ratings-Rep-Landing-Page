import { Suspense } from 'react'
import { BetaSignupLandingPage } from '../components/BetaSignupLandingPage'

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BetaSignupLandingPage />
    </Suspense>
  )
}