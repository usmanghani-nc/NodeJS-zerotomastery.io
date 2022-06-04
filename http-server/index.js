const http = require('http');

const data = [
  { id: 1, name: 'Usman' },
  { id: 2, name: 'Nuha' },
];

const server = http.createServer((req, res) => {
  const [, url, param] = req.url.split('/');

  if (url === 'friends') {
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });

    if (param) {
      const item = data.find((ff) => ff.id === Number(param));

      res.end(JSON.stringify(item));
    } else {
      res.end(JSON.stringify(data));
    }
  } else if (url === 'messages') {
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 200;

    res.write('<html>');
    res.write('<body>');
    res.write('<ul>');
    res.write('<li>List 1</li>');
    res.write('<li>List 2</li>');
    res.write('<li>List 3</li>');
    res.write('</ul>');
    res.write('</body>');
    res.write('</html>');

    res.end();
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3001, () => {
  console.log('3001 server running!!!');
});
