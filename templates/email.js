// const emailTemplate = (customerName, orderID, orderDate, Narrative, description, customerEmail, price) => `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Payment Confirmation</title>
//     <style>
//         /* Reset styles */
//         body, html {
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             font-size: 16px;
//             color: #000000;
//         }

//         /* Container styles */
//         .container {
//             width: 100%;
//             max-width: 800px;
//             margin: auto;
//             padding: 20px;
//             box-sizing: border-box;
//             text-align: center;
//         }

//         /* Logo styles */
//         .logo {
//             text-align: center;
//             margin: 0, auto;
//         }

//         /* Heading styles */
//         h1 {
//             text-align: center;
//             margin-bottom: 5px;
//             font-weight: 550;
//             color: #000000;
//         }

//         /* Message styles */
//         p {
//             margin: 0;
//             text-align: center;
//         }

//         /* Amount styles */
//         .amount {
//             font-size: 25px;
//         }

//         /* Link styles */
//         a {
//             color: #000000;
//             text-decoration: none;
//         }
//             .details-row{
//                 color: #000000;
//                 text-align: justify;
//             }
//                 .header{
//                     color: #000000;
//                     font-size: 3.5rem;
//                     font-weight: 700;  
//                 }
//                 .order{
//                 display: flex;
//                 flex-direction: row;
//                 justify-content: space-between;
//                 width: 100%;
//                 align-items: center;
//                 font-size: 1.5rem;
//                 }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="logo">
//             <img src="https://cdn.prod.website-files.com/658d5a7761cdc354349ee44e/66550059aef2139425bddf77_logo-unicorn-long-p-500.png" alt="Mixtape logo" width="200" height="200">
//         </div>
//         <div class='order'>
//             <p>Order: </p>
//             <p>${orderID}</p>
//         </div>
//         <h1 class='header'>Thank you, ${customerName}</h1>
//         <p>Your order is on its way</p>
//         <div class="details-row">
//             <p>Order Date: ${orderDate}</p>
//             <p>Customer Email: ${customerEmail}</p>
//             <p>Narrative Name: ${Narrative}</p>
//             <p>Product Name: ${description}</p>
//             <p>Amount: $${price}</p>
//         </div>
//     </div>
// </body>
// </html>
// `;

// export default emailTemplate;

const emailTemplate = (customerName, orderID, orderDate, narrative, description, customerEmail, price) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            font-size: 16px;
            color: #000000;
        }
        .container {
            width: 100%;
            max-width: 800px;
            margin: auto;
            padding: 20px;
            box-sizing: border-box;
            text-align: center;
            color: #000000;
        }
        .logo {
            text-align: center;
            object-fit: cover;
            margin-bottom: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 5px;
            font-weight: 550;
        }
        p {
            line-height: 1.6;
            text-align: center;
        }
        .details-row {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            gap: 5rem;
            align-items: center;
            width: 100%;
            margin-bottom: 2px;
            padding: 0px;
        }
        .order {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
            padding: 20px;
        }
        .amount {
            text-align: right;
            font-weight: 900;
            font-size: 25px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://cdn.prod.website-files.com/658d5a7761cdc354349ee44e/66550059aef2139425bddf77_logo-unicorn-long-p-500.png" alt="Mixtape logo" width="200" height="200">
        </div>
        <div class="order">
            <p>ORDER</p>
            <p style="text-align: right;">${orderID}</p>
        </div>
        <h1>Thank you, ${customerName}</h1>
        <p>Your order is on its way</p>
        <div class="details-row">
            <p>Order Date</p>
            <p style="text-align: right; font-weight: 900;">${orderDate}</p>
        </div>
        <div class="details-row">
            <p>Customer Email</p>
            <p style="text-align: right; font-weight: 900;">${customerEmail}</p>
        </div>
        <div class="details-row">
            <p>Narrative Name</p>
            <p style="text-align: right; font-weight: 900;">${narrative}</p>
        </div>
        <div class="details-row">
            <p>Product Name</p>
            <p style="text-align: right; font-weight: 900;">${description}</p>
        </div>
        <div class="details-row amount">
            <p>Amount</p>
            <p style="text-align: right;">$${price}</p>
        </div>
    </div>
</body>
</html>
`;

export default emailTemplate;
