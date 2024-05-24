import PropTypes from "prop-types";

import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
} from "react";

export const ApplicationContext = createContext();

export function ApplicationProvider({ children }) {
  const [pageLoading, setPageLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [token, setToken] = useState(null);

  const handlePageLoading = useCallback(
    (loading) => {
      setPageLoading(loading);
    },
    [setPageLoading]
  );

  const handleRefresh = useCallback(() => {
    setRefresh((prev) => !prev);
  }, [setRefresh]);

  const handleToken = useCallback(
    (token) => {
      setToken(token);
    },
    [setToken]
  );

  const value = useMemo(
    () => ({
      pageLoading,
      refresh,
      token,
      handlePageLoading,
      handleRefresh,
      handleToken,
    }),
    [pageLoading, refresh, token, handlePageLoading, handleRefresh, handleToken]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export const useApplicationContext = () => useContext(ApplicationContext);

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
