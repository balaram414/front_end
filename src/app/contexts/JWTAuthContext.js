import React, { createContext, useEffect, useReducer } from 'react';
import jwtDecode from 'jwt-decode';
import axios from 'axios.js';
import { MatxLoading } from 'app/components';

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: '',
  userType: '',
  userName: '',
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    console.log('wrong user');
    return false;
  }

  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
};

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;

      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user, userType } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
        userType,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'FORGOTPASSWORD': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',

  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
  forgotPassword: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:3001/api/users/signin', {
      email,
      password,
    });
    const user = response.data.data.user;
    const userType = response.data.data.userType;
    initialState.userType = userType;
    const accessToken = response.data.data.token;
    setSession(accessToken);
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
        userType,
      },
    });
  };

  const register = async (email, username, password) => {
    // let isEmailExist = await axios.get(
    //   `https://emailvalidation.abstractapi.com/v1/?api_key=69e5ca29becd434e8c29920ab276b60e&email=${email}`
    // );
    // if (isEmailExist.data.deliverability == 'UNDELIVERABLE') {
    //   alert('Invalid Email Id!');
    // } else {
    const response = await axios.post('http://localhost:3001/api/users/signup', {
      email,
      username,
      password,
    });
    alert(JSON.stringify(response.data.message));
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });
    //  }
    return response.data.message;
  };
  const forgotPassword = async (email, password) => {
    let isEmailExist = await axios.get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=69e5ca29becd434e8c29920ab276b60e&email=${email}`
    );

    const response = await axios.post('http://localhost:3001/api/users/forgotPassword', {
      email,
      password,
    });
    alert(JSON.stringify(response.data.message));
    const { accessToken, user } = response.data;

    setSession(accessToken);

    dispatch({
      type: 'FORGOTPASSWORD',
      payload: {
        user,
      },
    });
    //  }
    return response.data.message;
  };

  const logout = () => {
    initialState.userType = '';
    initialState.user = '';
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get('/api/auth/profile');
          const { user } = response.data;

          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
