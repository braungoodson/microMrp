module.exports = {
	mongoose: null,
	schemas: {
		mongoose: null,
		material: null,
		part: null,
		assembly: null,
		package: null,
		box: null,
		customer: null,
		order: null,
		init: function (mongoose) {
			this.mongoose = mongoose;
			this.material = new this.mongoose.Schema({
				//mid: this.mongoose.Schema.ObjectId,
				mname: String,
				mdescription: String,
				munit: String,
				mcount: Number
			});
		}
	},
	models: {
		schemas: null,
		mongoose: null,
		material: null,
		init: function (mongoose,schemas) {
			this.schemas = schemas;
			this.mongoose = mongoose;
			this.material = this.mongoose.model('material',this.schemas.material);
		}
	},
	init: function (mongoose) {
		this.mongoose = mongoose;
		this.schemas.init(this.mongoose);
		this.models.init(this.mongoose,this.schemas);
	}
}