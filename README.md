# ✈️ Air Ticket Booking System

This project is a simple **Air Ticket Booking System** built with **React** and **Redux**, using `json-server` as a mock backend for development and testing purposes.

---

## 📦 API Endpoints Reference

### 👤 Users

| ID  | Username | Password | Email                | Cards (example)                 |
| --- | -------- | -------- | -------------------- | ------------------------------- |
| 101 | john_123 | john123  | john.doe@example.com | 4111 1111 1111 1111, 12/25, 123 |
| 102 | jane_123 | jane123  | jane.doe@example.com | 5500 0000 0000 0004, 08/23, 456 |

> Endpoint: `/users`

---

### ✈️ Flights

| ID  | Flight No | Departure | Arrival    | Date       | Departure Time | Arrival Time | Price | Duration | Aircraft    | Available Seats | Gate | Terminal | Amenities                                 |
| --- | --------- | --------- | ---------- | ---------- | -------------- | ------------ | ----- | -------- | ----------- | --------------- | ---- | -------- | ----------------------------------------- |
| 1   | IND123    | india     | chandigarh | 02-01-2025 | 10:00 AM       | 1:45 PM      | 300   | 3h 45m   | Boeing 777  | 15              | A10  | T1       | Free WiFi, In-Flight Meals, Power Outlets |
| 2   | IND123    | india     | chandigarh | 02-01-2025 | 2:00 PM        | 5:00 PM      | 400   | 3h 45m   | Airbus A320 | 5               | B5   | T3       | Free Snacks, Power Outlets                |
| 3   | IND124    | india     | chandigarh | 12-01-2025 | 11:00 AM       | 2:30 PM      | 250   | 3h 30m   | Airbus A320 | 20              | B5   | T1       | Free Snacks, Power Outlets                |
| 4   | PUN628    | pune      | jaipur     | 25-07-2025 | 1:00 PM        | 12:00 AM     | 468   | 5h 31m   | Airbus A320 | 33              | D4   | T3       | Free WiFi, In-Flight Meals                |
| 5   | DEL146    | delhi     | mumbai     | 29-07-2025 | 5:00 AM        | 5:00 AM      | 478   | 4h 20m   | Embraer 190 | 33              | B2   | T1       | Free Snacks, Power Outlets                |
| 6   | CHE632    | chennai   | kolkata    | 17-06-2025 | 3:30 PM        | 1:30 AM      | 200   | 2h 52m   | Boeing 737  | 23              | A5   | T2       | Power Outlets                             |
| 7   | PUN960    | pune      | jaipur     | 22-07-2025 | 9:30 AM        | 5:00 PM      | 357   | 2h 24m   | Boeing 777  | 43              | C3   | T2       | Power Outlets                             |
| 8   | CHE814    | chennai   | kolkata    | 13-07-2025 | 10:00 PM       | 10:30 AM     | 529   | 1h 51m   | Airbus A320 | 10              | A5   | T2       | Free Snacks, Power Outlets                |
| 9   | DEL447    | delhi     | mumbai     | 24-05-2025 | 6:00 AM        | 3:30 PM      | 529   | 3h 07m   | Boeing 737  | 46              | C3   | T3       | Free Snacks, Power Outlets                |
| 10  | DEL941    | delhi     | mumbai     | 23-07-2025 | 9:00 AM        | 7:00 AM      | 232   | 4h 29m   | Airbus A320 | 19              | D4   | T3       | Free WiFi, In-Flight Meals                |
| 11  | DEL764    | delhi     | mumbai     | 03-07-2025 | 6:30 AM        | 2:00 PM      | 497   | 1h 31m   | Embraer 190 | 18              | A5   | T1       | Free Snacks, Power Outlets                |
| 12  | CHE507    | chennai   | kolkata    | 18-06-2025 | 12:30 PM       | 7:00 AM      | 278   | 1h 12m   | Airbus A320 | 19              | B2   | T1       | Free Snacks, Power Outlets                |
| 13  | CHE973    | chennai   | kolkata    | 08-07-2025 | 1:30 PM        | 3:30 AM      | 387   | 2h 01m   | Boeing 737  | 40              | A1   | T3       | Free WiFi, In-Flight Meals                |
|  |

> Endpoint: `/flights`

---

### 🧾 Bookings

Currently empty.

> Endpoint: `/bookings`
