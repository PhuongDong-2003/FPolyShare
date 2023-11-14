import { Grid } from "@mui/material";
import ContentSection from "./ContentSection";
import RelatedSection from "./RelatedSection";
import { useParams } from "react-router-dom";

const VideoDetail = () => {
  window.scrollTo(0, 0);

  const { videoID } = useParams();

  return (
    <Grid container>
      <Grid item xs={12} md={8.3} p={1}>
        <ContentSection videoID={videoID}/>
      </Grid>
      <Grid item xs={12} md={3.7} p={1}>
        <RelatedSection />
      </Grid>
    </Grid>
  );
};

export default VideoDetail;
