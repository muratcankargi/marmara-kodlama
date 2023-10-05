<?php

use App\Http\Controllers\DeclarationController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:api')->group(function () {
    Route::post('/createDeclaration', [DeclarationController::class, 'createDeclaration']);
    Route::get('/declaration', [DeclarationController::class, 'getDeclaration']);
    Route::put('/updateDeclaration/{id}', [DeclarationController::class, 'updateDeclaration']);
    Route::delete('deleteDeclaration/{id}', [DeclarationController::class, 'deleteDeclaration']);

    Route::post('/createTag', [TagController::class, 'createTag']);
    Route::get('/getTags', [TagController::class, 'getTags']);
    Route::put('/updateTag/{id}', [TagController::class, 'updateTag']);
    Route::delete('deleteTag/{id}', [TagController::class, 'deleteTag']);


});
Route::get('login', function () {
    return response([
        "status" => false,
        "message" => "unauthorized",
        "data" => [],
    ], 401);
})->name('login');
Route::post('/isStudent', [UserController::class, 'isStudent']);
Route::post('/saveUser', [UserController::class, 'saveUser']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/authenticate', [UserController::class, 'authenticate']);


