const invalidDeliveryOrderDate = (service) =>
  `Order "${service}" must have service date for today or later`;

const invalidFinalOrderDate = (service) =>
  `Order "${service}" must have service date for tomorrow or later`;

const invalidOrderDate = (service) =>
  `Order "${service}" must have service date for today or later`;

const subOrderNotFound = (id) =>
  `Subscription Order with id ${id} does not exist`;

module.exports = {
  invalidDeliveryOrderDate,
  invalidFinalOrderDate,
  invalidOrderDate,
  subOrderNotFound,
};
