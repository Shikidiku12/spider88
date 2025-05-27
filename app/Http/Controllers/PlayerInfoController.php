<?php

namespace App\Http\Controllers;

use Log;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Http;

class PlayerInfoController extends Controller
{
    public function __invoke(string $username): JsonResponse
    {
        $response = Http::get(config('app.lm_api_url') . '/player/' . $username);
        Log::info($response->json());
        return response()->json($response->json());
    }
}
