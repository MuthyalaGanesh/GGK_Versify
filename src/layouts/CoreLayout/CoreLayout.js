import React from 'react'
import Header from '../../components/Header'

export const CoreLayout = ({ children }) => (
  <div>
    <Header />
    <div className='content-wrapper'>
		<div id="content_frame" className="content-frame" style={{width:"100%",position:'relative',display:"block"}}>
			{children}
    </div>
    </div>
  </div>
)


export default CoreLayout
