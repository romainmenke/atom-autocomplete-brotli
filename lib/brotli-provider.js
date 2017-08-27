'use babel';

// data source is a simple array of strings
import suggestions from '../data/brotli_list.json';
import synonyms from '../data/brotli_thes.json';

class BrotliProvider {

	constructor() {
		this.selector = [
			'.text.html',
			'.source.css',
			'.source.sass',
			'.source.css.postcss'
		].join(', ');

		this.disableForSelector = [
			'.text.html .comment',
			'.text.html .entity.other.attribute-name.html',
			'.text.html .entity.name.tag.block.any.html',
			'.source.css .comment',
			'.source.css .string',
			'.source.css .meta.property-list.css',
			'.source.css .meta.property-value.css',
			'.source.sass .comment',
			'.source.sass .string',
			'.source.sass .meta.property-list.sass',
			'.source.sass .meta.property-value.sass',
			'.source.css.postcss .comment',
			'.source.css.postcss .string',
			'.source.css.postcss .meta.property-list.postcss',
			'.source.css.postcss .meta.property-value.postcss'
		].join(', ');

		this.inclusionPriority = 1;
		this.excludeLowerPriority = false;
		this.suggestionPriority = -1;
	}

	getSuggestions(options) {
		const { prefix } = options;

		// only look for suggestions after 3 characters have been typed
		if (prefix.length >= 2) {
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

		if (lastComponent.length < 2) {
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
			description: 'known brotli words',
			rightLabel: suggestion.synonymFor,
			text: suggestion.value,
			type: 'brotli'
		};
	}
}
export default new BrotliProvider();
