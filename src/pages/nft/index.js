import * as React from "react";
// get our fontawesome imports
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import useStyles from "./style";

const tablist = ["All", "Gaming", "Sport", "Celebrities"];
const mymfts = [
  {
    title: "Add NFT",
    image: "add.png",
  },
  {
    title: "Free Palestina",
    image: "freepalestina.png",
    price: "3 BNB",
    owner: "Davis",
  },
  {
    title: "Aurum hands",
    image: "aurum.png",
    price: "2 BNB",
    owner: "Christina",
  },
];
const allnfts = [
  {
    title: "Search",
    image: "search.png",
  },
  {
    title: "Beeple Merlin",
    image: "merel.png",
  },
  {
    title: "Serwah Attafuah",
    image: "Laag.png",
  },
];
const Filtertab = (props) => {
  console.log(props.active);
  const classes = useStyles();
  return tablist.map((tab, index) => {
    return (
      <span
        key={`tab-${index}`}
        className={classes.nftfilter}
        style={{ background: props.active === index ? "#2cc7ec" : "#23272f" }}
      >
        {tab}
      </span>
    );
  });
};
const MyNFTs = (props) => {
  const classes = useStyles();
  return mymfts.map((item, index) => {
    return (
      <div key={`mynft-${index}`} className={classes.mynft}>
        <div className={classes.front}>
          <div className={classes.nftimg}>
            <img src={`images/${item.image}`} alt={item.title} className={index===0?classes.addimg:{}}/>
          </div>
          <div className={classes.nftinfo}>
            <div
              className={classes.nftmain}
              style={{
                justifyContent: index === 0 ? "center" : "space-between",
              }}
            >
              <span className={classes.nftname}>{item.title}</span>
              {item.price && (
                <span className={classes.nftprice}>{item.price}</span>
              )}
            </div>
            {item.owner && (
              <span className={classes.nftowner}>{`By ${item.owner}`}</span>
            )}
          </div>
        </div>
        <div className={classes.back}></div>
      </div>
    );
  });
};

const AllNFTs = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.nftlist}>
      {allnfts.map((item, index) => {
        return (
          <div className={classes.onenft} key={`allnft-${index}`}>
            <div className={index===0?classes.first_title:classes.nft_title}>{item.title}</div>
            <img
              src={`images/${item.image}`}
              alt={item.title}
              className={index===0?classes.search_image:classes.nftbackground}
            />
          </div>
        );
      })}
    </div>
  );
};
const Nft = () => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <div className={classes.root}>
      <button onClick={()=>history.push('lock')}>Next page</button>
      <div className={classes.filter}>
        <Filtertab active={0} />
      </div>
      <div className={classes.mynfts}>
        <h1 className={classes.filtertitle}>
          MyNFTS <FontAwesomeIcon icon={faCaretDown} />
        </h1>
        <div className={classes.images}>
          <MyNFTs />
        </div>
      </div>
      <div className={classes.searchnft}>
        <h1 className={classes.searchtitle}>
          Search NFTS <FontAwesomeIcon icon={faCaretDown} />
        </h1>
          <AllNFTs />
      </div>
      <img src="images/wave.png" className={classes.bottomimg} alt="bottom_image"/>
    </div>
  );
};

export default Nft;
