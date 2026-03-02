import { useAuth } from "../../context/AuthContext";

const MemberDashboard = () => {
  // 1: Get User Information into Member DashBoard -->
  const { auth } = useAuth();
  if (!auth.token) return <p>Please Log in</p>;
  // 2: Get 
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-700">Member Dashboard</h1>
      <strong>
        <p> Name Of That Member : {auth.user.name}</p>
      </strong>
      <strong>
        <p> Email Of That Member : {auth.user.email}</p>
      </strong>
      <strong>
        <p> Role Of That Member : {auth.user.role}</p>
      </strong>
      <hr />
    </div>
  );
};

export default MemberDashboard;
