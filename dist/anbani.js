!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define("anbani",[],e):"object"==typeof exports?exports.anbani=e():t.anbani=e()}(this,(function(){return(()=>{"use strict";var t={d:(e,r)=>{for(var i in r)t.o(r,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:r[i]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e)},e={};t.d(e,{default:()=>O});const r={alphabets:{names:["ან","ბან","გან","დონ","ენ","ვინ","ზენ","თან","ინ","კან","ლას","მან","ნარ","ონ","პარ","ჟან","რაე","სან","ტარ","უნ","ფარ","ქან","ღან","ყარ","შინ","ჩინ","ცან","ძილ","წილ","ჭარ","ხან","ჯან","ჰაე","ეჲ","ჲე","ჳე","ჴარ","ჰოე","ჶი","ჷნ","ჸინ","გან ამოტრიალებული","აინ ამოტრიალებული","გამყოფი","ნარ მოდიფიკატორი","აენ","სიმაგრის ნიშანი","ლაბიალიზაციის ნიშანი","ა-უმლაუტი","ა-მაკრონი","ა-მაკრონ-უმლაუტი","ე-მაკრონი","ი-მაკრონი","ო-უმლაუტი","ო-მაკრონი","ო-მაკრონ-უმლაუტი","უ-უმლაუტი","უ-მაკრონი","უ-მაკრონ-უმლაუტი","უ-ბრჯგუ","ჷნ-მაკრონი"],mkhedruli:["ა","ბ","გ","დ","ე","ვ","ზ","თ","ი","კ","ლ","მ","ნ","ო","პ","ჟ","რ","ს","ტ","უ","ფ","ქ","ღ","ყ","შ","ჩ","ც","ძ","წ","ჭ","ხ","ჯ","ჰ","ჱ","ჲ","ჳ","ჴ","ჵ","ჶ","ჷ","ჸ","ჹ","ჺ","჻","ჼ","ჽ","ჾ","ჿ","ა̈","ა̄","ა̄̈","ე̄","ი̄","ო̈","ო̄","ო̄̈","უ̈","უ̄","უ̄̈","უ̂","ჷ̄"],mtavruli:["Ა","Ბ","Გ","Დ","Ე","Ვ","Ზ","Თ","Ი","Კ","Ლ","Მ","Ნ","Ო","Პ","Ჟ","Რ","Ს","Ტ","Უ","Ფ","Ქ","Ღ","Ყ","Შ","Ჩ","Ც","Ძ","Წ","Ჭ","Ხ","Ჯ","Ჰ","Ჱ","Ჲ","Ჳ","Ჴ","Ჵ","Ჶ","Ჷ","Ჸ","Ჹ","Ჺ","᲻","᲼","Ჽ","Ჾ","Ჿ","","","","","","","","","","","","",""],asomtavruli:["Ⴀ","Ⴁ","Ⴂ","Ⴃ","Ⴄ","Ⴅ","Ⴆ","Ⴇ","Ⴈ","Ⴉ","Ⴊ","Ⴋ","Ⴌ","Ⴍ","Ⴎ","Ⴏ","Ⴐ","Ⴑ","Ⴒ","Ⴓ","Ⴔ","Ⴕ","Ⴖ","Ⴗ","Ⴘ","Ⴙ","Ⴚ","Ⴛ","Ⴜ","Ⴝ","Ⴞ","Ⴟ","Ⴠ","Ⴡ","Ⴢ","Ⴣ","Ⴤ","Ⴥ","჆","Ⴧ","჈","჉","჊","჋","჌","Ⴭ","჎","჏","","","","","","","","","","","","",""],nuskhuri:["ⴀ","ⴁ","ⴂ","ⴃ","ⴄ","ⴅ","ⴆ","ⴇ","ⴈ","ⴉ","ⴊ","ⴋ","ⴌ","ⴍ","ⴎ","ⴏ","ⴐ","ⴑ","ⴒ","ⴓ","ⴔ","ⴕ","ⴖ","ⴗ","ⴘ","ⴙ","ⴚ","ⴛ","ⴜ","ⴝ","ⴞ","ⴟ","ⴠ","ⴡ","ⴢ","ⴣ","ⴤ","ⴥ","⴦","ⴧ","⴨","⴩","⴪","⴫","⴬","ⴭ","⴮","⴯","","","","","","","","","","","","",""],homoglyph:["ⴢ","ձ","ଌ","ᕦ","၅","ᧆ","୫","ᦎ","‎ᦵ","૩","ⴝ","ⴋ","চ","ᦂ","Ჴ","ળ","ᦝ","ᒑ","கு","᧗","ᦀ","ⴕ","ⴜ","ᧇ","𑇤","ⴌ","ઉ","ᑻ","წ","ჭ","ᕹ","ⴟ","Ჱ","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],phonetic:["ɑ","b","g","d","ɛ","v","z","tʰ","i","k'","l","m","n","ɔ","p'","ʒ","r","s","t'","u","pʰ","kʰ","ʁ","q'","ʃ","t͡ʃ","t͡s","d͡z","t͡sʼ","t͡ʃʼ","χ","d͡ʒ","h","eɪ","j","w","qʰ","oː","f","ə","ʔ","ɢ","ʕ","","◌̃","ə","","","","","","","","","","","","","","",""],common:["a","b","g","d","e","v","z","t","i","k","l","m","n","o","p","zh","r","s","t","u","f","q","gh","y","sh","ch","c","dz","ts","tch","x","j","h","e","i","ui","x","hoi","f","oa","h","gh","rgh","","","oa","","","","","","","","","","","","","","",""],cyrillic:["а","б","г","д","е","в","з","т","и","к","л","м","н","о","п","ж","р","с","т","у","ф","к","г","к","ш","ч","ц","дз","тц","тч","х","дж","х","е","й","уй","х","хо","ф","оа","х","г","рг","","","оа","","","","","","","","","","","","","","",""],greek:["α","μπ","γγ","ντ","ε","β","ζ","τ","η","κ","λ","μ","ν","ο","π","ζͱ","ρ","σ","τ","ου","ψ","κ","γ","κͱ","σͱ","τσ","τσ","δζ","τσ","τσͱ","γχ","τζ","ͱ","ε","ι","υι","κχ","ͱοι","φ","οα","ͱ","γ","ργ","","","οα","","","","","","","","","","","","","","",""],armenian:["ա","բ","գ","դ","է","վ","զ","թ","ի","կ","լ","մ","ն","օ","պ","ժ","ռ","ս","տ","ու","փ","ք","ղ","կհ","շ","չ","ց","ձ","ծ","ճ","խ","ջ","հ","է","ի","ուի","խ","հօի","ֆ","ը","հ","ղ","ռղ","","","ը","","","","","","","","","","","","","","",""],iso_9984:["a","b","g","d","e","v","z","t'","i","k","l","m","n","o","p","ž","r","s","t","u","p'","k'","ḡ","q","š","č'","c'","j","c","č","x","ǰ","h","ē","y","w","ẖ'","ō","f","","","","","","","","","","","","","","","","","","","","","",""],national:["a","b","g","d","e","v","z","t","i","k'","l","m","n","o","p'","zh","r","s","t'","u","p","k","gh","q'","sh","ch","ts","dz","ts'","ch'","kh","j","h","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],bgn:["a","b","g","d","e","v","z","t'","i","k","l","m","n","o","p","zh","r","s","t","u","p'","k'","gh","q","sh","ch'","ts'","dz","ts","ch","kh","j","h","ey","j","","q'","","","","","","","","","","","","","","","","","","","","","","","",""],qwerty:["a","b","g","d","e","v","z","T","i","k","l","m","n","o","p","J","r","s","t","u","f","q","R","y","S","C","c","Z","w","W","x","j","h","E","I","V","X","H","F","D","Y","G","L",">","N","<","{","}","","","","","","","","","","","","",""],numeric:["1","2","3","4","5","6","7","9","10","20","30","40","50","70","80","90","100","200","300","400","500","600","700","800","900","1000","2000","3000","4000","5000","6000","8000","9000","8","60","400","7000","10000","","","","","","","","","","","","","","","","","","","","","","",""]},start:{mkhedruli:4304,mtavruli:7312,asomtavruli:4256,nuskhuri:11520,latin:97},regex:{mkhedruli:/[ა-ჰ]/,mtavruli:/[Ა-Ჰ]/,asomtavruli:/[Ⴀ-Ⴠ]/,nuskhuri:/[ⴀ-ⴠ]/,latin:/[a-zA-Z]/,cyrillic:/[А-Яа-я]/},frequency:{general:{".":.0458171705,",":.206860377,"!":.0143453122,"?":.00697748176},summed:[["?",.00697748176],["!",.02132279396],[".",.06713996445],[",",.27400034145]]},vefxwords:["გამიშვშეს","მართალიპი","შემომოცივე","ვუხვა","გავლსობა","განდევანგაა","მოასეხეს","აქამდსაგებენ","შვენინე","უგანდეგო","ქანულკულნი","გემრუფენ","ვეღათ","მივისცა","მუკამდის","მივიმოწუქალსა","მზლოს","მოვლეხვე","ვიმაქებდა","ტატრესტინი","მოითქოკა","მდაგებენ","ვიმცე","სევა","სათინესნი","სადგმო","გასჩვადეთ","მესმანცა","მივსცავე","წეითო","ძვილნი","გამიზრიან","დავათქვენო","ზიცი","მისცედი","მონებანი","დანამრისა","სრცოტი","ჰქონთავისთან","მბრძენია","წახსილთა","მიხსენით","სევნა","გარდუკვრიდდა","მიდამოდეს","სიპყრო","შემწოვლისა","მამდიჰხლეან","ბრჭნია","დანენატანნი","უკრთებოდემნი","იციცოდა","სამატა","უფრნა","გაეგარნების","დავეჯარენა","მტემურსა","მშვენოდენო","გიმძიმნო","სამვზინო","მოვლოცთა","გიშვილა","დაამჭებინ","მითხროს","მჟავალია","მღურა","ღინდეს","მოაგხება","გავიცეცხლი","ტირსლით","გავწყრეტა","მყივნენ","ქაფინს","ბანგსა","შემოხანა","შემოვსჭვრეტით","ამოვჰღერთო","მოცადია","მოეხვიდეს","თქმია","აღვია","ვლამს","მოხდიანები","გორსვლითა","გვთქვას","გაუზადა","დაბითქის","ანვინა","შრიდონი","გავწიდნია","ალვითანი","მონიო","სიტირენ","გიშიხარნი","დამიფემი","მეგრეცა","ფითჯი","მსდევარსა","განაზანდა","საქმინ"],fnames:["თავან","ელიკონ","კანტლიონ","გველე","ლადიან","ლოტინე","გიოლგვი","გარსა","თედა","მეზნან","მარტა","აურაზგრ","მადრა","გიოგილი","სონიკელიზანი","ასსანო","ნიგოლიტი","ავაკვან","მონს","ნადრინ","ნიფოლ","ელიკორ","დამას","გიმრი","ობარხი","გამონ","ონეს","ზიხტინე","იოკელ","სატდა","პარა","იანეზ","ზინა","რანგი","იანგორ","აბსინე","ლენტან","ზისტიკობ","ნიგოლო","დატითნი","მანთა","არგიქ","ზიკო","ერლე","იანე","მევრენ","ალტისა","მარდია","სისელ","ხეისა","ელუან","დელო","იეკლებ","გუჩილი","ტამა","ნოკგოლ","იაკისე","დადო","ართემრას","ანაიკობე","გტიტ","თახსან","ზანა","ნუდო","გიოდა","ისსლიკონ","ალსან","რამოლე","გუმან","ნურმგინ","თომითანი","დევანე","ელედეინ","გიმოტ","არარ","ორმონ","ნედრი","დიმო","ხოთიანეი","გივა","ნანტრე","გიმოლ","დოსონ","იკანენ","იკქორიზე","გილტორგ","დეტონ","ერდეა","ირეგლიზ","რიდელუდან","თოკან","იანებენტიანა","სიბო","გიორტინ","ნიკილან","ელაკონ","გიდრაბ","ლეცთეტანტენდერიბ","დამერ","იეგო"],lnames:["მახადენია","ბსელრია","ქავია","კორეკია","მარდია","ბარდიონია","გვიპიანდია","ერთელია","ნთხაია","თედია","ბოხაია","ბარია","ჭარტინია","არპანია","ჩურია","მორცაწაზია","არმელია","მირბარია","ჭველაქია","ქარითია","გართელია","იანია","დვანტონეიანია","პუჩია","დატილია","კანია","ვარდსვალია","ყორთელია","არდოლია","რიკსქაშვილი","გამექონთეშვილი","ლუჩაშვილი","მარდაშვილი","პაბიშვილი","არბერეშვილი","ფოსურიშვილი","ვაწოშვილი","ჩრილიაშვილი","ტიმაშვილი","მავანიშვილი","მადსიშვილი","რედელიშვილი","თეთაშვილი","გარავაშვილი","დარახაშვილი","ბარჭამიშვილი","ბარახაშვილი","ანღელიშვილი","მებაშვილი","სურეჯიშვილი","აკბთაკიშვილი","ტუსონიშვილი","ტოდერაშვილი","ზაბხასიშვილი","ქურაბერინიშვილი","ებვეკაშვილი","ერდითაშვილი","ურბელიშვილი","მენრმაშვილი","ჯვილოძე","ბადიაძე","შვირიძე","სასანაძე","გიმაანიძე","გვამავიძე","არმემიძსძე","ბარაძე","აბეანიძე","ოვონიძე","ლამაშვიძე","ობთახურაძე","კერეძე","ფვერიძე","მაგიძე","კადიაშიძე","გამსანიძე","მერტინიძე","ბემეელიძე","ტოხიძე","ჭარატიძე","ბადოსელი","ვარისელი","სირხელი","სორხელი","მარდელი","გაშვითელი","კოთაველი","ოსთმინელი","ერისელი","ზთერტელი","ხამიკელი","მიბაძეშიელი","იკთელი","გთციტაბელი","ასიცელი","ობაიჭელი","ლენთელი","მემჩათერინონგბანინიძე","ამედვაქსიკოგეიშვირი","მორჟვონანდიშვილი"]},i=t=>{var e={მხედრული:"mkhedruli",ასომთავრული:"asomtavruli",ნუსხური:"nuskhuri",მთავრული:"mtavruli",ხუცური:"khutsuri",შანიძისეული:"shanidziseuli",ტფილელისეული:"tfileliseuli","ანბანის მთავრული":"anbanismtavruli",ჰომოგლიფი:"homoglyph",ფონეტიკური:"phonetic",ლათინური:"qwerty",კირილიცა:"cyrillic",ბერძნული:"greek",სომხური:"armenian",ნაციონალური:"national",ქვერთი:"qwerty",ზოგადი:"common",ტრანსკრიფცია:"common",ისო:"iso_9984",ბგნ:"bgn"};Object.keys(e).forEach((function(r){r==t.from&&(t.from=e[r]),r==t.to&&(t.to=e[r])}))},l=t=>{if(-1==["mkhedruli","asomtavruli","nuskhuri","mtavruli","qwerty"].indexOf(t.from))throw`Text conversion from '${t.from}' is not supported.`},n=t=>"tfileliseuli"==t||"shanidziseuli"==t||"khutsuri"==t||"anbanismtavruli"==t;String.prototype.setCharAt=function(t,e,r){return r=r||0,t>this.length-1?this:this.substring(0,t)+e+this.substring(t+e.length+r)};const a=(t,e,i)=>{let l=r.alphabets[i][r.alphabets[e].indexOf(t[0])];return l=null==l?t[0]:l,t.setCharAt(0,l)},s=(t,e)=>e<0?"qwerty":r.regex.mkhedruli.test(t[e])?"mkhedruli":r.regex.latin.test(t[e])?"qwerty":r.regex.asomtavruli.test(t[e])?"asomtavruli":r.regex.mtavruli.test(t[e])?"mtavruli":r.regex.nuskhuri.test(t[e])?"nuskhuri":s(t,e-1),u=t=>{let e=[r.regex.mkhedruli.test(t),r.regex.mtavruli.test(t),r.regex.asomtavruli.test(t),r.regex.nuskhuri.test(t),r.regex.latin.test(t),r.regex.cyrillic.test(t)];return o(e,[!0,!1,!1,!1,!1,!1])?"mkhedruli":o(e,[!1,!0,!1,!1,!1,!1])?"mtavruli":o(e,[!1,!1,!0,!1,!1,!1])?"asomtavruli":o(e,[!1,!1,!1,!0,!1,!1])?"nuskhuri":o(e,[!0,!0,!1,!1,!1,!1])?"tfileliseuli":o(e,[!0,!1,!0,!1,!1,!1])?"shanidziseuli":o(e,[!1,!1,!0,!0,!1,!1])?"khutsuri":o(e,[!1,!0,!0,!1,!1,!1])?"anbanismtavruli":o(e,[!1,!1,!1,!1,!0,!1])?"latin":o(e,[!1,!1,!1,!1,!1,!0])?"cyrillic":e},o=(t,e)=>{for(let r=0,i=t.length;r<i;r++)if(t[r]!=e[r])return!1;return!0},h={checkForAliases:i,checkForDirection:l,isUnsupported:t=>[r.regex.cyrillic.test(t)].some((t=>1==t)),isBicameral:n,toUpperCase:a,detectAlphabet:s,classifyText:u,cca:t=>t.charCodeAt(0),fcc:t=>String.fromCharCode(t),isSame:o},m=(t,e,i)=>{let l="";for(let n=0,a=t.length;n<a;n++){let a=r.alphabets[i][r.alphabets[e].indexOf(t[n])];l+=void 0===a?t[n]:a}return l},c=(t,e,i)=>{const l={anbanismtavruli:{upper:"asomtavruli",lower:"mtavruli"},tfileliseuli:{upper:"mtavruli",lower:"mkhedruli"},shanidziseuli:{upper:"asomtavruli",lower:"mkhedruli"},khutsuri:{upper:"asomtavruli",lower:"nuskhuri"}};let n=l[i].upper,s=l[i].lower,u="";for(let i=0,l=t.length;i<l;i++){let l=r.alphabets[s][r.alphabets[e].indexOf(t[i])];u+=void 0===l?t[i]:l}u=a(u,s,n);let o=u.match(/[?.!]\s+[A-zႠ-ჰⴀ-ⴠᲐ-Ჰ0-9]/g);if(null!=o)for(let t=0;t<o.length;t++)u=u.setCharAt(u.indexOf(o[t]),o[t].substring(0,o[t].length-1).concat(a(o[t][o[t].length-1],s,n)));if(o=u.match(/[Ⴀ-ჰⴀ-ⴠᲐ-Ჰ]\'/g),null!=o)for(let t=0;t<o.length;t++)u=u.setCharAt(u.indexOf(o[t]),a(o[t][0],s,n),1);return u},f={convert:(t,e,r)=>{let a={from:e,to:r};return i(a),l(a),((t,e,r)=>{if(null!=t)return n(r)?c(t,e,r):m(t,e,r)})(t,a.from,a.to)},interpret:(t,e)=>{let r={to:e};if(i(r),null!=t)return n(r.to)?c(t,s(t,t.length-1),r.to):m(t,s(t,t.length-1),r.to)},$:u},p=r.frequency.summed;var d=r.vefxwords;const g=t=>{let e="";for(let r=0;r<t.length;r++)e+=t[r]+b();return e=e.trim(),e=e.setCharAt(e.length-1,".",1),e},k=()=>r.fnames[z(0,r.fnames.length)],v=()=>r.lnames[z(0,r.lnames.length)];String.prototype.setCharAt=function(t,e,r){return r=r||0,t>this.length-1?this:this.substring(0,t)+e+this.substring(t+e.length+r)};const b=()=>{let t=Math.random();for(let e=0;e<p.length;e++)if(t<p[e][1])return p[e][0]+" ";return" "},y=()=>d[z(0,d.length)],x=t=>{let e=[];for(let r=0;r<t;r++)e.push(y());return e},z=(t,e)=>Math.floor(Math.random()*(e-t)+t),w={sentences:t=>g(x(t)),paragraphs:(t,e,r="\n\n")=>{let i="";for(let l=0;l<e;l++)i+=g(x(t))+r;return i},loadWordlist:t=>{d=t},names:t=>{let e=[];for(let r=0;r<t;r++)e.push(k()+" "+v());return e},$:{randomFirstName:k,randomLastName:v,randomWord:y}},j=(t,e="[ა-ჰᲐ-ᲰႠ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]")=>{let r=t.toUpperCase().split(""),i=r.length,l={},n=new RegExp(e);for(let t=0;t<i;t++)n.test(r[t])&&(l[r[t]]?l[r[t]]++:l[r[t]]=1);return l},q={friedman:(t,e="[ა-ჰᲐ-ᲰႠ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]")=>{let r=j(t,e),i=0,l=0;for(let t in r)i+=r[t]*(r[t]-1),l+=r[t];return l>1?i/(l*(l-1)):0},frequency:(t,e="[ა-ჰᲐ-ᲰႠ-Ⴠⴀ-ⴠa-zA-ZА-Яа-я]")=>{let r=t.toUpperCase().split(""),i=r.length,l={},n=new RegExp(e);for(let t=0;t<i;t++)n.test(r[t])&&(l[r[t]]?l[r[t]]++:l[r[t]]=1);for(let t in l)l[t]/=i;return l},count:j};f.$={classifyText:h.classifyText};let A=Object.keys(r.alphabets).slice(0,4).concat(["khutsuri","shanidziseuli","tfileliseuli","anbanismtavruli"]).concat(Object.keys(r.alphabets).slice(4)),C={letters:{mkhedruli:r.alphabets.mkhedruli.join(""),asomtavruli:r.alphabets.asomtavruli.join(""),nuskhuri:r.alphabets.nuskhuri.join(""),mtavruli:r.alphabets.mtavruli.join("")},keys:A,caps:t=>f.convert(t,"mkhedruli","mtavruli"),bicam:t=>f.convert(t,"mkhedruli","shanidziseuli"),bicaps:t=>f.convert(t,"mkhedruli","anbanismtavruli")};const O={core:f,lorem:w,toolkit:q,data:r,utils:h,ab:C};return e.default})()}));