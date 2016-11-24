import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'


export const LocationLayout = ({ children }) => (
  <div>
    <Header />
   <div className="content-wrapper">
		  <div id="content_frame" className="content-frame" style={{width:"100%",position:'relative',display:"block"}}>
			  {children}
      </div>
    </div>
    <Footer />
  </div>
)


export default LocationLayout
