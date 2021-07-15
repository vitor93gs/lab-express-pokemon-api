// Exemplo de modelagem usando objetos aninhados (embbeded)

const oi = {
  _id: 1,
  name: "pedro",
  email: "pedro@ironhack.com",
  password: "adasdiahsidhaidasd",
  address: {
    street: "rua 1",
    neighbourhood: "bairro 2",
    city: "sao paulo",
    state: "sao paulo",
    zipCode: "15550-500",
  },
  orders: [
    {
      _id: 1,
      timestamp: "2021-06-02",
      totalAmount: 250,
      paymentMethod: "credit_card",
      products: [
        {
          name: "Bycicle",
          _id: 1,
          quantity: 2,
          description: "White bycicle",
          price: 110,
        },
        {
          name: "Bycicle tire",
          _id: 2,
          quantity: 1,
          description: "Bycicle tire large size",
          price: 20,
        },
      ],
    },
  ],
};

// Exemplo de objeto usando normalização e relacionamentos

// Usuarios

const user = {
  _id: 1,
  name: "pedro",
  email: "pedro@ironhack.com",
  password: "adasdiahsidhaidasd",
  address: {
    street: "rua 1",
    neighbourhood: "bairro 2",
    city: "sao paulo",
    state: "sao paulo",
    zipCode: "15550-500",
  },
};

// Pedidos

const order = {
  _id: 1,
  timestamp: "2021-06-02",
  totalAmount: 250,
  paymentMethod: "credit_card",
  userId: 1,
  products: [
    {
      productId: 1,
      quantity: 2,
    },
    {
      productId: 2,
      quantity: 1,
    },
  ],
};

// Produtos

const product1 = {
  name: "Bycicle",
  _id: 1,
  quantity: 2,
  description: "White bycicle",
  price: 110,
};

const product2 = {
  name: "Bycicle tire",
  _id: 2,
  quantity: 1,
  description: "Bycicle tire large size",
  price: 20,
},;