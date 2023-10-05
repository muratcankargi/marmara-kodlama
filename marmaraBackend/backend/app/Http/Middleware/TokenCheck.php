<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class TokenCheck
{
    public function handle(Request $request, Closure $next): Response
    {
        dd(Auth::check());
        if(auth()->check()){
            return response([
                "status" => false,
                "message" => "Yetkilendirme başarısız.",
                "data" => [],
            ], 401);
        }
        return $next($request);
    }
}
