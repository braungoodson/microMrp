module.exports = {
	init: function (dbConnector) {
		console.log("* Interactive MicroMRP Server Shell v1.0")
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
}