import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(#0d0f11,#14161a,#2b2f38)",
    color: "white",
    padding: 30,
  },
  lock:{
    marginTop:'25%',
    height:'60%',
    background:'linear-gradient(#1c1d23,#111114)',
    borderRadius:20,
    width:'100%',
    position:'relative',
    zIndex:2
  },
  lockimage:{
    marginBottom:20,
    height:140,
    maxHeight:140,
    textAlign:'center',
    padding:40,
    '& img':{
      height:'100%',
    }
  },
  reveal:{
    borderRadius:'20px',
    padding:'10px 40px',
    fontSize:15,
    left:'50%',
    transform:'translate(-50%,-50%)',
    border:'1px solid #959597',
    color:'white',
    margin:'auto',
    position:'absolute',
    bottom:40,
    whiteSpace:'nowrap',
    cursor:'pointer'
  },
  footer:{
    position:'absolute',
    left:'50%',
    transform:'translate(-50%,-50%)',
    bottom:10,
  },
  bottomimg:{
    position:'absolute',
    bottom:'-36px',
    left:'-30px',
    width:447,
    maxWidth:'inherit',
    zIndex:1
  }
}));

export default useStyles;