<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreClientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
         return [
            'nom'            => 'required|string|max:100',
            'prenom'         => 'required|string|max:100',
            'cin'            => 'nullable|string|max:10|unique:clients,cin',
            'passeport'      => 'nullable|string|max:20|unique:clients,passeport',
            'date_naissance' => 'nullable|date',
            'nationalite'    => 'nullable|string|max:50',
            'telephone'      => 'nullable|string|max:20',
            'email'          => 'nullable|email|max:150|unique:clients,email',
            'adresse'        => 'nullable|string',
            'ville'          => 'nullable|string|max:100',
            'notes'          => 'nullable|string',
        ];
    }
    // fonction d'une règle personnalisée 
    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            if (empty($this->cin) && empty($this->passeport)) {
                $validator->errors()->add('cin', 'Le CIN ou le Passeport est obligatoire');
            }
        });
    }
    public function messages()
    {
    return [
        // nom
        'nom.required'        => 'Le nom est obligatoire',
        'nom.string'          => 'Le nom doit être une chaîne de caractères',
        'nom.max'             => 'Le nom ne doit pas dépasser 100 caractères',

        // prenom
        'prenom.required'     => 'Le prénom est obligatoire',
        'prenom.string'       => 'Le prénom doit être une chaîne de caractères',
        'prenom.max'          => 'Le prénom ne doit pas dépasser 100 caractères',

        // cin
        'cin.string'          => 'Le CIN doit être une chaîne de caractères',
        'cin.max'             => 'Le CIN ne doit pas dépasser 10 caractères',
        'cin.unique'          => 'Ce CIN est déjà utilisé',

        // passeport
        'passeport.string'    => 'Le passeport doit être une chaîne de caractères',
        'passeport.max'       => 'Le passeport ne doit pas dépasser 20 caractères',
        'passeport.unique'    => 'Ce passeport est déjà utilisé',

        // date_naissance
        'date_naissance.date' => 'Le format de la date de naissance est invalide',

        // nationalite
        'nationalite.string'  => 'La nationalité doit être une chaîne de caractères',
        'nationalite.max'     => 'La nationalité ne doit pas dépasser 50 caractères',

        // telephone
        'telephone.string'    => 'Le téléphone doit être une chaîne de caractères',
        'telephone.max'       => 'Le téléphone ne doit pas dépasser 20 caractères',

        // email
        'email.email'         => 'Le format de l\'email est invalide',
        'email.max'           => 'L\'email ne doit pas dépasser 150 caractères',
        'email.unique'        => 'Cet email est déjà utilisé',

        // adresse
        'adresse.string'      => 'L\'adresse doit être une chaîne de caractères',

        // ville
        'ville.string'        => 'La ville doit être une chaîne de caractères',
        'ville.max'           => 'La ville ne doit pas dépasser 100 caractères',

        // notes
        'notes.string'        => 'Les notes doivent être une chaîne de caractères',
    ];
}
}
