// Define interfaces, enum de roles e estrutura de perfil

export interface UserProfile {
  name: string;
  gender: "male" | "female" | "other";
  birthDate: Date;
  avatar?: string; // Base64 ou URL da foto de perfil
  company?: string; // Local onde o usuário trabalha
}

export interface User {
  _id: string;
  email: string;
  profile: UserProfile;
  createdAt: Date;
}
