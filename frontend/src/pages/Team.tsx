import React, {useContext, useEffect, useState} from "react";
import Page from "../components/Page";
import {Parallax} from "react-scroll-parallax";
import {DarkContext} from "../App";
import {Container} from "react-bootstrap";
import { TailSpin } from  'react-loader-spinner'

import "./Team.sass"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import axios, {AxiosResponse} from "axios";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFacebookSquare} from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import {faInstagram} from "@fortawesome/free-brands-svg-icons/faInstagram";
import {faTwitter} from "@fortawesome/free-brands-svg-icons/faTwitter";
import {faTwitch} from "@fortawesome/free-brands-svg-icons/faTwitch";
import {faYoutube} from "@fortawesome/free-brands-svg-icons/faYoutube";
import {faCakeCandles} from "@fortawesome/free-solid-svg-icons/faCakeCandles";
import {faHouseChimney} from "@fortawesome/free-solid-svg-icons/faHouseChimney";
import {faFlagCheckered} from "@fortawesome/free-solid-svg-icons/faFlagCheckered";
import IRacingLogo from "../images/iracinglogo.svg";
import Flag from 'react-world-flags'
import FlipCard from "../components/FlipCard";
import Alert from 'react-bootstrap/Alert';
import AnonymousPilot from "../images/anonymous-pilot-bg.png"
import classNames from "classnames";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons/faAngleDown";
import {faSignature} from "@fortawesome/free-solid-svg-icons/faSignature";

interface MemberData {
    Name: string
    Nickname: string,
    'Family name': string,
    Role: string,
    Year: string,
    Town: string,
    Country: string,
    Series: string,
    CustomerID: string,
    Number: string,
    Avatar: string,
    Facebook: string,
    Instagram: string,
    Twitter: string,
    Youtube: string,
    Twitch: string
    cust_id: number,
    last_login: Date,
    member_since: Date,
    irating: number,
    safety_rating: number,
    group_name: string,
    cpi: number
}
const IRatingBullet: React.FC<{ irating: number, isTopDriver: boolean }> = ({ irating, isTopDriver }) => {
    const formatIRating = (): string => `${(Math.round(irating / 100) * 100/1000).toFixed(1)}k`
    return <span className={classNames("irating", { top: isTopDriver })}>{formatIRating()}</span>
}

const SafetyRatingBullet: React.FC<{safety_class: string, safety_rating: number}> = ({ safety_class, safety_rating }) => {
    const safetyClass = safety_class.toLowerCase().replace(" ", "-")
    const getClassLetter = () => {
        switch (safety_class) {
            case "Rookie": return "R"
            case "Class D": return "D"
            case "Class C": return "C"
            case "Class B": return "B"
            case "Class A": return "A"
            case "Pro": return "P"
            case "Pro/WC": return "PWC"
        }
    }
    if (getClassLetter() === "R") {
        return <span className={`safety-rating rookie`}>Rookie</span>
    }
    return <span className={`safety-rating ${safetyClass}`}>{getClassLetter()}{safety_rating}</span>
}

const MemberCardFront: React.FC<{ member: MemberData, isTopDriver: boolean }> = ({ member, isTopDriver }) => {
    return <div key={member.CustomerID} className={"member card"}>
        <div className={"national-flag"}><Flag code={member.Country}/></div>
        <span className={"race-number"}>[{member.Number}]</span>
        <div className={"role"}>{member.Role}</div>
        <div className={"name"}>{member.Name} {member["Family name"]}</div>
        <div className={"stats"}><IRatingBullet isTopDriver={isTopDriver} irating={member.irating}/><SafetyRatingBullet safety_class={member.group_name} safety_rating={member.safety_rating}/></div>
        <div className={"links"}>
            <a className={"social-link"} href={`https://members.iracing.com/membersite/member/CareerStats.do?custid=${member.CustomerID}`} target={"_blank"} rel="noreferrer">
                <img src={IRacingLogo} alt={"iRacing logo"}/>
            </a>
            {member.Facebook && <a className={"social-link"} href={member.Facebook} target={"_blank"} rel="noreferrer"><FontAwesomeIcon
                icon={faFacebookSquare}/></a>}
            {member.Instagram && <a className={"social-link"} href={member.Instagram} target={"_blank"} rel="noreferrer"><FontAwesomeIcon
                icon={faInstagram}/></a>}
            {member.Twitter && <a className={"social-link"} href={member.Twitter} target={"_blank"} rel="noreferrer"><FontAwesomeIcon
                icon={faTwitter}/></a>}
            {member.Twitch && <a className={"social-link"} href={member.Twitch} target={"_blank"} rel="noreferrer"><FontAwesomeIcon
                icon={faTwitch}/></a>}
            {member.Youtube && <a className={"social-link"} href={member.Youtube} target={"_blank"} rel="noreferrer"><FontAwesomeIcon
                icon={faYoutube}/></a>}
        </div>
    </div>
}

const MemberCardBack: React.FC<{ member: MemberData }> = ({ member }) => {
    const formatDate = (date: Date) => {
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
        const mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
        return `${da}/${mo}/${ye}`
    }
    return <div key={member.CustomerID} className={"member card"}>
        <div className={"avatar"}><img src={member.Avatar || AnonymousPilot} alt={`${member["Family name"]}'s avatar`}/></div>
        <div className={"driver-info"}>
            {member.Nickname && <div className={"nickname"}><FontAwesomeIcon icon={faSignature}/>{member.Nickname}</div>}
            <div className={"cakeday"}><FontAwesomeIcon icon={faCakeCandles}/>{member.Year}</div>
            <div className={"location"}><FontAwesomeIcon icon={faHouseChimney}/>{member.Town}</div>
            <div className={"series"}><FontAwesomeIcon icon={faFlagCheckered}/>{member.Series}</div>
            <div className={"since"}>iRacer since <span>{formatDate(new Date(member.member_since))}</span></div>
        </div>
    </div>
}

interface TeamMembersProps {
    teamName: string
    members: MemberData[],
    start: number
}
const TeamMembers: React.FC<TeamMembersProps> = ({ teamName, members, start}) => {
    const [open, setOpen] = useState(false)

    const iratings = members.map(x => x.irating).sort((a, b) => b - a)
    return <div className={classNames('team', { open })}>
        <div className={"team-name"}>
            <h2>{teamName}</h2>
        </div>
        <div className={"members"}>
            { members.map((member, i) => <FlipCard
                start={start}
                key={member.CustomerID}
                idx={i}
                card={{ front: <MemberCardFront member={member} isTopDriver={!teamName.toLowerCase().includes("junior") && iratings.indexOf(member.irating) === 0}/>, back: <MemberCardBack member={member}/> }}/>)
            }
        </div>
        <button onClick={() => setOpen(open => !open)} className={"opener"}><FontAwesomeIcon icon={faAngleDown}/> Show { open ? "less" : "more"} <FontAwesomeIcon icon={faAngleDown}/></button>
    </div>
}

export default function Team() {
    const isDark = useContext(DarkContext)
    const [loaded, setLoaded] = useState(false)
    const [error, setError] = useState(false)
    const [hidden, setHidden] = useState(true)

    const [mainMembers, setMainMembers] = useState<MemberData[]>([])
    const [juniorMembers, setJuniorMembers] = useState<MemberData[]>([])

    useEffect(() => {
        getMembers().then(() => console.log("Members data loaded"))
    }, [])

    const getMembers = async () => {
        const memberSorter = (a: MemberData, b: MemberData) => {
            const roles = ["Team Owner", "Team Manager", "Driver"]
            if (a.Role !== b.Role) return roles.indexOf(a.Role) - roles.indexOf(b.Role)
            return b.irating - a.irating
        }
        try {
            const { main, junior } = await axios
                .get("http://localhost:8080/api/members")
                .then((res: AxiosResponse<{
                    junior: MemberData[],
                    main: MemberData[]
                }>) => ({ main: res.data.main, junior: res.data.junior }))
                .then(({ main, junior }) => ({
                    main: main.sort(memberSorter),
                    junior: junior.sort(memberSorter)
                }))
            setMainMembers(main)
            setJuniorMembers(junior)
        } catch (ex) {
            setError(true)
        }
        setLoaded(true)
        setTimeout(() => setHidden(false), 250)
    }

    return <main>
        <Page className={"line-up"}>
            <Parallax speed={5}>
                <div className="background"/>
            </Parallax>
            <Container className={"introduction"}>
                <h1>Team Members</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fringilla, quam vel ultricies
                    luctus, nisi urna egestas orci, ut semper nulla dolor sit amet diam. Sed ut ornare odio. Suspendisse
                    congue dui eu orci malesuada ullamcorper. Pellentesque a leo ut mauris eleifend egestas. Donec
                    tristique diam a urna aliquet scelerisque. Integer congue metus quis lacinia egestas. Duis tellus
                    orci, tempor non dui id, ultrices venenatis elit. Duis hendrerit, dolor eu auctor imperdiet, lacus
                    orci suscipit nibh, ut interdum urna risus id ligula. Sed finibus enim non justo suscipit
                    sollicitudin. Duis facilisis vehicula eros ac mollis. Nulla in lacinia felis. Aliquam faucibus
                    massa a faucibus ullamcorper.</p>
            </Container>
            { !loaded && !error && <div className={"loader"}>
                <TailSpin color={isDark ? "#28f7ff" : "#333333"} height={80} width={80} />
                <small className={"muted"}>Loading Members...</small>
            </div> }
            { loaded && !error &&
                <Container className={"teams"} style={hidden ? { height: 0, opacity: 0, overflow: "hidden" } : { height: "initial", opacity: 1 } }>
                    <TeamMembers teamName={"CODEGA Squadra Corse"} members={mainMembers} start={0}/>
                    <hr/>
                    <TeamMembers teamName={"CODEGA Junior Team"} members={juniorMembers} start={mainMembers.length}/>
                </Container>
            }
            { error && <div className={"container text-center"}><Alert variant={"danger"}>There was an error fetching the team members. Try again later</Alert></div> }
        </Page>
    </main>
}
