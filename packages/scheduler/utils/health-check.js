const healthCheck = (req, res) => {
  const { method, url } = req;
  if (method.toUpperCase() === 'GET' && url.toLowerCase() === '/health-check') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('OK');
  } else {
    res.writeHead(404);
  }
};

module.exports = healthCheck;
