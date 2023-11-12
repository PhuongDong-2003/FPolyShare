import { IconButton } from "@mui/material";
import React, { Fragment, createContext, useState } from "react";
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined';
import UploadProjectModal from "../../../Model/UploadProjectModal";

export const UploadProjectModalContext = createContext(null);

const UploadVideo = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => setIsOpenModal(true);
  const handleCloseModal = () => setIsOpenModal(false);

  return (
    <Fragment>
      <IconButton size="medium" onClick={handleOpenModal}>
        <VideoCallOutlinedIcon fontSize="medium" />
      </IconButton>
      <UploadProjectModalContext.Provider value={{isOpenModal, handleCloseModal}}>
        <UploadProjectModal />
      </UploadProjectModalContext.Provider>
    </Fragment>
  );
};

export default UploadVideo;
