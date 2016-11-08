import React from 'react'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
import {Link}from 'react-router'
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

export const LocationWizard =(props)=> {
return (
<div>
    <div className="row">
        <div className="col-md-2 col-xs-12">
            <LocationLeftMenu Locations={props.location.allLocations} leftMenuDropdownClickEvent={props.leftMenuDropdownClickEvent} />
        </div>
        <div className="col-md-10 col-xs-12">
            <section id="content_header" className="content-header">
                <h1>Location Wizard<small>OMS Location wizard</small></h1>

            </section>
            <section id='Location-wizard-tabs' className="content">
                <div className="board">
                    <WizardTabs />
                    <div className="tab-content">
                       <BasicInfoContainer />
                        <CredentialsManagementContainer />
                        <UnitCharacteristicsContainer />
                        <SystemIntegrationContainer />
                        <WorkFlowContainer />
                        <UsersContainer />
                        <EquipmentsContainer />
                        <GatewaysContainer />
                        <DataHistorianContainer />
                       
                    </div>
                </div>
            </section>
            <LocationWizardFooter saveCompleteLocationWizard={props.saveCompleteLocationWizard} />
        </div>
    </div>
</div>
               
        )
    
}

export default LocationWizard
