import React from 'react'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap'
import {Link}from 'react-router'
import BasicInfo from '../routes/BasicInfo/component/BasicInfo'
import CredentialsManagement from '../routes/CredentialsManagement/component/CredentialsManagement'
import WizardTabs from "./Wizardtabs"

export const LocationWizard =(props)=> {
return (
    <div className="row" style={{paddingTop:'50px'}}>
                        <div className="col-md-2">
                            LeftMenu Space.
                            {props.data}
                        </div>
                        <div className="col-md-10">
                         <div className="board">
                        <WizardTabs/>
                         <div className="tab-content">
                            
                                {props.children}                          
                            </div>                        
                        </div>
                        </div>
                    </div>

            
        )
    
}


export default LocationWizard
