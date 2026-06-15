what is the difference between var and let and const?
is this a different



closures:
-------
   A closure allows a function to access variables from its outer scope even after the outer function has completed execution. It is commonly used for data privacy, maintaining state, and function factories.

   example:
   ---------
   function ourter() {
    let count=0;

    return function inner() {
        count++;
        console.log(count);
    };
   }


hoisting:
--------
    Hoisting is a JavaScript behavior where variable and function declarations are processed before code execution. Function declarations are fully hoisted, while variables declared with var are hoisted and initialized with undefined. Variables declared with let and const are hoisted but remain in the Temporal Dead Zone until they are initialized.

promises:
--------
    A Promise is a JavaScript object used to handle asynchronous operations. It represents a value that may be available now, later, or never. A Promise can be in one of three states:

    Pending
    Fulfilled
    Rejected

    example:
    --------
    const promise = new Promise((resolve, reject) => {
        const success = true;

        if(success) {
            resolve("data received");
        } else {
            reject("error");
        }
    });

Async / Await:
---------------
Async:
------
    The async keyword used to declare asynchronous function. An async function automatically returns a promise.

    async function getData() {
        return "hello";
    }

Await:
-----
    The await keyword pauses execution inside an async function until the Promise is resolved or rejected. It
    makes asynchronous code easier to read and write compared to chained .then() calls.

Event Bubbling:
--------------

<div id="parent">
    <button id="child">Click</button>
</div>

    Event bubbling is a mechanism where an event starts from the target element and propagates upward through its parent elements in DOM hierarchy.

Event Delegation:
---------------
    suppose you have:

    Event delegation is a technique where a single event listener is attached to a parent element to handle events for its child elements. It works because of event bubbling and improves performance when dealing with many dynamic elements.
    
map:
----
    map method is used to iterate data over an array and create a new array by transforming each element. it
    does not modify the original array and always returns a new array with same length.

differece between map and foreach?
----------------------------------
    map() returns new array whereas foreach iterates over the array and return undefined.

filter:
------
    The filter method is used to create a new array containing only the elements that satisfy a specified condition. It returns a new array and does not modify the original data.

    const numbers=[1,2,3,4,5,6];

    const evenNumbers = numbers.filter(num => num % 2 === 0);
    
    console.log(evenNumbers);

reducer:
    Reducer use to accumulate array elements and return single value by sum, or object.

filter is use to create new array containing only the elements that satisfy a specified condition. 

map method is use to iterate an array to create a new array. It is not modify the array. also return an array with the same length.

var a = [1, 2, 3, 4];

Difference between == and ===?
  == is called loose equality. It compares values after performing type conversion if necessary.

    === is called strict equality. It compares both value and data type without type conversion.

Spread Operator:
---------------
    The spread operator (...) is used to expand elements of an array or properties of an object. It is commonly used for copying, merging, and updating arrays or objects.

    ex:
    const arr1 = [1,2];
    const arr2 = [...arr1, 3, 4];

object example:
--------------
    const user = {
        name: "diago",
    }

    const UpdateUser = {
        ...user, name: "fransis"
    }

destrcuturing:
---------------
    Destructuring is a JavaScript feature that allows extracting values from arrays or properties from objects and assigning them directly to variables in a concise way.

undefined:
----------
    undefined means a variable has been declared but has not yet been assigned a value. It is the default value assigned by JavaScript in such cases.

null:
-----
    null is an intentional assignment that represents the absence of any object value or an empty value. It is typically assigned by the developer when they want to indicate that a variable currently has no meaningful value.


Function declarations are fully hoisted, meaning both the function name and implementation are available before their declaration in the code.

Function expressions follow variable hoisting rules. If declared using const or let, they remain in the Temporal Dead Zone until initialization. If declared using var, the variable is hoisted as undefined, and calling it before assignment results in a TypeError.

Object.freeze()

      Object.freeze() putting a digital padlock on a javascript object.

      Once you freeze an object, it becomes completely immutable. javascript seals it shut so that no one can
      add, delete, or modify any of its properties. 

closuer:
-------
      A closure is created when an inner function remembers and accesses variables from its outer scope even after the outer function has finished executing. JavaScript preserves those variables because the inner function still references them.









