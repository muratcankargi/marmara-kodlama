<?php

namespace App\Http\Controllers;

use App\Models\PersonalAccessToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

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

                $user = User::create([
                    'name' => $response->Ad,
                    'surname' => $response->Soyad,
                    'student_number' => $response->OgrenciNo,
                ]);

                $token = md5(time() . rand(0, 999999));

                PersonalAccessToken::create([
                    'user_id' => $user->getAttributes()['id'],
                    'token' => $token,
                    'abilities' => 'almostUser',
                ]);

                return response([
                    "status" => false,
                    "message" => "The user has been successfully created.",
                    "data" => $token,
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
            ]);
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
        } else if (!Auth::attempt($credentials)) {
            return response([
                "status" => false,
                'message' => "Invalid credentials.",
                "data" => []
            ], 400);
        }

        try {
            /** @var User $user */
            $user = Auth::user();
            $userId = $user->getAttributes()['id'];
            $token = md5(time() . rand(0, 999999));

            $userRecord = PersonalAccessToken::where(['user_id' => $userId])->first();

            if ($userRecord) {
                PersonalAccessToken::where(['user_id' => $userId])->update(['token' => $token]);
            }

            return response([
                "status" => true,
                "message" => "Login process is successful",
                "data" => $token
            ], 200);
        } catch (\Exception $e) {
            return response([
                "status" => false,
                "message" => $e->getMessage(),
                "data" => [],
            ], 400);
        }
    }

    public function saveUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/',
        ]);

        if ($validator->fails()) {
            return response([
                "status" => false,
                "message" => $validator->messages()->all(),
                "data" => []
            ], 400);
        }

        try {
            $data = $request->all();

            $hasToken = PersonalAccessToken::where(['token' => $data['token']])->first();

            if ($hasToken) {
                User::where(['id' => $hasToken->user_id])->update([
                    'email' => $data['email'],
                    'password' => bcrypt($data['password'])
                ]);

                PersonalAccessToken::where(['user_id' => $hasToken->user_id])->update([
                    'abilities' => 'user'
                ]);

                $user = User::where(['id' => $hasToken->user_id])->first();

                return response([
                    "status" => true,
                    "message" => "User information has been successfully updated",
                    "data" => [
                        'user' => $user,
                        'abilities' => 'user',
                        'token' => $hasToken->token
                    ],
                ], 200);

            } else {
                return response([
                    "status" => false,
                    "message" => "Token not found",
                    "data" => []
                ], 400);
            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                "message" => $e,
                "data" => []
            ], 400);
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
