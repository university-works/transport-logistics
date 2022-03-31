const dotenv = require('dotenv');
const path = require('path');

/**
 * Configuration service
 */
const config = () => {
  const { error } = dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

  if (error) throw error;

  return {
    /**
     * Method to get the path to a directory or file in this directory based on an environment variable
     * @param  key      The key in the environment variable object must be a string
     * @param  filename The file name for a specific directory must be string, is optional
     * @return          Returns the absolute path to a file or directory as a string
     */
    getDest: (key, filename) => {
      const name = process.env[filename] || filename || '/';
      return path.join(process.cwd(), this.get(key), name);
    },

    /**
     * Method for checking application operating modes
     * @param  mode The mode to be checked must be enum modes in ConfigMode
     * @return     Returns the boolean value
     */
    getMode: (mode) => {
      return process.env['NODE_ENV'] === mode;
    },

    /**
     * Method for getting the value of a variable in the environment
     * @param  key The key in the environment variable object must be a string
     * @return     Returns the generated type limited the function types JSON.parse()
     */
    get: (key) => {
      const variable = process.env[key];
      if (!variable) throw TypeError(`The ${key} cannot be undefined`);
      try {
        return JSON.parse(variable);
      } catch {
        return variable;
      }
    },
  };
};

module.exports = config();
