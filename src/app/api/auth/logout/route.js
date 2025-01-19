import cookie from 'cookie';

export default function handler(res) {
  res.setHeader('Set-Cookie', cookie.serialize('auth_token', '', {
    // httpOnly: true,
    secure: false,
    maxAge: 0,  // Expire the cookie
    path: '/pages/signIn',
  }));

  return new Response({ message: 'Logged out successfully' },{
    status:200
  });
}
