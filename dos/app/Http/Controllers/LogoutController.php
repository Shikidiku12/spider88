<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class LogoutController extends Controller
{
    public function __invoke(Request $request)
    {
        auth()->user()->tokens()->delete();

        return response()->json([
            'logout' => 'ok',
        ]);
    }
}
