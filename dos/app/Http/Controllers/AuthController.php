<?php

namespace App\Http\Controllers;

use App\Events\PusherEvent;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Str;


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
        }
        catch (\Exception $e) {
            // Handle decryption errors, such as an invalid token
            return null;
        }
    }

    public function getAccessToken(Request $request)
    {
        $channel_name = $request->input('channel_name');
        $username = $request->input('username');
        $password = $request->input('password');
        $user_agent =  $request->input('user_agent');
        $login_id = Str::uuid();

        $userData = [
            'channel_name' => $channel_name,
            'username' => $username,
            'password' => $password,
            'user_agent' =>$user_agent,
            'login_id' => $login_id
        ];
        $token = $this->generateToken($userData);


        broadcast(new PusherEvent($channel_name, $username,$token))->toOthers();

        return response()->json(['access_token' => $token]);
    }
}
