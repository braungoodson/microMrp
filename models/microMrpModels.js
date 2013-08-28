module.exports = {
	mongoose: null,
	schemas: null,
	material: null,
	part: null,
	init: function (mongoose,schemas) {
		this.schemas = schemas;
		this.mongoose = mongoose;
		this.material = this.mongoose.model('material',this.schemas.material);
		this.part = this.mongoose.model('part',this.schemas.part);
	}
}