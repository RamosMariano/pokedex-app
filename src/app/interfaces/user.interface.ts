export interface User {

    username: string;
    password: string;
    rol: 'usuario' | 'admin';
    nombreVisible?: string;
    ciudad?: string;
    fotoPerfil?: string;
}
