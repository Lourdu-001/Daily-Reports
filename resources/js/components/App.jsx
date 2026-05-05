import React from 'react';

// example for promise
const bringSnacks = new Promise((resolve, reject) => {
    const isShopOpen = false;

    setTimeout(() => {
        if(isShopOpen) {
            resolve("Snacks are on the way! 🍿");
        } else {
            reject("Sorry, the shop is closed! 🚪");
        }
    }, 2000);
})

bringSnacks.then((data) => {
    console.log("success:", data);
}).catch((error) => {
    console.error("error:", error);
});

// Feature          var                let             const
// Scope            Function Scoped    Block Scoped    Block Scoped
// Reassign Value?  Yes                Yes             No
// Re-declare?      Yes                No              No
// Hoisting?        Yes (undefined)    No (Error)      No (Error)
// Mutation?        Yes                Yes             Only for Objects/Arrays

export default function App() {
    return (
        <div>
            <h1>I just edited this! ⚡</h1>
        </div>
    );
}
