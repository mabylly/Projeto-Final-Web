//arquivo para simular o banco de dados de usuários
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const users: User[] = [
  {
    id: '1',
    name: 'Usuário Teste',
    email: 'teste@pedagogia.com',
    password: '$2b$12$OQDwUSOVmlVVBqsVXf7it.eob1Xv37cLZI87ZUy6DIu8iuL4JYSBS',//1234
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const findUserByEmail = async (email: string) => users.find(u => u.email === email) || null;
export const findUserById = async (id: string) => users.find(u => u.id === id) || null;
export const createUser = async (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> => {
  const newUser: User = {
    ...data,
    id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date()
  };
  users.push(newUser);
  return newUser;
};
export const updateUser = async (id: string, updates: Partial<User>): Promise<User | null> => {
  const index = users.findIndex(u => u.id === id);
  if (index === -1) return null;
  users[index] = { ...users[index], ...updates, updatedAt: new Date() };
  return users[index];
};
