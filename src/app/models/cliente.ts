// Interface Cliente para representar dados de um cliente
export interface Cliente {
    id?: any; // ID opcional
    nome: string; 
    cpf: string; 
    email: string;
    senha: string; 
    perfis: string[]; // Array de perfis do cliente
    dataCriacao: any; // Data de criação do cliente (tipo any para flexibilidade)
}
