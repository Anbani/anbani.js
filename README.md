**Anbani** is a multifunctional toolkit designed for Georgian Alphabet. Main functionalities include text conversion between various Georgian alphabets via `anbani.core` and random text generation via `anbani.lorem`. 



# Installation
To install the package simple grab it from `npm`
```bash
npm install anbani
```
# Structure
Here's the structure of the package with four main modules: `core` for conversion and interpretation of letters, `lorem` for random text generation, `data` for accessing the datasets, and `toolkit` for bonus features.

Minor features from each module are exposed in `$`, such as `anbani.core.$.*` and `anbani.lorem.$.*`.
```javascript
anbani
  ├─ core
  │  ├─ convert [Function]
  │  ├─ interpret [Function]
  │  └─ $
  │     └─ classifyText [Function]
  ├─ lorem
  │  ├─ sentences [Function]
  │  ├─ paragraphs [Function]
  │  ├─ loadWordlist [Function]
  │  ├─ names [Function]
  │  └─ $
  │     ├─ randomFirstName [Function]
  │     ├─ randomLastName [Function]
  │     └─ randomWord [Function]
  ├─ toolkit
  │  ├─ friedman [Function]
  │  ├─ frequency [Function]
  │  └─ count [Function]
  └─ data
    ├─ ab
    │  ├─ mkhedruli [String]
    │  ├─ asomtavruli [String]
    │  ├─ nuskhuri [String]
    │  └─ mtavruli [String]
    └─ lorem
        ├─ firstNames [Array]
        ├─ lastNames [Array]
        └─ words [Array]
```

# Usage
Initialize package in CommonJS format as follows
```javascript
const anbani = require('anbani')
```
Load the module in ESM definition like this
```javascript
import anbani from "anbani";
```
You may use it in browser via `window` global
```html
<script src="https://cdn.jsdelivr.net/npm/anbani@latest/dist/anbani.js"></script>
```
To try modern `module` definition in browsers you may include directly from source. (Notice `src` directory in URL) 
```html
<script type="module">
  import anbani from "https://cdn.jsdelivr.net/npm/anbani@latest/src/anbani.mjs";
  ...
</script>
```

## Conversion
`anbani.core.convert` supports all of the Georgian unicameral and bicameral alphabets for conversion listed bellow and even more. Note that you may use Georgian and Latin letters to pass parameters. It's just a less headache. 
```javascript
// convert(TEXT, FROM, TO)

anbani.core.convert("ანბანი", "მხედრული", "ასომთავრული")
// 'ႠႬႡႠႬႨ'

anbani.core.convert("ანბანი", "mkhedruli", "ნუსხური")
// 'ⴀⴌⴁⴀⴌⴈ'
```

Georgian also has bicameral styles of the alphabet. If you first hear about that now, check out [this article](https://medium.com/@georgegach/%E1%83%A5%E1%83%90%E1%83%A0%E1%83%97%E1%83%A3%E1%83%9A%E1%83%98-%E1%83%9B%E1%83%97%E1%83%90%E1%83%95%E1%83%A0%E1%83%A3%E1%83%9A%E1%83%94%E1%83%91%E1%83%98%E1%83%A1-%E1%83%A8%E1%83%94%E1%83%A1%E1%83%90%E1%83%AE%E1%83%94%E1%83%91-5c2d376ff3ac). 
Generally, automatic capitalization occurs at the beginning of the sentence. However, you can also append the letter with `'` symbol in order to capitalize the word during conversion. This trick also works at [anbani.ge](http://anbani.ge) as well. Here's an example
```javascript
anbani.core.convert("ა'ნბანი", "მხედრული", "შანიძისეული")
// 'Ⴀნბანი'

anbani.core.convert("ი'ყო ა'რაბეთს რ'ოსტევან", "mkhedruli", "shanidziseuli")
// 'Ⴈყო Ⴀრაბეთს Ⴐოსტევან'
```

Here are all of the conversions supported. Note that you may convert `to` any of these types but not all of them are supported to be converted `from`. In other words, you can only convert from Mkhedruli, Asomtavruli, Nuskhuri, Mtavruli, and Qwerty, since there is no 1-to-1 relation amongst others. 

|               | word      | sentence                             |
|---------------|-----------|--------------------------------------|
| mkhedruli     | ქართული  | იყო არაბეთს როსტევან               |
| asomtavruli   | ႵႠႰႧႳႪႨ | ႨႷႭ ႠႰႠႡႤႧႱ ႰႭႱႲႤႥႠႬ        |
| nuskhuri      | ⴕⴀⴐⴇⴓⴊⴈ | ⴈⴗⴍ ⴀⴐⴀⴁⴄⴇⴑ ⴐⴍⴑⴒⴄⴅⴀⴌ           |
| mtavruli      | ᲥᲐᲠᲗᲣᲚᲘ | ᲘᲧᲝ ᲐᲠᲐᲑᲔᲗᲡ ᲠᲝᲡᲢᲔᲕᲐᲜ    |
| khutsuri      | Ⴕⴀⴐⴇⴓⴊⴈ | Ⴈⴗⴍ ⴀⴐⴀⴁⴄⴇⴑ ⴐⴍⴑⴒⴄⴅⴀⴌ    |
| shanidziseuli | Ⴕართული | Ⴈყო არაბეთს როსტევან    |
| tfileliseuli  | Ქართული | Იყო არაბეთს როსტევან    |
| phonetic      | kʰɑrtʰulɪ | ɪq'ɔ ɑrɑbɛtʰs rɔst'ɛvɑn |
| transcription | kartuli   | iqo arabets rost'evan   |
| iso_9984      | k'art'uli | iqo arabet's rostevan   |
| common        | kartuli   | iyo arabets rostevan    |
| qwerty        | qarTuli   | iyo arabeTs rostevan    |


If you are wondering what Georgian alphabets look like, or what's the difference between all these latinizations here's the table for that as well. Note: if you are not seeing Mtavruli, that's because it was recently added to Unicode and rollout will probably take a while. You can grab DejaVu fonts that support Mtavruli already.

|mkhedruli|ა|ბ|გ|დ|ე|ვ|ზ|თ|ი|კ|ლ|მ|ნ|ო|პ|ჟ|რ|ს|ტ|უ|ფ|ქ|ღ|ყ|შ|ჩ|ც|ძ|წ|ჭ|ხ|ჯ|ჰ|ჱ|ჲ|ჳ|ჴ|ჵ|ჶ|ჷ|ჸ|ჹ|ჺ|ჽ|
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|asomtavruli|Ⴀ|Ⴁ|Ⴂ|Ⴃ|Ⴄ|Ⴅ|Ⴆ|Ⴇ|Ⴈ|Ⴉ|Ⴊ|Ⴋ|Ⴌ|Ⴍ|Ⴎ|Ⴏ|Ⴐ|Ⴑ|Ⴒ|Ⴓ|Ⴔ|Ⴕ|Ⴖ|Ⴗ|Ⴘ|Ⴙ|Ⴚ|Ⴛ|Ⴜ|Ⴝ|Ⴞ|Ⴟ|Ⴠ|Ⴡ|Ⴢ|Ⴣ|Ⴤ|Ⴥ||||||Ⴭ|
|nuskhuri|ⴀ|ⴁ|ⴂ|ⴃ|ⴄ|ⴅ|ⴆ|ⴇ|ⴈ|ⴉ|ⴊ|ⴋ|ⴌ|ⴍ|ⴎ|ⴏ|ⴐ|ⴑ|ⴒ|ⴓ|ⴔ|ⴕ|ⴖ|ⴗ|ⴘ|ⴙ|ⴚ|ⴛ|ⴜ|ⴝ|ⴞ|ⴟ|ⴠ|ⴡ|ⴢ|ⴣ|ⴤ|ⴥ||||||ⴭ|
|mtavruli|Ა|Ბ|Გ|Დ|Ე|Ვ|Ზ|Თ|Ი|Კ|Ლ|Მ|Ნ|Ო|Პ|Ჟ|Რ|Ს|Ტ|Უ|Ფ|Ქ|Ღ|Ყ|Შ|Ჩ|Ც|Ძ|Წ|Ჭ|Ხ|Ჯ|Ჰ|Ჱ|Ჲ|Ჳ|Ჴ|Ჵ|Ჶ||||||
|qwerty|a|b|g|d|e|v|z|T|i|k|l|m|n|o|p|J|r|s|t|u|f|q|R|y|S|C|c|Z|w|W|x|j|h|E|I|V|X|H|F|D|Y|G|L||
|common|a|b|g|d|e|v|z|t|i|k|l|m|n|o|p|zh|r|s|t|u|f|k|g|y|sh|ch|c|dz|w\'|ch\'|x|j|h||||||||||||
|transcription|a|b|g|d|e|v|z|t|i|k\'|l|m|n|o|p\'|zh|r|s|t\'|u|p|k|gh|q|sh|ch|ts|dz|ts\'|ch\'|kh|j|h||||||||||||
|ISO_9984|a|b|g|d|e|v|z|t\'|i|k|l|m|n|o|p|ž|r|s|t|u|p\'|k\'|ḡ|q|š|č\'|c\'|j|c|č|kh|ǰ|h|ē|y|w|ẖ\'|ō|f||||||
|phonetic|ɑ|b|g|d|ɛ|v|z|tʰ|ɪ|k\'|l|m|n|ɔ|p\'|ʒ|r|s|t\'|u|pʰ|kʰ|ɣ|q\'|ʃ|tʃ|ts|dz|ts\'|tʃʼ|x|dʒ|h|ɛj|j|wi|q|hɔɛ|f|ə|ʔ|ɢ|ʕ||

## Interpretation
Apart from straightforward conversion, the package also supports interpretation capabilities via `anbani.core.interpret`, which automagically detects the language of the text and converts to desired `to` parameter script.
```javascript
// function interpret(TEXT, TO)

anbani.core.interpret("iyo arabeTs rostevan mefe RmrTisagan sviani", "mkhedruli")
// 'იყო არაბეთს როსტევან მეფე ღმრთისაგან სვიანი'
```

## Random text generation
`anbani.lorem` supports random text and names generation in Georgian via `anbani.lorem.sentences`, `anbani.lorem.paragraphs`, and `anbani.lorem.names`. Unlike other packages, `anbani.lorem` utilizes wordlists generated using Neural Networks [CHAR-RNN by Andrej Karpathy](http://karpathy.github.io/2015/05/21/rnn-effectiveness/) that represents truly fake Georgian words with all the statistics preserved. The network was trained on Georgian epic "The Knight with the Panther Skin" (ვეფხისტყაოსანი) and the names of Georgian poets and writers. Corresponding repo will be forthcoming. 

Here's an example for name generation:
```javascript
anbani.lorem.names(3)
// ['დამერ გაშვითელი', 'სიბო ყორთელია', 'გიმოლ ვაწოშვილი']
```

Here's an example for sentence generation:
```javascript
// function sentences(WORD_COUNT)

anbani.lorem.sentences(10)
// 'მოეხვიდეს სიტირენ გიშიხარნი. წეითო გამიზრიან, ჰქონთავისთან გემრუფენ, უკრთებოდემნი მესმანცა მყივნე.'
```

Here's an example for paragraph generation:
```javascript
// function paragraphs(
//    WORD_COUNT_PER_PARAGRAPH, 
//    PARAGRAPH_COUNT, 
//    NEWLINE_CHAR="\n\n"
// )

anbani.lorem.paragraphs(20,3)
```
>განდევანგაა მოეხვიდეს შემოვსჭვრეტით ჰქონთავისთან, დავეჯარენა მეგრეცა. ტატრესტინი. შემოვსჭვრეტით გაუზადა ალვითანი გამიშვშეს მუკამდის შემოხანა, მოვლოცთა მესმანცა შემოხანა შემწოვლისა გასჩვადეთ, დაბითქის სათინესნი.
>
>მყივნენ, დავათქვენო განაზანდა მართალიპი სიპყრო ჰქონთავისთან. სიტირენ, წახსილთა, აქამდსაგებენ მოაგხება მივისცა გამიშვშეს, მტემურსა მოცადია მტემურსა ტატრესტინი, გიშვილა. იციცოდა წეითო, მყივნე.
>
>სიპყრო, მშვენოდენო მივისცა უკრთებოდემნი სამატა მოასეხეს ტირსლით სიპყრო? გამიშვშეს სევნა! მართალიპი ვიმცე. უგანდეგო აქამდსაგებენ მიხსენით მზლოს მეგრეცა მტემურსა მითხროს მამდიჰხლეა.'


Note that none of the words generated occur in the training dataset (the poem), but rather are built to mimic underlying constructs of the language. This makes the text feel fully Georgian while actually meaning nothing (which is good, since you don't need to worry about awkward permutation that might ever occur). 

Alternatively, you can load up your own wordlist if you want. 

```javascript
anbani.lorem.loadWordlist(["კაპიკი", "გაკაპიკებულა", "საკაპიკეში", "ჩაკაპიკებულა"])

anbani.lorem.sentences(7)
// 'გაკაპიკებულა კაპიკი ჩაკაპიკებულა კაპიკი! გაკაპიკებულა ჩაკაპიკებულა საკაპიკეში.'
```

## Toolkit
As some bonus features, you can calculate letter frequency of the text and Friedman score (coincidence index). 
```javascript
var text = "იყო არაბეთს როსტევან მეფე ღმრთისაგან სვიანი"

anbani.toolkit.friedman(text)
// 0.06116642958748222

anbani.toolkit.frequency(text)
/*
{ 
  'ი': 0.09302325581395349,
  'ყ': 0.023255813953488372,  
  'ო': 0.046511627906976744,  
  'ა': 0.13953488372093023,  
  'რ': 0.06976744186046512,  
  'ბ': 0.023255813953488372,  
  'ე': 0.09302325581395349,                                 
  'თ': 0.046511627906976744,  
  'ს': 0.09302325581395349,  
  'ტ': 0.023255813953488372,
  'ვ': 0.046511627906976744,  
  'ნ': 0.06976744186046512,  
  'მ': 0.046511627906976744,
  'ფ': 0.023255813953488372,  
  'ღ': 0.023255813953488372,  
  'გ': 0.023255813953488372 
}
*/

```

## RunKit
Here's a RunKit note for the package [https://npm.runkit.com/anbani](https://runkit.com/georgegach/5aa03ca329a82c001295c09e)
```javascript
var anbani = require("anbani")

// Core module
console.log( anbani.core.convert("ქართული ანბანი", "მხედრული", "შანიძისეული") )
console.log( anbani.core.interpret("vefxistyaosani", "asomtavruli") )

// Lorem module
console.log( anbani.lorem.sentences(7) ) // param: number of words in total
console.log( anbani.lorem.paragraphs(10, 2) ) // params: number of words per paragraph, number of paragraphs
anbani.lorem.loadWordlist(["სუპი", "სოუზი"]) // load custom dataset
console.log( anbani.lorem.sentences(7) )
console.log( anbani.lorem.names(3) ) // param: number of names

// Working with texts
var text = `რომელმან შექმნა სამყარო ძალითა მით ძლიერითა,
ზეგარდმო არსნი სულითა ყვნა ზეცით მონაბერითა,
ჩვენ, კაცთა, მოგვცა ქვეყანა, გვაქვს უთვალავი ფერითა,
მისგან არს ყოვლი ხელმწიფე სახითა მის მიერითა.`
console.log(`Friedman score: ${anbani.toolkit.friedman(text)}`)

var converted = anbani.core.convert(text, "mkhedruli", "khutsuri")
console.log(`The given text is in '${anbani.core.$.classifyText(converted)}' style`)


````

# What else
The code is under MIT license, freely distributed for anyone who wants to use it (just don't forget to mention the source). 

Pull requests and collabs are most welcome!

Cheers,  
George ჻ anbani.ge
