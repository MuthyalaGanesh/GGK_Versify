import React from 'react'
import Header from '../../components/Header'

export const CoreLayout = ({ children }) => (
  <div className='container text-center'>
    <Header />
    <div className='core-layout__viewport'>
      {children}
    </div>
  </div>
)


export default CoreLayout
