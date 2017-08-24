'use babel';

// data source is a simple array of strings
import suggestions from '../data/data.json';

class BrotliProvider {

	constructor() {
		// offer suggestions only when editing plain text or HTML files
		this.selector = '.text.plain, .text.html.basic';
	}

	getSuggestions(options) {
		const { prefix } = options;

		// only look for suggestions after 3 characters have been typed
		if (prefix.length >= 3) {
			return this.findMatchingSuggestions(prefix);
		}
	}

	findMatchingSuggestions(prefix) {
		// filter list of suggestions to those matching the prefix, case insensitive

		let components = [];
		let lastComponent = '';

		components = prefix.split('-');
		lastComponent = components[components.length - 1];

		components = lastComponent.split('_');
		lastComponent = components[components.length - 1];

		components = lastComponent.split('.');
		lastComponent = components[components.length - 1];

		let lastComponentLower = lastComponent.toLowerCase();
		let matchingSuggestions = suggestions.filter((suggestion) => {
			let textLower = suggestion.toLowerCase();
			return textLower.startsWith(lastComponentLower);
		});

		matchingSuggestions = matchingSuggestions.map((suggestion) => {
			return prefix.substr(0, prefix.lastIndexOf(lastComponent)) + suggestion;
		});

		// run each matching suggestion through inflateSuggestion() and return
		return matchingSuggestions.map(this.inflateSuggestion);
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(suggestion) {
		return {
			text: suggestion,
			type: 'value',
			rightLabel: 'Brotli'
		};
	}
}
export default new BrotliProvider();
