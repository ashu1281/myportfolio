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
	{ id: 214, title: 'amCharts', 
		icon: (
			<img
				src={AmChartsLogo}
				alt="AmCharts"
				style={{ width: 100, height: 44 , marginLeft:"-10px"}}
			/>
		), color: '#00A3E0' },
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
		date: 'Jun/2016 - March/2017',
		title: 'SSC',
		organization: 'BhagatSingh Vidyalaya, Ashta',
		icon: <GiOpenBook />,
	},
	{
		date: 'Jul/2017 - Feb/2019',
		title: 'HSC',
		organization: 'Jay Krati Jr. Science College, Latur',
		icon: <GiOpenBook />,
	},
	{
		date: 'Aug/2019 - May/2023',
		title: 'B.Tech in Computer Engineering',
		organization: 'Government College of Engineering, Jalgaon',
		icon: <FaLaptopCode />,
	},

];
export const Experience = [
	{
		date: 'Jan/2023 - Jul/2023',
		title: 'Internship in Web Development at,',
		organization: 'PratitiTechnologies Pvt. Ltd, Pune',
		icon: <GiOpenBook />,
	},
	{
		date: 'Aug/2023 - present',
		title: 'Software Engineer at,',
		organization: 'PratitiTechnologies Pvt. Ltd, Pune',
		icon: <FaToolbox />,
	},
];



export const projectTypes = ['All', 'Angular', 'React'];

export const myProjects = [
	{
		id: 301,
		title: 'Scada Application',
		img: electronPorjectImg,
		link: '',
		githubLink: 'https://www.electronjs.org/',
		Language: ['Electron', 'React'],
		description:
			'Desktop SCADA application created using Electron.js and React.js. This application is used to monitor and control the devices connected to the server.',
	},
	{
		id: 302,
		title: "This Portfolio",
		img: portfolioImg,
		link: "https://ashishgaikwad.me",
		githubLink: "https://github.com/ashu1281/myportfolio",
		Language: ['React'],
		description:
			""
	},
	{
		id: 303,
		title: 'Tickets Management WebApp',
		img: ticketstm,
		link: 'https://ticketstm.vercel.app/',
		githubLink: 'https://github.com/ashu1281/Ticket-Management-Webapplication-MERN-STACK',
		Language: ['React'],
		description:
			'A user-friendly web application designed for efficient management of support tickets. Users can create, track, and update tickets, while agents and administrators collaborate to resolve issues. The app offers role-based access for secure interactions.',
	},
	// {
	// 	id: 304,
	// 	title: "Library Management System",
	// 	img: library,
	// 	link: "",
	// 	githubLink:"https://github.com/ashu1281/Library-Management-System--final",
	// 	Language: ['.Net', 'C#', 'SQL Server'],
	// 	description:
	// 				`The Library Management System provides a user-friendly interface
	// 				that allows librarians to manage library resources such as to Manage
	// 				Books, Issue Books, Return Books, Manage Member’s and also keep
	// 				data of Members who have borrowed books.`
	// },
]