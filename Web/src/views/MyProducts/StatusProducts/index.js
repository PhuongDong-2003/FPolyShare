import { Box, Checkbox, Chip, Collapse, FormControl, IconButton, ListItemText, MenuItem, Paper, Select, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Toolbar, Tooltip, Typography } from '@mui/material';
import React, { Fragment, useMemo, useState } from 'react'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { AspectRatio } from '@mui/joy';
import { formatDateOrString } from '../../../utils/format';
import DeniedModal from '../../../components/layout/Model/DeniedModal';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../../../services/feature/Product/service';

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
    name: "Người kiểm duyệt",
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
    id: "status",
    name: "Trạng thái",
    width: 80,
    align: "center",
    display: { xs: "none", md: "table-cell" },
    sortAble: false,
    collapseAble: true,
  },
];

const EnhancedTableToolbar = (props) => {
  const { filterStatus, handleChangeStatus } = props;

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
        Video có trạng thái
      </Typography>
      <Box sx={{ width: { xs: '100%', md: 375 } }}>
        <FormControl sx={{ m: 1, width: '100%', mx: 0 }}>
          <Select
            fullWidth
            multiple
            size='small'
            value={filterStatus}
            onChange={handleChangeStatus}
            renderValue={(selected) => (
              <Stack direction={'row'} spacing={1}>
                { selected.map(status => (
                  <Chip
                    key={ status }
                    label={ mapStatus.get(status).label }
                    sx={{ backgroundColor: mapStatus.get(status).color, minWidth: 100 }}
                  />
                ))}
              </Stack>
            )}
          >
            { Array
              .from(mapStatus.keys())
              .map(key => (
                <MenuItem key={ key } value={ key } >
                  <Checkbox checked={ filterStatus.indexOf(key) > -1 } />
                  <ListItemText primary={ mapStatus.get(key).label } />
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </Box>
    </Toolbar>
  );
};

const EnhancedTableHead = (props) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell 
          padding="none" 
          align="center" 
          sx={{ display: { xs: "table-cell", md: "none" } }} 
        />

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
  const [isCollapse, setIsCollapse] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = (event) => {
    event.stopPropagation();
    setIsCollapse(!isCollapse);
  }

  const handleClickVideo = (event) => {
    event.stopPropagation();
    navigate(`../../videos/${video.id}`)
  }

  return (
    <Fragment>
      {/* Main */}
      <TableRow 
        hover
        key={video.id}
        sx={{ cursor: "pointer" }}
      >
        <TableCell 
          sx={{ 
            p: .5,
            width: '1px !important',
            display: { xs: 'table-cell', md: 'none' }, 
          }}
        >
          <IconButton
            size="small"
            onClick={handleClickOpen}
          >
            {isCollapse ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

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
          { video.censor }
        </TableCell>

        <TableCell
          align="left"
          sx={{ display: { xs: "none", md: "table-cell" } }}
        >
          { formatDateOrString(video.createDate) }
        </TableCell>

        <TableCell
          align="center"
          sx={{ display: { xs: "none", md: "table-cell" } }}
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
      <TableRow sx={{ display: { md: "none" } }}>
        <TableCell colSpan={columnsConfig.length + 1} sx={{ p: 0, border: 0 }}>
          <Collapse in={isCollapse} timeout={'auto'} unmountOnExit>
            <Table size="medium">
              <TableBody>
                <TableRow>
                  <TableCell variant='head'>Người kiểm duyệt</TableCell>
                  <TableCell>{ video.censor }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='head'>Ngày tạo</TableCell>
                  <TableCell>{ formatDateOrString(video.createDate) }</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='head'>Trạng thái</TableCell>
                  <TableCell>
                    <Chip 
                      label={ mapStatus.get(video.status).label } 
                      sx={{ backgroundColor: mapStatus.get(video.status).color, minWidth: 100 }}
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </Fragment>
  );
}

const StatusProducts = () => {
  const [filterStatus, setFilterStatus] = useState(['ALL']);
  const { data: videos = [] } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.filter((video) =>
        filterStatus.some((status) => status === video.status || status === "ALL")
      ),
    }),
  });
  
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangeStatus = (event) => {
    const status = event.target.value;
    if (status.length) {
      if (status[status.length - 1] === 'ALL') {
        setFilterStatus(['ALL']);
      } else {
        const newStatus = [];
        for (const stt of status) {
          if (stt !== 'ALL') newStatus.push(stt);
        }
        setFilterStatus(newStatus);
      }
    } else {
      setFilterStatus(['ALL']);
    }
  }

  const visibleVideos = useMemo(() => (
    videos
    // .filter(video => filterStatus.some(status => status === video.status || status === 'ALL'))
    .slice(currentPage * rowsPerPage, currentPage * rowsPerPage + rowsPerPage)
  ), [videos, currentPage, rowsPerPage]);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%' }} elevation={0} square={true}>
        <EnhancedTableToolbar filterStatus={filterStatus} handleChangeStatus={handleChangeStatus}/>
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

export default StatusProducts