module.exports = {
	port: null,
	express: null,
	app: null,
	dbConnector: null,
	restApi: {
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
		materialsRequestHandler: function (material) {
			return function (q,s) {
				material.find(function(e,d){
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
		createMaterialRequestHandler: function (material) {
			return function (q,s) {
				var m = new material({
					mname: q.params.mname,
					mdescription: q.params.mdescription,
					munit: q.params.munit,
					mcount: q.params.mcount
				});
				m.save(function(e){
					var json = "";
					if (e) {
						json = "{'error':'"+e+"'}";
						s.setHeader('Content-Type', 'text/json');
						s.setHeader('Content-Length', json.length);
						s.send(json);
					} else {
						json = "{'success':'true'}";
						s.setHeader('Content-Type', 'text/json');
						s.setHeader('Content-Length', json.length);
						s.send(json);
					}
				});
			}
		},
		init: function (dbConnector,router) {
			this.dbConnector = dbConnector;
			this.router = router;
			this.fileSystem = require('fs');
			this.router.get('/',this.rootRequestHandler(this.fileSystem));
			this.router.get('/api/materials',this.materialsRequestHandler(this.dbConnector.schemaModels.models.material));
			this.router.post('/api/cr/material/:mname/:mdescription/:munit/:mcount',this.createMaterialRequestHandler(this.dbConnector.schemaModels.models.material));
		}
	},
	shell: {
		init: function (dbConnector) {
			console.log("* MicroMRP Shell v1.0")
			process.stdin.resume();
			process.stdin.setEncoding('utf8');
			process.stdin.on('data', function (chunk) {
				if (chunk.toString().trim() == "exit") {
					console.log('* Shutting down...');
					dbConnector.mongoose.connection.close();
					process.exit(1);
				} else {
					process.stdout.write("micromrp> ");
				}
			});
			process.stdout.write("micromrp> ");
		}
	},
	init: function (dbConnector) {
		this.port = 8040;
		this.express = require('../node_modules/express');
		this.app = this.express();
		this.app.listen(this.port);
		this.dbConnector = dbConnector;
		this.dbConnector.init();
		this.restApi.init(this.dbConnector,this.app);
		this.shell.init(this.dbConnector);
	}
}