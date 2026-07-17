import { useState } from 'react'
import './App.css'
import { SignedOut, SignedIn, SignIn, UserButton } from '@clerk/clerk-react';
import { getDailyStockData } from './services/alphaVantageService';

function App() {
  //const resp = getDailyStockData('AAPL');
  //console.log(resp);//for testing

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
