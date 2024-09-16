<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    public function register(Request $request) 
    {
        //Validando os dados
        $data = $request->only('name', 'email', 'password'); 
        $validator = Validator::make($data, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6|max:50'
        ]);

        //Envia mensagem de falha caso a requisisção seja inválida
        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        //Cria nova usuário
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);

        return response()->json([
            'succes' => true,
            'message' => 'Usuário criado com sucesso',
            'data' => $user
        ], Response::HTTP_OK);
    }

    public function authenticate(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required|string|min:6|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 400); // Corrige o status para 400
        }

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Login inválido.'
                ], 401); // Corrige o status para 401 (não autorizado)
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Não foi possível criar token.'
            ], 500); // Corrige o status para 500 (erro interno do servidor)
        }

        // Token criado, retorna mensagem de sucesso e token
        return response()->json([
            'success' => true,
            'authorization' => [
                'token' => $token,
                'type' => 'bearer',
            ]
        ]);
}


    public function logout(Request $request)
    {
        $validator = Validator::make($request->only('token'), [
            'token' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 200);
        }

        try{
            JWTAuth::invalidate($request->token);

            return response()->json([
                'success'=> true,
                'message'=> 'Usuário deslogado.'
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'success'=> false,
                'message'=> 'Usuário não pode ser deslogado'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    public function get_user(Request $request) 
    {
        $validator = Validator::make($request->only('token'), [
            'token' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->messages()], 400); // Status 400 para requisições inválidas
        }        

        $user = JWTAuth::authenticate($request->token);

        return response()->json(['user'=> $user]);
    }

}
