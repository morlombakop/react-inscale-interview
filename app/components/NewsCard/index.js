import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import LinesEllipsis from 'react-lines-ellipsis';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import IconButton from '@material-ui/core/IconButton';
import ViewIcon from '@material-ui/icons/RemoveRedEye';
import Tooltip from '@material-ui/core/Tooltip';

const styles = {
  media: {
    // ⚠️ object-fit is not supported by IE 11.
    objectFit: 'cover',
  },
};

const NewsCard = ({ classes, history, newsObj }) => {
  const StyledCard = styled(Card)`
    height: 400px;
  `;
  const Description = styled(Typography)`
    height: 70px;
  `;
  const Title = styled(Typography)`
    text-transform: capitalize;
  `;

  // Route to the current article
  const readArticle = () => history.push(`/article/${newsObj.id}`);

  return (
    <StyledCard>
      <CardActionArea>
        <CardMedia
          component="img"
          alt={newsObj.title}
          className={classes.media}
          height="200"
          image={newsObj.imageUrl}
          title={newsObj.title}
        />
        <CardContent>
          <Title variant="h5" component="h2">
            {newsObj.title}
          </Title>
          <Description component="div">
            <LinesEllipsis
              text={newsObj.description}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </Description>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Tooltip title="Add to favorites">
          <IconButton aria-label="Add to favorites" color="primary">
            <FavoriteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share">
          <IconButton aria-label="Share" color="primary">
            <ShareIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Learn More">
          <IconButton aria-label="Share" color="primary" onClick={readArticle}>
            <ViewIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </StyledCard>
  );
};

NewsCard.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  newsObj: PropTypes.object,
};

export default withStyles(styles)(withRouter(NewsCard));
