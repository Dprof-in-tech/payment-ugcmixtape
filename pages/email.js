import Image from 'next/image';

const EmailTemplate = () => {
    return (
        <div style={{
            fontFamily: 'Arial, sans-serif',
            width: '100%',
            margin: 'auto',
            padding: '0px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
        }}>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <Image src="/ugcmixtape.svg" alt="logo" width={100} height={100} />
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
                padding: '20px',
            }}>
                <p>ORDER</p>
                <p style={{textAlign: 'right'}}>N45A60</p>
            </div>
            <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '5px', fontWeight: '550' }}>Thank you, Isaac</h1>
            <p style={{ lineHeight: '1.6', marginTop: '-2px', textAlign: 'center' }}>Your order is on its way</p>
            
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '2px',
                padding: '0px',
            }}>
                <p>Order Date</p>
                <p style={{textAlign: 'right', fontWeight: '900'}}>Jul 6, 2024</p>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '2px',
                padding: '0px',
            }}>
                <p>Customer Email</p>
                <p style={{textAlign: 'right', fontWeight: '900'}}>Amaechiisaac450@gmail.com</p>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '2px',
                padding: '0px',
            }}>
                <p>Narrative Name</p>
                <p style={{textAlign: 'right', fontWeight: '900'}}>AVA Superlatives --001</p>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '2px',
                padding: '0px',
            }}>
                <p>Product Name</p>
                <p style={{textAlign: 'right', fontWeight: '900'}}>Mixtape Post Production </p>
            </div>
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                marginBottom: '20px',
                padding: '0px',
            }}>
                <p>Amount</p>
                <p style={{textAlign: 'right', fontWeight: '900', fontSize: '25px'}}>$399</p>
            </div>
        </div>
    );
}

export default EmailTemplate;
