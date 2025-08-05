export interface User {
  id: string;
  email: string;
  nickname: string;
  telefone?: string;
  fotoPerfil?: string;
  saldoDeCompra: number;
  saldoRendimentos: number;
  saldoBonus: number;
  isAdmin: boolean;
  isLider: boolean;
  isGerente: boolean;
  isBloqueado: boolean;
  isOnline: boolean;
  criadoEm: string;
}

export const userService = {
  async healthCheck(): Promise<boolean> {
    return true;
  },

  async getAllUsers(): Promise<User[]> {
    return [];
  },

  async initializeDatabase(): Promise<void> {
    return;
  },

  async makeUserLeader(userId: string, isLeader: boolean): Promise<void> {
    return;
  },

  async updateUserStatus(userId: string, status: string): Promise<void> {
    return;
  }
};