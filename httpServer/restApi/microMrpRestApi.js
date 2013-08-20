module.exports = {
	dbConnector: null,
	router: null,
	fileSystem: null,
	rootRequestHandler: function (fileSystem) {
		return function (q,s) {
			fileSystem.readFile('./portal/index.html',function(e,d){
				if (e) {
					console.log("There was an error: " + e);
					var body = "There was an error: " + e;
					s.setHeader('Content-Type', 'text/plain');
					s.setHeader('Content-Length', body.length);
					s.send(body);
				} else {
					s.setHeader('Content-Type', 'text/html');
					s.setHeader('Content-Length', d.length);
					s.send(d);
				}
			});
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
	materialsRequestHandler: function (material) {
		return function (q,s) {
			return material.find(function(e,d){
				var json = "";
				if (e) {
					json = "{'error':'"+e+"'}";
					s.setHeader('Content-Type','text/json');
					s.setHeader('Content-Length',json.length);
					s.send(json);
				} else {
					json = "{'materials':[";
					d.forEach(function(m){
						json += "{'_id':'"+m._id+"','mname':'"+m.mname+"','mdescription':'"+m.mdescription+"','munit':'"+m.munit+"','mcount':'"+m.mcount+"'}";
					});
					json += "]}";
					s.setHeader('Content-Type','text/json');
					s.setHeader('Content-Length',json.length);
					s.send(json);
				}
			});
		}
	},
	createMaterialRequestHandler: function (material,basicErrorHandler) {
		return function (q,s) {
			var m = new material({
				mname: q.body.mname,
				mdescription: q.body.mdescription,
				munit: q.body.munit,
				mcount: q.body.mcount
			});
			m.save(basicErrorHandler(q,s));
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
	init: function (dbConnector,router) {
		this.dbConnector = dbConnector;
		this.router = router;
		this.fileSystem = require('fs');
		this.router.get('/',this.rootRequestHandler(this.fileSystem));
		this.router.get('/api/materials',this.materialsRequestHandler(this.dbConnector.schemaModels.models.material));
		this.router.post('/api/cr/material',this.createMaterialRequestHandler(this.dbConnector.schemaModels.models.material,this.basicErrorHandler));
		this.router.put('/api/u/material',this.updateMaterialByIdRequestHandler(this.dbConnector.schemaModels.models.material,this.basicErrorHandler));
		this.router.delete('/api/d/material',this.deleteMaterialById(this.dbConnector.schemaModels.models.material,this.basicErrorHandler));
	}
}