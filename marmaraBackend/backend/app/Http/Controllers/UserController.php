<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class UserController extends Controller
{

    public function isStudent(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'TCKimlikNo' => 'required',
            'BabaAdi' => 'required|string',
            'DogumTarihi' => [
                'required',
                function ($attribute, $value, $fail) {
                    $formatControl = preg_match('/^\d{4}-\d{2}-\d{2}$/', $value);
                    if ($formatControl == 0) {
                        $fail('Birth date format is incorrect.');
                    }
                },]
        ]);

        if ($validator->fails()) {
            return response([
                'status' => false,
                'message' => $validator->messages()->all(),
                'data' => []
            ], 400);
        }
        try {
            $data = ($request->all());

            $response = $this->doCurl(json_encode($data), 'POST');
            if ($response->OgrenciNo) {

                $userControl = User::where(['student_number' => $response->OgrenciNo])->first();

                if ($userControl) {
                    return response([
                        "status" => true,
                        "message" => 'alreadySaved',
                        "data" => [],
                    ], 202);
                }

                $token = Str::random(10);
                $user = new User();
                $user->name = $response->Ad;
                $user->surname = $response->Soyad;
                $user->student_number = $response->OgrenciNo;
                $user->remember_token = $token;
                $user->save();

                return response([
                    "status" => true,
                    "message" => "The user has been successfully created.",
                    "data" => [
                        "user" => $user,
                        "token" => $token
                    ],
                ], 200);

            } else {
                return response([
                    "status" => false,
                    "message" => "No student with this information was found",
                    "data" => []
                ], 406);

            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                "message" => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function doCurl($data, $request)
    {
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $_ENV['CURLOPT_URL'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => $request,
            CURLOPT_POSTFIELDS => $data,
            CURLOPT_HTTPHEADER => array(
                'Accept: application/json, text/javascript, */*; q=0.01',
                'Content-Type: application/json',
                'Cookie: ' . $_ENV['COOKIE'],
                'X-CSRF-TOKEN: ' . $_ENV['X_CSRF_TOKEN'],
            ),
        ));

        $response = json_decode(curl_exec($curl));

        curl_close($curl);

        return $response;
    }

    public function saveUser(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'email' => 'required|max:55|unique:users',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return response([
                "status" => false,
                'message' => $validator->errors()->all(),
                "data" => []
            ], 400);
        }

        $request->password = bcrypt($request->password);
        $userControl = User::where('remember_token', $request->token)->first();
        if ($userControl) {
            $userControl->update(['email' => $request->email,
                "password" => $request->password
            ]);
            $user = Auth::user();
            $accessToken = $user->createToken('accessToken')->accessToken;
            return response([
                "status" => true,
                "message" => "User information has been successfully updated",
                "data" => [
                    'token' => $accessToken,
                    'user' => $user,
                    'abilities' => 'user',
                ],
            ], 200);
        } else {
            return response([
                "status" => false,
                "message" => "User not found",
                "data" => [],
            ], 400);
        }

    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response([
                "status" => false,
                'message' => $validator->errors()->all(),
                "data" => []
            ], 400);
        }

        try {
            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $accessToken = $user->createToken('accessToken')->accessToken;

                return response([
                    "status" => true,
                    "message" => "giriş başarılı",
                    "data" => [
                        "token" => $accessToken,
                        "user" => $user
                    ],
                ], 200);
            } else {
                return response([
                    "status" => false,
                    "message" => "unauthorized",
                    "data" => [],
                ], 401);
            }

        } catch (\Exception $e) {
            return response([
                "status" => false,
                "message" => $e->getMessage(),
                "data" => [],
            ], 404);
        }
    }


    public function authenticate(Request $request)
    {
        $token = $request->all()['token'];
        try {
            $tokenControl = PersonalAccessToken::where(['token' => $token])->first();

            if ($tokenControl) {
                $tokenControl['counter'] += 1;
                PersonalAccessToken::where(['token' => $token])->update(['counter' => $tokenControl['counter']]);

                $user = User::where(['id' => $tokenControl['id']])->first();
                return response([
                    "status" => true,
                    "message" => "Authentication  process is successful.",
                    "data" => ['user' => $user,
                        'abilities' => $tokenControl['abilities'],
                        'token' => $tokenControl['token'],
                        'counter' => $tokenControl['counter'],]
                ], 200);
            } else {
                throw new \Exception('Token not found');
            }
        } catch (\Exception $e) {
            return response([
                'status' => false,
                'message' => $e->getMessage(),
                'data' => []
            ], 401);
        }

    }

}
