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

import { supabase } from '../utils/supabaseClient';

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
  },

  async loginAdmin(email: string, password: string): Promise<User> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data.user) {
      throw new Error('Login failed, no user data returned.');
    }

    const { data: userProfile, error: profileError } = await supabase
      .from('User')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      throw new Error(profileError.message);
    }

    if (!userProfile || !userProfile.isAdmin) {
      await supabase.auth.signOut();
      throw new Error('Access denied. Not an administrator.');
    }

    return userProfile as User;
  }
};