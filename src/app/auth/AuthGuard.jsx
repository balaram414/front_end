import useAuth from 'app/hooks/useAuth';
import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
import AllPages from '../routes';

const userHasPermission = (pathname, user, routes) => {
  if (!user) {
    return false;
  }
  const matched = routes.find((r) => r.path === pathname);
  const authenticated =
    matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
  return authenticated;
};

const AuthGuard = ({ children }) => {
  let { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();

  const routes = flat(AllPages);
  //console.log(JSON.stringify(pathname) + '---' + JSON.stringify(routes) + '----' + isAuthenticated);
  const hasPermission = userHasPermission(pathname, user, routes);
  // let authenticated = isAuthenticated && hasPermission;
  // console.log(
  //   JSON.stringify(user) + '---' + JSON.stringify(hasPermission) + '----' + authenticated
  // );
  // // IF YOU NEED ROLE BASED AUTHENTICATION,
  // // UNCOMMENT ABOVE LINES
  // // AND COMMENT OUT BELOW authenticated VARIABLE

  let authenticated = isAuthenticated;

  return (
    <>
      {authenticated ? (
        children
      ) : (
        <Navigate replace to="/session/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
