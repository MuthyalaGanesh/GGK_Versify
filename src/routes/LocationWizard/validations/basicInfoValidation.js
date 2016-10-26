const basicInfoValidation = values => {
  const errors = {}
  if (!values.locationName) {
    errors.locationName = 'Location Name is required'
  }
  if (!values.type) {
    errors.type = 'Type is required'
  }  
  return errors
}

export default basicInfoValidation
