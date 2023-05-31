<p float="left">
  <h1>Livy: Open Source AI Chat Bot and Counseling App for Mental Health</h1>
  <img src="client/client-mobile/assets/Logo.png" width="100" height="100">
</p>


Introducing Livy - the innovative new mobile app designed to revolutionize the world of online counseling. With Livy, users can connect with real counselors or chat with our very own AI-powered chatbot, Livy, for personalized counseling and therapy sessions.

Livy offers a convenient and flexible platform that allows users to receive support and guidance anytime, anywhere. Whether it's for stress management, relationship issues, or mental health concerns, Livy provides a safe and secure environment where users can explore their thoughts and feelings.

Our AI-powered chatbot, Livy, is designed to offer personalized support, guidance, and advice based on the user's individual needs and preferences. With Livy, users can chat 24/7, and receive immediate feedback and suggestions that can help them navigate their challenges.

Livy also connects users with licensed therapists, counselors, and mental health professionals for more in-depth and personalized counseling sessions. With Livy, users have the option to choose their preferred therapist, and schedule sessions that fit their busy schedules.

As a unique and innovative solution for online counseling, Livy has the potential to transform the mental health industry. Join us in bringing this groundbreaking app to the world, and help us make a difference in the lives of millions of people around the globe.


## Issues and Bug Reports

If you encounter any issues or bugs while using Livy, please let us know by opening an issue in our [issue tracker](https://github.com/h8-hackathon/livy/issues).

## License

Livy is released under the [MIT License](LICENSE).


## How to deploy the Server

1. Clone the repo on your server
2. Enter to server directory
3. Copy `.env.template` to `.env`
4. Edit file `server/services/admin/data/user.json` if you want to add spesific `admin`, below is the example object, admin role used to login to the CMS.

  ```json
  {
    "name": "Admin Fachri Super",
    "email": "fhawari@hacktiv8.com",
    "gender": "F",
    "dob": "01/01/1864",
    "image": "https://upload.wikimedia.org/wikipedia/commons/7/7e/Kendall_Jenner_at_Met_Gala_2021_5.jpg",
    "role": "admin",
    "helpful": 5
  }
  ```

5. RUN `docker compose up -d`
6. Enter to `admin-service` container terminal
7. Run `npx sequelize-cli db:create && npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all`
8. All good now.
