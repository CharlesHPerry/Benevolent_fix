import React, {useEffect, useRef, useState} from 'react'


const Charity = () => {
    const [price, setPrice] = useState(0);
    
    const priceChange = (e) => {
        e.preventDefault();
        setPrice(e.target.value);

    }

    function PayPal({ product }) {
        const [paidFor, setPaidFor] = useState(false);
        const [error, setError] = useState(null);
        const paypalRef = useRef();
      
        useEffect(() => {
          window.paypal
            .Buttons({
              createOrder: (data, actions) => {
                return actions.order.create({
                  purchase_units: [
                    {
                      description: product.description,
                      amount: {
                        currency_code: 'USD',
                        value: product.price,
                      },
                    },
                  ],
                });
              },
              onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                setPaidFor(true);
                console.log(order);
              },
              onError: err => {
                setError(err);
                console.error(err);
              },
            })
            .render(paypalRef.current);
        }, [product.description, product.price]);
      
        if (paidFor) {
          return (
            <div>
              <h1>Thank you for donating {product.price}$ to support Benevolent!</h1>
            </div>
          );
        }
      
        return (
          <div>
            {error && <div>Uh oh, an error occurred! {error.message}</div>}
            <h1>
              {product.price}$ for {product.description}
            </h1>
            <div ref={paypalRef} />
          </div>
        );
      }
    const product = {
        price: price,
        name: "Benevolent",
        description: "Benevolent",
    }

    return (
        <div>
            <h2>Donate to Benevolent and help us improve and expand on our services!</h2>
            <input type="text" pattern="[0-9]*" id="passenger_input" placeholder="1" value={price} onChange={(e) => priceChange(e)}/>
            <PayPal product={product} />
        </div>
    )
}

export default Charity