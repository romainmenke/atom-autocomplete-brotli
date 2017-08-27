# atom-autocomplete-brotli

Autocomplete for Atom powered by Brotli Dictionary.

---

### General Concept

The idea behind this tool was the fact that brotli uses a static dictionary. A list of things it already knows how to compress. The general idea was to create a tool that makes it easy to write html/css class names using only words from that dictionary. The expected effect was a smaller compression table and reduced bandwidth.

A thesaurus was mated with the brotli dictionary to suggest words with similar meaning as what you are typing. The suggested words are all native to the brotli dictionary.

I however greatly underestimated the awesomeness of brotli. (it didn't need my help)

This was tested on a 150kb html file. I created a variant with and without class names taken from the brotli dictionary. Both were the exact same size. I gzipped these and both were still the exact same size. Then I compressed both with brotli. The result was a 20 bytes file size decrease. So it works, sort off. It just isn't really worth it.

I also compared parsing/rendering times in chrome and there was no clear difference. The only real positive effect was a ±10% decrease in compression time (non-streaming).

---

### What it is

Since this is not a magic tool that helps you get more from brotli it needs a new purpose, a new raison d'être.

It could be a battery testing tool as iterating the data is a bit intensive.

Or it might be a "word of the day" plugin were you learn a new word from the brotli dictionary.

Personally I like it as an english autocomplete that plays nice with BEM but that is just me and I created this useless thing, so please don't take my advice.

----

(p.s. I tested this on one file, your mileage might vary, no guarantees on the 20 bytes size reduction)
