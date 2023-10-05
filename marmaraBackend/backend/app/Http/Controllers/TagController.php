<?php

namespace App\Http\Controllers;

use App\Models\Tag;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TagController extends Controller
{
    public function createTag(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|unique:tags|max:100',
        ]);

        if ($validator->fails()) {
            return response([
                'message' => [
                    'status' => false,
                    'fails' => $validator->messages()->all()
                ]]);
        } else {
            try {


                $tag = Tag::create(['name' => $request->name]);

                if ($tag) {
                    return response([
                        'message' => [
                            'status' => true,
                        ]]);
                }
            } catch (\Exception $e) {
                return response([
                    'message' => [
                        'status' => $e->getMessage(),
                    ]]);
            }
        }
    }

    public function getTags(Request $request)
    {
        /*$UserController = new UserController();
        $result = $UserController->authenticate($request);
        $user = json_decode(json_encode($result), true)['original']['status'];
        if (!$user) {
            return response([
                'message' => [
                    'status' => 'notAuthenticated'
                ]]);
        }*/

        try {
            $tags = json_decode(Tag::all());
            foreach ($tags as $tag) {
                $tag->created_at = Carbon::parse($tag->created_at)->format('d/m/Y');
                $tag->updated_at = Carbon::parse($tag->updated_at)->format('d/m/Y');
            }
            return response([
                'message' => $tags,
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => [
                    'status' => $e->getMessage(),
                ]]);
        }
    }

    public function updateTag(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|unique:tags|string|max:100',
            ]);

            if ($validator->fails()) {
                return response([
                    "status" => false,
                    "message" =>$validator->messages()->all(),
                    "data" => []
                    ], 400);
            }

            $UserController = new UserController();
            $result = $UserController->authenticate($request);

            $user = json_decode(json_encode($result), true)['original']['status'];
            if (!$user) {
                return response([
                    'message' => [
                        'status' => 'notAuthenticated'
                    ]]);
            }

            $tag = Tag::find($id);

            if (!$tag) {
                return response([
                    'message' => [
                        'status' => false,
                        'fails' => 'noTag'
                    ]]);
            }

            $tag->name = $request->name;
            $tag->save();

            return response([
                'message' => [
                    'status' => true
                ]
            ]);
        } catch (\Exception $e) {
            return response([
                'message' => [
                    'status' => 'error',
                    'error_message' => $e->getMessage()
                ]
            ]);
        }
    }

    public function deleteTag($id)
    {
        try {
            $tag = Tag::findOrFail($id);
            $tag->delete();

            return response(['message' => 'Etiket başarıyla silindi.']);
        } catch (\Exception $e) {
            return response(['message' => 'Etiket silinemedi.']);
        }
    }

}
