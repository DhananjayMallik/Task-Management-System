import { useAuth } from "../../context/AuthContext";

const MemberDashboard = () => {
  const { auth } = useAuth();

  if (!auth.token) return <p>Please log in</p>;

  return (
    <div>
      <h1>Email : {auth.email}</h1>
      <p>Role: {auth.role}</p>
    </div>
  );
};

export default MemberDashboard;
