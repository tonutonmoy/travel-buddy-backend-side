# Travel Buddy Matching Assignment 8

- Describe:

  This is a travel body matching backend project.Here you can registration and login also.then you will create a trip and request to the another people for joining your trip.You can approve the pending request and you can update your profile.You can searching or filtering easily in this project

* Instruction to run this project locally:

  - 1: clone this repository.

  - 2: write this command on your terminal:

        npm install

  - 3: create a file .env and paste it into this file:

         DATABASE_URL=postgres://postgres.ydltxxxywzusszwhfxty:x69B0EbSW50bQtgw@aws-0-ap-southeast-1.pooler.supabase.com:5432/postgres

         PORT=3000

         JWT_SECRET="ksfljkdsjflksdjflk"

         EXPIRES_IN="30d"

  - 4: npm run start

  - 5: npx prisma studio

* all apis:

      1. User Registration
         Endpoint: POST /api/register
         Request Body:
         Note: You may need to use transaction for creating user and user profile altogether
         {
        "name": "John Doe",
        "email": "john@example.com",
        "password": "password", // password should be stored as a hash
        "profile": {
            "bio": "Passionate about helping people find their lost items.",
            "age": 30
        	}
         }
         Response (Response should not include the password):
         Note: In response you don’t need to send the user profile info, just send the user info
         {
             "success": true,
             "statusCode": 201,
             "message": "User registered successfully",
             "data": {
                 "id": "b9964127-2924-42bb-9970-60f93c016bvf",
                 "name": "John Doe",
                 "email": "john@example.com",
                 "createdAt": "2024-03-24T12:00:00Z",
                 "updatedAt": "2024-03-24T12:00:00Z"
             }
         }


      2. User Login
         Endpoint: POST /api/login
         Request Body:
         {
             "email": "john@example.com",
             "password": "password"
         }
         Response:
         {
             "success": true,
             "statusCode": 200,
             "message": "User logged in successfully",
             "data": {
                 "id": "b9964127-2924-42bb-9970-60f93c016bvf",
                 "name": "John Doe",
                 "email": "john@example.com",
                 "token": "<JWT token>",
             }

         }


       3. Create a Trip
          Endpoint: POST /api/trips
          Request Headers:
          Authorization: <JWT_TOKEN>
          Request Body:
          {
              "destination": "Paris, France",
              "startDate": "2024-06-01",
              "endDate": "2024-06-07",
              "budget": 1500,
              "activities": ["Eiffel Tower visit", "Louvre Museum tour"],
          }
          Response:
          {
              "success": true,
              "statusCode": 201,
              "message": "Trip created successfully",
              "data": {
                  "id": "b9964127-2924-42bb-9970-60f93c016ghi",
                  "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
                  "destination": "Paris, France",
                  "startDate": "2024-06-01",
                  "endDate": "2024-06-07",
                  "budget": 1500,
                  "activities": ["Eiffel Tower visit", "Louvre Museum tour"],
                  "createdAt": "2024-03-24T12:00:00Z",
                  "updatedAt": "2024-03-24T12:00:00Z"
          		}
          }

        4. Get Paginated and Filtered Trips
           Endpoint: GET /api/trips
           Query Parameters for API Requests:

           When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

           destination: (Optional) Filter trips by destination.
           startDate: (Optional) Filter trips by start date.
           endDate: (Optional) Filter trips by end date.
           budget: (Optional) Filter trips by budget range. Example: ?minBudget=100&maxBudget=10000
           searchTerm: (Optional) Searches for trips based on a keyword or phrase. Only applicable to the following fields: destination, budget, etc.
           page: (Optional) Specifies the page number for paginated results. Default is 1. Example: ?page=2
           limit: (Optional) Sets the number of data per page. Default is 10. Example: ?limit=5
           sortBy: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: destination, budget. Example: ?sortBy=budget
           sortOrder: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending). Example: ?sortOrder=desc
           Response:
           {
               "success": true,
               "statusCode": 200,
               "message": "Trips retrieved successfully",
               "meta": { // only for paginated result
                 "page": 1,
                 "limit": 10,
                 "total": 20
           	   },
               "data": [
                   {
                       "id": "b9964127-2924-42bb-9970-60f93c016ghi",
                       "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
                       "destination": "Paris, France",
                       "startDate": "2024-06-01",
                       "endDate": "2024-06-07",
                       "budget": 1500,
                       "activities": ["Eiffel Tower visit", "Louvre Museum tour"],
                       "createdAt": "2024-03-24T12:00:00Z",
                       "updatedAt": "2024-03-24T12:00:00Z"
                   },
                   // More trips
               ]
           }

        5. Send Travel Buddy Request

           Endpoint: POST /api/trip/:tripId/request
           Request Headers:
           Authorization: <JWT_TOKEN>
           Request Body:
           {
           "userId": "b9964127-2924-42bb-9970-60f93c016xyz"
           }
           Response:
           {
           "success": true,
           "statusCode": 201,
           "message": "Travel buddy request sent successfully",
           "data": {
           "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
           "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
           "userId": "b9964127-2924-42bb-9970-60f93c016bvf",
           "status": "PENDING",
           "createdAt": "2024-03-24T12:00:00Z",
           "updatedAt": "2024-03-24T12:00:00Z"
           }
           }

        6. Get Potential Travel Buddies For a Specific Trip
           Endpoint: GET /api/travel-buddies/:tripId
           Request Headers:
           Authorization: <JWT_TOKEN>
           Response:
           {
           "success": true,
           "statusCode": 200,
           "message": "Potential travel buddies retrieved successfully",
           "data": [
           {
           "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
           "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
           "userId": "b9964127-2924-42bb-9970-60f93c016xyz",
           "status": "PENDING",
           "createdAt": "2024-03-24T12:00:00Z",
           "updatedAt": "2024-03-24T12:00:00Z",
           "user": {
           "name": "John Doe",
           "email": "john@example.com",
           // other user fields are optional
           }
           },
           // More potential travel buddies
           ]
           }

        7. Respond to Travel Buddy Request
           Endpoint: PUT /api/travel-buddies/:buddyId/respond
           Request Headers:
           Authorization: <JWT_TOKEN>
           Request Body:
           {
           "status": "APPROVED"
           }
           Response:
           {
           "success": true,
           "statusCode": 200,
           "message": "Travel buddy request responded successfully",
           "data": {
           "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
           "tripId": "b9964127-2924-42bb-9970-60f93c016ghi",
           "userId": "b9964127-2924-42bb-9970-60f93c016xyz",
           "status": "APPROVED",
           "createdAt": "2024-03-24T12:00:00Z",
           "updatedAt": "2024-03-24T12:05:00Z"
           }
           }


        8. Get User Profile
           Endpoint: GET /api/profile
           Request Headers:
           Authorization: <JWT_TOKEN>
           Response:
           {
           "success": true,
           "statusCode": 200,
           "message": "User profile retrieved successfully",
           "data": {
           "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
           "name": "John Doe",
           "email": "john@example.com",
           "createdAt": "2024-03-24T12:00:00Z",
           "updatedAt": "2024-03-24T12:00:00Z"
           }
           }


        9. Update User Profile
           Endpoint: PUT /api/profile
           Request Headers:
           Authorization: <JWT_TOKEN>
           Request Body:
           {
           "name": "John Sina",
           "email": "john.doe@example.com"
           }
           Response:
           {
           "success": true,
           "statusCode": 200,
           "message": "User profile updated successfully",
           "data": {
           "id": "9b0dadf5-10fd-41d1-8355-80e67c85727c",
           "name": "John Sina",
           "email": "john.doe@example.com",
           "createdAt": "2024-03-24T12:00:00Z",
           "updatedAt": "2024-03-24T12:05:00Z"
           }
           }
           This endpoint allows users to update their profile information such as name and email.
