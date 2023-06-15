const person = {
  id: 1,
  name: "ofega",
  location: "apo",
  greet: function () {
    return "Good morning!";
  },
};

console.log(person.name);
console.log(person.greet());

let userName = person.name;
// -----------------

const { name, location } = person;
// -------------------

let fullName = " Danladi Amir";
fullName = fullName.trimEnd();

// " Danaladi Amir"
firstName = fullName?.split(" ")[0] ? fullName?.split(" ")[0] : "";
lastName = fullName?.split(" ")[1] ? fullName?.split(" ")[1] : "";

firstName = firstName.firstName = fullName?.split(" ")[0]
  ? fullName?.split(" ")[0]
  : "";
lastName = fullName?.split(" ")[1] ? fullName?.split(" ")[1] : "";
