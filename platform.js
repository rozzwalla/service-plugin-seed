'use strict';

var inherits     = require('util').inherits,
	EventEmitter = require('events').EventEmitter;

function Platform() {
	if (!(this instanceof Platform)) return new Platform();

	var self = this;

	process.on('uncaughtException', function (error) {
		console.error(error);
		self.handleException(error);
		process.exit(1);
	});

	EventEmitter.call(this);
	Platform.init.call(this);
}

inherits(Platform, EventEmitter);

Platform.init = function () {
	var self = this;

	process.on('message', function (m) {
		if (m.type === 'ready')
			self.emit('ready', m.data.options);
		else if (m.type === 'data')
			self.emit('data', m.data);
	});
};

Platform.prototype.sendResult = function (result, callback) {
	setImmediate(function () {
		callback = callback || function () {};

		process.send({
			type: 'result',
			data: result
		});

		callback();
	});
};

Platform.prototype.log = function (title, description, callback) {
	setImmediate(function () {
		callback = callback || function () {};

		if (!title) return callback(new Error('Log title is required.'));

		process.send({
			type: 'log',
			data: {
				title: title,
				description: description
			}
		});

		callback();
	});
};

Platform.prototype.handleException = function (error, callback) {
	setImmediate(function () {
		callback = callback || function () {};

		if (!error) return callback(new Error('Error is required.'));

		console.error(error);

		process.send({
			type: 'error',
			data: {
				name: error.name,
				message: error.message,
				stack: error.stack
			}
		});
	});
};

module.exports = new Platform();