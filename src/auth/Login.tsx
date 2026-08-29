import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';

export default function Login() {
  const [email, setEmail] = useState('team@example.com');
  const [password, setPassword] = useState('123456');

  const login = async () => {
    if (!auth) {
      alert('Firebase غير مهيأ. أضف متغيرات البيئة أولاً.');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('تم تسجيل الدخول');
    } catch (error) {
      console.error(error);
      alert('بيانات الدخول غير صحيحة');
    }
  };

  return (
    <div>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={login}>دخول</button>
    </div>
  );
}