# Table sources

What each conversion table in `src/lib/data.mjs` (= anbani.py `anbani/data/letters.js`) follows. Opened 2026-10-25.
"Convention" = no published source found; our choice, kept consistent.

## Latin
| Table | Source | Notes |
|---|---|---|
| `national` | National system 2002 (State Dept. of Geodesy and Cartography + Institute of Linguistics); Presidential Decree No. 109, 2011-02-24 (matsne.gov.ge document 1216954); UNGEGN WGRS report v4.1 (2018) | 33 letters. Ejectives k' p' t' q' ts' ch'. Decree prints ’ (U+2019); ISO 9984:2026 uses ' (U+0027), as we do. |
| `national_simplified` | State Language Department, Georgian-to-Latin transliteration guidelines (2019-2020, Bulletin II, ISBN 978-9941-480-63-8); cited by ISO 9984:2026's introduction | No apostrophes: კ/ქ k, პ/ფ p, ტ/თ t, წ/ც ts, ჭ/ჩ ch, ყ q. For signs, notices, geographical and personal names; not for academic use. |
| `iso_9984` | ISO 9984:1996 as tabulated in T. T. Pedersen, transliteration.eki.ee/pdf/Georgian.pdf | Withdrawn: ISO 9984:2026 (Ed. 2) replaces it with the national system plus 10 reversibility modifications (its Table 4, paywalled, not implemented). ჴ ẖ. |
| `bgn` | BGN/PCGN 1981 (NGA sheet); UNGEGN v4.1 | Retired in 2009 for the national system. 33 letters; the archaic values sometimes quoted (ჱ ey, ჲ j, ჴ q') are Pedersen's bracketed extrapolations, not BGN, so they are left out. |
| `titus` | Pedersen's TITUS column | ძ ʒ (U+0292). |
| `common` | Convention (social-media practice) | |

## IPA (`phonetic`)
- Modern letters: Shosted & Chikovani, "Standard Georgian", JIPA 36(2), 2006. Unaspirated affricates t͡s t͡ʃ (aspiration is disputed), aspirated stops pʰ tʰ kʰ, ejectives ʼ (U+02BC). ღ ʁ, ხ χ (Shosted & Chikovani write ɣ x; uvular is the other common reading).
- ჹ ɢ; ჼ nasalises the preceding vowel (written as a combining tilde): Everson, Unicode proposal N2608R2.
- ჶ f: N1962. ჽ æ, ჷ ə (Svan/Mingrelian; ɨ in Ossetian): N3775.
- ჱ ej: TUGboat 19(3), 1998 (secondary).
- Convention: ჳ w, ჴ qʰ, ჵ oː, ჸ ʔ, ჺ ʕ (no value in the Unicode proposals; Aronson and Hewitt not yet checked).

## Cyrillic, Greek, Armenian
- `cyrillic`: GUGK instruction for Georgian place names in Russian (Donidze, 1972, §5): პ/ფ п, წ/ც ц, ჭ/ჩ ч, ყ к, ღ г, ხ/ჰ х. Not applied: ე → э word-initially. Archaic letters: convention.
- `greek`: no standard. Modern letters follow Greek Wikipedia's spelling of Georgian names (ფ π, ხ χ, გ γκ, ბ μπ, დ ντ, შ σ, ჭ/ჩ/წ/ც τσ, ძ/ჯ τζ, ყ κ, ი ι). ჟ, ჰ and archaic letters: convention.
- `armenian`: no standard. ყ ղ follows Armenian Wikipedia's Georgian place names. Rest: convention.

## Numerals (`numeric`)
ა1 … თ9, ი10 … ჟ90, რ100 … ყ800, შ900, ჩ1000 … ჰ9000, ჵ10000; archaic ჱ8, ჲ60, ჳ400, ჴ7000. Agreeing tables: English
Wikipedia "Georgian numerals" (after Makharoblidze, *A Short Grammar of Georgian*, 2009) and Georgian Wikipedia
"ქართული ანბანი". Open: უ. English Wikipedia gives it 400, like ჳ; Georgian Wikipedia leaves it out of the system. We
keep 400 (convention) until a primary source (Shanidze, Makharoblidze) is opened.

## Unicode
- Asomtavruli Ⴧ U+10C7 / Ⴭ U+10CD and Nuskhuri ⴧ U+2D27 / ⴭ U+2D2D (YN, AEN): Unicode 6.1.
- U+10FA is GEORGIAN LETTER AIN (`names`).
