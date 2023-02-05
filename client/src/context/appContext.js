import axios from "axios";
import React, { useReducer, useContext, useEffect } from "react";
import reducer from "./reducer";
import {
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  GET_CURRENT_USER_BEGIN,
  GET_CURRENT_USER_SUCCESS,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  LOGOUT_USER,
  CREATE_JOB_BEGIN,
  CREATE_JOB_SUCCESS,
  CREATE_JOB_ERROR,
  GET_JOBS_BEGIN,
  GET_JOBS_SUCCESS,
  DELETE_JOB_BEGIN,
  DELETE_JOB_ERROR,
  EDIT_JOB_BEGIN,
  EDIT_JOB_SUCCESS,
  EDIT_JOB_ERROR,
  SET_EDIT_JOB,
  DISPLAY_ALERT,
  CLEAR_ALERT,
  CLEAR_VALUES,
  CLEAR_FILTERS,
  TOGGLE_SIDEBAR,
  TOGGLE_DARKMODE,
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
  HANDLE_CHANGE,
  CHANGE_PAGE,
} from "./actions";

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  userLocation: "",
  showSidebar: false,
  showDarkmode: localStorage.getItem("darkMode") === "true" ? true : false,
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: "",
  jobTypeOptions: ["full-time", "part-time", "internship"],
  statusOptions: ["interview", "declined", "pending"],
  status: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  search: "",
  searchStatus: "all",
  searchType: "all",
  sort: "latest",
  sortOptions: ["latest", "oldest", "a-z", "z-a"],
  userLoading: true,
};

const darkModeLocalStorage =
  localStorage.getItem("darkMode") === "true" ? true : false;

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //AXIOS
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // RESPONSE INTERCEPTOR
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  // REGISTER USER
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);

      const { user, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  // LOGIN USER
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);

      const { user, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };

  // GET CURRENT USER
  const getCurrentUser = async () => {
    dispatch({ type: GET_CURRENT_USER_BEGIN });
    try {
      const { data } = await authFetch("/auth/getCurrentUser");
      const { user, location } = data;
      dispatch({
        type: GET_CURRENT_USER_SUCCESS,
        payload: { user, location, darkMode: darkModeLocalStorage },
      });
    } catch (error) {
      if (error.response.status === 401) return;
      logoutUser();
    }
  };

  // UPDATE USER
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try {
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);

      // no token
      const { user, location } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location },
      });
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };

  // LOGOUT USER
  const logoutUser = async () => {
    await authFetch.get("/auth/logout");
    dispatch({
      type: LOGOUT_USER,
      payload: {
        darkMode: darkModeLocalStorage,
      },
    });
  };

  // CREATE JOB
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.post("/jobs", {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });

      dispatch({
        type: CREATE_JOB_SUCCESS,
        payload: {
          darkMode: darkModeLocalStorage,
        },
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
      dispatch({ type: CLEAR_VALUES });
    }
    clearAlert();
  };

  // GET ALL JOBS
  const getJobs = async () => {
    const { search, searchStatus, searchType, sort, page } = state;

    let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
    if (search) {
      url = url + `&search=${search}`;
    }

    dispatch({ type: GET_JOBS_BEGIN });
    try {
      const { data } = await authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;
      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
          darkMode: darkModeLocalStorage,
        },
      });
    } catch (error) {
      console.log(error.response);
      logoutUser();
    }
    // Used to clear alerts from other pages/routes in the event of a quick re-navigation elsewhere.
    clearAlert();
  };

  // SET EDIT JOB
  const setEditJob = (id) => {
    dispatch({ type: SET_EDIT_JOB, payload: { id } });
  };

  // EDIT JOB
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });
    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      dispatch({
        type: EDIT_JOB_SUCCESS,
      });
      dispatch({ type: CLEAR_VALUES });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // DELETE JOB
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });
    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: DELETE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  // DISPLAY ALERT
  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  // CLEAR ALERT
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 3000);
  };

  // CLEAR VALUES
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES });
  };

  // CLEAR FILTERS
  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS });
  };

  // TOGGLE SIDEBAR
  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  // TOGGLE DARKMODE
  const toggleDarkmode = () => {
    dispatch({ type: TOGGLE_DARKMODE });
  };

  // SHOW STATS
  const showStats = async () => {
    dispatch({ type: SHOW_STATS_BEGIN });
    try {
      const { data } = await authFetch("/jobs/stats");
      dispatch({
        type: SHOW_STATS_SUCCESS,
        payload: {
          stats: data.defaultStats,
          monthlyApplications: data.monthlyApplications,
          darkMode: darkModeLocalStorage,
        },
      });
    } catch (error) {
      logoutUser();
    }

    clearAlert();
  };

  // HANDLE CHANGE
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value, darkMode: darkModeLocalStorage },
    });
  };

  // CHANGE PAGE (Pagination)
  const changePage = (page) => {
    dispatch({
      type: CHANGE_PAGE,
      payload: { page, darkMode: darkModeLocalStorage },
    });
  };

  // GET CURRENT USER ON LOAD
  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line
  }, []);

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        toggleSidebar,
        toggleDarkmode,
        updateUser,
        handleChange,
        clearValues,
        createJob,
        getJobs,
        setEditJob,
        deleteJob,
        editJob,
        showStats,
        clearFilters,
        changePage,
        getCurrentUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
