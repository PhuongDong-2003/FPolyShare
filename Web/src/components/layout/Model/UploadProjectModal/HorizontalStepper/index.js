import { Box } from "@mui/joy";
import { Button, Stack, Step, StepLabel, Stepper } from "@mui/material";
import { createContext, useContext, useState } from "react";
import UploadVideoPanel from "../UploadVideoPanel";
import ProductDetailPanel from "../ProjectDetailPanel";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ProjectWaitingPanel from "../ProjectWaitingPanel";
import { UploadProjectModalContext } from "../../../Header/PersonalSection/UploadVideo";

const steps = ["Tải video", "Chi tiết", "Đợi kiểm duyệt"];

const initVideo = {
  url: '',
  data: null,
  snapshots: [],
}

const initStatePojectDetail = {
  title: '',
  major: '',
  censor: '',
  tech: [],
  github: '',
  source: {
    name: '',
    url: '',
    data: null,
  },
  thumbnail: {
    url: '',
    data: null
  }
}

export const HorizontalStepperContext = createContext(null);

const HorizontalStepper = () => {
  const { handleCloseModal } = useContext(UploadProjectModalContext);

  // Stepper
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});

  const totalSteps = () => steps.length;

  const completedSteps = () => Object.keys(completed).length;

  const isLastStep = () => activeStep === totalSteps() - 1;

  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((_, index) => !(index in completed))
        : ( !isLastStep() ? activeStep + 1 : activeStep);
    setActiveStep(newActiveStep);
  };

  const handlePrev = () => setActiveStep(Boolean(activeStep) ? activeStep - 1 : activeStep);

  const handleStep = (step) => () => setActiveStep(step);

  const handleCompleteStep = () => {
    completed[activeStep] = true;
    setCompleted({ ...completed });
    handleNext();
  };

  // Project
  const [ videoFile, setVideoFile ] = useState(initVideo);
  const [ projectDetail, setProjectDetail ] = useState(initStatePojectDetail);

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return (
          <UploadVideoPanel />
        );
      case 1:
        return (
          <ProductDetailPanel />
        );
      case 2:
        return (
          <ProjectWaitingPanel />
        )
      default: break;
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper activeStep={activeStep} nonLinear alternativeLabel>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepLabel onClick={handleStep(index)} sx={{ cursor: "pointer" }}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {/* Content of step */}
      <HorizontalStepperContext.Provider value={{
        ratio: '32 / 19',
        videoFile,
        setVideoFile,
        projectDetail,
        setProjectDetail,
      }}>
        {renderSwitch(activeStep)}
      </HorizontalStepperContext.Provider>

      <Stack direction={"row"} spacing={2}>
        <Button variant="outlined" size="small" onClick={handlePrev} startIcon={<ArrowBackIosNewOutlinedIcon />}>Quay lại</Button>
        <Button variant="outlined" size="small" onClick={handleNext} endIcon={<ArrowForwardIosOutlinedIcon />}>Tiếp theo</Button>
        <Box sx={{ flexGrow: 1 }} />
        { !isLastStep() && <Button variant="outlined" size="small" onClick={handleCompleteStep}>Hoàn thành bước {activeStep + 1}</Button> }  
        { isLastStep() && <Button variant="outlined" size="small" onClick={handleCloseModal}>Kết thúc</Button> } 
      </Stack>
    </Box>
  );
};

export default HorizontalStepper;
