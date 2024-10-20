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
  date: string;
  payer: string;
  totalAmount: number;
  description: string;
  sharers: Sharer[];
}

interface Group {
  id: number;
  name: string;
  members: string[];
}
