module.exports = {
	dbConnector: null,
	router: null,
	fileSystem: null,
	requestHandlers: null,
	init: function (dbConnector,router) {
		this.dbConnector = dbConnector;
		this.router = router;
		this.fileSystem = require('fs');
		this.requestHandlers = require('./requestHandlers/microMrpRestApiRequestHandlers');
		this.router.get('/',
			this.requestHandlers.portalRequestHandler(
				this.fileSystem,
				this.requestHandlers.portalRequestErrorHandler
		));
		this.router.get('/api/r/materials',
			this.requestHandlers.readMaterialsRequestHandler(
				this.dbConnector.schemaModels.models.material,
				this.requestHandlers.readMaterialsRequestErrorHandler
		));
		this.router.post('/api/cr/material',
			this.requestHandlers.createMaterialRequestHandler(
				this.dbConnector.schemaModels.models.material,
				this.requestHandlers.basicErrorHandler
		));
		this.router.put('/api/u/material',
			this.requestHandlers.updateMaterialByIdRequestHandler(
				this.dbConnector.schemaModels.models.material,
				this.requestHandlers.basicErrorHandler
		));
		this.router.delete('/api/d/material',
			this.requestHandlers.deleteMaterialById(
				this.dbConnector.schemaModels.models.material,
				this.requestHandlers.basicErrorHandler
		));
	}
}