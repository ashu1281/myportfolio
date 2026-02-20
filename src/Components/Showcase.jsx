import { Box, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import CalendarBeforeImg from '../Images/pojectImages/showCaseImages/calendar-before.png';
import ResourceAllocationAfter from '../Images/pojectImages/showCaseImages/resource-calendar-amchart-after.png';
import ResourceAllocationBefore from '../Images/pojectImages/showCaseImages/resource-calendar-amchart.png';
import { container } from './About';
import ResourceAllocationCalendar from './showcaseComponents/amchartgraphs/allocationCalendar/ResourceAllocationCalendar';
import ShowcaseCalendar from './showcaseComponents/calendarfilter/ShowcaseCalendar';
import LinkPreviewContainer from './showcaseComponents/linkpreviewUI/LinkPreviewContainer';
import PageTitle from './ui/PageTitle';

const showcaseData = [
  {
    id: 1,
    title: 'Custom Calendar',
    description: 'An advanced calendar filter built on top of MUI date pickers, enhanced with multi-range selection (day/week/month/year), custom week highlighting, controlled navigation, and clean state management. Optimized for dashboard applications requiring accurate date ranges, reset/apply actions, and consistent UX across large datasets.',
    before: CalendarBeforeImg,
    beforeSize: {
      width: '350px',
    },
    after: <ShowcaseCalendar />,
  },
  {
    id: 2,
    title: 'Resource Allocation Calendar',
    description:
      'A calendar-based heatmap chart built using amCharts to visualize daily resource utilization across weeks. Each cell represents a day with color-coded utilization levels, interactive tooltips, and click-based drill-down support. Designed for production planning and capacity monitoring dashboards where quick identification of underutilized or overloaded days is critical.',
    before: ResourceAllocationBefore,
    beforeImgSize: {
      width: '100%',
    },
    after: <ResourceAllocationCalendar />,
  },
  {
    id: 3,
    title: 'All Workcenters Resource Allocation Calendar',
    description:
      'A comprehensive, month-level resource allocation dashboard displaying utilization across all workcenters in a single consolidated calendar view. Each row represents a workcenter and each column represents a day, with color-coded cells indicating utilization thresholds, weekends, and holidays. Includes legends, month navigation, horizontal scrolling for dense datasets, and inline value indicators, enabling planners to quickly compare capacity usage, identify bottlenecks, and monitor overall operational load across multiple workcenters.',
    before: ResourceAllocationBefore,
    beforeImgSize: {
      width: '100%',
    },
    after: ResourceAllocationAfter,
  },
  {
    id: 4,
    title: 'Secure Link Preview Component',
    description:
      'A secure and reusable link preview component that displays metadata such as title, description, image, and hostname with skeleton loading and graceful fallbacks. Fully supports light and dark themes, handles restricted or broken links safely, and ensures consistent, reliable previews for enterprise dashboards and collaboration platforms.',
    before: null, // or add a static placeholder image if you want
    after: <LinkPreviewContainer url="https://www.ashishgaikwad.in/" showPreviewNotAvlUI />,
  }

];

const Showcase = () => {
  return (
    <Container sx={{ my: { xs: '12%', lg: '70px' } }}>
      {/* HEADER */}
      <PageTitle
        bgText="SHOWCASE"
        title="Component"
        highlight="Showcase"
      />


      <Grid container variants={container} component={motion.ul} gap={{ xs: 4, lg: 6 }} initial="hidden"
        animate="visible"
        sx={{ listStyle: 'none', pl:{xs:2, md:0}}}>
        {showcaseData.map((item) => (
          <Grid
            item
            key={item.id}
            variants={item}
            component={motion.li}
            container
            spacing={{ xs: 2, lg: 3 }}
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark'
                  ? '#151725'
                  : '#f5f7fa',
              borderRadius: 2,
              p: { xs: 2, lg: 3 },
            }}
          >
            {/* TITLE */}
            <Grid item xs={12}>
              <Typography
                variant="h6"
                sx={{ color: 'var(--mainPraimary)' }}
              >
                {item.title}
              </Typography>
              <Typography color="text.secondary" mt={0.5}>
                {item.description}
              </Typography>
            </Grid>

            {/* BEFORE */}
            {item?.before && <Grid item xs={12} md={6}>
              <Typography fontSize={14} mb={1} color="text.primary">
                Before
              </Typography>
              <Box
                sx={{
                  width: item?.beforeImgSize?.width ?? '100%',
                  overflow: 'hidden',
                  borderRadius: 2,
                }}
              >
                <Box
                  component="img"
                  src={item.before}
                  sx={{
                    width: item?.beforeSize?.width ?? 'auto',
                    maxWidth: "100%",
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              </Box>
            </Grid>}

            {/* AFTER */}
            <Grid item xs={12} md={item?.before ? 6 : 12}>
              <Typography fontSize={14} mb={1} color="text.primary">
                {item?.before ? "After" : ""}
              </Typography>
              {typeof item.after === 'string' ? (
                <Box
                  component="img"
                  src={item.after}
                  sx={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                  }}
                />
              ) : (
                item.after
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};


export default Showcase;
