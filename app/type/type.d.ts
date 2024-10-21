interface User {
  name: string;
  email: string;
  image: string;
  groups: string;
}

type Sharer = {
  user: User;
  amount: number;
};

interface Bill {
  entry_id: number;
  date: string;
  payer: User;
  totalAmount: number;
  description: string;
  sharers: Sharer[];
}

interface Group {
  uid: string;
  name: string;
  members: User[];
  link: string;
}
