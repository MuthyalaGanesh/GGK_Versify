import React from 'react'
import { IndexLink, Link } from 'react-router'
import LogoImg from 'public/images/logo-new.png'
import 'styles/headerStyles.scss'

export const Header = () => (
     
  <header className="main-header">
    <nav id="headerbar_top" className="navbar navbar-static-top" role="navigation" style={{zIndex:"9"}}>
      <div style={{float:'left',position:'relative',zIndex:'999',marginLeft:'5px'}}>
        
        <a href="index.html" className="logo" style={{background:"transparent"}}>
          <span className="logo-mini hidden-md hidden-lg visible-xs visible-sm">
            <img src={LogoImg}  alt="Versify" title="Versify" />
          </span>
          <span className="logo-lg hidden-xs hidden-sm visible-md visible-lg">
            <img src={LogoImg}  alt="Versify" title="Versify" />
          </span>
        </a>
      </div>
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
        
          <li className="dropdown messages-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-envelope-o"></i>
              <span className="label label-success">4</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">
                You have 4 messages
              </li>
              <li>
                <ul className="menu">
                  <li>
                    <a href="#">
                      <div className="pull-left">
                        <img src="/assets/images/user2-160x160.jpg" className="img-circle" alt="User Image" />
                      </div>
                      <h4> Support Team <small><i className="fa fa-clock-o"></i> 5 mins</small></h4>
                      <p>
                        Why not buy a new awesome theme?
                      </p>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer">
                <a href="#"> See All Messages </a>
              </li>
            </ul>
          </li>
          
          <li className="dropdown notifications-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-bell-o"></i>
              <span className="label label-warning">10</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">
                You have 10 notifications
              </li>
              <li>
                <ul className="menu">
                  <li>
                    <a href="#"><i className="fa fa-users text-aqua"></i> 5 new members joined today </a>
                  </li>
                </ul>
              </li>
              <li className="footer">
                <a href="#"> View all </a>
              </li>
            </ul>
          </li>
          
          <li className="dropdown tasks-menu">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <i className="fa fa-flag-o"></i>
              <span className="label label-danger">9</span>
            </a>
            <ul className="dropdown-menu">
              <li className="header">
                You have 9 tasks
              </li>
              <li>
                <ul className="menu">
                  <li>
                    <a href="#">
                      <h3>Design some buttons<small className="pull-right">20%</small></h3>
                      <div className="progress xs">
                        <div className="progress-bar progress-bar-aqua" style={{width:"20%"}} role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
                          <span className="sr-only">20% Complete</span>
                        </div>
                      </div>
                    </a>
                  </li>
                </ul>
              </li>
              <li className="footer">
                <a href="#"> View all tasks </a>
              </li>
            </ul>
          </li>
          
          <li className="dropdown user user-menu" style={{position:"relative",marginBottom:"-5px"}}>
            <a href="#" className="dropdown-toggle" data-toggle="dropdown">
              <img src="/assets/images/user2-160x160.jpg" className="user-image" alt="User Image" />
              <span className="hidden-xs hidden-sm">Koteswara Rao K</span>
            </a>
            <ul className="dropdown-menu">
              <li className="user-header">
                <img src="/assets/images/user2-160x160.jpg" className="img-circle" alt="User Image" />
                <p>
                  Koteswara Rao K <br />
                  Sr. UI Architect<small>Joined on : 12/02/2015</small>
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
    
    
    <nav className="navbar main_navbar" role="navigation">
      <div style={{float:'left',position:'relative',zIndex:'999',marginLeft:'-10px'}}>
        <a href="#" id="sidebar_toggle" className="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span className="sr-only">Toggle navigation</span>
        </a>        
        <a href="index.html" id="headerbar_botlogo" className="logo" style={{width:'0px',background:'transparent'}}>
          <span className="logo-mini visible-md visible-lg visible-xs visible-sm">
            <img src="/assets/images/logo-new_symbol.png"  alt="Versify" title="Versify" />
          </span>
        </a>
      </div>
      <div className="pull-left">
      
      
        <ul className="nav navbar-nav">
        
        <li className="">
          <a href="#"><i className="fa fa-home"></i> <span className="hidden-xs hidden-sm"> Home </span></a>
        </li>
        <li className="dropdown">
          <a href="/location" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-group"></i> <span className="hidden-xs hidden-sm"> Location </span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="">Menu Level - 02</a>
            </li>
            <li>
              <a href="">Menu Level - 02</a>
            </li>
            <li>
              <a href="">Menu Level - 02</a>
            </li>
          </ul>
        </li>
        
        <li className="dropdown active">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-transgender-alt"></i> <span className="hidden-xs hidden-sm"> Transaction </span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="">Menu Level - 02</a>
            </li>
            <li>
              <a href="">Menu Level - 02</a>
            </li>
            <li>
              <a href="">Menu Level - 02</a>
            </li>
          </ul>
        </li>

        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-book"></i> <span className="hidden-xs hidden-sm"> Reports </span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="">Menu Level - 02</a>
            </li>
            <li>
              <a href="">Menu Level - 02</a>
            </li>
            <li>
              <a href="">Menu Level - 02</a>
            </li>
          </ul>
        </li>
        
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown">
            <i className="fa fa-gears"></i> <span className="hidden-xs hidden-sm"> Admin Settings </span>
          </a>
          <ul className="dropdown-menu">
            <li>
              <a href="">Menu Level - 02</a>
            </li>
            <li>
              <a href="">Menu Level - 02</a>
            </li>
            <li>
              <a href="">Menu Level - 02</a>
            </li>
          </ul>
        </li>
        
        </ul>
      </div>
      
      <div className="navbar-custom-menu">
        <ul className="nav navbar-nav">
          <li>
            <a href="#" data-toggle="control-sidebar"><i className="fa fa-sliders"></i></a>
          </li>
          
        </ul>
      </div>
    </nav>
    
    
    
  </header>
)

export default Header
