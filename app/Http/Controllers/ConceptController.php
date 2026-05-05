<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Services\ConceptService;
use Illuminate\Http\Request;

class ConceptController extends Controller
{
    protected $conceptService;

    public function __construct(ConceptService $conceptService) {
        $this->conceptService = $conceptService;
    }

    public function index() {
        // Change $concept to $concepts to match the Blade file
        $concepts = $this->conceptService->getAllActiveServices(); 
        
        // Pass 'concepts' to the view
        return view('concepts.index', compact('concepts'));
    }
}
