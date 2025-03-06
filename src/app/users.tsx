
interface User {
  id: number;
  name: string;
  email: string;
}

export default async function Users() {
  const users = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await users.json();
  return (
    <div>
      {data.map((user: User) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
}