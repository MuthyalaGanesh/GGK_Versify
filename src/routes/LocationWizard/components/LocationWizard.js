import React from 'react'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
import {Button} from 'react-bootstrap/lib'
//import {Link}from 'react-router'
import WizardTabs from "./WizardTabs"
import LocationLeftMenu from "./LocationLeftMenu"
import LocationWizardFooter from "./LocationWizardFooter"

import BasicInfoContainer from '../containers/BasicInfoContainer'
import CredentialsManagementContainer from '../containers/CredentialsManagementContainer'
import UnitCharacteristicsContainer from '../containers/UnitCharacteristicsContainer'
import SystemIntegrationContainer from '../containers/SystemIntegrationContainer'
import WorkFlowContainer from '../containers/WorkFlowContainer'
import UsersContainer from '../containers/UsersContainer'
import EquipmentsContainer from '../containers/EquipmentsContainer'
import GatewaysContainer from '../containers/GatewaysContainer'
import DataHistorianContainer from '../containers/DataHistorianContainer'

var Scroll    = require('react-scroll');

var Link       = Scroll.Link;
var DirectLink = Scroll.DirectLink;
var Element    = Scroll.Element;
var Events     = Scroll.Events;
var scroll     = Scroll.animateScroll;
var scrollSpy  = Scroll.scrollSpy;

export const LocationWizard =(props)=> {
return (
   <div>
    <LocationLeftMenu Locations={props.location.allLocations} leftMenuDropdownClickEvent={props.leftMenuDropdownClickEvent} />
    <section id="content_header" className="content-header col-xs-12 col-md-10">
         <Link to='#' onClick={props.toggleMenuClick} id="sidebar_toggle" className="sidebar-toggle" data-toggle="offcanvas" role="button">
          <span className="glyphicon glyphicon-align-justify">
          </span>
        </Link>
        <h1 style={{'marginLeft': '16px','marginTop':'-20px'}}>Location Wizard<small>OMS Location wizard</small></h1>
			<Button bsStyle="primary" style={{'float': 'right','marginTop':'-20px'}} onClick={props.saveCompleteLocationWizard}>Save</Button>
    </section>
    <section id='Location-wizard-tabs' className="content">
        <div className="row">
            <div className="col-xs-12">
                <div className="board">
                    <div className='row'>
                        <WizardTabs />
                    </div>
                    <div className='tab-content-menu'>                        
                        <div className='clear'></div>
                        <div className="tab-content element">
                            <Element name="basicInfo" className="element">
                                <BasicInfoContainer />
                            </Element>
                            <Element name="credential" className="element ">
                                <CredentialsManagementContainer />
                            </Element>

                            <Element name="unitcharacteristics" className="element ">
                                <UnitCharacteristicsContainer />
                            </Element>

                            <Element name="systemintegration" className="element ">
                                <SystemIntegrationContainer />
                            </Element>

                            <Element name="workflows" className="element ">
                                <WorkFlowContainer />
                            </Element>

                            <Element name="users" className="element ">
                                <UsersContainer />
                            </Element>

                            <Element name="equipment" className="element ">
                                <EquipmentsContainer />
                            </Element>

                            <Element name="gateways" className="element ">
                                <GatewaysContainer />
                            </Element>

                            <Element name="datahistorian" className="element ">
                                <DataHistorianContainer />
                            </Element>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
               
        )
    
}

export default LocationWizard
