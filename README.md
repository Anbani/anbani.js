# Anbani

[![tests](https://github.com/Anbani/anbani.js/actions/workflows/test.yml/badge.svg)](https://github.com/Anbani/anbani.js/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/Anbani/anbani.js/branch/master/graph/badge.svg)](https://codecov.io/gh/Anbani/anbani.js)
[![npm](https://img.shields.io/npm/v/anbani)](https://www.npmjs.com/package/anbani)
[![node](https://img.shields.io/node/v/anbani)](https://www.npmjs.com/package/anbani)
[![license](https://img.shields.io/npm/l/anbani)](LICENSE)

**Anbani** is a multifunctional toolkit designed for Georgian Alphabet. Main functionalities include text conversion between various Georgian alphabets via `anbani.core` and random text generation via `anbani.lorem`. 



# Installation
To install the package simple grab it from `npm`
```bash
npm install anbani
```
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
  ├─ nlp
  │  ├─ contractions   { expand, expandText, contract, contractText }
  │  ├─ georgianisation { georgianise, latinise }
  │  └─ preprocessing  { wordTokenize, sentenceTokenize, paragraphTokenize, cleanup }
  └─ data
    ├─ ab
    │  ├─ mkhedruli [String]
    │  ├─ asomtavruli [String]
    │  ├─ nuskhuri [String]
    │  └─ mtavruli [String]
    ├─ keys [Array]
    └─ lorem
        ├─ firstNames [Array]
        ├─ lastNames [Array]
        └─ words [Array]
```

# Usage

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
|names|ქანანრაეთანუნლასინ|დონანვინინთან ანღანმანანშინენნარენბანენლასინ ქანანრაეთანვინენლასთანან წილმანინნარდონანნარინან|
|mkhedruli|ქართული|დავით აღმაშენებელი ქართველთა წმინდანია|
|mtavruli|ᲥᲐᲠᲗᲣᲚᲘ|ᲓᲐᲕᲘᲗ ᲐᲦᲛᲐᲨᲔᲜᲔᲑᲔᲚᲘ ᲥᲐᲠᲗᲕᲔᲚᲗᲐ ᲬᲛᲘᲜᲓᲐᲜᲘᲐ|
|asomtavruli|ႵႠႰႧႳႪႨ|ႣႠႥႨႧ ႠႶႫႠႸႤႬႤႡႤႪႨ ႵႠႰႧႥႤႪႧႠ ႼႫႨႬႣႠႬႨႠ|
|khutsuri|Ⴕⴀⴐⴇⴓⴊⴈ|Ⴃⴀⴅⴈⴇ ⴀⴖⴋⴀⴘⴄⴌⴄⴁⴄⴊⴈ ⴕⴀⴐⴇⴅⴄⴊⴇⴀ ⴜⴋⴈⴌⴃⴀⴌⴈⴀ|
|shanidziseuli|Ⴕართული|Ⴃავით აღმაშენებელი ქართველთა წმინდანია|
|tfileliseuli|Ქართული|Დავით აღმაშენებელი ქართველთა წმინდანია|
|sasataure|ႵᲐᲠᲗᲣᲚᲘ|ႣᲐᲕᲘᲗ ᲐᲦᲛᲐᲨᲔᲜᲔᲑᲔᲚᲘ ᲥᲐᲠᲗᲕᲔᲚᲗᲐ ᲬᲛᲘᲜᲓᲐᲜᲘᲐ|
|nuskhuri|ⴕⴀⴐⴇⴓⴊⴈ|ⴃⴀⴅⴈⴇ ⴀⴖⴋⴀⴘⴄⴌⴄⴁⴄⴊⴈ ⴕⴀⴐⴇⴅⴄⴊⴇⴀ ⴜⴋⴈⴌⴃⴀⴌⴈⴀ|
|homoglyph|ⴕⴢᦝᦎ᧗ⴝ‎ᦵ|ᕦⴢᧆ‎ᦵᦎ ⴢⴜⴋⴢ𑇤၅চ၅ձ၅ⴝ‎ᦵ ⴕⴢᦝᦎᧆ၅ⴝᦎⴢ წⴋ‎ᦵচᕦⴢচ‎ᦵⴢ|
|phonetic|kʰɑrtʰuli|dɑvitʰ ɑʁmɑʃɛnɛbɛli kʰɑrtʰvɛltʰɑ t͡sʼmindɑniɑ|
|braille|⠻⠁⠗⠋⠥⠇⠊|⠙⠁⠺⠊⠋ ⠁⠫⠍⠁⠱⠑⠝⠑⠃⠑⠇⠊ ⠻⠁⠗⠋⠺⠑⠇⠋⠁ ⠹⠍⠊⠝⠙⠁⠝⠊⠁|
|common|qartuli|davit aghmashenebeli qartvelta tsmindania|
|cyrillic|картули|давит агмашенебели картвелта тцминданиа|
|greek|καρτουλη|νταβητ αγμασͱενεμπελη καρτβελτα τσμηνντανηα|
|armenian|քառթուլի|դավիթ աղմաշէնէբէլի քառթվէլթա ծմինդանիա|
|iso_9984|k'art'uli|davit' aḡmašenebeli k'art'velt'a cmindania|
|national|kartuli|davit aghmashenebeli kartvelta ts'mindania|
|bgn|k'art'uli|davit' aghmashenebeli k'art'velt'a tsmindania|
|titus|kartuli|davit aġmašenebeli kartvelta c̣mindania|
|qwerty|qarTuli|daviT aRmaSenebeli qarTvelTa wmindania|
|numeric|600110094003010|416109 17004019005505253010 60011009653091 40004010504150101|



If you are wondering what Georgian alphabets look like, or what's the difference between all these latinizations here's the table for that as well. Note: if you are not seeing Mtavruli, that's because it was recently added to Unicode and rollout will probably take a while. You can grab DejaVu fonts that support Mtavruli already.


|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|-|
|names|ან|ბან|გან|დონ|ენ|ვინ|ზენ|თან|ინ|კან|ლას|მან|ნარ|ონ|პარ|ჟან|რაე|სან|ტარ|უნ|ფარ|ქან|ღან|ყარ|შინ|ჩინ|ცან|ძილ|წილ|ჭარ|ხან|ჯან|ჰაე|ეჲ|ჲე|ჳე|ჴარ|ჰოე|ჶი|ჷნ|ჸინ|გან ამოტრიალებული|აინ ამოტრიალებული|გამყოფი|ნარ მოდიფიკატორი|აენ|სიმაგრის ნიშანი|ლაბიალიზაციის ნიშანი|ა-უმლაუტი|ა-მაკრონი|ა-მაკრონ-უმლაუტი|ე-მაკრონი|ი-მაკრონი|ო-უმლაუტი|ო-მაკრონი|ო-მაკრონ-უმლაუტი|უ-უმლაუტი|უ-მაკრონი|უ-მაკრონ-უმლაუტი|უ-ბრჯგუ|ჷნ-მაკრონი|წერტილი|მძიმე|კითხვის ნიშანი|ძახილის ნიშანი|წერტილ-მძიმე|ორწერტილი|
|mkhedruli|ა|ბ|გ|დ|ე|ვ|ზ|თ|ი|კ|ლ|მ|ნ|ო|პ|ჟ|რ|ს|ტ|უ|ფ|ქ|ღ|ყ|შ|ჩ|ც|ძ|წ|ჭ|ხ|ჯ|ჰ|ჱ|ჲ|ჳ|ჴ|ჵ|ჶ|ჷ|ჸ|ჹ|ჺ|჻|ჼ|ჽ|ჾ|ჿ|ა̈|ა̄|ა̄̈|ე̄|ი̄|ო̈|ო̄|ო̄̈|უ̈|უ̄|უ̄̈|უ̂|ჷ̄|.|,|?|!|;|:|
|mtavruli|Ა|Ბ|Გ|Დ|Ე|Ვ|Ზ|Თ|Ი|Კ|Ლ|Მ|Ნ|Ო|Პ|Ჟ|Რ|Ს|Ტ|Უ|Ფ|Ქ|Ღ|Ყ|Შ|Ჩ|Ც|Ძ|Წ|Ჭ|Ხ|Ჯ|Ჰ|Ჱ|Ჲ|Ჳ|Ჴ|Ჵ|Ჶ|Ჷ|Ჸ|Ჹ|Ჺ|||Ჽ|Ჾ|Ჿ||||||||||||||.|,|?|!|;|:|
|asomtavruli|Ⴀ|Ⴁ|Ⴂ|Ⴃ|Ⴄ|Ⴅ|Ⴆ|Ⴇ|Ⴈ|Ⴉ|Ⴊ|Ⴋ|Ⴌ|Ⴍ|Ⴎ|Ⴏ|Ⴐ|Ⴑ|Ⴒ|Ⴓ|Ⴔ|Ⴕ|Ⴖ|Ⴗ|Ⴘ|Ⴙ|Ⴚ|Ⴛ|Ⴜ|Ⴝ|Ⴞ|Ⴟ|Ⴠ|Ⴡ|Ⴢ|Ⴣ|Ⴤ|Ⴥ||||||||||||||||||||||||.|,|?|!|;|:|
|nuskhuri|ⴀ|ⴁ|ⴂ|ⴃ|ⴄ|ⴅ|ⴆ|ⴇ|ⴈ|ⴉ|ⴊ|ⴋ|ⴌ|ⴍ|ⴎ|ⴏ|ⴐ|ⴑ|ⴒ|ⴓ|ⴔ|ⴕ|ⴖ|ⴗ|ⴘ|ⴙ|ⴚ|ⴛ|ⴜ|ⴝ|ⴞ|ⴟ|ⴠ|ⴡ|ⴢ|ⴣ|ⴤ|ⴥ||||||||||||||||||||||||.|,|?|!|;|:|
|homoglyph|ⴢ|ձ|ଌ|ᕦ|၅|ᧆ|୫|ᦎ|‎ᦵ|૩|ⴝ|ⴋ|চ|ᦂ|Ჴ|ળ|ᦝ|ᒑ|கு|᧗|ᦀ|ⴕ|ⴜ|ᧇ|𑇤|ⴌ|ઉ|ᑻ|წ|ჭ|ᕹ|ⴟ|Ჱ|||||||||||||||||||||||||||||.|,|?|!|;|:|
|phonetic|ɑ|b|g|d|ɛ|v|z|tʰ|i|k'|l|m|n|ɔ|p'|ʒ|r|s|t'|u|pʰ|kʰ|ʁ|q'|ʃ|t͡ʃ|t͡s|d͡z|t͡sʼ|t͡ʃʼ|χ|d͡ʒ|h|eɪ|j|w|qʰ|oː|f|ə|ʔ|ɢ|ʕ||◌̃|ə||||||||||||||||.|,|?|!|;|:|
|braille|⠁|⠃|⠛|⠙|⠑|⠺|⠵|⠋|⠊|⠅|⠇|⠍|⠝|⠕|⠏|⠚|⠗|⠎|⠞|⠥|⠧|⠻|⠫|⠮|⠱|⠟|⠉|⠽|⠹|⠭|⠓|⠪|⠯|||||||||||⠌||||||||||||||||||⠲|⠂|⠦|⠖|⠆|⠒|
|common|a|b|g|d|e|v|z|t|i|k|l|m|n|o|p|zh|r|s|t|u|f|q|gh|y|sh|ch|c|dz|ts|tch|x|j|h|e|i|ui|x|hoi|f|oa|h|gh|rgh|||oa||||||||||||||||.|,|?|!|;|:|
|cyrillic|а|б|г|д|е|в|з|т|и|к|л|м|н|о|п|ж|р|с|т|у|ф|к|г|к|ш|ч|ц|дз|тц|тч|х|дж|х|е|й|уй|х|хо|ф|оа|х|г|рг|||оа||||||||||||||||.|,|?|!|;|:|
|greek|α|μπ|γγ|ντ|ε|β|ζ|τ|η|κ|λ|μ|ν|ο|π|ζͱ|ρ|σ|τ|ου|ψ|κ|γ|κͱ|σͱ|τσ|τσ|δζ|τσ|τσͱ|γχ|τζ|ͱ|ε|ι|υι|κχ|ͱοι|φ|οα|ͱ|γ|ργ|||οα||||||||||||||||.|,|?|!|;|:|
|armenian|ա|բ|գ|դ|է|վ|զ|թ|ի|կ|լ|մ|ն|օ|պ|ժ|ռ|ս|տ|ու|փ|ք|ղ|կհ|շ|չ|ց|ձ|ծ|ճ|խ|ջ|հ|է|ի|ուի|խ|հօի|ֆ|ը|հ|ղ|ռղ|||ը||||||||||||||||.|,|?|!|;|:|
|iso_9984|a|b|g|d|e|v|z|t'|i|k|l|m|n|o|p|ž|r|s|t|u|p'|k'|ḡ|q|š|č'|c'|j|c|č|x|ǰ|h|ē|y|w|ẖ'|ō|f|||||||||||||||||||||||.|,|?|!|;|:|
|national|a|b|g|d|e|v|z|t|i|k'|l|m|n|o|p'|zh|r|s|t'|u|p|k|gh|q'|sh|ch|ts|dz|ts'|ch'|kh|j|h|||||||||||||||||||||||||||||.|,|?|!|;|:|
|bgn|a|b|g|d|e|v|z|t'|i|k|l|m|n|o|p|zh|r|s|t|u|p'|k'|gh|q|sh|ch'|ts'|dz|ts|ch|kh|j|h|ey|j||q'|||||||||||||||||||||||||.|,|?|!|;|:|
|titus|a|b|g|d|e|v|z|t|i|ḳ|l|m|n|o|ṗ|ž|r|s|ṭ|u|p|k|ġ|q̇|š|č|c|ӡ|c̣|č̣|x|ǯ|h|ē|y|w|q|ō||||||||||||||||||||||||.|,|?|!|;|:|
|qwerty|a|b|g|d|e|v|z|T|i|k|l|m|n|o|p|J|r|s|t|u|f|q|R|y|S|C|c|Z|w|W|x|j|h|E|I|V|X|H|F|D|Y|G|L|>|N|<|{|}||||||||||||||.|,|?|!|;|:|
|numeric|1|2|3|4|5|6|7|9|10|20|30|40|50|70|80|90|100|200|300|400|500|600|700|800|900|1000|2000|3000|4000|5000|6000|8000|9000|8|60|400|7000|10000||||||||||||||||||||||||.|,|?|!|;|:|




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
Here's a RunKit note for the package [https://npm.runkit.com/anbani](https://npm.runkit.com/anbani)
```javascript
const anbani = require("anbani")

// Core module
console.log( anbani.core.convert("ქართული ანბანი", "მხედრული", "შანიძისეული") )
console.log( anbani.core.interpret("vefxistyaosani", "asomtavruli") )

// Lorem module
console.log( anbani.lorem.sentences(7) ) // param: number of words in total
console.log( anbani.lorem.paragraphs(10, 2) ) // params: number of words per paragraph, number of paragraphs
anbani.lorem.loadWordlist(["ანი", "ბანი"]) // load custom dataset
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

## NLP
Ported from [anbani.py](https://github.com/Anbani/anbani.py): expand/contract Georgian abbreviations, georgianise sloppy qwerty into Georgian, latinise back, and tokenize.
```javascript
anbani.nlp.contractions.expandText("ვნახოთ ა. შ.")
// 'ვნახოთ ასე შემდეგ'

anbani.nlp.georgianisation.georgianise("gamarjoba")          // default 'balanced'
// 'გამარჯობა'
anbani.nlp.georgianisation.georgianise("gamarjoba", "fast")  // no ngram table

anbani.nlp.preprocessing.wordTokenize("გამარჯობა, მსოფლიო!")
// ['გამარჯობა', 'მსოფლიო']
```
`georgianise`'s `balanced` mode uses a ~400KB ngram table that ships for Node only; in the browser bundle it throws (use `fast`). `accurate` mode is a Python-only extra.

## Command line
Installing the package also installs an `anbani` command:
```bash
anbani interpret "gamarjoba"                      # -> ᲒᲐᲛᲐᲠᲯᲝᲑᲐ
anbani convert "ანბანი" mkhedruli asomtavruli
anbani georgianise "gamarjoba"
anbani expand "ვნახოთ ა. შ."
anbani lorem 8
```

## Interactive TUI

New in 3.1: a full-screen terminal UI. Launch it with `anbani tui`, or just run
`anbani` with no arguments inside a terminal (piped/non-TTY use still prints the
usage help). Zero extra dependencies — it is hand-rolled ANSI.

```bash
anbani tui
```

Five tabs, switch with `1`–`5` or `tab` / `shift+tab`:

| Tab | What it does |
|-----|--------------|
| **Converter** | live transliteration; `m` toggles auto/manual, `f`/`o` pick source/target, `s` swaps |
| **Alphabet** | letter grid + detail card; `hjkl` to move, `c` cycles script, `a` toggles archaic, `enter` copies |
| **Lorem** | fake Georgian text; `k` kind, `+`/`-` amount, `g` generate |
| **NLP** | georgianise / latinise / expand / contract; `m` mode, `b` georgianise level |
| **Toolkit** | letter-frequency bars + Friedman index of coincidence |

Global keys: `?` help overlay · `i`/`enter` edit · `y` copy (via OSC 52) ·
`q` or `ctrl+c` quit. Minimum terminal size is 60×16.

Notes:
- No Georgian keyboard? Pick `from: qwerty` in the Converter (type Latin, get
  Georgian), or paste — bracketed paste is supported in edit mode.
- Copy uses OSC 52; some terminals block it, in which case the copy silently does
  nothing.

## Parity with anbani.py
anbani.js and [anbani.py](https://github.com/Anbani/anbani.py) share one behavior contract, proved in CI by the byte-identical `spec/golden.json` both test suites run. Feature-equivalent as of 3.0; the only intentional gaps are the browser/UMD bundle (js-only) and `ebook2text` (Python-only).

## 3.0 — breaking changes
- Package is now GPL-3.0 (was MIT); ESM by default (`"type":"module"` + `exports` map) — deep imports of `src/lib/*` are no longer allowed, use the public API.
- `core.convert` / `core.interpret` **throw** an `Error` on an unsupported source or target (was a silent passthrough).
- `core.interpret` throws when the source script can't be detected (mixed / undetectable input); `utils.classifyText` returns `"unknown"` there and reports the four bicameral scripts.

# What else
The code is under the GPL-3.0 license, freely distributed for anyone who wants to use it (just don't forget to mention the source). 

Pull requests and collabs are most welcome!

Cheers,  
[George](https://github.com/georgegach) [჻](https://i.imgur.com/ZeuIZQE.jpg) [anbani.ge](https://anbani.ge/)
___
