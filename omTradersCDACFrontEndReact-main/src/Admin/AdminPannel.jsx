import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { ThemeProvider } from "@emotion/react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import ListItemIcon from "@mui/material/ListItemIcon";
import { customTheme } from "./them/customeThem";
import AdminNavbar from "./Navigation/AdminNavbar";
import Dashboard from "./Views/Admin";
import { Route, Routes, useNavigate,Link } from "react-router-dom";
import DemoAdmin from "./Views/DemoAdmin";
import CreateProductForm from "./componets/createProduct/CreateProductFrom";
import CreateProuductDemo from "./componets/createProduct/CreateProuductDemo";
import CreateProduct from "../customer/Components/Create/CreateProduct";
import "./AdminPannel.css";
import ProductsTable from "./componets/Products/ProductsTable";
import OrdersTable from "./componets/Orders/OrdersTable";
import Customers from "./componets/customers/customers";
import UpdateProductForm from "./componets/updateProduct/UpdateProduct";

import AddEmployeeComponent from "./Employee/AddEmployeeComponent";
import ListEmployeeComponent from "./Employee/ListEmployeeComponent";

const drawerWidth = 240;

const menu = [
  {name:"Dashboard",path:"/admin"},
  {name:"Products",path:"/admin/products"},
  {name:"Customers",path:"/admin/customers"},
  {name:"Orders",path:"/admin/orders"},
  // {name:"Total Earnings",path:"/admin"},
  // {name:"Weekly Overview",path:"/admin"},
  // {name:"Monthly Overview",path:"/admin"},
  {name:"Add Product",path:"/admin/product/create"},
  {name:"Employee",path:"/admin/employee"}
];

export default function AdminPannel() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [sideBarVisible, setSideBarVisible] = React.useState(false);
  const navigate=useNavigate();


  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authenticated, setAuthenticated] = React.useState(false);

  const handleLogin = () => {
    if (username === "omtraders" && password === "om") {
      setAuthenticated(true);
    } else {
      alert("Invalid password. Please try again.");
    }
  };

  const handleSideBarViewInMobile = () => {
    setSideBarVisible(true);
  };

  const handleCloseSideBar = () => {
    setSideBarVisible(false);
  };

  const drawer = (
    <Box
      sx={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {isLargeScreen && <Toolbar />}
      <List>
        {menu.map((item, index) => (
          <ListItem key={item.name} disablePadding onClick={()=>navigate(item.path)}>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List sx={{ position: "absolute", bottom: 0, width: "100%" }}>
        <Divider />
        {["Account", "Request"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );


  const drawerVariant = isLargeScreen ? "permanent" : "temporary";

  if (!authenticated) {
    return (

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        
        <div className='logo2'>
        <Link to='/'>
          <img className='login_logo2' src='om_icon.jpg' alt="Logo" />
        </Link>
        </div>

        <h1 className="login_heading">Admin Login</h1>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 300,
            width: "100%",
          }}
        >
          <label>
            Username : 
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="login-input"
            />
          </label>
          <label>
            Password :
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="login-input"
            />
          </label>
          <button onClick={handleLogin} className="login-button">
            Login
          </button>
        </Box>
      </Box>
    );
  }

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: `${isLargeScreen ? "flex" : "block"}` }}>
        <CssBaseline />
        <AdminNavbar handleSideBarViewInMobile={handleSideBarViewInMobile} />

        <Drawer
          variant={drawerVariant}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: "border-box",
              ...(drawerVariant === "temporary" && {
                top: 0,
                [`& .MuiPaper-root.MuiDrawer-paperAnchorTop.MuiDrawer-paperTemporary`]:
                  {
                    position: "fixed",
                    left: 0,
                    right: 0,
                    height: "100%",
                    zIndex: (theme) => theme.zIndex.drawer + 2,
                  },
              }),
            },
          }}
          open={isLargeScreen || sideBarVisible}
          onClose={handleCloseSideBar}
        >
          {drawer}
        </Drawer>
        <Box className="adminContainer" component="main" sx={{ flexGrow: 1 }}>
          <Toolbar />
          <Routes>
            <Route path="/" element={ <Dashboard />}></Route>
            <Route path="/product/create" element={<CreateProductForm/>}></Route>
            <Route path="/product/update/:productId" element={<UpdateProductForm/>}></Route>
            <Route path="/products" element={<ProductsTable/>}></Route>
            <Route path="/orders" element={<OrdersTable/>}></Route>
            <Route path="/customers" element={<Customers/>}></Route>
            <Route path="/demo" element={<DemoAdmin />}></Route>
            <Route path="/employee" element={<ListEmployeeComponent />} />
            <Route path="/add-employee" element={<AddEmployeeComponent />} />
            <Route path="/add-employee/:id" element={<AddEmployeeComponent />} />
          </Routes>
         
        </Box>
      </Box>
    </ThemeProvider>
  );
}
