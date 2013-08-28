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
		this.part = new this.mongoose.Schema({
			pname: String,
			pdescription: String,
			pcount: Number,
			pmaterial: [{material:this.mongoose.Schema.Types.ObjectId,mcount:Number}]
		});
	}
}