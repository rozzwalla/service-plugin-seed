/*
 * Just a sample code to test the service plugin.
 * Kindly write your own unit tests for your own plugin.
 */
'use strict';

var cp     = require('child_process'),
	assert = require('assert'),
	service;

describe('Service', function () {
	this.slow(5000);

	after('terminate child process', function () {
		service.kill('SIGKILL');
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(service = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			service.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			service.send({
				type: 'ready',
				data: {
					options: {
						config_field1: 'configfieldvalue',
						config_field2: 25
					}
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});

	describe('#data', function () {
		it('should process the data', function (done) {
			service.send({
				type: 'data',
				data: {
					key1: 'value1',
					key2: 121,
					key3: 40
				}
			}, done);
		});
	});
});