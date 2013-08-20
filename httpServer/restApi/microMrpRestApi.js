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
		this.router.get('/',this.requestHandlers.rootRequestHandler(this.fileSystem,this.requestHandlers.rootRequestErrorHandler));
		this.router.get('/api/materials',this.requestHandlers.materialsRequestHandler(this.dbConnector.schemaModels.models.material,this.requestHandlers.materialsRequestErrorHandler));
		this.router.post('/api/cr/material',this.requestHandlers.createMaterialRequestHandler(this.dbConnector.schemaModels.models.material,this.requestHandlers.basicErrorHandler));
		this.router.put('/api/u/material',this.requestHandlers.updateMaterialByIdRequestHandler(this.dbConnector.schemaModels.models.material,this.requestHandlers.basicErrorHandler));
		this.router.delete('/api/d/material',this.requestHandlers.deleteMaterialById(this.dbConnector.schemaModels.models.material,this.requestHandlers.basicErrorHandler));
	}
}