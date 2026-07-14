export let books = [
    {
        id: 1,
        title: "הנסיך הקטן",
        category: "ילדים",
        price: 45,
        isBorrowed: true,
        borrowing: [
            { borrowingDate: "2026-07-01", customerId: 101 }
        ]
    },
    {
        id: 2,
        title: "הבלש והתעלומה האבודה",
        category: "קומיקס",
        price: 120,
        isBorrowed: false,
        borrowing: []
    },
    {
        id: 3,
        title: "בלב ים",
        category: "נוער",
        price: 60,
        isBorrowed: false,
        borrowing: [
            { borrowingDate: "2026-06-15", customerId: 102 }
        ]
    }
];