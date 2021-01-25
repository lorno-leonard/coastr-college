const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const helmet = require('helmet');

const port = process.env.PORT || 4100;

const app = express();
app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(helmet.frameguard());
app.use(helmet.contentSecurityPolicy({
	directives: {
		frameAncestors: ["'none'"]
	}
}));
app.use('/wci/admin', express.static(path.join(__dirname, 'build')));
app.get('/wci/admin/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port);
