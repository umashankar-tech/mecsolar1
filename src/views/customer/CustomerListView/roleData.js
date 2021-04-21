import { v4 as uuid } from 'uuid';

export default [
  {
    id: uuid(),
    createdAt: 1555016400000,
    description: 'All Access',
    status: 'Active',
    role: 'Admin',
    users: 2,
  },
    {
    id: uuid(),
    createdAt: 1555016400000,
    description: 'Only Read Access',
    status: 'Active',
    role: 'User',
    users: 8
  },
];
