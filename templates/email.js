const emailTemplate = (customerName, orderID, orderDate, Narrative, description, customerEmail, price) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Payment Confirmation</title>
    <style>
        /* Reset styles */
        body, html {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
            line-height: 1.6;
            font-size: 16px;
            color: #000000;
        }

        /* Container styles */
        .container {
            width: 100%;
            max-width: 800px;
            margin: auto;
            padding: 20px;
            box-sizing: border-box;
            text-align: center;
        }

        /* Logo styles */
        .logo {
            text-align: center;
            margin: 0, auto;
        }

        /* Heading styles */
        h1 {
            text-align: center;
            margin-bottom: 5px;
            font-weight: 550;
            color: #000000;
        }

        /* Message styles */
        p {
            margin: 0;
            text-align: center;
        }

        /* Amount styles */
        .amount {
            font-size: 25px;
        }

        /* Link styles */
        a {
            color: #000000;
            text-decoration: none;
        }
            .details-row{
                color: #000000;
                text-align: justify;
            }
                p{
                    font-size: 20px;
                    color: #000000;
                }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">
            <img src="https://cdn.prod.website-files.com/658d5a7761cdc354349ee44e/66550059aef2139425bddf77_logo-unicorn-long-p-500.png">
        </div>
        <p>Order: ${orderID}</p>
        <h1>Thank you, ${customerName}</h1>
        <p>Your order is on its way</p>
        <div class="details-row">
            <p>Order Date: ${orderDate}</p>
            <p>Customer Email: ${customerEmail}</p>
            <p>Narrative Name: ${Narrative}</p>
            <p>Product Name: ${description}</p>
            <p>Amount: $${price}</p>
        </div>
    </div>
</body>
</html>
`;

export default emailTemplate;
