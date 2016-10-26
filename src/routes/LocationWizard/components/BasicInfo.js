import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from '../validations/basicInfoValidation'
import {Panel, ControlLabel} from 'react-bootstrap/lib'
import 'styles/basicInfoStyles.scss'
import { Checkbox, RadioButtonGroup, SelectField, TextField, Toggle } from 'redux-form-material-ui'
import MenuItem from 'material-ui/MenuItem'
import { RadioButton } from 'material-ui/RadioButton'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';



export class BasicInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            value: ""
        };
        injectTapEventPlugin();
    }
    handleChange(event, index, value) { this.setState({ value }) };
    getChildContext() {
        return { muiTheme: getMuiTheme(baseTheme) }
    }
    logresults(values) {
        console.log("Values :", values);
    }

    render() {
        const timezoneOptions = [];
        this.props.timezones.forEach(function (tz) {
            timezoneOptions.push(<MenuItem value={tz.code} key={tz.code} primaryText={tz.value}/>)
        }, this);

        const typeOptions = [];
        this.props.types.forEach(function (t) {
            typeOptions.push(<MenuItem value={t.typeId} key={t.typeId} primaryText={t.type}/>)
        }, this);

        const locationOptions = [];
        this.props.locations.forEach(function (location) {
            locationOptions.push(<MenuItem value={location.code} key={location.code} primaryText={location.locationName}/>)
        }, this);

        return (
            <div>
                <Panel header={<ControlLabel>Basic Information</ControlLabel>}>
                    <div className="row">
                        <form onSubmit={this.props.handleSubmit(this.logresults) }>
                            <div className="row form-group">
                                    <div className="col-sm-8">
                                        <Field name="locationName" component={SelectField} hintText="Select location" floatingLabelText="Select location">
                                            {locationOptions}
                                        </Field>
                                    </div>
                                    <div className="allow-outages-div">
                                        <Field name="allowOutages" id="allowOutages" value={this.props.allowOutages} component={Checkbox} label="AllowOutages"/>
                                    </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="parentLocation"
                                            component={TextField} value={this.props.parentLocation}
                                            hintText="Parent Location Name" floatingLabelText="Parent Location Name"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="type" component={SelectField} hintText="Select Type" floatingLabelText="Select Type">
                                            {typeOptions}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="technologytype"
                                            component={TextField} value={this.props.technologytype}
                                            hintText="Technology type" floatingLabelText="Technology type"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="primaryMarket"
                                            component={TextField} value={this.props.primarymarket}
                                            hintText="Primary market" floatingLabelText="Primary market"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="secondarytechnologytype"
                                            component={TextField} value={this.props.Sectechnologytype}
                                            hintText="Secondary technology type" floatingLabelText="Secondary technology type"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="owner"
                                            component={TextField} value={this.props.owner}
                                            hintText="Owner" floatingLabelText="Owner"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="fuelclass"
                                            component={TextField} value={this.props.fuelclass}
                                            hintText="Fuel class" floatingLabelText="Fuel Class"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="ownership"
                                            component={TextField} value={this.props.ownership}
                                            hintText="Ownership" floatingLabelText="Ownership"/>
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group">
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="timezone" component={SelectField} hintText="Select Timezone" floatingLabelText="Select Timezone">
                                            {timezoneOptions}
                                        </Field>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="physicalTimezone" component={SelectField} hintText="Select Physical Timezone" floatingLabelText="Select Physical Timezone">
                                            {timezoneOptions}
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>
                </Panel>
            </div>

        )
    }
}

BasicInfo.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
}

export default reduxForm({
    form: 'LocationWizard',  //Form name is first form
    destroyOnUnmount: false,
    validate
})(BasicInfo)



