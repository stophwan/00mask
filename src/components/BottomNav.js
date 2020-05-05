import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import ExploreIcon from '@material-ui/icons/Explore';
import ListIcon from '@material-ui/icons/List';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles({
  root: {
    background : '#eee',
    width: '100%',
  },
});

export default function SimpleBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction label="Map" icon={<ExploreIcon />} />
      <BottomNavigationAction label="Lists" icon={<ListIcon />} />
      <BottomNavigationAction label="Nearby" icon={<HelpOutlineIcon />} />
      <BottomNavigationAction label="About" icon={<InfoIcon />} />

    </BottomNavigation>
  );
}