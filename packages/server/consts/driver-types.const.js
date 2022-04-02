const DRIVER_TYPE = {
  'Ambulatory:AMB': 'Ambulatory:AMB',
  'Wheelchair:WC': 'Wheelchair:WC',
  'Bus:BUS': 'Bus:BUS',
  'Taxi:TX': 'Taxi:TX',
};

const DRIVER_TYPES = Object.values(DRIVER_TYPE);

module.exports = { DRIVER_TYPE, DRIVER_TYPES };
