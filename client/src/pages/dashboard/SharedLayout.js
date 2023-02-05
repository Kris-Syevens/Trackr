import { Outlet } from "react-router-dom"; // Allows sub-Routes (add-job, all-jobs, profile) to render in place.
import Wrapper from "../../assets/wrappers/SharedLayout";
import { Navbar, SmallSidebar, BigSidebar } from "../../components";

const SharedLayout = () => {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <BigSidebar />
        <div>
          <Navbar />
          <div className="dashboard-page">
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  );
};

export default SharedLayout;
