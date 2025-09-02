<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\PersonalAccessToken;
use App\Models\User;

class ExternalLogoutController extends Controller
{
    public function __invoke(Request $request)
    {
        $username = $request->get('username');
        PersonalAccessToken::where('username', '=', $username)->delete();
        return response()->json(['status' => 'ok',]);
    }
}
