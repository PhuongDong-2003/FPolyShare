import { AspectRatio } from '@mui/joy'
import { Box, Button, LinearProgress, Typography } from '@mui/material'
import React, { Fragment, useContext, useState } from 'react'
import { HorizontalStepperContext } from '../HorizontalStepper';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { storage } from '../../../../../firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable, uploadString } from 'firebase/storage';
import { v4 } from 'uuid';
import { useCreateProductMutation } from '../../../../../services/feature/Product/service';

const ProjectWaitingPanel = () => {

  const [ createProduct ] = useCreateProductMutation();

  const { 
    ratio, 
    videoFile, 
    setVideoFile,
    projectDetail,
    setProjectDetail
  } = useContext(HorizontalStepperContext);

  const [ progress, setProgress ] = useState(0);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ isSuccess, setIsSuccess ] = useState(false);

  const handleUploadToCloud = async () => {
    const videoRef = ref(storage, `videosDemo/${v4()}`);
    const snapshotRef = ref(storage, `thumbnailsDemo/${v4()}`);
    const sourceRef = ref(storage, `sourcesDemo/${v4()}_${projectDetail.source.name}`);

    const dataMap = new Map();
    dataMap.set(videoRef, videoFile.data);
    dataMap.set(snapshotRef, projectDetail.thumbnail.data);
    dataMap.set(sourceRef, projectDetail.source.data);

    const promises = [];

    for (const [key, value] of dataMap.entries()) {
      const url = await uploadProcess(key, value);
      promises.push(url);
    }

    Promise
    .all(promises)
    .then( async () => {
      const [videoPath, thumbnailPath, sourcePath] = promises;
      const payload = {
        id: v4(),
        name: projectDetail.title,
        chanelName: 'Thầy Lộc',
        view: 0,
        like: 0,
        createDate: new Date(),
        censor: projectDetail.censor,
        major: projectDetail.major,
        status: 'PENDING',
        videoPath,
        thumbnailPath,
        sourcePath,
      }
      const response = await createProduct(payload).unwrap();
      console.log(response);
      setIsLoading(false);
      setIsSuccess(true);
      setVideoFile(null);
      setProjectDetail(null);
    })
    .catch(error => console.log(error))
  }

  const uploadProcess = (ref, data) => {
    return new Promise((resolve, reject) => {
      if (typeof data === 'string') {
        uploadString(ref, data.slice(data.indexOf(',') + 1), 'base64', { contentType: 'image/png' }).then(
          (response) => {
            getDownloadURL(response.ref).then(downloadUrl => {
              resolve(downloadUrl);
            })          
          },
          (error) => {}
        );
      } else {
        const task = uploadBytesResumable(ref, data);
        task.on('state_changed',
          (snapshot) => {
            const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(Math.round(percent));
            setIsLoading(true);
          },
          (error) => {},
          () => {
            getDownloadURL(task.snapshot.ref).then(downloadUrl => {
              resolve(downloadUrl);
            })
          }
        )        
      }
    })
  }

  return (
    <Box my={2} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <AspectRatio ratio={ratio} sx={{ width: "100%" }}>
        <Box flexDirection={'column'}>
          { isLoading && (
            <Fragment>
              <LinearProgress
                variant='determinate' 
                sx={{ 
                  minWidth: '80%', 
                  height: 4, 
                  borderRadius: 4,
                }}
                value={progress}
                color='success'
              />
              <Typography variant='subtitle2' m={1} p={1}>{`Uploading... ${Math.floor(progress)}%`}</Typography>
            </Fragment>
          )}
          <Button
            variant='contained'
            startIcon={<SaveRoundedIcon />}
            disabled={isLoading}
            onClick={handleUploadToCloud}
            sx={{ display: isSuccess ? 'none' : 'inline-flex' }}
          >
            Khởi tạo dự án
          </Button>
          { isSuccess && (<Typography variant='subtitle2' component={'p'}>Video đang được kiểm duyệt, cảm ơn sự đóng góp của bạn</Typography>) }
        </Box>
      </AspectRatio>
    </Box>
  )
}

export default ProjectWaitingPanel