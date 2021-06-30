import React, { useRef, useEffect, useState } from "react";

export default function Paypal(props) {
  const paypal = useRef();
  const [complete, setComplete] = useState(false);
  const [order, setOrder] = useState({
    price: "",
    description: "",
  })


  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: props.title,
                amount: {
                  currency_code: "USD",
                  value: props.price,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          setComplete(true);
          setOrder({
            price: order.purchase_units[0].amount.value,
            description: order.purchase_units[0].description
          })

        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <>
      {complete ? (
        <div>
          <h1>Thank you for donating {order.price} to {order.description}</h1>
        </div>
        ) : (
          <div>
            <div ref={paypal}></div>
          </div>
      )}
    </>
    );
}