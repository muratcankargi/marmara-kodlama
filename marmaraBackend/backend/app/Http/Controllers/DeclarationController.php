<?php

namespace App\Http\Controllers;

use App\Models\Declaration;
use App\Models\Tag;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DeclarationController extends Controller
{
    public function createDeclaration(Request $request)
    {
        //visibility admin kontrolünde olabilir
        //response yollarken status,message,data olucak
        //resim eklenicek. yolu database'e kaydedilecek
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:200',
            'description' => 'required|string|max:2000',
            'tags' => 'required|array',
            'type' => 'required',
            'image_source' => 'nullable|string'
        ]);

        if ($validator->fails()) {
            return response([
                "status" => false,
                "message" => $validator->messages()->all(),
                "data" => []
            ], 400);
        }

        try {

            foreach ($request->tags as $tag) {
                if (!Tag::where('name', $tag)->first()) {
                    return response([
                        "status" => false,
                        "message" => $tag . " tag was not found",
                        "data" => []
                    ], 406);
                }
            }

            $result = $this->checkAuthenticate($request);

            if ($result['status']) {
                $user = $result['data']['user'];
                Declaration::create(['user_id' => $user['id'],
                    'title' => $request->title,
                    'description' => $request->description,
                    'tags' => json_encode($request->tags),
                    'visibility' => boolval($request->visibility),
                    'type' => "found",
                    'image_source' => $request->image_source,
                ]);

                return response([
                    "status" => true,
                    "message" => "Declaration has been created",
                    "data" => []
                ], 200);
            } else {
                throw new \Exception('Token not found');
            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                "message" => $e->getMessage(),
                "data" => [],
            ], 401);
        }
    }

    function checkAuthenticate($request)
    {
        $UserController = new UserController();
        $authenticate = $UserController->authenticate($request);

        $result = json_decode(json_encode($authenticate), true)['original'];

        return $result;
    }

    public function getDeclaration(Request $request)
    {
        try {


            $result = $this->checkAuthenticate($request);

            if ($result['status']) {

                $declarations = json_decode(Declaration::all());
                foreach ($declarations as $declaration) {
                    $user = json_decode(User::where(['id' => $declaration->user_id])->first());

                    $declaration->created_at = Carbon::parse($declaration->created_at)->format('d/m/Y');
                    $declaration->updated_at = Carbon::parse($declaration->updated_at)->format('d/m/Y');
                    $declaration->tags = json_decode($declaration->tags);
                    $declaration->user = $user->name . ' ' . $user->surname;
                }
                return response([
                    "response" => true,
                    "message" => "Declarations viewing successful",
                    'data' => $declarations,
                ], 200);
            } else {
                throw new \Exception('Token not found');
            }
        } catch (\Exception $e) {
            return response([
                "status" => false,
                "message" => $e->getMessage(),
                "data" => [],
            ], 401);
        }
    }

    public function updateDeclaration(Request $request, $id)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:200',
            'description' => 'required|string|max:2000',
            'tags' => 'required|array',
            'image_source' => 'nullable|string',
            'visibility' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => [
                    "status" => false,
                    "message" => $validator->messages()->all(),
                    "data" => []
                ]]);
        }

        try {

            $result = $this->checkAuthenticate($request);
            if ($result["status"]) {

                $declaration = Declaration::find($id);

                if (!$declaration) {
                    throw new \Exception('Declaration not found.');
                }

                foreach ($request->tags as $tag) {
                    if (!Tag::where('name', $tag)->first()) {
                        return response([
                            "status" => false,
                            "message" => $tag . " tag was not found",
                            "data" => []
                        ], 406);
                    }
                }

                $declaration->title = $request->title;
                $declaration->description = $request->description;
                $declaration->tags = json_encode($request->tags);
                $declaration->image_source = $request->image_source;
                $declaration->visibility = boolval($request->visibility);
                $declaration->type = $request->type;
                $declaration->save();

                return response([
                    "status" => true,
                    "message" => "Declaration update successful",
                    "data" => $declaration,
                ], 200);

            } else {
                throw new \Exception("Token not found");
            }

        } catch (\Exception $e) {
            return response([
                "status" => false,
                'message' => $e->getMessage(),
                "data" => []
            ], 400);
        }
    }

    public function deleteDeclaration($id)
    {
        try {
            $declaration = Declaration::findOrFail($id);
            $declaration->delete();

            return response(['message' => 'İlan başarıyla silindi.']);
        } catch (\Exception $e) {
            return response([
                'message' => 'İlan silinemedi.',
                'error' => $e->getMessage()]);
        }
    }
}
