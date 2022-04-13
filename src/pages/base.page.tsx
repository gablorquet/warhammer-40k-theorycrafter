import { HashRouter, Link, Route, Routes } from "react-router-dom";
import PickerPageComponent from "../picker/picker.page";
//#region Props/State
type BasePageProps = {
}
//#endregion

export default function BasePageComponent(props: BasePageProps) {

    return (
        <HashRouter>

            <Link to='/picker'>
                Picker
            </Link>

            <Routes>
                <Route
                    path="picker"
                    element={<PickerPageComponent />}
                />

                <Route
                    path="result"
                    element={<div>Result</div>}
                />

            </Routes>
        </HashRouter>
    )
}
