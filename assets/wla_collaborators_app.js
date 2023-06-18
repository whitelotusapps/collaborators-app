function main() {
	var client = ZAFClient.init();
	client.invoke('resize', { width: '100%', height: '0px' });

	client.get('ticket').then(function (ticket_data) {
		var ticket_id = ticket_data.ticket.id;
		var ticket_collaborators = ticket_data.ticket.collaborators;
		var ticket_tags = ticket_data.ticket.tags;

		var metadataPromise = client.metadata();

		metadataPromise.then(function (metadata) {
			var metadata_prefix = metadata.settings['Collaborator Tag Prefix'] || '';
			var metadata_suffix = metadata.settings['Collaborator Tag Suffix'] || '';
			var metadata_include_email_address = metadata.settings['Include collaborator email address in tag'];
			/*
			console.log('metadata_prefix:', metadata_prefix);
			console.log('metadata_suffix:', metadata_suffix);
			console.log('metadata_include_email_address:', metadata_include_email_address);
			console.log("TYPE OF: " + typeof metadata_include_email_address)
			*/
			var ticket_collaborator_tags = [];

			var tagGenerationPromise = new Promise(function (resolve) {
				ticket_collaborators.forEach(function (ticket_collaborator, index, array) {
					var ticket_collaborator_email_address = ticket_collaborator.email.replace(/@/g, '_at_');
					//console.log('ticket_collaborator_email_address: ' + ticket_collaborator_email_address);
					var ticket_collaborator_name = ticket_collaborator.name.replace(/\s/g, '_').toLowerCase().replace(/[)(]/g, '');
					//console.log('ticket_collaborator.name: ' + ticket_collaborator.name);
					//console.log('ticket_collaborator_name: ' + ticket_collaborator_name);

					var collaborator_tag = '';

					if (metadata_prefix) {
						collaborator_tag += metadata_prefix + '_';
						//console.log('if (metadata_prefix)');
					}

					collaborator_tag += ticket_collaborator_name;
					//console.log('collaborator_tag:', collaborator_tag);

					// THE BELOW LINE IS WHEN WE ARE TESTING LOCALLY / ZCLI
					//if (metadata_include_email_address === 'true') {
					if (metadata_include_email_address === true) {
						collaborator_tag += '_' + ticket_collaborator_email_address;
						//console.log('if (metadata_include_email_address === true)');
					}

					if (metadata_suffix) {
						collaborator_tag += '_' + metadata_suffix;
						//console.log('if (metadata_suffix)');
					}

					if (collaborator_tag !== '') {
						ticket_collaborator_tags.push(collaborator_tag);
					}

					if (index === array.length - 1) {
						resolve();
					}
				});
			});

			tagGenerationPromise.then(function () {
				var new_tag_check = ticket_collaborator_tags.some(function (ticket_collaborator_tag) {
					return !ticket_tags.includes(ticket_collaborator_tag);
				});

				if (Array.isArray(ticket_collaborator_tags) && ticket_collaborator_tags.length > 0 && new_tag_check) {
					var additional_tags = ticket_collaborator_tags.filter(Boolean); // Remove any empty tags
					//console.log('additional_tags:', additional_tags);
					var requestData = JSON.stringify({ 'ticket': { 'additional_tags': additional_tags } });

					client.request({
						url: '/api/v2/tickets/update_many.json?ids=' + ticket_id,
						type: 'PUT',
						data: requestData,
						contentType: 'application/json',
						dataType: 'json',
						httpCompleteResponse: true
					});
				}
				//else
				//	console.log("No additional tags: " + additional_tags)
			});
		});
	});
}
