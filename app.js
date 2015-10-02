'use strict';

var platform = require('./platform'),
	serviceClient;

/*
 * Listen for the data event.
 */
platform.on('data', function (data) {
	/*
	 * Send the data to the service and expect a result.
	 *
	 * Example:
	 *
	 * serviceClient.send(data, function (error, result) {
	 *     if (error) {
	 *         platform.handleException(error);
	 *     }
	 *     else {
	 *         platform.sendResult(result);
	 *     }
	 * })
	 */
	console.log(data);
});

/*
 * Listen for the ready event.
 */
platform.once('ready', function (options) {
	/*
	 * Initialize your service plugin using the options. See config.json
	 * You can customize config.json based on the needs of your plugin.
	 * Reekoh will inject these configuration parameters as options here in the ready event.
	 *
	 * Example:
	 *
	 * var clientId = options.clientid;
	 * var clientSecret = options.clientsecret;
	 *
	 * serviceClient = new ServiceClient(clientId, clientSecret);
	 *
	 * Note: Option Names are based on what you specify on the config.json.
	 */

	// TODO: Initialize the client connection to the web service here.
	console.log(options);
	platform.notifyReady();
});