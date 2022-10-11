class ShiftCipher {
    constructor(numb) {
      this._numb = numb;
    }
  
    encrypt(string) {
      let encrStri = string.split("");// seperates into array
      encrStri = encrStri.map(st => st.toUpperCase());// array to Uppercase
      encrStri = encrStri.map(st => st.charCodeAt());// replaces characters with Unicode num
      encrStri = encrStri.map(st => {// replace
        let newCode = st + this._numb;// st + shiftAmount
        if(st >= 65 && st <= 90){// makes sure number is between 65-90 rules out ?!@$%
         if(newCode > 90){
            return st = newCode - 26;
          }
          return st = newCode;
        } else {
          return st = st;
        }
      });
      encrStri = encrStri.map(st => {
        return st = String.fromCharCode(st)
      });
      encrStri = encrStri.join('');
      return encrStri;
    } 
  
    decrypt(string) {
      let decrStri = string.split("");// split to array
      decrStri = decrStri.map(st => st.charCodeAt());// characters to Unicode
      decrStri = decrStri.map(st => {
        let newDecode = st - this._numb;
        if(st >= 65 && st <= 90){
            if(newDecode < 65){
                return st = newDecode + 26;
            }
            return st = newDecode;
        } else {
          return st;
        }
      });
      decrStri = decrStri.map(st => {
        return st = String.fromCharCode(st)
      });
      decrStri = decrStri.map(st => st.toLowerCase());
      decrStri = decrStri.join('');
      return decrStri;
    }
  }
  
  const cipher = new ShiftCipher(2);
  console.log(cipher.encrypt('aI love yy zzz?')) // returns 'CK NQXG AA BBB?'
  console.log(cipher.decrypt('CK NQXG AA BBB?')); // returns 'aI love yy zzz?'
  const  cipher2 = new ShiftCipher(1);
  console.log(cipher2.encrypt('aI love yy zzz?')) // returns 'BJ MPWF ZZ AAA?'
  console.log(cipher2.decrypt('BJ MPWF ZZ AAA?')); // returns 'aI love yy zzz?'