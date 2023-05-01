import { users } from '../../data.js';

class UserModel {
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      if (!users.length) {
        reject({
          message: 'No users found',
        });
        return;
      }

      resolve(users);
    });
  }

  static getUserById(id) {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.id === id);

      if (!user) {
        reject({
          message: 'No user found',
        });
        return;
      }

      resolve(user);
    });
  }

  static createUser(user) {
    return new Promise((resolve, reject) => {
      if (!user.name || !user.email) {
        reject({
          message: 'Missing name or email',
        });
        return;
      }

      const newUser = {
        id: users.length + 1,
        tasks: [],
        ...user,
      };

      users.push(newUser);

      resolve(newUser);
    });
  }
}

export default UserModel;
