# Apartmenify-App-React-Redux-Toolkit-Supabase

Apartmenify is a web application that simulates the renting of the existing apartments. The application consists of two parts: 
  a) admin dashboard - if you are authenticated as an admin with your credentials, you can manage apartments, reservations, apartment`s facilities
                       and all logged users with CRUD operations. The authentication is managed by Supabase Auth API.
                       Admin dashboard contains 4 main routes:
                          a) apartments - this route contains all added apartments by admin. Each apartment object has properties like title, description, address,                                               price 
                                          per night, facilities and other. The apartments can be filtered and sorted by various criteria (mostly based on their 
                                          properties). Admin can do DELETE and UPDATE operations on each of the apartment. When clicking on UPDATE operation, page 
                                          redirects to the new route (same as previous route - but with added apartment`s ID), which contains the new form with                                                   selected apartment`s details. Apartments router also contains the route for adding new apartment to database. 
                          b) facilities - this route contains all currently added facilities to database which have been used in added apartment previously. The route
                                          also contains all of the filtered apartments by their facilities. E.g. - if one apartment contains facilities like 'Wi-Fi'                                             and 
                                          'Parking', then those facilities will be shown as clickable Link components, such as 'Wi-Fi - 1', because only one apartment
                                          has 'Wi-Fi' as the current facility. All calculations are performed in Redux Toolkit state management, using memoized
                                          selectors. So when admin clicks on each of the facilities, the route shows apartments which are filtered by selected                                                   facility.
                          c) reservations - this route contains all of the reservations that users made. Each reservation is displayed as their respective properties, 
                                            such as user which made the reservation, starting date, ending date, apartment`s title etc. Admin can perform UPDATE and                                               DELETE operations on each one. 
                          d) users - this route contains all registered users. Each user is displayed as their respective properties, such as ID, username, email and
                                    role. 
                                    
      Admin dashboard`s routes will be protected, so they do not get exposed publicly.
      The main layout of the admin dahsboard is called Main. Main contains different parts - such as Navbar and content routes (usually called Outlet in React Router).
      
  b) public (user) dashboard - if you are authenticated as an regular user with your credentials, you can select manage your reservations, reserve apartments, manage 
                               your personal info, manage wishlists, contact admin through the form and get a response and change languages. The authentication is 
                               managed by Supabase Auth API.
                               User dashboard contains 5 main routes:
                                  a) apartments - this route contains all the apartments that user can select, reserve and add to wishlists. The apartments can be
                                                  filtered and sorted by various criteria (mostly based on their properties). When user clicks on each apartment, page 
                                                  redirects to the selected apartment, and displays all of its properties (including images) and the form component to 
                                                  with name, surname and date-range picker for the reservation. Each user can have multiple reservations on the same
                                                  apartment and can have as many as there are available dates on the same or the different apartment.
                                  b) contact - this route contains the form in which user can submit his own questions about anything. The data is sent to admin`s
                                               email (or possible future-built message system in the app).
                                  c) manage Account - this route contains all of the crucial user data, which can be modified and sent back to the database.
                                  d) reservations - this route contains all of the user`s reservations, which can bi filtered via reservation status - which can be
                                                    confirmed, inProgress, finished and canceled. Current reservations contains all of the reservations with status 
                                                    of confirmed and inProgress. Previous reservations contains all of the reservations with status of finished, and
                                                    canceled reservations contains all of the reservations with the status of canceled.
                                                    Other features: 
                                                      a) current reservations CAN BE CANCELED
                                                      b) previous reservations have the feature to navigate to the apartment which WAS PREVIOUSLY RESERVED - so that
                                                         user can RESERVE IT AGAIN if wanted
                                                      c) canceled reservations CAN BE REMOVED INDEFINITELY
                                  e) saved - this route contains all of the user`s wishlists, which can be managed with CRUD operations. Each wishlists also contains
                                             the value of how many apartments are saved under it. I will implement more features in the future.
                                             
       User dashboard`s routes will be public, so they can also be accessed if user is not registered.
       The main layout of the USER dahsboard is called Main. Main contains different parts - such as Navbar and content routes (usually called Outlet in React                Router).    
       
       Admin and user dashboards are both containing the LogOut feature, which is implemented with Supabase Auth API. 
       App.jsx is the main entry point of this application, which contains all the routes (admin and user)
       
       
Technologies user in this application are:
    a) React.js - React is my primary frontend library tool, and currently the only I work with. This application is developer using Vite build tool with React.
    b) Javascript - my primary language which I use on daily basis. I also plan to migrate this project to TypeScript.
    c) Tailwind - CSS framework that is just fast, reliable and very intuitive to work with, and can`t ask for better tool in my opinion for styles
    d) Supabase - Backened-as-a-service platform which contains all of the app`s data, based of PostgreSQL
    e) Redux Toolkit - my primary state management tool which I use on daily basis, which simplifies builing and managing data, and currently the only one state
                       management system that I use actively.
                       

This application is currently still in progress! 
