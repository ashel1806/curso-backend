import { users } from '../../../data.js';

class UserModel {
  /* Función que devuelve todos los usuarios */
  static getAllUsers() {
    return new Promise((resolve, reject) => {
      // Si el arreglo de usuarios está vacío, rechazamos la promesa
      // con un mensaje de error: 'No users found'
      if (!users.length) {
        reject({
          message: 'No users found',
        });
        return;
      }

      // Si el arreglo de usuarios no está vacío, resolvemos la promesa
      resolve(users);
    });
  }

  /* Función que devuelve un usuario por su id */
  static getUserById(id) {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.id === id);

      // Si no encontramos el usuario, rechazamos la promesa
      if (!user) {
        reject({
          message: 'No user found',
        });
        return;
      }

      // Si encontramos el usuario, resolvemos la promesa
      resolve(user);
    });
  }

  static getUserByEmail(email) {
    return new Promise((resolve, reject) => {
      const user = users.find((user) => user.email === email);

      // Si no encontramos el usuario, rechazamos la promesa
      if (!user) {
        reject({
          message: 'No user found',
        });
        return;
      }

      // Si encontramos el usuario, resolvemos la promesa
      resolve(user);
    });
  }

  /* Función que permite crear un usuario */
  static createUser(user) {
    return new Promise((resolve, reject) => {
      // Si no hay nombre o email, rechazamos la promesa
      if (!user.username || !user.email || !user.password) {
        reject({
          message: 'Missing some fields',
        });
        return;
      }

      console.log(user)

      const newUser = {
        id: users.length + 1,
        ...user,
      };

      // Agregamos el usuario al arreglo de usuarios
      users.push(newUser);

      // Resolvemos la promesa con el usuario creado
      resolve(newUser);
    });
  }
}

export default UserModel;
