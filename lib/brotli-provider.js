'use babel';

// data source is a simple array of strings
import suggestions from '../data/brotli_list.json';
import synonyms from '../data/brotli_thes.json';

class BrotliProvider {

	constructor() {
		this.selector = '.text.html, .source.css, .source.sass, .source.css.postcss';
		this.disableForSelector = '.text.html .comment, .source.css .comment, .source.css .string, .source.sass .comment, .source.sass .string, .source.css.postcss .comment, source.css.postcss .string';
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

		if (lastComponent.length < 3) {
			return [];
		}

		let lastComponentLower = lastComponent.toLowerCase();
		let wordSuggestions = suggestions.filter((suggestion) => {
			let textLower = suggestion.toLowerCase();
			return textLower.startsWith(lastComponentLower);
		});

		if (!wordSuggestions.length) {
			return [];
		}

		if (wordSuggestions.length > 3) {
			wordSuggestions = wordSuggestions.slice(0,4);
		}

		let synonymSuggestions = wordSuggestions.map((suggestion) => {
			let sList = synonyms[suggestion];
			return sList.map((s) => {
				return {
					value:s,
					synonymFor:suggestion
				};
			});
		});

		if (synonymSuggestions.length) {
			synonymSuggestions = synonymSuggestions.reduce((a,b) => {
				return a.concat(b);
			});
		}

		matchingSuggestions = synonymSuggestions.map((suggestion) => {
			suggestion.value = prefix.substr(0, prefix.lastIndexOf(lastComponent)) + suggestion.value;
			return suggestion;
		});

		// run each matching suggestion through inflateSuggestion() and return
		return matchingSuggestions.map(this.inflateSuggestion);
	}

	// clones a suggestion object to a new object with some shared additions
	// cloning also fixes an issue where selecting a suggestion won't insert it
	inflateSuggestion(suggestion) {
		return {
			text: suggestion.value,
			type: 'value',
			rightLabel: suggestion.synonymFor+' br'
		};
	}
}
export default new BrotliProvider();
