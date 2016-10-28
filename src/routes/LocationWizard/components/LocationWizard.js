import React from 'react'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
import {Link}from 'react-router'
import BasicInfo from '../routes/BasicInfo/component/BasicInfo'
import CredentialsManagement from '../routes/CredentialsManagement/component/CredentialsManagement'
import WizardTabs from "./Wizardtabs"

export const LocationWizard =(props)=> {
return (
<div>
    <div className="row">
        <div className="col-md-2 col-xs-12">
            LeftMenu Space.
            {props.data}
        </div>
        <div className="col-md-10 col-xs-12">
            <section id="content_header" className="content-header">
                <h1>Location Wizard<small>OMS Location wizard</small></h1>
                <ol className="breadcrumb">
                    <li>
                        <a href="#">
                            <i className="fa fa-home"></i> Dashboard (Home)
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            OMS
                        </a>
                    </li>

                    <li className="active"><strong>Location Wizard</strong></li>
                </ol>
            </section>
            <section className="content">
                <div className="board">
                    <WizardTabs />
                    <div className="tab-content">
                        {props.children}
                    </div>
                </div>
            </section>
        </div>
    </div>
</div>
  
        )
    
}


export default LocationWizard
