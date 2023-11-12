import { Box, Button, Chip, ClickAwayListener, Collapse, Fab, IconButton, InputBase, Link, Paper, Popper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Toolbar, Tooltip, Typography, styled } from '@mui/material';
import React, { Fragment, useMemo, useState } from 'react'
import { useGetProductsQuery, useUpdateProductMutation } from '../../../services/feature/Product/service';
import { useNavigate } from 'react-router-dom';
import { AspectRatio } from '@mui/joy';
import { formatDateOrString } from '../../../utils/format';
import { toastNotifi } from '../../../utils/toast';
import { PENDING_STATUS } from '../../../utils/consts';
import DownloadIcon from '@mui/icons-material/Download';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
import DoDisturbAltOutlinedIcon from '@mui/icons-material/DoDisturbAltOutlined';
import { v4 } from 'uuid';
import { useCreateFeedbackMutation } from '../../../services/feature/Feedback/service';
import MarkunreadOutlinedIcon from '@mui/icons-material/MarkunreadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

const columnsConfig = [
  {
    id: "product",
    name: "Sản phẩm",
    width: { xs: 86, sm: 100 },
    align: "left",
    display: "table-cell",
    sortAble: false,
    collapseAble: false,
  },
  { 
    id: "name", 
    name: "Tiêu đề", 
    width: { xs: 200, sm: 300 }, 
    align: "left", 
    display: "table-cell",
    sortAble: true,
    collapseAble: false,
  },
  {
    id: "censor",
    name: "Tên sinh viên",
    width: 150,
    align: "left",
    display: { xs: "none", md: "table-cell" },
    sortAble: false,
    collapseAble: true,
  },
  {
    id: "createDate",
    name: "Ngày tạo",
    width: 100,
    align: "left",
    display: { xs: "none", md: "table-cell" },
    sortAble: false,
    collapseAble: true,
  },
  {
    id: "major",
    name: "Chuyên ngành",
    width: 100,
    align: "left",
    display: { xs: "none", md: "table-cell" },
    sortAble: false,
    collapseAble: true,
  },
  {
    id: "approve",
    name: "",
    width: "10px !important",
    align: "center",
    display: "table-cell",
    sortAble: false,
    collapseAble: false,
  },
];

const SearchContainerStyled = styled('div')(({ theme }) => ({
  position: 'relative',
  marginLeft: 0,
  width: 'auto',
}));

const SearchIconStyled = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const InputBaseStyled = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 8),
    transition: theme.transitions.create('width'),
    width: 0,
    '&:focus': {
      width: '30ch',
    }
  },
}));

const EnhancedTableToolbar = ({handleFilter}) => {

  return (
    <Toolbar 
      sx={{ 
        flexWrap: 'nowrap',
        p: { xs: '0 !important', md: '2 !important' },
      }}
    >
      <Typography
        flexGrow={1}
        color='inherit'
        variant='h5'
        component='div'
      >
        Dự án chờ duyệt
      </Typography>

      <SearchContainerStyled>
        <SearchIconStyled>
          <Fab color='default' size='small'>
            <SearchOutlinedIcon />
          </Fab>
        </SearchIconStyled>
        <InputBaseStyled placeholder="Tìm kiếm..." onChange={handleFilter}/>
      </SearchContainerStyled>
    </Toolbar>
  );
};

const EnhancedTableHead = (props) => {
  return (
    <TableHead>
      <TableRow>
        {columnsConfig.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{ width: column.width, display: column.display }}
          >
            {column.name}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTableBody = (props) => {
  const { videos } = props;

  return (
    <TableBody>
      { videos.map(video => <EnhancedTableRowBody key={video.id} video={video}/>) }
    </TableBody>    
  );
}

const EnhancedTableRowBody = ({video}) => {
  const navigate = useNavigate();
  const [ updateProduct ] = useUpdateProductMutation();
  const [ createFeeback ] = useCreateFeedbackMutation();
  const [isCollapse, setIsCollapse] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpenAnchor = Boolean(anchorEl);

  const [messageDenied, setMessageDenied] = useState(null);

  const handleClickVideo = (event) => {
    event.stopPropagation();
    navigate(`../../videos/${video.id}`)
  }

  const handleUpdateToSuccess = async (event) => {
    event.stopPropagation();
    const newProduct = { ...video, status: "ACTIVE" }
    updateProduct(newProduct)
    .then(() => toastNotifi("Dự án kiểm duyệt thành công"))
    .catch(error => alert(error));
  }

  const handleUpdateToDenied = async () => {
    const newProduct = { 
      ...video,
      status: "DENIED" 
    }

    const newFeedback = {
      id: `${v4()}`,
      censor: video.censor,
      major: video.major,
      content: messageDenied,
      product_id: video.id
    }
    
    Promise.all([ updateProduct(newProduct), createFeeback(newFeedback) ])
    .then(() => toastNotifi("Đã từ chối dự án"))
    .catch(error => alert(error))
  }

  const handleDownload = () => {
    const sourceRef = ref(storage, video.sourcePath);

    getDownloadURL(sourceRef)
    .then(url => {
      const link = document.createElement('a');
      link.href = url;
      link.click();
    })
    .catch(error => alert(error))
  }

  return (
    <Fragment>
      {/* Main */}
      <TableRow 
        hover
        key={video.id}
        sx={{ cursor: "pointer" }}
        onClick={() => setIsCollapse(!isCollapse)}
      >
        <TableCell>
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
        </TableCell>

        <TableCell>
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
                component={'span'} 
                onClick={handleClickVideo}
              >
                {video.name}
              </Typography>
            </Tooltip>
          </Box>
        </TableCell>

        <TableCell
          align="left"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          { video.student }
        </TableCell>

        <TableCell
          align="left"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          { formatDateOrString(video.createDate) }
        </TableCell>

        <TableCell
          align="left"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          { formatDateOrString(video.major) }
        </TableCell>

        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          <Button 
            variant='contained' 
            color='warning' 
            size='small'
            onClick={handleUpdateToSuccess}
          >
            Duyệt
          </Button>
        </TableCell>
      </TableRow>

      {/* Collapse */}
      <TableRow>
        <TableCell colSpan={columnsConfig.length + 999} sx={{ p: 0, border: 0 }}>
          <Collapse in={isCollapse} timeout={'auto'} unmountOnExit>
            <Paper 
              elevation={0} 
              square={true} 
              sx={{ mb: 2, overflow: 'hidden' }}
            >
              <Table size="medium">
                <TableBody>
                  <TableRow>
                    <TableCell variant='head' width={"50%"}>Người kiểm duyệt</TableCell>
                    <TableCell width={"50%"}>{ video.censor }</TableCell>
                  </TableRow>
                  <TableRow sx={{ display: { md: "none" } }}>
                    <TableCell variant='head'>Ngày tạo</TableCell>
                    <TableCell>{ formatDateOrString(video.createDate) }</TableCell>
                  </TableRow>
                  <TableRow sx={{ display: { md: "none" } }}>
                    <TableCell variant='head'>Chuyên ngành</TableCell>
                    <TableCell>{ video.major }</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Công nghệ sử dụng</TableCell>
                    <TableCell sx={{ overflow: "hidden", textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <Stack direction={'row'} spacing={1}>
                        { video.techs.map(tech => <Chip key={tech.id} label={tech.name}/>) }
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Source code</TableCell>
                    <TableCell>
                      <Button
                        variant='contained'
                        color='info'
                        size='small'
                        startIcon={<DownloadIcon />}
                        onClick={handleDownload}
                      >
                        Source
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Github</TableCell>
                    <TableCell>
                      { video.github 
                        ? ( <Link href={video.github} target="_blank" rel="noopener" underline='none'>{video.github}</Link> ) 
                        : "Không có" 
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell variant='head'>Từ chối</TableCell>
                    <TableCell>
                      <Button 
                        variant='contained' 
                        color='error' 
                        size='small'
                        startIcon={ <DoDisturbAltOutlinedIcon /> }
                        onClick={() => handleUpdateToDenied(video)}
                        disabled={!Boolean(messageDenied)}
                      >
                        Từ chối
                      </Button>
                      <IconButton size='small' onClick={(event) => setAnchorEl(event.target)}>
                        <MarkunreadOutlinedIcon fontSize='small'/>
                      </IconButton>
                      <Popper
                        open={isOpenAnchor}
                        anchorEl={anchorEl}
                        placement='right-end'
                        sx={{ zIndex: 9999 }}
                      >
                        <Paper elevation={3} sx={{ overflow: 'hidden' }}>
                          <ClickAwayListener onClickAway={() => setAnchorEl(false)}>
                            <Box
                              component={'div'}
                              sx={{
                                width: 300,
                                overflow: "auto"
                              }}
                            >
                              <TextField
                                id="outlined-multiline-static"
                                autoFocus
                                multiline
                                rows={8}
                                placeholder="Lý do từ chối?"
                                value={messageDenied}
                                sx={{ width: '100%', textAlign:'justify', p: 2, boxSizing: 'border-box' }}
                                onChange={(event) => setMessageDenied(event.target.value)}
                              />
                            </Box>
                          </ClickAwayListener>
                        </Paper>
                      </Popper>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const LatestRequest = () => {
  const [searchText, setSearchText] = useState("");

  const { data: videos = [] } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({ 
      data: data?.filter(product => (
        product.status === PENDING_STATUS && (
          product.name.includes(searchText) ||
          product.student.includes(searchText) ||
          product.major.includes(searchText)
        )
      )) 
    })
  });

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const visibleVideos = useMemo(() => (
    videos
    .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
  ), [videos, currentPage, rowsPerPage]);

  const handleFilter = (event) => setSearchText(event.target.value);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }} elevation={0} square={true}>
        <EnhancedTableToolbar handleFilter={handleFilter}/>
        <TableContainer>
          <Table size="small" sx={{ overflow: 'auto' }}>
            <EnhancedTableHead />
            <EnhancedTableBody videos={visibleVideos}/>
          </Table>
        </TableContainer>
        <TablePagination 
          count={visibleVideos.length}
          page={currentPage}
          component={'div'}
          rowsPerPage={10}
          rowsPerPageOptions={[10, 20, 35, 50]}
          onPageChange={(_, page) => setCurrentPage(page)}
          onRowsPerPageChange={(event) => setRowsPerPage(Number(event.target.value))}
          labelRowsPerPage={'Số hàng trên mỗi trang'}
          labelDisplayedRows={({from, to, count}) => `Đang xem từ ${from} đến ${to} trong ${count}`}
        />
      </Paper>
    </Box>  
  )
}

export default LatestRequest;