import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  Container,
  TextField,
  getFormLabelUtilityClasses,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import auth from "../../api/auth";
import { Download as DownloadIcon } from "../../icons/download";
//animations
import Lottie from "react-lottie";
import * as animationData from "../../assets/lotties/loading.json";
//Socket
import io from "socket.io-client";

export const CreateFacebookListResults = ({ ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [user, setUser] = useState(undefined);
  const [modal, setModal] = useState(false);
  const [customerEdit, setCustomerEdit] = useState(undefined);
  const [rowsPerPage, setRowsPerPage] = useState(1000);
  //Edit
  const [type, setType] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [confirm_password, setConfirmPassword] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isdelete, setIsDelete] = useState(false);
  const [customerDelete, setCustomerDelete] = useState(undefined);
  const [iscreate, setIsCreate] = useState(false);
  const [username, setUsername] = useState(undefined);
  //Create_Facebook email, fb_password, email_password, two_fa, execute_path
  const [email, setEmail] = useState(undefined);
  const [fb_password, setFbPassword] = useState(undefined);
  const [email_password, setEmailPassword] = useState(undefined);
  const [two_fa, setTwoFa] = useState(undefined);
  const [execute_path, setExecutePath] = useState(undefined);
  const [fb_name, setFbName] = useState(undefined);
  const [checkfbpassword, setCheckFbPassword] = useState(false);
  const [checkexeecute_path, setCheckExecutePath] = useState(false);
  const [checkfbname, setCheckFbName] = useState(false);
  const [width, setWidth] = useState(0);
  //Bot
  const [isbot, setIsBot] = useState(false);
  const [customerBot, setCustomerBot] = useState(undefined);
  const [link, setLink] = useState(undefined);
  const [post, setPost] = useState(undefined);
  const [total, setTotal] = useState(0);
  const [inprogress, setInprogress] = useState(false);
  //Bot SelectAll
  const [isC, setIsC] = useState(false);
  //Socket
  const socket = io("http://159.223.53.175:5002");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [checkBot, setCheckBot] = useState("");
  const [localss, setLocalss] = useState([]);
  const [success, setSuccess] = useState(false);
  const [checkId, setCheckId] = useState([
    {
      id: "2",
    },
    {
      id: "5",
    },
    {
      id: "6",
    },
    {
      id: "7",
    },
  ]);

  const [botResult, setBotResult] = useState([]);

  useEffect(() => {
    handlecheckBot();

    console.log("checkBot -->", checkBot);

    socket.on("connect", (id) => {
      setIsConnected(true);
      console.log("connect", id);
    });

    socket.on("disconnect", (id) => {
      setIsConnected(false);
      console.log("disconnect", id);
    });

    socket.on("bot-status", (data) => {
      setCheckBot(data.id);
      handleBotStatus(data.id);
      // setCheckBot((event) => [...event, data.id]);
      console.log("bot-status", data);
    });

    socket.on("status", (id) => {
      // setCheckBot((event) => [...event, { ...id }]);
      console.log("status", id);
    });

    getData();
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("bot-status");
      socket.off("status");
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, [limit, page, checkBot]);
  // }, [limit, page, isConnected]);

  // localStorage.getItem("create")

  const handleBotStatus = async (item) => {
    const data = await auth.statusBot(item);
    getData();
    return data;
  };

  const Storage = async () => {
    console.log("Storage", await localStorage.getItem("customerBot"));
    setLocalss(await localStorage.getItem("customerBot"));
  };

  const optionsState = {
    options: type,
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSelectFbPass = (event) => {
    // console.log("event", event.target.checked);
    setCheckFbPassword(event.target.checked);
  };

  const handleSeletExecutePath = (event) => {
    // console.log("event", event.target.checked);
    setCheckExecutePath(event.target.checked);
  };

  const handleSelectFbName = (event) => {
    // console.log("event", event.target.checked);
    setCheckFbName(event.target.checked);
  };

  const handleSelectAll = (event) => {
    console.log("handleSelectAll", event.target.checked);
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = user.map((customer) => customer.id);
      console.log("newSelectedCustomerIds", newSelectedCustomerIds);
    } else {
      newSelectedCustomerIds = [];
      console.log("newSelectedCustomerIds", newSelectedCustomerIds);
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    console.log("result ALL", newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    console.log("selectone ->", event.target.checked, id);
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
    console.log("result ONE", newSelectedCustomerIds);
  };

  const handleLimitChange = (event) => {
    setLimit(event?.target?.value);
  };

  const handlePageChange = (event, newPage) => {
    // console.log("event", event);
    // console.log("newPage", newPage);
    // setRowsPerPage(parseInt(event.target.value, 5));
    setPage(newPage);
  };

  const getData = async () => {
    const data = await auth.getUser(limit, page);
    setTotal(data?.data?.total);
    setUser(data?.data?.result);
    // console.log('data post', data)
    return data;
  };

  const handleEdit = (customer) => {
    setCustomerEdit(customer);
    // console.log("customer ===>>>", customer);
    setModal(true);
  };

  const handleBot = (customer) => {
    setCustomerBot(customer);
    // console.log("customer ===>>>", customer);
    setIsBot(true);
  };

  const handleConfirm = async () => {
    if (execute_path === undefined && fb_password === undefined && fb_name === undefined) {
      alert("Please Select Checkbox");
      return;
    }
    const data = await auth.editUser(customerEdit?.id, fb_name, fb_password, execute_path);
    setModal(false);
    setFbName(undefined);
    setFbPassword(undefined);
    setExecutePath(undefined);
    setTimeout(() => {
      alert("Edit Success");
    }, 400);
    getData();
    return data;
  };

  const handleClose = () => {
    setModal(false);
    setFbPassword(undefined);
    setExecutePath(undefined);
  };

  const handleCloseCreate = () => {
    setIsCreate(false);
    setEmail(undefined);
    setFbPassword(undefined);
    setEmailPassword(undefined);
    setTwoFa(undefined);
    setExecutePath(undefined);
  };

  const handleCloseBot = () => {
    setIsBot(false);
    setType(undefined);
    setLink(undefined);
    setPost(undefined);
    setIsC(false);
  };

  const handleDelete = (customer) => {
    // console.log("customercustomercustomercustomer", customer);
    setCustomerDelete(customer);
    setIsDelete(true);
  };

  const handleConfirmDelete = async () => {
    const data = await auth.deleteUser(customerDelete?.id);
    setIsDelete(false);
    setTimeout(() => {
      alert("Delete Success");
    }, 400);
    getData();
    return data;
  };

  const handleCreate = async () => {
    if (!email) {
      alert("Please Enter Email");
      return;
    }
    if (!fb_password) {
      alert("Please Enter Facebook Password");
      return;
    }
    if (!email_password) {
      alert("Please Enter Email Password");
      return;
    }
    if (!two_fa) {
      alert("Please Enter Two Factor");
      return;
    }

    const data = await auth.createUser(email, fb_password, email_password, two_fa);
    setEmail(undefined);
    setFbPassword(undefined);
    setEmailPassword(undefined);
    setTwoFa(undefined);
    setIsCreate(false);
    setTimeout(() => {
      alert("Create Success");
    }, 400);
    getData();
    return data;
  };

  const handleLaunchBot = async () => {
    console.log("customerBot", customerBot?.id);
    if (type === "share") {
      if (!link) {
        alert("Please Enter Link");
        return;
      }
    }
    if (!type) {
      if (!link) {
        alert("Please Select Type");
        return;
      }
    }
    //------------------- Run Bot API -------------------
    console.log("customerBot", customerBot?.id);
    console.log("type", type);
    console.log("link", link);
    console.log("post", post);
    const data = await auth.launchBot(customerBot?.id, type, link, post);
    //---------------------------------------------------
    setIsBot(false);
    setType(undefined);
    setLink(undefined);
    setPost(undefined);
    setTimeout(() => {
      alert("Launch Bot Success");
    }, 400);

    // setBotResult((item) => [...item, customerBot.id]);
    // let uniqueChars = [];
    // botResult.forEach((c) => {
    //   if (!uniqueChars.includes(c)) {
    //     uniqueChars.push(c);
    //   }
    // });

    // await localStorage.setItem("customerBot", uniqueChars);
    // setLocalss(uniqueChars);
    getData();
    return data;
  };

  // console.log("user", user);

  // console.log("locass Outside", localss);

  const handleLaunchBotPlus = async () => {
    if (isC) {
      if (type === "share") {
        if (!link) {
          alert("Please Enter Link");
          return;
        }
      }
      if (!type) {
        if (!link) {
          alert("Please Select Type");
          return;
        }
      }
      selectedCustomerIds.map(async (id) => {
        // console.log("id", id);
        console.log("TimeOut2", id);
        await auth.launchBot(id, type, link, post);
      });
      console.log("Success");
      // const data = await auth.launchBot(customerBot?.id, type, link, post);
      setIsBot(false);
      setType(undefined);
      setLink(undefined);
      setPost(undefined);
      setTimeout(() => {
        alert(`Launch Bot ${selectedCustomerIds.length} Accounts Success`);
      }, 400);
      getData();
      // return data;
    }
  };

  const handleSelectBot = () => {
    console.log("select bot", selectedCustomerIds);
    setIsC(true);
    setIsBot(true);
  };

  // const responseSocket = () => {
  //   const socket = socketIOClient(endpoint, {
  //     transports: ["websocket"],
  //     reconnection: true,
  //     reconnectionAttempts: "Infinity",
  //     reconnectionDelay: 1000,
  //     reconnectionDelayMax: 5000,
  //     randomizationFactor: 0.5,
  //     timeout: 10000,
  //     autoConnect: true,
  //   }, { headers: header });
  //   console.log("responseSocket");
  //   // const { endpoint, message } = socket.io.engine.generateId();
  //   const socket = socketIOClient("159.223.53.175:5002");
  //   socket.on("bot-status", (data) => {
  //     console.log("dataSocket", data);
  //   });
  // };

  // const handlecheckBot = () => {
  //   const userR = user.map((u) => {
  //     return parseInt(u.id);
  //   });

  //   const checkR = checkId.map((c) => {
  //     return parseInt(c.id);
  //   });

  //   console.log("userR", userR);
  //   console.log("checkR", checkR);

  //   const result = userR.filter((n) => !checkR.includes(n));
  //   setBotResult(result);
  //   console.log("result", result);
  // };

  const TestC = (data) => {
    const Check = checkId.map((c) => parseInt(c.id) === data);
    const isSuccess = Check.filter((c) => c === true);
    // const Fail = Check.filter((c) => c === false);

    // console.log("Fail", Fail);
    // if (Success.length > 0) {
    //   setSuccess(true);
    //   console.log("isSuccess");
    // }
  };

  const handlecheckBot = () => {
    console.log("CheckBot", checkBot);
  };

  return (
    <div>
      <Box>
        {isbot && (
          <Box
            maxWidth="sm"
            component="main"
            sx={{
              height: "100%",
              position: "absolute",
              flex: 1,
              zIndex: 99,
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: "40%",
            }}
          >
            <Box>
              <Container>
                <Box
                  sx={{
                    mt: 3,
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    borderColor: "rgba(0,0,0,0.4)",
                    borderStyle: "solid",
                    borderWidth: 1,
                    paddingBottom: "10%",
                  }}
                >
                  <Box
                    sx={{
                      mt: 3,
                      paddingLeft: 3,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingRight: 3,
                    }}
                  >
                    <ul style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>Manage Bot</div>
                      <Box
                        sx={{
                          color: "error.main",
                          fontSize: "1.7rem",
                        }}
                      >
                        <i className="fa fa-times" onClick={() => handleCloseBot()} />
                      </Box>
                    </ul>
                  </Box>

                  <Box
                    sx={{
                      mt: 3,
                      backgroundColor: "#fff",
                      borderLeftWidth: 2,
                      borderTopLeftRadius: 10,
                      borderRightWidth: 2,
                      borderTopRightRadius: 10,
                      width: "90%",
                      paddingLeft: 5.5,
                    }}
                  >
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 5,
                        borderColor: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <option value="">Select Type</option>
                      <option value="like">Like</option>
                      <option value="story">Story</option>
                      <option value="post">Post</option>
                      <option value="share">Share</option>
                      {/* <option value={option.value} selected={optionsState == option.value}>
                      {option.label}
                    </option> */}
                    </select>

                    {type === "share" && (
                      <TextField
                        fullWidth
                        label="Link"
                        name="link"
                        onChange={(e) => setLink(e.target.value)}
                        type="text"
                        value={link}
                        variant="outlined"
                        size="small"
                        margin="dense"
                      />
                    )}

                    {type === "post" && (
                      <TextField
                        fullWidth
                        label="Post"
                        name="post"
                        onChange={(e) => setPost(e.target.value)}
                        type="text"
                        value={post}
                        variant="outlined"
                        size="small"
                        margin="dense"
                      />
                    )}

                    <h6 style={{ color: "#D14343" }}>{type === "share" ? "**Required" : ""}</h6>

                    {/* <h6 style={{ color: "#D14343" }}>
                      {type === "post" ? "**Not Require, the bot will automatically post randomly from the database." : ""}
                    </h6> */}

                    <Button
                      style={{ backgroundColor: "#121828", color: "#fff", marginTop: "5%" }}
                      fullWidth
                      size="large"
                      onClick={!isC ? handleLaunchBot : handleLaunchBotPlus}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
        )}
        {iscreate && (
          <Box
            maxWidth="sm"
            component="main"
            sx={{
              height: "100%",
              position: "absolute",
              flex: 1,
              zIndex: 99,
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: "40%",
            }}
          >
            <Box>
              <Container>
                <Box
                  sx={{
                    mt: 3,
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    borderColor: "rgba(0,0,0,0.4)",
                    borderStyle: "solid",
                    borderWidth: 1,
                    paddingBottom: "10%",
                  }}
                >
                  <Box
                    sx={{
                      mt: 3,
                      paddingLeft: 3,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingRight: 3,
                    }}
                  >
                    <ul style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>Create Facebook Account</div>

                      <Box
                        sx={{
                          color: "error.main",
                          fontSize: "1.7rem",
                        }}
                      >
                        <i className="fa fa-times" onClick={() => handleCloseCreate()} />
                      </Box>
                    </ul>
                  </Box>

                  <Box
                    sx={{
                      mt: 3,
                      backgroundColor: "#fff",
                      borderLeftWidth: 2,
                      borderTopLeftRadius: 10,
                      borderRightWidth: 2,
                      borderTopRightRadius: 10,
                      width: "90%",
                      paddingLeft: 5.5,
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      value={email}
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />

                    <TextField
                      fullWidth
                      label="FacebookPasswod"
                      name="facebookpassword"
                      onChange={(e) => setFbPassword(e.target.value)}
                      type="text"
                      value={fb_password}
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />

                    <TextField
                      fullWidth
                      label="Email Password"
                      name="email_password"
                      onChange={(e) => setEmailPassword(e.target.value)}
                      type="text"
                      value={email_password}
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />

                    <TextField
                      fullWidth
                      label="TwoFactor"
                      name="two_fa"
                      onChange={(e) => setTwoFa(e.target.value)}
                      type="text"
                      value={two_fa}
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />

                    {/* <h6 style={{ color: "#D14343" }}>
                      {(password !== confirm_password) & (password != 0) & (confirm_password != 0)
                        ? "Password not match"
                        : ""}
                    </h6> */}

                    <Button
                      style={{ backgroundColor: "#121828", color: "#fff", marginTop: "5%" }}
                      fullWidth
                      size="large"
                      onClick={handleCreate}
                    >
                      Confirm
                    </Button>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
        )}
        {isdelete === true && (
          <Box
            maxWidth="sm"
            component="main"
            sx={{
              height: "100%",
              position: "absolute",
              flex: 1,
              zIndex: 99,
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              top: "40%",
            }}
          >
            <Box>
              <Container>
                <Box
                  sx={{
                    mt: 3,
                    backgroundColor: "#fff",
                    borderRadius: 1,
                    borderColor: "rgba(0,0,0,0.4)",
                    borderStyle: "solid",
                    borderWidth: 1,
                    paddingBottom: "10%",
                  }}
                >
                  <Box
                    sx={{
                      mt: 3,
                      paddingLeft: 3,
                      flexDirection: "row",
                      justifyContent: "space-around",
                      paddingRight: 3,
                    }}
                  >
                    <ul style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>Delete Account [ {customerDelete?.id} ]</div>
                      {/* <Box
                      sx={{
                        color: "error.main",
                        fontSize: "1.7rem",
                      }}
                    >
                      <i className="fa fa-times" onClick={handleCloseDelete} />
                    </Box> */}
                    </ul>
                  </Box>

                  <Box
                    sx={{
                      mt: 3,
                      // backgroundColor: "red",
                      borderLeftWidth: 2,
                      borderTopLeftRadius: 10,
                      borderRightWidth: 2,
                      borderTopRightRadius: 10,
                      // width: "90%",
                      // paddingLeft: 5.5,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      paddingRight: 3,
                      paddingLeft: 3,
                    }}
                  >
                    <div>Do you want to delete this account?</div>
                    <ul style={{ display: "flex", justifyContent: "space-between" }}>
                      <Button
                        style={{
                          // backgroundColor: "#121828",
                          color: "#000",
                          marginTop: "5%",
                          flex: 0.4,
                        }}
                        fullWidth
                        size="large"
                        onClick={() => setIsDelete(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        style={{
                          backgroundColor: "#121828",
                          color: "#fff",
                          marginTop: "5%",
                          flex: 0.4,
                        }}
                        fullWidth
                        size="large"
                        onClick={handleConfirmDelete}
                      >
                        Confirm
                      </Button>
                    </ul>
                  </Box>
                </Box>
              </Container>
            </Box>
          </Box>
        )}
        {modal && (
          <>
            <Box
              maxWidth="sm"
              component="main"
              sx={{
                height: "100%",
                position: "absolute",
                flex: 1,
                zIndex: 99,
                marginLeft: "auto",
                marginRight: "auto",
                left: 0,
                right: 0,
                top: "40%",
              }}
            >
              <Box
                sx={{
                  flex: 1,
                }}
              >
                <Container>
                  <Box
                    sx={{
                      mt: 3,
                      backgroundColor: "#fff",
                      borderRadius: 1,
                      borderColor: "rgba(0,0,0,0.4)",
                      borderStyle: "solid",
                      borderWidth: 1,
                      paddingBottom: "10%",
                    }}
                  >
                    <Box
                      sx={{
                        mt: 3,
                        paddingLeft: 3,
                        flexDirection: "row",
                        justifyContent: "space-around",
                        paddingRight: 3,
                      }}
                    >
                      <ul style={{ display: "flex", justifyContent: "space-between" }}>
                        <div>Edit Account [ {customerEdit?.id} ]</div>
                        <Box
                          sx={{
                            color: "error.main",
                            fontSize: "1.7rem",
                          }}
                        >
                          <i className="fa fa-times" onClick={handleClose} />
                        </Box>
                      </ul>
                      <div style={{ fontSize: "0.3rem" }}>{customerEdit?.email}</div>
                    </Box>

                    <Box
                      sx={{
                        mt: 3,
                        backgroundColor: "#fff",
                        borderLeftWidth: 2,
                        borderTopLeftRadius: 10,
                        borderRightWidth: 2,
                        borderTopRightRadius: 10,
                        width: "90%",
                        paddingLeft: 5.5,
                      }}
                    >
                      <ul style={{ display: "flex", justifyContent: "space-between" }}>
                        <Checkbox
                          checked={checkfbname === true ? true : false}
                          color="primary"
                          // indeterminate={
                          //   selectedCustomerIds.length > 0 &&
                          //   selectedCustomerIds.length < customers.length
                          // }
                          onChange={handleSelectFbName}
                        />
                        <TextField
                          fullWidth
                          label="Facebook Name"
                          name="facebook_name"
                          onChange={(e) => setFbName(e.target.value)}
                          type="text"
                          value={fb_name}
                          variant="outlined"
                          size="small"
                          margin="dense"
                        />
                      </ul>
                      <ul style={{ display: "flex", justifyContent: "space-between" }}>
                        <Checkbox
                          checked={checkfbpassword === true ? true : false}
                          color="primary"
                          // indeterminate={
                          //   selectedCustomerIds.length > 0 &&
                          //   selectedCustomerIds.length < customers.length
                          // }
                          onChange={handleSelectFbPass}
                        />
                        <TextField
                          fullWidth
                          label="Facebook Password"
                          name="facebook_password"
                          onChange={(e) => setFbPassword(e.target.value)}
                          type="text"
                          value={fb_password}
                          variant="outlined"
                          size="small"
                          margin="dense"
                        />
                      </ul>
                      <ul style={{ display: "flex", justifyContent: "space-between" }}>
                        <Checkbox
                          checked={checkexeecute_path === true ? true : false}
                          color="primary"
                          // indeterminate={
                          //   selectedCustomerIds.length > 0 &&
                          //   selectedCustomerIds.length < customers.length
                          // }
                          onChange={handleSeletExecutePath}
                        />
                        <TextField
                          fullWidth
                          label="Execute Path"
                          name="execute_path"
                          onChange={(e) => setExecutePath(e.target.value)}
                          type="text"
                          value={execute_path}
                          variant="outlined"
                          size="small"
                          margin="dense"
                        />
                      </ul>

                      {/* <h6 style={{ color: "#D14343" }}>
                        {(password !== confirm_password) & (password != 0) & (confirm_password != 0)
                          ? "Password not match"
                          : ""}
                      </h6> */}

                      <Button
                        style={{ backgroundColor: "#121828", color: "#fff", marginTop: "5%" }}
                        fullWidth
                        size="large"
                        onClick={handleConfirm}
                      >
                        Confirm
                      </Button>
                    </Box>
                  </Box>
                </Container>
              </Box>
            </Box>
          </>
        )}
      </Box>
      <Card {...rest}>
        <Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              m: -1,
              marginBottom: "1rem",
              marginTop: "1rem",
              paddingRight: "1rem",
              paddingLeft: "1rem",
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              Create Facebook {localss}
            </Typography>
            <Box sx={{ m: 1 }}>
              <Button
                startIcon={<DownloadIcon fontSize="small" />}
                color="primary"
                variant="contained"
                onClick={() => {
                  setIsCreate(true);
                }}
              >
                Add Facebook
              </Button>
            </Box>
          </Box>
        </Box>
        <Typography sx={{ m: 2, flexDirection: "row", display: "flex", alignItems: "center" }}>
          {selectedCustomerIds.length > 0 && (
            <>
              <p style={{ fontSize: 13, fontWeight: "normal", marginRight: 10 }}>
                Multi-Action ({selectedCustomerIds.length}) Accounts
              </p>
              <Button
                style={{ background: "#10B981" }}
                variant="contained"
                onClick={() => handleSelectBot()}
              >
                Bot
              </Button>
            </>
          )}
        </Typography>
        <PerfectScrollbar
          options={{ suppressScrollY: true, displayScrollToTop: true }}
          onScrollY={(container) => console.log(`scrolled to: ${container.scrollTop}.`)}
        >
          <Box style={{ overflow: "scroll" }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === user?.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 && selectedCustomerIds.length < user?.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Facebook Name</TableCell>
                  <TableCell>Email Password</TableCell>
                  <TableCell>Facebook Password</TableCell>
                  <TableCell align="center">MANAGE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.map((customer, index) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>{customer.id}</TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography color="textPrimary">
                          {customer.email.substring(0, window.innerWidth < 500 ? 15 : 250)}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {customer?.fb_name?.substring(0, window.innerWidth < 500 ? 15 : 250)}
                    </TableCell>
                    {/* <TableCell>{customer.email}</TableCell> */}
                    <TableCell>
                      {customer.email_password.substring(0, window.innerWidth < 500 ? 15 : 250)}
                    </TableCell>
                    <TableCell>
                      {customer.fb_password.substring(0, window.innerWidth < 500 ? 15 : 250)}
                    </TableCell>

                    {/* {TestC(customer.id)} */}
                    {/* {TestC === true ? "1" : "0"} */}

                    {customer.status === "finish" ? (
                      <TableCell align="center">
                        <Button
                          style={{ background: "#10B981" }}
                          variant="contained"
                          onClick={() => handleBot(customer)}
                        >
                          Bot
                        </Button>
                        <Button
                          style={{
                            background: "#121828",
                            marginLeft: "0.1rem",
                            marginRight: "0.1rem",
                          }}
                          variant="contained"
                          onClick={() => handleEdit(customer)}
                        >
                          Edit
                        </Button>
                        <Button
                          color="error"
                          style={{ background: "rgba(255,0,0,0.02)" }}
                          // variant="contained"
                          onClick={() => {
                            handleDelete(customer);
                          }}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    ) : (
                      <TableCell
                        align="center"
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <Button
                          disabled
                          style={{
                            background: "rgba(247, 247, 247,1)",
                            color: "#707070",
                            flexDirection: "row",
                            display: "flex",
                            width: "85%",
                            height: 50,
                            alignSelf: "center",
                          }}
                          variant="contained"
                          // onClick={() => handleBot(customer)}
                        >
                          <ul
                            style={{
                              flexDirection: "row",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <TableCell style={{ marginLeft: 10, color: "#707070" }}>
                              <Lottie
                                options={defaultOptions}
                                height={50}
                                width={50}
                                style={{ position: "absolute", left: 30, top: 0 }}
                              />
                              Inprogress
                            </TableCell>
                          </ul>
                        </Button>
                      </TableCell>
                    )}

                    {/* {index === 0 && (
                      <TableCell align="center">
                        <Button
                          style={{
                            background: "rgba(247, 247, 247,1)",
                            color: "#707070",
                            flexDirection: "row",
                            display: "flex",
                          }}
                          variant="contained"
                          onClick={() => handleBot(customer)}
                        >
                          <ul
                            style={{
                              flexDirection: "row",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <TableCell style={{ marginLeft: 10, color: "#707070" }}>
                              <Lottie
                                options={defaultOptions}
                                height={50}
                                width={50}
                                style={{ position: "absolute", left: 0, top: 10 }}
                              />
                              Inprogress
                            </TableCell>
                          </ul>
                        </Button>
                      </TableCell>
                    )}

                    {/* <TableCell>{format(customer.createdAt, "dd/MM/yyyy")}</TableCell> */}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={total}
          page={page}
          rowsPerPage={limit}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
        />
      </Card>
    </div>
  );
};

CreateFacebookListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
