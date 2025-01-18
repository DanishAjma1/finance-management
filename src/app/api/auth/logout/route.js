import cookie from 'cookie';

export default function handler(req, res) {
  res.setHeader('Set-Cookie', cookie.serialize('auth_token', '', {
    // httpOnly: true,
    secure: false,
    maxAge: 0,  // Expire the cookie
    path: '/pages/signIn',
  }));

  return res.status(200).json({ message: 'Logged out successfully' });
}
