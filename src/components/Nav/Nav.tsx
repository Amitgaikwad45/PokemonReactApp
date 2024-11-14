import React from 'react';
import { createUseStyles } from 'react-jss';
import { useLayout, useToggleNav } from '../../contexts';
import clsx from 'clsx';
import { NavOption } from './NavOption';

export const Nav = () => {
  const { navCollapsed } = useLayout();
  const classes = useStyles({ navCollapsed });
  const toggleNav = useToggleNav();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.main}>
          <div className={classes.title}>
            <img src="/pokeball-white.png" className={classes.img} />
            <h3>Pokémon</h3>
          </div>
          <NavOption to="/" icon="home" name="Home">
            Home
          </NavOption>
          <NavOption to="/pokemon" icon="list" name="List">
            List
          </NavOption>
        </div>
        <div className={classes.bottom}>
          <button className={classes.expandBtn} onClick={() => toggleNav()}>
            <span
              title={navCollapsed ? 'Expand' : 'Collapse'}
              className={clsx(classes.btnIcon, 'material-icons')}
            >
              {navCollapsed ? 'unfold_more' : 'unfold_less'}
            </span>
            <span className={classes.btnTxt}>Collapse</span>
          </button>
        </div>
      </div>
      <div className={classes.spacer} />
    </>
  );
};

interface StyleProps {
  navCollapsed: boolean;
}

const useStyles = createUseStyles(
  {
    root: {
      zIndex: 100,
      background: '#1a1a2e', // Darker background color for modern look
      color: '#ffffff',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      width: (props: StyleProps) => (props.navCollapsed ? '80px' : '280px'), // Adjusted width for better aesthetic
      display: 'flex',
      flexDirection: 'column',
      transition: 'width .3s ease',
      overflow: 'hidden',
      boxShadow: '2px 0 5px rgba(0, 0, 0, 0.2)', // Subtle shadow for depth
    },
    spacer: {
      height: '100%',
      width: (props: StyleProps) => (props.navCollapsed ? '80px' : '280px'),
      transition: 'width .3s ease',
    },
    main: {
      flex: 1,
      padding: '20px 15px',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px', // Adds space between elements
    },
    title: {
      display: 'flex',
      alignItems: 'center',
      paddingBottom: '10px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)', // Divider for header section
      '& h3': {
        marginLeft: '12px',
        fontSize: '1.2rem',
        fontWeight: 'bold',
        color: '#ffffff',
      },
    },
    img: {
      width: '40px',
      padding: '8px',
      filter: 'brightness(80%)',
    },
    bottom: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: '15px 20px',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },
    expandBtn: {
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      cursor: 'pointer',
      borderRadius: '4px',
      padding: '8px 12px',
      transition: 'background .3s',
      '&:hover': {
        background: 'rgba(255,255,255,0.1)',
      },
      '&:active': {
        background: 'rgba(255,255,255,0.2)',
      },
    },
    btnIcon: {
      transform: 'rotate(90deg)',
      color: '#ffffff',
      fontSize: '20px',
      transition: 'transform .3s',
    },
    btnTxt: {
      marginLeft: '14px',
      fontSize: '0.9rem',
      opacity: (props: StyleProps) => (props.navCollapsed ? 0 : 1),
      color: '#ffffff',
      transition: 'opacity .3s',
    },
  },
  { name: 'Nav' }
);
