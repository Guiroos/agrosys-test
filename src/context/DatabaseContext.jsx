import PropTypes from "prop-types";

import {
  createContext,
  useState,
  useContext,
  useMemo,
  useCallback,
  useEffect,
} from "react";

import { createAdmin, initializeDB, showDatabases } from "../utils/alasql";

export const DatabaseContext = createContext();

export function DatabaseProvider({ children }) {
  const [db, setDb] = useState(null);
  const [dbLoading, setDbLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDb = useCallback(
    (database) => {
      setDb(database);
    },
    [setDb]
  );

  const handleDbLoading = useCallback(
    (loading) => {
      setDbLoading(loading);
    },
    [setDbLoading]
  );

  const handleError = useCallback(
    (err) => {
      setError(err);
    },
    [setError]
  );

  const value = useMemo(
    () => ({
      db,
      dbLoading,
      error,
      handleDb,
      handleDbLoading,
      handleError,
    }),
    [db, dbLoading, error, handleDb, handleDbLoading, handleError]
  );

  useEffect(() => {
    handleDbLoading(true);

    const dbs = showDatabases();

    if (dbs.length === 2) {
      handleDb(false);
    }

    if (db) {
      handleDbLoading(false);
      return;
    }

    try {
      initializeDB()
        .then(() => {
          handleDb(true);
          handleDbLoading(false);
        })
        .then(() => {
          createAdmin();
        });
    } catch (error) {
      console.log("🚀 ~ useEffect ~ error:", error);
      handleDbLoading(false);
      handleError(error);
    }
  }, [db]);

  return (
    <DatabaseContext.Provider value={value}>
      {children}
    </DatabaseContext.Provider>
  );
}

export const useDatabaseContext = () => useContext(DatabaseContext);

DatabaseProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
