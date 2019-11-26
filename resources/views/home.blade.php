@extends('layouts.app')

@section('css')
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    @endsection
@section('js')
    <script src="{{ mix('js/app.js') }}" ></script>
    @endsection
@section('content')
    <div id="app"></div>
    @endsection