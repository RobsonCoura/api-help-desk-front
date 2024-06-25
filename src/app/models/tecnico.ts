// Interface Tecnico para representar dados de um técnico
export interface Tecnico {
    id?: any; // ID opcional
    nome: string; 
    cpf: string; 
    email: string;
    senha: string; 
    perfis: string[]; // Array de perfis do técnico
    dataCriacao: any; // Data de criação do técnico (tipo any para flexibilidade)
}
