import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "linear-gradient(#0d0f11,#14161a,#2b2f38)",
    color: "white",
    padding: 20,
  },
  filter: {
    marginTop: 40,
    display: "flex",
    flexDirection: "row",
  },
  nftfilter: {
    background: "#23272f",
    borderRadius: "12px",
    padding: "3px 10px",
    margin: "10px 2px",
    color: "white",
    fontSize: 9,
    cursor:'default',
  },
  active_tab: {
    background: "#2cc7ec",
  },
  filtertitle: {
    margin: "15px 10px",
    fontWeight: 100,
  },
  images: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  //MyNFTs
  mynft: {
    flex: 1,
    margin: 5,
  },
  front: {
    flex: 1,
    position: "relative",
    zIndex: 3,
    boxShadow: "0px 10px 5px #0a0b0c",
    borderRadius: 12,
    background: "linear-gradient(#2c2f36,#141517);",
    padding: 10,
    height: 130,
  },
  nftimg: {
    width: "100%",
    borderRadius: 12,
    height: 90,
    textAlign:'center',
    '& > img':{
      maxHeight:'100%',
    }
  },
  addimg:{
    width:'80%',
    marginTop:'20px',
  },

  nftinfo: {
    position: "relative",
    width: "100%",
    marginTop: "8px",
  },
  nftmain: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nftname: {
    fontSize: 7,
    textAlign: "center",
  },
  nftprice: {
    border: "1px solid #24b503",
    borderRadius: "12px",
    color: "#24b503",
    fontSize: 7,
    padding: "1px 2px",
  },
  nftowner: {
    color: "#24b503",
    fontSize: 8,
    position: "absolute",
    marginTop: -3,
  },
  back: {
    zIndex: 2,
    position: "relative",
    boxShadow: "0px 10px 5px #0a0b0c",
    borderRadius: "0px 0px 12px 12px",
    background: "#141517",
    height: 30,
    width: "100%",
    marginTop: "-15px",
  },
  searchnft:{
    position:'relative',
    zIndex:2,
  },
  searchtitle: {
    fontWeight:'100'
  },
  
  nftlist:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
  },
  onenft:{
    background:'linear-gradient(#141517,#1e2024)',
    boxShadow:'0 5px 5px #0a0b0c',
    borderRadius:12,
    position:'relative',
    height:115,
    flex:1,
    margin:5,
  },
  first_title:{
    position:'absolute',
    bottom:7,
    left:'50%',
    transform:'translate(-50%,-50%)',
  },
  nft_title:{
    position:'absolute',
    top:5,
    left:3,
    zIndex:3
  },
  nftbackground:{
    position:'absolute',
    zIndex:1,
    maxHeight:'100%',
    width:'100%',
    borderRadius:12,
  },
  search_image:{
    position:'absolute',
    zIndex:1,
    maxHeight:'100%',
    width:'65%',
    height:'65%',
    margin:'20px 15px',
    borderRadius:12,
  },
  bottomimg: {
    position: "absolute",
    bottom: "-85px",
    left: "-30px",
    width: 447,
    maxWidth: "inherit",
    zIndex: 1,
  },
}));

export default useStyles;
