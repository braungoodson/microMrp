module.exports = {
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
			mname: String,
			mdescription: String,
			munit: String,
			mcount: Number
		});
	}
}