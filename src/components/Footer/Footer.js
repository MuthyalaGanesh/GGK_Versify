import React from 'react'
import { IndexLink, Link } from 'react-router'
import LogoImg from 'public/images/logo-new.png'
import 'styles/headerStyles.scss'

export const Footer = (props) => (
<footer className="main-footer">		
		<div className="pull-left">
			<em>Intelligence. Empowered.</em>
		</div>
		
		<div className="pull-right">
			© 2016 
			<strong>
			<a href="http://www.versify.com">Versify</a>
			</strong>. All rights reserved.
		</div>		
	</footer>
    
)
export default Footer
