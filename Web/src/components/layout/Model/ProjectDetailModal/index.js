import { AspectRatio, DialogTitle, Modal, ModalClose, ModalDialog, Stack } from '@mui/joy'
import { Box, Button, Chip, DialogContent, Grid, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableRow, TextField, Typography, styled, useMediaQuery, useTheme } from '@mui/material';
import React, { Fragment, useEffect, useRef, useState } from 'react'
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useGetTechsQuery } from '../../../../services/feature/Tech/service';

/* const techs = [
  'Java', 'C/C++',
  'C# .NET', 'HTML/CSS',
  'Bootstrap', 'AngularJS',
  'Thymeleaf', 'JavaScript',
  'Spring Boot', 'JPA/Hibernate'
] */

const CellHeaderStyle = styled(TableCell)(() => ({
  verticalAlign: 'top',
  textAlign: 'left',
  minWidth: 200,
  border: 'unset',
  fontSize: '1rem'
}))

const CellBodyStyle = styled(TableCell)(() => ({
  verticalAlign: 'top',
  textAlign: 'left',
  width: '100%',
  border: 'unset'
}))

const VisualHiddenInput = styled("input")(() => ({
  clipPath: 'inset(50%)',
  position: 'absolute',
  bottom: 0,
  left: 0,
}))

const ProjectDetailModal = ({project, handleUpdate, handleClose}) => {
  const theme = useTheme();
  const matchDown = useMediaQuery(theme.breakpoints.down('md'));

  const { data: techs = [] } = useGetTechsQuery();

  const [updateProduct, setUpdateProduct] = useState(project);
  const sourceRef = useRef(null);

  useEffect(() => {
    if (techs.length !== 0) {
      const newReference = project.techs.map(tech => {
        if (techs.some(item => {
          if (item.id === tech.id) {
            tech = item;
            return true;
          }
          return false;
        })) return tech;
      });
      setUpdateProduct({
        ...updateProduct,
        techs: newReference,
      })
    }
  }, [techs])

  return (
    <Fragment>
      <Modal open={true} onClose={handleClose}>
        <ModalDialog layout='fullscreen'>
          <ModalClose />
          <DialogTitle sx={{ justifyContent: 'center', p: 2, textTransform: 'uppercase' }}>Chi tiết dự án</DialogTitle>
          <DialogContent sx={{ px: { xs: 2, md: 4 } }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Stack direction={'column'} spacing={1}>
                  <Typography variant='h6' component={'p'}>Video demo</Typography>
                  <AspectRatio sx={{ width: '100%' }}>
                    <Box
                      component={'video'}
                      src='https://firebasestorage.googleapis.com/v0/b/fvideos-3163f.appspot.com/o/videosDemo%2F369da955-ce3b-4d9c-bc41-441d89770b60?alt=media&token=c3de5339-917e-4276-9d0d-a46637960e97'
                      controls
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'fill',
                        borderRadius: { xs: 'unset', sm: 2 },
                      }}
                    />
                  </AspectRatio>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <CellHeaderStyle variant='head'>Tiêu đề</CellHeaderStyle>
                      <CellBodyStyle>
                        <TextField 
                          fullWidth
                          size='small'
                          variant='standard'
                          value={updateProduct.name}
                          onChange={(event) => setUpdateProduct({
                            ...updateProduct,
                            name: event.target.value,
                          })}
                        />
                      </CellBodyStyle>
                    </TableRow>
                    <TableRow>
                      <CellHeaderStyle variant='head'>Chuyên ngành</CellHeaderStyle>
                      <CellBodyStyle>
                        <TextField 
                          fullWidth
                          size='small'
                          variant='standard'
                          disabled
                          value={updateProduct.major}
                        />
                      </CellBodyStyle>
                    </TableRow>
                    <TableRow>
                      <CellHeaderStyle variant='head'>Người kiểm duyệt</CellHeaderStyle>
                      <CellBodyStyle>
                        <TextField 
                          fullWidth
                          size='small'
                          variant='standard'
                          disabled
                          value={updateProduct.censor}
                        />
                      </CellBodyStyle>
                    </TableRow>
                    <TableRow>
                      <CellHeaderStyle variant='head'>Công nghệ sử dụng</CellHeaderStyle>
                      <CellBodyStyle>
                        <Select
                          fullWidth
                          multiple
                          value={updateProduct.techs}
                          size='small'
                          renderValue={(selected) => (
                            <Box display={'flex'} flexWrap={'wrap'} gap={1}>
                              { selected.map(tech => <Chip size='small' key={tech.id} label={tech.name}/>) }
                            </Box>
                          )}
                          MenuProps={{ style: { maxHeight: 300 } }}
                          onChange={(event) => setUpdateProduct({
                            ...updateProduct,
                            techs: event.target.value
                          })}
                        >
                          { techs.map((tech => <MenuItem key={tech.id} value={tech}>{tech.name}</MenuItem>)) }
                        </Select>
                      </CellBodyStyle>
                    </TableRow>
                    <TableRow>
                      <CellHeaderStyle variant='head'>Source</CellHeaderStyle>
                      <CellBodyStyle>
                        <Button
                          component="label"
                          variant="outlined"
                          color='secondary'
                          startIcon={<FileUploadRoundedIcon />}
                          sx={{ width: 'fit-content' }}
                          onChange={(event) => sourceRef.current = event.target.files[0]}
                        >
                          Upload
                          <VisualHiddenInput
                            type='file'
                            name='source'
                            accept='.rar,.zip,.doc,.docx,.txt,.tar'                 
                          /> 
                        </Button> 
                        { sourceRef.current !== null && (
                          <Box display="flex" sx={{ border: '1px dashed black', borderRadius: 1, my: 1 }}>
                            <Box
                              display="flex"
                              alignItems="center"
                              flexGrow={1}
                              sx={{ overflow: "hidden", ml: 1, p: 1 }}
                            >
                              <Typography 
                                variant={"subtitle2"} 
                                component="div"
                                sx={{ 
                                  whiteSpace: "nowrap",
                                  overflow: "hidden",
                                  textOverflow: "ellipsis" 
                                }}
                              >
                                {sourceRef.current.name}
                              </Typography>
                            </Box>
                            <IconButton size='small'><DeleteForeverRoundedIcon /></IconButton>
                          </Box>
                        ) }
                      </CellBodyStyle>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} md={2}>
                <Stack
                  direction={matchDown ? 'row' : 'column'}
                  spacing={2}
                >
                  <Button
                    fullWidth 
                    variant='contained' 
                    onClick={handleUpdate(updateProduct)} 
                    startIcon={<SaveOutlinedIcon fontSize='large'/>}
                    color='success'
                  >
                    Lưu
                  </Button>

                  <Button
                    fullWidth 
                    variant='contained' 
                    startIcon={<DeleteOutlineOutlinedIcon fontSize='large'/>}
                    color='error'
                  >
                    Xóa
                  </Button>                                  
                </Stack>
              </Grid>
            </Grid>
          </DialogContent>
        </ModalDialog>
      </Modal>  
    </Fragment>
  )
}

export default ProjectDetailModal