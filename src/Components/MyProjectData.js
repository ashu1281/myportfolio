import { DiJavascript1 } from 'react-icons/di';
import {
	FaAngular,
	FaBitbucket,
	FaCss3Alt,
	FaFigma,
	FaGitAlt,
	FaGithub,
	FaHtml5,
	FaJava,
	FaLaptopCode,
	FaReact,
	FaToolbox
} from 'react-icons/fa';
import { GiOpenBook } from 'react-icons/gi';
import {
	SiAngular,
	SiC,
	SiChartdotjs,
	SiCplusplus,
	SiElectron,
	SiJira,
	SiMui,
	SiTypescript,
	SiVisualstudiocode
} from 'react-icons/si';
import electronPorjectImg from '../Images/pojectImages/Electron_React.svg';
import portfolioImg from '../Images/pojectImages/portfolio.png';
import ticketstm from '../Images/pojectImages/Ticketstm.png';
import HighchartLogo from '../Images/pojectImages/highChartLogo.png'
import AmChartsLogo from "../Images/pojectImages/amchartsLogo.png"

export const startLink = '';

export const myPersonalInfo = [
	{ id: 101, title: 'Frist Name: ', info: 'Ashish' },
	{ id: 102, title: 'Last Name: ', info: 'Gaikwad' },
	{ id: 103, title: 'Birthdate: ', info: '12 Aug 2001' },
	{ id: 104, title: 'Nationality: ', info: 'Indian' },
	{ id: 105, title: 'Langages: ', info: 'English, Hindi, Marathi' },
	{ id: 106, title: 'Phone: ', info: '+91 9021823547' },
	{ id: 107, title: 'Email: ', info: 'gaikwadashish628@gmail.com' },
	// { id: 108, title: 'Freelance: ', info: 'Available', color: '#01ef92' },
];

export const technicalSkills = [
	{ id: 201, title: 'C', icon: <SiC />, color: '#A8B9CC' },
	{ id: 202, title: 'C++', icon: <SiCplusplus />, color: '#00599C' },
	{ id: 203, title: 'Java', icon: <FaJava />, color: '#ED8B00' },
	{ id: 204, title: 'HTML', icon: <FaHtml5 />, color: '#E34F26' },
	{ id: 205, title: 'CSS', icon: <FaCss3Alt />, color: '#1572B6' },
	{ id: 206, title: 'JavaScript', icon: <DiJavascript1 />, color: '#F7DF1E' },
	{ id: 207, title: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
	//   { id: 208, title: 'SQL', icon: <FaDatabase />, color: '#F29111' },

];
export const frameworks = [
	{ id: 209, title: 'React.js', icon: <FaReact />, color: '#00CEF2' },
	{ id: 208, title: 'Angular', icon: <FaAngular />, color: '#DD0031' },
	{ id: 210, title: 'Electron.js', icon: <SiElectron />, color: '#47848F' },
	{ id: 211, title: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
	{ id: 213, title: 'React Material UI', icon: <SiMui />, color: 'rgb(0, 127, 255)' },
	{ id: 212, title: 'Angular Material UI', icon: <SiAngular />, color: '#DD0031' },
	{
		id: 214, title: 'amCharts',
		icon: (
			<img
				src={AmChartsLogo}
				alt="AmCharts"
				style={{ width: 100, height: 44, marginLeft: "-10px" }}
			/>
		), color: '#00A3E0'
	},
	{
		id: 215,
		title: 'HighCharts',
		icon: (
			<img
				src={HighchartLogo}
				alt="HighCharts"
				style={{ width: 44, height: 44 }}
			/>
		),
		color: '#FF6384',
	},

];


export const tools = [
	{ id: 215, title: 'Git', icon: <FaGitAlt />, color: '#DE4C36' },
	{ id: 214, title: 'GitHub', icon: <FaGithub /> },
	{ id: 217, title: 'Bitbucket', icon: <FaBitbucket />, color: '#0052CC' },
	{ id: 218, title: 'Jira', icon: <SiJira />, color: '#0052CC' },
	{ id: 216, title: 'VS Code', icon: <SiVisualstudiocode />, color: '#0066b8' },
];

export const Education = [
	{
		date: 'Aug/2019 - May/2023',
		title: 'B.Tech in Computer Engineering',
		organization: 'Government College of Engineering, Jalgaon',
		icon: <FaLaptopCode />,
	},
	{
		date: 'Jul/2017 - Feb/2019',
		title: 'HSC',
		organization: 'Jay Krati Jr. Science College, Latur',
		icon: <GiOpenBook />,
	},
	{
		date: 'Jun/2016 - March/2017',
		title: 'SSC',
		organization: 'BhagatSingh Vidyalaya, Ashta',
		icon: <GiOpenBook />,
	},

];
export const Experience = [
	{
		date: 'Aug/2023 - present',
		title: 'Software Engineer at,',
		organization: 'PratitiTechnologies Pvt. Ltd, Pune',
		icon: <FaToolbox />,
	},
	{
		date: 'Jan/2023 - Jul/2023',
		title: 'Internship in Web Development at,',
		organization: 'PratitiTechnologies Pvt. Ltd, Pune',
		icon: <GiOpenBook />,
	},
];



export const projectTypes = ['All', 'React'];

export const myProjects = [

	{
		id: 306,
		title: 'Solar Energy Monitoring Application',
		img: null, // add image
		link: '',
		githubLink: '',
		Language: ['React', 'Redux', 'Material-UI', 'Highcharts'],
		description:
			'Solar energy monitoring dashboard featuring real-time KPIs, custom Plant Analysis charts, and a Google 3D Tiles–powered map view for state-to-site level performance visualization.'
	}, {
		id: 305,
		title: 'Jewelry Production Planning System',
		img: null, // add image
		link: '',
		githubLink: '',
		Language: ['React', 'Redux', 'Spring Boot', 'AmCharts'],
		description:
			'Production planning system handling up to 20K orders per day with a custom calendar for day-wise resource allocation, improving scheduling efficiency by 20–25%.',
	},
	{
		id: 304,
		title: 'Social Platform for Musicians',
		img: null, // add image
		link: '',
		githubLink: '',
		Language: ['React', 'Redux', 'Spring Boot', 'WebSocket'],
		description:
			'Real-time collaboration platform for musicians supporting live streaming, interactive posts, and media sharing for 1,000+ users.',
	},

	{
		id: 303,
		title: 'SCADA Desktop Application (POC)',
		img: electronPorjectImg,
		link: '',
		// githubLink: 'https://www.electronjs.org/',
		Language: ['Electron', 'React', 'Material-UI'],
		description:
			'Desktop SCADA POC application built using Electron.js and React to monitor 40+ industrial parameters such as voltage, current, and system status in real time.',
	},

	{
		id: 302,
		title: 'Personal Portfolio',
		img: portfolioImg,
		link: 'https://ashishgaikwad.in',
		rlink: 'https://ashishgaikwad.in',
		githubLink: 'https://github.com/ashu1281/myportfolio',
		Language: ['React', 'Material-UI'],
		description:
			'Personal portfolio showcasing projects, skills, and experience with a clean UI, reusable components, and responsive design.',
	},

	{
		id: 301,
		title: 'Tickets Management Web Application',
		img: ticketstm,
		link: 'https://ticketstm.vercel.app/',
		rlink: 'https://ticketstm.vercel.app/',
		githubLink: 'https://github.com/ashu1281/Ticket-Management-Webapplication-MERN-STACK',
		Language: ['React'],
		description:
			'A role-based ticket management system where users can create, track, and update support tickets, and admins can manage ticket workflows efficiently.',
	},
];
