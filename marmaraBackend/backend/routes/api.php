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


Route::post('/isStudent', [UserController::class, 'isStudent']);
Route::post('/login', [UserController::class, 'login']);
Route::post('/saveUser', [UserController::class, 'saveUser']);

Route::get('/authenticate', [UserController::class, 'authenticate']); //expires_at uzatılacak

Route::middleware('authentication')->group(function () {


    Route::post('/declarations', [DeclarationController::class, 'createDeclaration']);
    Route::get('/declarations', [DeclarationController::class, 'getDeclarations']);
    Route::get('/declarations/{id}', [DeclarationController::class, 'getDeclaration']);
    Route::put('/declarations/{id}', [DeclarationController::class, 'updateDeclaration']);
    Route::post('/declarations/{id}', [DeclarationController::class, 'changeDeclarationVisibility']);
    Route::get('/declarations/user/{id}', [DeclarationController::class, 'getDeclarationByUserId']);

    Route::get('/tags', [TagController::class, 'getTags']);
    Route::get('/tags/{id}', [TagController::class, 'getTag']);

    Route::post('/filter/date',[DeclarationController::class, 'sortedByDate']);
    Route::post('/filter/tag',[DeclarationController::class, 'sortedByTag']);
    Route::post('/filter/word',[DeclarationController::class, 'sortedByWord']); //search algorithm, index
    Route::post('/filter/dateBetween',[DeclarationController::class, 'sortedByDateBetween']);
    Route::get('/filter/lastDay',[DeclarationController::class, 'sharedLastDay']);
    Route::get('/filter/lastWeek',[DeclarationController::class, 'sharedLastWeek']);
    Route::get('/filter/lastMonth',[DeclarationController::class, 'sharedLastMonth']);
    Route::post('/filter',[DeclarationController::class, 'filter']);

    Route::middleware('admin')->group(function () {
        Route::delete('/declarations/{id}', [DeclarationController::class, 'deleteDeclaration']);

        Route::post('/tags', [TagController::class, 'createTag']);
        Route::put('/tags/{id}', [TagController::class, 'updateTag']);
        Route::delete('tags/{id}', [TagController::class, 'deleteTag']);
    });

});





