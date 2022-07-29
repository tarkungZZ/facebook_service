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
import { useTranslation } from "react-i18next";

export const CreatePostListResults = ({ ...rest }) => {
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
  //Create_Facebook email, fb_password, email_password, two_fa, execute_path
  const [email, setEmail] = useState(undefined);
  const [fb_password, setFbPassword] = useState(undefined);
  const [email_password, setEmailPassword] = useState(undefined);
  const [two_fa, setTwoFa] = useState(undefined);
  const [execute_path, setExecutePath] = useState(undefined);
  const [checkfbpassword, setCheckFbPassword] = useState(false);
  const [checkexeecute_path, setCheckExecutePath] = useState(false);
  const [width, setWidth] = useState(0);
  const [post, setPost] = useState(undefined);
  const [total, setTotal] = useState(0);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("language"));
  }, []);

  useEffect(() => {
    getData();
    // console.log("window.innerWidth", window.innerWidth);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
    };
  }, [limit, page]);

  // localStorage.getItem("create")

  const optionsState = {
    options: role,
  };

  const handleSelectFbPass = (event) => {
    setCheckFbPassword(event.target.checked);
  };

  const handleSeletExecutePath = (event) => {
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
    // console.log("handlePageChange", event);
    setPage(newPage);
  };

  const getData = async () => {
    const data = await auth.getPost(limit, page);
    setTotal(data?.data?.total);
    setUser(data?.data?.result);
    return data;
  };

  const handleEdit = (customer) => {
    setCustomerEdit(customer);
    // console.log("customer ===>>>", customer);
    setModal(true);
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

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value));
    setPage(0);
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

  const handleDelete = (customer) => {
    setCustomerDelete(customer);
    setIsDelete(true);
  };

  const handleConfirmDelete = async () => {
    const data = await auth.deletePost(customerDelete?.id);
    setIsDelete(false);
    setTimeout(() => {
      alert("Delete Success");
    }, 400);
    getData();
    return data;
  };

  const handleCreate = async () => {
    if (!post) {
      alert("Please Enter a Message");
      return;
    }
    const data = await auth.createPost(post);
    setPost(undefined);
    setIsCreate(false);
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
                      <div>{t("create_post")}</div>
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
                      multiline={true}
                      fullWidth
                      label={t("message")}
                      name="message"
                      onChange={(e) => setPost(e.target.value)}
                      type="text"
                      value={post}
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
                      {t("confirm")}
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
                      <div>
                        {t("delete_post")} [ {customerDelete?.id} ]
                      </div>
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
                    <div>{t("do_you_want_to_delete_this_post")}</div>
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
                        {t("cancel")}
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
                        {t("confirm")}
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
                      {/* <div style={{ fontSize: "0.3rem" }}>{customerEdit?.email}</div> */}
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
              {t("create_post")}
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
                {t("add_post")}
              </Button>
            </Box>
          </Box>
        </Box>
        <PerfectScrollbar>
          <Box style={{ overflow: "scroll" }}>
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
                  {/* <TableCell>Role</TableCell> */}
                  <TableCell>{t("id")}</TableCell>
                  <TableCell>{t("post")}</TableCell>
                  <TableCell align="center">{t("manage")}</TableCell>
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
                    {/* <TableCell>{customer.role}</TableCell> */}
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
                          {customer.post.substring(0, window.innerWidth < 500 ? 15 : 250)}
                        </Typography>
                        {/* )} */}
                      </Box>
                    </TableCell>
                    {/* <TableCell>{customer.email}</TableCell> */}

                    <TableCell align="center">
                      <Button
                        color="error"
                        // variant="contained"
                        onClick={() => {
                          handleDelete(customer);
                        }}
                      >
                        {t("delete")}
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
          count={total}
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

// CreatePostListResults.propTypes = {
//   customers: PropTypes.array.isRequired,
// };
