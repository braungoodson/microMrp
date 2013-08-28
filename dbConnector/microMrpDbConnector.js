module.exports = {
	mongoose: null,
	schemas: null,
	models: null,
	init: function () {
		var connectionString = "mongodb://127.0.0.1:27017/microMrp";
		this.mongoose = require('../node_modules/mongoose');
		this.mongoose.connect(connectionString);
		this.schemas = require('../schemas/microMrpSchemas');
		this.schemas.init(this.mongoose);
		this.models = require('../models/microMrpModels')
		this.models.init(this.mongoose,this.schemas);
	}
}