@extends('layouts.app')
@section('css')
    <link href="{{ mix('css/app.css') }}" rel="stylesheet">
    @endsection
@section('js')
    <script src="{{ mix('js/login.js') }}" ></script>
    @endsection
@section('content')
    <div id="login"></div>
    @endsection