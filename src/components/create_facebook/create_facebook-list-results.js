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
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import auth from "../../api/auth";
import { Download as DownloadIcon } from "../../icons/download";

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
  const [execute_path, setExecutePath] = useState(
    `C:\Program Files\Google\Chrome\Application\chrome.exe`
  );
  const [checkfbpassword, setCheckFbPassword] = useState(false);
  const [checkexeecute_path, setCheckExecutePath] = useState(false);
  const [width, setWidth] = useState(0);
  //Bot
  const [isbot, setIsBot] = useState(false);
  const [customerBot, setCustomerBot] = useState(undefined);
  const [link, setLink] = useState(undefined);
  const [post, setPost] = useState(undefined);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    getData();
    // console.log("window.innerWidth", window.innerWidth);
    window.addEventListener("resize", () => {
      // console.log("window.innerWidth", window.innerWidth);
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        // console.log("window.innerWidth", window.innerWidth);
        setWidth(window.innerWidth);
      });
    };
  }, [limit, page]);

  // localStorage.getItem("create")

  const optionsState = {
    options: type,
  };

  const handleSelectFbPass = (event) => {
    // console.log("event", event.target.checked);
    setCheckFbPassword(event.target.checked);
  };

  const handleSeletExecutePath = (event) => {
    // console.log("event", event.target.checked);
    setCheckExecutePath(event.target.checked);
  };

  const handleSelectOne = (event, id) => {
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
    if (execute_path === undefined && fb_password === undefined) {
      alert("Please Select Checkbox");
      return;
    }
    const data = await auth.editUser(customerEdit.id, fb_password, execute_path);
    setModal(false);
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
    if (!execute_path) {
      alert("Please Enter Execute Path");
      return;
    }
    const data = await auth.createUser(email, fb_password, email_password, two_fa, execute_path);
    setEmail(undefined);
    setFbPassword(undefined);
    setEmailPassword(undefined);
    setTwoFa(undefined);
    setExecutePath(undefined);
    setIsCreate(false);
    setTimeout(() => {
      alert("Create Success");
    }, 400);
    getData();
    return data;
  };

  const handleLaunchBot = async () => {
    if (type === "share") {
      if (!link) {
        alert("Please Enter Link");
        return;
      }
    }
    const data = await auth.launchBot(customerBot?.id, type, link, post);
    setIsBot(false);
    setType(undefined);
    setLink(undefined);
    setPost(undefined);
    setTimeout(() => {
      alert("Launch Bot Success");
    }, 400);
    getData();
    return data;
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
                      onClick={handleLaunchBot}
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
              Create Facebook
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
        <PerfectScrollbar>
          <Box>
            <Table>
              <TableHead>
                <TableRow>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.length === customers.length}
                      color="primary"
                      indeterminate={
                        selectedCustomerIds.length > 0 &&
                        selectedCustomerIds.length < customers.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell> */}
                  {/* <TableCell>type</TableCell> */}
                  <TableCell>ID</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell align="center">MANAGE</TableCell>
                  {/* <TableCell>Registration date</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.map((customer, index) => (
                  <TableRow
                    hover
                    key={customer.id}
                    selected={selectedCustomerIds.indexOf(customer.id) !== -1}
                  >
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedCustomerIds.indexOf(customer.id) !== -1}
                        onChange={(event) => handleSelectOne(event, customer.id)}
                        value="true"
                      />
                    </TableCell> */}
                    {/* <TableCell>{customer.type}</TableCell> */}
                    <TableCell>
                      {customer.id}
                      {/* {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`} */}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        {/* <Avatar src={customer.avatarUrl} sx={{ mr: 2 }}>
                        {getInitials(customer.name)}
                      </Avatar> */}
                        {/* {window.innerWidth > 500 && ( */}
                        <Typography color="textPrimary" variant="body1">
                          {customer.email.substring(0, window.innerWidth < 500 ? 15 : 250)}
                        </Typography>
                        {/* )} */}
                      </Box>
                    </TableCell>
                    {/* <TableCell>{customer.email}</TableCell> */}

                    <TableCell align="center">
                      <Button
                        style={{ background: "#10B981", marginRight: "1rem" }}
                        variant="contained"
                        onClick={() => handleBot(customer)}
                      >
                        Bot
                      </Button>
                      <Button
                        style={{ background: "#121828" }}
                        variant="contained"
                        onClick={() => handleEdit(customer)}
                      >
                        Edit
                      </Button>
                      <Button
                        color="error"
                        // variant="contained"
                        onClick={() => {
                          handleDelete(customer);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>

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
