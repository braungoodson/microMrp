module.exports = {
	rootRequestErrorHandler: function (q,s) {
		return function (e,d) {
			if (e) {
				var body = "There was an error: " + e;
				s.setHeader('Content-Type', 'text/plain');
				s.setHeader('Content-Length', body.length);
				s.send(body);
			} else {
				s.setHeader('Content-Type', 'text/html');
				s.setHeader('Content-Length', d.length);
				s.send(d);
			}
		}
	},
	basicErrorHandler: function (q,s) {
		return function (e) {
			var json = "";
			if (e) {
				json = "{'error':'"+e+"'}";
			} else {
				json = "{'success':'true'}";
			}
			s.setHeader('Content-Type', 'text/json');
			s.setHeader('Content-Length', json.length);
			s.send(json);
		}
	},
	materialsRequestErrorHandler: function(q,s) {
		return function(e,d){
			var json = "";
			if (e) {
				json = "{'error':'"+e+"'}";
			} else {
				json = "{'materials':[";
				d.forEach(function(m){
					json += "{'_id':'"+m._id+"','mname':'"+m.mname+"','mdescription':'"+m.mdescription+"','munit':'"+m.munit+"','mcount':'"+m.mcount+"'}";
				});
				json += "]}";
			}
			s.setHeader('Content-Type','text/json');
			s.setHeader('Content-Length',json.length);
			s.send(json);
		}
	},
	rootRequestHandler: function (fileSystem,rootRequestErrorHandler) {
		return function (q,s) {
			return fileSystem.readFile('./portal/index.html',rootRequestErrorHandler(q,s));
		}
	},
	materialsRequestHandler: function (material,materialsRequestErrorHandler) {
		return function (q,s) {
			return material.find(materialsRequestErrorHandler(q,s));
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
	}
}