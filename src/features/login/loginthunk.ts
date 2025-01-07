import { signIn, setLoginError } from './loginSlice'; 
import { AppDispatch } from '../../app/store';
import users from './users.json';  // Ajusta la ruta según tu estructura


export const loginThunk = (username: string, password: string) => (dispatch: AppDispatch) => {
    try {
      const user = users.find((user) => user.user === username && user.password === password);
  
      if (user) {
        const userData = { user: user.user, name: user.name };
        dispatch(signIn(userData)); 
      } else {
        dispatch(setLoginError("Credenciales incorrectas"));
      }
    } catch (error) {
      dispatch(setLoginError("Error en datos")); 
    }
  };
  
