<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class AuthController extends Controller
{
    public function generateToken(array $data)
    {
        // Serialize and encrypt the data to create a token
        return Crypt::encrypt(json_encode($data));
    }

    public function extractValuesFromToken(Request $request)
    {
        $token = $request->input('token');
        try {
            // Decrypt and unserialize the token to extract values
            $data = json_decode(Crypt::decrypt($token), true);
            
            return response()->json($data);
        } catch (\Exception $e) {
            // Handle decryption errors, such as an invalid token
            return null;
        }
    }

    public function getAccessToken(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        $userData = [
            'username' => $username,
            'password' => $password
        ];

        $token = $this->generateToken($userData);

        return response()->json(['access_token' => $token]);
    }
}