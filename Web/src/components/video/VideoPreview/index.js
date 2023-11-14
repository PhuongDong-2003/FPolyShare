import { AspectRatio } from "@mui/joy";
import { Avatar, Box, Card, CardContent, CardMedia, Grid, Tooltip, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDateOrString, formatNumber } from "../../../utils/format";

const TypographyStyle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const VideoPreview = ({ video }) => {
  const navigate = useNavigate();

  return (
    <Grid item xs={12} sm={6} lg={4}>
      <Card
        sx={{
          m: 1,
          borderRadius: 3,
          cursor: "pointer",
          bgcolor: "unset",
          boxShadow: "unset",
        }}
        onClick={() => navigate(`../videos/${video.id}`)}
      >
        <AspectRatio 
          ratio="16/9" 
          sx={{ 
            width: "100%",
            '& .MuiAspectRatio-content': {
              bgcolor: 'inherit'
            }
          }}>
          <CardMedia
            component="img"
            image={video.thumbnailPath}
            sx={{ borderRadius: 3, objectFit: "cover" }}
          />
        </AspectRatio>
        <CardContent sx={{ px: 0, py: 1, pb: 1, bgcolor: "unset" }}>
          <Grid container>
            <Grid
              item
              xs={1.5}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Avatar
                alt="avatar"
                src="https://plus.unsplash.com/premium_photo-1675865396004-c7b86406affe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80"
                sx={{ margin: 0.5 }}
              />
            </Grid>
            <Grid item xs={10.5}>
              <Box sx={{ px: 1 }}>
                <Tooltip title={video.name}>
                  <TypographyStyle
                    variant="subtitle2"
                    component="div"
                    textAlign={"justify"}
                    sx={{ font: "normal 500 1rem 'JetBrains Mono'", mb: 1 }}
                  >
                    {video.name}
                  </TypographyStyle>
                </Tooltip>
                <Typography sx={{ fontFamily: "JetBrains Mono" }}>
                  {video.chanelName}
                </Typography>
                <Typography sx={{ fontFamily: "JetBrains Mono" }}>
                  { formatNumber(video.view) + ' lượt xem' } • { formatDateOrString(video.createDate) }
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default VideoPreview;