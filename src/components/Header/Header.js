import React from 'react'
import { IndexLink, Link } from 'react-router'
import LogoImg from 'public/images/logo-new.png'

export const Header = () => (
     
	<header className="main-header">
		<nav id="headerbar_top" className="navbar navbar-static-top" role="navigation" style={{zIndex:9}}>
			<div style={{float:'left', position:'relative', zIndex:999}}>
      <img src={LogoImg} alt="Versify"/> 
      
			</div>
		</nav>
    <nav role="navigation" className="navbar main_navbar">
      <Link to="/location"><i className="fa fa-home"></i> 
          <span className="hidden-xs hidden-sm">
              Location Wizard 
           </span>
      </Link>
  	</nav>	
	</header>   
  
)

export default Header
