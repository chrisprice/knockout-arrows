var ko = require('knockout');
// add efficient versions of array ops
require('knockout-projections');
// add in arrow support
require('knockout-arrows');

global.viewModel = {
	items: [
		{
			description: ko.observable('Write blog post'),
			done: ko.observable(false)
		},
		{
			description: ko.observable('Goto work'),
			done: ko.observable(true)
		}
	]
};

ko.applyBindings(viewModel);