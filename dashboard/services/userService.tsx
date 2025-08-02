import { projectId, publicAnonKey } from '../utils/supabase/info';

const BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-f1ea30b1`;

export interface User {
  id: string;
  name: string;
  cpf: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive' | 'blocked';
  isLeader: boolean;
  totalInvested: number;
  totalEarnings: number;
  referrals: number;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

class UserService {
  private async makeRequest(endpoint: string, options: RequestInit = {}) {
    const url = `${BASE_URL}${endpoint}`;
    
    try {
      console.log(`Making request to: ${url}`);
      
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
          ...options.headers,
        },
      });

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`API Error (${response.status}):`, errorText);
        
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { error: errorText || 'Unknown error' };
        }
        
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API Response:', data);
      return data;
    } catch (error) {
      console.error('Request failed:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      await this.makeRequest('/health');
      return true;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }

  async initializeDatabase(): Promise<void> {
    try {
      console.log('Initializing database...');
      await this.makeRequest('/init');
      console.log('Database initialized successfully');
    } catch (error) {
      console.error('Failed to initialize database:', error);
      throw error;
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      console.log('Fetching all users...');
      
      // First try health check
      const isHealthy = await this.healthCheck();
      if (!isHealthy) {
        throw new Error('Service unavailable');
      }
      
      // Try to get users
      const users = await this.makeRequest('/users');
      console.log(`Successfully fetched ${users.length} users`);
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      
      // If it fails, try to initialize database first
      try {
        console.log('Attempting to initialize database before retry...');
        await this.initializeDatabase();
        
        // Retry after initialization
        const users = await this.makeRequest('/users');
        console.log(`Successfully fetched ${users.length} users after initialization`);
        return users;
      } catch (initError) {
        console.error('Failed even after initialization:', initError);
        throw error; // Throw original error
      }
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      return await this.makeRequest(`/users/${id}`);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }

  async createUser(userData: Partial<User>): Promise<User> {
    try {
      return await this.makeRequest('/users', {
        method: 'POST',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: string, userData: Partial<User>): Promise<User> {
    try {
      return await this.makeRequest(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(userData),
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }

  async deleteUser(id: string): Promise<void> {
    try {
      await this.makeRequest(`/users/${id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }

  async updateUserStatus(id: string, status: User['status']): Promise<User> {
    try {
      return await this.makeRequest(`/users/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      });
    } catch (error) {
      console.error('Error updating user status:', error);
      throw error;
    }
  }

  async makeUserLeader(id: string, isLeader: boolean): Promise<User> {
    try {
      return await this.makeRequest(`/users/${id}/leader`, {
        method: 'PATCH',
        body: JSON.stringify({ isLeader }),
      });
    } catch (error) {
      console.error('Error updating user leader status:', error);
      throw error;
    }
  }
}

export const userService = new UserService();