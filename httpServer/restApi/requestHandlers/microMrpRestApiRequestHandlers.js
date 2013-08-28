module.exports = {
	portalRequestErrorHandler: function (q,s) {
		return function (e,d) {
			if (e) {
				var body = "There was an error: " + e;
				s.setHeader("Content-Type", "text/plain");
				s.setHeader("Content-Length", body.length);
				s.send(body);
			} else {
				s.setHeader("Content-Type", "text/html");
				s.setHeader("Content-Length", d.length);
				s.send(d);
			}
		}
	},
	portalRequestHandler: function (fileSystem,portalRequestErrorHandler) {
		return function (q,s) {
			return fileSystem.readFile("./portal/index.html",portalRequestErrorHandler(q,s));
		}
	},
	basicErrorHandler: function (q,s) {
		return function (e) {
			var json = "";
			if (e) {
				json = "{\"error\":\""+e+"\"}";
			} else {
				json = "{\"success\":\"true\"}";
			}
			s.setHeader("Content-Type", "text/json");
			s.setHeader("Content-Length", json.length);
			s.send(json);
		}
	},
	readMaterialRequestErrorHandler: function(q,s) {
		return function(e,d){
			var json = "";
			if (e) {
				json = "{\"error\":\""+e+"\"}";
			} else {
				json = "{\"material\":[";
				d.forEach(function(m){
					json += "{ \"id\" : \""+m._id+"\" , \"mname\" : \""+m.mname+"\" , \"mdescription\" : \""+m.mdescription+"\" , \"munit\" : \""+m.munit+"\" , \"mcount\" : \""+m.mcount+"\" },";
				});
				json += "{}]}";
			}
			s.setHeader("Content-Type","text/json");
			s.setHeader("Content-Length",json.length);
			s.send(json);
		}
	},
	readMaterialRequestHandler: function (material,readMaterialRequestErrorHandler) {
		return function (q,s) {
			return material.find(readMaterialRequestErrorHandler(q,s));
		}
	},
	createMaterialRequestHandler: function (material,basicErrorHandler) {
		return function (q,s) {
			return new material({
				mname: q.body.mname,
				mdescription: q.body.mdescription,
				munit: q.body.munit,
				mcount: q.body.mcount
			}).save(basicErrorHandler(q,s));
		}
	},
	updateMaterialByIdRequestHandler: function (material,basicErrorHandler) {
		return function (q,s) {
			return material.findByIdAndUpdate(q.body._id,{
					mname: q.body.mname,
					mdescription: q.body.mdescription,
					munit: q.body.munit,
					mcount: q.body.mcount
				},
				basicErrorHandler(q,s)
			);
		}
	},
	deleteMaterialById: function (material,basicErrorHandler) {
		return function (q,s) {
			return material.findByIdAndRemove(q.body._id,basicErrorHandler(q,s));
		}
	},
	readPartRequestErrorHandler: function(q,s) {
		return function(e,d){
			var json = "";
			if (e) {
				json = "{\"error\":\""+e+"\"}";
			} else {
				json = "{\"part\":[";
				d.forEach(function(p){
					json += "{ \"id\" : \""+p._id+"\" , \"pname\" : \""+p.pname+"\" , \"pdescription\" : \""+p.pdescription+"\" , \"pmaterial\" : \""+p.pmaterial+"\" , \"pcount\" : \""+m.mcount+"\" },";
				});
				json += "{}]}";
			}
			s.setHeader("Content-Type","text/json");
			s.setHeader("Content-Length",json.length);
			s.send(json);
		}
	},
	readPartRequestHandler: function (part,readPartRequestErrorHandler) {
		return function (q,s) {
			return part.find(readPartRequestErrorHandler(q,s));
		}
	}
}