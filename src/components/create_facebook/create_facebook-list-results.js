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
  //Edit
  const [role, setRole] = useState(undefined);
  const [password, setPassword] = useState(undefined);
  const [confirm_password, setConfirmPassword] = useState(undefined);
  const [error, setError] = useState(undefined);
  const [isdelete, setIsDelete] = useState(false);
  const [customerDelete, setCustomerDelete] = useState(undefined);
  const [iscreate, setIsCreate] = useState(false);
  const [username, setUsername] = useState(undefined);
  //Role
  const option = [
    { value: "admin", label: "Admin" },
    { value: "user", label: "User" },
  ];

  useEffect(() => {
    getData();
  }, []);

  // localStorage.getItem("create")

  const optionsState = {
    options: role,
  };

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
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
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const getData = async () => {
    const data = await auth.getUser(limit, page).then((res) => setUser(res?.data?.result));
    return data;
  };

  const handleEdit = (customer) => {
    setCustomerEdit(customer);
    setModal(true);
  };

  const handleConfirm = async () => {
    if (password !== confirm_password) {
      alert("Password not match");
      return;
    }

    if (role === "") {
      setRole(customerEdit.role);
    }
    if (role || password !== "undefined") {
      if (password && confirm_password !== 1) {
        setPassword(customerEdit.password);
      }
      const data = await auth.editUser(customerEdit.id, password, role);
      setModal(false);
      setPassword(undefined);
      setConfirmPassword(undefined);
      setRole(undefined);
      setTimeout(() => {
        alert("Edit Success");
      }, 400);
      getData();
      return data;
    }
  };

  const handleClose = () => {
    setModal(false);
    setRole(undefined);
    setPassword(undefined);
    setConfirmPassword(undefined);
  };

  const handleCloseCreate = () => {
    setIsCreate(false);
    setRole(undefined);
    setPassword(undefined);
    setConfirmPassword(undefined);
  };

  const handleDelete = (customer) => {
    setCustomerDelete(customer);
    setIsDelete(true);
  };

  const handleConfirmDelete = async () => {
    const data = await auth.deleteUser(customerDelete.id);
    setIsDelete(false);
    setTimeout(() => {
      alert("Delete Success");
    }, 400);
    getData();
    return data;
  };

  const handleCreate = async () => {
    if (!role) {
      alert("Please select role");
      return;
    }
    if (!username) {
      alert("Please input Username");
      return;
    }
    if (!password) {
      alert("Please input Password");
      return;
    }
    if (password !== confirm_password) {
      alert("Password not match");
      return;
    }
    const data = await auth.createUser(username, password, role);
    setIsCreate(false);
    setUsername(undefined);
    setPassword(undefined);
    setConfirmPassword(undefined);
    setRole(undefined);
    setTimeout(() => {
      alert("Create Success");
    }, 400);
    getData();
    return data;
  };

  return (
    <div>
      <Box>
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
                      <div>Create Account</div>
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
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        width: "100%",
                        height: 40,
                        borderRadius: 5,
                        borderColor: "rgba(0,0,0,0.2)",
                      }}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="staff">Staff</option>
                      {/* <option value={option.value} selected={optionsState == option.value}>
                      {option.label}
                    </option> */}
                    </select>

                    <TextField
                      // error={Boolean(formik.touched.username && formik.errors.username)}
                      fullWidth
                      // helperText={formik.touched.username && formik.errors.username}
                      label="Username"
                      // margin="normal"
                      name="username"
                      // onBlur={formik.handleBlur}
                      onChange={(e) => setUsername(e.target.value)}
                      type="text"
                      value={username}
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />

                    <TextField
                      // error={Boolean(formik.touched.username && formik.errors.username)}
                      fullWidth
                      // helperText={formik.touched.username && formik.errors.username}

                      label="Password"
                      name="password"
                      // onBlur={formik.handleBlur}
                      onChange={(e) => setPassword(e.target.value)}
                      type="text"
                      value={password}
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />

                    <TextField
                      // error={Boolean(formik.touched.username && formik.errors.username)}
                      fullWidth
                      // helperText={formik.touched.username && formik.errors.username}
                      label="Confirm Password"
                      // margin="normal"
                      name="confirm_password"
                      // onBlur={formik.handleBlur}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      type="text"
                      value={confirm_password}
                      variant="outlined"
                      size="small"
                      margin="dense"
                    />

                    <h6 style={{ color: "#D14343" }}>
                      {(password !== confirm_password) & (password != 0) & (confirm_password != 0)
                        ? "Password not match"
                        : ""}
                    </h6>

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
                      <div>Delete Account [ {customerDelete?.username} ]</div>
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
                        <div>Edit Account [ {customerEdit?.username} ]</div>
                        <Box
                          sx={{
                            color: "error.main",
                            fontSize: "1.7rem",
                          }}
                        >
                          <i className="fa fa-times" onClick={handleClose} />
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
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        style={{
                          width: "100%",
                          height: 40,
                          borderRadius: 5,
                          borderColor: "rgba(0,0,0,0.2)",
                        }}
                      >
                        <option value="">Select Role</option>
                        <option value="admin">Admin</option>
                        <option value="staff">Staff</option>
                        {/* <option value={option.value} selected={optionsState == option.value}>
                      {option.label}
                    </option> */}
                      </select>

                      <TextField
                        // error={Boolean(formik.touched.username && formik.errors.username)}
                        fullWidth
                        // helperText={formik.touched.username && formik.errors.username}

                        label="Password"
                        margin="normal"
                        name="password"
                        // onBlur={formik.handleBlur}
                        onChange={(e) => setPassword(e.target.value)}
                        type="text"
                        value={password}
                        variant="outlined"
                        size="small"
                      />

                      <TextField
                        // error={Boolean(formik.touched.username && formik.errors.username)}
                        fullWidth
                        // helperText={formik.touched.username && formik.errors.username}
                        label="Confirm Password"
                        // margin="normal"
                        name="confirm_password"
                        // onBlur={formik.handleBlur}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        type="text"
                        value={confirm_password}
                        variant="outlined"
                        size="small"
                      />

                      <h6 style={{ color: "#D14343" }}>
                        {(password !== confirm_password) & (password != 0) & (confirm_password != 0)
                          ? "Password not match"
                          : ""}
                      </h6>

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
              Create Accounts
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
                Add Account
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

                  <TableCell>ID</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell align="center">MANAGE</TableCell>
                  {/* <TableCell>Registration date</TableCell> */}
                </TableRow>
              </TableHead>
              <TableBody>
                {user?.slice(page * limit, page * limit + limit).map((customer, index) => (
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
                        <Typography color="textPrimary" variant="body1">
                          {customer.username}
                        </Typography>
                      </Box>
                    </TableCell>
                    {/* <TableCell>{customer.email}</TableCell> */}
                    <TableCell>{customer.role}</TableCell>

                    <TableCell align="center">
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
          component="div"
          count={user?.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </Card>
    </div>
  );
};

CreateFacebookListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
