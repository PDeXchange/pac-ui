import Keycloak from "keycloak-js";
// Keycloak configuration
let keycloakConfig = {
  // url: window._env_.REACT_APP_KEYCLOAK_URL,
  // realm: window._env_.REACT_APP_KEYCLOAK_REALM,
  // clientId: window._env_.REACT_APP_KEYCLOAK_CLIENT_ID,
  url: "http://vm-528.onecloud.stglabs.ibm.com:8080",
  realm: "pac",
  clientId: "pac-ui",
};

const _kc = new Keycloak(keycloakConfig);

/**
 * Initializes Keycloak instance and calls the provided callback function if successfully authenticated.
 *
 *@param onAuthenticatedCallback
 */

const initKeycloak = (onAuthenticatedCallback, errorCallback) => {
  _kc
    .init({
      onLoad: "check-sso",
      silentCheckSsoRedirectUri:
        window.location.origin + "/silent-check-sso.html",
      pkceMethod: "S256",
    })
    .then((authenticated) => {
      if (!authenticated) {
        console.log("user is not authenticated..!");
      }
      onAuthenticatedCallback();
    })
    .catch((error) => {
      console.error("Error initializing Keycloak:", error);
      errorCallback(error);
    });
};

const doLogin = _kc.login;

const doLogout = _kc.logout;

const getToken = () => _kc.token;
const getParsedToken = () => _kc.tokenParsed;

const getName = () => {
  return _kc.tokenParsed?.name;
};

const isLoggedIn = () => !!_kc.token;

const updateToken = (successCallback) =>
  _kc.updateToken(5)
  .then(successCallback)
  .catch(doLogin);

const getUsername = () => _kc.tokenParsed?.preferred_username;

const hasRole = (roles) => roles.some((role) => _kc.hasRealmRole(role));
const isAdminUser = () => hasRole(["manager"]);

const UserService = {
  initKeycloak,
  doLogin,
  doLogout,
  isLoggedIn,
  getToken,
  updateToken,
  getUsername,
  hasRole,
  getParsedToken,
  getName,
  isAdminUser,
};

export default UserService;
