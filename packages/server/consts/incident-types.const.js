const INCIDENT_TYPE = {
  Tardiness: 'Tardiness',
  Insubordination: 'Insubordination',
  'No Show': 'No Show',
  'Failure to follow protocol': 'Failure to follow protocol',
  'Failure to report incident': 'Failure to report incident',
  'Dress code violation': 'Dress code violation',
};

const INCIDENT_TYPES = Object.values(INCIDENT_TYPE);

module.exports = { INCIDENT_TYPE, INCIDENT_TYPES };
