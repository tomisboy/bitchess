# bitchess an online Multiplayer Chess Application with Node.js and chessboard.js

![2022-06-01-12-03-18](https://user-images.githubusercontent.com/15163807/171380403-a51e04d7-08f9-4bb3-acd6-10e4d05e969b.gif)

# Stack Description
Currently we are using a Linux Server from [hetzner](https://www.hetzner.com/) with a installed Docker-Runtime.
This server is also the Github Runner for [GitHub Actions](https://github.com/tomisboy/bitchess/blob/main/.github/info.MD)
The application itself is written in Node.js and deployed containerized via Docker.


### Overview 
![image](https://user-images.githubusercontent.com/15163807/162918234-db5700db-0bbe-4766-8225-70846457cfa9.png)


### TLS 
To ensure TLS encryption, the reverse proxy Traefik is used, which is also provided via Docker.
The provision of a TLS certificate from Let's Encrypt of the FQDN (https://bit-chess.de) runs via the ACME protocol and is renewed automatically. 

### Database
The database used is maria-db, which also runs locally on the Linux server as a Docker container.



## How to ensure that no secrets end up in Github in plain text:
For example, the password required by the application in the backend to connect the database is stored in an extra ".env" environment variable file, which is not stored in GitHub. (For local development, however, this file must be present).  <br>
![image](https://user-images.githubusercontent.com/15163807/159121449-25443351-be38-4dd3-8374-318fee16ff3a.png)

For the Productiv environment, this .env file is only [created during the CI/CD pipeline with GitHub actions](https://github.com/tomisboy/bitchess/blob/d96dbe0b545392f3c139bce8dd209dd35f66bcc0/.github/workflows/North-Stream2.yaml#L26). In this workflow the required secrets/passwords can be taken from the own Github Secret Store. 

