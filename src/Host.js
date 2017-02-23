import React, {Component} from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import Paper from 'material-ui/Paper';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  paper: {
    margin: '20px',
    display: 'flex',
  },
  paperVid: {
    margin: '20px',
    height: '450px',
  },
  video: {
    width: '100%',
    height: '450px',
    overflow: 'auto',
  }
};

const tilesData = [
  {
    img: './1.jpg',
    title: 'Breakfast',
    author: 'jill111',
  },
  {
    img: './2.jpg',
    title: 'Tasty burger',
    author: 'pashminu',
  },
  {
    img: './3.jpg',
    title: 'Camera',
    author: 'Danson67',
  },
];

class Host extends Component {
    render() {
        return (
<div>
  <Paper style={styles.paperVid} zDepth={5} rounded={false}>
  <iframe style={styles.video} src="https://www.youtube.com/embed/6NXnxTNIWkc?ecver=1" frameBorder="0" allowFullScreen></iframe>
</Paper>
  <Paper style={styles.paper} zDepth={5} rounded={false}>
  <GridList style={styles.gridList} cols={2.2}>
    {tilesData.map((tile) => (
      <GridTile
        key={tile.img}
        title={tile.title}
        actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}

        titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
      >
        <img src={tile.img} />
      </GridTile>
    ))}
  </GridList>
</Paper>
</div>
)}}

export default Host;
