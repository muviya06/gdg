module.exports = function handler(request, response) {
  response.status(200).json({
    status: 'ok',
    app: 'fieldwise-farming-intelligence'
  });
};
