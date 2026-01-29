<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PersonalAccessToken;

class AuthPlayerController extends Controller
{
    public function __invoke(Request $request, $username)
    {
        $personalAccessToken = PersonalAccessToken
            ::where('name', $username)
            ->first();

        if ($personalAccessToken) {
            return response()->json([
                'is_online' => true,
            ]);
        }

        return response()->json([
            'is_online' => false,
        ]);
    }
}
