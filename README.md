# Project Overview

This project is an application that aims to simulate a contact list of clients with their addresses. In it, you can log in, view and register clients, view and register addresses, and download all data. Follow the steps below to run the project:

1. Extract the project's zip file and navigate to the extracted folder in the terminal.

2. Install the necessary dependencies by executing the following command in the terminal:

```
npm install
```

NOTE: I used Node.js v18.19.1 and npm v10.2.4 to develop this project. Make sure you have these versions installed on your machine to run the project correctly.

3. Start the server by executing the following command:

```
npm run dev
```

4. After starting the server, you can access the application in your browser using the following URL:

```
http://localhost:5173/
```

5. To access the application, you can use the following credentials:

```
Username: admin
Password: admin
```

NOTE: These credentials will always be available, even if you delete or change them, just refresh the page.

Make sure to follow all the above steps to ensure the project runs correctly.

# Project Structure

The project is divided into several folders within the root folder. Here's an overview of each folder:

- **assets**: Contains image and font files.
- **components**: Contains reusable React components.
- **context**: Contains application contexts.
- **pages**: Contains application pages.
- **routes**: Contains application routes.
- **scss**: Contains customizable SCSS style files from Bootstrap.
- **utils**: Contains reusable utility functions (alasql, crypto).
- **App.jsx**: Main application file.
- **main.jsx**: Application initialization file.

# Data Structure

The application has a database, AgroSysDB, which is saved in LOCAL STORAGE, and three main entities: Users, Clients, and Addresses. These data are built with the alasql library, which serves as a traditional SQL database within the browser. Here's an overview of each entity:

## **Users**

Stores information about the application's users, who can log in through it. They have the following fields:

- **id**: Unique identifier of the user.
- **username**: User's username.
- **password**: User's password, which is encrypted with the crypto library.

## **Clients**

Stores information about the application's clients. They have the following fields:

- **id**: Unique identifier of the client.
- **full_name**: Client's full name.
- **cpf**: Client's CPF.
- **birthdate**: Client's birthdate.
- **telephone**: Client's telephone.
- **cellphone**: Client's cellphone.

## **Addresses**

Stores information about the addresses of the application's clients. They have the following fields:

- **id**: Unique identifier of the address.
- **client_id**: Identifier of the client associated with the address.
- **zip_code**: Address ZIP code.
- **street**: Address street.
- **neighborhood**: Address neighborhood.
- **city**: Address city.
- **state**: Address state.
- **country**: Address country.
- **favorite**: Indicates whether the address is the client's favorite.

# Application Features

The application has several features that allow users to interact with it. Here's an overview of each feature:

## **Login**

Os usuários podem fazer login na aplicação usando seu nome de usuário e senha. Se as credenciais estiverem corretas, eles serão
redirecionados para a página inicial da aplicação.

## Registration

Users can register in the application. They need to provide a username and password to register. If the username is already in use, they cannot register

## **Logout**

Users can log out of the application at any time. When they log out, they are redirected to the login page.

## **View Clients**

Users can view all clients registered in the application. They can see the full name, CPF, birthdate, telephone, and cellphone of each client.

## **Register Clients**

Users can register new clients in the application. They need to provide a full name, CPF, birthdate, telephone, and cellphone to register a new client. If the CPF is already registered, the user cannot register the client.

## **Delete Clients**

Users can delete clients registered in the application. They can do this by clicking on the delete button next to the client. When a client is deleted, all associated addresses are also deleted.

## **View Addresses**

Users can view all addresses registered in the application. They can see the ZIP code, street, neighborhood, city, state, country, and whether the address is favorite for each address.

## **Register Addresses**

Users can register new addresses in the application. They need to provide a ZIP code, street, neighborhood, city, state, country, and whether the address is favorite to register a new address.

## **Delete Addresses**

Users can delete addresses registered in the application. They can do this by clicking on the delete button next to the address.

## **Favorite Address**

Users can favorite an address in the application. They can do this by clicking on the favorite button next to the address. When an address is favorited, it is highlighted in the list of addresses.

## **Download Data**

Users can download all data from the application in a JSON file. The JSON file contains all information of users, clients, and addresses registered in the application.

## **Insert Initial Data**

Users can insert initial data into the application on the Login page, clicking in the cogs icon and selecting a JSON file with the following format:

```
{
  "users": [
    {
      "id": 1,
      "username": "admin",
      "password": "admin"
    }
  ],
  "clients": [
    {
      "id": 1,
      "full_name": "João da Silva",
      "cpf": "123.456.789-00",
      "birthdate": "01/01/1990",
      "telephone": "(11) 1234-5678",
      "cellphone": "(11) 98765-4321"
    }
  ],
  "addresses": [
    {
      "id": 1,
      "client_id": 1,
      "zip_code": "12345-678",
      "street": "Rua da Paz",
      "neighborhood": "Centro",
      "city": "São Paulo",
      "state": "SP",
      "country": "Brasil",
      "favorite": true
    }
  ]
}
```

NOTE: If you are having trouble with the JSON file, you can use the file `InitialData.json` in the root folder of the project.

# Road Map

Here are some features that can be added to the project in the future:

- **Update Clients/Addresses:** Allow users to update information of clients and addresses registered in the application.
- **Search Clients/Addresses:** Allow users to search for clients and addresses registered in the application.
- **Sort Clients/Addresses:** Allow users to sort the clients and addresses registered in the application.
- **Filter Clients/Addresses**: Allow users to filter the clients and addresses registered in the application.
- **Table Pagination:** Add pagination for the clients and addresses registered in the application.
- **Data Validation:** Add validation for CPF, ZIP code, telephone, and cellphone when registering clients and addresses in the application.
- **Form Validation:** Add yup for form validation to ensure users fill out all necessary fields correctly.
- **User Authentication:** Add user authentication to protect the application's routes.
- **Unit and End-to-End Testing:** Add tests to ensure the application code is functioning correctly.

# Technologies Used

- JavaScript
- Node.js
- React
- Bootstrap
- alasql
- crypto
