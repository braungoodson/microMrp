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
		// portal request
		this.router.get('/',
			this.requestHandlers.portalRequestHandler(
				this.fileSystem,
				this.requestHandlers.portalRequestErrorHandler
		));
		// read material table
		this.router.get('/api/r/material',
			this.requestHandlers.readMaterialRequestHandler(
				this.dbConnector.models.material,
				this.requestHandlers.readMaterialRequestErrorHandler
		));
		// create a material
		this.router.post('/api/c/material',
			this.requestHandlers.createMaterialRequestHandler(
				this.dbConnector.models.material,
				this.requestHandlers.basicErrorHandler
		));
		// update a material
		this.router.put('/api/u/material',
			this.requestHandlers.updateMaterialByIdRequestHandler(
				this.dbConnector.models.material,
				this.requestHandlers.basicErrorHandler
		));
		// delete a material
		this.router.delete('/api/d/material',
			this.requestHandlers.deleteMaterialById(
				this.dbConnector.models.material,
				this.requestHandlers.basicErrorHandler
		));
	}
}