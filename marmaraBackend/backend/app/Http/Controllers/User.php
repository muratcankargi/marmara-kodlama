<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class User extends Controller
{

    public function isStudent()
    {
        $data = $this->json();
        $curl = curl_init();
        curl_setopt_array($curl, array(
            CURLOPT_URL => $_ENV['CURLOPT_URL'],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
            CURLOPT_CUSTOMREQUEST => 'POST',
            CURLOPT_POSTFIELDS => '{"TCKimlikNo":' . $data->TCKimlikNo . ',"BabaAdi":"' . $data->BabaAdi . '","DogumTarihi":"' . $data->DogumTarihi . '"}',
            CURLOPT_HTTPHEADER => array(
                'Accept: application/json, text/javascript, */*; q=0.01',
                'Content-Type: application/json',
                'Cookie: ' . $_ENV['COOKIE'],
                'X-CSRF-TOKEN: ' . $_ENV['X_CSRF_TOKEN'],
            ),
        ));

        $response = json_decode(curl_exec($curl));

        curl_close($curl);
        if($response->OgrenciNo){
            return ['name'=>$response->Ad, 'surname'=>$response->Soyad, 'studentNumber'=>$response->OgrenciNo];
        }
        else{
            return false;
        }
    }

    public static function json()
    {

        $input = file_get_contents("php://input");
        $json = json_decode($input);

        if (json_last_error() !== JSON_ERROR_NONE) {
            return false;
        }

        return $json;
    }

}
