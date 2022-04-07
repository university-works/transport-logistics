const AUDIT_LOG_ACTION = {
  create: 'create',
  modify: 'modify',
  delete: 'delete',
};

const AUDIT_LOG_ENTITY = {
  'promos:': 'Promo',
  'permits:': 'Permit',
  'service:areas': 'ServiceArea',
  'custom:rates:groups': 'CustomRatesGroup',
  'equipment:items': 'EquipmentItem',
  'materials:': 'Material',
  'material:profiles': 'MaterialProfile',
  'thresholds:': 'Threshold',
  'billable:surcharges': 'Surcharge',
  'billable:line:items': 'LineItem',
  'billable:services': 'Service',
  'brokers:': 'Broker',
  'customer:groups': 'CustomerGroup',
  '3rd_party_haulers': 'ThirdPartyHauler',
  'disposal:sites': 'DisposalSite',
  'business:lines': 'BusinessLine',
  'business:units': 'BusinessUnit',
  'companies:': 'Company',
  'global:rates:services': 'GeneralRackRates.Service',
  'global:rates:line:items': 'GeneralRackRates.LineItem',
  'global:rates:thresholds': 'GeneralRackRates.Threshold',
  'global:rates:surcharges': 'GeneralRackRates.Surcharge',
  'custom:rates:group:services': 'CustomRackRates.Service',
  'custom:rates:group:line:items': 'CustomRackRates.LineItem',
  'custom:rates:group:thresholds': 'CustomRackRates.Threshold',
  'custom:rates:group:surcharges': 'CustomRackRates.Surcharge',
  'job:sites': 'JobSite',
  'customers:': 'Customer',
  'customer:job:site': 'CustomerJoibSitePair',
  'projects:': 'Project',
  'contacts:': 'Contact',
  'tax:districts': 'TaxDistrict',
  'material:codes': 'MaterialCode',
  'orders:': 'Order',
  'work:orders': 'WorkOrder',
  'landfill_operations:': 'LandfillOperation',
  'recurrent:order:templates': 'RecurrentOrderTemplate',
  'tenants:': 'Tenant',
};

const AUDIT_LOG_ACTIONS = Object.values(AUDIT_LOG_ACTION);
const AUDIT_LOG_ENTITIES = Object.values(AUDIT_LOG_ENTITY);

module.exports = {
  AUDIT_LOG_ACTION,
  AUDIT_LOG_ACTIONS,
  AUDIT_LOG_ENTITY,
  AUDIT_LOG_ENTITIES,
};
