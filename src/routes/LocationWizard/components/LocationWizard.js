import React from 'react'
import BasicInfo from '../components/BasicInfo'
import CredentialsManagement from '../components/CredentialsManagement'
import 'styles/locationStyles.scss'
import {Panel, Nav, NavItem} from 'react-bootstrap/lib'

export class LocationWizard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            menuoneOpen: true,
            menuOneClass: "fa fa-chevron-down"
        }
    }
   
    render() {
        var timezones = [
            { code: "AST", value: "Atlantic Standard Time" },
            { code: "EST", value: "Eastern Standard Time" },
            { code: "CST", value: "Central Standard Time" },
            { code: "MST", value: "Mountain Standard Time" },
            { code: "PST", value: "Pacific Standard Time" },
            { code: "AKST", value: "Alaska Standard Time" },
            { code: "HAST", value: "Hawaii-Aleutian Standard Time" },
            { code: "ADT", value: "Atlantic Daylight Time" },
            { code: "EDT", value: "Eastern Daylight Time" },
            { code: "CDT", value: "Central Daylight Time" },
            { code: "MDT", value: "Mountain Daylight Time" },
            { code: "PDT", value: "Pacific Daylight Time" },
            { code: "AKDT", value: "Alaska Daylight Time" },
            { code: "HADT", value: "Hawaii-Aleutian Daylight Time" }
        ]

        var types = [
            { typeId: 1, type: "Aggregate" },
            { typeId: 2, type: "Control Area" },
            { typeId: 3, type: "Circuit breaker" },
            { typeId: 4, type: "Configuration" },
            { typeId: 5, type: "Fleet" },
            { typeId: 6, type: "Fossil Totals" },
            { typeId: 7, type: "Generator" },
            { typeId: 8, type: "Hydro" },
            { typeId: 9, type: "Multistage Generator" },
            { typeId: 10, type: "Power block" },
            { typeId: 11, type: "Powerhouse" },
            { typeId: 12, type: "Region" },
            { typeId: 13, type: "Switching Center" },
            { typeId: 14, type: "Solar Farm" },
            { typeId: 15, type: "Switching station" },
            { typeId: 16, type: "Station" },
            { typeId: 17, type: "Turbine" },
            { typeId: 18, type: "Transmission line" }
        ]
        var locations = [
            { code: "UPL", locationName: "Uppal" },
            { code: "WR", locationName: "Waverock" },
            { code: "JH", locationName: "Jubilee hills" },
            { code: "AUS", locationName: "Australia" },
            { code: "USA", locationName: "USA" }
        ]

        return (
            <div>
                <Nav bsStyle="tabs" activeKey={0} className="nav-locations">
                    <NavItem eventKey={0}>OMS</NavItem>
                    <NavItem eventKey={1} href="">ExecView</NavItem>
                    <NavItem eventKey={2} href="">Plant Ops</NavItem>
                </Nav>

                <Panel className="side-menu" header="Locations">

                    <Panel collapsible className="locations-list" expanded={this.state.menuoneOpen}
                        header={<div><span>Menu 1</span>
                            <span className={this.state.menuOneClass}
                                onClick={ () =>{ this.setState({ menuoneOpen: !this.state.menuoneOpen }),
                                this.state.menuOneClass=this.state.menuOneClass=="fa fa-chevron-down"?"fa fa-chevron-left":"fa fa-chevron-down"} }>
                            </span>
                        </div>}>
                        <li>Menu item1</li>
                        <li>Menu item2</li>
                    </Panel>
                </Panel>
                <div className="right_panel">
                    <div className="col-xs-12">
                        <div  className="col-xs-6">
                            <BasicInfo timezones={timezones} types={types} locations={locations}/>
                        </div>
                        <div  className="col-xs-6">
                            <CredentialsManagement />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default LocationWizard
