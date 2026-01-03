import {
	CalendarMonthOutlined,
	ChevronLeft,
	ChevronRight,
} from '@mui/icons-material';
import { Box, Button, IconButton, Popover, Typography } from '@mui/material';
import { DateView } from '@mui/x-date-pickers';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import { useEffect, useMemo, useRef, useState } from 'react';

export interface DateParams {
	start: string;
	end: string;
	type: ManipulateType;
}
const convertToDayjs = (params: DateParams): Dayjs => {
	switch (params.type) {
		case 'day':
		case 'week':
		case 'month':
		case 'year':
			return dayjs(params.start, 'YYYY-MM-DD');

		default:
			return dayjs();
	}
};


const getDateParams = (date: Dayjs, type: ManipulateType): DateParams => {
	switch (type) {
		case 'day':
			return {
				start: date.startOf('day').format('YYYY-MM-DD'),
				end: date.endOf('day').format('YYYY-MM-DD'),
				type,
			};

		case 'week':
			return {
				start: date.startOf('week').format('YYYY-MM-DD'),
				end: date.endOf('week').format('YYYY-MM-DD'),
				type,
			};

		case 'month':
			return {
				start: date.startOf('month').format('YYYY-MM-DD'),
				end: date.endOf('month').format('YYYY-MM-DD'),
				type,
			};

		case 'year':
			return {
				start: date.startOf('year').format('YYYY-MM-DD'),
				end: date.endOf('year').format('YYYY-MM-DD'),
				type,
			};

		default:
			return {
				start: date.format('YYYY-MM-DD'),
				end: date.format('YYYY-MM-DD'),
				type,
			};
	}
};



const getWeekRange = (date: Dayjs) => ({
	start: date.startOf('week'),
	end: date.endOf('week'),
});

const formatRangeLabel = (date: Dayjs | null, range: ManipulateType) => {
	if (!date) return 'Select Date';

	switch (range) {
		case 'day':
			return date.format('D MMM, YYYY');
		case 'week': {
			const { start, end } = getWeekRange(date);
			return `${start.format('D MMM, YYYY')} - ${end.format('D MMM, YYYY')}`;
		}
		case 'month':
			return date.format('MMM YYYY');
		case 'year':
			return date.format('YYYY');
		default:
			return date.format('MMMM D, YYYY');
	}
};

const DateNavigation = ({
	range,
	selectedDate,
	onNavigate,
	minDate,
	maxDate,
	fontColor = 'var(--Primary-P6, #98BBFF)',
	isDisabled = false,
	handleOpenPopover,
	showDateRangeOutsideofPopover
}: {
	range: ManipulateType;
	selectedDate: Dayjs | null;
	onNavigate: (newDate: Dayjs, params: DateParams) => void;
	minDate: Dayjs;
	maxDate: Dayjs;
	fontColor?: string;
	isDisabled?: boolean;
	handleOpenPopover: (event: any) => void;
	showDateRangeOutsideofPopover?: boolean;
}) => {
	if (!selectedDate) return null;

	const getNextDate = (date: Dayjs, direction: -1 | 1) => {
		if (range === 'week') {
			return date.add(direction, 'week');
		}
		return date.add(
			direction,
			(range === 'day' ? 'day' : range === 'month' ? 'month' : 'year') as ManipulateType
		);
	};


	const isPrevDisabled = getNextDate(selectedDate, -1).isBefore(minDate.startOf('day'));
	const isNextDisabled = getNextDate(selectedDate, 1).isAfter(maxDate.endOf('day'));

	const navigate = (direction: -1 | 1) => {
		const newDate = getNextDate(selectedDate, direction);

		if (direction === -1 && newDate.isBefore(minDate.startOf('day'))) return;
		if (direction === 1 && newDate.isAfter(maxDate.endOf('day'))) return;

		const params = getDateParams(newDate, range);
		onNavigate(newDate, params);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				backgroundColor: '#151725',
				border: "1px solid var(--Background-B7, #5E668D)",
				borderRadius: '8px',
				boxSizing: 'border-box',
				gap: "10px",
				width: 'fit-content !important',
				padding: "2px"
			}}
		>
			<IconButton
				onClick={() => navigate(-1)}
				size="small"
				sx={{
					color: 'var(--Primary-P6, #98BBFF)',
					background: 'var(--Background-B5, #2C3045)',
					borderRadius: '6px',
					padding: '3px',
				}}
				disabled={isDisabled}
			>
				<ChevronLeft sx={{ width: "16px", height: "16px" }} />
			</IconButton>

			<Typography
				sx={{
					fontSize: '12px',
					fontWeight: 500,
					color: fontColor,
					whiteSpace: 'nowrap',
					lineHeight: "140%",
					letterSpacing: '-2%',
					cursor: showDateRangeOutsideofPopover ? 'pointer' : 'default',
				}}
				onClick={(event) => {
					if (showDateRangeOutsideofPopover) {
						handleOpenPopover(event);
					}
				}}
			>
				{formatRangeLabel(selectedDate, range)}
			</Typography>

			<IconButton
				onClick={() => navigate(1)}
				size="small"
				sx={{
					color: 'var(--Primary-P6, #98BBFF)',
					background: 'var(--Background-B5, #2C3045)',
					borderRadius: '6px',
					padding: '3px',
				}}
				disabled={isDisabled}
			>
				<ChevronRight sx={{ width: "16px", height: "16px" }} />
			</IconButton>
		</Box>
	);
};


interface CalendarFilterProps {
	selectedDate: DateParams;
	onApply: (dateParams: DateParams) => void;
	fontColor?: string;
	isDisabled?: boolean;
	showDateRangeOutsideofPopover?: boolean;

}

const CalendarFilter = ({
	selectedDate: propSelectedDate,
	onApply,
	fontColor,
	isDisabled,
	showDateRangeOutsideofPopover = false

}: CalendarFilterProps) => {
	const [range, setRange] = useState<ManipulateType>(propSelectedDate.type);
	const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
		convertToDayjs(propSelectedDate)
	);
	const [anchorEl, setAnchorEl] = useState(null);
	const displayDate = useMemo(() => convertToDayjs(propSelectedDate), [propSelectedDate]);
	const displayRange = propSelectedDate.type;

	const minDate = dayjs().subtract(4, 'year').startOf('year');
	const maxDate = dayjs().endOf('year');

	useEffect(() => {
		setRange(propSelectedDate.type);
		setSelectedDate(convertToDayjs(propSelectedDate));
	}, [propSelectedDate]);

	const [showCalendarOutsidePopover, setShowCalendarOutsidePopover] = useState(true); // remove this part
	const handleOpen = (event: any) => {
		setRange(propSelectedDate.type);
		setSelectedDate(convertToDayjs(propSelectedDate));
		setAnchorEl(event.currentTarget);
		if (showCalendarOutsidePopover) setShowCalendarOutsidePopover(false); // remove this line
	};


	const handleClose = () => setAnchorEl(null);
	const handleReset = () => {
		const today = dayjs();

		// Build fresh DateParams
		const resetParams: DateParams = {
			start: today.startOf('day').format('YYYY-MM-DD'),
			end: today.endOf('day').format('YYYY-MM-DD'),
			type: 'day',
		};

		setRange('day');
		setSelectedDate(today);

		onApply(resetParams);
		handleClose();
	};

	const open = Boolean(anchorEl);

	const ranges = [
		{ key: 'day', label: 'Day' },
		{ key: 'week', label: 'Week' },
		{ key: 'month', label: 'Month' },
		{ key: 'year', label: 'Year' },
	] as const;

	const calendarViews: readonly DateView[] = useMemo(() => {
		switch (range) {
			case 'day':
			case 'week':
				return ['day'];
			case 'month':
				return ['month'];
			case 'year':
				return ['year'];
			default:
				return ['day'];
		}
	}, [range]);

	const calendarStyles = {
		width: '100%',
		height: 'auto',
		padding: 0,
		'.MuiPickersCalendarHeader-root': {
			backgroundColor: '#0f1720',
			borderRadius: '12px',
			padding: '8px 16px',
			margin: '0 0 12px 0',
			display: 'none',
		},
		'.MuiDayCalendar-weekDayLabel': {
			color: '#cbd5e1',
			fontWeight: 600,
			fontSize: '14px',
			height: '30px !important',
			width: '32px !important',
		},
		'.MuiDayCalendar-weekContainer, .MuiDayCalendar-header': {
			display: "flex",
			justifyContent: "space-around",
			m: '0px !important'
		},
		'.MuiPickersDay-root, .MuiMonthCalendar-root > div, .MuiYearCalendar-root > div':
		{
			color: '#cbd5e1',
			fontSize: '14px',
			fontWeight: 600,
			height: '32px !important',
			width: '32px !important',
			borderRadius: '8px !important',
			'&:hover': {
				// backgroundColor: '#1e293b',
			},
		},
		'.MuiDayCalendar-slideTransition': {
			minHeight: '192px',
		},
		'.Mui-selected': {
			border: '1px solid var(--Primary-P5, #4785FF) !important',
			backgroundColor: 'var(--Primary-P1, #0E1536) !important',
			color: 'white',
			'&:hover': { backgroundColor: '#1e3a8a' },
		},
		'.MuiMonthCalendar-button, .MuiYearCalendar-button': {
			height: '32px',
			backgroundColor: "var(--Background-B4, #1A1E32)",
			border: "1px solid var(--Background-B5, #2C3045)",
			borderRadius: '8px',
			fontSize: '14px',
			fontWeight: 600
		},
		'.MuiYearCalendar-root, .MuiMonthCalendar-root': {
			width: '100% !important',
			display: "flex",
			justifyContent: 'start',
			padding: "12px 0px"
		},
		'.MuiYearCalendar-button ': {
			// width: '104px',
			maxWidth: '32%',
		}

	};

	const formatWeekLabel = (date: Dayjs) => {
		const { start, end } = getWeekRange(date);
		return `${start.format('DD MMM')} - ${end.format('DD MMM YYYY')}`;
	};

	const WeekDay = (props: any) => {
		const { day } = props;
		const { start, end } = getWeekRange(selectedDate!);

		const isSelectedWeek = !day.isBefore(start) && !day.isAfter(end);
		const isStartOfWeek = day.isSame(start, 'day');
		const isEndOfWeek = day.isSame(end, 'day');

		return (
			<Box
				sx={{
					position: "relative",
					display: "inline-flex",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				{/* Background layer */}
				<Box
					sx={{
						position: "absolute",
						left: isStartOfWeek ? 0 : -30,
						right: isEndOfWeek ? 0 : -30,
						top: 0,
						bottom: 0,
						backgroundColor: isSelectedWeek ? "#0F207A" : "transparent",
						borderRadius: "8px",
						zIndex: 0,

					}}
				/>

				{/* Actual PickersDay button */}
				<PickersDay
					{...props}
					selected={false}
					sx={{
						zIndex: 1,
						backgroundColor: "transparent",
						"&:hover": {
							backgroundColor: "transparent",
							...(isStartOfWeek || isEndOfWeek
								? {
									backgroundColor: "var(--Primary-P1, #0E1536) !important",
								} : {})
						},
						...(isStartOfWeek || isEndOfWeek
							? {
								backgroundColor: "var(--Primary-P1, #0E1536) !important",
								border: "1px solid var(--Primary-P5, #4785FF)",
							}
							: {}),
					}}
				/>
			</Box>
		);
	};


	const handleApply = () => {
		if (selectedDate) {
			onApply(getDateParams(selectedDate, range));
		}
		handleClose();
	};

	const handleNavigation = (newDate: Dayjs, params: DateParams) => {
		onApply(params);
	};

	const DateRange = () => {
		return (
			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: '4px',
				}}
			>
				{ranges.map((r) => (
					<Button
						key={r.key}
						variant="outlined"
						onClick={() => {
							const baseDate = showDateRangeOutsideofPopover
								? dayjs()
								: selectedDate ?? dayjs();

							const computedDate =
								r.key === 'week' ? baseDate.startOf('week') : baseDate;

							setRange(r.key as ManipulateType);
							setSelectedDate(computedDate);

							if (showDateRangeOutsideofPopover) {
								onApply(getDateParams(computedDate, r.key as ManipulateType));
							}
						}}
						sx={{
							flex: showDateRangeOutsideofPopover ? "1 1 calc(25% - 8px)" : '1 1 calc(50% - 8px)',
							padding: '6px 0px',
							background:
								range === r.key
									? 'var(--Primary-P1, #0E1536) !important'
									: 'var(--Background-B3, #151725) !important',
							border:
								range === r.key
									? '1px solid var(--Primary-P5, #4785FF) !important'
									: '1px solid var(--Background-B5, #2C3045) !important',
							borderRadius: '8px !important',
							fontSize: '14px',
							boxSizing: 'border-box',
							fontWeight: range === r.key ? 600 : 400,
							color: range === r.key ? '#98BBFF' : '#BABFDA',
							'&:hover': {
								backgroundColor:
									range === r.key ? '#1e3a8a' : '#1a2432',
								borderColor:
									range === r.key ? '#3b82f6' : '#475569',
							},
							textTransform: 'none',
							height: '30px',
						}}
					>
						{r.label}
					</Button>
				))}
			</Box>
		)
	}
	// in real usecase directly put this React.Node inside popover and remove outside rendered Box.
	const Calendar = () => {
		return (
			<Box sx={{ width: "100%", display: 'flex', flexDirection: "column", gap: '12px' }}>
				<Box sx={{ display: 'flex', flexDirection: "column", gap: "12px" }}>

					{/* RANGE SELECT BUTTONS */}
					{!showDateRangeOutsideofPopover && <DateRange />}

					{range !== 'year' &&
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: 1,
								background: 'var(--Background-B5, #2C3045)',
								borderRadius: '8px',
								padding: '6px 0px',
								position: 'relative',
								height: "36px"
							}}
						>
							<IconButton
								onClick={() => {
									let newDate;
									if (range === 'week') {
										newDate = selectedDate!.subtract(1, 'week');
									} else if (range === 'month') {
										newDate = selectedDate!.subtract(1, 'year');
									} else {
										newDate = selectedDate!.subtract(1, range === 'day' ? 'month' : range);
									}
									if (newDate.isAfter(minDate.subtract(1, 'day'))) {
										setSelectedDate(newDate);
									}
								}}
								size="small"
								disabled={selectedDate?.isBefore(minDate.add(1, 'day'))}
							>
								<ChevronLeft style={{ color: 'white' }} />
							</IconButton>

							<Typography
								sx={{
									fontSize: '14px',
									fontWeight: 500,
									color: 'white',
								}}
							>
								{range === 'day' && selectedDate!.format('MMM YYYY')}
								{range === 'month' && selectedDate!.format('YYYY')}
								{range === 'week' && formatWeekLabel(selectedDate!)}
							</Typography>

							<IconButton
								onClick={() => {
									let newDate;
									if (range === 'week') {
										newDate = selectedDate!.add(1, 'week');
									} else if (range === 'month') {
										newDate = selectedDate!.add(1, 'year');
									} else {
										newDate = selectedDate!.add(1, range === 'day' ? 'month' : range);
									}
									if (newDate.isBefore(maxDate.add(1, 'day'))) {
										setSelectedDate(newDate);
									}
								}}
								size="small"
								disabled={selectedDate?.isAfter(maxDate.subtract(1, 'day'))}
							>
								<ChevronRight style={{ color: 'white' }} />
							</IconButton>
						</Box>
					}

					{(range === 'day' || range === 'month' || range === 'year') && (
						<DateCalendar
							value={selectedDate}
							onChange={(newValue: any) => {
								setSelectedDate(newValue);
							}}
							views={calendarViews}
							openTo={calendarViews[0]}
							sx={calendarStyles}
							disableFuture={range !== 'day'}
							minDate={minDate}
							maxDate={maxDate}
						/>
					)}

					{range === 'week' && (
						<DateCalendar
							value={selectedDate}
							onChange={(newValue: any) => {
								const { start } = getWeekRange(newValue);
								setSelectedDate(start);
							}}
							views={['day']}
							openTo="day"
							sx={calendarStyles}
							slots={{
								day: (props: any) => (
									<WeekDay {...props} selectedDate={selectedDate} />
								),
							}}
							minDate={minDate}
							maxDate={maxDate}
						/>
					)}
				</Box>
				<Box sx={{ bgcolor: '#2C3045', height: '1px' }} />
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						height: '28px'
					}}
				>
					<Button variant="text" sx={{ textTransform: 'none', color: "var(--Primary-P5, #4785FF)", height: '20px', padding: "0px" }}
						onClick={() => handleReset()} >
						Reset Filters
					</Button>
					<Button variant="contained" onClick={handleApply}
						sx={{ textTransform: 'none', bgcolor: "var(--Primary-P4, #0042C4)", height: '28px', padding: "10px 20px", fontWeight: 600, color: "#FFFFFF", borderRadius: '8px' }} >
						Apply
					</Button>
				</Box>
			</Box>
		)
	}
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				gap: 1,
				flexWrap: 'wrap',
				flexDirection: 'row',
				justifyContent: "flex-end",
				maxWidth: "350px" //temp
			}}
		>
			{showDateRangeOutsideofPopover && <DateRange />}
			<DateNavigation
				range={displayRange}
				selectedDate={displayDate}
				onNavigate={handleNavigation}
				minDate={minDate}
				maxDate={maxDate}
				fontColor={fontColor}
				isDisabled={isDisabled}
				handleOpenPopover={handleOpen}
				showDateRangeOutsideofPopover={false}
			/>

			{!showDateRangeOutsideofPopover && <IconButton
				onClick={handleOpen}
				sx={{
					borderRadius: '8px',
					padding: '5px',
					border: '1px solid var(--Background-B7, #5E668D)',
					'&:hover': { backgroundColor: '#2440d1' },
				}}
				aria-describedby={open ? 'date-popover' : undefined}
				disabled={isDisabled}
			>
				<CalendarMonthOutlined
					style={{ color: 'var(--Primary-P6, #98BBFF)', height: "16px", width: "16px" }}
				/>
			</IconButton>}
			{/* directly showing calendar as per my portfolio usecase, in real use remove this part*/}
			{showCalendarOutsidePopover &&
				<Box
					sx={{
						mt: 1,
						background: 'var(--Background-B4, #1A1E32)',
						border: '1px solid var(--Background-B6, #474D6C)',
						borderRadius: '12px',
						padding: '12px',
						boxShadow: '0px 0px 20px 12px #00000080',
						overflow: 'visible',
						width: '100%',
						maxWidth: "364px",
					}}
				>
					<Calendar />
				</Box>
			}
			<Popover
				id="date-popover"
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				disableScrollLock
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'right',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				slotProps={{
					paper: {
						sx: {
							mt: 1,
							background: 'var(--Background-B4, #1A1E32)',
							border: '1px solid var(--Background-B6, #474D6C)',
							borderRadius: '12px',
							padding: '12px',
							boxShadow: '0px 0px 20px 12px #00000080',
							overflow: 'visible',
							width: '100%',
							maxWidth: "364px",

						},
					},
				}}
				disableRestoreFocus
			>
				<Calendar />
			</Popover>
		</Box>
	);
}
export default CalendarFilter;