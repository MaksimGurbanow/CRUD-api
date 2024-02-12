import { User } from 'src/types/Types';

export class Database {
  private users: User[];

  constructor() {
    this.users = [];
  }
 
  public async getAllUsers() : Promise<User[]> {
    return this.users;
  }

  public async getUserById(id: string) : Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  public async createUser(newUser: User) : Promise<User> {
    this.users.push(newUser);
    return newUser;
  }

  public async updateUser(id: string, updatedUser: User) : Promise<User | undefined> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      return updatedUser;
    }
    return undefined;
  }

  public async deleteUser(id: string) : Promise<boolean> {
    const index = this.users.findIndex((user) => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
      return true;
    }
    return false;
  }

}