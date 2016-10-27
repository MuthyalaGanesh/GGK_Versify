                            <div className="row form-group" style={{marginBottom:'0px'}}>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="technologytype"
                                            component={TextField} value={this.props.technologytype}
                                            hintText="Technology type" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="primaryMarket"
                                            component={TextField} value={this.props.primarymarket}
                                            hintText="Primary market" />
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group" style={{marginBottom:'0px'}}>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="secondarytechnologytype"
                                            component={TextField} value={this.props.Sectechnologytype}
                                            hintText="Secondary technology type"/>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="owner"
                                            component={TextField} value={this.props.owner}
                                            hintText="Owner" />
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group" style={{marginBottom:'0px'}}>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="fuelclass"
                                            component={TextField} value={this.props.fuelclass}
                                            hintText="Fuel class" />
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="ownership"
                                            component={TextField} value={this.props.ownership}
                                            hintText="Ownership" />
                                    </div>
                                </div>
                            </div>
                            <div className="row form-group" style={{marginBottom:'0px'}}>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="timezone" component={SelectField} hintText="Select Timezone" >
                                            {timezoneOptions}
                                        </Field>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <div className="col-sm-4 basic-form-input">
                                        <Field name="physicalTimezone" component={SelectField} hintText="Select Physical Timezone" >
                                            {timezoneOptions}
                                        </Field>
                                    </div>
                                </div>
                            </div>