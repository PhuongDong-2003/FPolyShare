import { Box, Button, Chip, Collapse, Link, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { Fragment, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery, useUpdateProductMutation } from '../../../services/feature/Product/service';
import { useCreateFeedbackMutation } from '../../../services/feature/Feedback/service';
import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
import DownloadIcon from '@mui/icons-material/Download';
import { AspectRatio } from '@mui/joy';
import { formatDateOrString } from '../../../utils/format';
import { PENDING_STATUS } from '../../../utils/consts';
import DeniedModal from '../../../components/layout/Model/DeniedModal';

const mapStatus = new Map(Object.entries({
  "ACTIVE": { label: "Đã duyệt", color: "#4ECE48", },
  "PENDING": { label: "Chờ duyệt", color: "#D6DD47", },
  "DENIED": { label: "Từ chối", color: "#E76247", },
  "ALL": { label: "Tất cả", color: "#CFCFCF", },
}))

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
    id: "status",
    name: "Trạng thái",
    width: 100,
    align: "center",
    display: "table-cell",
    sortAble: false,
    collapseAble: false,
  },
];

const EnhancedTableToolbar = () => {
  return (
    <Toolbar 
      sx={{ 
        flexWrap: 'wrap',
        p: { xs: '0 !important', md: '2 !important' },
      }}
    >
      <Typography
        flexGrow={1}
        color='inherit'
        variant='h5'
        component='div'
      >
        Dự án đã duyệt
      </Typography>
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

  // const [messageDenied, setMessageDenied] = useState(null);

  const handleClickVideo = (event) => {
    event.stopPropagation();
    navigate(`../../videos/${video.id}`)
  }
  
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
          // sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          {
            video.status === "DENIED" ? (
              <DeniedModal
                label={mapStatus.get(video.status).label}
                sx={{ backgroundColor: mapStatus.get(video.status).color, minWidth: 100 }}
                videoId={video.id}
              />
            ) : (
              <Chip
                label={mapStatus.get(video.status).label}
                sx={{ backgroundColor: mapStatus.get(video.status).color, minWidth: 100 }}
              />
            )            
          }
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
                </TableBody>
              </Table>
            </Paper>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const ProcessedRequest = () => {
  const { data: videos = [] } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({ data: data?.filter(product => product.status !== PENDING_STATUS) })
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const visibleVideos = useMemo(() => (
    videos
    .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
  ), [videos, currentPage, rowsPerPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }} elevation={0} square={true}>
        <EnhancedTableToolbar />
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

export default ProcessedRequest;