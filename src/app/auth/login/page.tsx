import { LoginForm } from '@/components/forms/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login page',
};

export default function LoginAuth() {
    return (
        <main>
            <LoginForm />
        </main>
    );
}
