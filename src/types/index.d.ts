export interface User {
    name: string;
    email: string;
}
export interface BankAccount {
    id: number;
    account_number: string;
    balance: number;
}
export interface Transaction {
    id: number;
    amount: number;
    transfer_type: 'sent' | 'received';
    transfer_method: number;
    status: string;
    created_at: string;
}
export interface LoginForm {
    email: string;
    password: string;
}
export interface SignUpForm {
    name: string;
    email: string;
    password: string;
}
export interface TransferForm {
    from_user_bank_account_id: number | null;
    to_user_bank_account_id: number | null;
    amount_to_transfer: number | null;
    transfer_type: number;
}
export interface Filters {
    start_date: string;
    end_date: string;
    transfer_type: string;
    page: number;
}
export interface Pagination {
    current_page: number;
    total_pages: number;
    total_records: number;
}
export interface Snackbar {
    show: boolean;
    message: string;
    color: string;
}
export interface MenuItem {
    title: string;
    icon: string;
    value: string;
}
