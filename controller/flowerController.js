

export const flowerCollection = (req, res) => {
  const flowers = [
    {
      id: 1,
      name: "Rose Bouquet",
      price: 50,
      description: "A beautiful bouquet of red roses.",
      image: "/img/pngwing10.png"
    },
    {
      id: 2,
      name: "Tulip Delight",
      price: 30,
      description: "A vibrant mix of tulips.",
      image: "/img/pngwing10.png"
    },
    {
      id: 3,
      name: "Orchid Charm",
      price: 70,
      description: "Elegant and exotic orchids.",
      image: "/img/pngwing10.png"
    },
  ];

  res.render("flowers", { flowers, title: "Flowers", user: req.user });
};

export const getFlowerById = (req, res) => {
  const { id } = req.params;

  const flowers = [
    {
      id: 1,
      name: "Rose Bouquet",
      price: 50,
      description: "A beautiful bouquet of red roses.",
    },
    {
      id: 2,
      name: "Tulip Delight",
      price: 30,
      description: "A vibrant mix of tulips.",
    },
    {
      id: 3,
      name: "Orchid Charm",
      price: 70,
      description: "Elegant and exotic orchids.",
    },
  ];

  const flower = flowers.find((f) => f.id === parseInt(id));
  if (!flower) {
    return res
      .status(404)
      .json({ status: "fail", message: "Flower not found" });
  }

  res.render("checkout", { flower, title: "Check Out", user: req.user });
};
