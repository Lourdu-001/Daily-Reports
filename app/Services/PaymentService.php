<?php
    namespace App\Services;

    class PaymentService {
        public function processPayment($amount) {
            return "payment of {$amount} processed successfully";
        }
    }
?>