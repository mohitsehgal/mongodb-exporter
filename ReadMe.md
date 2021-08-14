# MongoDB Exporter
Simple web tool to export data from Any MongoDB Database into CSV format directly using Aggregate Pipeline. It essentially runs the query on Node/Express Server and returns it to simple HTML Page. It provides convenient way to Export the data in just one click. 

No need to code adhoc APIs / Scripts just for exporting the report data. If you have any suggestions or feature request please reach me out at appsyoda@gmail.com

# Pre-requisites 
 1. Node.JS 12 or greater
 2. NPM 6.4.11 or greater

# Setup
 1. Clone the repository.
 2. Open terminal in project directory.
 3. Run `npm install`
 4. Run `npm run start`
 5. Open Browser url `http://localhost:3000`

# Instructions
 1. Fill MongoDB Connection URL
 2. Fill Name of database where the data resides.
 3. Fill Collection name where you want to run the aggregate query.
 4. Fill `Aggregate Query` in the textarea, it should be a valid JSON Object.
 5. Click on Execute button to see the results (preview).
 6. If data looks okay, then click on Export button. It would be exported in CSV format

Sample Screenshot
![image](https://user-images.githubusercontent.com/1757104/129435891-14a590f8-5ca8-474b-827f-3802e2f75d70.png)


 # Contact
 If you are facing any issues or have change request. Kindly write me at appsyoda@gmail.com.
