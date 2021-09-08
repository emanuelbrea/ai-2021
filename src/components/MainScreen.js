import React, {useState} from 'react'
import Profile from "./Profile";
import ChildrenProfile from "./ChildrenProfile";


export default function MainScreen(props) {
    const [menu, setMenu] = useState('children')
    return (
        <React.Fragment>
            {menu == "profile" && (
                <Profile/>
            )}
            {menu == "children" && (
                <ChildrenProfile/>
            )}
        </React.Fragment>
    )
}