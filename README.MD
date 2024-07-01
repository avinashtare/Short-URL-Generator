
[comment]: <> (into image)

![Pckd](https://user-images.githubusercontent.com/48997634/157104510-21df472c-d0d9-4075-96f1-18aded5905a5.png)

# 🔗 Short URL Generator

Welcome to the Short URL Generator project! This project is designed to create shortened versions of URLs, making them easier to share and manage. It is built using Node.js, Express.js, React, and MySQL.

## 📋 Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Contributing](#Contributing)
- [License](#license)
- [Contact](#Contact)
- [Author](#Author)

## 📖 Introduction
The Short URL Generator is a web application that allows users to generate short URLs for longer links. This can be particularly useful for sharing links on social media, emails, or other platforms where a shorter link is preferred.

## ✨ Features

- 🔗 Generate short URLs from long URLs
- 🔄 Redirect short URLs to the original long URLs
- 📋 View a list of generated URLs
- 🖥️ Simple and user-friendly interface
- 🔐 User authentication with login and signup
- 📈 Track the number of clicks on each short URL


## 🛠️ Installation
To get a local copy up and running, follow these steps:

### Prerequisites
- Node.js installed on your machine
- MySQL installed and running

### Backend Setup
1. Clone the repository:

   ```sh
   git clone https://github.com/your-username/short-url-generator.git
   ```
2. Navigate to the backend directory:
   ```sh
   cd short-url-generator/server
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```
4. Set up your Enviroment file and database the configuration in `.env.example` & rename to .env.
   ```
    PORT=5000

    # MYSQL Credentials
    MYSQL_HOST = ""
    MYSQL_USER = ""
    MYSQL_PASSWORD = ""
    MYSQL_DATABASE_NAME = ""

    #JWT Secure key
    SecretKey = "shuuuu...."

    # Shortcut Doamin Name
    SHORTCUT_URL_DOMAIN = "add your domain name example(shortly.com)" 
   ```

5. Run the backend server:
   ```sh
   npm start
   ```


### Frontend Setup

1. Navigate to the frontend directory:
   ```sh
   cd ../client
   ```
2. Install NPM packages:
   ```sh
   npm install
   ```
3. Set up your Enviroment file and database the configuration in `.env.example` & rename to .env.
   ```sh
   VITE_Server_URL = "http://localhost:5000 (add your backend server url)"
   ```

4. Run the frontend development server:
   ```sh
   npm start
   ```

## 🚀 Usage

1. Open your browser and navigate to `http://localhost:5173` to access the frontend application.
2. Register for an account or log in if you already have one.
3. Enter a long URL in the input field and click the "Shorten" button to generate a short URL.
4. Use the generated short URL to redirect to the original long URL.
5. View the number of clicks on each short URL.

## 🛠️ Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: Vite React
- **Database**: MySQL


## 🤝 Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request


## 📜 License
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
Distributed under the MIT License. See [License](./LICENSE) for more information.

## 📞 Contact

If you have any questions or suggestions about this project, please feel free to reach out.

- Email: avinashtare.work@gmail.com

## 👤 Author

卐🕉 Avinash Tare 🕉 卐