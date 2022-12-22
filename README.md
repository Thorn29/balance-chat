# BalanceChat

An app made for chatting, which divides users into chat rooms. After authenticating, you can create, edit or delete your own rooms. You can also view other users' profiles, their rooms, and the number of days since they registered. 

[See live demo](https://balance-chat.onrender.com/)

## Development

The app was built using **React** (with **Context** for managing user state) for the frontend, and **Node** & **Express** for the backend, and **socket.io** for the chat function. The data is stored in a **MongoDB** database.

## Local setup

If you wish to set up this project locally, you need to follow these steps

1. Download the code

2. Create a new **MongoDB Atlas** database

3. Import the two collections from the *db_collections* subfolder into the database

4. Create a new *config* folder in the root of the project

5. Inside the *config* folder create a *dev.env* file

6. Inside the *dev.env* file set up two variables, *JWT_SECRET* (jsonwebtoken secret word) and *MONGODB_URL* (which you'll get from Atlas)

7. Using your terminal, navigate into the *app* folder and run *npm install*

8. Using your terminal, navigate into the *server* folder and run *npm install*

9. Using your terminal, inside the *server* folder, run *npm run dev*

That's it, your app should be up and running!