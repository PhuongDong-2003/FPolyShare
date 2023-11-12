import { AspectRatio } from "@mui/joy";
import { Box, Button, Typography, styled } from "@mui/material";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import Draggable from "react-draggable";
import { useContext } from "react";
import { HorizontalStepperContext } from "../HorizontalStepper";
import VideoSnapshot from "video-snapshot";

export const VisualHiddenInput = styled("input")(() => ({
  clipPath: 'inset(50%)',
  position: 'absolute',
  bottom: 0,
  left: 0,
}))

const UploadVideoPanel = () => {
  const { ratio, videoFile, setVideoFile } = useContext(HorizontalStepperContext);

  const handleChangeVideo = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const snapshoter = new VideoSnapshot(file);
      const snapshots = [
        await snapshoter.takeSnapshot(0),
        await snapshoter.takeSnapshot(1000),
      ]
      const url = URL.createObjectURL(file);
      setVideoFile({
        ...videoFile,
        url,
        snapshots,
        data: file
      });  
    }
  };

  return (
    <Box my={2} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <AspectRatio ratio={ratio} sx={{ width: "100%" }}>
        {/* <Box sx={{ overflow: 'auto' }}> */}
          <Typography component={"div"} fontSize={'4rem'}>
            {videoFile.url ? (
              <Box
                component={'video'}
                src={videoFile.url}
                controls
                autoPlay
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'fill',
                }}
              />
            ) : (
              <PlayArrowRoundedIcon fontSize="inherit" />
            )}
          </Typography>
        {/* </Box> */}
      </AspectRatio>
      <Draggable>
        <Button
          component="label"
          variant="contained"
          size="large"
          sx={{ position: 'absolute', width: '4rem', height: '4rem', lineHeight: '4rem', borderRadius: '50%' }}
        >
          <CloudUploadOutlinedIcon />
          <VisualHiddenInput
            type="file"
            accept=".mp4"
            onChange={handleChangeVideo}
          />
        </Button>
      </Draggable>
    </Box>
  );
};

export default UploadVideoPanel;