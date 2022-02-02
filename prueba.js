const array = function (arr) {
  let string = "";
  for (let i = 0; i < arr.length; i++) {
    string += arr[i] + " ";
  }
  console.log(string);
};

array(["hola", "que", "tal"]);
