const invalidEndDateMessage =
  "You can't set end date of subscription to the past";

const invalidDatesPairMessage =
  "You can't set end date of subscription earlier than start date + 1 day";

const cantChangeStartDateMessage =
  "You can't move start date of already started subscription";

const cantChangeEndDateMessage =
  "You can't move end date of already ended subscription";

const cantUnselectFreqMessage =
  "You can't unselect frequency setting for existing subscription";

const cantUnselectDaysMessage =
  "You can't drop servicing days of week for existing subscription";

const creditLimitExceededMessage =
  'Credit limit exceeded for on account payment';

module.exports = {
  invalidEndDateMessage,
  invalidDatesPairMessage,
  cantChangeStartDateMessage,
  cantChangeEndDateMessage,
  cantUnselectFreqMessage,
  cantUnselectDaysMessage,
  creditLimitExceededMessage,
};
