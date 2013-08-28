module.exports = {
	mongoose: null,
	schemas: null,
	material: null,
	init: function (mongoose,schemas) {
		this.schemas = schemas;
		this.mongoose = mongoose;
		this.material = this.mongoose.model('material',this.schemas.material);
	}
}