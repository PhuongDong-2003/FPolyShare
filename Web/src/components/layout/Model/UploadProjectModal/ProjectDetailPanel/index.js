import { AspectRatio } from '@mui/joy'
import { Box, Button, Card, CardMedia, Chip, FormControl, FormHelperText, Grid, IconButton, InputLabel, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { Form, useForm } from 'react-hook-form'
import { HorizontalStepperContext } from '../HorizontalStepper';
import { VisualHiddenInput } from '../UploadVideoPanel';
import CenterFocusWeakRoundedIcon from '@mui/icons-material/CenterFocusWeakRounded';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const FieldStyle = {
  fontStyle: 'italic',
  '& .MuiFormHelperText-root': {
    fontStyle: 'inherit',
  }
}

const techs = [
  'Java', 'C/C++',
  'C# .NET', 'HTML/CSS',
  'Bootstrap', 'AngularJS',
  'Thymeleaf', 'JavaScript',
  'Spring Boot', 'JPA/Hibernate',
  'MySQL', 'MS SQL Server'
]

const ProjectDetailPanel = () => {
  const { 
    ratio, 
    videoFile,
    projectDetail, 
    setProjectDetail,
  } = useContext(HorizontalStepperContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    reValidateMode: 'onChange'
  });

  const handleChangeThumbnail = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProjectDetail({
        ...projectDetail,
        thumbnail: {
          ...projectDetail.thumbnail,
          url: URL.createObjectURL(file),
          data: file
        }
      })
    }
  }

  const handleDeleteSource = () => {
    setProjectDetail({
      ...projectDetail,
      source: {
        name: '',
        url: '',
        data: null,
      }
    })
  }

  return (
    <Box my={2} display={"flex"} flexDirection={"column"} justifyContent={"center"}>
      <AspectRatio ratio={ratio} sx={{ width: "100%" }}>
        <Grid container alignItems={'flex-start !important'} sx={{ overflow :'auto' }}>
          <Grid item xs={12} sm={7} p={2}>
            <Form onSubmit={handleSubmit((data) => console.log(data))} control={control}>
              <Stack direction={'column'} spacing={2.5}>
                {/* Title */}
                <Box>
                  <TextField 
                    fullWidth 
                    id='title'
                    name='title'
                    label='Tiêu đề (*)'
                    value={projectDetail.title}
                    sx={FieldStyle}
                    error={Boolean(errors.title)}
                    { ...register('title', { required: true })}
                    onChange={(event) => setProjectDetail({
                      ...projectDetail, 
                      title: event.target.value
                    })}
                  />
                </Box>

                {/* Chuyên ngành */}
                <Box>
                  <FormControl fullWidth error={Boolean(errors.major)} sx={FieldStyle}>
                    <InputLabel id='major-label'>Chuyên ngành (*)</InputLabel>
                    <Select
                      fullWidth
                      id='major'
                      name='major'
                      label='Chuyên ngành (*)'
                      labelId='major-label'
                      value={projectDetail.major}
                      { ...register('major', { required: true }) }
                      onChange={(event) => setProjectDetail({
                        ...projectDetail, 
                        major: event.target.value
                      })}
                    >
                      <MenuItem value=''>None</MenuItem>
                      <MenuItem value='Thiết kế website'>Thiết kế website</MenuItem>
                      <MenuItem value='Lập trình mobile'>Lập trình mobile</MenuItem>
                      <MenuItem value='Ứng dụng phần mềm'>Ứng dụng phần mềm</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Người kiểm duyệt */}
                <Box>
                  <FormControl fullWidth error={Boolean(errors.censor)} sx={FieldStyle}>
                    <InputLabel id='censor-label'>Người kiểm duyệt (*)</InputLabel>
                    <Select
                      fullWidth
                      id='censor'
                      name='censor'
                      label='Người kiểm duyệt (*)'
                      labelId='censor-label'
                      value={projectDetail.censor}
                      { ...register('censor', { required: true }) }
                      onChange={(event) => setProjectDetail({
                        ...projectDetail, 
                        censor: event.target.value
                      })}
                    >
                      <MenuItem value=''>None</MenuItem>
                      <MenuItem value='Lê Anh Tú'>Lê Anh Tú</MenuItem>
                      <MenuItem value='Thân Hoàng Lộc'>Thân Hoàng Lộc</MenuItem>
                      <MenuItem value='Nguyễn Thanh Phước'>Nguyễn Thanh Phước</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* Công nghệ sử dụng */}
                <Box>
                  <FormControl fullWidth error={Boolean(errors.tech)} sx={FieldStyle}>
                    <InputLabel id='tech-label'>Công nghệ (*)</InputLabel>
                    <Select
                      fullWidth
                      multiple
                      id='tech'
                      name='tech'
                      value={projectDetail.tech}
                      labelId='tech-label'
                      label='Công nghệ (*)'
                      renderValue={(selected) => 
                        selected.map(item => (
                          <Chip 
                            key={item} 
                            label={item} 
                            size='small' 
                            sx={{ marginRight: 1 }}
                          />
                        ))
                      }
                      { ...register('tech', { required: true }) }
                      onChange={(event) => {
                        const techs = event.target.value;
                        setProjectDetail({
                          ...projectDetail, 
                          tech: Boolean(techs[techs.length - 1]) ? techs : projectDetail.tech
                        })
                      }}
                      MenuProps={{
                        style: {
                          height: '300px'
                        }
                      }}
                    >
                      <MenuItem value=''>None</MenuItem>
                      { techs.map((tech => <MenuItem key={tech} value={tech}>{tech}</MenuItem>)) }
                    </Select>
                  </FormControl>           
                </Box>

                {/* Github */}
                <Box>
                  <TextField 
                    fullWidth 
                    id='github'
                    name='github'
                    label='Link Github (Optional)'
                    value={projectDetail.github}
                    sx={FieldStyle}
                    onChange={(event) => setProjectDetail({
                      ...projectDetail, 
                      github: event.target.value
                    })}
                  />
                </Box>

                {/* source */}
                <Box width={"100%"}>
                  <FormControl fullWidth error={!Boolean(projectDetail.source.url)} sx={FieldStyle}>
                    <Button
                      component="label"
                      variant="outlined"
                      startIcon={<FileUploadRoundedIcon />}
                      sx={{ width: 'fit-content' }}
                    >
                      Upload
                      <VisualHiddenInput
                        type='file'
                        name='source'
                        accept='.rar,.zip,.doc,.docx,.txt,.tar'
                        onChange={(event) => {
                          const file = event.target.files[0];
                          if (file) {
                            setProjectDetail({
                              ...projectDetail, 
                              source: {
                                ...projectDetail.source,
                                name: file.name,
                                url: URL.createObjectURL(file),
                                data: file,
                              }
                            });
                          }
                          // Đảm bảo giữa những lần chọn file luôn khác nhau
                          event.target.value = null;
                        }}                        
                      /> 
                    </Button>
                    { Boolean(projectDetail.source.url) && (
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
                            {projectDetail.source.name}
                          </Typography>
                        </Box>
                        <IconButton size='small' onClick={handleDeleteSource}><DeleteForeverRoundedIcon /></IconButton>
                      </Box>
                    )}
                    { !Boolean(projectDetail.source.url) && (<FormHelperText>Source code của dự án được yêu cầu</FormHelperText>)}
                  </FormControl>
                </Box>                
              </Stack>

              {/* <Button type='submit'>Submit</Button> */}
            </Form>
          </Grid>
          <Grid item xs={12} sm={5} p={2}>
            <Box>
              <AspectRatio sx={{ width: '100%' }}>
                <InputLabel sx={{ bgcolor: '#CBD1CC', cursor: 'pointer' }}>
                  { !projectDetail.thumbnail.url && <CenterFocusWeakRoundedIcon fontSize='large'/>}
                  { projectDetail.thumbnail.url && (
                    <Card sx={{ height: '100%', borderRadius: 1 }}>
                      <CardMedia 
                        component='img'
                        image={projectDetail.thumbnail.url}
                        sx={{ height:'100%', objectFit: 'cover' }}
                      />
                    </Card>
                  )}
                  <VisualHiddenInput 
                    type='file'
                    accept='image/*'
                    { ...register('thumbnail', {
                      required: 'Thumbnail được yêu cầu'
                    }) }
                    onChange={handleChangeThumbnail}
                  />                  
                </InputLabel>          
              </AspectRatio>
            </Box>   
            <Box my={1}>
              <Stack direction={'row'} spacing={1}>
                { videoFile.snapshots.map((snapshot, index) => (
                  <Card key={index} sx={{ minHeight: '75px', borderRadius: 1, cursor: 'pointer' }}>
                    <CardMedia
                      component="img"
                      image={snapshot}
                      sx={{ height: '100%', objectFit: 'fill' }}
                      onClick={() => setProjectDetail({
                        ...projectDetail, 
                        thumbnail: {
                          ...projectDetail.thumbnail,
                          url: snapshot,
                          data: snapshot,
                        }
                      })}
                    />
                  </Card>
                ))}
              </Stack>
            </Box>
          </Grid>
        </Grid>
      </AspectRatio>
    </Box>
  )
}

export default ProjectDetailPanel