/**
 * AsyncHandler is a utility function that wraps async route handlers
 * to catch and forward errors to Express's error handling middleware.
 * This eliminates the need for try/catch blocks in each route handler.
 *
 * @param {Function} fn - The async route handler function to wrap
 * @returns {Function} - Express middleware function that handles errors
 */
module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
