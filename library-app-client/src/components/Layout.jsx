import React from 'react';
import { Drawer, List, ListItem, ListItemText, Toolbar, Box, Typography, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import NavBar from './NavBar'; 
import HomeIcon from '@mui/icons-material/Home';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CategoryIcon from '@mui/icons-material/Category';
import BookIcon from '@mui/icons-material/Book';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const drawerWidth = 240;

// menu items
const menuItems = [
  { text: 'Home', icon: <HomeIcon />, path: '/' },
  { text: 'Publishers', icon: <LibraryBooksIcon />, path: '/publishers' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
  { text: 'Books', icon: <BookIcon />, path: '/books' },
  { text: 'Authors', icon: <PeopleIcon />, path: '/authors' },
  { text: 'Book Borrows', icon: <ShoppingCartIcon />, path: '/borrows' }
];

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <NavBar />
      
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { 
            width: drawerWidth, 
            boxSizing: 'border-box', 
            backgroundColor: '#f5f5dc', 
            borderRight: '2px solid #d2b48c' 
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={Link} 
                to={item.path} 
                sx={{
                  '&:hover': {
                    backgroundColor: '#d2b48c', 
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', color: '#8b4513' }}>
                  {item.icon}
                  <Typography 
                    variant="body1" 
                    sx={{ marginLeft: '10px', fontWeight: 'bold', color: '#8b4513' }}
                  >
                    {item.text}
                  </Typography>
                </Box>
              </ListItem>
            ))}
          </List>
          <Divider />
          <Box sx={{ padding: '10px', textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              &copy; {new Date().getFullYear()} Book Management
            </Typography>
          </Box>
        </Box>
      </Drawer>
      
      <Box component="main" sx={{ flexGrow: 1, bgcolor: '#f0f2f5', padding: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
