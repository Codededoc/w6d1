// Arguments Exercises
// Learning Goals
// Know how to use arguments and the ... rest operator
// Be able to set the context of a function in multiple ways
// Be able to write currying functions
// Be able to explain how currying works
// Know how to combine arguments from different calls of a curried function
// sum
// Write a sum function that takes any number of arguments:
//
//     sum(1, 2, 3, 4) === 10
//     sum(1, 2, 3, 4, 5) === 15
// Solve it first using the arguments keyword, then rewrite your solution to use the ... rest operator.
//
  function sum(...n) {
    let total = 0;
    for (let i = 0; i < n.length; i++) {
      total += n[i];
    }
    return total;
  }

  console.log(sum(4,5,6));

// bind with args
// Rewrite your myBind method so that it can take both bind-time arguments and call-time arguments.
//
  // Function.prototype.myBind = function(context, ...bindArgs) {
  //   return (...callArgs) => {
  //     return this.apply(context, bindArgs.concat(callArgs));
  //   };
  // };
  //
  // Function.prototype.myBind2 = function(/*context,b,c */){    //arguments = [context,b,c]
  //
  //
  // var params = Array.prototype.slice.call(arguments);
  // params.shift();
  //
  //
  //   return (/*d,e,f */) => {                              //arguments = [b,c,d,e,f]
  //     return this.apply(params.shift(),params);
  //   };
  // };

  //T-t-testing!
//   class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// class Dog {
//   constructor(name) {
//     this.name = name;
//   }
// }
//
// const markov = new Cat("Markov");
// const pavlov = new Dog("Pavlov");
//
// markov.says("meow", "Ned");
// markov.says.myBind2(pavlov, "meow", "Kush")();
// A few examples:
//
// class Cat {
//   constructor(name) {
//     this.name = name;
//   }
//
//   says(sound, person) {
//     console.log(`${this.name} says ${sound} to ${person}!`);
//     return true;
//   }
// }
//
// class Dog {
//   constructor(name) {
//     this.name = name;
//   }
// }
//
// const markov = new Cat("Markov");
// const pavlov = new Dog("Pavlov");
//
// markov.says("meow", "Ned");
// // Markov says meow to Ned!
// // true
//
// // bind time args are "meow" and "Kush", no call time args
// markov.says.myBind(pavlov, "meow", "Kush")();
// // Pavlov says meow to Kush!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "a tree"
// markov.says.myBind(pavlov)("meow", "a tree");
// // Pavlov says meow to a tree!
// // true
//
// // bind time arg is "meow", call time arg is "Markov"
// markov.says.myBind(pavlov, "meow")("Markov");
// // Pavlov says meow to Markov!
// // true
//
// // no bind time args (other than context), call time args are "meow" and "me"
// const notMarkovSays = markov.says.myBind(pavlov);
// notMarkovSays("meow", "me");
// // Pavlov says meow to me!
// // true
// Solve it first using the arguments keyword.
//
// Function.prototype.myBind = function (ctx) {
//   return () => {
//     return this.apply(ctx);
//   };
// };
//basic MyBind

Function.prototype.myBind = function(ctx, ...bindTimeArgs) {
  return (...callTimeArgs) => {
    return this.apply(ctx, bindTimeArgs.concat(callTimeArgs));
  };
};

// Within your myBind method, you'll have to define a new, anonymous function to be returned. Be careful: using arguments inside the anonymous function will not give you the arguments passed to myBind, because arguments is reset on every function invocation (just like this).
//
// That makes sense, because there are two arrays of arguments you care about: the extra arguments passed to myBind, and the arguments passed when the bound function is called.
//
// Once you've done that, write a second version using the ... rest operator.
//


// curriedSum
// Functional programming is another programming paradigm. It's an alternative to object-oriented programming, though the two can also be mixed. We'll learn more about it later, but briefly, functional programming focuses on function composition (writing functions which are given a function as an argument and return a new function).
//
// One pattern seen in functional programming is currying. Currying is the process of decomposing a function that takes multiple arguments into one that takes single arguments successively until it has the sufficient number of arguments to run. This technique is named after the logician Haskell Curry (the functional programming language Haskell is, too).
//
// Here's an example of two ways to use a sumThree function. The first is a typical version that takes 3 arguments; the second is a curried version:
//
// function sumThree(num1, num2, num3) {
//   return num1 + num2 + num3;
// }
//
// sumThree(4, 20, 6); // == 30
//
// // you'll write `Function#curry`!
// let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
// f1 = f1(4); // [Function]
// f1 = f1(20); // [Function]
// f1 = f1(6); // = 30
//
// // or more briefly:
// sumThree.curry(3)(4)(20)(6); // == 30
// Note that the curried version returns functions at each invocation until it has the full number of arguments it needs. At this point it actually invokes sumThree and returns the result.
//
// Write a curriedSum function that takes an integer (how many numbers to sum) and returns a function that can be successively called with single arguments until it finally returns a sum. That is:
//
// const sum = curriedSum(4);
// sum(5)(30)(20)(1); // => 56
// Hint: curriedSum(numArgs) should:
//
// Define an empty array, numbers.
// Defines a function, _curriedSum that:
// Closes over numArgs and numbers.
// Takes a single number as an argument.
// Appends this to numbers each time.
// If numbers.length === numArgs, it sums the numbers in the array and returns the result.
// Else, it returns itself.
// Returns _curriedSum.
// If you're confused, think of it this way: _curriedSum keeps collecting arguments and returning itself until it has enough arguments, at which point it actually does the required work of summing.

function curriedSum(numArgs){
  const numbers = [];
  return function _curriedSum(num){
    //_curriedSum closes over numbers and numArgs - i.e., numbers and numArgs is being used in _curriedsum
    //curriedSum and _curriedSum are closures in this case???!?!?!
    numbers.push(num);
    if (numbers.length === numArgs){
      return numbers.reduce((accum, el) => {
        return accum += el;
      });
    } else {
      return _curriedSum;
    }
  };
}
const total = curriedSum(4);
//const total = curriedSum(3); => would return 55(1) => throws error
//const total = curriedSum(5); => would return _curriedSum with numbers = [5, 30, 20, 1]
console.log(total(5)(30)(20)(1)); // => 56


// Function.prototype.curry
// Write a method Function.prototype.curry(numArgs). This should return a function that will:
//
// Collect up arguments until there are numArgs of them,
// If there are too few arguments still, it should return itself.
// When there are numArgs arguments, it should call the original function.
// Write a version that uses Function.prototype.apply and another one that uses ... the spread operator.
// ** Make sure to call a TA to check over your work if you haven't already! **

// Function.prototype.curry = function(numArgs) {
//   const args = [];
//   let that = this;
//   return function _curry(arg){
//     args.push(arg);
//     if (args.length === numArgs){
//       return that(...args);
//     } else {
//       return _curry;
//     }
//   };
// };
Function.prototype.curry = function(numArgs) {
  const args = [];
  // let that = this;
  const _curry = (arg) => {
    args.push(arg);
    if (args.length === numArgs){
      return this(...args);
    } else {
      return _curry;
    }
  };
  return _curry;
};

function totaling(...args) {
  return args.reduce((accum, el) => {
    return accum -= el;
  });
}

const total2 = totaling.curry(4);
console.log(total2(5)(30)(20)(3)); // => -48


Function.prototype.curry2 = function(numArgs) {
  const args = [];
  // let that = this;
  const _curry = (arg) => {
    args.push(arg);
    if (args.length === numArgs){
      return this.apply(null, args);
    } else {
      return _curry;
    }
  };
  return _curry;
};

function totaling3(...args) {
  return args.reduce((accum, el) => {
    return accum += el;
  });
}

const total3 = totaling3.curry2(4);
console.log(total3(5)(30)(20)(3)); // => 58
