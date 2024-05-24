import alasql from "alasql";
import { comparePassword, hashPassword } from "./crypto";

export async function initializeDB() {
  alasql("CREATE LOCALSTORAGE DATABASE IF NOT EXISTS AgroSysDB");
  alasql("ATTACH LOCALSTORAGE DATABASE AgroSysDB");
  alasql("USE AgroSysDB");
  alasql(`CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT,
    username STRING,
    password STRING
  )`);
  alasql(`CREATE TABLE IF NOT EXISTS Clients (
    id INT AUTO_INCREMENT,
    full_name STRING,
    cpf STRING,
    birthdate STRING,
    telephone STRING,
    cellphone STRING
  )`);
  alasql(`CREATE TABLE IF NOT EXISTS Addresses (
    id INT AUTO_INCREMENT,
    client_id INT,
    zip_code STRING,
    street STRING,
    neighborhood STRING,
    city STRING,
    state STRING,
    country STRING,
    favorite BIT
  )`);
}

export function showDatabases() {
  return alasql("SHOW DATABASES");
}

export function showTables() {
  return alasql("SHOW TABLES");
}

export function dropDB(db) {
  alasql(`DROP DATABASE ${db}`);
}

export function createAdmin() {
  const admin = getUserDB("admin");

  if (admin.length) {
    return;
  }

  const hashedPassword = hashPassword("admin");

  alasql("INSERT INTO Users (username, password) VALUES (?, ?)", [
    "admin",
    hashedPassword,
  ]);
}

export function getUserDB(username) {
  return alasql(`SELECT * FROM Users WHERE username = '${username}'`);
}

export function loginUserDB(username, password) {
  const user = getUserDB(username);

  return user.length && comparePassword(password, user[0].password);
}

export function insertUserDB(username, password) {
  const user = getUserDB(username);

  if (user.length) {
    return false;
  }

  const hashedPassword = hashPassword(password);

  alasql("INSERT INTO Users (username, password) VALUES (?, ?)", [
    username,
    hashedPassword,
  ]);

  return true;
}

export function checkClientByCPF(cpf) {
  return alasql(`SELECT * FROM Clients WHERE cpf = '${cpf}'`);
}

export function getAllClientsDB() {
  const clients = alasql("SELECT * FROM Clients");

  return clients;
}

export function getClientByIdDB(clientId) {
  return alasql(`SELECT * FROM Clients WHERE id = ${clientId}`);
}

export function insertClientDB(client) {
  const clientExists = checkClientByCPF(client.cpf);

  if (clientExists.length) {
    return false;
  }

  alasql(
    "INSERT INTO Clients (full_name, cpf, birthdate, telephone, cellphone) VALUES (?, ?, ?, ?, ?)",
    [
      client.full_name,
      client.cpf,
      client.birthdate,
      client.telephone,
      client.cellphone,
    ]
  );

  return true;
}

export function deleteClientDB(clientId) {
  alasql(`DELETE FROM Addresses WHERE client_id = ${clientId}`);
  alasql(`DELETE FROM Clients WHERE id = ${clientId}`);
}

export function insertAddressDB(address) {
  if (address.favorite === 1) {
    alasql(
      `UPDATE Addresses SET favorite = 0 WHERE client_id = ${address.client_id}`
    );
  }

  alasql(
    "INSERT INTO Addresses (zip_code, street, neighborhood, city, state, country, favorite, client_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      address.zip_code,
      address.street,
      address.neighborhood,
      address.city,
      address.state,
      address.country,
      address.favorite,
      address.client_id,
    ]
  );

  return true;
}

export function deleteAddressDB(addressId) {
  alasql(`DELETE FROM Addresses WHERE id = ${addressId}`);
}

export function getClientAddressesDB(clientId) {
  return alasql(`SELECT * FROM Addresses WHERE client_id = ${clientId}`);
}

export function favoriteAddressDB(addressId, clientId) {
  alasql(`UPDATE Addresses SET favorite = 0 WHERE client_id = ${clientId}`);
  alasql(`UPDATE Addresses SET favorite = 1 WHERE id = ${addressId}`);
}

export function insertDatabase(jsonData) {
  const { users, clients, addresses } = jsonData;

  users.forEach((user) => {
    insertUserDB(user.username, user.password);
  });

  clients.forEach((client) => {
    insertClientDB(client);
  });

  addresses.forEach((address) => {
    insertAddressDB(address);
  });
}

export function downloadDatabase() {
  const users = alasql("SELECT * FROM Users");
  const clients = alasql("SELECT * FROM Clients");
  const addresses = alasql("SELECT * FROM Addresses");

  const blob = new Blob([JSON.stringify({ users, clients, addresses })], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "AgroSysDB.json";
  a.click();
}
