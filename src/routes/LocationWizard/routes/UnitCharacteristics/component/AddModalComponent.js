import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Modal} from 'react-bootstrap/lib'
import 'styles/unitCharacteristicsStyles.scss'
import 'styles/widgetStyle.scss'
import DatePickerField from '../../../../../components/DatePicker/DatePickerField'
import InputField from '../../../../../components/InputField/InputField'
import TextAreaField from '../../../../../components/TextAreaField/TextAreaField'

export const AddModal = (props) => {
    return (
        <div>
            <Modal {...props.input} show={props.showModal}>
                   <form onChange={(event) => { props.onchange(event) } }>
                    <Modal.Header>
                        <Modal.Title>New Unit characteristic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Unit Characteristic Name</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component="select" name="charateristicName" className="form-control">
                                        <option value="">Select Unit Charateristic</option>

                                        {
                                            props.unitCharacteristicsData.unSelectedUnitCharacteristics.map((uc, index) =>
                                                (<option value={uc.Name} key={index}>{uc.Name}</option>))
                                        }
                                    </Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Display name</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="displayNameLabel"
                                        defaultvalue={props.unitCharacteristicsData.displayNameLabel}>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Description</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={TextAreaField} readOnly={true}
                                        className="form-control" name="descriptionLabel"
                                        defaultValue={props.unitCharacteristicsData.descriptionLabel} rows="4">
                                    </Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Value</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component="input" type="text" name="ucvalue" className="form-control"></Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>UCM</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="UCMLabel"
                                        defaultvalue={props.unitCharacteristicsData.UCMLabel}>
                                    </Field>
                                </div>
                            </div>
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Effective start date</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={DatePickerField} name="effectiveStartDate"></Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Effective end date</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={DatePickerField} name="effectiveEndDate"></Field>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-warning" type="button" onClick={props.togglingAddModal}>Cancel</button>
                        <button className="btn btn-success" type="button" onClick={props.AddUnitCharateristic}>Add</button>
                    </Modal.Footer>
                </form>

            </Modal>
        </div>
    )
}

export default AddModal