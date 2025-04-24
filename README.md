Kazipay

A project that aims to enable seamless autonomous payments of construction workers through mobile money.

---

## Tech stack

1. Next.js
  
2. Convex/Express.js
  
3. ~~claude.ai~~
  

- Tracking working schedules thru facial recognition and time-stamping time-in and timeouts
- Workers include: masonry, plumbers, electricians, carpenters, cleaners, etc.
- ~~Using MCP servers to allow managers assign working schedules to workers among other tasks e.g. generating reports~~
  

---

## User interface

### 0. Onboarding

- [x] Users `register` by providing their phone number & image through `USSD` and `activate` their accounts (gets an `OTP` to verify their number)

### 1. Time-in flow

- [ ] user initiates an API call request to time-in
- [ ] the app initiates the camera to capture the image the add timestamp of the current date and time and sends the data. to the backend for storage
- [ ] user receives an SMS confirming the time-in

### 2. Timeout flow

- [ ] user initiates an API call request to check out
- [ ] the app initiates the camera to capture the image the add timestamp of the current date and time and sends the data. to the backend for storage
- [ ] user receives an `SMS` confirming the checkout

---

## Backend

### 1. Time-in flow

- [ ] receive request for a time-in then `generate a unique ID` to send to the client
- [ ] Await for image and date-time timestamp data the. store in the database
- [ ] schedule an SMS in the background with the worker’s details together with the date-time timestamp plus processed data.

### 2. Timeout flow

- [ ] receive request for a timeout then generate a unique ID to send to the client
- [ ] Await for image and date-time timestamp data the. store in the database
- [ ] schedule an SMS in the background with the worker’s details together with the date-time timestamp plus processed data.

---

# USSD:

- 1. Register
    
  2. Activate
    
  3. Time-in
    
  4. Timeout

---

Users(Roles):

- 1. Admin
- 2. Management
- 3. Workers 