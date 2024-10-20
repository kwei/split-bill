interface User {
  name: string;
  email: string;
  image: string;
  groups: string;
}

type Sharer = {
  email: string;
  amount: number;
};

interface Bill {
  entry_id: number;
  date: string;
  payer: string;
  totalAmount: number;
  description: string;
  sharers: Sharer[];
}

interface Group {
  uid: string;
  name: string;
  members: string[];
  link: string;
}
