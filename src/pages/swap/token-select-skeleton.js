import React, { useState, useMemo } from "react";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Box } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';


const TokenSelectSkeleton = (props) => {
    const classes = useStyles(useTheme());

    return (<Box className={classes.root}>  
            <Skeleton variant="rect" animation="wave" className={classes.tokenSelectSkeleton} />
        </Box>);
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    tokenSelectSkeleton: {
        position: 'relative',
        width: '100%',
        height: 50,
        backgroundColor: '#777777',
        borderRadius: '10px'
    },
}));

export default TokenSelectSkeleton;
