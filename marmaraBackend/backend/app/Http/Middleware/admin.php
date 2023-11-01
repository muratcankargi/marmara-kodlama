<?php

namespace App\Http\Middleware;

use App\Models\PersonalAccessToken;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class admin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $permission = PersonalAccessToken::where([
            'token' =>$request->bearerToken(),
            'abilities' => 'admin'])
            ->first();
        if($permission){
            return $next($request);
        }
        else{
            return response([
                "status" => false,
                'message' => "unauthorized user",
                "data" => []
            ], 401);
        }

    }
}
