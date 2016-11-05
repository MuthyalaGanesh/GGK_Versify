const systemIntegrationValidation = values => {
  const errors = {}
  if (!values.newSystemIntegration) {
    errors.locationName = 'System Integration Name is required'
  }
  return errors
}

export default systemIntegrationValidation
