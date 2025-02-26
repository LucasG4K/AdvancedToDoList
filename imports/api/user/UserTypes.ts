// Define interfaces, enum de roles e estrutura de perfil

export interface UserProfile {
  name: string;
  gender: "male" | "female" | "other";
  avatar?: string; // Base64 ou URL da foto de perfil
  industry?: string; // Local onde o usuário trabalha
}

export interface User {
  _id: string;
  email: string;
  profile: UserProfile;
  createdAt: Date;
}
