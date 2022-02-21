const scheduler = require('@fp/scheduler');

const getMessage = ({ message, type }) => ({ message, type });

console.log({ common: getMessage(scheduler()) });
