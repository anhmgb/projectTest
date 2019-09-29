<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group([
    ['middleware' => ['api', 'cors']],
    'prefix' => 'auth'
], function ($router) {
    Route::post('login', 'Auth\AuthController@login');
    Route::post('register', 'Auth\AuthController@register');
});

Route::group([
    ['middleware' => ['api', 'jwt.auth']],
    'prefix' => 'auth'
], function () {
    Route::get('me', 'Auth\AuthController@me');
});


