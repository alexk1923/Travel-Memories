import { useEffect, useRef, useState } from "react";
import navbarLogo from "../img/logo/default-monochrome.svg";
import { useNavigate } from "react-router-dom";
import { FaAlignJustify } from "react-icons/fa";
import { NAVBAR_VARIANT, PLACE_CATEGORY } from "../constants";
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
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import ProfileDropdown from "./ProfileDropdown";
import NavSidebar from "./NavSidebar";
import ProfileDetails from "./ProfileDetails";
import { usePlaceCategoryContext } from "../contexts/PlaceCategoryContext";

type NavbarProps = {
  variant: NAVBAR_VARIANT;
  itemsRef: React.MutableRefObject<{
    [key: string]: HTMLElement;
  } | null> | null;
  handleMenuSelect: ((page: string) => void) | null;
};

export default function Navbar(props: NavbarProps) {
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1024);
  const { placesCategory, setPlacesCategory } = usePlaceCategoryContext();

  const { user } = useUserContext();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpenDrawer(newOpen);
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
  const { variant, itemsRef, handleMenuSelect } = props;
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

  const pages = ["About", "Contact"];

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
        <Toolbar
          disableGutters
          sx={{
            display: "flex",
            justifyContent: { xs: "space-between" },
            marginX: { lg: 2 },
          }}
        >
          {/* Small screen drawer menu */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={toggleDrawer(true)}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>

            <Drawer open={openDrawer} onClose={toggleDrawer(false)}>
              <ProfileDetails
                user={user}
                category={{
                  page: "Profile",
                  placesCategory,
                  setPlacesCategory,
                }}
                closeDrawer={() => {
                  setOpenDrawer(false);
                }}
              />
            </Drawer>

            {/* <Menu
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
              {pages.map((page, idx) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    if (handleMenuSelect !== null) {
                      handleMenuSelect(page.toLowerCase());
                      handleCloseNavMenu();
                    }
                  }}
                >
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu> */}
          </Box>

          <Box sx={{ flex: { xs: 1, lg: "0 1 auto" } }}>
            <Item>
              <img
                width={150}
                src={navbarLogo}
                alt="logo"
                className="mr-2 cursor-pointer"
                onClick={() => navigate("/")}
              />
            </Item>
          </Box>
          {/* Large screen size menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, idx) => (
              <Button
                key={page}
                onClick={() => {
                  if (handleMenuSelect !== null) {
                    handleMenuSelect(page.toLowerCase());
                  }
                }}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>

          {user.username ? (
            <ProfileDropdown />
          ) : (
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
}
