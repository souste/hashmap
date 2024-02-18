// function hash(key) {
//   let hashCode = 0;

//   const primeNumber = 31;
//   for (let i = 0; i < key.length; i++) {
//     hashCode = primeNumber * hashCode + key.charCodeAt(i);
//   }
//   return hashCode;
// }

// console.log(hash("Stephen"));

// const person = {};
// person["firstName"] = "jeev";
// person["lastName"] = "jeevy";

function hashStringToInt(string, tableSize) {
  let hash = 17;
  for (let i = 0; i < string.length; i++) {
    hash = (13 * hash * string.charCodeAt(i)) % tableSize;
  }

  return hash;
}

class HashTable {
  table = new Array(3);
  numItems = 0;

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          const idx = hashStringToInt(key, newTable.length);
          if (newTable[idx]) {
            newTable[idx].push([key, value]);
          } else {
            newTable[idx] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  setItem = (key, value) => {
    this.numItems++;
    const loadFactor = this.numItems / this.table.length;
    if (loadFactor > 0.8) {
      //resize
      this.resize();
    }

    const idx = hashStringToInt(key, this.table.length);
    if (this.table[idx]) {
      this.table[idx].push([key, value]);
    } else {
      this.table[idx] = [[key, value]];
    }
  };

  getItem = (key) => {
    const idx = hashStringToInt(key, this.table.length);
    if (!this.table[idx]) {
      return null;
    }

    //0(n)
    return this.table[idx].find((x) => x[0] === key)[1];
  };

  has = (key) => {
    const idx = hashStringToInt(key, this.table.length);
    if (!this.table[idx]) {
      return false;
    }
    return this.table[idx].some(([k, _]) => k === key);
  };

  remove = (key) => {
    const idx = hashStringToInt(key, this.table.length);
    if (!this.table[idx]) {
      return false;
    }
    const indexToRemove = this.table[idx].findIndex(([k, _]) => k === key);
    if (indexToRemove === -1) {
      return false;
    }
    this.table[idx].splice(indexToRemove, 1);
    this.numItems--;
    return true;
  };

  length = () => {
    return this.numItems;
  };

  clear = () => {
    this.table = new Array(this.table.length);
    this.numItems = 0;
  };

  keys = () => {
    const keysArray = [];
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, _]) => {
          keysArray.push(key);
        });
      }
    });
    return keysArray;
  };

  values = () => {
    const valuesArray = [];
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([_, value]) => {
          valuesArray.push(value);
        });
      }
    });
    return this.valuesArray;
  };

  entries = () => {
    const entriesArray = [];
    this.table.forEach((item) => {
      if (item) {
        item.forEach(([key, value]) => {
          entriesArray.push([key, value]);
        });
      }
    });
    return entriesArray;
  };
}

const myTable = new HashTable();
myTable.setItem("firstName", "jeevy");
console.log(myTable.table.length);
myTable.setItem("lastName", "ron");
myTable.setItem("age", "5");
myTable.setItem("dob", "1/2/79");

console.log(myTable.getItem("firstName"));
console.log(myTable.getItem("lastName"));
console.log(myTable.getItem("age"));
console.log(myTable.getItem("dob"));
console.log(myTable.table.length);

console.log(myTable.entries());
