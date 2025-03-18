// Define interfaces, enum de roles e estrutura de perfil

export interface UserModelProfile {
  name: string;
  gender: 'male' | 'female' | 'other' | "";
  birthDate: Date | "";
  avatar?: string; // Base64 ou da foto de perfil
  company: string; // Local onde o usuário trabalha
}

export interface UserModel {
  _id: string;
  username: string;
  email: string;
  profile: UserModelProfile;
  createdAt: Date;
}
