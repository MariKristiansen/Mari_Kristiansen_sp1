# WeDeliverTECH <img width="150" alt="company logo" src="https://user-images.githubusercontent.com/125880906/236834585-9ad0a06a-3f72-4cae-9c50-a96f21181200.png">

## Reception Management dashboard
The web application will help the receptionist at We Deliver Tech (WDT) to manage:
- Staff members out-of-office logging
    - Keep track of their staff members
    - Clock staff members in and out

- Deliveries tracking
    - Keep track of current deliveries
    - Keep track of avaliable drivers


#### "Staff" table
The receptionist can select the desired staff member by clicking on their row. After selecting the staff member the receptionist can click the "Out" button and enter the number of minutes the staff member will be out of office. The staff members status will change, and the out time will be displayed, as well as the expected return time. 
The receptionist can select a staff members row that is out of office, and click the "In" button. The staff members status will then be set to "In", and the Out time, Duration and Expected return time will be cleared. 
If the staff member is late, a toast notification will show. 

#### "Schedule Delivery" table
The receptionist can add drivers that are currently working and out for delivery, by manually inputting their info (vehicle type, name, phone number, delivery address and return time).
The receptionsist input will be displayed in the "Delivery Board" table.

#### "Delivery Board"
The receptionist can select a desired delivery driver and click the "Clear" button if the drivers has returned. 
If a driver is late, a toast notification will show.


## Installation
1. Clone the repository to your local machine.
2. Open the html file in your web browser. 


## Other information
The project was developed using HTML, CSS, JavaScript, jQuery, Bootstrap, and OOP (Object Oriented Programming).


### Sources
<strong><em>style.css:</em></strong>
- Line 78: used parts of a code snippet from https://codepen.io/Ajiva/pen/YzpNdGe for removing white background from image.

    <img height="200" alt="code snippet" src="https://github.com/MariKristiansen/Mari_Kristiansen_sp1/assets/125880906/ead907c8-ce1e-4cfe-acb9-8a2f6365b894">

<strong><em>wdt_app.js:</em></strong>
- Line 171: figured out the correct character classes from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes
- Line 177: learned how to use "," to get a certain number or more, from the code snippet /\d{8,}/ at https://stackoverflow.com/questions/5416250/regex-contains-at-least-8-decimal-digitshttps://stackoverflow.com/questions/5416250/regex-contains-at-least-8-decimal-digits
- Line 183: learned more about character classes from https://docs.netapp.com/us-en/oncommand-insight/config-admin/regular-expression-examples.html#example-6-showing-computer-names-with-a-pattern
- Line 267: learned about the dataset property at https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes and https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
- Line 310: https://www.tabnine.com/code/javascript/functions/builtins/setHours

    
    <img width="350" alt="code snippet" src="https://github.com/MariKristiansen/Mari_Kristiansen_sp1/assets/125880906/de8f4995-6f39-440d-bb71-a64df83244da">

- Line 386: inspirational code snippet from https://stackoverflow.com/questions/3552461/how-do-i-format-a-date-in-javascript
    <img width="350" alt="code snippet" src="https://github.com/MariKristiansen/Mari_Kristiansen_sp1/assets/125880906/19d018c4-ee61-46cf-8199-a5e0dd122fc2">
