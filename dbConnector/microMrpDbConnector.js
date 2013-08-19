module.exports = {
	mongoose: null,
	schemaModels: null,
	init: function () {
		var connectionString = "mongodb://127.0.0.1:27017/microMrp";
		this.mongoose = require('../node_modules/mongoose');
		this.mongoose.connect(connectionString);
		this.schemaModels = require('../schemaModels/microMrpSchemaModels');
		this.schemaModels.init(this.mongoose);
	}
}