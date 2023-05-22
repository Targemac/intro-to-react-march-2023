// creating object
const user = {
  name_: "Tina",
  age: 20,
};

// accessing using dot syntax
console.log(user.name, user.age);

// accessing using object destructuring
const { name_ } = user;
console.log(name_)

// ------------------------------------------
// creating array
const fruits = ['apple', 'banana', 'orange'];

// accessing using destrucure method
const [item1, item2] = fruits;