<?php

namespace App\Http\Controllers;

use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class AuthLoginController extends Controller
{
    public function __invoke(Request $request)
    { 
        $user = User
            ::where('username', '=', $request->get('username'))
            ->first();

        if (!$user) {
            $user = new User();
            $user->name = $request->get('username');
            $user->email = $request->get('username');
            $user->password = Hash::make($request->get('password'));
            $user->username = $request->get('username');
            $user->save();
        }
    
        $credentials = $request->validate([
            'username' => ['required'],
        ]);

        $token = $user->createToken($request->get('username'));
        return response()->json([
            'token' => $token->plainTextToken,
        ], 200);
    }
}
