const { wrapChanceMethods, wrapChance } = require('../utils/index');

const {
  wp7_anid,
  google_analytics,
  fbid,
  date,
  url: u,
  sentence,
} = wrapChanceMethods;

const options = {};

const generateUpload =
  (params) =>
  ({
    name = wp7_anid(wrapChance),
    type = google_analytics(wrapChance),
    size = fbid(wrapChance),
    url = u({}, wrapChance),
    description = sentence({}, wrapChance),
    upload_date = date({}, wrapChance),
  } = {}) => ({
    name,
    type,
    size,
    url,
    description,
    upload_date,
  });

module.exports = generateUpload(options);
