import User from '../User/user.model.js';

class AuthService {
  static async login({ email, password }) {
    const user = await User.findOne({ email });

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res.status(HTTP_CODES.BAD_REQUEST).json({
        message: 'Incorrect password',
      });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = jwt.sign(payload, `${process.env.JWT_SECRET}`);

    return token;
  }
}

export default AuthService;
