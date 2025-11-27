import { useState } from 'react';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

export default function MFAConfirm(){
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const tempToken = sessionStorage.getItem('tempToken');
      const res = await api.post('/auth/mfa/verify', { code, tempToken });
      // si correcto, server devuelve token final
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        sessionStorage.removeItem('tempToken');
        nav('/dashboard');
      } else {
        setMsg(res.data.message || 'Error');
      }
    } catch (err) {
      setMsg(err.response?.data?.message || 'Código inválido');
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Verificación MFA</h2>
      <input value={code} onChange={e => setCode(e.target.value)} placeholder="Código TOTP" required />
      <button type="submit">Verificar</button>
      <p>{msg}</p>
    </form>
  );
}






/*import { useState } from 'react';
import api from '../api/api';

export default function MFAConfirm() {
  const [code, setCode] = useState('');
  const [msg, setMsg] = useState('');

  const verify = async () => {
    try {
      const res = await api.post('/auth/mfa/verify', { code });
      setMsg(res.data.message);
    } catch {
      setMsg("Código incorrecto");
    }
  };

  return (
    <div>
      <h2>Verificar MFA</h2>
      <input value={code} onChange={e => setCode(e.target.value)} placeholder="Código TOTP" />
      <button onClick={verify}>Validar</button>
      <p>{msg}</p>
    </div>
  );
}
*/