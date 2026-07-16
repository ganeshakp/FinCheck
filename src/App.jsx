import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { SignedOut, SignedIn, SignIn, UserButton } from '@clerk/clerk-react';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        <SignedOut>
        <SignIn></SignIn>
      </SignedOut>
      <SignedIn>
        <UserButton></UserButton>
      </SignedIn>
      </header>
      
    </>
  )
}

export default App
