const data = {};

data.alphabets = {
    // Modern unicameral Georgian script developed in 10th century 
    mkhedruli : [
        'ა','ბ','გ','დ','ე','ვ','ზ','თ','ი','კ','ლ',
        'მ','ნ','ო','პ','ჟ','რ','ს','ტ','უ','ფ','ქ',
        'ღ','ყ','შ','ჩ','ც','ძ','წ','ჭ','ხ','ჯ','ჰ',
        'ჱ','ჲ','ჳ','ჴ','ჵ',
        'ჶ','ჷ','ჸ','ჹ','ჺ',
        '჻','ჼ','ჽ','ჾ','ჿ',
    ],

    // Modern unicameral derivative script of Mkhedruli only used for headlines in all-caps
    mtavruli : [
        'Ა','Ბ','Გ','Დ','Ე','Ვ','Ზ','Თ','Ი','Კ','Ლ',
        'Მ','Ნ','Ო','Პ','Ჟ','Რ','Ს','Ტ','Უ','Ფ','Ქ',
        'Ღ','Ყ','Შ','Ჩ','Ც','Ძ','Წ','Ჭ','Ხ','Ჯ','Ჰ',
        'Ჱ','Ჲ','Ჳ','Ჴ','Ჵ',
        'Ჶ','Ჷ','Ჸ','Ჹ','Ჺ',
        '᲻','᲼','Ჽ','Ჾ','Ჿ',
    ],

    // Original Georgian alphabet from 5th century
    asomtavruli : [
        'Ⴀ','Ⴁ','Ⴂ','Ⴃ','Ⴄ','Ⴅ','Ⴆ','Ⴇ','Ⴈ','Ⴉ','Ⴊ',
        'Ⴋ','Ⴌ','Ⴍ','Ⴎ','Ⴏ','Ⴐ','Ⴑ','Ⴒ','Ⴓ','Ⴔ','Ⴕ',
        'Ⴖ','Ⴗ','Ⴘ','Ⴙ','Ⴚ','Ⴛ','Ⴜ','Ⴝ','Ⴞ','Ⴟ','Ⴠ',
        'Ⴡ','Ⴢ','Ⴣ','Ⴤ','Ⴥ',
        '჆','Ⴧ','჈','჉','჊',
        '჋','჌','Ⴭ','჎','჏',
    ],

    // Second script of Georgian alphabet first appearing in 9th century
    nuskhuri : [
        'ⴀ','ⴁ','ⴂ','ⴃ','ⴄ','ⴅ','ⴆ','ⴇ','ⴈ','ⴉ','ⴊ',
        'ⴋ','ⴌ','ⴍ','ⴎ','ⴏ','ⴐ','ⴑ','ⴒ','ⴓ','ⴔ','ⴕ',
        'ⴖ','ⴗ','ⴘ','ⴙ','ⴚ','ⴛ','ⴜ','ⴝ','ⴞ','ⴟ','ⴠ',
        'ⴡ','ⴢ','ⴣ','ⴤ','ⴥ',
        '⴦','ⴧ','⴨','⴩','⴪',
        '⴫', '⴬', 'ⴭ', '⴮', '⴯',
    ],

    // Collection of letters from all around the world that resemble Mkhedruli
    homoglyph : [
        'ⴢ','ձ','ଌ','ᕦ','၅','ᧆ','୫','ᦎ','ᦵ','૩','ⴝ',
        'ⴋ','চ','ᦂ','Ჴ','ળ','ᦝ','ᒑ','கு','᧗','ᦀ','ⴕ',
        'ⴜ','ᧇ','𑇤','ⴌ','ઉ','ᑻ','წ','ჭ','ᕹ','ⴟ','Ჱ',
        '','','','','',
        '','','','','',
        '','','','','',
    ],

    // Zalgo crazy text using diacritics
    // zalgo : [],
    
    // International Phonetic Association (IPA) 
    phonetic : [
        "ɑ","b","g","d","ɛ","v","z","tʰ","i","k'","l",
        "m","n","ɔ","p'","ʒ","r","s","t'","u","pʰ","kʰ",
        "ʁ","q'","ʃ","t͡ʃ","t͡s","d͡z","t͡sʼ'","t͡ʃʼ","χ","d͡ʒ","h",
        "eɪ","j","w","qʰ","oː",
        "f","ə","ʔ","ɢ","ʕ",
        "","◌̃","ə","","",
    ],

    // Commonly adopted romanization as seen on social media
    common : [
        "a","b","g","d","e","v","z","t","i","k","l",
        "m","n","o","p","zh","r","s","t","u","f","q",
        "gh","y","sh","ch","c","dz","ts","tch","x","j","h",
        "e","i","ui","x","hoi",
        "f","oa","h","gh","rgh",
        "","","oa","","",
    ],

    // Georgian alphabet cyrillization 
    cyrillic : [
        "а","б","г","д","е","в","з","т","и","к","л",
        "м","н","о","п","ж","р","с","т","у","ф","к",
        "г","к","ш","ч","ц","дз","тц","тч","х","дж","х",
        "е","й","уй","х","хо",
        "ф","оа","х","г","рг",
        "","","оа","","",
    ],

    // Georgian alphabet hellenization 
    greek : [
        'α','μπ','γγ','ντ','ε','β','ζ','τ','η','κ','λ',
        'μ','ν','ο','π','ζͱ','ρ','σ','τ','ου','ψ','κ',
        'γ','κͱ','σͱ','τσ','τσ','δζ','τσ','τσͱ','γχ','τζ','ͱ',
        'ε','ι','υι','κχ','ͱοι',
        'φ','οα','ͱ','γ','ργ',
        '','','οα','',''
    ],

    // Georgian alphabet armenianization 
    armenian : [
        'ա','բ','գ','դ','է','վ','զ','թ','ի','կ','լ',
        'մ','ն','օ','պ','ժ','ռ','ս','տ','ու','փ','ք',
        'ղ','կհ','շ','չ','ց','ձ','ծ','ճ','խ','ջ','հ',
        'է','ի','ուի','խ','հօի',
        'ֆ','ը','հ','ղ','ռղ',
        '','','ը','','',
    ],

    // International Standards Organization (http://www.iso.ch) as shown in Apridonidze et al. and UNGEGN
    iso_9984 : [
        "a","b","g","d","e","v","z","t'","i","k","l",
        "m","n","o","p","ž","r","s","t","u","p'","k'",
        "ḡ","q","š","č'","c'","j","c","č","x","ǰ","h",
        "ē","y","w","ẖ'","ō",
        "f","","","","",
        "","","","","",
    ],

    //  The national system of romanization adopted in February 2002 by the State Department of Geodesy and Cartography of Georgia and the Institute of Linguistics, Georgian Academy of Sciences
    national : [
        "a","b","g","d","e","v","z","t","i","k'","l",
        "m","n","o","p'","zh","r","s","t'","u","p","k",
        "gh","q'","sh","ch","ts","dz","ts'","ch'","kh","j","h",
        "","","","","",
        "","","","","",
        "","","","","",
    ],

    // Iberiul-K’avk’asiuri enatmetsnierebis ts’elits’deuli [Annual of Ibero-Caucasian Linguistics] as shown in The World’s Writing Systems. Variant forms separated with a slash
    // ike : [],

    // American Library Association/Library of Congress.
    // ala_lc : [],


    // Kohanimeandmebaas (Place Names Database) of Eesti Keele Instituut (Institute of the Estonian Language) (http://www.eki.ee).
    // knab : [],

    // United States Board on Geographic Names and the Permanent Committee on Geographical Names for British Official Use
    bgn : [
        "a","b","g","d","e","v","z","t'","i","k","l",
        "m","n","o","p","zh","r","s","t","u","p'","k'",
        "gh","q","sh","ch'","ts'","dz","ts","ch","kh","j","h",
        "ey","j","","q'","",
        "","","","","",
        "","","","","",
    ],

    // Thesaurus Indogermanischer Text- und Sprachmaterialien (http://titus.uni-frankfurt.de)
    // titus : []

    // Latin to Georgian QWERTY keyboard mapping used for older fonts
    qwerty : [
        "a","b","g","d","e","v","z","T","i","k","l",
        "m","n","o","p","J","r","s","t","u","f","q",
        "R","y","S","C","c","Z","w","W","x","j","h",
        "E","I","V","X","H",
        "F","D","Y","G","L",
        ">","N","<","{","}",
    ],

    // Numeric values
    numeric : [
        "1","2","3","4","5","6","7","9","10","20","30",
        "40","50","70","80","90","100","200","300","400","500","600",
        "700","800","900","1000","2000","3000","4000","5000","6000","8000","9000",
        "8","60","400","7000","10000",
        "","","","","",
        "","","","","",
    ],

    // See also http://transliteration.eki.ee/pdf/Georgian.pdf
}

data.start = {
    mkhedruli: 4304,
    mtavruli: 7312,
    asomtavruli: 4256,
    nuskhuri: 11520,
    latin: 97
}

data.regex = {
    mkhedruli: /[ა-ჰ]/,
    mtavruli: /[Ა-Ჰ]/,
    asomtavruli: /[Ⴀ-Ⴠ]/,
    nuskhuri: /[ⴀ-ⴠ]/,
    latin: /[a-zA-Z]/,
    cyrillic: /[А-Яа-я]/
}

/* Frequencies for (for Vefxistyaosani)
- words - 40989
- dot - 1878
- comma - 8479
- exclamation - 588
- question - 286
*/
data.frequency = {
    general : {
        '.' : 0.0458171705,
        ',' : 0.206860377,
        '!' : 0.0143453122,
        '?': 0.00697748176,
    },

    summed : [
        ['?', 0.00697748176],
        ['!', 0.02132279396],
        ['.', 0.06713996445],
        [',', 0.27400034145]
    ]
}

// 100 random words generated using char-rnn 
data.vefxwords = [
    'გამიშვშეს',
    'მართალიპი',
    'შემომოცივე',
    'ვუხვა',
    'გავლსობა',
    'განდევანგაა',
    'მოასეხეს',
    'აქამდსაგებენ',
    'შვენინე',
    'უგანდეგო',
    'ქანულკულნი',
    'გემრუფენ',
    'ვეღათ',
    'მივისცა',
    'მუკამდის',
    'მივიმოწუქალსა',
    'მზლოს',
    'მოვლეხვე',
    'ვიმაქებდა',
    'ტატრესტინი',
    'მოითქოკა',
    'მდაგებენ',
    'ვიმცე',
    'სევა',
    'სათინესნი',
    'სადგმო',
    'გასჩვადეთ',
    'მესმანცა',
    'მივსცავე',
    'წეითო',
    'ძვილნი',
    'გამიზრიან',
    'დავათქვენო',
    'ზიცი',
    'მისცედი',
    'მონებანი',
    'დანამრისა',
    'სრცოტი',
    'ჰქონთავისთან',
    'მბრძენია',
    'წახსილთა',
    'მიხსენით',
    'სევნა',
    'გარდუკვრიდდა',
    'მიდამოდეს',
    'სიპყრო',
    'შემწოვლისა',
    'მამდიჰხლეან',
    'ბრჭნია',
    'დანენატანნი',
    'უკრთებოდემნი',
    'იციცოდა',
    'სამატა',
    'უფრნა',
    'გაეგარნების',
    'დავეჯარენა',
    'მტემურსა',
    'მშვენოდენო',
    'გიმძიმნო',
    'სამვზინო',
    'მოვლოცთა',
    'გიშვილა',
    'დაამჭებინ',
    'მითხროს',
    'მჟავალია',
    'მღურა',
    'ღინდეს',
    'მოაგხება',
    'გავიცეცხლი',
    'ტირსლით',
    'გავწყრეტა',
    'მყივნენ',
    'ქაფინს',
    'ბანგსა',
    'შემოხანა',
    'შემოვსჭვრეტით',
    'ამოვჰღერთო',
    'მოცადია',
    'მოეხვიდეს',
    'თქმია',
    'აღვია',
    'ვლამს',
    'მოხდიანები',
    'გორსვლითა',
    'გვთქვას',
    'გაუზადა',
    'დაბითქის',
    'ანვინა',
    'შრიდონი',
    'გავწიდნია',
    'ალვითანი',
    'მონიო',
    'სიტირენ',
    'გიშიხარნი',
    'დამიფემი',
    'მეგრეცა',
    'ფითჯი',
    'მსდევარსა',
    'განაზანდა',
    'საქმინ',
]

data.fnames = [
    'თავან',
    'ელიკონ',
    'კანტლიონ',
    'გველე',
    'ლადიან',
    'ლოტინე',
    'გიოლგვი',
    'გარსა',
    'თედა',
    'მეზნან',
    'მარტა',
    'აურაზგრ',
    'მადრა',
    'გიოგილი',
    'სონიკელიზანი',
    'ასსანო',
    'ნიგოლიტი',
    'ავაკვან',
    'მონს',
    'ნადრინ',
    'ნიფოლ',
    'ელიკორ',
    'დამას',
    'გიმრი',
    'ობარხი',
    'გამონ',
    'ონეს',
    'ზიხტინე',
    'იოკელ',
    'სატდა',
    'პარა',
    'იანეზ',
    'ზინა',
    'რანგი',
    'იანგორ',
    'აბსინე',
    'ლენტან',
    'ზისტიკობ',
    'ნიგოლო',
    'დატითნი',
    'მანთა',
    'არგიქ',
    'ზიკო',
    'ერლე',
    'იანე',
    'მევრენ',
    'ალტისა',
    'მარდია',
    'სისელ',
    'ხეისა',
    'ელუან',
    'დელო',
    'იეკლებ',
    'გუჩილი',
    'ტამა',
    'ნოკგოლ',
    'იაკისე',
    'დადო',
    'ართემრას',
    'ანაიკობე',
    'გტიტ',
    'თახსან',
    'ზანა',
    'ნუდო',
    'გიოდა',
    'ისსლიკონ',
    'ალსან',
    'რამოლე',
    'გუმან',
    'ნურმგინ',
    'თომითანი',
    'დევანე',
    'ელედეინ',
    'გიმოტ',
    'არარ',
    'ორმონ',
    'ნედრი',
    'დიმო',
    'ხოთიანეი',
    'გივა',
    'ნანტრე',
    'გიმოლ',
    'დოსონ',
    'იკანენ',
    'იკქორიზე',
    'გილტორგ',
    'დეტონ',
    'ერდეა',
    'ირეგლიზ',
    'რიდელუდან',
    'თოკან',
    'იანებენტიანა',
    'სიბო',
    'გიორტინ',
    'ნიკილან',
    'ელაკონ',
    'გიდრაბ',
    'ლეცთეტანტენდერიბ',
    'დამერ',
    'იეგო',
]

data.lnames = [
    'მახადენია',
    'ბსელრია',
    'ქავია',
    'კორეკია',
    'მარდია',
    'ბარდიონია',
    'გვიპიანდია',
    'ერთელია',
    'ნთხაია',
    'თედია',
    'ბოხაია',
    'ბარია',
    'ჭარტინია',
    'არპანია',
    'ჩურია',
    'მორცაწაზია',
    'არმელია',
    'მირბარია',
    'ჭველაქია',
    'ქარითია',
    'გართელია',
    'იანია',
    'დვანტონეიანია',
    'პუჩია',
    'დატილია',
    'კანია',
    'ვარდსვალია',
    'ყორთელია',
    'არდოლია',
    'რიკსქაშვილი',
    'გამექონთეშვილი',
    'ლუჩაშვილი',
    'მარდაშვილი',
    'პაბიშვილი',
    'არბერეშვილი',
    'ფოსურიშვილი',
    'ვაწოშვილი',
    'ჩრილიაშვილი',
    'ტიმაშვილი',
    'მავანიშვილი',
    'მადსიშვილი',
    'რედელიშვილი',
    'თეთაშვილი',
    'გარავაშვილი',
    'დარახაშვილი',
    'ბარჭამიშვილი',
    'ბარახაშვილი',
    'ანღელიშვილი',
    'მებაშვილი',
    'სურეჯიშვილი',
    'აკბთაკიშვილი',
    'ტუსონიშვილი',
    'ტოდერაშვილი',
    'ზაბხასიშვილი',
    'ქურაბერინიშვილი',
    'ებვეკაშვილი',
    'ერდითაშვილი',
    'ურბელიშვილი',
    'მენრმაშვილი',
    'ჯვილოძე',
    'ბადიაძე',
    'შვირიძე',
    'სასანაძე',
    'გიმაანიძე',
    'გვამავიძე',
    'არმემიძსძე',
    'ბარაძე',
    'აბეანიძე',
    'ოვონიძე',
    'ლამაშვიძე',
    'ობთახურაძე',
    'კერეძე',
    'ფვერიძე',
    'მაგიძე',
    'კადიაშიძე',
    'გამსანიძე',
    'მერტინიძე',
    'ბემეელიძე',
    'ტოხიძე',
    'ჭარატიძე',
    'ბადოსელი',
    'ვარისელი',
    'სირხელი',
    'სორხელი',
    'მარდელი',
    'გაშვითელი',
    'კოთაველი',
    'ოსთმინელი',
    'ერისელი',
    'ზთერტელი',
    'ხამიკელი',
    'მიბაძეშიელი',
    'იკთელი',
    'გთციტაბელი',
    'ასიცელი',
    'ობაიჭელი',
    'ლენთელი',
    'მემჩათერინონგბანინიძე',
    'ამედვაქსიკოგეიშვირი',
    'მორჟვონანდიშვილი',
]

export default data