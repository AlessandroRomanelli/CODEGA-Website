import { Router, Request } from 'express';
import {GoogleSpreadsheet, GoogleSpreadsheetRow} from 'google-spreadsheet'
import NodeCache from "node-cache"
import axios, {AxiosResponse} from "axios"

// Export the base-router
const baseRouter = Router();

const cache = new NodeCache({ stdTTL: 600})

interface Member {
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
}

interface IRacingData {
    cust_id: number,
    last_login: Date,
    member_since: Date,
    irating: number,
    safety_rating: number,
    group_name: string,
    cpi: number
}

const addIRacingData = async (members: Member[]): Promise<(Member & IRacingData)[]> => {
    let cookie = cache.get("cookie") as string
    if (!cookie) {
        const auth: AxiosResponse<{
            authcode: string,
            ssoCookieValue: string,
            ssoCookieName: string
        }> =  await axios.post("https://members-ng.iracing.com/auth",
            {
                email: process.env.IRACING_EMAIL_LOGIN,
                password: process.env.IRACING_PASSWORD_LOGIN
            })
        cookie = (auth.headers['set-cookie'] || []).join(";")
        cache.set("cookie", cookie, 3540)
    }

    const redirect: AxiosResponse<{
        link: string
    }> = await axios.get("https://members-ng.iracing.com/data/member/get",
        {
            params: {
                cust_ids: members.map(x => x.CustomerID),
                include_licenses: true
            },
            headers: {
                Cookie: cookie
            }
    })

    interface LicenseData {
        category_id: number,
        category: string,
        safety_rating: number,
        cpi: number,
        irating: number,
        group_name: string
    }
    interface DriverData {
        cust_id: number,
        display_name: string,
        last_login: string,
        member_since: string
        club_name: string
        licenses: LicenseData[]
    }

    const result: AxiosResponse<{
        members: DriverData[]
    }> = await axios.get(redirect.data.link)


    const results = result.data.members.map(x => {
        const idx = x.licenses.findIndex(license => license.category === "road")
        return {
            cust_id: x.cust_id,
            last_login: new Date(x.last_login),
            member_since: new Date(x.member_since),
            irating: x.licenses[idx].irating,
            safety_rating: x.licenses[idx].safety_rating,
            group_name: x.licenses[idx].group_name,
            cpi: x.licenses[idx].cpi
        }
    })
    return members
        .map(x => Object.assign(x, results.find(y => y.cust_id === parseInt(x.CustomerID))))
}

const getMembers = async (): Promise<{
    main: (Member & IRacingData)[],
    junior: (Member & IRacingData)[]
}> => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID);
    doc.useApiKey(process.env.GOOGLE_API_KEY as string)
    await doc.loadInfo();

    const [main, junior] = [doc.sheetsByIndex[0], doc.sheetsByIndex[1]];

    const mainRows = (await main.getRows())
        .map((x: GoogleSpreadsheetRow) => Object.fromEntries(
            Object.entries(x).filter(([k, v]) => main.headerValues.includes(k))
        )) as Member[];

    const juniorRows = (await junior.getRows())
        .map((x: GoogleSpreadsheetRow) => Object.fromEntries(
            Object.entries(x).filter(([k, v]) => junior.headerValues.includes(k))
        )) as Member[];

    return {
        main: await addIRacingData(mainRows.sort((a, b) => {
            return parseInt(a.CustomerID) - parseInt(b.CustomerID)
        })),
        junior: await addIRacingData(juniorRows.sort((a, b) => {
            return parseInt(a.CustomerID) - parseInt(b.CustomerID)
        }))
    }
}

// Setup routers
// eslint-disable-next-line @typescript-eslint/no-misused-promises
baseRouter.get('/members', async (req: Request<{ team: string }>, res) => {
    let members = cache.get("members")
    if (!members) {
        try {
            members = await getMembers()
            cache.set("members", members)
        } catch (err) {
            return res.status(500).send("Members unavailable")
        }
    }
    return res.json(members)
});

// Export default.
export default baseRouter;
