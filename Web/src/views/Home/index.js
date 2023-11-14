import React from 'react'
import { Grid } from '@mui/material';
import VideoPreview from '../../components/video/VideoPreview';
import { useGetProductsQuery } from '../../services/feature/Product/service';

const Home = () => {
  const { data: videos = [] } = useGetProductsQuery();

  return (
    <Grid container>
      { videos
        .filter(item => item.status === "ACTIVE" && Boolean(item.isPublish))
        .map(video => <VideoPreview key={video.id} video={video} />) 
      }
    </Grid>
  )
}

export default Home