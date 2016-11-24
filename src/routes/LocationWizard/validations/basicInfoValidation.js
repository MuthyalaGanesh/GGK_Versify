const basicInfoValidation = values => {
  const errors = {}
  if (!values.locationName) {
    errors.locationName = 'Location Name is required'
  }  
  if (!values.parentLocation) {
    errors.type = 'Parent Location is required'
  }  
  if(!values.technologytype){
    errors.technologyType='Technology Type is required'
  }
    if (!values.primaryMarket) {
    errors.primaryMarket = 'Primary Market is required'
  }
  if(!values.owner){
    errors.owner='Owner is required'
  }
  if (!values.fuelclass) {
    errors.fuelClass='Fuel Class is required'
  }
    if (!values.ownership) {
    errors.ownership = 'Ownership is required'
  }
  if (!values.timezone) {
    errors.timezone = 'Timezone is required'
  }  
  if(!values.physicalTimezone){
    errors.physicalTimezone='Physical Timezone is required'
  }
  if(!values.ownerShipPercentage){
    errors.ownerShipPercentage='OwnerShip Percentage is required'
  }
 
  return errors
}

export default basicInfoValidation
