module.exports = {
	port: null,
	express: null,
	app: null,
	dbConnector: null,
	restApi: null,
	shell: null,
	init: function (dbConnector) {
		this.port = 8040;
		this.express = require('../node_modules/express');
		this.app = this.express();
		this.app.use(this.express.bodyParser());
		this.app.listen(this.port);
		this.dbConnector = dbConnector;
		this.dbConnector.init();
		this.restApi = require('./restApi/microMrpRestApi');
		this.restApi.init(this.dbConnector,this.app);
		this.shell = require('./shell/microMrpShell');
		this.shell.init(this.dbConnector);
	}
}