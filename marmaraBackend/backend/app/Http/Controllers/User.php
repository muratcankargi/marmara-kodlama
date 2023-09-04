<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mockery\Exception;

class User extends Controller
{

    public function isStudent(Request $request)
    {
        $data = ($request->all());

        $personalId = $data['TCKimlikNo'];
        $fatherName = $data['BabaAdi'];
        $birthDate = $data['DogumTarihi'];

        $formatControl = preg_match('/^\d{4}-\d{2}-\d{2}$/', $birthDate);

        if ($personalId != "" && $fatherName != "" && $formatControl) {
            try {
                $response = $this->doCurl(json_encode($data), 'POST');

                if ($response->OgrenciNo) {

                    return ['name' => $response->Ad, 'surname' => $response->Soyad, 'studentNumber' => $response->OgrenciNo];

                } else {

                    return "false";

                }
            } catch (\Exception $e) {
                return "false";
            }
        } else {
            return "false";
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
}
