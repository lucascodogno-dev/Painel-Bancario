export declare const apiRequest: (endpoint: string, options?: RequestInit, token?: string) => Promise<any>;
export declare const formatCurrency: (value: number) => string;
export declare const formatDate: (dateString: string) => string;
export declare const validationRules: {
    required: (value: any) => true | "Campo obrigatório";
    email: (value: string) => true | "Email inválido";
    positive: (value: number) => true | "Valor deve ser positivo";
};
