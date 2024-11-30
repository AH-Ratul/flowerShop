import { db } from "../server.js";

//------------------- FLOWERS DETAILS ---------------------
export const flowers = [
  {
    id: 1,
    name: "Rose Bouquet",
    price: 50,
    description: "A beautiful bouquet of red roses.",
    image: "/img/pngwing10.png",
  },
  {
    id: 2,
    name: "Tulip Delight",
    price: 30,
    description: "A vibrant mix of tulips.",
    image: "/img/pngwing 8.png",
  },
  {
    id: 3,
    name: "Orchid Charm",
    price: 70,
    description: "Elegant and exotic orchids.",
    image: "/img/pngwing 7.png",
  },
  {
    id: 4,
    name: "Lilly",
    price: 60,
    description: "Elegant and exotic Lilly.",
    image: "/img/pngwing 6.png",
  },
];

//--------------------------- GET SELECTED FLOWER --------------------
export const getFlowerById = (req, res) => {
  const { id } = req.params;

  const flower = flowers.find((f) => f.id === parseInt(id));
  if (!flower) {
    return res
      .status(404)
      .json({ status: "fail", message: "Flower not found" });
  }

  res.render("checkout", { flower, title: "Check Out", user: req.user });
};

//-------------------------- CHECK_OUT -------------------------------------
export const processCheckout = (req, res) => {
  try {
    const orderData = req.body;

    // Calculate the delivery date (current date + 3 days)
    const currentDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(currentDate.getDate() + 3);

    // Format delivery date to YYYY-MM-DD
    const formattedDeliveryDate = deliveryDate.toISOString().split("T")[0];

    const finalOrderData = {
      ...orderData,
      delivery: formattedDeliveryDate,
    };

    const query = `
        INSERT INTO orders (name, email, phone, address, product, quantity, price, totalPrice, delivery)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      finalOrderData.name,
      finalOrderData.email,
      finalOrderData.phone,
      finalOrderData.address,
      finalOrderData.product,
      finalOrderData.quantity,
      finalOrderData.price,
      finalOrderData.totalPrice,
      finalOrderData.delivery,
    ];

    // Execute the query
    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Database Error:", err);
        return res.status(500).json({ error: "Failed to process order." });
      }

      const order_id = results.insertId;

      res.redirect(`/app/processing/${order_id}`);
    });
  } catch (error) {
    console.error("Error processing checkout:", error);
    res.status(500).json({ error: "An unexpected error occurred." });
  }
};

//---------------------------- LOADER --------------------------------
export const processingOrder = (req, res) => {
  const order_id = req.params.order_id;

  // Render a simple loader/processing page
  res.render("processing", { order_id });
};

//--------------------------- INVOICE ---------------------------------
export const processInvoice = (req, res) => {
  const order_id = req.params.order_id;

  const sql = `SELECT * FROM orders WHERE order_id = ?`;

  db.query(sql, [order_id], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res
        .status(500)
        .json({ error: "Failed to retrieve order details." });
    }

    if (results.length === 0) {
      return res.status(404).send("Order not found.");
    }

    // Render the invoice page with order details
    const orderDetails = results[0];
    res.render("invoice", { order: orderDetails });
  });
};
