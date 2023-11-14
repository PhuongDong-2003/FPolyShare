import { Modal, ModalClose, ModalDialog } from "@mui/joy";
import { styled } from "@mui/material";
import React, { useContext } from "react";
import HorizontalStepper from "./HorizontalStepper";
import { UploadProjectModalContext } from "../../Header/PersonalSection/UploadVideo";

const ModalStyle = styled(Modal)(() => ({
  backdropFilter: "blur(0)"
}))

const UploadProjectModal = () => {
  const { isOpenModal, handleCloseModal } = useContext(UploadProjectModalContext)

  return (
    <ModalStyle open={isOpenModal} onClose={handleCloseModal}>
      <ModalDialog sx={{ minWidth: {xs: '95vw', md:  '60%'}, height: '100%' }}>
        <ModalClose />
        <HorizontalStepper />
      </ModalDialog>
    </ModalStyle>
  );
};

export default UploadProjectModal;
