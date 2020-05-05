<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tightenco\NovaGoogleAnalytics\Http\Controllers\MostVisitedPagesController;
use Tightenco\NovaGoogleAnalytics\Http\Controllers\ReferrerListController;
use Tightenco\NovaGoogleAnalytics\Http\Controllers\StatsPerPageController;

/*
|--------------------------------------------------------------------------
| Tool API Routes
|--------------------------------------------------------------------------
|
| Here is where you may register API routes for your tool. These routes
| are loaded by the ServiceProvider of your tool. They are protected
| by your tool's "Authorize" middleware by default. Now, go build!
|
*/

Route::get('most-visited-pages', MostVisitedPagesController::class);
Route::get('referrer-list', ReferrerListController::class);
Route::post('stats-per-page', StatsPerPageController::class);
