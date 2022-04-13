const invalidCustomerOwnedServiceAction = (service) =>
  `Service "${service}" uses customer owned equipment and must be on of:
        "None", "General Purpose", "Dump & Return", "Servicing"`;

const multipleDeliveries = (service) =>
  `Service "${service}" has multiple deliveries`;

const invalidDeliveryOrderDate = (service) =>
  `Order "${service}" must have service date for today or later`;

const invalidServiceStartDate = (service) =>
  `Service "${service}" must have start date for today or later`;

const multipleFinalOrders = (service) =>
  `Service "${service}" has multiple final orders`;

const serviceWithoutEndDate = (service) =>
  `Service "${service}" must have end date because it has final order included`;

const invalidServiceEndDate = (service) =>
  `Service "${service}" must have end date for tomorrow or later`;

const missingServiceFrequency = (service) =>
  `Service "${service}" must have frequency configuration`;

const noDeliveries = (service) => `Service "${service}" must have delivery`;

const notAllowedRecurringService = (service) =>
  `Can't use Recurring Billable Service "${service}" to create new subscription order`;

const invalidServiceServiceDate = (id) =>
  `Service with id: ${id} must have service date for tomorrow or later`;

const bsNotFound = (billableServiceId) =>
  `Billable Service with id: ${billableServiceId} does not exist`;

const globalRatesNotFound = (service) =>
  `Global rates for billable service "${service}" not found`;

module.exports = {
  invalidCustomerOwnedServiceAction,
  multipleDeliveries,
  invalidDeliveryOrderDate,
  invalidServiceStartDate,
  multipleFinalOrders,
  serviceWithoutEndDate,
  invalidServiceEndDate,
  missingServiceFrequency,
  noDeliveries,
  notAllowedRecurringService,
  invalidServiceServiceDate,
  bsNotFound,
  globalRatesNotFound,
};
