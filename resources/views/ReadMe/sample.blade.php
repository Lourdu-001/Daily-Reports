<?php
    // ---------------------------------------------------
    // what is class?
    // -----------------------------------------------------

    class House {
        public $name;
        private $key;

        public function introduce($name) {
            $this->name=$name;
        }
         public function getName() {
             echo $this->name . "entered the house1";
         }
    }

    $person1 = new House();
    $person1->name="raju";
    // $person1->getName();

    $person2 = new House();
    $person2->name="shelton";
    // $person2->getName();

    
    // -----------------------------------------------------
    // Inheritance
    // -----------------------------------------------------

    class EEE {
        public string $name;
        public string $salary;

        public function __construct($name, $salary) {
            $this->name = $name;
            $this->salary = $salary;
        }
    }

    class Management extends EEE {
        public $manager;
        public $department;

        public function __construct($name, $salary, $department) {
            Parent::__construct($name, $salary);
            $this->department=$department;
        }

        public function getCollegeName() {
            echo $this->name . " college name <br>";
        }
    }

    $department = new Management('DMI College', '5000', 'EEE Dept');
    
    echo $department->salary; // Output: 5000


    class Car {
        public $color = "red";
        protected $model_number = "DG29299";
        private $password = "1234";
    }

    class Company extends Car {

        public function getDetails() {
            echo $this->color;
        }
    }

    $company = new Company();
    // $company->color;


    // ------------------ Example - II --------------------------

    class Animal {
        public $sound;

        public function sound($sound) {
            $this->sound = $sound;
            return "Animal makes a sound: " . $this->sound;
        }
    }

    class Dog extends Animal {
        public $name; 

        public function sound($sound) {
            echo "Dog " . $sound;
        }

        public function parentSound($sound) {
            return parent::sound($sound);
        }

        public function _get($name) {
            return "Getting property: " . $name;
        }
    }

    $dog = new Dog("bark");

    // -----------------------------------------------------
    // __construct() method
    // -----------------------------------------------------

    class user {
        private $name;

        public function __construct($name) {
            $this->name=$name;
        }

        public function setName($name) {
            $this->name = $name;
        }

        public function getName() {
            return $this->name;
        }
    }

    $user = new user("John Doe");

    // -----------------------------------------------------
    // __set() and __get() methods
    // -----------------------------------------------------

    class TestMode {
        private $data = [];

        public function __set($name, $value) {
            $this->data[$name] = $value;
        }

        public function __get($name) {
            return $this->data[$name] ?? null;
        }
    }

    $obj = new TestMode();

    $obj->name = "Dream";

    // -----------------------------------------------------
    // __call() method
    // ----------------------------------------------------

    /*  
        * $Task::whereTitle('Test')->get();
        * There is NO method called whereTitle().
        * Laravel uses: __call() method To dynamically convert:
        * whereTitle into where('title',...)

        * for Example:
    */

    class Test {
        public function __call($method, $args) {
            echo "method $method called with arguments: ";
            print_r($args);
        }
    }

    // $Test = new Test();
    // $Test->hello("Laravel");

    class Smartprofile {
        private $socialLinks = [];
        public function __call($method, $arguments) {
            if(strpos($method, 'set') === 0) {
                // Extract the platform name (e.g., "Twitter")
                $platform = substr($method, 3);
                $this->socialLinks[$platform] = $arguments[0];
                return "saved $platform link!";
            }
            return "Method $method does not exist";
        }
        public function getLinks() {
            return $this->socialLinks;
        }
    }

    $user = new Smartprofile();

    // These methods don't exist! __call() will intercept them.
    // echo $user->setTwitter('@gemini_ai');
    // echo $user->setInstagram('@google_life');

    // print_r($user->getLinks());

    // -----------------------------------------------------
    // __tostring() method
    // ----------------------------------------------------

    /*  
        * __toString() method used when object is printed.

        * for Example:
    */

    class NewUser {
        public function __toString() {
            return "object is printed";
        }
    }

    $newuser = new NewUser();
    // echo $newuser;

    // -----------------------------------------------------
    // __invoke() method
    // ----------------------------------------------------

    /*  
        * __invoke() method makes object callable like a function.

        * for Example:
    */

    class Greeting {
        public function __invoke() {
            return "hello";
        }
    }

    $greeting = new Greeting();

    // echo $greeting();

    // -----------------------------------------------------
    // __invoke() method
    // ----------------------------------------------------

    /*  
        * DB connection

        * for Example:
    */

    class DBconnection {
        private $connection;
        private $dbname;

        public function __construct($name) {
            $this->dbname= $name;
            $this->connection = "connected to DB: " . $this->dbname;
            echo "--- [CONSTRUCT] " . $this->connection . "----\n";
        }

        public function query($sql) {
            echo "running query: $sql\n";
        }

        // 2. DEATH: Close the connection automatically
        public function __destruct() {
            echo "---[DESTRUCT] Closing connection to " . $this->dbname . " to save memory. ---\n";
            $this->connection = null;
        }
    }

    // echo "Step 1: Creating the object...\n";
    // echo "<br>";
    // $dbconnection = new DBconnection("Production_DB");
    // echo "<br>";
    // echo "Step 2: Doing some work...\n";
    // echo "<br>";
    // $dbconnection->query("SELECT * FROM users");

    // -----------------------------------------------------
    // trait method
    // ----------------------------------------------------

    /*  
        * for Example:
    */

    trait Map {
        public function identify() {
            echo "Identifying coordinates...\n";
        }
    }

    trait Log {
        public function identify() {
            echo "Identifying log entry ID...\n";
        }
    }

    class Legend {
        use Map, Log {
            // 1. Tell PHP to use Map's version instead of Log's version
            Map::identify insteadof Log;

            // 2. Give Log's version a nickname so it isn't lost forever
            Log::identify as identifyLog;
        }
    }

    // $legend = new Legend();
    // $legend->identify();
    // $legend->identifyLog();

    trait EnquiryCall {
        public string $number;

        public function makeCall(string $number) {
            echo "you are calling to " . $number; 
        }
    }

    trait SuperCall {
        public function makeCall($number) {
            echo "you are calling to " . $number; 
        }
    }

    class NeuclearUser {
        Use EnquiryCall, SuperCall {
            EnquiryCall::makeCall insteadOf SuperCall;

            SuperCall::makeCall as triggerCall;
        }
    }

    class Admin {
        Use EnquiryCall;
    }

    $user = new NeuclearUser();
    $user->makeCall(89767898776);

    $user->triggerCall(8937657678);
    // -----------------------------------------------------
    // Interface method.
    //    * Interface is like a contract. It defines a list of methods that a class must implement, whithout specifying how those methods should actually work. 
    // ----------------------------------------------------

    /*  
        * for Example:
    */

    interface Paymentgateway {
        public function pay(int $amount);
    }

    class Stripepayment implements Paymentgateway {
        public function pay(int $amount) {
            echo "The stripe amount is " . $amount;
        }
    }

    class Paypal implements Paymentgateway {
        public function Pay(int $amount) {
            echo "The paypal amount is " . $amount;
        }
    }

    function notifyuser(Paymentgateway $notifier, $msg) {
        $notifier->pay($msg);
    }

    $stripe = new Stripepayment();
    // notifyuser($stripe, 500);

    $paypal = new Paypal();
    echo "<br>";
    // notifyuser($paypal, 400);


    interface Messages {
        public function alert($msg);
    }

    class PaymentAlert implements Messages {
        public function alert($msg) {
            echo $msg . " received successfully <br>";
        }
    }

    class FoodAlert implements Messages {
        public function alert($msg) {
            echo $msg . " received successfully <br>";
        }
    }

    function notify(Messages $notifyMe, $msg) {
        return $notifyMe->alert($msg);
    }

    $Foodmessages = new FoodAlert();
    // notify($Foodmessages, "Food Alert Reminder");

    $paymentAlert = new PaymentAlert();
    // notify($paymentAlert, "payment Alert Reminder");

    // we can call the variable outside even which is created inside the function. but we can't call the variable inside the function which is declared outside the fucntion. With an help of global keyword
    // we can call them inside the function.

    $user_name= "Jone doe";
?>
  data: {{ $user_name }}

