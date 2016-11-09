import React from 'react'
import { Field, reduxForm, FieldArray } from 'redux-form'
import {Panel, Table, Popover, Button, Modal, OverlayTrigger, Tooltip} from 'react-bootstrap/lib'
import 'styles/unitCharacteristicsStyles.scss'
import 'styles/widgetStyle.scss'
import DatePickerField from 'components/DatePicker/DatePickerField'
import InputField from 'components/InputField/InputField'
import TextAreaField from 'components/TextAreaField/TextAreaField'

const EffectiveDateValues = (props) => (
    <div>

        <Table>
            <thead>
                <tr>
                    <th>Value</th>
                    <th>Effective Start Date</th>
                    <th>Effective End Date</th>
                    <th>Actions <i onClick={() => props.fields.push({}) } className="fa fa-plus-circle fa-2x"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><Field
                        name="ucvalue"
                        component={InputField}
                        className="form-control"
                        defaultvalue={props.defaultUCvalue}/></td>
                    <td> <Field
                        name="effectiveStartDate"
                        component={DatePickerField}
                        defaultValue={props.defaultStartDate}/>
                    </td>
                    <td><Field
                        name="effectiveEndDate"
                        component={DatePickerField}
                        defaultValue={props.defaultEndDate}/></td>

                </tr>
                {props.fields.map((editableData, index) =>

                    <tr key={index}>
                        <td><Field
                            name={`${editableData}.ucvalue`}
                            component={InputField}
                            className="form-control"/></td>
                        <td> <Field
                            name={`${editableData}.effectiveStartDate`}
                            component={DatePickerField}/>
                        </td>
                        <td><Field
                            name={`${editableData}.effectiveEndDate`}
                            component={DatePickerField}/></td>

                        <td><i type="button"
                            title="Remove"
                            className="fa fa-trash-o fa-2x"
                            onClick={() => props.fields.remove(index) }></i>
                        </td>
                    </tr>
                ) }
            </tbody>
        </Table>
    </div>
)
export const UnitCharacteristics = (props) => {
    const unitCharacteristicsData = props.unitCharacteristics;
    return (
        <div className="row tab-pane fade in active" id="unitcharacteristics">
            <div className="col-xs-12">
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">Unit Characteristics</h3>
                        <div className="box-tools pull-right">
                            <OverlayTrigger placement="top" overlay={
                                <Tooltip id="tooltip">
                                    <strong>Add Unit Charateristic</strong>
                                </Tooltip>}>
                                <span className="fa fa-plus-circle fa-2x" onClick={props.togglingAddModal}>
                                </span>
                            </OverlayTrigger>
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="margin-bottom-sm padding-top">
                            {unitCharacteristicsData.selectedunitCharacteristics && unitCharacteristicsData.selectedunitCharacteristics.length >
                                0 ?
                                <Table striped bordered condensed hover responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Display name</th>
                                            <th>Description</th>
                                            <th>Value</th>
                                            <th>UOM</th>
                                            <th>Effective Start Date</th>
                                            <th>Effective End Date</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            unitCharacteristicsData.selectedunitCharacteristics.map((uc, index) =>
                                                (
                                                    <tr key={uc.id}>
                                                        <td className="text-align-col">{uc.name}</td>
                                                        <td className="text-align-col">{uc.display}</td>
                                                        <td>{uc.description}</td>
                                                        <td>{uc.Value}</td>
                                                        <td className="text-align-col">{uc.UOM}</td>
                                                        <td>{uc.EffectiveStartDate}</td>
                                                        <td>{uc.EffectiveEndDate}</td>
                                                        <td className="text-align-col">
                                                            <OverlayTrigger placement="left" overlay={
                                                                <Tooltip id="tooltip">
                                                                    <strong>Edit {uc.Name}</strong>
                                                                </Tooltip>}>
                                                                <i className="fa fa-edit fa-2x" onClick={() => { props.makeEditable(index) } }>|</i>
                                                            </OverlayTrigger>
                                                            <OverlayTrigger placement="top" overlay={
                                                                <Tooltip id="tooltip">
                                                                    <strong>Delete {uc.Name}</strong>
                                                                </Tooltip>}>
                                                                <i className="fa fa-trash-o fa-2x" onClick={() => { props.deleteConfirmation(index) } }></i>
                                                            </OverlayTrigger>
                                                        </td>
                                                    </tr>))
                                        }
                                    </tbody>
                                </Table>
                                : null}
                        </div>
                    </div>
                </div>

            </div>
            <Modal show={props.unitCharacteristics.showEditModal}>
                <form>
                    <Modal.Header>
                        <Modal.Title>Edit </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div className="row">
                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Unit Characteristic Name</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="charateristicName"
                                        defaultvalue={props.unitCharacteristics.editableUnitCharacter.name}>
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
                                        defaultvalue={props.unitCharacteristics.editableUnitCharacter.display}>
                                    </Field>
                                </div>
                            </div>

                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>Description</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={TextAreaField} readOnly={true}
                                        className="form-control" name="descriptionLabel" readOnly={true}
                                        defaultValue={props.unitCharacteristics.editableUnitCharacter.description} rows="4">
                                    </Field>
                                </div>
                            </div>



                            <div className="col-xs-12 form-group">
                                <div className="col-xs-6">
                                    <label>UOM</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="UOMLabel"
                                        defaultvalue={props.unitCharacteristics.editableUnitCharacter.UOM}>
                                    </Field>
                                </div>
                            </div>
                            <FieldArray name="editableData"
                                component={EffectiveDateValues}
                                defaultUCvalue={props.unitCharacteristics.editableUnitCharacter.Value}
                                defaultStartDate={props.unitCharacteristics.editableUnitCharacter.EffectiveStartDate}
                                defaultEndDate={props.unitCharacteristics.editableUnitCharacter.EffectiveEndDate}
                                />

                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <div class="pull-right">
                            <button className="btn btn-success" type="button" onClick={props.updateRow}>Update</button>
                            <button className="btn btn-warning" type="button" onClick={props.makeEditable}>Close</button>
                        </div>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={props.unitCharacteristics.showModal}>
                <form onChange={(event) => { props.characteristicNameSelected(event) } }>
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
                                            unitCharacteristicsData.unSelectedUnitCharacteristics.map((uc, index) =>
                                                (<option value={uc.id} key={uc.id}>{uc.display}</option>))
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
                                        defaultvalue={props.unitCharacteristics.displayNameLabel}>

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
                                        defaultValue={props.unitCharacteristics.descriptionLabel} rows="4">
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
                                    <label>UOM</label>
                                </div>
                                <div className="col-xs-6">
                                    <Field component={InputField} type="text" readOnly={true}
                                        className="form-control" name="UOMLabel"
                                        defaultvalue={props.unitCharacteristics.UOMLabel}>
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
            <Modal show={props.unitCharacteristics.showDeleteModal}>
                <Modal.Header>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure, want to delete this unit charateristic?
                </Modal.Body>
                <Modal.Footer>
                    <div class="pull-right">
                        <button className="btn btn-warning" type="button" onClick={props.deleteConfirmation}>Close</button>
                        <button className="btn btn-danger" type="button" onClick={props.DeleteUnitCharateristic}>Delete</button>
                    </div>
                </Modal.Footer>
            </Modal>

        </div>

    )
}
export default UnitCharacteristics