@extends('layouts.app')

@section('content')
    <h1>Available Concepts</h1>
    <ul>
        @foreach ($concepts as $concept) 
            <li>{{ $concept }}</li>
        @endforeach
    </ul>

    @if (empty($concepts))
        <p>No concepts available.</p>
    @endif
@endsection
