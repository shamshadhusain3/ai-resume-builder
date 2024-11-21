import Header from '@/component/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import React from 'react'

function Home() {
  return (
    <div>
      <Header/>
       <UserButton/>
       Landing screen
       
    </div>
  )
}

export default Home