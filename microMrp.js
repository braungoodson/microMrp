module.exports = {
	httpServer: null,
	dbConnector: null,
	init: function () {
		this.dbConnector = require('./dbConnector/microMrpDbConnector');
		this.httpServer = require('./httpServer/microMrpHttpServer');
		this.httpServer.init(this.dbConnector);
	}
}