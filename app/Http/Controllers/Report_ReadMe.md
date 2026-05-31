ok buddy, now it's time for project discussion and knowledge sharing

let's start with registration. from router to view like below chart

Router -> Middleware -> Controller -> Model -> resources -> view



Router: [ Registration Router ]
-------
api.php

Router::post("/register", [AuthController::class, "register"]);

So the router will send the request to registration endpoint and it will call the store method in AuthController

Register.jsx.
---------------
in the register page, when i submit the form. we pass the form object to register function

await register(form);

the function which is comes AuthContext file

const { register } = useAuth();

import { useAuth } from '../context/AuthContext';

what is the purpose of useAuth:

export function useAuth() {
    return useContext(AuthContext);
}

what this will give
const AuthContext = createContext();

what next.....
what it will do....

how this is related to this post method. The submit is set to e.preventDefault() method. Then how will the request send.

Router::post("/register", [AuthController::class, "register"]);

auth:sanctum
-------------

react side
---------
const response = await api.get('/tasks');

api.js:
-------
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

what is interceptor, use - how does he know the request data without even using post or get. And every click how he know that time the interceptor is needed and check the token. the return config. 

// Step 1: Read Authorization header
$token = "1|abc123xyz...";

if, i am not wrong the token is read by the by localStorage.getItem('token');
where sanctum performed.

// Step 2: Split token
$id          = 1;           // before the |
$plainText   = "abc123xyz"; // after the |

i don't where this code executed in code.

// Step 4: Hash and compare
hash('sha256', 'abc123xyz') === token_in_db?
//  ✅ match   → authenticated!
//  ❌ no match → 401 Unauthorized

if (!Auth::attempt($request->only('email', 'password')))

// Step 5: Load the user
$user = User::find($token->tokenable_id);
// 👆 Now $request->user() works in Controller!

the above part is handled by auth:attempt which is laravel eloquent orm feature.

where exactly the sanctum is functioning....

My assumption:
-------------

when request from react api.get('/tasks'); 

the request first hit the blow line. which is atomatically check the requested point have a valid user by created token from register or login. because everytime we login we create new token. and check the user once they get into the TaskController index method by Task::where('user_id', user()->id);

but, i don't know where this user() function is created.

Route::middleware('auth:sanctum')->group(function () {







