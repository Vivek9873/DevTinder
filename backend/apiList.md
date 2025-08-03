# DevTinder APIs

authRouter

- POST /signup
- POST /login
- POST /logout

ProfileRouter

- GET/ profile/view
- PATCH/profile/edit
- PATCH/profile/password

connnectionRequestRouter

- POST/request/send/interested/:userId
- POST/request/send/ignored/:userId
- POST/request/review/accepted/:requestId
- POST/request/review/rejected/:requestId

- GET/user/connections
- GET/user/requests/recieved
- GET/user/feed - Gets you the profiles of other users on platform

Status: ignore, interested, accepted, rejected
