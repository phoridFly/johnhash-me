// the dictionary for standard codons
codons = {TTT: 'Phe', TTC: 'Phe', TTA: 'Leu', TTG: 'Leu',
CTT: 'Leu', CTC: 'Leu', CTA: 'Leu', CTG: 'Leu',
ATT: 'Ile', ATC: 'Ile', ATA: 'Ile',
ATG: 'Met',
GTT: 'Val', GTC: 'Val', GTA: 'Val', GTG: 'Val',
TCT: 'Ser', TCC: 'Ser', TCA: 'Ser', TCG: 'Ser',
CCT: 'Pro', CCC: 'Pro', CCA: 'Pro', CCG: 'Pro',
ACT: 'Thr', ACC: 'Thr', ACA: 'Thr', ACG: 'Thr',
GCT: 'Ala', GCC: 'Ala', GCA: 'Ala', GCG: 'Ala',
TAT: 'Tyr', TAC: 'Tyr',
TAA: 'XXX', TAG: 'XXX',
CAT: 'His', CAC: 'His',
CAA: 'Gin', CAG: 'Gin',
AAT: 'Asn', AAC: 'Asn',
AAA: 'Lys', AAG: 'Lys',
GAT: 'Asp', GAC: 'Asp',
GAA: 'Glu', GAG: 'Glu',
TGT: 'Cys', TGC: 'Cys',
TGA: 'XXX',
TGG: 'Trp',
CGT: 'Arg', CGC: 'Arg', CGA: 'Arg', CGG: 'Arg',
AGT: 'Ser', AGC: 'Ser',
AGA: 'Arg', AGG: 'Arg',
GGT: 'Gly', GGC: 'Gly', GGA: 'Gly', GGG: 'Gly'}

// converstion for the invertebrate mitochondrial code
codonsInvertMito = {TTT: 'Phe', TTC: 'Phe', TTA: 'Leu', TTG: 'Leu',
CTT: 'Leu', CTC: 'Leu', CTA: 'Leu', CTG: 'Leu',
ATT: 'Ile', ATC: 'Ile', 
ATA: 'Met', ATG: 'Met',
GTT: 'Val', GTC: 'Val', GTA: 'Val', GTG: 'Val',
TCT: 'Ser', TCC: 'Ser', TCA: 'Ser', TCG: 'Ser',
CCT: 'Pro', CCC: 'Pro', CCA: 'Pro', CCG: 'Pro',
ACT: 'Thr', ACC: 'Thr', ACA: 'Thr', ACG: 'Thr',
GCT: 'Ala', GCC: 'Ala', GCA: 'Ala', GCG: 'Ala',
TAT: 'Tyr', TAC: 'Tyr',
TAA: 'XXX', TAG: 'XXX',
CAT: 'His', CAC: 'His',
CAA: 'Gin', CAG: 'Gin',
AAT: 'Asn', AAC: 'Asn',
AAA: 'Lys', AAG: 'Lys',
GAT: 'Asp', GAC: 'Asp',
GAA: 'Glu', GAG: 'Glu',
TGT: 'Cys', TGC: 'Cys',
TGA: 'Trp', TGG: 'Trp',
CGT: 'Arg', CGC: 'Arg', CGA: 'Arg', CGG: 'Arg',
AGT: 'Ser', AGC: 'Ser', AGA: 'Ser', AGG: 'Ser',
GGT: 'Gly', GGC: 'Gly', GGA: 'Gly', GGG: 'Gly'}

document.getElementById('translate').addEventListener('click', translate);

// translate function controls all the other functions
function translate() {

    // DNA_string is the user's input
    let DNA_string = document.getElementById('DNAinput').value.toUpperCase();

    // check if the invertebrate mitochondrial box is checked
    // standard by default
    let invertMitoGeneticCode = document.getElementById("InvertMitoGeneticCode");
    var codonLibraryType = 'standard';
    if (invertMitoGeneticCode.checked) {
        codonLibraryType = 'invertMito';
    }

    var codonArray1 = [];
    var codonArray2 = [];
    var codonArray3 = [];
    var codonArray4 = [];
    var codonArray5 = [];
    var codonArray6 = [];

    var aminoArray1 = [];
    var aminoArray2 = [];
    var aminoArray3 = [];
    var aminoArray4 = [];
    var aminoArray5 = [];
    var aminoArray6 = [];

    // reading frame 1
    dnaSplitter(0, DNA_string, codonArray1);
    //console.log(codonArray1);
    aminoMatch (aminoArray1, codonArray1, codonLibraryType);
    //console.log(aminoArray1);

    // reading frame 2
    dnaSplitter(1, DNA_string, codonArray2);
    //console.log(codonArray2);
    aminoMatch (aminoArray2, codonArray2, codonLibraryType);
    //console.log(aminoArray2);

    // reading frame 3
    dnaSplitter(2, DNA_string, codonArray3);
    //console.log(codonArray3);
    aminoMatch (aminoArray3, codonArray3, codonLibraryType);
    //console.log(aminoArray3);

    // code for manipulating DOM to show the translated sequences
    // displaying the translation based on the first frame
    let spaceChar = " ";

    let amArr1 = aminoArray1.toString();
    amArr1 = amArr1.split(',').join(spaceChar);
    document.getElementById('frame1').textContent = amArr1;

    // displaying the translation based on the second frame
    let amArr2 = aminoArray2.toString();
    amArr2 = amArr2.split(',').join(spaceChar);
    document.getElementById('frame2').textContent = amArr2;

    // displaying the translation based on the third frame
    let amArr3 = aminoArray3.toString();
    amArr3 = amArr3.split(',').join(spaceChar);
    document.getElementById('frame3').textContent = amArr3;

}

// dnaSplitter takes the starting position i, a dna string, and array to push to
function dnaSplitter(i, string, codonArray) {
    let stringLen = string.length;
    for (i; i < stringLen; i += 3){
        codonArray.push(string.substring(i,i+3));
    }  
}

// aminoMatch takes an empty acid array and pushes to it
// it also takes an array of codon triplets
function aminoMatch (aminoArray, codonArray, codonLibrary) {
    for (let i = 0; i < codonArray.length; i++){
        let val = codonArray[i];

        if (codonLibrary == 'invertMito') {
            for (let invertTriplet in codonsInvertMito){
                if(invertTriplet == val) {
                    aminoArray.push(codonsInvertMito[invertTriplet]);
                }
            } 
        }
        else {
            for (let triplet in codons){
                if(triplet == val) {
                    aminoArray.push(codons[triplet]);
                }
            }  
        }    
    }
}


    
