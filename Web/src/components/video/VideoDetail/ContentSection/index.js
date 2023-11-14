import { Avatar, Box, Chip, Grid, IconButton, Stack, Table, TableBody, TableCell, TableRow, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { AspectRatio } from '@mui/joy';
import DownloadIcon from '@mui/icons-material/Download';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDateOrString, formatNumber } from '../../../../utils/format';
import { getDownloadURL, getMetadata, ref } from "firebase/storage";
import { storage } from '../../../../firebaseConfig';
import { useGetProductQuery, useUpdateProductMutation } from '../../../../services/feature/Product/service';

const ChipStyle = styled(Chip)(() => ({
  justifyContent: 'space-between',
  '& .MuiChip-label': {
    display: 'block',
    width: '100%',
    textAlign: 'center',
  }
}));

const TableCellStyle = styled(TableCell)(() => ({
  border: "unset"
}))

const ContentSection = ({videoID}) => {
  const theme = useTheme();
  const matchDown = useMediaQuery(theme.breakpoints.down('md'));
  const { data: video = {} } = useGetProductQuery(
    videoID, 
    {
      skip: !Boolean(videoID),
      refetchOnMountOrArgChange: true
    }
  );
  const [ updateProduct ] = useUpdateProductMutation();
  const [expandMore, setExpandMore] = useState(false);

  // const videoRef = useRef(null);
  const [isIncrease, setIsIncrease] = useState(false);

  
  useEffect(() => {
    const videoRef = ref(storage, `videosDemo/c8ac15a9-bdcc-42b7-ab72-d557f99d5502`);
    getMetadata(videoRef)
    .then(metadata => console.log(metadata))
    .catch(error => console.log(error))
  }, [video])

  const handleDownload = () => {
    const sourceRef = ref(storage, video.sourcePath);

    getDownloadURL(sourceRef)
    .then(url => {
      const link = document.createElement('a');
      link.href = url;
      link.click()
    })
    .catch(error => alert(error))
  }

  /* useEffect(() => {
    const videoEL = videoRef.current;

    const handleUpdate = async () => {
      const currentTime = videoEL.currentTime;

      if (currentTime >= 65) {
        await updateProduct({
          ...video,
          view: video.view + 1,
        });

        videoEL.removeEventListener('timeupdate', handleUpdate);
      }
    }

    videoEL.addEventListener('timeupdate', handleUpdate);

    return () => {
      videoEL.removeEventListener('timeupdate', handleUpdate);
    }
  }, [video, videoRef.current?.src]) */

  return (
    <Box width={"100%"}>
      <AspectRatio
        ratio={matchDown ? 16/10 : 16/9}
        sx={{ 
          width: "100%", 
          borderRadius: 10
        }}
      > 
        <video controls src={video.videoPath} style={{ objectFit: 'fill' }} autoPlay/>
      </AspectRatio>
      <Typography 
        variant='caption' 
        component={'div'} 
        noWrap
        sx={{
          fontSize: '1.5rem',
          margin: theme.spacing(0.5, 0)
        }}
      >
        {video?.name}
      </Typography>
      <Box width={'100%'}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Stack direction={'row'} spacing={2}>
              <Avatar
                variant='circular'
                src='https://plus.unsplash.com/premium_photo-1675865396004-c7b86406affe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1925&q=80' 
              />
              <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Typography variant='subtitle1' component={'div'}>{video?.chanelName}</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction={'row'} spacing={1} sx={{ justifyContent: {xs: 'flex-start', md: 'flex-end'} }}>
              <ChipStyle
                icon={<VisibilityIcon />} 
                fontSize='small' 
                label={ formatNumber(video?.view) + ' lượt xem' } 
                variant='outlined'
                color='secondary'
              />
              <ChipStyle
                icon={<FavoriteBorderIcon />} 
                fontSize='small' 
                label={ formatNumber(video?.like) + ' lượt thích' } 
                variant='outlined'
                color='error'
                onClick={() => {}}
              />
              <ChipStyle
                icon={<DownloadIcon />} 
                fontSize='small' 
                label={'Tải xuống'} 
                variant='outlined'
                color='info'
                onClick={handleDownload}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{ 
          my: 2,
          borderRadius: 3,
          overflow: 'hidden',
          position: 'relative',
          height: expandMore ? 'auto' : 125,
          backgroundColor: '#F2F2F2',
        }}
      >
        <Box 
          component={'div'}
          sx={{ 
            p: 1,
            height: '100%',
            boxSizing: 'border-box'
          }}
        >
          <Table size='small'>
            <TableBody>
              <TableRow>
                <TableCellStyle variant='head'>Ngày đăng</TableCellStyle>
                <TableCellStyle>{ formatDateOrString(video?.createDate) }</TableCellStyle>
              </TableRow>
              <TableRow>
                <TableCellStyle variant='head'>Chuyên ngành</TableCellStyle>
                <TableCellStyle>{ video?.major }</TableCellStyle>
              </TableRow>
              <TableRow>
                <TableCellStyle variant='head'>Giảng viên hướng dẫn</TableCellStyle>
                <TableCellStyle>{ video?.censor }</TableCellStyle>
              </TableRow>
              <TableRow>
                <TableCellStyle variant='head'>Công nghệ được sử dụng</TableCellStyle>
                <TableCellStyle>Java Spring Boot, Thymaleaf, Bootstrap, JPA/Hibernate</TableCellStyle>
              </TableRow>
              <TableRow>
                <TableCellStyle variant='head'>Github</TableCellStyle>
                <TableCellStyle>https://github.com/typicode/json-server</TableCellStyle>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <IconButton 
          sx={{ 
            position: 'absolute',
            bottom: 0,
            right: 0,
            zIndex: 1,
          }}
          onClick={() => setExpandMore(!expandMore)}
        >
          { expandMore ? (<ExpandLessIcon />) : (<ExpandMoreIcon />) }
        </IconButton>
        { !expandMore && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'linear-gradient(0, rgba(255, 255, 255, 1), rgba(223, 223, 223, 0))'
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export default ContentSection

/* const LikeButton = () => {
  const [isLike, setIsLike] = useState(false);

  return (
    <Button
      color={isLike ? 'error' : 'primary'}
      variant={isLike ? 'contained' : 'outlined'}
      startIcon={<ThumbUpIcon />}
      onClick={() => setIsLike(!isLike)}
    >
      Like
    </Button>
  );
}

const AddWishListButton = () => {
  const [isAdd, setIsAdd] = useState(false);

  return (
    <Button
      color={isAdd ? 'error' : 'primary'}
      variant={isAdd ? 'contained' : 'outlined'}
      startIcon={<FavoriteIcon />}
      onClick={() => setIsAdd(!isAdd)}
    >
      Add Wishlist
    </Button>
  );
} */