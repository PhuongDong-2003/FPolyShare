import { AspectRatio, DialogContent, DialogTitle, Modal, ModalClose, ModalDialog } from '@mui/joy';
import { Box, Chip, Grid, Table, TableBody, TableCell, TableRow, Tooltip, Typography, styled } from '@mui/material';
import React, { Fragment, useState } from 'react'
import { useGetProductQuery } from '../../../../services/feature/Product/service';
import { useGetFeedbackQuery } from '../../../../services/feature/Feedback/service';

const TableCellStyle = styled(TableCell)(() => ({
  border: "unset"
}))

const DeniedModal = (props) => {
  const { videoId, ...rest } = props;
  const { data: video = {} } = useGetProductQuery(videoId);
  const { data: feedback = {} } = useGetFeedbackQuery(videoId);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  }

  const handleCloseModal = (event) => {
    event.stopPropagation();
    setIsOpen(false);
  }

  return (
    <Fragment>
      <Chip { ...rest } onClick={handleOpenModal}/> 
      <Modal open={isOpen} onClose={handleCloseModal}>
        <ModalDialog sx={{ width: { xs: '95vw', md: 900 } }}>
          <ModalClose />
          <DialogTitle>Thông tin từ chối</DialogTitle>
          <DialogContent sx={{ overflow: 'hidden' }}>
            <Grid container>
              <Grid item xs={12} md={7.5} p={1}>
                <Table sx={{ overflow: 'auto' }}>
                  <TableBody>
                    <TableRow>
                      <TableCellStyle sx={{ width: '50%' }}>
                        <AspectRatio sx={{ width: '100%' }}>
                          <Box
                            component={"img"}
                            src={video.thumbnailPath}
                            sx={{
                              width: '100%',
                              objectFit: "cover",
                              borderRadius: { xs: 'unset', sm: 2 }
                            }}
                          />
                        </AspectRatio>
                      </TableCellStyle>
                      <TableCellStyle sx={{ width: '50%' }}>
                        <Box 
                          component={'div'} 
                          width={'100%'}
                          sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical'
                          }}
                        >
                          <Tooltip title={video.name}>
                            <Typography 
                              variant="subtitle1" 
                              component={'p'} 
                            >
                              {video.name}
                            </Typography>
                          </Tooltip>
                        </Box>
                      </TableCellStyle>
                    </TableRow>
                    <TableRow>
                      <TableCellStyle align='left'>Trạng thái</TableCellStyle>
                      <TableCellStyle align='center'><Chip { ...rest } /></TableCellStyle>
                    </TableRow>
                    <TableRow>
                      <TableCellStyle align='left'>Chuyên ngành</TableCellStyle>
                      <TableCellStyle align='center'>{feedback.major}</TableCellStyle>
                    </TableRow>
                    <TableRow>
                      <TableCellStyle align='left'>Người kiểm duyệt</TableCellStyle>
                      <TableCellStyle align='center'>{feedback.censor}</TableCellStyle>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} md={4.5} p={1}>
                <Box 
                  component={'div'} 
                  sx={{ 
                    width: '100%',
                    height: { xs: 150, md: 350 }, 
                    borderRadius: 2,
                    backgroundColor: '#F2F2F2',
                    overflow: 'auto'
                  }}
                >
                  <Box 
                    component={'div'}
                    sx={{
                      p: 2,
                      width: '100%',
                      height: '100%',
                      overflow: 'auto',
                      boxSizing: 'border-box'
                    }}
                  >
                    <Typography variant='subtitle1' component={'h4'}>Nội dung từ chối</Typography>
                    <Typography variant='subtitle2' component={'div'} textAlign={'justify'}>{feedback.content}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </DialogContent>
        </ModalDialog>
      </Modal>
    </Fragment>
  )
}

export default DeniedModal;