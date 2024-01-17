import { useEffect, useState } from "react";
import navbarLogo from "../img/logo/default-monochrome.svg";
import { useNavigate } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { NAVBAR_VARIANT } from "../constants";
import { useUserContext } from "../contexts/UserContext";
import { useLogout } from "../hooks/useLogout";
import React from "react";
import { PersonAdd, Settings, Logout } from "@mui/icons-material";
import {
  Box,
  Typography,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  AppBar,
  Container,
  Toolbar,
  Button,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";

type NavbarProps = {
  variant: NAVBAR_VARIANT;
};

export default function Navbar(props: NavbarProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);

  const { user } = useUserContext();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 1024);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const logout = useLogout();
  const navigate = useNavigate();
  const { variant } = props;
  const variantToStyle = {
    [NAVBAR_VARIANT.TRANSPARENT]: "bg-black/[.1]  backdrop-blur",
    [NAVBAR_VARIANT.SOLID]: "bg-primary",
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const pages = ["Products", "Pricing", "Blog"];
  const settings = ["Profile", "Account", "Dashboard", "Logout"];

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.primary.main
        : theme.palette.primary.main,
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Stack sx={{ display: { xs: "none", md: "block" } }}>
              <Item>
                <img
                  width={200}
                  src={navbarLogo}
                  alt="logo"
                  className="mr-2 cursor-pointer"
                  onClick={() => navigate("/")}
                />
              </Item>
            </Stack>
            <Box></Box>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <img
                width={200}
                src={navbarLogo}
                alt="logo"
                className="mr-2 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <>
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    <Avatar
                      alt={user.username}
                      src={`/img/users/${user.profilePhoto}.jpg`}
                    />
                  </IconButton>
                  <Typography className="text-pure-white">
                    {user.username}
                  </Typography>
                </>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={() => navigate(`/user/${user.username}`)}>
                <Avatar /> My profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <ListItemIcon>
                  <Settings fontSize="small" />
                </ListItemIcon>
                Settings
              </MenuItem>
              <MenuItem onClick={logout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Toolbar>
        </Container>
      </AppBar>
    </>

    // <nav className={"flex w-full text-white " + variantToStyle[variant]}>
    //   <div className="flex w-screen items-center justify-between gap-4 px-8 py-4 lg:justify-between lg:px-[20%] ">
    // <img
    //   src={navbarLogo}
    //   alt="logo"
    //   className="max-w-[50%] cursor-pointer md:max-w-[25%] lg:max-w-[25%]"
    //   onClick={() => navigate("/")}
    // />

    //     {user.username && (
    //       <React.Fragment>
    //         <Box
    //           sx={{
    //             display: "flex",
    //             alignItems: "center",
    //             textAlign: "center",
    //           }}
    //         >
    //           <Tooltip title="Account settings">
    //             <>
    //               <IconButton
    //                 onClick={handleClick}
    //                 size="small"
    //                 sx={{ ml: 2 }}
    //                 aria-controls={open ? "account-menu" : undefined}
    //                 aria-haspopup="true"
    //                 aria-expanded={open ? "true" : undefined}
    //               >
    //                 <Avatar
    //                   alt={user.username}
    //                   src={`/img/users/${user.profilePhoto}.jpg`}
    //                 />
    //               </IconButton>
    //               <Typography className="text-pure-white">
    //                 {user.username}
    //               </Typography>
    //             </>
    //           </Tooltip>
    //         </Box>
    //         <Menu
    //           anchorEl={anchorEl}
    //           id="account-menu"
    //           open={open}
    //           onClose={handleClose}
    //           onClick={handleClose}
    //           PaperProps={{
    //             elevation: 0,
    //             sx: {
    //               overflow: "visible",
    //               filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
    //               mt: 1.5,
    //               "& .MuiAvatar-root": {
    //                 width: 32,
    //                 height: 32,
    //                 ml: -0.5,
    //                 mr: 1,
    //               },
    //               "&::before": {
    //                 content: '""',
    //                 display: "block",
    //                 position: "absolute",
    //                 top: 0,
    //                 right: 14,
    //                 width: 10,
    //                 height: 10,
    //                 bgcolor: "background.paper",
    //                 transform: "translateY(-50%) rotate(45deg)",
    //                 zIndex: 0,
    //               },
    //             },
    //           }}
    //           transformOrigin={{ horizontal: "right", vertical: "top" }}
    //           anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    //         >
    //           <MenuItem onClick={() => navigate(`/user/${user.username}`)}>
    //             <Avatar /> My profile
    //           </MenuItem>
    //           <Divider />
    //           <MenuItem onClick={handleClose}>
    //             <ListItemIcon>
    //               <Settings fontSize="small" />
    //             </ListItemIcon>
    //             Settings
    //           </MenuItem>
    //           <MenuItem onClick={logout}>
    //             <ListItemIcon>
    //               <Logout fontSize="small" />
    //             </ListItemIcon>
    //             Logout
    //           </MenuItem>
    //         </Menu>
    //       </React.Fragment>
    //     )}
    //   </div>
    // </nav>
  );
}
