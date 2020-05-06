const ANY = 'any';

const attempt = (available, allowed, preferred) => {
  const result = [];
  // Logic for finding intersection -----
  let intersection;
  if (available.includes(ANY)) {
    intersection = allowed;
  } else if (allowed.includes(ANY)) {
    intersection = available;
  } else {
    intersection = available.filter(value => allowed.includes(value));
  }
  // -----

  if (intersection.length === 0) {
    return [];
  }

  if (preferred.includes(ANY)) {
    return intersection;
  }

  preferred.forEach(value => {
    let firstBiggerElement;
    let lastSmallerElement;
    const matchedValue = intersection.find(v => v === value);

    if (matchedValue) {
      // Logic for exact match
      return result.push(matchedValue);
    } else {
      // Logic for other cases
      intersection.forEach((element) => {
        if (element < value) {
          lastSmallerElement = element;
        } else  if (!firstBiggerElement) {
          firstBiggerElement = element;
        }
      });

      if (firstBiggerElement) {
        return result.push(firstBiggerElement);
      } else  if (lastSmallerElement) {
        return result.push(lastSmallerElement);
      }
    }
  });

  const uniqueResult = result.filter((value, index) => {
    return result.indexOf(value) === index;
  })

  return uniqueResult;
};

// Testing Data
//  Test 1
const available1 = [240, 360, 720];
const allowed1 = [360, 720];
const preferred1 = [1080];

//  Test 2
const available2 = [240, 720];
const allowed2 = [360, 720];
const preferred2 = [1080];

//  Test 3
const available3 = [240];
const allowed3 = [360, 720];
const preferred3 = [1080];

//  Test 4
const available4 = [240, 360, 720];
const allowed4 = [240, 360, 720, 1080];
const preferred4 = [240, 360];

//  Test 5
const available5 = [240, 720];
const allowed5 = [240, 360, 720, 1080];
const preferred5 = [240, 360];

//  Test 6
const available6 = [240, 720];
const allowed6 = [240, 360, 1080];
const preferred6 = [240, 360];

//  Test 7
const available7 = [720];
const allowed7 = [240, 360, 1080];
const preferred7 = [240, 360];

//  Test 8
const available8 = [240, 360];
const allowed8 = [240, 360];
const preferred8 = [720, 1080];

//  Test 9
const available9 = [240, 360, 720];
const allowed9 = [360, 'any'];
const preferred9 = [360, 720];

//  Test 10
const available10 = [240, 360, 720];
const allowed10 = [240, 360, 720];
const preferred10 = ['any', 720];

//  Test 11
const available11 = [240, 360, 720];
const allowed11 = [ 360, 1080];
const preferred11 = ['any', 1080];

//  Test 12
const available12 = [240, 360, 720];
const allowed12 = [1080];
const preferred12 = ['any', 720];

console.log('TEST 1 --', attempt(available1, allowed1, preferred1));
console.log('TEST 2 --', attempt(available2, allowed2, preferred2));
console.log('TEST 3 --', attempt(available3, allowed3, preferred3));
console.log('TEST 4 --', attempt(available4, allowed4, preferred4));
console.log('TEST 5 --', attempt(available5, allowed5, preferred5));
console.log('TEST 6 --', attempt(available6, allowed6, preferred6));
console.log('TEST 7 --', attempt(available7, allowed7, preferred7));
console.log('TEST 8 --', attempt(available8, allowed8, preferred8));
console.log('TEST 9 --', attempt(available9, allowed9, preferred9));
console.log('TEST 10 --', attempt(available10, allowed10, preferred10));
console.log('TEST 11 --', attempt(available11, allowed11, preferred11));
console.log('TEST 12 --', attempt(available12, allowed12, preferred12));