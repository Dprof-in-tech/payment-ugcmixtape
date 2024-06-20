// const emailTemplate = (customerName, orderID, orderDate, narrative, description, customerEmail, price) => `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Payment Confirmation</title>
//     <style>
//         body, html {
//             margin: 0;
//             padding: 0;
//             font-family: Arial, sans-serif;
//             line-height: 1.6;
//             font-size: 16px;
//             color: #000000;
//         }
//         .container {
//             width: 100%;
//             max-width: 800px;
//             margin: auto;
//             padding: 20px;
//             box-sizing: border-box;
//             text-align: center;
//             color: #000000;
//         }
//         .logo {
//             text-align: center;
//             object-fit: cover;
//             margin-bottom: 20px;
//         }
//         h1 {
//             text-align: center;
//             color: #333;
//             margin-bottom: 5px;
//             font-weight: 550;
//         }
//         p {
//             line-height: 1.6;
//             text-align: center;
//         }
//         .details-row {
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//             gap: 5rem;
//             align-items: center;
//             width: 100%;
//             margin-bottom: 2px;
//             padding: 0px;
//         }
//         .order {
//             display: flex;
//             flex-direction: row;
//             justify-content: space-between;
//             align-items: center;
//             width: 100%;
//             margin-bottom: 20px;
//             padding: 20px;
//         }
//         .amount {
//             text-align: right;
//             font-weight: 900;
//             font-size: 25px;
//         }
//     </style>
// </head>
// <body>
//     <div class="container">
//         <div class="logo">
//             <img src="https://cdn.prod.website-files.com/658d5a7761cdc354349ee44e/66550059aef2139425bddf77_logo-unicorn-long-p-500.png" alt="Mixtape logo" width="200" height="200">
//         </div>
//         <div class="order">
//             <p>ORDER</p>
//             <p style="text-align: right;">${orderID}</p>
//         </div>
//         <h1>Thank you, ${customerName}</h1>
//         <p>Your order is on its way</p>
//         <div class="details-row">
//             <p>Order Date</p>
//             <p style="text-align: right; font-weight: 900;">${orderDate}</p>
//         </div>
//         <div class="details-row">
//             <p>Customer Email</p>
//             <p style="text-align: right; font-weight: 900;">${customerEmail}</p>
//         </div>
//         <div class="details-row">
//             <p>Narrative Name</p>
//             <p style="text-align: right; font-weight: 900;">${narrative}</p>
//         </div>
//         <div class="details-row">
//             <p>Product Name</p>
//             <p style="text-align: right; font-weight: 900;">${description}</p>
//         </div>
//         <div class="details-row amount">
//             <p>Amount</p>
//             <p style="text-align: right;">$${price}</p>
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
    <title>Email Template</title>
</head>
<body>
    <div style="font-family: Arial, sans-serif; width: 65%; margin: auto; padding: 0px; display: flex; flex-direction: column; align-items: center; justify-content: center; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://cdn.prod.website-files.com/658d5a7761cdc354349ee44e/66550059aef2139425bddf77_logo-unicorn-long-p-500.png" alt="logo" width="200" height="120" style="object-cover: cover;">
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 20px; padding: 20px;">
            <p>ORDER</p>
            <p style="text-align: right;">${orderID}</p>
        </div>
        <h1 style="text-align: center; color: #333; margin-bottom: 5px; font-weight: 550;">Thank you, ${customerName}</h1>
        <p style="line-height: 1.6; margin-top: -2px; text-align: center;">Your order is on its way</p>
        
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 2px; padding: 0px;">
            <p>Order Date</p>
            <p style="text-align: right; font-weight: 900;">${orderDate}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 2px; padding: 0px;">
            <p>Customer Email</p>
            <p style="text-align: right; font-weight: 900;">${customerEmail}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 2px; padding: 0px;">
            <p>Narrative Name</p>
            <p style="text-align: right; font-weight: 900;">${narrative}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 2px; padding: 0px;">
            <p>Product Name</p>
            <p style="text-align: right; font-weight: 900;">${description}</p>
        </div>
        <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 100%; margin-bottom: 20px; padding: 0px;">
            <p>Amount</p>
            <p style="text-align: right; font-weight: 900; font-size: 25px;">$${price}</p>
        </div>
    </div>
</body>
</html>
`;

export default emailTemplate;
