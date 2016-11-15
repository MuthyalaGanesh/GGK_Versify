const baseAddress = "https://web-dev-04.versifysolutions.com/GGKAPI/Services/API.svc";

export const ApiUrl = {
    LOCATIONS:baseAddress +"/Locations",
ATTRIBUTES : baseAddress +"/Attributes",
UNITS_OF_MEASURE : baseAddress+"/UnitsOfMeasure",
LOCATION_TYPES : baseAddress+"/LocationTypes",
TECHNOLOGYTYPES : baseAddress+"/TechnologyTypes",
ORGANIZATIONS :baseAddress+"/Organizations",
FUEL_CLASSES : baseAddress+"/FuelClasses",
ISO_MARKETS :  baseAddress+"/ISOMarkets",
TIME_ZONES : baseAddress+"/TimeZones",
LWMARKETDRIVEN_MAPPINGS: baseAddress+"/LWMarketDrivenMappings",
OMSLOCATIONWIZARD_DATA: baseAddress+"/OMSLocationWizardData",
METRICS : baseAddress+"/Metrics",
WORKFLOW_GROUPS:baseAddress+"/WorkflowGroups",
WORKFLOW_TYPES:baseAddress+"/WorkflowTypes",
WORKFLOW_DATA : baseAddress+"/WorkflowData",
OMS_LOCATION_WIZARD_DATA:baseAddress+"/OMSLocationWizardData",
OMS_LOCATION_WIZARD_INDEPENDENT_DATA : baseAddress+"/OMSLocationWizardIndependentData",
CONTACT_STATUS : baseAddress+"/ContactStatus",
CONTACT_TYPE : baseAddress+"/ContactTypes",
ORGANIZATION : baseAddress+"/Organizations",
AUTO_COMPLETE_CONTACTS :baseAddress+"/AutoCompleteContacts?searchText=",
ROLE : baseAddress+"/Roles"
}

export default ApiUrl