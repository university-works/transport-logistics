const scheduler = require('@fp/scheduler');

const getMessage = (message) => message;

console.dir({ common: getMessage(scheduler().message) });
