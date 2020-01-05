const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const random = arr => arr[Math.floor(Math.random() * arr.length)];

// Return the string if passed a string, or first item if passed an array
const checkSing = arg => (Array.isArray(arg) ? arg[0] : arg);

// Return second item if passed array, or string plus 's' if passed string
const checkPlur = arg => (Array.isArray(arg) ? arg[1] : `${arg}s`);

// Get a random singular or plural item from an array of strings
// or arrays with ['octopus', 'octopi'] format
const getSing = arg => checkSing(random(arg));
const getPlur = arg => checkPlur(random(arg));

// Chance to return argument, or empty string
const threeQuarter = arg => (Math.random() >= 0.25 ? arg : "");
const twoThird = arg => (Math.random() >= 0.33 ? arg : "");

module.exports = {
  capitalize,
  random,
  checkSing,
  checkPlur,
  getSing,
  getPlur,
  threeQuarter,
  twoThird
};
