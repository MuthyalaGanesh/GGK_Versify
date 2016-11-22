import React from 'react'
import { IndexLink, Link } from 'react-router'
import LogoImg from 'public/images/logo-new.png'
import LogoImgsm from 'public/images/logo-new_symbol.png'
import 'styles/headerStyles.scss'

export const Header = () => (
     
  <header className="main-header">
    <nav id="headerbar_top" className="navbar navbar-static-top" role="navigation" style={{zIndex:"9"}}>
      <div style={{float:'left',position:'relative',zIndex:'999',marginLeft:'5px'}}>
        
        <a href="index.html" className="logo" style={{background:"transparent"}}>
          <span className="logo-mini hidden-md hidden-lg visible-xs visible-sm">
            <img src={LogoImgsm}  alt="Versify" title="Versify" />
          </span>
          <span className="logo-lg hidden-xs hidden-sm visible-md visible-lg">
            <img src={LogoImg}  alt="Versify" title="Versify" />
          </span>
        </a>
      </div>
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
        
          <li className="">
          <Link to="/home"><i className="fa fa-home"></i> <span className="hidden-xs hidden-sm"> Home </span></Link>
        </li>
        <li className="dropdown">
          <Link to="/" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-map-marker"></i> <span className="hidden-xs hidden-sm"> Location </span>
          </Link>
          
        </li>
        
        <li className="dropdown active">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-exchange"></i> <span className="hidden-xs hidden-sm"> Transaction </span>
          </a>
          
        </li>

        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-copy"></i> <span className="hidden-xs hidden-sm"> Reports </span>
          </a>          
        </li>
        
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-gear"></i> <span className="hidden-xs hidden-sm"> Admin Settings </span>
          </a>
          
        </li>
          
          <li className="dropdown user user-menu" style={{position:"relative",marginBottom:"-5px"}}>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src="/assets/images/user2-160x160.png" className="user-image" alt="User Image" />
              <span className="hidden-xs hidden-sm">Versify User</span>
            </a>
            <ul className="dropdown-menu">
              <li className="user-header">
                <img src="/assets/images/user2-160x160.png" className="img-circle" alt="User Image" />
                <p>
                  Versify User <br />
                  Sr. Developer<small>Joined on : 12/02/2015</small>
                </p>
              </li>
              <li className="user-body">
                <div className="col-xs-12 text-center">
                  GGK Technologies
                </div>
              </li>
              <li className="user-footer">
                <div className="pull-left">
                  <a href="#" className="btn btn-default btn-flat"> Profile </a>
                </div>
                <div className="pull-right">
                  <a href="#" className="btn btn-default btn-flat"> Logout </a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    
    
    
    
    
    
  </header>
)

export default Header
