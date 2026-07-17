import { useState } from 'react'
import { SignedOut, SignedIn, SignIn, UserButton, useUser } from '@clerk/clerk-react';
import { getDailyStockData } from './services/alphaVantageService';
import StockList from './components/StockList';
import './App.css';


function App() {
  
  const {user} = useUser()

  return (
    <div className="app-container">
      <header>
        <h1>FinCheck.io</h1>
        <h3>Check your stock performance with ease</h3>
        </header>  
        <SignedOut>
          <p> Login to manage your stocks.</p>
        <SignIn></SignIn>
      </SignedOut>
      <SignedIn>
        {user ? (<>
                <div className="user-header">
                  <UserButton></UserButton>
                </div>
                <StockList userId={user.id} />
              </>) 
              : <p>Loading...</p>}
      </SignedIn>
          
    </div>
  )
}

export default App
