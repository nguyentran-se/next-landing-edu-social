import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import ActiveLink from 'components/ActiveLink';
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Login', href: '/verify' },
];

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger();
  return (
    <>
      <AppBar
        position="fixed"
        component="nav"
        sx={{
          backgroundColor: 'transparent',
          color: theme.palette.primary.main,
          height: trigger ? 64 : 80,
        }}
      >
        <Toolbar sx={{ height: '100%' }}>
          {/* <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2, display: { sm: 'none' } }}
      >
        <MenuIcon />
      </IconButton> */}
          <Typography variant="h3" color="#5569ff" component="div" sx={{ flexGrow: 1 }}>
            FUniverse
          </Typography>
          <Box>
            {navItems.map(({ label, href }, index) => (
              // @ts-ignore
              <Button
                sx={{ borderRadius: '0 !important' }}
                LinkComponent={ActiveLink}
                href={href}
                key={index}
                variant="text"
                disableRipple
                activeClassName="active-link"
              >
                {label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ height: theme.mixins.toolbar.height, width: '100%' }}></Box>
      {/* <main>{children}</main> */}
      <Box
        component="main"
        sx={{
          height: `calc(100vh - ${trigger ? 64 : 80}px)`,
          marginTop: `${trigger ? 64 : 80}px`,
        }}
      >
        {children}
      </Box>
    </>
  );
}

export default Layout;
