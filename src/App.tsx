import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Bookings } from "./pages/Bookings";
import { Rooms } from "./pages/Rooms";
import { Employees } from "./pages/Employees";
import { Contact } from "./pages/Contact";
import { SideBar } from "./components/SideBar";
import { useState, createContext, useReducer, useEffect} from "react";
import { Login } from "./pages/Login";
import { PrivateRoute } from "./components/PrivateRoute";
import { Header } from "./components/Header";
import { Layout, LeftContainer, RightContainer } from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BookingDetails } from "./pages/BookingDetails";
import { BookingUpdate } from "./pages/BookingUpdate";
import { RoomDetails } from "./pages/RoomDetails";
import { RoomUpdate } from "./pages/RoomUpdate";
import { EmployeeUpdate } from "./pages/EmployeeUpdate";
import { RoomCreate } from "./pages/RoomCreate";


interface GeneralContextInterface {
  loginState: InititialStateInterface;
  dispatchLogin: React.Dispatch<ActionsInterface>;
  viewSidebar: boolean;
  setViewSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}
export const GeneralContext = createContext<GeneralContextInterface>({
  loginState: { 
    authenticated: false,
    username: '',
    email: '',
    photo: ''},
  dispatchLogin: () => {},
  viewSidebar: true,
  setViewSidebar: () => {},
});

interface InititialStateInterface {
  authenticated: boolean;
  username: string;
  email: string;
  photo: string;
}


interface LoginInterface {
  type: 'LOGIN';
  payload: {
    username: string;
    email: string;
    photo: string;
  }
}
interface LogoutInterface {
  type: 'LOGOUT';
  payload: null
}
interface UpdateInterface {
  type: 'UPDATE';
  payload: {
    email: string;
    username: string;
  }
}
type ActionsInterface = LoginInterface | LogoutInterface | UpdateInterface;


const loginReducer = (state: InititialStateInterface, action: ActionsInterface) => {
  switch (action.type) {
    case 'LOGIN':
      return {...action.payload,authenticated: true};
    case 'LOGOUT':
      return {...state,authenticated: false};
    case 'UPDATE':
      console.log(action.payload)
      return {...state,...action.payload};
    default: 
      return {...state};
  }
}

function App() {
  const initialLoginState = () : InititialStateInterface => {
    try {
      const savedLoginState = localStorage.getItem('logged');
      if (savedLoginState) {
        console.log('Restaurando estado desde localStorage:', savedLoginState);
        return JSON.parse(savedLoginState) as InititialStateInterface;
      }
    } catch (error) {
      console.error('Error al leer desde localStorage:', error);
    }
    return { authenticated: false, username: '', email: '', photo: '' };
  };

  const [loginState, dispatchLogin] = useReducer(loginReducer, initialLoginState());
  const [viewSidebar, setViewSidebar] = useState(true);

  useEffect(() => {
    localStorage.setItem('logged', JSON.stringify(loginState));
  }, [loginState]);

  return (
    <BrowserRouter>
      <Provider store={store}>
        <GeneralContext.Provider value={{ viewSidebar, setViewSidebar, loginState, dispatchLogin }}>
          <Layout>
            <LeftContainer>
              <PrivateRoute><SideBar /></PrivateRoute>
            </LeftContainer>
            <RightContainer>
              <PrivateRoute><Header /></PrivateRoute>
              <Routes>
                <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/rooms" element={<PrivateRoute><Rooms /></PrivateRoute>} />
                <Route path="/login" element={<Login />} />
                <Route path="/bookings" element={<PrivateRoute><Bookings /></PrivateRoute>} />
                <Route path="/bookings/:bookingId" element={<PrivateRoute><BookingDetails /></PrivateRoute>} />
                <Route path="/rooms/:roomId" element={<PrivateRoute><RoomDetails /></PrivateRoute>} />
                <Route path="/bookings/update/:bookingId" element={<PrivateRoute><BookingUpdate /></PrivateRoute>} />
                <Route path="/rooms/update/:roomId" element={<PrivateRoute><RoomUpdate /></PrivateRoute>} />
                <Route path="/rooms/create" element={<PrivateRoute><RoomCreate /></PrivateRoute>} />
                <Route path="/contact" element={<PrivateRoute><Contact /></PrivateRoute>} />
                <Route path="/employees" element={<PrivateRoute><Employees /></PrivateRoute>} />
                <Route path="/employees/update/:employeeId" element={<PrivateRoute><EmployeeUpdate /></PrivateRoute>} />
              </Routes>
            </RightContainer>
          </Layout>
        </GeneralContext.Provider>
      </Provider>
    </BrowserRouter>
  );
}


export default App;
