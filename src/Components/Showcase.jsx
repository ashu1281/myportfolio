import { Box, Card, Container, Grid, Typography, Stack } from '@mui/material';
import ShowcaseCalendar from './showcaseComponents/calendarfilter/ShowcaseCalendar';
import CalendarBeforeImg from '../Images/pojectImages/showCaseImages/calendar-before.png';
import ResourceAllocationBefore from '../Images/pojectImages/showCaseImages/resource-calendar-amchart.png';
import ResourceAllocationCalendar from './showcaseComponents/amchartgraphs/allocationCalendar/ResourceAllocationCalendar';
import { Height } from '@mui/icons-material';

const showcaseData = [
  {
    id: 1,
    title: 'Custom Calendar',
    description: 'An advanced calendar filter built on top of MUI date pickers, enhanced with multi-range selection (day/week/month/year), custom week highlighting, controlled navigation, and clean state management. Optimized for dashboard applications requiring accurate date ranges, reset/apply actions, and consistent UX across large datasets.',
    before: CalendarBeforeImg,
    after: <ShowcaseCalendar />,
  },
   {
    id: 2,
    title: 'Resource Allocation Calendar',
    description:
      'A calendar-based heatmap chart built using amCharts to visualize daily resource utilization across weeks. Each cell represents a day with color-coded utilization levels, interactive tooltips, and click-based drill-down support. Designed for production planning and capacity monitoring dashboards where quick identification of underutilized or overloaded days is critical.',
    before: ResourceAllocationBefore,
    beforeImgSize:{
      width: '100%',
    },
    after: <ResourceAllocationCalendar />,
  },
];

const Showcase = () => {
  return (
    <Container>
      {/* HEADER */}
      <Typography
        fontSize={{ xs: 28, lg: 48 }}
        fontWeight={800}
        mb={6}
        textAlign="center"
      >
        Component <span style={{ color: 'var(--mainPraimary)' }}>Showcase</span>
      </Typography>

      <Stack gap={4}>
        {showcaseData.map((item) => (
            <Grid
             key={item.id}
              container
              spacing={3}
              sx={{
                backgroundColor: '#151725',
                borderRadius: 2,
                p: 3,
              }}
            >
              {/* TITLE */}
              <Grid item xs={12}>
                <Typography variant="h6" color="white" sx={{color: 'var(--mainPraimary)' }}>
                  {item.title}
                </Typography>
                <Typography color="text.secondary" mt={0.5}>
                  {item.description}
                </Typography>
              </Grid>

              {/* BEFORE */}
              <Grid item xs={6}>
                <Typography fontSize={14} mb={1} color="text.primary">
                  Before
                </Typography>
                <Box
                  component="img"
                  src={item.before}
                  sx={{
                    width: item?.beforeImgSize?.width ?? 'auto',
                    height: 'auto',
                    borderRadius: 2,
                    objectFit: 'contain',
                  }}
                />
              </Grid>

              {/* AFTER */}
              <Grid item xs={6}>
                <Typography fontSize={14} mb={1} color="text.primary">
                  After
                </Typography>

                  {typeof item.after === 'string' ? (
                    <Box
                      component="img"
                      src={item.after}
                      sx={{
                        width: 'auto',
                        height: 'auto',
                        borderRadius: 2,
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    item.after
                  )}
              </Grid>
            </Grid>
        ))}
      </Stack>
    </Container>
  );
};

export default Showcase;
