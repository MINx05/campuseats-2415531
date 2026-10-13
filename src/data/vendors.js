const vendors = [
  {
    id: "kafe-bilal",
    name: "Kafe Mahallah Bilal",
    location: "Mahallah Bilal, Block A, Ground Floor",
    openHours: "7:00 am - 10:00 pm",
    isOpen: true,
    menu: [
      {
        id: "bil-1",
        name: "Nasi Ayam Gepuk",
        description: "Fried chicken with sambal and rice",
        price: 10,
        category: "Rice",
        available: true,
      },
      {
        id: "bil-2",
        name: "Mee Tarik",
        description: "Chinese pulled noodles with chili sauce",
        price: 10,
        category: "Noodles",
        available: true,
      },
      {
        id: "bil-3",
        name: "Green Tea",
        description: "Green tea with milk and sugar",
        price: 3,
        category: "Drinks",
        available: false,
      },
    ],
  },
  {
    id: "kafe-aminah",
    name: "Kafe Mahallah Aminah",
    location: "Mahallah Aminah, Ground Floor",
    openHours: "8:00 am - 9:00 pm",
    isOpen: true,
    menu: [
      {
        id: "ami-1",
        name: "Nasi Ayam Penyet",
        description: "Smashed fried chicken with sambal and rice",
        price: 9,
        category: "Rice",
        available: true,
      },
      {
        id: "ami-2",
        name: "Air Bandung",
        description: "Rose syrup with milk",
        price: 3,
        category: "Drinks",
        available: true,
      },
    ],
  },
];
export default vendors;
