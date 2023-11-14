import { Box, Card, CardMedia, Stack, Tooltip, Typography, styled } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDateOrString, formatNumber } from "../../../../utils/format";
import { useGetProductsQuery } from "../../../../services/feature/Product/service";
import { ACTIVE_STATUS } from "../../../../utils/consts";

const TypographyStyle = styled(Typography)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RelatedSection = () => {
  const { data: videoRelateds = [] } = useGetProductsQuery(undefined, {
    selectFromResult: ({ data }) => ({ data: data?.filter(product => product.status === ACTIVE_STATUS) })
  });
  const navigate = useNavigate();

  return (
    <Box>
      <Stack
        direction={"column"}
        justifyContent={"flex-start"}
        alignItems={"center"}
        spacing={1}
      >
        {videoRelateds.map((item) => (
          <Card
            key={item.id}
            sx={{
              display: "flex",
              width: "100%",
              height: 100,
              cursor: "pointer",
              borderRadius: 3,
              bgcolor: "unset",
              boxShadow: "unset",
            }}
            onClick={() => navigate(`./../${item.id}`)}
          >
            <Box sx={{ width: 225 }}>
              <CardMedia
                component="img"
                image={item.thumbnailPath}
                sx={{ 
                  width: "100%",
                  height: "100%", 
                  borderRadius: 3, 
                  objectFit: "cover" 
                }}
              />
            </Box>
            <Box
              sx={{
                px: 1,
                py: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}
            >
              <Tooltip title={item.name}>
                <TypographyStyle variant="subtitle2" component="div">
                  {item.name}
                </TypographyStyle>
              </Tooltip>
              <TypographyStyle variant="subtitle2" component="div">
                {item.chanelName}
              </TypographyStyle>
              <TypographyStyle variant="subtitle2" component="div">
                { formatNumber(item.view) + ' lượt xem' } • { formatDateOrString(item.createDate) }
              </TypographyStyle>
            </Box>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default RelatedSection;
