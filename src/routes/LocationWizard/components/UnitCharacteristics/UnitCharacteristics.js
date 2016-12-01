import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { Table, Modal, OverlayTrigger, Tooltip } from 'react-bootstrap/lib'
import 'styles/unitCharacteristicsStyles.scss'
import 'styles/widgetStyle.scss'
import DatePickerField from 'components/DatePicker/DatePickerField'
import InputField from 'components/InputField/InputField'
import DropdownListField from 'components/DropdownList/DropdownListField'
import TextAreaField from 'components/TextAreaField/TextAreaField'

const EffectiveDateValues = (props) => { 
    console.log(props.error)
    console.log(props.formdata)
   return (
  <div>
    <Table striped bordered condensed hover>
      <thead>
        <tr>
          <th>Value<sup>*</sup></th>
          <th>Effective Start Date<sup>*</sup></th>
          <th>Effective End Date<sup>*</sup></th>
          <th>
            <span>
                Actions
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        {props.editableAttributes.map((dv, i) =>
          <tr key={i}>
              <td><Field
                  name={`ucvalue[${i}]`}
                  component={InputField}
                  className='form-control'
                  touched={1}
                  />
                  {props.error && (!!props.formdata  ?props.formdata.hasOwnProperty('values') ?  props.formdata.values.hasOwnProperty('ucvalue')?!!props.formdata.values.ucvalue[i]? props.formdata.values.ucvalue[i] !='' ?false:true :true :true : true : true) ?  <span className='errorMessage'>Value is required</span>  : null }
              </td>
              <td> <Field
                  name={`effectiveStartDate[${i}]`}
                  component={DatePickerField}
                  />
                   {props.error && (!!props.formdata  ?props.formdata.hasOwnProperty('values') ?  props.formdata.values.hasOwnProperty('effectiveStartDate')?!!props.formdata.values.effectiveStartDate[i]? props.formdata.values.effectiveStartDate[i] !=null ?false:true :true :true : true:true) ?  <span className='errorMessage'>EffectiveEndDate is required</span>  : null }
              </td>
              <td><Field
                  name={`effectiveEndDate[${i}]`}
                  component={DatePickerField}
                  />
                  {props.error && (!!props.formdata  ?props.formdata.hasOwnProperty('values') ?  props.formdata.values.hasOwnProperty('effectiveEndDate')?!!props.formdata.values.effectiveEndDate[i]? props.formdata.values.effectiveEndDate[i] !=null ?false:true :true :true : true:true) ?  <span className='errorMessage'>EffectiveEndDate is required</span>  : null }
              </td>
              <td>{i == 0 ? <i onClick={() => {props.pushEditableAtribute()}
              }
                  className='fa fa-plus-circle fa-2x'></i> : <i type='button'
                      title='Remove'
                      className='fa fa-trash-o fa-2x'
                      onClick={
                          () => props.removeEditableAttribute(dv,i)
                      }></i>}
              </td>
          </tr>
      ) }
      
     </tbody>
        </Table>
    </div>
)
}
export const UnitCharacteristics = (props) => {
  const unitCharacteristicsData = props.unitCharacteristics;

  return (
        <div className='row tab-pane fade in active' id='unitcharacteristics'>
            <div className='col-xs-12'>
                <div className='box'>
                    <div className='box-header'>
                        <h3 className='box-title'>Unit Characteristics</h3>
                        <div className='box-tools pull-right'>
                            <OverlayTrigger placement='bottom' overlay={
                                <Tooltip id='tooltip'>
                                    <strong>Add Unit Charateristic</strong>
                                </Tooltip>}>
                                <span className='fa fa-plus-circle fa-2x'
                                    onClick={() => props.ToggleAddEditModal({type:'add'}) }>
                                </span>
                            </OverlayTrigger>
                        </div>
                    </div>
                    <div className='box-body'>
                        <div className='margin-bottom-sm padding-top'>
                            
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
                                            <th colSpan={2}>Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {
                                            unitCharacteristicsData.selectedunitCharacteristics.map((uc, index) =>
                                                (
                                                    <tr key={uc.id}>
                                                        <td className='text-align-col'>{uc.name}</td>
                                                        <td className='text-align-col'>{uc.display}</td>
                                                        <td>{uc.description}</td>
                                                        <td>{uc.displayAttributes
                                                            ? uc.displayAttributes.ucvalue : null}</td>
                                                        <td className='text-align-col'>{uc.UOM}</td>
                                                        <td>{uc.displayAttributes
                                                            ? uc.displayAttributes.effectiveStartDate : null}</td>
                                                        <td>{uc.displayAttributes
                                                            ? uc.displayAttributes.effectiveEndDate : null}</td>
                                                        <td className='text-align-col'>
                                                            <OverlayTrigger placement='left' overlay={
                                                                <Tooltip id='tooltip'>
                                                                    <strong>Edit {uc.Name}</strong>
                                                                </Tooltip>}>
                                                                <i className='fa fa-edit fa-2x'
                                                                    onClick={() => { props.ToggleAddEditModal({type:'edit',index:index}) ; props.edit(uc.name,index) } }></i>
                                                            </OverlayTrigger>
                                                        </td>
                                                        <td>
                                                            {
                                                                uc.isDeletable ? <OverlayTrigger
                                                                    placement='bottom'
                                                                    overlay={
                                                                        <Tooltip id='tooltip'>
                                                                            <strong>Delete {uc.Name}</strong>
                                                                        </Tooltip>}>
                                                                    <i className='fa fa-trash-o fa-2x'
                                                                        onClick={() => { props.deleteConfirmation(uc.name,index) } }></i>
                                                                </OverlayTrigger> : null
                                                            }
                                                        </td>
                                                    </tr>))
                                        }
                                    </tbody>
                                </Table>
                            
                        </div>
                    </div>
                </div>

            </div>
      <Modal show={unitCharacteristicsData.showModal}>
                <form>
                    <Modal.Header>
                        {
                            props.unitCharacteristics.isEditable
                                ? <Modal.Title>Add Unit Characteristic</Modal.Title>
                                : <Modal.Title>Edit Unit Characteristic</Modal.Title>
                        }
                    </Modal.Header>

                    <Modal.Body>
                        <div className='row'>
                            <div className='col-xs-12 form-group'>
                                <div className='col-xs-6'>
                                    <label>Unit Characteristic Name<sup>*</sup></label>
                                </div>
                                <div className='col-xs-6'>
                                    <Field component={DropdownListField}
                                        name='charateristicName'
                                        data={unitCharacteristicsData.unSelectedUnitCharacteristics}
                                        valueKey='id'
                                        labelKey='display'
                                        disabled={ unitCharacteristicsData.disable
                                        }
                                        placeholder='Select Unit Charateristic'
                                        onChangeEvent={props.characteristicNameSelected}
                                       />

                                </div>
                            </div>

                            <div className='col-xs-12 form-group'>
                                <div className='col-xs-6'>
                                    <label>Display name</label>
                                </div>
                                <div className='col-xs-6'>
                                    <Field component={InputField} type='text' readOnly={true} touched={1}
                                        className='form-control' name='displayNameLabel'
                                        />

                                </div>
                            </div>

                            <div className='col-xs-12 form-group'>
                                <div className='col-xs-6'>
                                    <label>Description</label>
                                </div>
                                <div className='col-xs-6'>
                                    <Field component={TextAreaField} readOnly={true}
                                        className='form-control' name='descriptionLabel' readOnly={true}
                                         rows='4'/>

                                </div>
                            </div>

                            <div className='col-xs-12 form-group'>
                                <div className='col-xs-6'>
                                    <label>UOM</label>
                                </div>
                                <div className='col-xs-6'>
                                    <Field component={InputField} type='text' readOnly={true} touched={1}
                                        className='form-control' name='UOMLabel'
                                        />

                                </div>
                            </div>
                            <EffectiveDateValues editableAttributes={props.unitCharacteristics.editableAttributes} error={props.unitCharacteristics.error} formdata={props.formdata.UnitCharacteristicsForm}removeEditableAttribute={(element,i)=>props.removeEditableAttribute(element,i)} pushEditableAtribute ={()=> {props.pushEditableAtribute()}} />
                        </div>
                        <div className='errorMessage'>
                            {
                                props.unitCharacteristics.error &&
                                    props.unitCharacteristics.errorMessage &&
                                    props.unitCharacteristics.errorMessage.length > 0
                                    ? props.unitCharacteristics.errorMessage.map((drv,i) => (
                                        <div key={i}><span>{drv}</span><br/></div>
                                    ))
                                    : null
                            }
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <div>
                            {
                                !props.unitCharacteristics.isEditable
                                    ? <button className='btn btn-success' type='button' onClick={props.AddUnitCharateristic}>Add</button>
                                    : <button className='btn btn-success' type='button' onClick={props.updateRow}>Update</button>
                            }
                            <button className='btn btn-warning' type='button' onClick={()=>props.ToggleAddEditModal({type:'close'})}>Close</button>
                        </div>
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
                    <div className='pull-right'>
                        <button className='btn btn-warning'
                            type='button'
                            onClick={()=>props.deleteConfirmation('close',-1)}>
                            Close
                        </button>
                        <button className='btn btn-danger'
                            type='button'
                            onClick={props.DeleteUnitCharateristic}>
                            Delete
                        </button>
                    </div>
                </Modal.Footer>
            </Modal>


        </div>

    )
}
export default UnitCharacteristics
