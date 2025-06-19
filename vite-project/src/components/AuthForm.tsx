import { useState } from 'react';
import { FormInput } from "../components/FormInput";
import { Button } from "../components/Button";

interface AuthFormData {
  name: string;
  email: string;
  password: string;
}

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: AuthFormData) => void;
  onSwitchMode: () => void;
}

export function AuthForm({ mode, onSubmit, onSwitchMode }: AuthFormProps) {
  const [formData, setFormData] = useState<AuthFormData>({
    name: '',
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === 'register' && (
        <FormInput
          type="text"
          name="name"
          placeholder="Nome completo"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      )}

      <FormInput
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />

      <FormInput
        type="password"
        name="password"
        placeholder="Senha"
        value={formData.password}
        onChange={handleInputChange}
        required
      />

      <Button type="submit" variant="primary">
        {mode === 'login' ? 'Entrar' : 'Criar Conta'}
      </Button>

      <div className="mt-6 text-center">
        <span className="text-gray-500">
          {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
        </span>
        <Button
          onClick={onSwitchMode}
          variant="link"
          type="button"
        >
          {mode === 'login' ? 'Cadastre-se' : 'Faça login'}
        </Button>
      </div>
    </form>
  );
}
