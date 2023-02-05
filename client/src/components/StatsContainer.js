import { useAppContext } from "../context/appContext";
import StatsItem from "./StatsItem";
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from "react-icons/fa";
import Wrapper from "../assets/wrappers/StatsContainer";

const StatsContainer = () => {
  const { stats, showDarkmode } = useAppContext();
  const defaultStats = [
    {
      title: "pending applications",
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: showDarkmode ? "#fff" : "#e9b949",
      bcg: showDarkmode ? "#9fb3c8" : "#fcefc7",
    },
    {
      title: "interviews scheduled",
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: showDarkmode ? "#fff" : "#647acb",
      bcg: showDarkmode ? "#9fb3c8" : "#e0e8f9",
    },
    {
      title: "jobs declined",
      count: stats.declined || 0,
      icon: <FaBug />,
      color: showDarkmode ? "#fff" : "#d66a6a",
      bcg: showDarkmode ? "#9fb3c8" : "#ffeeee",
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatsItem key={index} {...item} />;
      })}
    </Wrapper>
  );
};

export default StatsContainer;
